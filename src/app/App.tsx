import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { MaSoiGame } from "./components/game/MaSoiGame";
import { AIUsageSection } from "./components/AIUsageSection";

/* ─────────── IMAGES ─────────── */
const IMG = {
  cover:     "https://images.unsplash.com/photo-1664396238486-1073deab72a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600",
  statue:    "https://images.unsplash.com/photo-1762795966465-283c02fb3e92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
  parchment: "https://images.unsplash.com/photo-1706790608211-4c03fd4f4d33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600",
  factory:   "https://images.unsplash.com/photo-1630320777426-48e30ac61318?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
  robots:    "https://images.unsplash.com/photo-1647427060118-4911c9821b82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
  vietnam:   "https://images.unsplash.com/photo-1604589826265-186877674152?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
  floral:    "https://images.unsplash.com/photo-1755543042134-0c492bbc2c5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  finance:   "https://images.unsplash.com/photo-1736994113276-21b7a45aba01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
  aiCircuit: "https://images.unsplash.com/photo-1744640326166-433469d102f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
  fintech:   "https://images.unsplash.com/photo-1739596686386-cc5d8b63318e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
  tesla:     "https://images.unsplash.com/photo-1639246473723-5d6946d45878?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
  growth:    "https://images.unsplash.com/photo-1772413438631-a4bc7ccf0f4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
  book:      "https://images.unsplash.com/photo-1662787912943-f7997652a24e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
  hanoi:     "https://images.unsplash.com/photo-1761219174714-c9c82993aff7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
  worker:    "https://images.unsplash.com/photo-1764037047032-f9994809a51d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
};

/* ─────────── PALETTE ─────────── */
const P = {
  bg:       "#f5e6c8",
  bgLight:  "#fdf5e4",
  bgDark:   "#ede0c4",
  bgDeep:   "#e8d8b0",
  primary:  "#8b6b3f",
  dark:     "#3e2f1c",
  accent:   "#c9a45c",
  rule:     "rgba(139,107,63,0.28)",
  ruleLight:"rgba(139,107,63,0.14)",
};

const SERIF   = "'EB Garamond', 'Crimson Text', Georgia, serif";
const DISPLAY = "'Cormorant Garamond', Georgia, serif";
const LABEL   = "'Cinzel', 'Trajan Pro', Georgia, serif";

/* ─────────── FADE-IN WRAPPER ─────────── */
function FadeIn({ children, delay = 0, y = 36, style = {} }: {
  children: React.ReactNode; delay?: number; y?: number; style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
      viewport={{ once: true, amount: 0.15 }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ─────────── ANIMATED IMAGE ─────────── */
function AnimImg({
  src, alt, height = 420, caption, sepia = 35, position = "center",
}: {
  src: string; alt: string; height?: number; caption?: string; sepia?: number; position?: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      {/* Outer decorative frame */}
      <div style={{
        position: "absolute", inset: -10,
        border: `1px solid ${P.accent}55`,
        pointerEvents: "none", zIndex: 2,
      }} />
      <div style={{
        position: "absolute", inset: -4,
        border: `1px solid ${P.ruleLight}`,
        pointerEvents: "none", zIndex: 2,
      }} />
      {/* Image container */}
      <div style={{ overflow: "hidden", position: "relative" }}>
        <img
          src={src}
          alt={alt}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: "block",
            width: "100%",
            height,
            objectFit: "cover",
            objectPosition: position,
            filter: hovered
              ? `sepia(${sepia * 0.2}%) contrast(1.05) brightness(1.0)`
              : `sepia(${sepia}%) contrast(1.05) brightness(0.88)`,
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "filter 0.7s ease, transform 0.8s cubic-bezier(0.22,1,0.36,1)",
            cursor: "zoom-in",
          }}
        />
        {/* Grain overlay */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
          opacity: 0.5, mixBlendMode: "multiply",
        }} />
      </div>
      {caption && (
        <div style={{
          background: P.dark, padding: "9px 18px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{ color: `${P.accent}cc`, fontSize: 11, letterSpacing: "0.12em", fontStyle: "italic", fontFamily: SERIF }}>
            {caption}
          </span>
          <Ornament size={9} />
        </div>
      )}
    </div>
  );
}

/* ─────────── ORNAMENT ─────────── */
const Ornament = ({ size = 14, color = P.accent }: { size?: number; color?: string }) => (
  <span style={{ color, fontSize: size, fontFamily: DISPLAY, lineHeight: 1, userSelect: "none" }}>✦</span>
);

/* ─────────── SECTION DIVIDER ─────────── */
const Divider = ({ my = 80 }: { my?: number }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14, margin: `${my}px auto`, maxWidth: 480 }}>
    <div style={{ flex: 1, height: 1, background: P.rule }} />
    <Ornament size={11} />
    <div style={{ flex: 1, height: 1, background: P.rule }} />
    <Ornament size={8} />
    <div style={{ flex: 1, height: 1, background: P.rule }} />
    <Ornament size={11} />
    <div style={{ flex: 1, height: 1, background: P.rule }} />
  </div>
);

/* ─────────── SECTION LABEL ─────────── */
const SectionLabel = ({ num, label }: { num: string; label: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
    <div style={{ width: 7, height: 7, background: P.accent, transform: "rotate(45deg)", flexShrink: 0 }} />
    <span style={{ color: P.accent, fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", fontFamily: LABEL }}>
      Phần {num}
    </span>
    <div style={{ height: 1, flex: 1, background: P.rule, maxWidth: 40 }} />
    <span style={{ color: P.primary, fontSize: 13, fontStyle: "italic", fontFamily: SERIF }}>
      {label}
    </span>
  </div>
);

/* ─────────── SECTION TITLE ─────────── */
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{
    fontFamily: DISPLAY, fontWeight: 300, fontSize: "clamp(32px,4.5vw,50px)",
    color: P.dark, lineHeight: 1.18, marginBottom: 40, letterSpacing: "0.01em",
  }}>
    {children}
  </h2>
);

/* ─────────── DROP CAP PARA ─────────── */
function DropCapPara({ initial, children, size = 18 }: {
  initial: string; children: React.ReactNode; size?: number;
}) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", columnGap: "0.15em", alignItems: "start" }}>
      <span aria-hidden="true" style={{
        fontFamily: DISPLAY, fontSize: size * 3.4,
        lineHeight: 0.82, fontWeight: 300, color: P.accent,
        paddingTop: "0.04em", userSelect: "none", display: "block",
      }}>{initial}</span>
      <p style={{
        fontSize: size, lineHeight: 1.88, color: P.dark, fontFamily: SERIF,
        textAlign: "justify", margin: 0, paddingTop: "0.09em", wordBreak: "break-word",
      }}>{children}</p>
    </div>
  );
}

