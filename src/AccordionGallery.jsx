import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./AccordionGallery.css";

const DEFAULT_ITEMS = [];

export default function AccordionGallery({
  items = DEFAULT_ITEMS,
  defaultIndex = 0,
  accentColor = "#ffffff",
  overlayColor = "#060606",
  textColor = "#ffffff",
  height = 460,
  gap = 8,
  radius = 0,
  expandRatio = 0.42,
  duration = 0.56,
  ease = "power3.out",
  parallax = 0.32,
  tilt = 4,
  stagger = 0.06,
  trigger = "hover",
  showLabels = true,
  className = "",
}) {
  const rootRef = useRef(null);
  const panelRefs = useRef([]);
  const mediaRefs = useRef([]);
  const barRefs = useRef([]);
  const textRefs = useRef([]);
  const timelineRef = useRef(null);
  const firstRunRef = useRef(true);
  const mediaSizeRef = useRef(320);
  const count = items.length;
  const [active, setActive] = useState(() => Math.min(Math.max(defaultIndex, 0), Math.max(count - 1, 0)));

  const prefersReduced = typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  const applyLayout = useCallback((animate) => {
    const panels = panelRefs.current;
    if (!panels.length || count === 0) return;

    const root = rootRef.current;
    const compact = root ? root.getBoundingClientRect().width <= 700 : false;
    const ratio = Math.min(Math.max(expandRatio, 0.2), 0.9);
    const grow = count > 1 ? (ratio * (count - 1)) / (1 - ratio) : 1;
    const mediaSize = mediaSizeRef.current;
    const compactCollapsedHeight = 52;
    const compactActiveHeight = root
      ? Math.max(236, root.getBoundingClientRect().height - compactCollapsedHeight * (count - 1) - gap * (count - 1))
      : 320;
    timelineRef.current?.kill();

    const durationValue = animate && !prefersReduced ? duration : 0;
    const timeline = gsap.timeline();

    panels.forEach((panel, index) => {
      if (!panel) return;
      const isActive = index === active;
      const media = mediaRefs.current[index];
      const bar = barRefs.current[index];
      const label = textRefs.current[index];
      const rotation = compact ? 0 : (isActive ? 0 : index < active ? tilt : -tilt);

      timeline.to(panel, compact
        ? {
          flexGrow: 0,
          flexBasis: `${isActive ? compactActiveHeight : compactCollapsedHeight}px`,
          rotateY: rotation,
          duration: durationValue,
          ease,
        }
        : { flexGrow: isActive ? grow : 1, flexBasis: 0, rotateY: rotation, duration: durationValue, ease }, 0);

      if (media) {
        const drift = Math.max(-1.5, Math.min(1.5, active - index));
        timeline.to(media, { xPercent: -50, yPercent: -50, x: isActive ? 0 : drift * parallax * mediaSize * 0.06, duration: durationValue, ease }, 0);
      }

      if (showLabels && bar && label) {
        timeline.to([bar, label], isActive
          ? { opacity: 1, x: 0, duration: durationValue, ease, stagger: prefersReduced ? 0 : stagger }
          : compact
            ? { opacity: 0.72, x: 0, duration: durationValue * 0.6, ease }
            : { opacity: 0, x: -14, duration: durationValue * 0.6, ease }, 0);
      }
    });

    timelineRef.current = timeline;
  }, [active, count, duration, ease, expandRatio, parallax, prefersReduced, showLabels, stagger, tilt]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || count === 0) return undefined;

    const measure = () => {
      const usable = Math.max(root.getBoundingClientRect().width - gap * (count - 1), 120);
      mediaSizeRef.current = Math.max(140, usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.22);
      root.style.setProperty("--ag-media-size", `${mediaSizeRef.current}px`);
      applyLayout(!firstRunRef.current);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    return () => observer.disconnect();
  }, [applyLayout, count, expandRatio, gap]);

  useEffect(() => {
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [applyLayout]);

  useEffect(() => () => timelineRef.current?.kill(), []);

  if (count === 0) return null;

  const setPanelActive = (index) => setActive(index);
  const handleClick = (index, event) => {
    if (index !== active) {
      event.preventDefault();
      setPanelActive(index);
    }
  };
  const handleKeyDown = (index, event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      setPanelActive((index + 1) % count);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      setPanelActive((index - 1 + count) % count);
    }
  };

  return (
    <div
      ref={rootRef}
      className={`accordion-gallery ${className}`.trim()}
      style={{
        "--ag-accent": accentColor,
        "--ag-overlay": overlayColor,
        "--ag-text": textColor,
        "--ag-gap": `${gap}px`,
        "--ag-radius": `${radius}px`,
        height: `${height}px`,
      }}
      role="navigation"
      aria-label="六大内容分类"
    >
      {items.map((item, index) => {
        const isActive = index === active;
        const Tag = item.link ? "a" : "div";
        return (
          <Tag
            key={item.label || index}
            ref={(element) => { panelRefs.current[index] = element; }}
            className={`ag-panel${isActive ? " ag-panel--active" : ""}`}
            href={item.link || undefined}
            onClick={(event) => handleClick(index, event)}
            onMouseEnter={() => {
              if (trigger === "hover" && window.matchMedia("(min-width: 701px)").matches) {
                setPanelActive(index);
              }
            }}
            onFocus={() => {
              if (window.matchMedia("(min-width: 701px)").matches) {
                setPanelActive(index);
              }
            }}
            onKeyDown={(event) => handleKeyDown(index, event)}
            role={item.link ? undefined : "button"}
            tabIndex={item.link ? undefined : 0}
            aria-current={isActive ? "true" : undefined}
            aria-label={item.label}
          >
            <span className="ag-panel__frame">
              <span className="ag-panel__media" ref={(element) => { mediaRefs.current[index] = element; }}>
                <img src={item.image} alt={item.alt || item.label || ""} draggable="false" />
              </span>
              <span className="ag-panel__overlay" aria-hidden="true" />
            </span>
            {showLabels && (
              <span className="ag-panel__label" aria-hidden="true">
                <span className="ag-panel__bar" ref={(element) => { barRefs.current[index] = element; }} />
                <span className="ag-panel__text" ref={(element) => { textRefs.current[index] = element; }}>{item.label}</span>
              </span>
            )}
          </Tag>
        );
      })}
    </div>
  );
}
