import { useState, useEffect, useRef } from "react";

// ── DESIGN TOKENS ──────────────────────────────────────────────────────────
const C = {
  bg: "#F7F6F3",
  surface: "#EFEDE8",
  border: "#DDDAD2",
  borderLight: "#E8E5DE",
  ink: "#111009",
  inkMid: "#3A3830",
  muted: "#8A8780",
  accent: "#C4A962",      // warm gold — the wolf's eyes
  accentDark: "#A08840",
  live: "#2D7A4F",
  amber: "#B06820",
  planned: "#7A7770",
  white: "#FDFCFA",
};

// ── STATUS MAP ──────────────────────────────────────────────────────────────
// Add new statuses here before adding entries to public/data/apps.json.
const STATUS_MAP = {
  live:             { label: "Live",           color: C.live },
  beta:             { label: "Beta",           color: "#2860A8" },
  "field-testing":  { label: "Field Testing",  color: C.amber },
  "in-development": { label: "In Development", color: C.amber },
  planned:          { label: "Planned",        color: C.planned },
};

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, y = 20, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

function Rule({ style = {} }) {
  return <div style={{ height: 1, background: C.border, ...style }} />;
}

function ProductRow({ p, index }) {
  const [hovered, setHovered] = useState(false);
  const [ref, visible] = useReveal();
  const { label: statusLabel, color: statusColor } = STATUS_MAP[p.status] ?? { label: p.status, color: C.muted };
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(16px)",
      transition: `opacity 0.6s ease ${index * 0.06}s, transform 0.6s ease ${index * 0.06}s`,
    }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 24,
          padding: "28px 0",
          cursor: "default",
          transition: "opacity 0.15s",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 32, alignItems: "start" }}>
          <div>
            <div style={{
              fontSize: 19, fontWeight: 600, fontFamily: "'Playfair Display', serif",
              color: hovered ? C.accent : C.ink,
              transition: "color 0.2s ease",
              letterSpacing: "-0.01em", marginBottom: 8, lineHeight: 1.2,
            }}>{p.name}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{
                width: 6, height: 6, borderRadius: "50%", background: statusColor, flexShrink: 0,
                boxShadow: p.status === "live" ? `0 0 0 2px ${C.live}33` : "none",
              }} />
              <span style={{ fontSize: 11, color: statusColor, fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em" }}>
                {statusLabel}
              </span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: C.muted, fontFamily: "'DM Mono', monospace", letterSpacing: "0.07em", marginBottom: 8 }}>
              {p.category}
            </div>
            <div style={{ fontSize: 14, color: C.inkMid, lineHeight: 1.7 }}>{p.desc}</div>
          </div>
        </div>
        <div style={{ textAlign: "right", paddingTop: 2, flexShrink: 0 }}>
          <span style={{ fontSize: 11, color: C.muted, fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em" }}>
            {p.model}
          </span>
        </div>
      </div>
      <Rule />
    </div>
  );
}

