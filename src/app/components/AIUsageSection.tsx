import { motion } from "motion/react";

const P = {
  bg:        "#f5e6c8",
  dark:      "#3e2f1c",
  primary:   "#8b6b3f",
  accent:    "#c9a45c",
  rule:      "rgba(139,107,63,0.28)",
  ruleLight: "rgba(139,107,63,0.14)",
};
const SERIF   = "'EB Garamond', 'Crimson Text', Georgia, serif";
const DISPLAY = "'Cormorant Garamond', Georgia, serif";
const LABEL   = "'Cinzel', 'Trajan Pro', Georgia, serif";
const MONO    = "'JetBrains Mono', 'Courier New', monospace";

/* ─── SVG Logos ─── */

function ClaudeLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#CC7B3A"/>
      <path d="M14 34L24 10L34 34" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17.5 26.5H30.5" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
    </svg>
  );
}

function FigmaLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#1E1E1E"/>
      <rect x="14" y="10" width="10" height="10" rx="2" fill="#FF7262"/>
      <rect x="24" y="10" width="10" height="10" rx="2" fill="#1ABCFE"/>
      <rect x="14" y="20" width="10" height="10" rx="2" fill="#A259FF"/>
      <rect x="14" y="30" width="10" height="10" rx="2" fill="#0ACF83"/>
      <circle cx="29" cy="25" r="5" fill="#FF7262"/>
    </svg>
  );
}

function UnsplashLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#111111"/>
      <rect x="17" y="10" width="14" height="9" rx="1" fill="white"/>
      <rect x="10" y="22" width="28" height="16" rx="1" fill="white"/>
    </svg>
  );
}

function RechartsLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#2563EB"/>
      <rect x="10" y="30" width="6" height="8" rx="1" fill="white" opacity="0.6"/>
      <rect x="19" y="22" width="6" height="16" rx="1" fill="white" opacity="0.8"/>
      <rect x="28" y="14" width="6" height="24" rx="1" fill="white"/>
      <path d="M13 28L22 20L31 12" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function MotionLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#0D0D0D"/>
      <circle cx="24" cy="24" r="10" stroke="white" strokeWidth="2.5"/>
      <circle cx="24" cy="24" r="3.5" fill="white"/>
      <path d="M24 14V10" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M24 38V34" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M14 24H10" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M38 24H34" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

function LucideLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#F97316"/>
      <circle cx="24" cy="24" r="9" stroke="white" strokeWidth="2.5" fill="none"/>
      <path d="M19 24L22.5 27.5L29 21" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const TOOLS = [
  { id: "claude",   name: "Claude",        vendor: "Anthropic",    Logo: ClaudeLogo },
  { id: "figma",    name: "Figma Make",    vendor: "Figma",        Logo: FigmaLogo },
  { id: "unsplash", name: "Unsplash",      vendor: "Getty Images", Logo: UnsplashLogo },
  { id: "recharts", name: "Recharts",      vendor: "recharts.org", Logo: RechartsLogo },
  { id: "motion",   name: "Motion",        vendor: "motion.dev",   Logo: MotionLogo },
  { id: "lucide",   name: "Lucide React",  vendor: "lucide.dev",   Logo: LucideLogo },
];

export function AIUsageSection() {
  return (
    <div style={{ padding: "48px 0 32px" }}>
      {/* Rule */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
        <div style={{ flex: 1, height: 1, background: P.rule }} />
        <span style={{ color: `${P.accent}70`, fontFamily: LABEL, fontSize: 9, letterSpacing: "0.28em" }}>
          AI TOOLS USED
        </span>
        <div style={{ flex: 1, height: 1, background: P.rule }} />
      </div>

      {/* Logo row */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "28px 40px" }}>
        {TOOLS.map((tool, i) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -3 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 9, cursor: "default" }}
          >
            <tool.Logo size={44} />
            <div style={{ textAlign: "center" }}>
              <p style={{ color: P.dark, fontFamily: SERIF, fontSize: 13, fontStyle: "italic", lineHeight: 1, marginBottom: 2 }}>
                {tool.name}
              </p>
              <p style={{ color: `${P.primary}70`, fontFamily: MONO, fontSize: 8.5, letterSpacing: "0.08em" }}>
                {tool.vendor}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Closing rule */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 36 }}>
        <div style={{ flex: 1, height: 1, background: P.ruleLight }} />
        <span style={{ color: `${P.accent}45`, fontFamily: LABEL, fontSize: 9, letterSpacing: "0.22em" }}>FINIS</span>
        <div style={{ flex: 1, height: 1, background: P.ruleLight }} />
      </div>
    </div>
  );
}
