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

const NEWS_ITEMS = [
  {
    img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80",
    category: "Business",
    title: "Tata Group Reports Record Revenue in FY2024",
    desc: "The conglomerate surpassed all expectations with a 18% growth across key verticals globally.",
    date: "March 2024",
  },
  {
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
    category: "Technology",
    title: "TCS Launches AI-Powered Platform for Enterprises",
    desc: "Tata Consultancy Services unveils its next-generation intelligent automation suite.",
    date: "February 2024",
  },
  {
    img: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80",
    category: "Community",
    title: "Tata Trusts Impact 10 Million Lives Through CSR",
    desc: "From rural health to digital literacy, Tata's outreach programs continue to transform India.",
    date: "January 2024",
  },
  {
    img: "https://images.unsplash.com/photo-1565728744382-61accd4aa148?w=600&q=80",
    category: "Automotive",
    title: "Tata Motors EV Sales Cross 100,000 Units",
    desc: "India's leading EV manufacturer celebrates a landmark milestone in sustainable mobility.",
    date: "December 2023",
  },
];

const BRAND_LOGOS = [
  { name: "TCS", color: "#0033A1" },
  { name: "Jaguar\nLand Rover", color: "#1a1a1a" },
  { name: "Tata\nSteel", color: "#00529b" },
  { name: "Tata\nMotors", color: "#003399" },
  { name: "Titan", color: "#b8860b" },
  { name: "Tata\nPower", color: "#1e7e34" },
  { name: "Tata\nChemicals", color: "#8b1a1a" },
  { name: "Indian\nHotels", color: "#5c2d91" },
];

