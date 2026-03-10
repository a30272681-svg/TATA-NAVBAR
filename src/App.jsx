import { useState, useRef, useEffect, useCallback } from "react";

/* ─────────────────────────────────────────────
   NAV DATA  – every link has its own dropdown
───────────────────────────────────────────── */
const NAV_DATA = {
  Business: {
    heroImages: [
      { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80", label: "Business Overview", sub: "Global Operations" },
      { url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80", label: "Our Brands", sub: "150+ Companies" },
      { url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80", label: "Technology", sub: "Digital Future" },
      { url: "https://images.unsplash.com/photo-1565728744382-61accd4aa148?w=900&q=80", label: "Automotive", sub: "Tata Motors" },
      { url: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=900&q=80", label: "Steel", sub: "Tata Steel" },
      { url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80", label: "Infrastructure", sub: "Building Tomorrow" },
    ],
    sections: [
      { heading: "Business Overview", sub: "Learn more", items: [] },
      { heading: "Our Brands", sub: "Browse select Tata brands", items: [] },
      {
        heading: "Business Verticals", sub: "",
        items: ["Technology", "Steel", "Automotive", "Consumer & Retail", "Infrastructure", "Financial Services", "Aerospace & Defence", "Tourism & Travel", "Telecom & Media", "Trading & Investments"],
      },
    ],
    stat: "₹ 165 Billion Revenue · 100+ Countries · 935,000+ Employees",
  },
  Community: {
    heroImages: [
      { url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=900&q=80", label: "Overview", sub: "Our Mission" },
      { url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80", label: "Health", sub: "Wellness Programs" },
      { url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&q=80", label: "Education", sub: "Empowering Minds" },
      { url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80", label: "Empowerment", sub: "Women & Youth" },
      { url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80", label: "Environment", sub: "Sustainability" },
    ],
    sections: [
      { heading: "Overview", sub: "Areas of Work", items: [] },
      {
        heading: "Areas of Work", sub: "",
        items: ["Health", "Education", "Empowerment", "Environment", "Arts & Culture", "Disaster Relief"],
      },
    ],
    stat: "60+ Years of Service · ₹3,000 Cr CSR · 10M+ Lives Touched",
  },
  "About Us": {
    heroImages: [
      { url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&q=80", label: "The Tata Group", sub: "Our Story" },
      { url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&q=80", label: "Leadership", sub: "Visionaries" },
      { url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80", label: "Heritage", sub: "Since 1868" },
      { url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&q=80", label: "Sustainability", sub: "Responsible Growth" },
      { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80", label: "Investors", sub: "Stock & Data" },
    ],
    sections: [
      {
        heading: "The Tata Group", sub: "About the Tata Group",
        items: ["Tata Sons", "Values and Purpose", "Tata Code of Conduct", "Heritage", "Leadership", "Sponsorships", "Sustainability", "Innovation", "Books"],
      },
      {
        heading: "Investors", sub: "Investor Section",
        items: ["Companies", "Business Verticals", "Stock Data"],
      },
    ],
    stat: "Founded 1868 · Jamsetji Tata Legacy · India's Most Trusted Group",
  },
  Newsroom: {
    heroImages: [
      { url: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80", label: "News & Features", sub: "Latest Updates" },
      { url: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=900&q=80", label: "Press Releases", sub: "Official Statements" },
      { url: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=900&q=80", label: "Media Gallery", sub: "Photos & Videos" },
      { url: "https://images.unsplash.com/photo-1526628953301-3cd95e2e0d7b?w=900&q=80", label: "Stories", sub: "Human Interest" },
    ],
    sections: [
      {
        heading: "News & Features", sub: "Get the latest news",
        items: ["Top Stories", "Press Releases", "Media Gallery", "Tata Review", "Photo Essays", "Videos", "Podcasts", "Archives"],
      },
    ],
    stat: "Daily Updates · Global Coverage · Award-Winning Journalism",
  },
  Careers: {
    heroImages: [
      { url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=80", label: "Join Tata", sub: "Build Your Future" },
      { url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80", label: "Culture", sub: "Where You Belong" },
      { url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80", label: "Graduate Programs", sub: "Tata Scholars" },
      { url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&q=80", label: "Leadership Roles", sub: "Senior Positions" },
    ],
    sections: [
      {
        heading: "Work with Us", sub: "Shape Tomorrow",
        items: ["Current Openings", "Life at Tata", "Graduate Programs", "Lateral Hiring", "Leadership Roles", "Internships", "Benefits", "Culture & Values"],
      },
    ],
    stat: "935,000+ Employees · 100+ Countries · #1 Employer Brand India",
  },
};

const navLinks = Object.keys(NAV_DATA);

/* ─── Image Panel Component ─── */
function ImagePanel({ images, activeIdx, prevIdx, transitioning, onDotClick }) {
  return (
    <div style={{ position: "relative", overflow: "hidden", flexShrink: 0, width: "40%", minHeight: 420 }}>
      {prevIdx !== null && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          backgroundImage: `url(${images[prevIdx].url})`,
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: transitioning ? 0 : 1,
          transition: "opacity 0.65s ease",
        }} />
      )}
      <div
        key={`${activeIdx}-base`}
        style={{
          position: "absolute", inset: 0, zIndex: 2,
          backgroundImage: `url(${images[activeIdx].url})`,
          backgroundSize: "cover", backgroundPosition: "center",
          animation: "kenBurns 5s ease-out forwards",
        }}
      />
      <div style={{ position: "absolute", inset: 0, zIndex: 3, background: "linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 65%)" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 3, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)" }} />
      <div style={{ position: "absolute", bottom: 28, left: 28, zIndex: 5 }}>
        <div style={{ fontSize: 9, letterSpacing: "0.32em", color: "#D4AF37", textTransform: "uppercase", marginBottom: 5 }}>
          {images[activeIdx].sub}
        </div>
        <div style={{ fontSize: 22, fontWeight: 600, color: "#fff", fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.2, marginBottom: 14 }}>
          {images[activeIdx].label}
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          {images.map((_, i) => (
            <div key={i} onClick={() => onDotClick(i)} style={{
              width: i === activeIdx ? 22 : 5, height: 3, borderRadius: 2,
              background: i === activeIdx ? "#D4AF37" : "rgba(255,255,255,0.28)",
              transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)", cursor: "pointer",
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Dropdown Content Component ─── */
function DropdownContent({ linkName, data, onVerticalHover, onVerticalLeave, hoveredItem, setCursorActive }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "28px 36px 24px" }}>
      <div style={{ flex: 1 }}>
        {data.sections.map((section, si) => (
          <div key={si} style={{ marginBottom: si < data.sections.length - 1 ? 20 : 0 }}>
            <div style={{ borderBottom: "1px solid rgba(212,175,55,0.14)", paddingBottom: 10, marginBottom: 12 }}>
              <div style={{ fontSize: 17, fontWeight: 600, color: "#fff", fontFamily: "'Cormorant Garamond', serif", marginBottom: 2 }}>
                {section.heading}
              </div>
              {section.sub && (
                <div style={{ fontSize: 10, color: "#D4AF37", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                  {section.sub} →
                </div>
              )}
            </div>
            {section.items.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px 0" }}>
                {section.items.map((item) => (
                  <div
                    key={item}
                    onMouseEnter={() => { onVerticalHover(item, linkName); setCursorActive(true); }}
                    onMouseLeave={() => { onVerticalLeave(); setCursorActive(false); }}
                    style={{
                      fontSize: 12.5, color: hoveredItem === item ? "#D4AF37" : "#bbb",
                      fontFamily: "'Cormorant Garamond', serif",
                      letterSpacing: "0.04em", padding: "5px 0",
                      cursor: "none",
                      transition: "color 0.2s, transform 0.22s",
                      transform: hoveredItem === item ? "translateX(8px)" : "translateX(0)",
                      display: "flex", alignItems: "center", gap: 5,
                    }}
                  >
                    <span style={{
                      display: "inline-block",
                      width: hoveredItem === item ? 13 : 0,
                      height: 1, background: "#D4AF37",
                      transition: "width 0.25s", overflow: "hidden", flexShrink: 0,
                    }} />
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{
        paddingTop: 14, borderTop: "1px solid rgba(212,175,55,0.08)",
        fontSize: 9, letterSpacing: "0.22em", color: "#3a3a3a", textTransform: "uppercase",
      }}>
        {data.stat}
      </div>
    </div>
  );
}

/* ════════════════════ MAIN ════════════════════ */
export default function TataNavbar() {
  const [activeNav, setActiveNav] = useState(null);
  const [imgIndices, setImgIndices] = useState(() => Object.fromEntries(navLinks.map((k) => [k, 0])));
  const [prevIndices, setPrevIndices] = useState(() => Object.fromEntries(navLinks.map((k) => [k, null])));
  const [transitioning, setTransitioning] = useState(() => Object.fromEntries(navLinks.map((k) => [k, false])));
  const [cursorPos, setCursorPos] = useState({ x: -200, y: -200 });
  const [cursorActive, setCursorActive] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const intervalRef = useRef(null);
  const leaveTimer = useRef(null);

  useEffect(() => {
    const move = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const changeImage = useCallback((linkName, getNext) => {
    const len = NAV_DATA[linkName].heroImages.length;
    setImgIndices((prev) => {
      const current = prev[linkName];
      const next = getNext(current, len);
      if (next === current) return prev;
      setPrevIndices((p) => ({ ...p, [linkName]: current }));
      setTransitioning((t) => ({ ...t, [linkName]: true }));
      setTimeout(() => {
        setPrevIndices((p) => ({ ...p, [linkName]: null }));
        setTransitioning((t) => ({ ...t, [linkName]: false }));
      }, 750);
      return { ...prev, [linkName]: next };
    });
  }, []);

  const startAutoPlay = useCallback((linkName) => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      changeImage(linkName, (cur, len) => (cur + 1) % len);
    }, 2500);
  }, [changeImage]);

  useEffect(() => {
    if (activeNav) startAutoPlay(activeNav);
    else clearInterval(intervalRef.current);
    return () => clearInterval(intervalRef.current);
  }, [activeNav, startAutoPlay]);

  const handleVerticalHover = useCallback((item, linkName) => {
    setHoveredItem(item);
    const images = NAV_DATA[linkName].heroImages;
    const idx = images.findIndex((img) =>
      img.label.toLowerCase().includes(item.toLowerCase().split(" ")[0])
    );
    if (idx !== -1) {
      clearInterval(intervalRef.current);
      changeImage(linkName, () => idx);
    }
  }, [changeImage]);

  const handleVerticalLeave = useCallback(() => {
    setHoveredItem(null);
    if (activeNav) startAutoPlay(activeNav);
  }, [activeNav, startAutoPlay]);

  const handleNavEnter = (link) => {
    clearTimeout(leaveTimer.current);
    setActiveNav(link);
  };
  const handleNavLeave = () => {
    leaveTimer.current = setTimeout(() => {
      setActiveNav(null);
      setCursorActive(false);
    }, 100);
  };

  const heroBg = {
    Business: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1800&q=80",
    Community: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1800&q=80",
    "About Us": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1800&q=80",
    Newsroom: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1800&q=80",
    Careers: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1800&q=80",
  };
  const activeBg = activeNav ? heroBg[activeNav] : heroBg.Business;

  return (
    <div style={{ minHeight: "100vh", background: "#050505", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>

      {/* ── Cursor dot ── */}
      <div style={{
        position: "fixed", left: cursorPos.x, top: cursorPos.y,
        width: cursorActive ? 46 : 10, height: cursorActive ? 46 : 10,
        borderRadius: "50%",
        border: "1.5px solid #D4AF37",
        background: cursorActive ? "rgba(212,175,55,0.1)" : "rgba(212,175,55,0.8)",
        transform: "translate(-50%,-50%)",
        transition: "width 0.22s, height 0.22s, background 0.22s",
        pointerEvents: "none", zIndex: 99999, mixBlendMode: "difference",
      }} />
      <div style={{
        position: "fixed", left: cursorPos.x, top: cursorPos.y,
        width: 4, height: 4, borderRadius: "50%", background: "#D4AF37",
        transform: "translate(-50%,-50%)",
        pointerEvents: "none", zIndex: 99999,
      }} />

      {/* ══════════ NAVBAR ══════════ */}
      <nav
        onMouseLeave={handleNavLeave}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: activeNav ? "rgba(2,2,2,0.99)" : "rgba(0,0,0,0.88)",
          borderBottom: "1px solid rgba(212,175,55,0.1)",
          backdropFilter: "blur(18px)",
          transition: "background 0.4s",
        }}
      >
        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", height: 62 }}>

          {/* Logo */}
          <div
            onMouseEnter={() => setCursorActive(true)}
            onMouseLeave={() => setCursorActive(false)}
            style={{ display: "flex", alignItems: "center", gap: 10, cursor: "none" }}
          >
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
              <circle cx="19" cy="19" r="18" stroke="#D4AF37" strokeWidth="1" />
              <path d="M9 12h20M19 12v14" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M13 26h12" stroke="#D4AF37" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <span style={{ color: "#fff", fontSize: 20, fontWeight: 700, letterSpacing: "0.22em" }}>TATA</span>
          </div>

          {/* Links */}
          <div style={{ display: "flex" }}>
            {navLinks.map((link) => (
              <div key={link} onMouseEnter={() => handleNavEnter(link)} style={{ position: "relative" }}>
                <button style={{
                  color: activeNav === link ? "#D4AF37" : "#d8d8d8",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 14, fontWeight: activeNav === link ? 600 : 400,
                  letterSpacing: "0.1em", padding: "8px 20px",
                  background: "none", border: "none", cursor: "none",
                  transition: "color 0.25s", position: "relative",
                }}>
                  {link}
                  <span style={{
                    position: "absolute", bottom: 3, left: 20, right: 20,
                    height: 1, background: "#D4AF37",
                    transform: activeNav === link ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
                    display: "block",
                  }} />
                </button>
              </div>
            ))}
          </div>

          {/* Icons */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {[
              "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",
              "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
              "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
            ].map((d, i) => (
              <button key={i}
                onMouseEnter={() => setCursorActive(true)}
                onMouseLeave={() => setCursorActive(false)}
                style={{ background: "none", border: "none", cursor: "none", padding: 4, color: "#666", transition: "color 0.2s" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#D4AF37")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#666")}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d={d} /></svg>
              </button>
            ))}
          </div>
        </div>

        {/* ══════ MEGA DROPDOWNS ══════ */}
        {navLinks.map((link) => {
          const data = NAV_DATA[link];
          const isOpen = activeNav === link;
          return (
            <div
              key={link}
              onMouseEnter={() => handleNavEnter(link)}
              style={{
                maxHeight: isOpen ? 500 : 0,
                opacity: isOpen ? 1 : 0,
                overflow: "hidden",
                transition: "max-height 0.52s cubic-bezier(0.4,0,0.2,1), opacity 0.3s",
                background: "rgba(3,3,3,0.99)",
                borderTop: isOpen ? "1px solid rgba(212,175,55,0.15)" : "none",
                pointerEvents: isOpen ? "auto" : "none",
              }}
            >
              <div style={{ display: "flex", minHeight: 420 }}>
                <ImagePanel
                  images={data.heroImages}
                  activeIdx={imgIndices[link]}
                  prevIdx={prevIndices[link]}
                  transitioning={transitioning[link]}
                  onDotClick={(i) => changeImage(link, () => i)}
                />
                <DropdownContent
                  linkName={link}
                  data={data}
                  onVerticalHover={handleVerticalHover}
                  onVerticalLeave={handleVerticalLeave}
                  hoveredItem={hoveredItem}
                  setCursorActive={setCursorActive}
                />
              </div>
            </div>
          );
        })}
      </nav>

      {/* ══════════ HERO ══════════ */}
      <div style={{ paddingTop: 62, minHeight: "100vh", position: "relative", overflow: "hidden" }}>
        <div
          key={activeBg}
          style={{
            position: "absolute", inset: 0,
            backgroundImage: `url(${activeBg})`,
            backgroundSize: "cover", backgroundPosition: "center",
            filter: "brightness(0.27)",
            animation: "heroBgFade 0.7s ease",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(125deg, rgba(0,0,0,0.78) 0%, transparent 55%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 40%)" }} />

        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "calc(100vh - 62px)", padding: "0 80px" }}>
          <div style={{ fontSize: 9, letterSpacing: "0.4em", color: "#D4AF37", textTransform: "uppercase", marginBottom: 14, animation: "fadeUp 0.7s ease both" }}>
            Featured Story
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(50px, 6.5vw, 94px)", fontWeight: 600,
            color: "#fff", lineHeight: 1.04, maxWidth: 660, marginBottom: 20,
            animation: "fadeUp 0.8s 0.05s ease both",
          }}>
            Gearing Up<br />For Success
          </h1>
          <p style={{ color: "#999", fontSize: 14.5, maxWidth: 380, lineHeight: 1.8, marginBottom: 36, animation: "fadeUp 0.85s 0.12s ease both" }}>
            Driving innovation across industries — Tata Group shapes the future of global commerce.
          </p>
          <button
            onMouseEnter={() => setCursorActive(true)}
            onMouseLeave={() => setCursorActive(false)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "none", border: "1px solid #D4AF37",
              color: "#D4AF37", padding: "13px 28px",
              fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase",
              cursor: "none", width: "fit-content",
              transition: "all 0.3s",
              animation: "fadeUp 0.9s 0.18s ease both",
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = "#D4AF37"; e.currentTarget.style.color = "#000"; }}
            onMouseOut={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#D4AF37"; }}
          >
            Explore More <span style={{ fontSize: 15 }}>→</span>
          </button>
        </div>

        {/* Chevrons */}
        <div style={{ position: "absolute", bottom: 28, right: 34, display: "flex", flexDirection: "column", gap: 3 }}>
          {[0.2, 0.5, 0.85].map((op, i) => (
            <svg key={i} width="16" height="9" viewBox="0 0 16 9" fill="none" style={{ opacity: op }}>
              <path d="M1 1l7 7 7-7" stroke="#D4AF37" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          ))}
        </div>
      </div>

      {/* GLOBAL STYLES */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { cursor: none !important; background: #050505; }
        button { outline: none; font-family: inherit; }

        @keyframes kenBurns {
          from { transform: scale(1); }
          to   { transform: scale(1.07); }
        }
        @keyframes heroBgFade {
          from { opacity: 0; transform: scale(1.03); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
