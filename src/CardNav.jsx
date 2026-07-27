import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react";
import { gsap } from "gsap";

import ShinyText from "./ShinyText.jsx";
import "./CardNav.css";

const isExternalHref = (href) => /^https?:\/\//.test(href || "");
const isHashHref = (href) => (href || "").startsWith("#");

const CardNav = ({
  logo,
  logoAlt = "Logo",
  brandMark = "CS",
  brandLabel = "CHEN SHUO",
  brandKicker = "AI / PRODUCT / SYSTEM",
  items = [],
  className = "",
  ease = "power3.out",
  baseColor = "#f6f6f1",
  menuColor = "#080909",
  buttonBgColor = "#080909",
  buttonTextColor = "#f6f6f1",
  ctaLabel = "联系",
  ctaHref = "#contact",
  secondaryCtaLabel,
  secondaryCtaHref,
  actionItems,
  backHref,
  backLabel = "返回",
  onLinkClick,
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);

  const calculateHeight = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl) return 280;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      const contentEl = navEl.querySelector(".card-nav-content");
      if (!contentEl) return 280;

      const previous = {
        visibility: contentEl.style.visibility,
        pointerEvents: contentEl.style.pointerEvents,
        position: contentEl.style.position,
        height: contentEl.style.height,
      };

      contentEl.style.visibility = "visible";
      contentEl.style.pointerEvents = "auto";
      contentEl.style.position = "static";
      contentEl.style.height = "auto";

      const topBar = 64;
      const padding = 16;
      const contentHeight = contentEl.scrollHeight;

      contentEl.style.visibility = previous.visibility;
      contentEl.style.pointerEvents = previous.pointerEvents;
      contentEl.style.position = previous.position;
      contentEl.style.height = previous.height;

      return topBar + contentHeight + padding;
    }

    return 282;
  }, []);

  const createTimeline = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 64, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 44, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.42,
      ease,
    });

    tl.to(
      cardsRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.42,
        ease,
        stagger: 0.08,
      },
      "-=0.12",
    );

    return tl;
  }, [calculateHeight, ease]);

  useLayoutEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, items.length);
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [createTimeline, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      const tl = tlRef.current;
      if (!tl) return;

      tl.kill();
      const newTl = createTimeline();
      if (!newTl) return;

      if (isExpanded) {
        newTl.progress(1);
        gsap.set(navRef.current, { height: calculateHeight() });
      }

      tlRef.current = newTl;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateHeight, createTimeline, isExpanded]);

  const closeMenu = useCallback(() => {
    const tl = tlRef.current;
    if (!tl || !isExpanded) return;

    setIsHamburgerOpen(false);
    tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
    tl.reverse();
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;

    if (!isExpanded) {
      tl.eventCallback("onReverseComplete", null);
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
      return;
    }

    closeMenu();
  };

  const handleLinkClick = (event, href) => {
    if (href && isHashHref(href) && onLinkClick) {
      onLinkClick(event, href);
    }

    window.requestAnimationFrame(closeMenu);
  };

  const setCardRef = (index) => (element) => {
    if (element) cardsRef.current[index] = element;
  };

  const ctaIsExternal = isExternalHref(ctaHref);
  const secondaryCtaIsExternal = isExternalHref(secondaryCtaHref);
  const navActionItems =
    actionItems !== undefined
      ? actionItems
      : [
          secondaryCtaLabel && secondaryCtaHref
            ? { label: secondaryCtaLabel, href: secondaryCtaHref, variant: "secondary" }
            : null,
          { label: ctaLabel, href: ctaHref, variant: "primary" },
        ].filter(Boolean);

  return (
    <div className={`card-nav-container ${className}`}>
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? "open" : ""}`}
        style={{ backgroundColor: baseColor }}
        aria-label="主导航"
      >
        <div className="card-nav-top">
          <div className="card-nav-left">
            {backHref && (
              <a
                className="card-nav-back-button"
                href={backHref}
                aria-label={backLabel}
                onClick={(event) => handleLinkClick(event, backHref)}
                style={{ color: menuColor }}
              >
                <ArrowLeft size={19} weight="bold" aria-hidden="true" />
                <span>{backLabel}</span>
              </a>
            )}

          <button
            type="button"
            className={`hamburger-menu ${isHamburgerOpen ? "open" : ""}`}
            onClick={toggleMenu}
            aria-label={isExpanded ? "关闭导航" : "打开导航"}
            aria-expanded={isExpanded}
            style={{ color: menuColor }}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
          </div>

          <a className="logo-container" href="#top" onClick={(event) => handleLinkClick(event, "#top")}>
            {logo ? (
              <img src={logo} alt={logoAlt} className="logo" />
            ) : (
              <span className="card-nav-logo-mark">{brandMark}</span>
            )}
            <span className="card-nav-logo-copy">
              <strong>
                <ShinyText
                  text={brandLabel}
                  speed={2.6}
                  delay={0.4}
                  color="rgba(8, 9, 9, 0.72)"
                  shineColor="#000000"
                  spread={118}
                  className="card-nav-shiny-brand"
                />
              </strong>
              <small>{brandKicker}</small>
            </span>
          </a>

          <div className="card-nav-actions">
            {navActionItems.map((item) => {
              const itemIsExternal = isExternalHref(item.href);
              const isSecondary = item.variant !== "primary-dark";
              return (
              <a
                className={`card-nav-cta-button ${isSecondary ? "card-nav-cta-button-secondary" : ""}`}
                href={item.href}
                key={`${item.label}-${item.href}`}
                target={itemIsExternal ? "_blank" : undefined}
                rel={itemIsExternal ? "noreferrer" : undefined}
                onClick={(event) => handleLinkClick(event, item.href)}
                style={
                  isSecondary
                    ? { color: buttonBgColor }
                    : { backgroundColor: buttonBgColor, color: buttonTextColor }
                }
              >
                {item.label}
                <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
              </a>
              );
            })}
          </div>
        </div>

        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {items.slice(0, 3).map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              className="nav-card"
              ref={setCardRef(index)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label">
                <ShinyText
                  text={item.label}
                  speed={3.2}
                  delay={index * 0.24}
                  color={item.labelColor || item.textColor}
                  shineColor={item.shineColor || "#ffffff"}
                  spread={112}
                  className="card-nav-shiny-label"
                />
              </div>
              <div className="nav-card-links">
                {item.links?.map((link, linkIndex) => (
                  <a
                    key={`${link.label}-${link.href || linkIndex}`}
                    className="nav-card-link"
                    href={link.href}
                    aria-label={link.ariaLabel}
                    target={isExternalHref(link.href) ? "_blank" : undefined}
                    rel={isExternalHref(link.href) ? "noreferrer" : undefined}
                    onClick={(event) => handleLinkClick(event, link.href)}
                  >
                    <ArrowUpRight className="nav-card-link-icon" size={15} weight="bold" aria-hidden="true" />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