/* ─────────── BODY PARA ─────────── */
const BodyP = ({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <p style={{ fontSize: 18, lineHeight: 1.88, color: P.dark, fontFamily: SERIF, textAlign: "justify", marginBottom: 18, ...style }}>
    {children}
  </p>
);

/* ─────────── PULL QUOTE ─────────── */
const PullQuote = ({ children }: { children: React.ReactNode }) => (
  <div style={{ margin: "30px 0", padding: "22px 26px", borderLeft: `3px solid ${P.accent}`, background: `${P.accent}12` }}>
    <p style={{ fontSize: 19, lineHeight: 1.82, color: P.primary, fontStyle: "italic", fontFamily: DISPLAY, margin: 0 }}>
      {children}
    </p>
  </div>
);

/* ─────────── FULL-WIDTH QUOTE BAND ─────────── */
const QuoteBand = ({ quote, author }: { quote: string; author: string }) => (
  <section style={{ background: P.dark, padding: "64px 48px", textAlign: "center" }}>
    <FadeIn>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "center", marginBottom: 28 }}>
          <div style={{ height: 1, width: 60, background: P.accent, opacity: 0.4 }} />
          <Ornament size={16} />
          <div style={{ height: 1, width: 60, background: P.accent, opacity: 0.4 }} />
        </div>
        <p style={{ color: P.accent, fontFamily: DISPLAY, fontSize: "clamp(20px,3vw,28px)", fontStyle: "italic", fontWeight: 300, lineHeight: 1.7, marginBottom: 24 }}>
          "{quote}"
        </p>
        <p style={{ color: `${P.accent}70`, fontSize: 13, fontFamily: SERIF, fontStyle: "italic", letterSpacing: "0.04em" }}>{author}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "center", marginTop: 28 }}>
          <div style={{ height: 1, width: 60, background: P.accent, opacity: 0.4 }} />
          <Ornament size={16} />
          <div style={{ height: 1, width: 60, background: P.accent, opacity: 0.4 }} />
        </div>
      </div>
    </FadeIn>
  </section>
);

