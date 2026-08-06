import { Mesh, Program, Renderer, Texture, Triangle } from "ogl";
import { useEffect, useRef } from "react";
import "./EvilEye.css";

function hexToVec3(hex) {
  const value = hex.replace("#", "");
  return [
    parseInt(value.slice(0, 2), 16) / 255,
    parseInt(value.slice(2, 4), 16) / 255,
    parseInt(value.slice(4, 6), 16) / 255,
  ];
}

function generateNoiseTexture(size = 256) {
  const data = new Uint8Array(size * size * 4);

  function hash(x, y, seed) {
    let value = x * 374761393 + y * 668265263 + seed * 1274126177;
    value = Math.imul(value ^ (value >>> 13), 1274126177);
    return ((value ^ (value >>> 16)) >>> 0) / 4294967296;
  }

  function noise(px, py, frequency, seed) {
    const fx = (px / size) * frequency;
    const fy = (py / size) * frequency;
    const ix = Math.floor(fx);
    const iy = Math.floor(fy);
    const tx = fx - ix;
    const ty = fy - iy;
    const width = frequency | 0;
    const wrapX = (x) => ((x % width) + width) % width;
    const wrapY = (y) => ((y % width) + width) % width;
    const v00 = hash(wrapX(ix), wrapY(iy), seed);
    const v10 = hash(wrapX(ix + 1), wrapY(iy), seed);
    const v01 = hash(wrapX(ix), wrapY(iy + 1), seed);
    const v11 = hash(wrapX(ix + 1), wrapY(iy + 1), seed);

    return v00 * (1 - tx) * (1 - ty) + v10 * tx * (1 - ty) + v01 * (1 - tx) * ty + v11 * tx * ty;
  }

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      let value = 0;
      let amplitude = 0.4;
      let totalAmplitude = 0;

      for (let octave = 0; octave < 8; octave += 1) {
        const frequency = 32 * (1 << octave);
        value += amplitude * noise(x, y, frequency, octave * 31);
        totalAmplitude += amplitude;
        amplitude *= 0.65;
      }

      value /= totalAmplitude;
      value = Math.max(0, Math.min(1, (value - 0.5) * 2.2 + 0.5));
      const channel = Math.round(value * 255);
      const index = (y * size + x) * 4;
      data[index] = channel;
      data[index + 1] = channel;
      data[index + 2] = channel;
      data[index + 3] = 255;
    }
  }

  return data;
}

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform sampler2D uNoiseTexture;
uniform float uPupilSize;
uniform float uIrisWidth;
uniform float uGlowIntensity;
uniform float uIntensity;
uniform float uScale;
uniform float uNoiseScale;
uniform vec2 uMouse;
uniform float uPupilFollow;
uniform float uFlameSpeed;
uniform vec3 uEyeColor;
uniform vec3 uBgColor;

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution.xy) / uResolution.y;
  uv /= uScale;
  float ft = uTime * uFlameSpeed;

  float polarRadius = length(uv) * 2.0;
  float polarAngle = (2.0 * atan(uv.x, uv.y)) / 6.28 * 0.3;
  vec2 polarUv = vec2(polarRadius, polarAngle);

  vec4 noiseA = texture2D(uNoiseTexture, polarUv * vec2(0.2, 7.0) * uNoiseScale + vec2(-ft * 0.1, 0.0));
  vec4 noiseB = texture2D(uNoiseTexture, polarUv * vec2(0.3, 4.0) * uNoiseScale + vec2(-ft * 0.2, 0.0));
  vec4 noiseC = texture2D(uNoiseTexture, polarUv * vec2(0.1, 5.0) * uNoiseScale + vec2(-ft * 0.1, 0.0));

  float distanceMask = 1.0 - length(uv);

  float innerRing = clamp(-1.0 * ((distanceMask - 0.7) / uIrisWidth), 0.0, 1.0);
  innerRing = (innerRing * distanceMask - 0.2) / 0.28;
  innerRing += noiseA.r - 0.5;
  innerRing = clamp(innerRing * 1.3, 0.0, 1.0);

  float outerRing = clamp(-1.0 * ((distanceMask - 0.5) / 0.2), 0.0, 1.0);
  outerRing = (outerRing * distanceMask - 0.1) / 0.38;
  outerRing += noiseC.r - 0.5;
  outerRing = clamp(outerRing * 1.3, 0.0, 1.0);

  innerRing += outerRing;

  float innerEye = distanceMask - 0.2;
  innerEye *= noiseB.r * 2.0;

  vec2 pupilOffset = uMouse * uPupilFollow * 0.12;
  vec2 pupilUv = uv - pupilOffset;
  float pupil = 1.0 - length(pupilUv * vec2(9.0, 2.3));
  pupil = clamp((pupil * uPupilSize) / 0.35, 0.0, 1.0);

  float outerEyeGlow = clamp(1.0 - length(uv * vec2(0.5, 1.5)) + 0.5, 0.0, 1.0);
  outerEyeGlow += noiseC.r - 0.5;
  float outerBgGlow = outerEyeGlow;
  outerEyeGlow = clamp(pow(outerEyeGlow, 2.0) + distanceMask, 0.0, 1.0);
  outerEyeGlow = clamp(outerEyeGlow * uGlowIntensity, 0.0, 1.0);
  outerEyeGlow *= pow(1.0 - distanceMask, 2.0) * 2.5;

  outerBgGlow = pow(outerBgGlow + distanceMask, 0.5) * 0.15;

  float eyeEnergy = clamp(max(innerRing + innerEye, outerEyeGlow + outerBgGlow) - pupil, 0.0, 3.0);
  float eyeMix = clamp(eyeEnergy * 2.0, 0.0, 1.0);
  vec3 color = mix(uBgColor, uEyeColor * uIntensity, eyeMix);
  float alpha = clamp(eyeEnergy * 1.15, 0.0, 1.0);

  gl_FragColor = vec4(color, alpha);
}
`;

export default function EvilEye({
  eyeColor = "#FF6F37",
  intensity = 1.35,
  pupilSize = 0.6,
  irisWidth = 0.25,
  glowIntensity = 0.35,
  scale = 0.8,
  noiseScale = 1,
  pupilFollow = 0,
  flameSpeed = 1,
  backgroundColor = "#F4F0E8",
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let renderer;
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    try {
      renderer = new Renderer({ alpha: true, premultipliedAlpha: false, antialias: true });
    } catch {
      container.dataset.unavailable = "true";
      return undefined;
    }

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const noiseTexture = new Texture(gl, {
      image: generateNoiseTexture(256),
      width: 256,
      height: 256,
      generateMipmaps: false,
      flipY: false,
    });
    noiseTexture.minFilter = gl.LINEAR;
    noiseTexture.magFilter = gl.LINEAR;
    noiseTexture.wrapS = gl.REPEAT;
    noiseTexture.wrapT = gl.REPEAT;

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let program;

    function resize() {
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      if (program) {
        program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height];
      }
    }

    function onMouseMove(event) {
      const rect = container.getBoundingClientRect();
      mouse.tx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.ty = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    }

    function onMouseLeave() {
      mouse.tx = 0;
      mouse.ty = 0;
    }

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", resize);

    resize();

    program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height] },
        uNoiseTexture: { value: noiseTexture },
        uPupilSize: { value: pupilSize },
        uIrisWidth: { value: irisWidth },
        uGlowIntensity: { value: glowIntensity },
        uIntensity: { value: intensity },
        uScale: { value: scale },
        uNoiseScale: { value: noiseScale },
        uMouse: { value: [0, 0] },
        uPupilFollow: { value: pupilFollow },
        uFlameSpeed: { value: flameSpeed },
        uEyeColor: { value: hexToVec3(eyeColor) },
        uBgColor: { value: hexToVec3(backgroundColor) },
      },
    });

    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
    container.appendChild(gl.canvas);

    let animationFrameId;
    function update(time) {
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      program.uniforms.uMouse.value = [mouse.x, mouse.y];
      program.uniforms.uTime.value = time * 0.001;
      renderer.render({ scene: mesh });
      if (!reducedMotion) animationFrameId = requestAnimationFrame(update);
    }

    if (reducedMotion) update(0);
    else animationFrameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      if (gl.canvas.parentNode === container) container.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [backgroundColor, eyeColor, flameSpeed, glowIntensity, intensity, irisWidth, noiseScale, pupilFollow, pupilSize, scale]);

  return <div ref={containerRef} className="evil-eye-container" />;
}