const STATS = [
  { num: "165B", label: "Annual Revenue (USD)", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" },
  { num: "935K+", label: "Global Employees", icon: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" },
  { num: "100+", label: "Countries Operated", icon: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" },
  { num: "1868", label: "Year Founded", icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" },
];

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

/* ─── Share Modal ─── */
function ShareModal({ isOpen, onClose, isDark }) {
  const [copied, setCopied] = useState(false);
  const url = "https://www.tata.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareOptions = [
    {
      name: "Twitter / X",
      color: "#000",
      icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z",
      action: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent("Explore the Tata Group - Building India's Future")}`, "_blank"),
    },
    {
      name: "LinkedIn",
      color: "#0077b5",
      icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
      action: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank"),
    },
    {
      name: "Facebook",
      color: "#1877f2",
      icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank"),
    },
    {
      name: "WhatsApp",
      color: "#25d366",
      icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
      action: () => window.open(`https://wa.me/?text=${encodeURIComponent("Explore the Tata Group: " + url)}`, "_blank"),
    },
    {
      name: "Email",
      color: "#EA4335",
      icon: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
      action: () => window.open(`mailto:?subject=${encodeURIComponent("Tata Group")}&body=${encodeURIComponent("Check out the Tata Group: " + url)}`, "_blank"),
    },
  ];

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100000,
      background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      animation: "fadeIn 0.25s ease",
    }} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: isDark ? "#111" : "#fff",
          border: "1px solid rgba(212,175,55,0.3)",
          borderRadius: 2, padding: "36px 40px", minWidth: 360,
          animation: "slideUp 0.3s ease",
          boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: "0.3em", color: "#D4AF37", textTransform: "uppercase", marginBottom: 4 }}>Share</div>
            <div style={{ fontSize: 22, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: isDark ? "#fff" : "#000" }}>
              Spread the Word
            </div>
          </div>
          <button onClick={onClose} style={{
            background: "none", border: "1px solid rgba(212,175,55,0.3)", color: isDark ? "#fff" : "#000",
            width: 36, height: 36, borderRadius: "50%", fontSize: 18, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
          }}>✕</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
          {shareOptions.map((opt) => (
            <button key={opt.name} onClick={opt.action} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "12px 16px",
              background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
              borderRadius: 2, cursor: "pointer", color: isDark ? "#ccc" : "#333",
              fontSize: 12, fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.06em",
              transition: "all 0.2s",
            }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = opt.color; e.currentTarget.style.color = opt.color; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"; e.currentTarget.style.color = isDark ? "#ccc" : "#333"; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill={opt.color}><path d={opt.icon} /></svg>
              {opt.name}
            </button>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(212,175,55,0.15)", paddingTop: 20 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#D4AF37", textTransform: "uppercase", marginBottom: 10 }}>Copy Link</div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{
              flex: 1, padding: "10px 14px", fontSize: 11,
              background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
              border: "1px solid rgba(212,175,55,0.2)", color: isDark ? "#888" : "#555",
              fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>{url}</div>
            <button onClick={handleCopy} style={{
              padding: "10px 18px", background: copied ? "#D4AF37" : "none",
              border: "1px solid #D4AF37", color: copied ? "#000" : "#D4AF37",
              fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
              cursor: "pointer", transition: "all 0.25s", fontFamily: "'Cormorant Garamond', serif",
            }}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════ MAIN ════════════════════ */
export default function TataWebsite() {
  const [activeNav, setActiveNav] = useState(null);
  const [imgIndices, setImgIndices] = useState(() => Object.fromEntries(navLinks.map((k) => [k, 0])));
  const [prevIndices, setPrevIndices] = useState(() => Object.fromEntries(navLinks.map((k) => [k, null])));
  const [transitioning, setTransitioning] = useState(() => Object.fromEntries(navLinks.map((k) => [k, false])));
  const [cursorPos, setCursorPos] = useState({ x: -200, y: -200 });
  const [cursorActive, setCursorActive] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isDark, setIsDark] = useState(true);
  const [shareOpen, setShareOpen] = useState(false);
  const [heroImg, setHeroImg] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const intervalRef = useRef(null);
  const heroIntervalRef = useRef(null);
  const leaveTimer = useRef(null);

  const heroImages = [
    { url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1800&q=80", title: "Gearing Up\nFor Success", sub: "Business" },
    { url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1800&q=80", title: "Building A\nBetter Tomorrow", sub: "Community" },
    { url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1800&q=80", title: "150 Years of\nTrust & Innovation", sub: "Heritage" },
    { url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1800&q=80", title: "Shape Your\nFuture With Us", sub: "Careers" },
  ];

  useEffect(() => {
    const move = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Auto rotate hero images every 10 seconds
  useEffect(() => {
    heroIntervalRef.current = setInterval(() => {
      setHeroImg((prev) => (prev + 1) % heroImages.length);
    }, 10000);
    return () => clearInterval(heroIntervalRef.current);
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

  const bg = isDark ? "#050505" : "#f8f5f0";
  const textCol = isDark ? "#fff" : "#111";
  const mutedCol = isDark ? "#888" : "#666";
  const cardBg = isDark ? "#0e0e0e" : "#fff";
  const borderCol = isDark ? "rgba(212,175,55,0.15)" : "rgba(0,0,0,0.08)";

  return (
    <div style={{ minHeight: "100vh", background: bg, fontFamily: "'Cormorant Garamond', Georgia, serif", transition: "background 0.4s, color 0.4s" }}>

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

      {/* Share Modal */}
      <ShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} isDark={isDark} />

      {/* ══════════ NAVBAR ══════════ */}
      <nav
        onMouseLeave={handleNavLeave}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: activeNav ? "rgba(2,2,2,0.99)" : isDark ? "rgba(0,0,0,0.88)" : "rgba(255,255,255,0.95)",
          borderBottom: `1px solid rgba(212,175,55,0.1)`,
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
            onClick={() => setActiveSection("home")}
            style={{ display: "flex", alignItems: "center", gap: 10, cursor: "none" }}
          >
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
              <circle cx="19" cy="19" r="18" stroke="#D4AF37" strokeWidth="1" />
              <path d="M9 12h20M19 12v14" stroke={activeNav ? "#ffffff" : isDark ? "#ffffff" : "#111"} strokeWidth="2.2" strokeLinecap="round" />
              <path d="M13 26h12" stroke="#D4AF37" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <span style={{ color: activeNav ? "#fff" : isDark ? "#fff" : "#111", fontSize: 20, fontWeight: 700, letterSpacing: "0.22em" }}>TATA</span>
          </div>

          {/* Links */}
          <div style={{ display: "flex" }}>
            {navLinks.map((link) => (
              <div key={link} onMouseEnter={() => handleNavEnter(link)} style={{ position: "relative" }}>
                <button style={{
                  color: activeNav === link ? "#D4AF37" : activeNav ? "#d8d8d8" : isDark ? "#d8d8d8" : "#333",
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
            {/* Globe */}
            <button
              onMouseEnter={() => setCursorActive(true)}
              onMouseLeave={() => setCursorActive(false)}
              style={{ background: "none", border: "none", cursor: "none", padding: 4, color: activeNav ? "#666" : isDark ? "#666" : "#888", transition: "color 0.2s" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#D4AF37")}
              onMouseOut={(e) => (e.currentTarget.style.color = activeNav ? "#666" : isDark ? "#666" : "#888")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </button>

            {/* Share */}
            <button
              onMouseEnter={() => setCursorActive(true)}
              onMouseLeave={() => setCursorActive(false)}
              onClick={() => setShareOpen(true)}
              style={{ background: "none", border: "none", cursor: "none", padding: 4, color: activeNav ? "#666" : isDark ? "#666" : "#888", transition: "color 0.2s" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#D4AF37")}
              onMouseOut={(e) => (e.currentTarget.style.color = activeNav ? "#666" : isDark ? "#666" : "#888")}
              title="Share"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
              </svg>
            </button>

            {/* Search */}
            <button
              onMouseEnter={() => setCursorActive(true)}
              onMouseLeave={() => setCursorActive(false)}
              style={{ background: "none", border: "none", cursor: "none", padding: 4, color: activeNav ? "#666" : isDark ? "#666" : "#888", transition: "color 0.2s" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#D4AF37")}
              onMouseOut={(e) => (e.currentTarget.style.color = activeNav ? "#666" : isDark ? "#666" : "#888")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
            </button>

            {/* Dark/Light toggle */}
            <button
              onMouseEnter={() => setCursorActive(true)}
              onMouseLeave={() => setCursorActive(false)}
              onClick={() => setIsDark(!isDark)}
              style={{
                background: "none", border: "1px solid rgba(212,175,55,0.3)",
                cursor: "none", padding: "4px 10px", borderRadius: 20,
                color: "#D4AF37", fontSize: 11, letterSpacing: "0.12em",
                transition: "all 0.25s", display: "flex", alignItems: "center", gap: 5,
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = "rgba(212,175,55,0.1)"; }}
              onMouseOut={(e) => { e.currentTarget.style.background = "none"; }}
            >
              {isDark ? (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#D4AF37"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-12.37l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0zM7.05 18.36l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0z" /></svg>
                  Light
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#D4AF37"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" /></svg>
                  Dark
                </>
              )}
            </button>
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
        {heroImages.map((h, i) => (
          <div
            key={i}
            style={{
              position: "absolute", inset: 0,
              backgroundImage: `url(${h.url})`,
              backgroundSize: "cover", backgroundPosition: "center",
              filter: "brightness(0.27)",
              opacity: heroImg === i ? 1 : 0,
              transition: "opacity 1.2s ease",
            }}
          />
        ))}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(125deg, rgba(0,0,0,0.78) 0%, transparent 55%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 40%)" }} />

        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "calc(100vh - 62px)", padding: "0 80px" }}>
          <div style={{ fontSize: 9, letterSpacing: "0.4em", color: "#D4AF37", textTransform: "uppercase", marginBottom: 14, animation: "fadeUp 0.7s ease both" }}>
            {heroImages[heroImg].sub}
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(50px, 6.5vw, 94px)", fontWeight: 600,
            color: "#fff", lineHeight: 1.04, maxWidth: 660, marginBottom: 20,
            animation: "fadeUp 0.8s 0.05s ease both",
            whiteSpace: "pre-line",
          }}>
            {heroImages[heroImg].title}
          </h1>
          <p style={{ color: "#999", fontSize: 14.5, maxWidth: 380, lineHeight: 1.8, marginBottom: 36, animation: "fadeUp 0.85s 0.12s ease both" }}>
            Driving innovation across industries — Tata Group shapes the future of global commerce.
          </p>
          <div style={{ display: "flex", gap: 14, animation: "fadeUp 0.9s 0.18s ease both", flexWrap: "wrap" }}>
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
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = "#D4AF37"; e.currentTarget.style.color = "#000"; }}
              onMouseOut={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#D4AF37"; }}
            >
              Explore More <span style={{ fontSize: 15 }}>→</span>
            </button>
            <button
              onMouseEnter={() => setCursorActive(true)}
              onMouseLeave={() => setCursorActive(false)}
              onClick={() => setShareOpen(true)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff", padding: "13px 28px",
                fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase",
                cursor: "none", width: "fit-content",
                transition: "all 0.3s",
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
              onMouseOut={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" /></svg>
              Share
            </button>
          </div>

          {/* Hero dots */}
          <div style={{ display: "flex", gap: 6, marginTop: 40 }}>
            {heroImages.map((_, i) => (
              <div key={i} onClick={() => setHeroImg(i)} style={{
                width: heroImg === i ? 28 : 6, height: 3, borderRadius: 2,
                background: heroImg === i ? "#D4AF37" : "rgba(255,255,255,0.2)",
                transition: "all 0.5s", cursor: "pointer",
              }} />
            ))}
          </div>
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

      {/* ══════════ STATS ══════════ */}
      <div style={{
        background: isDark ? "#080808" : "#f0ebe3",
        borderTop: `1px solid ${borderCol}`, borderBottom: `1px solid ${borderCol}`,
        padding: "60px 80px",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 40 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign: "center", animation: `fadeUp 0.6s ${i * 0.1}s both` }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#D4AF37" style={{ marginBottom: 12, opacity: 0.7 }}>
                <path d={s.icon} />
              </svg>
              <div style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 700, color: "#D4AF37", fontFamily: "'Cormorant Garamond', serif", lineHeight: 1 }}>
                {s.num}
              </div>
              <div style={{ fontSize: 10, letterSpacing: "0.2em", color: mutedCol, textTransform: "uppercase", marginTop: 8 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════ NEWS SECTION ══════════ */}
      <div style={{ padding: "100px 80px", background: bg }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 60 }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: "0.4em", color: "#D4AF37", textTransform: "uppercase", marginBottom: 12 }}>
              Latest
            </div>
            <h2 style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 600, color: textCol, fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.05, maxWidth: 400 }}>
              News & Stories
            </h2>
          </div>
          <button
            onMouseEnter={() => setCursorActive(true)}
            onMouseLeave={() => setCursorActive(false)}
            style={{
              background: "none", border: "1px solid #D4AF37",
              color: "#D4AF37", padding: "11px 24px",
              fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
              cursor: "none", transition: "all 0.3s",
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = "#D4AF37"; e.currentTarget.style.color = "#000"; }}
            onMouseOut={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#D4AF37"; }}
          >
            View All News →
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {NEWS_ITEMS.map((item, i) => (
            <NewsCard key={i} item={item} isDark={isDark} cardBg={cardBg} borderCol={borderCol} mutedCol={mutedCol} setCursorActive={setCursorActive} delay={i * 0.1} />
          ))}
        </div>
      </div>

      {/* ══════════ BRANDS ══════════ */}
      <div style={{
        background: isDark ? "#080808" : "#f0ebe3",
        padding: "80px 80px",
        borderTop: `1px solid ${borderCol}`,
      }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ fontSize: 9, letterSpacing: "0.4em", color: "#D4AF37", textTransform: "uppercase", marginBottom: 12 }}>Portfolio</div>
          <h2 style={{ fontSize: "clamp(32px,4vw,54px)", fontWeight: 600, color: textCol, fontFamily: "'Cormorant Garamond', serif" }}>Our Brands</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}>
          {BRAND_LOGOS.map((brand, i) => (
            <div key={i}
              onMouseEnter={() => setCursorActive(true)}
              onMouseLeave={() => setCursorActive(false)}
              style={{
                padding: "40px 20px", textAlign: "center", cursor: "none",
                border: `1px solid ${borderCol}`,
                background: isDark ? "rgba(255,255,255,0.01)" : "rgba(0,0,0,0.01)",
                transition: "all 0.3s",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = "#D4AF37";
                e.currentTarget.style.background = "rgba(212,175,55,0.04)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = borderCol;
                e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.01)" : "rgba(0,0,0,0.01)";
              }}
            >
              <div style={{
                fontSize: 13, fontWeight: 600, color: isDark ? "#aaa" : "#555",
                letterSpacing: "0.14em", textTransform: "uppercase", lineHeight: 1.4,
                fontFamily: "'Cormorant Garamond', serif",
                whiteSpace: "pre-line", textAlign: "center",
              }}>
                {brand.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════ COMMUNITY FEATURE ══════════ */}
      <div style={{ padding: "100px 0", background: bg, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 500 }}>
          <div style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=900&q=80)",
            backgroundSize: "cover", backgroundPosition: "center",
            position: "relative", minHeight: 500,
          }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, " + bg + ")" }} />
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)" }} />
            <div style={{ position: "absolute", bottom: 40, left: 50, zIndex: 2 }}>
              <div style={{ fontSize: 9, letterSpacing: "0.3em", color: "#D4AF37", textTransform: "uppercase" }}>Tata Trusts</div>
            </div>
          </div>
          <div style={{ padding: "60px 80px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: 9, letterSpacing: "0.4em", color: "#D4AF37", textTransform: "uppercase", marginBottom: 16 }}>Community</div>
            <h2 style={{ fontSize: "clamp(30px,4vw,52px)", fontWeight: 600, color: textCol, fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.1, marginBottom: 20 }}>
              Giving Back<br />to Society
            </h2>
            <p style={{ color: mutedCol, fontSize: 15, lineHeight: 1.8, maxWidth: 380, marginBottom: 32 }}>
              For over 60 years, Tata Trusts have worked to transform the lives of millions across India through health, education, and empowerment programs.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 36 }}>
              {[["₹3,000 Cr", "CSR Investment"], ["10M+", "Lives Touched"], ["60+", "Years of Service"], ["28", "States Reached"]].map(([num, lab]) => (
                <div key={lab}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: "#D4AF37", fontFamily: "'Cormorant Garamond', serif" }}>{num}</div>
                  <div style={{ fontSize: 10, letterSpacing: "0.14em", color: mutedCol, textTransform: "uppercase" }}>{lab}</div>
                </div>
              ))}
            </div>
            <button
              onMouseEnter={() => setCursorActive(true)}
              onMouseLeave={() => setCursorActive(false)}
              style={{
                background: "none", border: "1px solid #D4AF37", color: "#D4AF37",
                padding: "12px 26px", fontSize: 10, letterSpacing: "0.2em",
                textTransform: "uppercase", cursor: "none", width: "fit-content",
                transition: "all 0.3s",
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = "#D4AF37"; e.currentTarget.style.color = "#000"; }}
              onMouseOut={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#D4AF37"; }}
            >
              Learn More →
            </button>
          </div>
        </div>
      </div>

      {/* ══════════ CAREERS ══════════ */}
      <div style={{
        padding: "100px 80px",
        backgroundImage: "url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1800&q=80)",
        backgroundSize: "cover", backgroundPosition: "center",
        position: "relative",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.82)" }} />
        <div style={{ position: "relative", textAlign: "center" }}>
          <div style={{ fontSize: 9, letterSpacing: "0.4em", color: "#D4AF37", textTransform: "uppercase", marginBottom: 16 }}>Careers</div>
          <h2 style={{ fontSize: "clamp(36px,5vw,70px)", fontWeight: 600, color: "#fff", fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.05, marginBottom: 20, maxWidth: 600, margin: "0 auto 20px" }}>
            Build Your Future With Tata
          </h2>
          <p style={{ color: "#888", fontSize: 15, lineHeight: 1.8, maxWidth: 500, margin: "0 auto 40px" }}>
            Join 935,000+ professionals across 100+ countries. Be part of a legacy that has shaped nations and industries.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onMouseEnter={() => setCursorActive(true)}
              onMouseLeave={() => setCursorActive(false)}
              style={{
                background: "#D4AF37", border: "1px solid #D4AF37", color: "#000",
                padding: "14px 32px", fontSize: 10, letterSpacing: "0.24em",
                textTransform: "uppercase", cursor: "none", transition: "all 0.3s",
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#D4AF37"; }}
              onMouseOut={(e) => { e.currentTarget.style.background = "#D4AF37"; e.currentTarget.style.color = "#000"; }}
            >
              View Openings →
            </button>
            <button
              onMouseEnter={() => setCursorActive(true)}
              onMouseLeave={() => setCursorActive(false)}
              style={{
                background: "none", border: "1px solid rgba(255,255,255,0.3)", color: "#fff",
                padding: "14px 32px", fontSize: 10, letterSpacing: "0.24em",
                textTransform: "uppercase", cursor: "none", transition: "all 0.3s",
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = "#fff"; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
            >
              Life at Tata
            </button>
          </div>
        </div>
      </div>

      {/* ══════════ FOOTER ══════════ */}
      <footer style={{
        background: isDark ? "#030303" : "#111",
        borderTop: "1px solid rgba(212,175,55,0.1)",
        padding: "60px 80px 30px",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 60, marginBottom: 50 }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <svg width="36" height="36" viewBox="0 0 38 38" fill="none">
                <circle cx="19" cy="19" r="18" stroke="#D4AF37" strokeWidth="1" />
                <path d="M9 12h20M19 12v14" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M13 26h12" stroke="#D4AF37" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <span style={{ color: "#fff", fontSize: 18, fontWeight: 700, letterSpacing: "0.22em" }}>TATA</span>
            </div>
            <p style={{ color: "#555", fontSize: 13, lineHeight: 1.8, maxWidth: 280 }}>
              Building a better world through business. Since 1868, the Tata Group has been at the forefront of India's growth story.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              {["LinkedIn", "Twitter", "Facebook", "YouTube"].map((social) => (
                <button key={social}
                  onMouseEnter={() => setCursorActive(true)}
                  onMouseLeave={() => setCursorActive(false)}
                  style={{
                    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                    color: "#555", padding: "6px 12px", fontSize: 10, letterSpacing: "0.1em",
                    cursor: "none", transition: "all 0.2s",
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.color = "#D4AF37"; e.currentTarget.style.borderColor = "rgba(212,175,55,0.3)"; }}
                  onMouseOut={(e) => { e.currentTarget.style.color = "#555"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                >
                  {social}
                </button>
              ))}
            </div>
          </div>

          {[
            { title: "Company", links: ["About Us", "Leadership", "Heritage", "Sustainability", "Press Releases"] },
            { title: "Business", links: ["TCS", "Tata Motors", "Tata Steel", "Titan", "Tata Power"] },
            { title: "Resources", links: ["Newsroom", "Careers", "Investors", "Contact", "Sitemap"] },
          ].map((col) => (
            <div key={col.title}>
              <div style={{ fontSize: 10, letterSpacing: "0.28em", color: "#D4AF37", textTransform: "uppercase", marginBottom: 20 }}>{col.title}</div>
              {col.links.map((link) => (
                <div key={link}
                  onMouseEnter={() => setCursorActive(true)}
                  onMouseLeave={() => setCursorActive(false)}
                  style={{ color: "#555", fontSize: 13, marginBottom: 10, cursor: "none", transition: "color 0.2s" }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#D4AF37")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#555")}
                >
                  {link}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.12em", color: "#333" }}>
            © 2024 Tata Sons Private Limited. All rights reserved.
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((t) => (
              <span key={t}
                onMouseEnter={() => setCursorActive(true)}
                onMouseLeave={() => setCursorActive(false)}
                style={{ fontSize: 10, color: "#333", cursor: "none", transition: "color 0.2s", letterSpacing: "0.1em" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#D4AF37")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#333")}
              >
                {t}
              </span>
            ))}
          </div>
          <button
            onMouseEnter={() => setCursorActive(true)}
            onMouseLeave={() => setCursorActive(false)}
            onClick={() => setShareOpen(true)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "none", border: "1px solid rgba(212,175,55,0.3)",
              color: "#D4AF37", padding: "6px 16px", fontSize: 10,
              letterSpacing: "0.15em", textTransform: "uppercase", cursor: "none",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = "rgba(212,175,55,0.08)"; }}
            onMouseOut={(e) => { e.currentTarget.style.background = "none"; }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" /></svg>
            Share
          </button>
        </div>
      </footer>

      {/* GLOBAL STYLES */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { cursor: none !important; }
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
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

function NewsCard({ item, isDark, cardBg, borderCol, mutedCol, setCursorActive, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => { setHovered(true); setCursorActive(true); }}
      onMouseLeave={() => { setHovered(false); setCursorActive(false); }}
      style={{
        background: cardBg,
        border: `1px solid ${hovered ? "rgba(212,175,55,0.4)" : borderCol}`,
        overflow: "hidden", cursor: "none",
        transition: "all 0.35s",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.3)" : "none",
        animation: `fadeUp 0.6s ${delay}s both`,
      }}
    >
      <div style={{
        height: 200, overflow: "hidden",
        backgroundImage: `url(${item.img})`,
        backgroundSize: "cover", backgroundPosition: "center",
        transition: "transform 0.5s",
        transform: hovered ? "scale(1.06)" : "scale(1)",
      }} />
      <div style={{ padding: "22px 20px 24px" }}>
        <div style={{ fontSize: 9, letterSpacing: "0.28em", color: "#D4AF37", textTransform: "uppercase", marginBottom: 10 }}>
          {item.category}
        </div>
        <h3 style={{ fontSize: 17, fontWeight: 600, color: isDark ? "#fff" : "#111", fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.3, marginBottom: 10 }}>
          {item.title}
        </h3>
        <p style={{ fontSize: 12, color: mutedCol, lineHeight: 1.7, marginBottom: 16 }}>
          {item.desc}
        </p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 10, color: "#444", letterSpacing: "0.1em" }}>{item.date}</span>
          <span style={{ fontSize: 10, color: "#D4AF37", letterSpacing: "0.1em" }}>Read More →</span>
        </div>
      </div>
    </div>
  );
}