/* ─────────── CONTENT WRAP ─────────── */
const ContentWrap = ({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 48px", ...style }}>
    {children}
  </div>
);

/* ─────────── IMAGE+TEXT ROW (alternating) ─────────── */
function SplitRow({
  imageLeft = true,
  image,
  children,
  imageHeight = 440,
}: {
  imageLeft?: boolean;
  image: React.ReactNode;
  children: React.ReactNode;
  imageHeight?: number;
}) {
  return (
    <div style={{
      display: "flex",
      flexDirection: imageLeft ? "row" : "row-reverse",
      gap: 64,
      alignItems: "flex-start",
    }}>
      <FadeIn delay={0.1} y={24} style={{ flex: "0 0 44%" }}>
        {image}
      </FadeIn>
      <FadeIn delay={0.25} y={32} style={{ flex: 1, paddingTop: 12 }}>
        {children}
      </FadeIn>
    </div>
  );
}

/* ══════════════════════════════════════════════
    MAIN APP
══════════════════════════════════════════════ */
export default function App() {
  const [progress, setProgress] = useState(0);
  const [showGame, setShowGame] = useState(false);
  const coverRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const coverY = useTransform(scrollY, [0, 600], [0, 180]);

  useEffect(() => {
    const fn = () => {
      const h = document.documentElement;
      setProgress(Math.min(100, (window.scrollY / (h.scrollHeight - window.innerHeight)) * 100));
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showGame ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showGame]);

  return (
    <>
      {/* ══ GAME OVERLAY ══ */}
      <AnimatePresence>
        {showGame && (
          <motion.div key="masoi" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 28 }} transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "fixed", inset: 0, zIndex: 9999 }}>
            <MaSoiGame onClose={() => setShowGame(false)} />
          </motion.div>
        )}
      </AnimatePresence>

    <div style={{ background: P.bg, fontFamily: SERIF, color: P.dark }}>

      {/* ── Sticky Top Nav ── */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1001,
        height: 52,
        background: `${P.dark}f0`,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: `1px solid rgba(201,164,92,0.18)`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 40px",
      }}>
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 6, height: 6, background: P.accent, transform: "rotate(45deg)" }} />
          <span style={{ color: P.accent, fontSize: 12, fontFamily: SERIF, fontStyle: "italic", letterSpacing: "0.04em" }}>
            Kinh Tế Chính Trị · <span style={{ fontFamily: LABEL, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", fontStyle: "normal" }}>Ch. III</span>
          </span>
        </div>

        {/* Reading progress bar inside nav */}
        <div style={{ flex: 1, margin: "0 32px", height: 2, background: `${P.accent}18` }}>
          <motion.div
            style={{ height: "100%", background: `linear-gradient(90deg, ${P.primary}, ${P.accent})`, originX: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowGame(true)}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "8px 20px",
            background: "linear-gradient(135deg, rgba(201,164,92,0.12) 0%, rgba(139,107,63,0.26) 100%)",
            border: `1px solid ${P.accent}`,
            color: P.accent,
            fontSize: 11, fontFamily: LABEL, letterSpacing: "0.16em",
            cursor: "pointer",
            boxShadow: `0 0 18px rgba(201,164,92,0.22), inset 0 0 12px rgba(201,164,92,0.06)`,
            position: "relative", overflow: "hidden",
          }}
        >
          <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute", inset: 0,
              background: `radial-gradient(ellipse at 50% 50%, rgba(201,164,92,0.15) 0%, transparent 70%)`,
              pointerEvents: "none",
            }}
          />
          <span style={{ fontSize: 14 }}>🐺</span>
          <span>Ma Sói Kinh Tế</span>
        </motion.button>
      </div>

      {/* ════════════════════════════════════
          § 0 — HERO / COVER
      ════════════════════════════════════ */}
      <section ref={coverRef} style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", overflow: "hidden", paddingTop: 52 }}>

        {/* Parallax background */}
        <motion.img
          src={IMG.parchment}
          alt=""
          aria-hidden
          style={{
            position: "absolute", inset: 0, width: "100%", height: "115%",
            objectFit: "cover", y: coverY,
            filter: "sepia(55%) brightness(0.65) contrast(1.1)",
          } as any}
        />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(165deg, ${P.bgLight}d0 0%, ${P.bgDark}e8 45%, ${P.dark}bb 100%)` }} />

        {/* Top ribbon */}
        <div style={{ position: "relative", zIndex: 3, background: P.dark, padding: "10px 52px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: P.accent, fontSize: 12, fontFamily: SERIF, fontStyle: "italic", letterSpacing: "0.03em" }}>Kinh Tế Chính Trị Mác – Lênin</span>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ height: 1, width: 28, background: P.accent, opacity: 0.4 }} />
            <Ornament size={10} />
            <div style={{ height: 1, width: 28, background: P.accent, opacity: 0.4 }} />
          </div>
          <span style={{ color: `${P.accent}99`, fontSize: 11, letterSpacing: "0.06em", fontFamily: SERIF, fontStyle: "italic" }}>Triết học Kinh tế · 2024</span>
        </div>

        {/* Center content */}
        <div style={{ position: "relative", zIndex: 3, flex: 1, display: "flex", alignItems: "center" }}>
          <ContentWrap style={{ display: "flex", alignItems: "center", gap: 72, padding: "60px 48px 60px" }}>

            {/* Left: Title */}
            <div style={{ flex: 1 }}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <div style={{ display: "inline-flex", alignItems: "center", gap: 10, border: `1px solid ${P.accent}70`, padding: "6px 18px", marginBottom: 36 }}>
                  <div style={{ width: 6, height: 6, background: P.accent, transform: "rotate(45deg)" }} />
                  <span style={{ color: P.accent, fontSize: 11, fontFamily: SERIF, fontStyle: "italic", letterSpacing: "0.06em" }}>Chương III</span>
                  <div style={{ width: 6, height: 6, background: P.accent, transform: "rotate(45deg)" }} />
                </div>
                <h1 style={{ fontFamily: DISPLAY, fontWeight: 300, lineHeight: 1.12, fontSize: "clamp(40px,6vw,78px)", color: P.dark, marginBottom: 8 }}>
                  Công nghệ<br />
                  <em style={{ color: P.primary }}>& Giá trị</em><br />
                  Thặng dư<br />
                  <span style={{ fontSize: "0.62em", letterSpacing: "0.08em", color: P.accent }}>Siêu Ngạch</span>
                </h1>
                <p style={{ color: P.primary, fontSize: 19, fontStyle: "italic", lineHeight: 1.75, marginTop: 24, maxWidth: 460, fontFamily: DISPLAY }}>
                  trong Kỷ nguyên Cách mạng Công nghiệp 4.0
                </p>
              </motion.div>

              {/* TOC mini */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: "6px 0" }}
              >
                {["I. Khái niệm & Bản chất", "II. Vai trò Công nghệ 4.0", "III. Thực tiễn Doanh nghiệp",
                  "IV. Ý nghĩa Kinh tế", "V. Ý nghĩa với Việt Nam", "VI. Kết luận"].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, width: "50%", padding: "4px 0" }}>
                    <div style={{ width: 4, height: 4, background: P.accent, transform: "rotate(45deg)", flexShrink: 0 }} />
                    <span style={{ color: P.primary, fontSize: 13, fontFamily: SERIF, fontStyle: "italic" }}>{item}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ flex: "0 0 400px", position: "relative" }}
            >
              <div style={{ position: "absolute", inset: -14, border: `1px solid ${P.accent}50`, pointerEvents: "none" }} />
              <div style={{ position: "absolute", inset: -7, border: `1px solid ${P.ruleLight}`, pointerEvents: "none" }} />
              <img
                src={IMG.statue}
                alt="Tượng triết học cổ điển"
                style={{ width: "100%", height: 520, objectFit: "cover", objectPosition: "center top", display: "block", filter: "sepia(30%) contrast(1.05) brightness(0.92)" }}
              />
              <div style={{ background: P.dark, padding: "10px 20px", display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: `${P.accent}bb`, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase" }}>Triết học Phương Tây Cổ điển</span>
                <Ornament size={9} />
              </div>
            </motion.div>
          </ContentWrap>
        </div>

        {/* Scroll cue */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{ position: "relative", zIndex: 3, textAlign: "center", paddingBottom: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
        >
          <span style={{ color: P.primary, fontSize: 12, fontFamily: SERIF, fontStyle: "italic" }}>Khám phá nội dung</span>
          <span style={{ color: P.accent, fontSize: 22 }}>↓</span>
        </motion.div>
      </section>

      {/* ── Intro band ── */}
      <section style={{ background: P.dark, padding: "52px 48px", textAlign: "center" }}>
        <FadeIn>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, justifyContent: "center", marginBottom: 24 }}>
              <div style={{ height: 1, flex: 1, background: `${P.accent}40` }} /><Ornament size={12} /><div style={{ height: 1, flex: 1, background: `${P.accent}40` }} />
            </div>
            <p style={{ color: P.accent, fontFamily: DISPLAY, fontSize: "clamp(17px,2.5vw,22px)", fontStyle: "italic", lineHeight: 1.88, marginBottom: 24 }}>
              Một khảo luận về mối quan hệ biện chứng giữa đổi mới công nghệ và cơ chế hình thành giá trị thặng dư siêu ngạch — phạm trù trung tâm của Kinh tế Chính trị Mác–Lênin — trong bối cảnh Cách mạng Công nghiệp lần thứ tư.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 14, justifyContent: "center" }}>
              <div style={{ height: 1, flex: 1, background: `${P.accent}40` }} /><Ornament size={12} /><div style={{ height: 1, flex: 1, background: `${P.accent}40` }} />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ════════════════════════════════════
          § I — Khái niệm & Bản chất
      ════════════════════════════════════ */}
      <section style={{ background: P.bgLight, padding: "90px 0" }}>
        <ContentWrap>
          <FadeIn>
            <SectionLabel num="I" label="Khái niệm và Bản chất" />
            <SectionTitle>Giá trị Thặng dư là gì?</SectionTitle>
          </FadeIn>
          <SplitRow
            imageLeft
            image={
              <AnimImg
                src={IMG.book}
                alt="Sách triết học mở trang"
                height={460}
                caption="Tư bản luận — Karl Marx, 1867"
                sepia={40}
              />
            }
          >
            <DropCapPara initial="G">
              iá trị thặng dư là phần giá trị mới do người lao động tạo ra vượt quá giá trị sức lao động của họ, nhưng bị nhà tư bản chiếm đoạt. Đây là phạm trù trung tâm trong Kinh tế Chính trị Mác–Lênin.
            </DropCapPara>
            <BodyP>
              Trong quá trình sản xuất, lao động tạo ra giá trị mới lớn hơn giá trị sức lao động mà người lao động nhận được. Phần chênh lệch đó — giá trị thặng dư — được nhà tư bản chiếm hữu như là lợi nhuận.
            </BodyP>

            <PullQuote>
              Giá trị thặng dư siêu ngạch — dạng thặng dư tương đối ở trình độ cao hơn — xuất hiện từ sự chênh lệch năng suất giữa doanh nghiệp tiên phong và mức trung bình xã hội.
            </PullQuote>

            {/* Formula box */}
            <div style={{ marginTop: 24, padding: "20px 24px", background: `${P.accent}14`, border: `1px solid ${P.rule}` }}>
              <p style={{ color: P.primary, fontSize: 12, fontFamily: SERIF, fontStyle: "italic", marginBottom: 14 }}>— Công thức cơ bản</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
                {[
                  { v: "W", l: "Hàng hóa", hi: true },
                  { v: "=" }, { v: "c", l: "Tư liệu SX" },
                  { v: "+" }, { v: "v", l: "Sức lao động" },
                  { v: "+" }, { v: "m", l: "Thặng dư", hi: true },
                ].map((t, i) => !t.l ? (
                  <span key={i} style={{ color: P.primary, fontSize: 22, fontFamily: DISPLAY }}>{t.v}</span>
                ) : (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: DISPLAY, fontStyle: "italic", fontSize: 30, color: t.hi ? P.accent : P.primary }}>{t.v}</div>
                    <div style={{ fontSize: 11, color: P.primary, opacity: 0.75, lineHeight: 1.4, maxWidth: 70 }}>{t.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Two types */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 20 }}>
              {[
                { title: "Thặng dư Tuyệt đối", desc: "Kéo dài thời gian lao động hoặc tăng cường độ làm việc.", color: P.primary },
                { title: "Thặng dư Tương đối", desc: "Nâng cao năng suất, rút ngắn thời gian lao động tất yếu.", color: P.accent },
              ].map((t) => (
                <div key={t.title} style={{ padding: "16px 18px", border: `1px solid ${P.rule}`, borderTop: `2.5px solid ${t.color}`, background: P.bgLight }}>
                  <p style={{ color: t.color, fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{t.title}</p>
                  <p style={{ color: P.dark, fontSize: 15, lineHeight: 1.72 }}>{t.desc}</p>
                </div>
              ))}
            </div>
          </SplitRow>
        </ContentWrap>
      </section>

      <Divider />

      {/* ════════════════════════════════════
          § II — Vai trò Công nghệ 4.0
      ════════════════════════════════════ */}
      <section style={{ background: P.bg, padding: "90px 0" }}>
        <ContentWrap>
          <FadeIn>
            <SectionLabel num="II" label="Vai trò của Công nghệ 4.0" />
            <SectionTitle>Công nghệ — Động lực của Thặng dư Siêu ngạch</SectionTitle>
          </FadeIn>
          <SplitRow
            imageLeft={false}
            image={
              <AnimImg
                src={IMG.aiCircuit}
                alt="Trí tuệ nhân tạo và mạng thần kinh"
                height={480}
                caption="Trí tuệ nhân tạo — Nền tảng Công nghiệp 4.0"
                sepia={25}
              />
            }
          >
            <DropCapPara initial="C">
              ông nghệ vừa là nguyên nhân tạo ra, vừa là động lực thúc đẩy giá trị thặng dư siêu ngạch. Trong kỷ nguyên 4.0, trí tuệ nhân tạo, dữ liệu lớn và tự động hóa trở thành những nguồn lực quan trọng nhất.
            </DropCapPara>
            <BodyP>
              Khi một doanh nghiệp áp dụng công nghệ mới giúp tăng năng suất vượt trội so với mức trung bình xã hội, giá trị cá biệt của sản phẩm thấp hơn giá trị xã hội — phần chênh lệch đó chính là giá trị thặng dư siêu ngạch.
            </BodyP>

            {/* 3 mechanisms */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 8 }}>
              {[
                { n: "①", t: "Giảm chi phí sản xuất", d: "Giá trị cá biệt thấp hơn mức trung bình xã hội, tạo lợi thế cạnh tranh vượt trội về giá.", c: P.primary },
                { n: "②", t: "Nâng cao chất lượng sản phẩm", d: "Khác biệt hóa sản phẩm cho phép bán với giá cao hơn mức thị trường chung.", c: P.accent },
                { n: "③", t: "Tạo ra thị trường hoàn toàn mới", d: "Doanh nghiệp tiên phong hưởng lợi nhuận siêu ngạch trước khi đối thủ kịp theo kịp.", c: "#9a7845" },
              ].map((item) => (
                <div key={item.n} style={{ display: "flex", gap: 14, padding: "14px 16px", background: `${P.accent}10`, border: `1px solid ${P.ruleLight}`, borderLeft: `3px solid ${item.c}` }}>
                  <span style={{ color: item.c, fontFamily: DISPLAY, fontSize: 22, fontStyle: "italic", flexShrink: 0, lineHeight: 1.1 }}>{item.n}</span>
                  <div>
                    <p style={{ color: P.dark, fontSize: 16, fontWeight: 600, marginBottom: 5 }}>{item.t}</p>
                    <p style={{ color: P.primary, fontSize: 15.5, lineHeight: 1.75 }}>{item.d}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tech tags — Roman numeral markers */}
            <div style={{ marginTop: 20 }}>
              <p style={{ color: P.primary, fontSize: 12, fontFamily: SERIF, fontStyle: "italic", marginBottom: 12 }}>— Công nghệ nền tảng 4.0</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  ["i.", "Trí tuệ nhân tạo (AI)"],
                  ["ii.", "Dữ liệu lớn (Big Data)"],
                  ["iii.", "Tự động hóa & Robotics"],
                  ["iv.", "Điện toán đám mây"],
                ].map(([marker, label]) => (
                  <div key={label} style={{ padding: "9px 12px", border: `1px solid ${P.rule}`, display: "flex", gap: 10, alignItems: "center", background: `${P.bg}90` }}>
                    <span style={{ color: P.accent, fontFamily: DISPLAY, fontStyle: "italic", fontSize: 15, flexShrink: 0, lineHeight: 1 }}>{marker}</span>
                    <span style={{ color: P.dark, fontSize: 14.5, fontFamily: SERIF }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </SplitRow>
        </ContentWrap>
      </section>

      {/* Quote band */}
      <QuoteBand
        quote="Trong kỷ nguyên 4.0, công nghệ không còn là công cụ sản xuất đơn thuần — nó trở thành nguồn gốc trực tiếp của lợi thế cạnh tranh và giá trị thặng dư siêu ngạch."
        author="Kinh tế Chính trị Mác–Lênin · Hiện đại hóa"
      />

      {/* ════════════════════════════════════
          § III — Thực tiễn Doanh nghiệp
      ════════════════════════════════════ */}
      <section style={{ background: P.bgDark, padding: "90px 0" }}>
        <ContentWrap>
          <FadeIn>
            <SectionLabel num="III" label="Thực tiễn Doanh nghiệp" />
            <SectionTitle>Minh chứng từ Thực tiễn</SectionTitle>
          </FadeIn>

          {/* Intro row */}
          <FadeIn delay={0.1}>
            <SplitRow
              imageLeft
              image={
                <AnimImg
                  src={IMG.robots}
                  alt="Dây chuyền tự động hóa"
                  height={320}
                  caption="Tự động hóa — Cách mạng Công nghiệp 4.0"
                  sepia={30}
                />
              }
            >
              <DropCapPara initial="T">
                rong thực tế, nhiều doanh nghiệp hàng đầu đã minh họa rõ nét cơ chế tạo giá trị thặng dư siêu ngạch qua công nghệ. Từ Việt Nam đến quy mô toàn cầu, công nghệ đang tái định hình cấu trúc lợi nhuận.
              </DropCapPara>
              <BodyP>
                Điểm chung của các doanh nghiệp thành công: họ đầu tư mạnh vào công nghệ để nâng cao năng suất lao động, giảm chi phí cá biệt xuống dưới mức trung bình xã hội, và từ đó tạo ra lợi nhuận vượt trội.
              </BodyP>
            </SplitRow>
          </FadeIn>

          {/* Vietnam companies */}
          <FadeIn delay={0.1} style={{ marginTop: 64 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
              <div style={{ height: 1, width: 20, background: P.rule }} />
              <h3 style={{ fontFamily: DISPLAY, fontSize: 26, fontWeight: 300, color: P.dark, fontStyle: "italic" }}>Tại Việt Nam</h3>
              <div style={{ height: 1, flex: 1, background: P.rule }} />
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {[
              { name: "VinFast", sub: "Ô tô điện", img: IMG.factory, desc: "Tự động hóa và công nghệ pin thế hệ mới giúp giảm chi phí sản xuất xe điện, tạo giá trị cá biệt thấp hơn mức trung bình ngành.", tag: "Ô tô điện · Tự động hóa" },
              { name: "FPT", sub: "Công nghệ", img: IMG.aiCircuit, desc: "Ứng dụng AI và nền tảng công nghệ cao trong dịch vụ phần mềm giúp FPT cạnh tranh quốc tế với chi phí thấp hơn đối thủ toàn cầu.", tag: "Công nghệ · AI" },
              { name: "MoMo", sub: "Fintech", img: IMG.fintech, desc: "Nền tảng số tạo chi phí biên gần bằng không khi mở rộng quy mô — mỗi người dùng mới tốn kém gần như không đáng kể.", tag: "Fintech · Nền tảng số" },
            ].map((co, i) => (
              <FadeIn key={co.name} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  style={{ background: P.bgLight, border: `1px solid ${P.rule}`, overflow: "hidden", display: "flex", flexDirection: "column" }}
                >
                  <div style={{ overflow: "hidden", height: 180, flexShrink: 0 }}>
                    <img src={co.img} alt={co.name} style={{ width: "100%", height: 180, objectFit: "cover", display: "block", filter: "sepia(35%) contrast(1.05) brightness(0.88)", transition: "transform 0.7s ease", }} />
                  </div>
                  <div style={{ padding: "18px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                      <span style={{ fontFamily: DISPLAY, fontSize: 22, color: P.accent, fontWeight: 400, fontStyle: "italic", lineHeight: 1.2 }}>{co.name}</span>
                      <span style={{ fontFamily: SERIF, fontSize: 13, color: P.primary, fontStyle: "italic" }}>{co.sub}</span>
                    </div>
                    <p style={{ color: P.dark, fontSize: 15, lineHeight: 1.75, marginBottom: 12, fontFamily: SERIF, flex: 1 }}>{co.desc}</p>
                    <div style={{ padding: "4px 10px", background: `${P.accent}18`, display: "inline-flex", alignSelf: "flex-start", border: `1px solid ${P.ruleLight}` }}>
                      <span style={{ color: P.primary, fontSize: 12, fontFamily: SERIF, fontStyle: "italic" }}>{co.tag}</span>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          {/* World companies */}
          <FadeIn style={{ marginTop: 56 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
              <div style={{ height: 1, width: 20, background: P.rule }} />
              <h3 style={{ fontFamily: DISPLAY, fontSize: 26, fontWeight: 300, color: P.dark, fontStyle: "italic" }}>Trên Thế giới</h3>
              <div style={{ height: 1, flex: 1, background: P.rule }} />
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {[
              { name: "Tesla", sub: "EV · Phần mềm", img: IMG.tesla, desc: "Phần mềm OTA updates và pin thế hệ mới biến Tesla thành công ty công nghệ hơn là nhà sản xuất ô tô truyền thống.", tag: "EV · Phần mềm" },
              { name: "Amazon", sub: "Cloud · Logistics", img: IMG.robots, desc: "Logistics AI và hệ thống kho hàng tự động, cùng với AWS cloud computing — mô hình hạ tầng kép tạo lợi nhuận đột phá.", tag: "Cloud · Logistics AI" },
              { name: "Samsung", sub: "Bán dẫn · R&D", img: IMG.aiCircuit, desc: "R&D bán dẫn và kiểm soát toàn bộ chuỗi cung ứng chip tạo ra lợi thế chi phí không thể sao chép trong ngắn hạn.", tag: "Bán dẫn · R&D" },
            ].map((co, i) => (
              <FadeIn key={co.name} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  style={{ background: P.bgLight, border: `1px solid ${P.rule}`, overflow: "hidden", display: "flex", flexDirection: "column" }}
                >
                  <div style={{ overflow: "hidden", height: 180, flexShrink: 0 }}>
                    <img src={co.img} alt={co.name} style={{ width: "100%", height: 180, objectFit: "cover", display: "block", filter: "sepia(30%) contrast(1.05) brightness(0.88)", transition: "transform 0.7s ease" }} />
                  </div>
                  <div style={{ padding: "18px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                      <span style={{ fontFamily: DISPLAY, fontSize: 22, color: P.accent, fontWeight: 400, fontStyle: "italic", lineHeight: 1.2 }}>{co.name}</span>
                      <span style={{ fontFamily: SERIF, fontSize: 13, color: P.primary, fontStyle: "italic" }}>{co.sub}</span>
                    </div>
                    <p style={{ color: P.dark, fontSize: 15, lineHeight: 1.75, marginBottom: 12, fontFamily: SERIF, flex: 1 }}>{co.desc}</p>
                    <div style={{ padding: "4px 10px", background: `${P.accent}18`, display: "inline-flex", alignSelf: "flex-start", border: `1px solid ${P.ruleLight}` }}>
                      <span style={{ color: P.primary, fontSize: 12, fontFamily: SERIF, fontStyle: "italic" }}>{co.tag}</span>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </ContentWrap>
      </section>

      <Divider />

      {/* ════════════════════════════════════
          § IV — Ý nghĩa Kinh tế
      ════════════════════════════════════ */}
      <section style={{ background: P.bgLight, padding: "90px 0" }}>
        <ContentWrap>
          <FadeIn>
            <SectionLabel num="IV" label="Ý nghĩa Kinh tế" />
            <SectionTitle>Tác động đến Nền Kinh tế Hiện đại</SectionTitle>
          </FadeIn>
          <SplitRow
            imageLeft
            image={
              <AnimImg
                src={IMG.growth}
                alt="Tăng trưởng kinh tế"
                height={460}
                caption="Tăng trưởng — Lợi nhuận — Phát triển bền vững"
                sepia={35}
              />
            }
          >
            <DropCapPara initial="V">
              iệc theo đuổi giá trị thặng dư siêu ngạch tạo ra một vòng tròn đổi mới liên tục. Doanh nghiệp liên tục cải tiến công nghệ để duy trì lợi thế, và đây chính là động lực tiến bộ kỹ thuật của xã hội.
            </DropCapPara>
            <BodyP>
              Khi công nghệ mới lan rộng, lợi thế siêu ngạch của doanh nghiệp tiên phong dần mất đi — nhưng mặt bằng năng suất của toàn xã hội được nâng lên. Đây là cơ chế mà Mác gọi là "nâng cao lực lượng sản xuất xã hội".
            </BodyP>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              <p style={{ color: P.primary, fontSize: 12, fontStyle: "italic", fontFamily: SERIF, marginBottom: 8 }}>— Tác động tích cực</p>
              {["Thúc đẩy đổi mới khoa học công nghệ liên tục", "Nâng cao năng suất lao động toàn xã hội", "Góp phần tăng trưởng GDP quốc gia", "Tạo vòng lặp đổi mới tự gia tăng (Innovation loop)"].map((t) => (
                <div key={t} style={{ display: "flex", gap: 10, padding: "10px 14px", background: `${P.accent}0f`, border: `1px solid ${P.ruleLight}` }}>
                  <Ornament size={11} />
                  <p style={{ color: P.dark, fontSize: 15.5, lineHeight: 1.72, fontFamily: SERIF }}>{t}</p>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ color: P.primary, fontSize: 12, fontStyle: "italic", fontFamily: SERIF, marginBottom: 8 }}>— Hạn chế & Mâu thuẫn</p>
              {["Tập trung tư bản, hình thành độc quyền thị trường", "Gia tăng bất bình đẳng thu nhập và cơ hội", "Thay thế lao động, tạo áp lực thất nghiệp cục bộ", "Vấn đề đạo đức về dữ liệu và quyền riêng tư"].map((t) => (
                <div key={t} style={{ display: "flex", gap: 10, padding: "10px 14px", background: `rgba(154,107,75,0.08)`, border: `1px solid ${P.ruleLight}` }}>
                  <span style={{ color: "#9a6b4b", fontSize: 15, flexShrink: 0 }}>—</span>
                  <p style={{ color: P.dark, fontSize: 15.5, lineHeight: 1.72, fontFamily: SERIF }}>{t}</p>
                </div>
              ))}
            </div>

            <PullQuote>
              Khi công nghệ phổ biến, lợi thế siêu ngạch mất đi — nhưng <strong>mặt bằng năng suất toàn xã hội được nâng lên một tầm cao mới</strong>.
            </PullQuote>
          </SplitRow>
        </ContentWrap>
      </section>

      {/* Full-width image break */}
      <section style={{ position: "relative", height: 340, overflow: "hidden" }}>
        <img src={IMG.floral} alt="" style={{ width: "100%", height: "120%", objectFit: "cover", objectPosition: "center", filter: "sepia(55%) brightness(0.55) contrast(1.1)", marginTop: "-10%" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, ${P.dark}ee 0%, ${P.dark}99 40%, ${P.dark}ee 100%)` }} />
        <FadeIn>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 20 }}>
            <p style={{ color: P.accent, fontFamily: DISPLAY, fontSize: "clamp(17px,3vw,26px)", fontStyle: "italic", fontWeight: 300, textAlign: "center", maxWidth: 700, lineHeight: 1.7 }}>
              "Thiết kế brochure sử dụng tông màu vàng nâu chủ đạo, gợi cảm giác cổ điển và mang hơi hướng học thuật. Typography serif và bố cục tạo liên tưởng đến các tài liệu triết học được hiện đại hóa."
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ height: 1, width: 50, background: P.accent, opacity: 0.4 }} />
              <Ornament size={14} />
              <div style={{ height: 1, width: 50, background: P.accent, opacity: 0.4 }} />
            </div>
            <p style={{ color: `${P.accent}70`, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}>Editorial Design Philosophy</p>
          </div>
        </FadeIn>
      </section>

      {/* ════════════════════════════════════
          § V — Ý nghĩa với Việt Nam
      ════════════════════════════════════ */}
      <section style={{ background: P.bg, padding: "90px 0" }}>
        <ContentWrap>
          <FadeIn>
            <SectionLabel num="V" label="Ý nghĩa đối với Việt Nam" />
            <SectionTitle>Hàm ý Chiến lược cho Việt Nam</SectionTitle>
          </FadeIn>
          <SplitRow
            imageLeft={false}
            image={
              <AnimImg
                src={IMG.hanoi}
                alt="Hà Nội — Thành phố hiện đại"
                height={480}
                caption="Hà Nội — Đô thị hóa và Kinh tế số"
                sepia={30}
                position="center"
              />
            }
          >
            <DropCapPara initial="Đ">
              ối với Việt Nam, việc hiểu và vận dụng cơ chế giá trị thặng dư siêu ngạch có ý nghĩa chiến lược sống còn — đó là con đường để thoát bẫy thu nhập trung bình và bứt phá phát triển.
            </DropCapPara>
            <BodyP>
              Trong bối cảnh hội nhập quốc tế sâu rộng, Việt Nam cần định vị lại mô hình tăng trưởng: chuyển dịch từ lợi thế lao động giá rẻ sang lợi thế công nghệ và tri thức — nguồn gốc của thặng dư siêu ngạch bền vững.
            </BodyP>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
              {[
                { marker: "I.", label: "Đầu tư R&D", desc: "Tăng tỷ lệ đầu tư R&D lên ≥2% GDP, ưu tiên lĩnh vực có lợi thế so sánh như bán dẫn, AI, nông nghiệp công nghệ cao." },
                { marker: "II.", label: "Nhân lực số", desc: "Cải cách giáo dục STEM, phát triển kỹ sư phần mềm và chuyên gia dữ liệu đẳng cấp quốc tế." },
                { marker: "III.", label: "Hạ tầng số", desc: "Phủ sóng băng thông rộng, phát triển cloud computing quốc gia, xây dựng khu công nghệ cao thu hút FDI chất lượng." },
                { marker: "IV.", label: "Khung pháp lý IP", desc: "Hoàn thiện luật sở hữu trí tuệ để bảo vệ lợi thế đổi mới và tạo môi trường đầu tư công nghệ an toàn." },
              ].map((item, i) => (
                <FadeIn key={item.label} delay={i * 0.08}>
                  <div style={{ display: "flex", gap: 16, padding: "14px 16px", background: `${P.accent}0e`, border: `1px solid ${P.ruleLight}` }}>
                    <span style={{ color: P.accent, fontFamily: DISPLAY, fontStyle: "italic", fontSize: 18, flexShrink: 0, lineHeight: 1.1, minWidth: 28, textAlign: "right" }}>{item.marker}</span>
                    <div>
                      <p style={{ color: P.accent, fontSize: 15, fontFamily: DISPLAY, fontStyle: "italic", marginBottom: 5 }}>{item.label}</p>
                      <p style={{ color: P.dark, fontSize: 15.5, lineHeight: 1.78, fontFamily: SERIF }}>{item.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <div style={{ marginTop: 22, padding: "16px 20px", background: P.dark, borderLeft: `3px solid ${P.accent}` }}>
              <p style={{ color: P.accent, fontSize: 12, fontFamily: SERIF, fontStyle: "italic", marginBottom: 6 }}>— Mục tiêu chiến lược</p>
              <p style={{ color: `${P.accent}cc`, fontSize: 17, lineHeight: 1.78, fontStyle: "italic", fontFamily: DISPLAY }}>
                Thoát bẫy thu nhập trung bình — trở thành nền kinh tế tri thức và công nghệ vào năm 2045
              </p>
            </div>
          </SplitRow>
        </ContentWrap>
      </section>

      {/* ════════════════════════════════════
          § VI — Kết luận
      ════════════════════════════════════ */}
      <section style={{ background: P.bgDark, padding: "90px 0" }}>
        <ContentWrap>
          <FadeIn>
            <SectionLabel num="VI" label="Kết luận" />
            <SectionTitle>Tổng kết & Nhìn về Tương lai</SectionTitle>
          </FadeIn>

          <SplitRow
            imageLeft
            image={
              <AnimImg
                src={IMG.worker}
                alt="Người lao động và máy móc"
                height={420}
                caption="Lao động — Công nghệ — Giá trị"
                sepia={40}
              />
            }
          >
            <DropCapPara initial="G">
              iá trị thặng dư siêu ngạch là kết quả tất yếu của sự chênh lệch về năng suất lao động nhờ đổi mới công nghệ. Trong kỷ nguyên 4.0, đây không còn là hiện tượng ngẫu nhiên mà là mục tiêu chiến lược của doanh nghiệp.
            </DropCapPara>
            <BodyP>
              Quá trình theo đuổi giá trị thặng dư siêu ngạch vừa là động lực tiến bộ kỹ thuật của xã hội, vừa tạo ra những mâu thuẫn cần được điều tiết thông qua chính sách hợp lý để đảm bảo phát triển bền vững và công bằng.
            </BodyP>

            {/* Summary 3 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
              {[
                { num: "I", t: "Bản chất", b: "GTTSN là dạng thặng dư tương đối ở trình độ cao, xuất hiện từ chênh lệch năng suất cá biệt và xã hội." },
                { num: "II", t: "Động lực 4.0", b: "Công nghệ 4.0 là công cụ chủ yếu để tạo, duy trì và mở rộng lợi thế siêu ngạch trong kinh tế hiện đại." },
                { num: "III", t: "Điều tiết", b: "Nhà nước cần chính sách cân bằng: thúc đẩy đổi mới đồng thời hạn chế bất bình đẳng và độc quyền." },
              ].map((item, i) => (
                <FadeIn key={item.num} delay={i * 0.1}>
                  <div style={{ display: "flex", gap: 16, padding: "16px 18px", border: `1px solid ${P.rule}`, background: `${P.bg}70`, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 6, right: 12, fontFamily: DISPLAY, fontStyle: "italic", fontSize: 40, color: P.ruleLight, lineHeight: 1, pointerEvents: "none" }}>{item.num}</div>
                    <div style={{ width: 2, background: P.accent, flexShrink: 0, borderRadius: 1 }} />
                    <div>
                      <p style={{ color: P.accent, fontSize: 15, fontFamily: DISPLAY, fontStyle: "italic", marginBottom: 5 }}>{item.t}</p>
                      <p style={{ color: P.dark, fontSize: 16, lineHeight: 1.78, fontFamily: SERIF }}>{item.b}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </SplitRow>

          {/* Final quote */}
          <FadeIn style={{ marginTop: 64 }}>
            <div style={{ border: `1px solid ${P.accent}`, padding: "36px 40px", boxShadow: `inset 0 0 0 4px ${P.ruleLight}`, textAlign: "center", maxWidth: 760, margin: "64px auto 0" }}>
              <Ornament size={14} />
              <p style={{ color: P.dark, fontFamily: DISPLAY, fontSize: "clamp(18px,2.4vw,23px)", lineHeight: 1.85, fontStyle: "italic", margin: "20px 0" }}>
                "Quá trình theo đuổi giá trị thặng dư siêu ngạch vừa là <strong style={{ color: P.accent }}>động lực tiến bộ kỹ thuật</strong>, vừa tạo ra những mâu thuẫn cần được điều tiết để đảm bảo phát triển bền vững."
              </p>
              <Ornament size={14} />
            </div>
          </FadeIn>
        </ContentWrap>
      </section>

      {/* ════════════════════════════════════
          § REVIEW — Câu hỏi Ôn tập
      ════════════════════════════════════ */}
      <section style={{ position: "relative", overflow: "hidden", padding: "90px 0" }}>
        <img src={IMG.parchment} alt="" aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "sepia(45%) brightness(0.85)", opacity: 0.15 }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <ContentWrap>
            <FadeIn style={{ textAlign: "center", marginBottom: 52 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ height: 1, width: 40, background: P.accent, opacity: 0.5 }} /><Ornament size={14} /><div style={{ height: 1, width: 40, background: P.accent, opacity: 0.5 }} />
              </div>
              <p style={{ color: P.primary, fontSize: 12, fontFamily: SERIF, fontStyle: "italic", marginBottom: 10 }}>— Câu hỏi ôn tập</p>
              <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 300, color: P.dark }}>Câu hỏi Ôn tập — Chương III</h2>
            </FadeIn>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
              {[
                "Phân biệt giá trị thặng dư tuyệt đối và tương đối. Cho ví dụ minh họa cụ thể trong bối cảnh hiện đại.",
                "Tại sao công nghệ 4.0 là yếu tố quyết định trong việc tạo ra giá trị thặng dư siêu ngạch hiện nay?",
                "Phân tích ba cơ chế chính mà công nghệ tác động đến sự hình thành giá trị thặng dư siêu ngạch.",
                "Liên hệ thực tiễn: Chọn một doanh nghiệp Việt Nam và phân tích cơ chế tạo GTTSN của họ.",
                "Tại sao việc theo đuổi GTTSN lại tạo ra mâu thuẫn xã hội? Cần điều tiết như thế nào?",
                "Nêu ý nghĩa của GTTSN đối với chiến lược phát triển kinh tế Việt Nam đến năm 2045.",
              ].map((q, i) => (
                <FadeIn key={i} delay={(i % 2) * 0.1}>
                  <motion.div
                    whileHover={{ backgroundColor: P.bgLight, borderColor: P.accent }}
                    style={{ display: "flex", gap: 16, padding: "20px 22px", background: P.bgLight, border: `1px solid ${P.rule}`, transition: "all 0.3s" }}
                  >
                    <div style={{ flexShrink: 0, width: 30, height: 30, border: `1px solid ${P.accent}60`, display: "flex", alignItems: "center", justifyContent: "center", background: `${P.accent}12` }}>
                      <span style={{ color: P.accent, fontSize: 14, fontFamily: DISPLAY, fontStyle: "italic" }}>{i + 1}</span>
                    </div>
                    <p style={{ color: P.dark, fontSize: 16.5, lineHeight: 1.85, fontFamily: SERIF }}>{q}</p>
                  </motion.div>
                </FadeIn>
              ))}
            </div>

            {/* AI Usage Section */}
            <AIUsageSection />
          </ContentWrap>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: P.dark, padding: "32px 48px" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Ornament size={13} />
            <span style={{ color: `${P.accent}99`, fontSize: 13, fontStyle: "italic", fontFamily: SERIF, letterSpacing: "0.02em" }}>Kinh tế Chính trị Mác–Lênin · Chương III</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ color: `${P.accent}55`, fontSize: 11, fontFamily: SERIF, fontStyle: "italic" }}>Tiến độ: {Math.round(progress)}%</span>
            <div style={{ width: 100, height: 2, background: `${P.accent}20`, borderRadius: 1 }}>
              <div style={{ height: "100%", width: `${progress}%`, background: P.accent, transition: "width 0.2s", borderRadius: 1 }} />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ color: `${P.accent}45`, fontSize: 10, letterSpacing: "0.14em", fontFamily: LABEL, textTransform: "uppercase" }}>Classic Academic · Luxury Editorial © 2024</span>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowGame(true)}
              style={{
                display: "flex", alignItems: "center", gap: 7,
                padding: "6px 14px",
                background: "linear-gradient(135deg, rgba(201,164,92,0.1), rgba(139,107,63,0.22))",
                border: `1px solid ${P.accent}70`,
                color: P.accent, fontSize: 10, fontFamily: LABEL, letterSpacing: "0.14em",
                cursor: "pointer",
                boxShadow: `0 0 12px rgba(201,164,92,0.16)`,
              }}
            >
              <span>🐺</span><span>Ma Sói Kinh Tế</span>
            </motion.button>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}