import { useEffect, useRef } from "react";

import "./ParticlePortrait.css";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3);

function readImageParticles(image, width, height, targetCount) {
  const sourceWidth = Math.max(96, Math.min(180, Math.round(width * 2)));
  const sourceHeight = Math.max(96, Math.round((image.naturalHeight / image.naturalWidth) * sourceWidth));
  const source = document.createElement("canvas");
  source.width = sourceWidth;
  source.height = sourceHeight;

  const sourceContext = source.getContext("2d", { willReadFrequently: true });
  if (!sourceContext) return [];

  sourceContext.imageSmoothingEnabled = false;
  sourceContext.drawImage(image, 0, 0, sourceWidth, sourceHeight);

  const pixels = sourceContext.getImageData(0, 0, sourceWidth, sourceHeight).data;
  const step = Math.max(2, Math.round(Math.sqrt((sourceWidth * sourceHeight) / targetCount)));
  const particles = [];

  for (let y = 0; y < sourceHeight; y += step) {
    for (let x = 0; x < sourceWidth; x += step) {
      const index = (y * sourceWidth + x) * 4;
      const alpha = pixels[index + 3];
      if (alpha < 30) continue;

      const red = pixels[index];
      const green = pixels[index + 1];
      const blue = pixels[index + 2];
      const nx = x / sourceWidth;
      const ny = y / sourceHeight;

      // The supplied character image contains a checkerboard preview. Ignore its
      // neutral paper tones and lower-right UI residue, preserving only the
      // illustrated character when building the particle field.
      const isCheckerboard = Math.max(red, green, blue) - Math.min(red, green, blue) < 9 && red > 184;
      if (isCheckerboard || ny > 0.94) continue;

      const luminance = Math.round(red * 0.299 + green * 0.587 + blue * 0.114);
      const particleTone = Math.round(156 + luminance * 0.38);

      particles.push({
        nx,
        ny,
        red: particleTone,
        green: particleTone,
        blue: particleTone,
        alpha: Math.max(0.5, alpha / 255),
        size: 0.7 + Math.random() * 1.15,
        phase: Math.random() * Math.PI * 2,
        delay: nx * 460 + Math.random() * 220,
        duration: 780 + Math.random() * 420,
        startX: -width * (0.55 + Math.random() * 0.9),
        startY: ny * height + (Math.random() - 0.5) * height * 0.65,
      });
    }
  }

  return particles;
}

export default function ParticlePortrait({ src, alt, className = "" }) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!root || !canvas || !image) return undefined;

    const context = canvas.getContext("2d");
    if (!context) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const pointer = { x: -9999, y: -9999, active: false };
    const metrics = { width: 0, height: 0 };
    let particles = [];
    let animationFrame = 0;
    let resizeTimer = 0;
    let startedAt = 0;

    function measure() {
      const rect = root.getBoundingClientRect();
      metrics.width = rect.width;
      metrics.height = rect.height;
      canvas.width = Math.round(rect.width * pixelRatio);
      canvas.height = Math.round(rect.height * pixelRatio);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.imageSmoothingEnabled = false;
    }

    function rebuild() {
      if (!metrics.width || !metrics.height || !image.naturalWidth) return;
      particles = readImageParticles(image, metrics.width, metrics.height, 3200);
    }

    function draw(now) {
      const elapsed = now - startedAt;
      const settledAt = 1780;
      const time = now * 0.001;
      const { width, height } = metrics;

      context.clearRect(0, 0, width, height);

      for (const particle of particles) {
        const progress = reduceMotion
          ? 1
          : clamp((elapsed - particle.delay) / particle.duration, 0, 1);
        const eased = easeOutCubic(progress);
        let x = particle.startX + (particle.nx * width - particle.startX) * eased;
        let y = particle.startY + (particle.ny * height - particle.startY) * eased;
        let hoverStrength = 0;

        if (progress >= 1) {
          x += Math.sin(time * 0.9 + particle.phase) * 0.38;
          y += Math.cos(time * 0.8 + particle.phase) * 0.38;
        }

        if (!reduceMotion && pointer.active) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const distance = Math.sqrt(dx * dx + dy * dy) || 1;
          const radius = Math.max(48, Math.min(72, width * 0.72));
          if (distance < radius) {
            hoverStrength = 1 - distance / radius;
            const force = hoverStrength * 12;
            x += (dx / distance) * force;
            y += (dy / distance) * force;
          }
        }

        const opacity = reduceMotion || elapsed > settledAt
          ? particle.alpha
          : particle.alpha * clamp(progress + 0.14, 0, 1);
        const size = particle.size * (1 + hoverStrength * 0.75);

        context.fillStyle = `rgba(${particle.red}, ${particle.green}, ${particle.blue}, ${opacity})`;
        context.fillRect(x, y, size, size);
        context.fillStyle = `rgba(255, 255, 255, ${opacity * 0.13})`;
        context.fillRect(x - 0.35, y - 0.35, size + 0.7, size + 0.7);
      }

      context.globalAlpha = 1;
      if (!reduceMotion && elapsed < settledAt + 600000) {
        animationFrame = requestAnimationFrame(draw);
      }
    }

    function handlePointerMove(event) {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    }

    function handlePointerLeave() {
      pointer.active = false;
    }

    function handleResize() {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        measure();
        rebuild();
        startedAt = performance.now() - 1780;
        cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(draw);
      }, 120);
    }

    function start() {
      measure();
      rebuild();
      root.classList.add("is-particle-ready");
      startedAt = performance.now();
      animationFrame = requestAnimationFrame(draw);
    }

    if (image.complete && image.naturalWidth) {
      start();
    } else {
      image.addEventListener("load", start, { once: true });
    }

    root.addEventListener("pointermove", handlePointerMove, { passive: true });
    root.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      image.removeEventListener("load", start);
      root.removeEventListener("pointermove", handlePointerMove);
      root.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
      window.clearTimeout(resizeTimer);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <figure className={`particle-portrait ${className}`.trim()} ref={rootRef} aria-label={alt}>
      <img ref={imageRef} src={src} alt={alt} draggable="false" />
      <canvas ref={canvasRef} aria-hidden="true" />
    </figure>
  );
}