export default function MysterwolfStudios() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [products,  setProducts]  = useState([]);

  useEffect(() => {
    fetch(`/data/apps.json?v=${Date.now()}`)
      .then(r => r.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.ink, fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; }
        .nav-link { font-size: 13px; color: ${C.muted}; cursor: pointer; transition: color 0.15s; letter-spacing: 0.03em; font-weight: 400; background: none; border: none; font-family: 'DM Sans', sans-serif; }
        .nav-link:hover { color: ${C.ink}; }
        .btn-primary { background: ${C.ink}; color: ${C.bg}; border: none; padding: 13px 28px; font-size: 13px; font-weight: 500; letter-spacing: 0.05em; cursor: pointer; transition: background 0.2s, transform 0.15s; font-family: 'DM Sans', sans-serif; }
        .btn-primary:hover { background: ${C.inkMid}; transform: translateY(-1px); }
        .btn-ghost { background: transparent; color: ${C.ink}; border: 1px solid ${C.border}; padding: 13px 28px; font-size: 13px; font-weight: 400; letter-spacing: 0.03em; cursor: pointer; transition: border-color 0.2s, transform 0.15s; font-family: 'DM Sans', sans-serif; }
        .btn-ghost:hover { border-color: ${C.inkMid}; transform: translateY(-1px); }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .section { max-width: 1080px; margin: 0 auto; padding: 0 48px; }
        @media (max-width: 700px) { 
          .section { padding: 0 24px; }
          .product-grid { grid-template-columns: 1fr !important; }
          .hero-title { font-size: clamp(44px, 10vw, 72px) !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .stat-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? `${C.bg}F2` : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
        transition: "all 0.3s ease",
        padding: "0 48px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 64,
      }}>
        <div
          onClick={() => scrollTo("home")}
          style={{ cursor: "pointer" }}
        >
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700, fontSize: 17,
            letterSpacing: "-0.01em", color: C.ink,
            lineHeight: 1,
          }}>
            mysterwolf
          </div>
          <div style={{
            fontSize: 9, letterSpacing: "0.18em", color: C.accent,
            textTransform: "uppercase", fontFamily: "'DM Mono', monospace",
            marginTop: 2,
          }}>
            studios
          </div>
        </div>

        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["work", "about", "contact"].map(id => (
            <button key={id} className="nav-link" onClick={() => scrollTo(id)}>
              {id}
            </button>
          ))}
          <button className="btn-primary" style={{ padding: "8px 20px", fontSize: 12 }}
            onClick={() => scrollTo("contact")}>
            Let's talk
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 48px 80px" }}>
        <div className="section" style={{ padding: 0, maxWidth: 1080, margin: "0 auto", width: "100%" }}>

          <div style={{ opacity: 0, animation: "fadeUp 0.8s ease 0.1s forwards" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 52 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.live, boxShadow: `0 0 0 2px ${C.live}33` }} />
              <span style={{ fontSize: 11, color: C.live, fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em" }}>
                DPad Pilot — Now live on Google Play
              </span>
            </div>
          </div>

          <div style={{ opacity: 0, animation: "fadeUp 0.8s ease 0.2s forwards" }}>
            <h1 className="hero-title" style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(52px, 7.5vw, 88px)",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              color: C.ink,
              maxWidth: 860,
              marginBottom: 36,
            }}>
              Building tools for the spaces{" "}
              <span style={{ color: C.accent, fontStyle: "italic" }}>big software</span>{" "}
              ignores.
            </h1>
          </div>

          <div style={{ opacity: 0, animation: "fadeUp 0.8s ease 0.35s forwards" }}>
            <p style={{
              fontSize: 17, color: C.muted, maxWidth: 500,
              lineHeight: 1.75, marginBottom: 52, fontWeight: 300,
            }}>
              mysterwolf is an independent developer building AI-enabled apps and process tools for niche communities, small operators, and businesses that deserve better software.
            </p>
          </div>

          <div style={{ opacity: 0, animation: "fadeUp 0.8s ease 0.45s forwards", display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => scrollTo("work")}>See the work ↓</button>
            <button className="btn-ghost" onClick={() => window.open("https://ko-fi.com", "_blank")}>Support on Ko-fi</button>
          </div>

          {/* Decorative rule */}
          <div style={{
            opacity: 0, animation: "fadeIn 1s ease 0.8s forwards",
            marginTop: 80,
            display: "flex", alignItems: "center", gap: 20,
          }}>
            <div style={{ height: 1, flex: 1, background: C.border }} />
            <div style={{ fontSize: 10, color: C.muted, fontFamily: "'DM Mono', monospace", letterSpacing: "0.12em" }}>
              MWS · EST. 2026
            </div>
            <div style={{ height: 1, flex: 1, background: C.border }} />
          </div>

        </div>
      </section>

      {/* ── THE VIBE LAB ── */}
      <section id="work" style={{ padding: "100px 0" }}>
        <div className="section">

          <Reveal>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
              <div>
                <div style={{ fontSize: 10, color: C.accent, fontFamily: "'DM Mono', monospace", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 10 }}>
                  Portfolio
                </div>
                <h2 style={{
                  fontFamily: "'Playfair Display', serif", fontWeight: 700,
                  fontSize: 38, letterSpacing: "-0.02em", color: C.ink, lineHeight: 1,
                }}>
                  The Vibe Lab
                </h2>
              </div>
              <span style={{ fontSize: 11, color: C.muted, fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em", alignSelf: "flex-end" }}>
                {products.length} products in motion · 2026
              </span>
            </div>
          </Reveal>

          <Rule />

          {products.map((prod, i) => (
            <ProductRow key={prod.id} p={prod} index={i} />
          ))}

        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "100px 0", background: C.surface }}>
        <div className="section">
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>

            <Reveal>
              <div style={{ fontSize: 10, color: C.accent, fontFamily: "'DM Mono', monospace", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 20 }}>
                About
              </div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif", fontWeight: 700,
                fontSize: 38, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 28,
              }}>
                One developer.<br />
                Real problems.<br />
                <span style={{ color: C.accent, fontStyle: "italic" }}>Real solutions.</span>
              </h2>
              <p style={{ color: C.muted, lineHeight: 1.85, fontSize: 15, marginBottom: 20, fontWeight: 300 }}>
                DB Admin and developer by trade. Finance by day job. Builder by nature. When I run into a problem I build something. These apps and tools are the result of that instinct applied to spaces the big players won't touch.
              </p>
              <p style={{ color: C.muted, lineHeight: 1.85, fontSize: 15, marginBottom: 36, fontWeight: 300 }}>
                No ads. No bloat. No features designed to extract money from you. Software that does what it says and gets out of the way.
              </p>
              <button className="btn-ghost" onClick={() => window.open("https://ko-fi.com", "_blank")}>
                Support the work →
              </button>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="stat-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: C.border }}>
                {[
                  { n: "7", label: "Products in development" },
                  { n: "3", label: "AI-enabled applications" },
                  { n: "4+", label: "Industries covered" },
                  { n: "∞", label: "Lines written today" },
                ].map(({ n, label }) => (
                  <div key={label} style={{ background: C.surface, padding: "32px 28px" }}>
                    <div style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 48, fontWeight: 700, color: C.ink,
                      letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 12,
                    }}>{n}</div>
                    <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.5, fontWeight: 300 }}>{label}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 1, background: C.border, padding: 1 }}>
                <div style={{ background: C.surface, padding: "24px 28px" }}>
                  <div style={{ fontSize: 11, color: C.accent, fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em", marginBottom: 10 }}>
                    // THE CONSULTING SIDE
                  </div>
                  <div style={{ fontSize: 14, color: C.inkMid, lineHeight: 1.7, fontWeight: 300 }}>
                    ProcessMind is the enterprise play — process auditing and knowledge management for SMBs and larger orgs. Built on a proven seven-step framework. Enterprise-grade at a fraction of vendor cost.
                  </div>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "100px 0" }}>
        <div className="section">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 48 }}>

            <Reveal style={{ maxWidth: 560 }}>
              <div style={{ fontSize: 10, color: C.accent, fontFamily: "'DM Mono', monospace", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 20 }}>
                Contact
              </div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif", fontWeight: 700,
                fontSize: "clamp(32px, 5vw, 52px)", letterSpacing: "-0.02em",
                lineHeight: 1.05, marginBottom: 20,
              }}>
                Like what you see?<br />
                <span style={{ color: C.muted, fontStyle: "italic", fontWeight: 600 }}>
                  Let's talk.
                </span>
              </h2>
              <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.75, fontWeight: 300 }}>
                Whether you're curious about the apps, interested in ProcessMind for your business, or just want to support independent work — the door is open.
              </p>
            </Reveal>

            <Reveal delay={0.15} style={{ flexShrink: 0 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <button className="btn-primary">Support on Ko-fi ↗</button>
                <button className="btn-ghost">Get in touch</button>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <div style={{ borderTop: `1px solid ${C.border}` }}>
        <footer style={{
          maxWidth: 1080, margin: "0 auto", padding: "28px 48px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 16,
        }}>
          <div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 14, color: C.ink }}>
              mysterwolf studios
            </span>
            <span style={{ fontSize: 11, color: C.muted, marginLeft: 16, fontWeight: 300 }}>
              the vibe lab
            </span>
          </div>
          <div style={{ display: "flex", gap: 28 }}>
            {["Ko-fi", "GitHub", "Contact"].map(l => (
              <button key={l} className="nav-link">{l}</button>
            ))}
          </div>
          <div style={{ fontSize: 10, color: C.muted, fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em" }}>
            © 2026 — Built different.
          </div>
        </footer>
      </div>

    </div>
  );
}
