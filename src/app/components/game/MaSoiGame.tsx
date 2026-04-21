import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

/* ════════════════════════════════════════════
   DESIGN TOKENS
════════════════════════════════════════════ */
const C = {
  navy:       "#0D1B2A",
  navyLight:  "#112236",
  navyMid:    "#162B42",
  navyPanel:  "#1A3250",
  amber:      "#F4A261",
  amberLight: "#FFB87A",
  amberDark:  "#D4854A",
  red:        "#E63946",
  redDark:    "#C0303D",
  teal:       "#2EC4B6",
  tealDark:   "#24A89C",
  gold:       "#E9C46A",
  goldDark:   "#C8A84A",
  white:      "#F0EAD6",
  dim:        "rgba(240,234,214,0.55)",
  muted:      "rgba(240,234,214,0.25)",
  ghost:      "rgba(240,234,214,0.10)",
  borderNavy: "rgba(244,162,97,0.18)",
  borderRed:  "rgba(230,57,70,0.35)",
  borderTeal: "rgba(46,196,182,0.35)",
  borderGold: "rgba(233,196,106,0.30)",
  purple:     "#7B5EA7",
  purpleLight:"#9B7EC7",
};

const SANS  = "'Be Vietnam Pro','Nunito','Inter',sans-serif";
const SERIF = "'Cormorant Garamond',Georgia,serif";
const MONO  = "'JetBrains Mono','Courier New',monospace";

/* ════════════════════════════════════════════
   QUESTIONS
════════════════════════════════════════════ */
type Difficulty = "DỄ" | "TRUNG BÌNH" | "KHÓ";

interface Question {
  id: number;
  text: string;
  options: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
  explanation: string;
  topic: string;
  difficulty: Difficulty;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Giá trị thặng dư siêu ngạch là gì theo Marx?",
    options: [
      "Phần lợi nhuận thu được nhờ tăng giá bán vượt thị trường",
      "Phần giá trị thặng dư vượt trội khi giá trị cá biệt thấp hơn giá trị xã hội trung bình",
      "Tiền thưởng năng suất nhà tư bản trả cho công nhân giỏi",
      "Lợi nhuận độc quyền nhờ rào cản pháp lý bảo hộ",
    ],
    correct: 1,
    explanation: "Marx: GTTSN = phần dư khi W_cb (giá trị cá biệt) < W_xh (giá trị xã hội). Doanh nghiệp bán theo giá thị trường nhưng sản xuất với chi phí thấp hơn trung bình nhờ công nghệ vượt trội.",
    topic: "Khái niệm", difficulty: "DỄ",
  },
  {
    id: 2,
    text: "Công thức tính Giá trị Thặng dư Siêu ngạch là?",
    options: [
      "GTTSN = Giá bán − Chi phí sản xuất",
      "GTTSN = Tiền lương × Số giờ làm thêm",
      "GTTSN = (W_xh − W_cb) × Sản lượng",
      "GTTSN = Lợi nhuận ÷ Vốn đầu tư ban đầu",
    ],
    correct: 2,
    explanation: "GTTSN = (Giá trị xã hội − Giá trị cá biệt) × Sản lượng. Điều kiện: W_cb < W_xh — đạt được nhờ áp dụng công nghệ tiên tiến hơn mức trung bình xã hội.",
    topic: "Công thức", difficulty: "DỄ",
  },
  {
    id: 3,
    text: "Giá trị thặng dư tuyệt đối khác giá trị thặng dư siêu ngạch ở điểm nào?",
    options: [
      "Tuyệt đối: kéo dài ngày lao động; Siêu ngạch: hạ giá trị cá biệt xuống thấp hơn giá trị xã hội",
      "Giá trị thặng dư tuyệt đối chỉ xuất hiện trong kỷ nguyên 4.0",
      "Siêu ngạch là hình thức bóc lột nặng nề hơn tuyệt đối",
      "Cả hai đều được tạo ra bằng cách nâng cao năng suất lao động",
    ],
    correct: 0,
    explanation: "Tuyệt đối = kéo dài/tăng cường độ lao động. Siêu ngạch = hạ W_cb dưới W_xh nhờ công nghệ — bản chất là hình thức giá trị thặng dư tương đối ở cấp độ doanh nghiệp cá biệt.",
    topic: "So sánh", difficulty: "TRUNG BÌNH",
  },
  {
    id: 4,
    text: "Về bản chất, giá trị thặng dư siêu ngạch là hình thức của loại nào?",
    options: [
      "Giá trị thặng dư tuyệt đối",
      "Giá trị thặng dư tương đối",
      "Giá trị thặng dư độc quyền",
      "Giá trị thặng dư bình quân",
    ],
    correct: 1,
    explanation: "Marx (\"Tư bản\", Q.I): \"Xét về mặt bản chất, GTTSN cũng là giá trị thặng dư tương đối, vì nó gắn với việc tăng năng suất lao động.\"",
    topic: "Bản chất", difficulty: "TRUNG BÌNH",
  },
  {
    id: 5,
    text: "Ba kênh chính mà công nghệ tạo ra giá trị thặng dư siêu ngạch là gì?",
    options: [
      "Tăng lương, giảm thuế, mở rộng thị trường",
      "Giảm chi phí cá biệt, nâng cao chất lượng tạo khác biệt, tạo ra thị trường mới hoàn toàn",
      "Robot hóa, thuê ngoài, sáp nhập doanh nghiệp",
      "Xuất khẩu, độc quyền, lobby chính sách",
    ],
    correct: 1,
    explanation: "Ba kênh: (1) Giảm chi phí sản xuất cá biệt; (2) Nâng cao chất lượng & tạo pricing power; (3) Đổi mới triệt để tạo thị trường mới — người tiên phong hưởng toàn bộ GTTSN trong giai đoạn độc quyền tạm thời.",
    topic: "Cơ chế", difficulty: "KHÓ",
  },
  {
    id: 6,
    text: "VinFast tạo ra giá trị thặng dư siêu ngạch thông qua cơ chế nào?",
    options: [
      "Bán xe với giá cao hơn các đối thủ trong khu vực",
      "Dùng hơn 1.400 robot tự động hóa, hạ giá trị cá biệt xuống dưới mức trung bình ngành ô tô Đông Nam Á",
      "Nhập khẩu linh kiện rẻ từ Trung Quốc để giảm chi phí",
      "Nhận trợ cấp chính phủ thay thế cho đổi mới công nghệ",
    ],
    correct: 1,
    explanation: "VinFast đầu tư 3,5 tỷ USD, triển khai 1.400+ robot, tự phát triển pin LFP — hạ W_cb xuống thấp hơn W_xh (trung bình ngành ĐNÁ). Đây là GTTSN điển hình qua tự động hóa.",
    topic: "VinFast", difficulty: "DỄ",
  },
  {
    id: 7,
    text: "Mô hình Battery-as-a-Service của VinFast thể hiện điều gì theo lý luận Mác-Lênin?",
    options: [
      "Chiến lược phá giá để loại bỏ đối thủ cạnh tranh",
      "Đổi mới mô hình kinh doanh tối đa hóa GTTSN qua doanh thu dịch vụ định kỳ",
      "Vi phạm quy luật giá trị thặng dư vì bán thấp hơn giá trị thực",
      "Hình thức cho thuê tài chính thông thường không liên quan đến GTTSN",
    ],
    correct: 1,
    explanation: "BaaS tách pin khỏi xe → hạ giá xe → tăng doanh số → tạo dòng doanh thu dịch vụ liên tục. Đây là đổi mới toàn diện để tối đa hóa GTTSN.",
    topic: "VinFast", difficulty: "KHÓ",
  },
  {
    id: 8,
    text: "FPT Software thu được GTTSN từ thị trường quốc tế nhờ cơ chế nào?",
    options: [
      "Lách thuế quốc tế để giảm chi phí hoạt động",
      "Chênh lệch giữa chi phí lao động cá biệt (lương kỹ sư Việt Nam) và giá trị xã hội trung bình trên thị trường quốc tế",
      "Bán phần mềm lậu với giá thấp hơn các công ty phương Tây",
      "Nhận đầu tư nước ngoài để bù đắp chi phí vận hành cao",
    ],
    correct: 1,
    explanation: "FPT cung cấp dịch vụ thấp hơn 30–50% so với công ty cùng chất lượng tại nước phát triển. Chênh lệch chi phí lao động (W_cb thấp) so với giá trị xã hội quốc tế (W_xh cao) = GTTSN.",
    topic: "FPT Software", difficulty: "TRUNG BÌNH",
  },
  {
    id: 9,
    text: "MoMo tạo GTTSN trong \"kinh tế nền tảng\" nhờ đặc điểm gì?",
    options: [
      "Độc quyền pháp lý trên thị trường ví điện tử Việt Nam",
      "Chi phí biên gần bằng 0 khi thêm người dùng mới, trong khi doanh thu tăng tuyến tính",
      "Lợi nhuận từ cho vay nặng lãi qua ứng dụng di động",
      "Nhập khẩu công nghệ độc quyền từ nước ngoài và cho thuê lại",
    ],
    correct: 1,
    explanation: "Platform economy: thêm 1 người dùng = chi phí biên ≈ 0, nhưng phí giao dịch + quảng cáo + dữ liệu tăng tuyến tính theo 31 triệu user. Đây là GTTSN trong hình thái số hóa.",
    topic: "MoMo", difficulty: "TRUNG BÌNH",
  },
  {
    id: 10,
    text: "Tesla tạo ra nguồn GTTSN \"thuần túy từ tài sản trí tuệ\" thông qua cơ chế nào?",
    options: [
      "Bán xe với giá cao nhất phân khúc EV toàn cầu",
      "Bán tính năng phần mềm (Autopilot, FSD) qua OTA với chi phí biên gần bằng 0",
      "Sở hữu mỏ lithium độc quyền để giảm chi phí pin",
      "Nhận trợ cấp R&D lớn từ chính phủ Mỹ",
    ],
    correct: 1,
    explanation: "Software-Defined Vehicle: Tesla bán Autopilot/FSD hàng nghìn USD/xe, nhưng chi phí biên gần 0 (chỉ là cập nhật OTA). Đây là GTTSN thuần túy từ tài sản trí tuệ — điển hình kỷ nguyên 4.0.",
    topic: "Tesla", difficulty: "TRUNG BÌNH",
  },
  {
    id: 11,
    text: "AWS chiếm khoảng bao nhiêu % lợi nhuận hoạt động của Amazon năm 2023?",
    options: ["~20%", "~40%", "~62%", "~85%"],
    correct: 2,
    explanation: "AWS chiếm ~62% lợi nhuận hoạt động Amazon năm 2023. Sau đầu tư cố định khổng lồ xây hạ tầng đám mây, chi phí biên phục vụ mỗi khách hàng thêm cực thấp — GTTSN cực đoan trong dịch vụ số.",
    topic: "Amazon", difficulty: "DỄ",
  },
  {
    id: 12,
    text: "Samsung duy trì GTTSN trong ngành chip bán dẫn bằng chiến lược nào?",
    options: [
      "Hạ giá chip xuống thấp hơn tất cả đối thủ để chiếm thị phần",
      "Đầu tư R&D chiếm 8–10% doanh thu/năm (~20 tỷ USD), đi trước đối thủ về quy trình 3nm và HBM3",
      "Mua lại các công ty chip nhỏ để loại bỏ cạnh tranh",
      "Thuê kỹ sư từ TSMC và Intel để sao chép công nghệ",
    ],
    correct: 1,
    explanation: "Samsung R&D ~20 tỷ USD/năm tạo rào cản công nghệ khổng lồ. Chip 3nm & HBM3 → W_cb thấp hơn đối thủ, bán cùng giá hoặc cao hơn → GTTSN bền vững từ R&D dài hạn.",
    topic: "Samsung", difficulty: "TRUNG BÌNH",
  },
  {
    id: 13,
    text: "\"Quy luật bình quân hóa GTTSN\" có nghĩa là gì?",
    options: [
      "Nhà nước phân phối lại GTTSN cho tất cả doanh nghiệp bằng nhau",
      "Khi công nghệ tiên phong lan rộng, W_xh hạ xuống → GTTSN của người tiên phong bị triệt tiêu → buộc phải đổi mới tiếp",
      "Các doanh nghiệp thỏa thuận chia sẻ bằng sáng chế để cùng hưởng GTTSN",
      "Lợi nhuận siêu ngạch được tính bình quân vào thuế thu nhập doanh nghiệp",
    ],
    correct: 1,
    explanation: "Khi CN lan rộng: W_cb của toàn ngành giảm → W_xh trung bình hạ → GTTSN của người tiên phong bị triệt tiêu. Đây là động cơ của đổi mới liên tục — vòng lặp bất tận thúc đẩy tiến bộ kỹ thuật.",
    topic: "Quy luật", difficulty: "KHÓ",
  },
  {
    id: 14,
    text: "Theo WEF (2023), tự động hóa có thể tạo ra bao nhiêu việc làm mới toàn cầu đến năm 2025?",
    options: ["25 triệu việc làm mới", "60 triệu việc làm mới", "97 triệu việc làm mới", "150 triệu việc làm mới"],
    correct: 2,
    explanation: "WEF (2023): tự động hóa thay thế 85 triệu việc làm nhưng tạo ra 97 triệu việc làm mới — yêu cầu kỹ năng cao hơn. Đây là mâu thuẫn nội tại của GTTSN: thúc đẩy tiến bộ nhưng gây phân hóa lao động.",
    topic: "WEF / Mâu thuẫn", difficulty: "DỄ",
  },
  {
    id: 15,
    text: "Theo Chiến lược KTXH 2021–2030 (Đại hội XIII), con đường nào giúp Việt Nam thoát bẫy thu nhập trung bình?",
    options: [
      "Thu hút tối đa FDI không phân biệt ngành nghề",
      "Làm chủ công nghệ cốt lõi để tạo ra GTTSN ở quy mô quốc gia",
      "Tập trung xuất khẩu lao động phổ thông để tích lũy ngoại tệ",
      "Bảo hộ thị trường nội địa tuyệt đối, hạn chế cạnh tranh quốc tế",
    ],
    correct: 1,
    explanation: "Chiến lược XIII: \"Quốc gia nào làm chủ công nghệ cốt lõi sẽ nắm giữ khả năng tạo ra GTTSN ở quy mô quốc gia.\" Gồm 5 khuyến nghị: R&D+STEM, khởi nghiệp, SHTT, hạ tầng số, FDI công nghệ cao có chọn lọc.",
    topic: "Chính sách Việt Nam", difficulty: "TRUNG BÌNH",
  },
];

/* ════════════════════════════════════════════
   ROLES
════════════════════════════════════════════ */
type RoleId = "wolf" | "villager" | "detective" | "doctor" | "witch";

interface Role {
  id: RoleId;
  name: string;
  nameEn: string;
  icon: string;
  color: string;
  borderColor: string;
  bg: string;
  description: string;
  power: string;
  team: "wolf" | "village";
}

const ROLES: Record<RoleId, Role> = {
  wolf: {
    id: "wolf", name: "Sói", nameEn: "WEREWOLF", icon: "🐺",
    color: C.red, borderColor: C.borderRed, bg: "rgba(230,57,70,0.08)",
    description: "Bạn là kẻ ẩn náu trong làng. Mỗi đêm chọn 1 nạn nhân để tấn công.",
    power: "Mỗi đêm: Chọn 1 người dân để loại. Giả dạng dân thường ban ngày.",
    team: "wolf",
  },
  villager: {
    id: "villager", name: "Dân Làng", nameEn: "VILLAGER", icon: "🏡",
    color: C.teal, borderColor: C.borderTeal, bg: "rgba(46,196,182,0.08)",
    description: "Bạn là người dân vô tội. Dùng lý trí và câu hỏi kinh tế để tìm ra Sói.",
    power: "Tham gia thảo luận và bỏ phiếu để loại nghi phạm mỗi vòng.",
    team: "village",
  },
  detective: {
    id: "detective", name: "Thám Tử", nameEn: "DETECTIVE", icon: "🔍",
    color: C.gold, borderColor: C.borderGold, bg: "rgba(233,196,106,0.08)",
    description: "Bạn có khả năng điều tra. Mỗi đêm tìm hiểu danh tính thật của 1 người.",
    power: "Mỗi đêm: Chọn 1 người để Host tiết lộ bí mật — Sói hay Dân làng.",
    team: "village",
  },
  doctor: {
    id: "doctor", name: "Thầy Thuốc", nameEn: "DOCTOR", icon: "⚕",
    color: C.teal, borderColor: C.borderTeal, bg: "rgba(46,196,182,0.06)",
    description: "Bạn có thể cứu sống người bị tấn công. Mỗi đêm bảo vệ 1 người.",
    power: "Mỗi đêm: Chọn 1 người để bảo vệ. Nếu họ bị Sói tấn công, họ sẽ sống.",
    team: "village",
  },
  witch: {
    id: "witch", name: "Phù Thủy", nameEn: "WITCH", icon: "🧙",
    color: C.purple, borderColor: "rgba(123,94,167,0.35)", bg: "rgba(123,94,167,0.08)",
    description: "Bạn có 2 bình thuốc: 1 cứu sống và 1 tiêu diệt. Mỗi bình dùng 1 lần.",
    power: "Thuốc Cứu: Hồi sinh người bị giết. Thuốc Độc: Loại 1 người bất kỳ. Mỗi thứ dùng 1 lần.",
    team: "village",
  },
};

/* ════════════════════════════════════════════
   ROLE CONFIGS BY PLAYER COUNT
════════════════════════════════════════════ */
function generateRoles(count: number): RoleId[] {
  if (count <= 5)  return ["wolf", "detective", "doctor", "villager", "villager"];
  if (count === 6) return ["wolf", "wolf", "detective", "doctor", "villager", "villager"];
  if (count === 7) return ["wolf", "wolf", "detective", "doctor", "witch", "villager", "villager"];
  if (count === 8) return ["wolf", "wolf", "detective", "doctor", "witch", "villager", "villager", "villager"];
  return               ["wolf", "wolf", "detective", "doctor", "witch", "villager", "villager", "villager", "villager"];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ════════════════════════════════════════════
   TYPES
════════════════════════════════════════════ */
type Screen = "lobby" | "roleReveal" | "night" | "question" | "vote" | "elimination" | "gameover";
type Difficulty2 = "DỄ" | "THƯỜNG" | "KHÓ";

interface Player {
  id: number;
  name: string;
  role: RoleId;
  alive: boolean;
  protected: boolean;
  roleRevealed: boolean; // was publicly revealed (eliminated)
}

interface NightState {
  wolfTarget: number | null;      // player id
  doctorProtects: number | null;  // player id
  detectiveChecks: number | null; // player id
  detectiveResult: boolean | null; // is wolf?
  witchSave: boolean;
  witchKill: number | null;
  witchSaveUsed: boolean;
  witchKillUsed: boolean;
  step: "wolf" | "doctor" | "detective" | "witch" | "done";
}

interface VoteState {
  votes: Record<number, number>; // playerId -> vote count
  revealed: boolean;
  eliminatedId: number | null;
}

interface GameState {
  screen: Screen;
  players: Player[];
  round: number;
  score: number; // village team score
  difficulty: Difficulty2;
  nightState: NightState;
  voteState: VoteState;
  currentQuestion: Question | null;
  questionAnswered: boolean | null; // true=correct, false=wrong, null=pending
  attackedPlayerId: number | null;
  eliminatedThisRound: number | null; // from night attack
  eliminatedByVote: number | null;
  usedQuestionIds: number[];
  correctAnswers: number;
  totalRounds: number;
  roleRevealIndex: number; // which player is being shown their role
  log: string[]; // host-only action log
  witchSaveUsed: boolean; // persists across rounds
  witchKillUsed: boolean; // persists across rounds
}

/* ════════════════════════════════════════════
   SMALL UI ATOMS
════════════════════════════════════════════ */
function PhaseBadge({ phase, round }: { phase: string; round: number }) {
  const meta: Record<string, { bg: string; border: string; color: string }> = {
    "ĐÊM":     { bg: "rgba(123,94,167,0.22)", border: "rgba(123,94,167,0.55)", color: C.purpleLight },
    "NGÀY":    { bg: "rgba(244,162,97,0.18)", border: "rgba(244,162,97,0.55)", color: C.amberLight },
    "BỎ PHIẾU":{ bg: "rgba(230,57,70,0.18)", border: "rgba(230,57,70,0.55)", color: C.red },
    "KẾT THÚC":{ bg: "rgba(46,196,182,0.15)", border: "rgba(46,196,182,0.45)", color: C.teal },
  };
  const s = meta[phase] ?? meta["NGÀY"];
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 16px",
      background:s.bg, border:`1px solid ${s.border}`, borderRadius:20 }}>
      <motion.div animate={{ opacity:[1,0.3,1] }} transition={{ duration:1.5, repeat:Infinity }}
        style={{ width:6, height:6, borderRadius:"50%", background:s.color }} />
      <span style={{ color:s.color, fontFamily:MONO, fontSize:11, letterSpacing:"0.18em" }}>
        {phase} — VÒNG {round}
      </span>
    </div>
  );
}

function PlayerCard({
  player, onClick, highlight, dimmed, votesCount, showRole,
}: {
  player: Player; onClick?: () => void; highlight?: "target" | "protect" | "check" | "selected";
  dimmed?: boolean; votesCount?: number; showRole?: boolean;
}) {
  const dead = !player.alive;
  const role = ROLES[player.role];
  // Only show role color when the role is publicly known (dead/revealed) or explicitly forced (game over screen)
  const roleKnown = dead || showRole || player.roleRevealed;
  const avatarBg     = dead ? "rgba(255,255,255,0.06)" : roleKnown ? `${role.color}25` : `${C.amber}18`;
  const avatarBorder = dead ? "rgba(255,255,255,0.1)"  : roleKnown ? `${role.color}80` : `${C.amber}40`;
  const border = highlight === "target"  ? C.red
               : highlight === "protect" ? C.teal
               : highlight === "check"   ? C.gold
               : highlight === "selected"? C.amber
               : dead ? "rgba(255,255,255,0.06)" : C.borderNavy;
  return (
    <motion.div
      whileHover={onClick && !dead ? { scale:1.04, y:-2 } : {}}
      whileTap={onClick && !dead ? { scale:0.97 } : {}}
      onClick={onClick && !dead ? onClick : undefined}
      style={{
        position:"relative", padding:"14px 12px", cursor:onClick && !dead ? "pointer" : "default",
        background: dead ? "rgba(255,255,255,0.02)" : highlight ? `${border}12` : C.navyPanel,
        border:`2px solid ${border}`,
        opacity: dimmed || dead ? 0.42 : 1,
        transition:"all 0.2s",
        boxShadow: highlight ? `0 0 18px ${border}40` : "none",
      }}
    >
      {/* Pulsing border for target */}
      {highlight === "target" && (
        <motion.div animate={{ opacity:[0.4, 1, 0.4] }} transition={{ duration:1.2, repeat:Infinity }}
          style={{ position:"absolute", inset:-2, border:`2px solid ${C.red}`, pointerEvents:"none" }} />
      )}

      {/* Avatar — neutral color unless role is publicly revealed */}
      <div style={{ width:44, height:44, borderRadius:"50%", margin:"0 auto 10px",
        background: avatarBg,
        border:`2px solid ${avatarBorder}`,
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:18, position:"relative" }}>
        {dead ? "✕" : player.name.slice(0,1).toUpperCase()}
        {/* Status dot */}
        <div style={{ position:"absolute", bottom:-2, right:-2, width:10, height:10, borderRadius:"50%",
          background:dead?C.red:C.teal, border:`2px solid ${C.navyLight}` }} />
      </div>

      {/* Name */}
      <p style={{ color: dead ? C.muted : C.white, fontFamily:SANS, fontSize:13, fontWeight:600,
        textAlign:"center", marginBottom:4,
        textDecoration: dead ? "line-through" : "none" }}>
        {player.name}
      </p>

      {/* Role — only shown when publicly revealed */}
      {roleKnown && (
        <p style={{ textAlign:"center", color:role.color, fontFamily:MONO, fontSize:9, letterSpacing:"0.1em" }}>
          {role.icon} {role.name.toUpperCase()}
        </p>
      )}

      {/* Vote count badge */}
      {votesCount !== undefined && votesCount > 0 && (
        <div style={{ position:"absolute", top:-8, right:-8, width:22, height:22, borderRadius:"50%",
          background:C.red, display:"flex", alignItems:"center", justifyContent:"center",
          fontFamily:MONO, fontSize:11, color:"#fff", fontWeight:700 }}>
          {votesCount}
        </div>
      )}

      {/* Protected shield */}
      {highlight === "protect" && (
        <div style={{ position:"absolute", top:6, left:6, color:C.teal, fontSize:14 }}>⚕</div>
      )}
    </motion.div>
  );
}

function ScoreStrip({ score, correct, round }: { score:number; correct:number; round:number }) {
  return (
    <div style={{ display:"flex", gap:16, alignItems:"center" }}>
      {[
        { l:"ĐIỂM", v:`${score}`, c:C.gold },
        { l:"ĐÚNG", v:`${correct}`, c:C.teal },
        { l:"VÒNG", v:`${round}`, c:C.amber },
      ].map(x => (
        <div key={x.l} style={{ textAlign:"center" }}>
          <p style={{ color:C.muted, fontFamily:MONO, fontSize:8, letterSpacing:"0.14em" }}>{x.l}</p>
          <p style={{ color:x.c, fontFamily:MONO, fontSize:20, lineHeight:1 }}>{x.v}</p>
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════
   VILLAGE SILHOUETTE SVG
════════════════════════════════════════════ */
function VillageSilhouette({ night=true }: { night?:boolean }) {
  const sky = night ? "#0A1520" : "#1A2F4A";
  const fill = night ? "#0D2035" : "#152A40";
  const moon = night ? C.gold : "transparent";
  return (
    <svg viewBox="0 0 800 160" style={{ width:"100%", display:"block" }} preserveAspectRatio="xMidYMax slice">
      <rect width="800" height="160" fill={sky} />
      {/* Moon */}
      <circle cx="700" cy="38" r="26" fill={moon} opacity="0.9" />
      <circle cx="714" cy="32" r="22" fill={sky} />
      {/* Stars */}
      {night && [[60,20],[140,35],[300,15],[420,28],[550,10],[180,8],[480,40]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="1.5" fill={C.gold} opacity="0.7" />
      ))}
      {/* Village silhouette */}
      <path d={`M0,160 L0,110 L40,110 L40,90 L60,70 L80,90 L80,110 
        L120,110 L120,80 L140,60 L160,80 L160,110 
        L200,110 L200,95 L220,75 L240,95 L240,110
        L280,110 L280,85 L310,65 L340,85 L340,110
        L380,110 L380,100 L400,80 L420,100 L420,110
        L460,110 L460,88 L480,70 L500,88 L500,110
        L540,110 L540,95 L570,75 L600,95 L600,110
        L640,110 L640,85 L660,65 L680,85 L680,110
        L720,110 L720,100 L740,80 L760,100 L760,110
        L800,110 L800,160 Z`}
        fill={fill} />
      {/* Windows */}
      {night && [[85,96],[165,95],[245,100],[355,90],[425,95],[505,93],[605,100],[685,90],[765,95]].map(([x,y],i)=>(
        <rect key={i} x={x} y={y} width="8" height="7" fill={C.gold} opacity="0.6" />
      ))}
    </svg>
  );
}

/* ════════════════════════════════════════════
   TIMER BAR
════════════════════════════════════════════ */
function TimerBar({ seconds, total, onExpire }: { seconds:number; total:number; onExpire:()=>void }) {
  const [left, setLeft] = useState(seconds);
  const ref = useRef(left);
  ref.current = left;

  useEffect(() => {
    setLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    const id = setInterval(() => {
      setLeft(v => {
        if (v <= 1) { clearInterval(id); onExpire(); return 0; }
        return v - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [onExpire]);

  const pct = (left / total) * 100;
  const color = left > total * 0.5 ? C.amber : left > total * 0.25 ? C.amberDark : C.red;

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
        <span style={{ color:C.muted, fontFamily:MONO, fontSize:9, letterSpacing:"0.12em" }}>THỜI GIAN</span>
        <motion.span animate={{ color: left <= 10 ? [C.red, C.amber, C.red] : color }}
          transition={{ duration:0.5, repeat:left<=10?Infinity:0 }}
          style={{ fontFamily:MONO, fontSize:18, lineHeight:1 }}>
          {left}s
        </motion.span>
      </div>
      <div style={{ height:6, background:"rgba(255,255,255,0.06)", overflow:"hidden" }}>
        <motion.div animate={{ width:`${pct}%` }} transition={{ duration:0.9, ease:"linear" }}
          style={{ height:"100%", background:color, boxShadow:`0 0 8px ${color}80`,
            transition:`background 0.3s` }} />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   INITIAL STATE
════════════════════════════════════════════ */
function makeNightState(witchSaveUsed = false, witchKillUsed = false): NightState {
  return {
    wolfTarget:null, doctorProtects:null, detectiveChecks:null,
    detectiveResult:null, witchSave:false, witchKill:null,
    witchSaveUsed, witchKillUsed, step:"wolf",
  };
}
function makeVoteState(): VoteState {
  return { votes:{}, revealed:false, eliminatedId:null };
}

/* ════════════════════════════════════════════
   SCREEN: LOBBY
════════════════════════════════════════════ */
function LobbyScreen({ onStart, onClose }: { onStart:(names:string[], diff:Difficulty2)=>void; onClose:()=>void }) {
  const [names, setNames] = useState<string[]>(Array(7).fill("").map((_,i)=>`Người chơi ${i+1}`));
  const [count, setCount] = useState(7);
  const [diff, setDiff] = useState<Difficulty2>("THƯỜNG");
  const [showRules, setShowRules] = useState(false);

  const activeNames = names.slice(0, count);

  return (
    <div style={{ flex:1, overflow:"auto" }}>
      <VillageSilhouette night />

      <div style={{ padding:"28px 24px 40px", maxWidth:720, margin:"0 auto" }}>
        {/* Title */}
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.6, ease:[0.22,1,0.36,1]}}>
          <p style={{ color:C.amber, fontFamily:MONO, fontSize:9.5, letterSpacing:"0.32em", textAlign:"center", marginBottom:10 }}>
            CHƯƠNG 3 · KINH TẾ CHÍNH TRỊ MÁC–LÊNIN
          </p>
          <h1 style={{ color:C.white, fontFamily:SERIF, fontSize:"clamp(36px,7vw,72px)", fontWeight:300,
            fontStyle:"italic", textAlign:"center", lineHeight:1.05, marginBottom:6 }}>
            Ma Sói
          </h1>
          <h2 style={{ color:C.amber, fontFamily:SERIF, fontSize:"clamp(18px,3vw,28px)", fontWeight:300,
            fontStyle:"italic", textAlign:"center", lineHeight:1.3, marginBottom:32 }}>
            Kinh Tế Chính Trị
          </h2>
        </motion.div>

        {/* Player count */}
        <div style={{ marginBottom:24 }}>
          <p style={{ color:C.muted, fontFamily:MONO, fontSize:9.5, letterSpacing:"0.18em", marginBottom:12 }}>
            SỐ NGƯỜI CHƠI
          </p>
          <div style={{ display:"flex", gap:8 }}>
            {[5,6,7,8,9].map(n => (
              <motion.button key={n} whileTap={{ scale:0.95 }} onClick={() => setCount(n)}
                style={{ flex:1, padding:"12px 0", background:count===n?C.amber:"transparent",
                  border:`1px solid ${count===n?C.amber:C.borderNavy}`,
                  color:count===n?C.navy:C.dim, fontFamily:MONO, fontSize:15, fontWeight:700,
                  cursor:"pointer" }}>
                {n}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Player names */}
        <div style={{ marginBottom:24 }}>
          <p style={{ color:C.muted, fontFamily:MONO, fontSize:9.5, letterSpacing:"0.18em", marginBottom:12 }}>
            TÊN NGƯỜI CHƠI
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            {activeNames.map((name, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:28, height:28, background:C.navyPanel, border:`1px solid ${C.borderNavy}`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  color:C.amber, fontFamily:MONO, fontSize:11, flexShrink:0 }}>
                  {i+1}
                </div>
                <input
                  value={name}
                  onChange={e => {
                    const n = [...names];
                    n[i] = e.target.value;
                    setNames(n);
                  }}
                  style={{ flex:1, background:C.navyPanel, border:`1px solid ${C.borderNavy}`,
                    color:C.white, fontFamily:SANS, fontSize:14, padding:"8px 12px",
                    outline:"none" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div style={{ marginBottom:28 }}>
          <p style={{ color:C.muted, fontFamily:MONO, fontSize:9.5, letterSpacing:"0.18em", marginBottom:12 }}>
            ĐỘ KHÓ CÂU HỎI
          </p>
          <div style={{ display:"flex", gap:8 }}>
            {(["DỄ","THƯỜNG","KHÓ"] as Difficulty2[]).map(d => (
              <motion.button key={d} whileTap={{scale:0.95}} onClick={()=>setDiff(d)}
                style={{ flex:1, padding:"12px 0", background:diff===d?`${C.amber}22`:"transparent",
                  border:`1px solid ${diff===d?C.amber:C.borderNavy}`,
                  color:diff===d?C.amber:C.dim, fontFamily:MONO, fontSize:11, letterSpacing:"0.12em",
                  cursor:"pointer" }}>
                {d}
              </motion.button>
            ))}
          </div>
          <p style={{ color:C.muted, fontFamily:MONO, fontSize:8.5, marginTop:8 }}>
            {diff==="DỄ" ? "Câu hỏi cơ bản, nhiều thời gian · Phù hợp nhập môn" :
             diff==="THƯỜNG" ? "Câu hỏi vừa phải · Phù hợp ôn tập" :
             "Câu hỏi phân tích sâu · Dành cho sinh viên nâng cao"}
          </p>
        </div>

        {/* Rules toggle */}
        <motion.div style={{ marginBottom:24, background:C.navyPanel, border:`1px solid ${C.borderNavy}` }}>
          <button onClick={()=>setShowRules(v=>!v)}
            style={{ width:"100%", padding:"14px 18px", background:"transparent", border:"none",
              color:C.amber, fontFamily:MONO, fontSize:10, letterSpacing:"0.14em", cursor:"pointer",
              display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span>LUẬT CHƠI TÓM TẮT</span>
            <motion.span animate={{rotate:showRules?90:0}}>{">>"}</motion.span>
          </button>
          <AnimatePresence>
            {showRules && (
              <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}}
                exit={{height:0,opacity:0}} transition={{duration:0.3}} style={{overflow:"hidden"}}>
                <div style={{ padding:"0 18px 18px", borderTop:`1px solid ${C.borderNavy}` }}>
                  {[
                    ["🌙 ĐÊM","Sói chọn mục tiêu · Thầy thuốc bảo vệ · Thám tử điều tra"],
                    ["☀ NGÀY","Công bố nạn nhân → Trả lời câu hỏi kinh tế (30 giây)"],
                    ["✓ ĐÚNG","Nạn nhân được cứu! +10 điểm cho làng"],
                    ["✗ SAI","Nạn nhân bị loại khỏi làng. Lật thẻ lộ vai."],
                    ["🗳 BỎ PHIẾU","Cả nhóm bầu nghi phạm. Đúng Sói +20đ · Oan người −10đ"],
                    ["🏆 THẮNG","Loại hết Sói · THUA: Sói bằng hoặc nhiều hơn dân"],
                  ].map(([t,d]) => (
                    <div key={t} style={{ padding:"8px 0", borderBottom:`1px solid ${C.ghost}`, display:"flex", gap:12 }}>
                      <span style={{ color:C.amber, fontFamily:MONO, fontSize:10, minWidth:90, flexShrink:0 }}>{t}</span>
                      <span style={{ color:C.dim, fontFamily:SANS, fontSize:13, lineHeight:1.6 }}>{d}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Buttons */}
        <div style={{ display:"flex", gap:12 }}>
          <motion.button whileHover={{scale:1.03, boxShadow:`0 0 40px ${C.amber}50`}} whileTap={{scale:0.97}}
            onClick={() => onStart(activeNames, diff)}
            style={{ flex:1, padding:"18px", background:`linear-gradient(135deg,${C.amberDark},${C.amber})`,
              border:"none", color:C.navy, fontFamily:MONO, fontSize:14, fontWeight:700,
              letterSpacing:"0.18em", cursor:"pointer", boxShadow:`0 0 24px ${C.amber}30` }}>
            BẮT ĐẦU CHƠI →
          </motion.button>
          <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.97}} onClick={onClose}
            style={{ padding:"18px 24px", background:"transparent", border:`1px solid ${C.borderNavy}`,
              color:C.dim, fontFamily:MONO, fontSize:11, cursor:"pointer" }}>
            THOÁT
          </motion.button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   SCREEN: ROLE REVEAL
════════════════════════════════════════════ */
function RoleRevealScreen({ players, index, onConfirm }: {
  players:Player[]; index:number; onConfirm:()=>void;
}) {
  const [flipped, setFlipped] = useState(false);
  const player = players[index];
  const role = ROLES[player.role];

  useEffect(() => { setFlipped(false); }, [index]);

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      padding:"32px 24px", background:C.navy,
      backgroundImage:`radial-gradient(ellipse at 50% 0%, ${role.color}10 0%, transparent 60%)` }}>

      <p style={{ color:C.muted, fontFamily:MONO, fontSize:9, letterSpacing:"0.24em", marginBottom:12 }}>
        NGƯỜI CHƠI {index+1} / {players.length}
      </p>
      <p style={{ color:C.white, fontFamily:SANS, fontSize:22, fontWeight:700, marginBottom:32 }}>
        {player.name}, hãy xem vai của bạn!
      </p>

      {/* Card flip */}
      <div style={{ perspective:1000, width:280, height:380, cursor:"pointer", marginBottom:28 }}
        onClick={() => setFlipped(true)}>
        <motion.div animate={{ rotateY: flipped ? 0 : 180 }}
          transition={{ duration:0.55, ease:[0.22,1,0.36,1] }}
          style={{ width:"100%", height:"100%", position:"relative", transformStyle:"preserve-3d" }}>

          {/* Front (role) */}
          <div style={{ position:"absolute", inset:0, backfaceVisibility:"hidden",
            background:role.bg, border:`2px solid ${role.color}60`,
            display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:28 }}>
            <div style={{ fontSize:72, marginBottom:20, filter:`drop-shadow(0 0 20px ${role.color})` }}>
              {role.icon}
            </div>
            <p style={{ color:role.color, fontFamily:MONO, fontSize:11, letterSpacing:"0.22em", marginBottom:8 }}>
              {role.nameEn}
            </p>
            <h2 style={{ color:C.white, fontFamily:SERIF, fontSize:38, fontWeight:400, fontStyle:"italic",
              textAlign:"center", marginBottom:20, textShadow:`0 0 20px ${role.color}60` }}>
              {role.name}
            </h2>
            <p style={{ color:C.dim, fontFamily:SANS, fontSize:13.5, textAlign:"center", lineHeight:1.75,
              marginBottom:14 }}>
              {role.description}
            </p>
            <div style={{ padding:"10px 14px", background:`${role.color}12`, border:`1px solid ${role.color}30`,
              width:"100%" }}>
              <p style={{ color:role.color, fontFamily:MONO, fontSize:9, letterSpacing:"0.08em", marginBottom:5 }}>
                QUYỀN NĂNG
              </p>
              <p style={{ color:C.dim, fontFamily:SANS, fontSize:12, lineHeight:1.6 }}>{role.power}</p>
            </div>
          </div>

          {/* Back (hidden) */}
          <div style={{ position:"absolute", inset:0, backfaceVisibility:"hidden", transform:"rotateY(180deg)",
            background:C.navyPanel, border:`2px solid ${C.borderNavy}`,
            display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
            <div style={{ fontSize:52, marginBottom:16, opacity:0.4 }}>🌙</div>
            <p style={{ color:C.muted, fontFamily:MONO, fontSize:11, letterSpacing:"0.16em" }}>
              NHẤN ĐỂ LẬT
            </p>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {flipped && (
          <motion.button initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}
            whileHover={{scale:1.04, boxShadow:`0 0 32px ${role.color}50`}} whileTap={{scale:0.97}}
            onClick={onConfirm}
            style={{ padding:"16px 48px", background:`${role.color}22`,
              border:`2px solid ${role.color}`, color:role.color,
              fontFamily:MONO, fontSize:13, letterSpacing:"0.18em", cursor:"pointer" }}>
            ĐÃ HIỂU VAI →
          </motion.button>
        )}
      </AnimatePresence>

      {!flipped && (
        <p style={{ color:C.muted, fontFamily:MONO, fontSize:9.5 }}>Nhấn vào thẻ để lật</p>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════
   SCREEN: NIGHT PHASE
════════════════════════════════════════════ */
function NightScreen({ players, night, round, onNightDone, score, correct }: {
  players:Player[]; night:NightState; round:number;
  onNightDone:(n:NightState)=>void; score:number; correct:number;
}) {
  const [ns, setNs] = useState<NightState>(night);
  const alive = players.filter(p=>p.alive);
  const hasWitch = players.some(p=>p.role==="witch" && p.alive);

  const stepOrder: NightState["step"][] = ["wolf","doctor","detective","witch","done"];

  const steps = [
    { id:"wolf",      label:"SÓI THỨC",        icon:"🐺", color:C.red,    desc:"Sói bí mật chỉ định 1 người để tấn công đêm nay" },
    { id:"doctor",    label:"THẦY THUỐC THỨC",  icon:"⚕", color:C.teal,   desc:"Thầy thuốc chọn 1 người để bảo vệ khỏi Sói đêm nay" },
    { id:"detective", label:"THÁM TỬ THỨC",      icon:"🔍", color:C.gold,   desc:"Thám tử điều tra 1 người — Host sẽ tiết lộ kết quả bí mật" },
    { id:"witch",     label:"PHÙ THỦY THỨC",     icon:"🧙", color:C.purple, desc:"Phù thủy quyết định dùng thuốc cứu hay thuốc độc (nếu còn)" },
    { id:"done",      label:"BÌNH MINH",          icon:"☀", color:C.amber,  desc:"Tất cả đã hành động. Chuyển sang giai đoạn ban ngày." },
  ].filter(s => s.id !== "witch" || hasWitch);

  const currentStep = steps.find(s=>s.id===ns.step) ?? steps[steps.length-1];

  function selectWolfTarget(pid:number) {
    if (ns.step!=="wolf") return;
    setNs(n=>({...n, wolfTarget:pid}));
  }
  function selectDoctorProtect(pid:number) {
    if (ns.step!=="doctor") return;
    setNs(n=>({...n, doctorProtects:pid}));
  }
  function selectDetective(pid:number) {
    if (ns.step!=="detective") return;
    const isWolf = players.find(p=>p.id===pid)?.role==="wolf";
    setNs(n=>({...n, detectiveChecks:pid, detectiveResult:isWolf??false}));
  }


  function advanceStep() {
    const idx = stepOrder.indexOf(ns.step);
    const next = stepOrder[idx+1] ?? "done";
    if (next==="done") {
      onNightDone(ns);
    } else if (next==="witch" && !hasWitch) {
      onNightDone(ns);
    } else {
      setNs(n=>({...n, step:next as NightState["step"]}));
    }
  }

  const canAdvance = ns.step==="wolf" ? ns.wolfTarget!==null
    : ns.step==="doctor" ? ns.doctorProtects!==null
    : ns.step==="detective" ? ns.detectiveChecks!==null
    : true;

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden",
      background:`radial-gradient(ellipse at 50% 0%, rgba(123,94,167,0.18) 0%, transparent 55%)` }}>
      <VillageSilhouette night />
      <div style={{ flex:1, overflow:"auto", padding:"20px 20px 32px" }}>
        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <PhaseBadge phase="ĐÊM" round={round} />
          <ScoreStrip score={score} correct={correct} round={round} />
        </div>

        {/* Step indicator */}
        <div style={{ display:"flex", gap:4, marginBottom:20 }}>
          {steps.map((s,i) => (
            <div key={s.id} style={{ flex:1, height:3,
              background: steps.indexOf(currentStep)>=i ? s.color : "rgba(255,255,255,0.08)" }} />
          ))}
        </div>

        {/* Current action card */}
        <motion.div key={ns.step} initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{duration:0.35}}
          style={{ background:C.navyPanel, border:`1px solid ${currentStep.color}40`,
            borderTop:`3px solid ${currentStep.color}`, padding:"20px 22px", marginBottom:20 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
            <span style={{ fontSize:28 }}>{currentStep.icon}</span>
            <div>
              <p style={{ color:currentStep.color, fontFamily:MONO, fontSize:9.5, letterSpacing:"0.2em", marginBottom:3 }}>
                {currentStep.label}
              </p>
              <p style={{ color:C.dim, fontFamily:SANS, fontSize:14 }}>{currentStep.desc}</p>
            </div>
          </div>

          {/* Detective result */}
          {ns.step==="detective" && ns.detectiveChecks!==null && ns.detectiveResult!==null && (
            <div style={{ padding:"12px 16px", marginTop:12,
              background:ns.detectiveResult?`${C.red}15`:`${C.teal}15`,
              border:`1px solid ${ns.detectiveResult?C.red:C.teal}40` }}>
              <p style={{ color:ns.detectiveResult?C.red:C.teal, fontFamily:MONO, fontSize:13, fontWeight:700 }}>
                {players.find(p=>p.id===ns.detectiveChecks)?.name} là{" "}
                {ns.detectiveResult?"🐺 SÓI! Cẩn thận!":"🏡 DÂN LÀNG vô tội."}
              </p>
              <p style={{ color:C.muted, fontFamily:MONO, fontSize:8.5, marginTop:4 }}>
                (Chỉ Thám tử biết — giữ bí mật!)
              </p>
            </div>
          )}

          {/* Witch choices */}
          {ns.step==="witch" && (
            <div style={{ display:"flex", gap:10, marginTop:12 }}>
              {/* CỨU: chỉ hiện khi mục tiêu sói KHÔNG phải chính phù thủy */}
              {!ns.witchSaveUsed && ns.wolfTarget &&
                players.find(p=>p.id===ns.wolfTarget)?.role !== "witch" && (
                <motion.button whileHover={{scale:1.03}} whileTap={{scale:0.97}}
                  onClick={()=>setNs(n=>({...n,witchSave:true,witchSaveUsed:true}))}
                  style={{ flex:1, padding:"11px", background:`${C.teal}18`,
                    border:`1px solid ${C.teal}`, color:C.teal, fontFamily:MONO, fontSize:10,
                    cursor:"pointer", letterSpacing:"0.1em" }}>
                  ⚗ Dùng thuốc CỨU{!ns.witchSaveUsed?"":" (đã dùng)"}
                </motion.button>
              )}
              {!ns.witchKillUsed && (
                <motion.button whileHover={{scale:1.03}} whileTap={{scale:0.97}}
                  onClick={()=>{
                    const target = alive.find(p=>p.id!==ns.wolfTarget && p.role!=="witch");
                    if(target) setNs(n=>({...n,witchKill:target.id,witchKillUsed:true}));
                  }}
                  style={{ flex:1, padding:"11px", background:`${C.red}18`,
                    border:`1px solid ${C.red}`, color:C.red, fontFamily:MONO, fontSize:10,
                    cursor:"pointer", letterSpacing:"0.1em" }}>
                  💀 Dùng thuốc ĐỘC
                </motion.button>
              )}
              <motion.button whileHover={{scale:1.03}} whileTap={{scale:0.97}} onClick={advanceStep}
                style={{ flex:1, padding:"11px", background:"transparent",
                  border:`1px solid ${C.muted}`, color:C.dim, fontFamily:MONO, fontSize:10,
                  cursor:"pointer" }}>
                Bỏ qua →
              </motion.button>
            </div>
          )}
        </motion.div>

        {/* Player grid */}
        {ns.step !== "done" && ns.step !== "witch" && (
          <div style={{ marginBottom:20 }}>
            <p style={{ color:C.muted, fontFamily:MONO, fontSize:9, letterSpacing:"0.16em", marginBottom:12 }}>
              {ns.step==="wolf" ? "Chọn nạn nhân (Sói quyết định — không thể chọn Sói khác):"
              :ns.step==="doctor" ? "Chọn người cần bảo vệ:"
              :"Chọn người cần điều tra (không thể tự soi mình):"}
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))", gap:10 }}>
              {alive.map(p => {
                const isWolfStep      = ns.step === "wolf";
                const isDetectiveStep = ns.step === "detective";
                // Wolves cannot target other wolves
                const isAllyWolf = isWolfStep && p.role === "wolf";
                // Detective cannot investigate themselves
                const detectivePlayer = players.find(pl => pl.role === "detective" && pl.alive);
                const isSelf = isDetectiveStep && detectivePlayer !== undefined && p.id === detectivePlayer.id;
                const disabled = isAllyWolf || isSelf;
                const isTarget  = ns.wolfTarget===p.id;
                const isProtect = ns.doctorProtects===p.id;
                const isChecked = ns.detectiveChecks===p.id;
                const hl = isWolfStep&&isTarget?"target"
                  : ns.step==="doctor"&&isProtect?"protect"
                  : isDetectiveStep&&isChecked?"check"
                  : undefined;
                return (
                  <PlayerCard key={p.id} player={p}
                    onClick={disabled ? undefined : ()=>{
                      if(ns.step==="wolf") selectWolfTarget(p.id);
                      else if(ns.step==="doctor") selectDoctorProtect(p.id);
                      else if(ns.step==="detective") selectDetective(p.id);
                    }}
                    highlight={hl}
                    dimmed={disabled}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Night summary */}
        {ns.wolfTarget && (
          <div style={{ padding:"12px 16px", background:`${C.red}0c`, border:`1px solid ${C.red}22`, marginBottom:12 }}>
            <p style={{ color:C.muted, fontFamily:MONO, fontSize:8.5 }}>Sói nhắm tới:</p>
            <p style={{ color:C.red, fontFamily:SANS, fontSize:15, fontWeight:700 }}>
              🐺 {players.find(p=>p.id===ns.wolfTarget)?.name}
            </p>
          </div>
        )}
        {ns.doctorProtects && (
          <div style={{ padding:"12px 16px", background:`${C.teal}0c`, border:`1px solid ${C.teal}22`, marginBottom:12 }}>
            <p style={{ color:C.muted, fontFamily:MONO, fontSize:8.5 }}>Thầy thuốc bảo vệ:</p>
            <p style={{ color:C.teal, fontFamily:SANS, fontSize:15, fontWeight:700 }}>
              ⚕ {players.find(p=>p.id===ns.doctorProtects)?.name}
            </p>
          </div>
        )}

        {/* Advance button */}
        {ns.step !== "witch" && (
          <motion.button whileHover={canAdvance?{scale:1.03,boxShadow:`0 0 30px ${C.amber}40`}:{}}
            whileTap={canAdvance?{scale:0.97}:{}}
            onClick={canAdvance ? advanceStep : undefined}
            style={{ width:"100%", padding:"16px",
              background:canAdvance?`linear-gradient(135deg,${C.amberDark},${C.amber})`:"rgba(255,255,255,0.04)",
              border:`1px solid ${canAdvance?C.amber:"rgba(255,255,255,0.08)"}`,
              color:canAdvance?C.navy:C.muted, fontFamily:MONO, fontSize:13, letterSpacing:"0.18em",
              cursor:canAdvance?"pointer":"not-allowed", fontWeight:700 }}>
            {ns.step==="done" ? "BÌNH MINH → NGÀY MỚI"
            : ns.step==="wolf" ? (canAdvance?"TIẾP THEO: THẦY THUỐC →":"Chọn nạn nhân trước")
            : ns.step==="doctor" ? (canAdvance?"TIẾP THEO: THÁM TỬ →":"Chọn người bảo vệ trước")
            : ns.step==="detective" ? (canAdvance?"TIẾP THEO: KẾT THÚC ĐÊM →":"Chọn người điều tra trước")
            : "TIẾP THEO →"}
          </motion.button>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   SCREEN: QUESTION (Day Phase)
════════════════════════════════════════════ */
function QuestionScreen({ question, attackedName, players, round, onAnswer, score, correct, diff }: {
  question:Question; attackedName:string; players:Player[]; round:number;
  onAnswer:(correct:boolean, optionIdx:number)=>void;
  score:number; correct:number; diff:Difficulty2;
}) {
  const [selected, setSelected] = useState<number|null>(null);
  const [revealed, setRevealed] = useState(false);
  const [expired, setExpired] = useState(false);
  const timerSecs = diff==="DỄ"?75:diff==="THƯỜNG"?60:50; // +30s từ gốc (DỄ:75s, THƯỜNG:60s, KHÓ:50s)

  function choose(idx:number) {
    if (revealed || expired) return;
    setSelected(idx);
    setRevealed(true);
    onAnswer(idx===question.correct, idx);
  }

  function handleExpire() {
    if (!revealed) {
      setExpired(true);
      setRevealed(true);
      onAnswer(false, -1);
    }
  }

  const optionColors: Record<number, { bg:string; border:string; color:string }> = {};
  if (revealed) {
    [0,1,2,3].forEach(i=>{
      if (i===question.correct) {
        optionColors[i]={bg:`${C.teal}22`,border:C.teal,color:C.teal};
      } else if (i===selected && selected!==question.correct) {
        optionColors[i]={bg:`${C.red}22`,border:C.red,color:C.red};
      } else {
        optionColors[i]={bg:"rgba(255,255,255,0.02)",border:"rgba(255,255,255,0.08)",color:C.muted};
      }
    });
  }

  const letters = ["A","B","C","D"];
  const isCorrect = revealed && (selected===question.correct);

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden",
      background:`radial-gradient(ellipse at 50% 0%, rgba(244,162,97,0.12) 0%, transparent 55%)` }}>
      <VillageSilhouette night={false} />
      <div style={{ flex:1, overflow:"auto", padding:"20px 20px 32px", maxWidth:720, margin:"0 auto", width:"100%" }}>

        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <PhaseBadge phase="NGÀY" round={round} />
          <ScoreStrip score={score} correct={correct} round={round} />
        </div>

        {/* Attack announcement */}
        <motion.div initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} transition={{duration:0.5}}
          style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 18px",
            background:`${C.red}12`, border:`1px solid ${C.red}40`, marginBottom:16 }}>
          <span style={{ fontSize:22 }}>🌅</span>
          <p style={{ color:C.white, fontFamily:SANS, fontSize:16, fontWeight:600 }}>
            <span style={{ color:C.red }}>{attackedName}</span> bị Sói tấn công đêm qua!
          </p>
        </motion.div>

        {/* Timer */}
        {!revealed && (
          <div style={{ marginBottom:16 }}>
            <TimerBar seconds={timerSecs} total={timerSecs} onExpire={handleExpire} />
          </div>
        )}

        {/* Result banner */}
        <AnimatePresence>
          {revealed && (
            <motion.div initial={{opacity:0,scale:0.94}} animate={{opacity:1,scale:1}}
              transition={{duration:0.4, ease:[0.22,1,0.36,1]}}
              style={{ padding:"14px 18px", marginBottom:16,
                background:isCorrect?`${C.teal}18`:`${C.red}18`,
                border:`2px solid ${isCorrect?C.teal:C.red}` }}>
              <p style={{ color:isCorrect?C.teal:C.red, fontFamily:SANS, fontSize:18, fontWeight:700, marginBottom:4 }}>
                {isCorrect?"✓ Đúng rồi! Làng được bảo vệ! +10 điểm"
                :expired?"⏰ Hết giờ! Nạn nhân bị loại khỏi làng!"
                :"✗ Sai! Nạn nhân bị loại khỏi làng!"}
              </p>
              <p style={{ color:isCorrect?`${C.teal}cc`:`${C.red}cc`, fontFamily:MONO, fontSize:9.5 }}>
                {isCorrect?`${attackedName} được cứu sống!`:`${attackedName} rời khỏi làng.`}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Question card */}
        <div style={{ background:C.navyPanel, border:`1px solid ${C.borderNavy}`,
          borderTop:`3px solid ${C.amber}`, padding:"22px 22px", marginBottom:16 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
            <span style={{ color:C.red, fontFamily:MONO, fontSize:9.5, letterSpacing:"0.14em" }}>
              Sói thách đố Làng:
            </span>
            <div style={{ display:"flex", gap:6 }}>
              <span style={{ padding:"3px 10px", background:`${C.amber}15`, border:`1px solid ${C.amber}30`,
                color:C.amber, fontFamily:MONO, fontSize:8, letterSpacing:"0.1em" }}>
                {question.topic}
              </span>
              <span style={{ padding:"3px 10px",
                background:question.difficulty==="DỄ"?`${C.teal}12`:question.difficulty==="KHÓ"?`${C.red}12`:`${C.amber}10`,
                border:`1px solid ${question.difficulty==="DỄ"?C.teal:question.difficulty==="KHÓ"?C.red:C.amber}30`,
                color:question.difficulty==="DỄ"?C.teal:question.difficulty==="KHÓ"?C.red:C.amber,
                fontFamily:MONO, fontSize:8, letterSpacing:"0.1em" }}>
                {question.difficulty}
              </span>
            </div>
          </div>
          <p style={{ color:C.white, fontFamily:SANS, fontSize:"clamp(15px,2.5vw,20px)", fontWeight:600,
            lineHeight:1.55, marginBottom:20 }}>
            {question.text}
          </p>

          {/* Options */}
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {question.options.map((opt,i)=>{
              const s = revealed ? optionColors[i] : undefined;
              return (
                <motion.button key={i} whileHover={!revealed?{scale:1.015,x:4}:{}}
                  whileTap={!revealed?{scale:0.985}:{}}
                  onClick={()=>choose(i)}
                  initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}}
                  transition={{delay:i*0.06}}
                  style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 16px",
                    background:s?s.bg:"rgba(255,255,255,0.04)",
                    border:`1px solid ${s?s.border:"rgba(255,255,255,0.1)"}`,
                    cursor:revealed?"default":"pointer", textAlign:"left",
                    boxShadow: s&&i===question.correct?`0 0 20px ${C.teal}30`:"none" }}>
                  <div style={{ width:32, height:32, flexShrink:0, display:"flex", alignItems:"center",
                    justifyContent:"center", background:s?`${s.border}22`:`${C.amber}14`,
                    border:`1px solid ${s?s.border:C.amber}40` }}>
                    <span style={{ color:s?s.color:C.amber, fontFamily:MONO, fontSize:13, fontWeight:700 }}>
                      {letters[i]}
                    </span>
                  </div>
                  <span style={{ color:s?s.color:C.white, fontFamily:SANS, fontSize:15, lineHeight:1.55 }}>
                    {opt}
                  </span>
                  {revealed && i===question.correct && (
                    <span style={{ marginLeft:"auto", color:C.teal, fontSize:18, flexShrink:0 }}>✓</span>
                  )}
                  {revealed && i===selected && i!==question.correct && (
                    <span style={{ marginLeft:"auto", color:C.red, fontSize:18, flexShrink:0 }}>✗</span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {revealed && (
            <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.3,duration:0.45}}
              style={{ padding:"16px 18px", background:`${C.gold}0a`, border:`1px solid ${C.borderGold}` }}>
              <p style={{ color:C.gold, fontFamily:MONO, fontSize:9.5, letterSpacing:"0.14em", marginBottom:8 }}>
                GIẢI THÍCH
              </p>
              <p style={{ color:C.dim, fontFamily:SANS, fontSize:14, lineHeight:1.8 }}>
                {question.explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   SCREEN: VOTE
════════════════════════════════════════════ */
function VoteScreen({ players, round, vote, onVote, onReveal, onConfirm, score, correct }: {
  players:Player[]; round:number; vote:VoteState;
  onVote:(pid:number)=>void; onReveal:()=>void; onConfirm:(pid:number|null)=>void;
  score:number; correct:number;
}) {
  const alive = players.filter(p=>p.alive);
  const totalVotes = Object.values(vote.votes).reduce((a,b)=>a+b,0);
  const maxVotes = Math.max(...alive.map(p=>vote.votes[p.id]||0), 0);
  const topCandidates = alive.filter(p=>(vote.votes[p.id]||0)===maxVotes && maxVotes>0);
  const eliminated = vote.eliminatedId!==null ? players.find(p=>p.id===vote.eliminatedId) : null;

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden",
      background:`radial-gradient(ellipse at 50% 0%, rgba(230,57,70,0.12) 0%, transparent 55%)` }}>
      <VillageSilhouette night={false} />
      <div style={{ flex:1, overflow:"auto", padding:"20px 20px 32px" }}>

        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <PhaseBadge phase="BỎ PHIẾU" round={round} />
          <ScoreStrip score={score} correct={correct} round={round} />
        </div>

        <h2 style={{ color:C.white, fontFamily:SERIF, fontSize:28, fontWeight:300, fontStyle:"italic",
          textAlign:"center", marginBottom:4 }}>
          Ai là Sói ẩn náu?
        </h2>
        <p style={{ color:C.muted, fontFamily:SANS, fontSize:14, textAlign:"center", marginBottom:20 }}>
          Host nhấn vào người bị nghi ngờ để thêm phiếu · {totalVotes} phiếu đã bỏ
        </p>

        {/* Vote tally bar */}
        {totalVotes > 0 && (
          <div style={{ marginBottom:20, background:C.navyPanel, border:`1px solid ${C.borderNavy}`, padding:"14px 16px" }}>
            {alive.filter(p=>(vote.votes[p.id]||0)>0).sort((a,b)=>(vote.votes[b.id]||0)-(vote.votes[a.id]||0)).map(p=>{
              const v=vote.votes[p.id]||0;
              const pct=totalVotes>0?v/totalVotes*100:0;
              return (
                <div key={p.id} style={{ marginBottom:8 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                    <span style={{ color:C.dim, fontFamily:SANS, fontSize:13 }}>{p.name}</span>
                    <span style={{ color:C.red, fontFamily:MONO, fontSize:13 }}>{v} phiếu</span>
                  </div>
                  <div style={{ height:6, background:"rgba(255,255,255,0.06)", overflow:"hidden" }}>
                    <motion.div animate={{width:`${pct}%`}} transition={{duration:0.5}}
                      style={{ height:"100%", background:C.red, boxShadow:`0 0 8px ${C.red}60` }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Player grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))", gap:10, marginBottom:20 }}>
          {alive.map(p=>(
            <PlayerCard key={p.id} player={p}
              votesCount={vote.votes[p.id]||0}
              highlight={(vote.votes[p.id]||0)===maxVotes&&maxVotes>0?"selected":undefined}
              onClick={()=>onVote(p.id)}
            />
          ))}
        </div>

        {/* Reveal / Confirm */}
        {!vote.revealed ? (
          <motion.button whileHover={{scale:1.03,boxShadow:`0 0 30px ${C.red}40`}} whileTap={{scale:0.97}}
            onClick={onReveal}
            style={{ width:"100%", padding:"16px", background:`linear-gradient(135deg,${C.redDark},${C.red})`,
              border:"none", color:"#fff", fontFamily:MONO, fontSize:14, letterSpacing:"0.18em",
              cursor:"pointer", boxShadow:`0 0 20px ${C.red}30`, fontWeight:700 }}>
            CÔNG BỐ KẾT QUẢ BỎ PHIẾU
          </motion.button>
        ) : (
          <div>
            {/* Reveal result */}
            <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}}
              transition={{duration:0.5, ease:[0.22,1,0.36,1]}}
              style={{ padding:"20px 22px", marginBottom:14, textAlign:"center",
                background: eliminated?.role==="wolf"?`${C.teal}14`:`${C.red}14`,
                border:`2px solid ${eliminated?.role==="wolf"?C.teal:C.red}` }}>
              {topCandidates.length>0 ? (
                <>
                  <p style={{ color:C.muted, fontFamily:MONO, fontSize:10, marginBottom:10 }}>
                    Người bị loại nhiều phiếu nhất
                  </p>
                  <p style={{ color:C.white, fontFamily:SERIF, fontSize:28, fontStyle:"italic", marginBottom:8 }}>
                    {topCandidates.map(p=>p.name).join(" / ")}
                  </p>
                  <p style={{ fontSize:36, marginBottom:8 }}>
                    {topCandidates[0].role==="wolf"?"🐺":"🏡"}
                  </p>
                  <p style={{ color:topCandidates[0].role==="wolf"?C.teal:C.red,
                    fontFamily:MONO, fontSize:14, letterSpacing:"0.12em", fontWeight:700 }}>
                    {topCandidates[0].role==="wolf"
                      ? "LÀ SÓI! Làng thắng vòng này! +20 điểm"
                      : "LÀ DÂN LÀNG VÔ TỘI. −10 điểm"}
                  </p>
                </>
              ):(
                <p style={{ color:C.muted, fontFamily:SANS, fontSize:16 }}>Không có ai bị bỏ phiếu loại.</p>
              )}
            </motion.div>

            <motion.button whileHover={{scale:1.03}} whileTap={{scale:0.97}}
              onClick={()=>onConfirm(topCandidates.length>0?topCandidates[0].id:null)}
              style={{ width:"100%", padding:"16px", background:`linear-gradient(135deg,${C.amberDark},${C.amber})`,
                border:"none", color:C.navy, fontFamily:MONO, fontSize:14, letterSpacing:"0.18em",
                cursor:"pointer", fontWeight:700 }}>
              TIẾP THEO →
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   SCREEN: ELIMINATION RESULT
════════════════════════════════════════════ */
function EliminationScreen({ players, attackedId, voteEliminatedId, nightSaved, round,
  onContinue, score, correct, question }: {
  players:Player[]; attackedId:number|null; voteEliminatedId:number|null;
  nightSaved:boolean; round:number; onContinue:()=>void;
  score:number; correct:number; question:Question|null;
}) {
  const attacked = players.find(p=>p.id===attackedId);
  const voted    = players.find(p=>p.id===voteEliminatedId);

  const wolfEliminated = voted?.role==="wolf";

  return (
    <div style={{ flex:1, overflow:"auto", display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"flex-start", padding:"28px 20px 40px",
      background:wolfEliminated?`radial-gradient(ellipse at 50% 20%,${C.teal}12 0%,transparent 60%)`
                               :`radial-gradient(ellipse at 50% 20%,${C.red}10 0%,transparent 60%)` }}>
      {/* Header */}
      <div style={{ width:"100%", maxWidth:620, display:"flex", justifyContent:"space-between",
        alignItems:"center", marginBottom:24 }}>
        <PhaseBadge phase="KẾT THÚC" round={round} />
        <ScoreStrip score={score} correct={correct} round={round} />
      </div>

      {/* Night result */}
      {attacked && (
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
          transition={{duration:0.5, ease:[0.22,1,0.36,1]}}
          style={{ width:"100%", maxWidth:620, padding:"20px 22px",
            background:nightSaved?`${C.teal}12`:`${C.red}12`,
            border:`2px solid ${nightSaved?C.teal:C.red}`, marginBottom:16 }}>
          <div style={{ display:"flex", alignItems:"center", gap:14 }}>
            <span style={{ fontSize:32 }}>{nightSaved?"⚕":"🐺"}</span>
            <div>
              <p style={{ color:nightSaved?C.teal:C.red, fontFamily:MONO, fontSize:11, letterSpacing:"0.14em", marginBottom:4 }}>
                {nightSaved?"ĐÊMQUA — ĐÃ ĐƯỢC CỨU":"ĐÊM QUA — BỊ LOẠI"}
              </p>
              <p style={{ color:C.white, fontFamily:SANS, fontSize:16, fontWeight:700 }}>
                {attacked.name} {nightSaved
                  ? "được Thầy thuốc / trả lời đúng câu hỏi → sống sót!"
                  : "bị Sói tấn công → bị loại khỏi làng."}
              </p>
              {!nightSaved && (
                <p style={{ color:C.muted, fontFamily:MONO, fontSize:9, marginTop:4 }}>
                  Vai: {ROLES[attacked.role].icon} {ROLES[attacked.role].name}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Vote result */}
      {voted && (
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
          transition={{duration:0.5, delay:0.15, ease:[0.22,1,0.36,1]}}
          style={{ width:"100%", maxWidth:620, padding:"20px 22px",
            background:wolfEliminated?`${C.teal}18`:`${C.red}18`,
            border:`3px solid ${wolfEliminated?C.teal:C.red}`, marginBottom:20 }}>
          <div style={{ textAlign:"center" }}>
            <p style={{ color:C.muted, fontFamily:MONO, fontSize:9, letterSpacing:"0.18em", marginBottom:10 }}>
              KẾT QUẢ BỎ PHIẾU
            </p>
            <span style={{ fontSize:52 }}>{wolfEliminated?"🎉":"💀"}</span>
            <h2 style={{ color:C.white, fontFamily:SERIF, fontSize:32, fontStyle:"italic",
              fontWeight:400, margin:"10px 0 8px" }}>
              {voted.name}
            </h2>
            <span style={{ display:"inline-block", padding:"4px 14px",
              background:`${wolfEliminated?C.teal:C.red}22`, border:`1px solid ${wolfEliminated?C.teal:C.red}`,
              color:wolfEliminated?C.teal:C.red, fontFamily:MONO, fontSize:11, letterSpacing:"0.12em", marginBottom:12 }}>
              {ROLES[voted.role].icon} {ROLES[voted.role].name.toUpperCase()}
            </span>
            <p style={{ color:wolfEliminated?C.teal:C.red, fontFamily:SANS, fontSize:18, fontWeight:700, marginBottom:4 }}>
              {wolfEliminated?"Làng chiến thắng vòng này! +20 điểm"
              :"Dân làng vô tội bị oan! Sói còn ẩn náu... −10 điểm"}
            </p>
          </div>
        </motion.div>
      )}

      {/* No vote */}
      {!voted && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.15}}
          style={{ width:"100%", maxWidth:620, padding:"14px 18px",
            background:"rgba(255,255,255,0.04)", border:`1px solid ${C.borderNavy}`, marginBottom:20 }}>
          <p style={{ color:C.muted, fontFamily:SANS, fontSize:15, textAlign:"center" }}>
            Không có ai bị loại qua bỏ phiếu vòng này.
          </p>
        </motion.div>
      )}

      {/* Knowledge snippet */}
      {question && (
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.35}}
          style={{ width:"100%", maxWidth:620, padding:"16px 18px",
            background:`${C.gold}0a`, border:`1px solid ${C.borderGold}`, marginBottom:24 }}>
          <p style={{ color:C.gold, fontFamily:MONO, fontSize:9, letterSpacing:"0.14em", marginBottom:8 }}>
            KIẾN THỨC VÒNG NÀY
          </p>
          <p style={{ color:C.dim, fontFamily:SANS, fontSize:13.5, lineHeight:1.8 }}>
            {question.explanation}
          </p>
        </motion.div>
      )}

      <motion.button whileHover={{scale:1.04,boxShadow:`0 0 30px ${C.amber}40`}} whileTap={{scale:0.97}}
        onClick={onContinue}
        style={{ width:"100%", maxWidth:620, padding:"16px",
          background:`linear-gradient(135deg,${C.amberDark},${C.amber})`,
          border:"none", color:C.navy, fontFamily:MONO, fontSize:14, letterSpacing:"0.18em",
          cursor:"pointer", fontWeight:700 }}>
        ĐÊM TIẾP THEO →
      </motion.button>
    </div>
  );
}

/* ════════════════════════════════════════════
   SCREEN: GAME OVER
════════════════════════════════════════════ */
function GameOverScreen({ players, score, correct, round, onReplay, onClose }: {
  players:Player[]; score:number; correct:number; round:number;
  onReplay:()=>void; onClose:()=>void;
}) {
  const wolves = players.filter(p=>p.role==="wolf");
  const villagers = players.filter(p=>p.role!=="wolf");
  const aliveWolves = wolves.filter(p=>p.alive).length;
  const aliveVillagers = villagers.filter(p=>p.alive).length;
  const villageWins = aliveWolves === 0;

  return (
    <div style={{ flex:1, overflow:"auto",
      background:villageWins?`radial-gradient(ellipse at 50% 0%,${C.teal}18 0%,transparent 55%)`
                            :`radial-gradient(ellipse at 50% 0%,${C.red}14 0%,transparent 55%)` }}>
      <VillageSilhouette night={!villageWins} />
      <div style={{ padding:"24px 20px 40px", maxWidth:680, margin:"0 auto" }}>

        {/* Main result */}
        <motion.div initial={{opacity:0,scale:0.92,y:24}} animate={{opacity:1,scale:1,y:0}}
          transition={{duration:0.65, ease:[0.22,1,0.36,1]}}
          style={{ textAlign:"center", padding:"36px 28px 28px",
            background:villageWins?`${C.teal}12`:`${C.red}10`,
            border:`3px solid ${villageWins?C.teal:C.red}`, marginBottom:20 }}>
          <div style={{ fontSize:72, marginBottom:16 }}>
            {villageWins?"🏆":"🐺"}
          </div>
          <p style={{ color:villageWins?C.teal:C.red, fontFamily:MONO, fontSize:11,
            letterSpacing:"0.28em", marginBottom:10 }}>
            {villageWins?"KẾT QUẢ · DÂN LÀNG CHIẾN THẮNG":"KẾT QUẢ · SÓI CHIẾN THẮNG"}
          </p>
          <h1 style={{ color:C.white, fontFamily:SERIF, fontSize:"clamp(32px,6vw,58px)",
            fontWeight:300, fontStyle:"italic", marginBottom:14 }}>
            {villageWins?"Làng được giải thoát!":"Sói đã chiếm lĩnh làng!"}
          </h1>
          <p style={{ color:C.dim, fontFamily:SANS, fontSize:16, lineHeight:1.8 }}>
            {villageWins
              ? "Dân làng đã dùng kiến thức kinh tế chính trị để vạch trần Sói. Thắng lợi thuộc về tri thức!"
              : "Sói giỏi lắm. Nhưng kiến thức vẫn là của bạn! Thử lại để làng giành chiến thắng."}
          </p>
        </motion.div>

        {/* Score summary */}
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
          style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:1, background:C.borderNavy,
            marginBottom:20 }}>
          {[
            {l:"TỔNG ĐIỂM",v:`${score}`,c:C.gold},
            {l:"CÂU ĐÚNG",v:`${correct}`,c:C.teal},
            {l:"SỐ VÒNG",v:`${round}`,c:C.amber},
          ].map(x=>(
            <div key={x.l} style={{ background:C.navyPanel, padding:"20px 16px", textAlign:"center" }}>
              <p style={{ color:C.muted, fontFamily:MONO, fontSize:8, letterSpacing:"0.14em", marginBottom:8 }}>{x.l}</p>
              <p style={{ color:x.c, fontFamily:MONO, fontSize:36, lineHeight:1,
                textShadow:`0 0 20px ${x.c}60` }}>{x.v}</p>
            </div>
          ))}
        </motion.div>

        {/* Player survival list */}
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.3}}
          style={{ marginBottom:24 }}>
          <p style={{ color:C.muted, fontFamily:MONO, fontSize:9, letterSpacing:"0.16em", marginBottom:12 }}>
            DANH SÁCH NGƯỜI CHƠI
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))", gap:8 }}>
            {players.map(p=>(
              <PlayerCard key={p.id} player={p} showRole />
            ))}
          </div>
        </motion.div>

        {/* Learning summary */}
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.4}}
          style={{ padding:"18px 20px", background:`${C.gold}0a`, border:`1px solid ${C.borderGold}`, marginBottom:24 }}>
          <p style={{ color:C.gold, fontFamily:MONO, fontSize:9.5, letterSpacing:"0.14em", marginBottom:12 }}>
            KIẾN THỨC ĐÃ HỌC — CHƯƠNG 3
          </p>
          {[
            "Giá trị thặng dư siêu ngạch = (W_xh − W_cb) × Sản lượng — tạo ra khi doanh nghiệp áp dụng công nghệ vượt trội hơn mức trung bình xã hội.",
            "Công nghệ 4.0 (AI, robot, IoT, Big Data) là động lực chủ yếu tạo ra GTTSN trong kỷ nguyên hiện đại.",
            "Quy luật bình quân hóa buộc doanh nghiệp phải liên tục đổi mới — GTTSN chỉ tồn tại tạm thời trước khi đối thủ bắt kịp.",
          ].map((fact,i)=>(
            <div key={i} style={{ display:"flex", gap:10, marginBottom:10, alignItems:"flex-start" }}>
              <span style={{ color:C.gold, fontFamily:MONO, fontSize:12, marginTop:1, flexShrink:0 }}>
                {["I","II","III"][i]}.
              </span>
              <p style={{ color:C.dim, fontFamily:SANS, fontSize:13.5, lineHeight:1.75 }}>{fact}</p>
            </div>
          ))}
        </motion.div>

        {/* Buttons */}
        <div style={{ display:"flex", gap:10 }}>
          <motion.button whileHover={{scale:1.03,boxShadow:`0 0 30px ${C.amber}40`}} whileTap={{scale:0.97}}
            onClick={onReplay}
            style={{ flex:2, padding:"16px", background:`linear-gradient(135deg,${C.amberDark},${C.amber})`,
              border:"none", color:C.navy, fontFamily:MONO, fontSize:13, letterSpacing:"0.18em",
              cursor:"pointer", fontWeight:700 }}>
            CHƠI LẠI TỪ ĐẦU
          </motion.button>
          <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.97}} onClick={onClose}
            style={{ flex:1, padding:"16px", background:"transparent",
              border:`1px solid ${C.borderNavy}`, color:C.dim,
              fontFamily:MONO, fontSize:11, cursor:"pointer" }}>
            ← THOÁT
          </motion.button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   HEADER BAR (in-game)
════════════════════════════════════════════ */
function GameHeader({ screen, round, score, correct, players, onClose }: {
  screen:Screen; round:number; score:number; correct:number; players:Player[]; onClose:()=>void;
}) {
  const aliveCount = players.filter(p=>p.alive).length;
  const wolfCount  = players.filter(p=>p.alive && p.role==="wolf").length;

  return (
    <div style={{ height:50, background:C.navyLight, borderBottom:`1px solid ${C.borderNavy}`,
      display:"flex", alignItems:"center", gap:0, flexShrink:0, overflow:"hidden" }}>
      {/* Brand */}
      <div style={{ padding:"0 18px", borderRight:`1px solid ${C.borderNavy}`, height:"100%",
        display:"flex", alignItems:"center" }}>
        <span style={{ color:C.amber, fontFamily:MONO, fontSize:11, letterSpacing:"0.2em" }}>
          MA SÓI KTCT
        </span>
      </div>
      {/* Stats */}
      <div style={{ display:"flex", alignItems:"center", height:"100%", flex:1 }}>
        {[
          {l:"VÒNG",v:`${round}`,c:C.amber},
          {l:"ĐIỂM",v:`${score}`,c:C.gold},
          {l:"ĐÚNG",v:`${correct}`,c:C.teal},
          {l:"CÒN SỐNG",v:`${aliveCount}/${players.length}`,c:C.white},
        ].map((x,i)=>(
          <div key={i} style={{ padding:"0 14px", borderRight:`1px solid ${C.borderNavy}`, height:"100%",
            display:"flex", flexDirection:"column", justifyContent:"center" }}>
            <p style={{ color:C.muted, fontFamily:MONO, fontSize:7.5, letterSpacing:"0.12em" }}>{x.l}</p>
            <p style={{ color:x.c, fontFamily:MONO, fontSize:17, lineHeight:1 }}>{x.v}</p>
          </div>
        ))}
      </div>
      {/* Exit */}
      <div style={{ padding:"0 14px", borderLeft:`1px solid ${C.borderNavy}`, height:"100%",
        display:"flex", alignItems:"center" }}>
        <button onClick={onClose} style={{ padding:"5px 14px", background:"transparent",
          border:`1px solid ${C.borderNavy}`, color:C.muted, fontFamily:MONO, fontSize:9,
          letterSpacing:"0.1em", cursor:"pointer" }}>
          ← THOÁT
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   MAIN GAME CONTROLLER
════════════════════════════════════════════ */
export function MaSoiGame({ onClose }: { onClose:()=>void }) {
  const [state, setState] = useState<GameState>({
    screen:"lobby",
    players:[],
    round:1,
    score:0,
    difficulty:"THƯỜNG",
    nightState:makeNightState(),
    voteState:makeVoteState(),
    currentQuestion:null,
    questionAnswered:null,
    attackedPlayerId:null,
    eliminatedThisRound:null,
    eliminatedByVote:null,
    usedQuestionIds:[],
    correctAnswers:0,
    totalRounds:0,
    roleRevealIndex:0,
    log:[],
    witchSaveUsed:false,
    witchKillUsed:false,
  });

  /* ── Pick question by difficulty ── */
  function pickQuestion(diff:Difficulty2, used:number[]): Question|null {
    const pool = QUESTIONS.filter(q=>!used.includes(q.id) &&
      (diff==="DỄ" ? q.difficulty==="DỄ"
      :diff==="KHÓ" ? q.difficulty==="KHÓ"||q.difficulty==="TRUNG BÌNH"
      : true));
    if (pool.length===0) {
      const any = QUESTIONS.filter(q=>!used.includes(q.id));
      if (any.length===0) return QUESTIONS[Math.floor(Math.random()*QUESTIONS.length)];
      return any[Math.floor(Math.random()*any.length)];
    }
    return pool[Math.floor(Math.random()*pool.length)];
  }

  /* ── Check win condition ── */
  function checkWin(players:Player[]): boolean {
    const aliveWolves = players.filter(p=>p.alive && p.role==="wolf").length;
    const aliveVillagers = players.filter(p=>p.alive && p.role!=="wolf").length;
    return aliveWolves===0 || aliveWolves>=aliveVillagers;
  }

  /* ── START GAME ── */
  function startGame(names:string[], diff:Difficulty2) {
    const roleList = shuffle(generateRoles(names.length));
    const players: Player[] = names.map((name,i)=>({
      id:i+1, name, role:roleList[i], alive:true, protected:false, roleRevealed:false,
    }));
    setState(s=>({...s,
      screen:"roleReveal", players, difficulty:diff, roleRevealIndex:0,
      round:1, score:0, correctAnswers:0, totalRounds:0, usedQuestionIds:[],
    }));
  }

  /* ── ROLE REVEAL confirm ── */
  function confirmRole() {
    setState(s=>{
      const next = s.roleRevealIndex+1;
      if (next>=s.players.length) {
        // All roles revealed → start night
        const q = pickQuestion(s.difficulty, s.usedQuestionIds);
        return {...s, screen:"night", nightState:makeNightState(s.witchSaveUsed, s.witchKillUsed), currentQuestion:q};
      }
      return {...s, roleRevealIndex:next};
    });
  }

  /* ── NIGHT DONE ── */
  function handleNightDone(ns:NightState) {
    setState(s=>{
      // Determine who was actually attacked
      let attackedId = ns.wolfTarget;
      let nightSaved = false;

      // Doctor protection
      if (ns.doctorProtects===ns.wolfTarget) nightSaved=true;
      // Witch save
      if (ns.witchSave) nightSaved=true;

      // Persist witch potion usage across rounds
      const witchSaveUsed = s.witchSaveUsed || ns.witchSaveUsed;
      const witchKillUsed = s.witchKillUsed || ns.witchKillUsed;

      return {...s,
        screen:"question",
        nightState:ns,
        attackedPlayerId:attackedId,
        eliminatedThisRound:nightSaved?null:attackedId,
        questionAnswered:null,
        witchSaveUsed,
        witchKillUsed,
      };
    });
  }

  /* ── ANSWER QUESTION ── */
  const handleAnswer = useCallback((correct:boolean, _optionIdx:number) => {
    setState(s=>{
      let newScore = s.score;
      let newCorrect = s.correctAnswers;
      let eliminated = s.eliminatedThisRound;

      if (correct) {
        newScore += 10;
        newCorrect += 1;
        eliminated = null; // saved by correct answer
      }
      // Update players
      let players = s.players.map(p=>{
        if (p.id===eliminated && !correct) return {...p, alive:false, roleRevealed:true};
        if (s.nightState.witchKill && p.id===s.nightState.witchKill) return {...p, alive:false, roleRevealed:true};
        return p;
      });

      return {...s,
        score:newScore, correctAnswers:newCorrect,
        questionAnswered:correct, eliminatedThisRound:eliminated,
        players,
        screen:"vote",
        voteState:makeVoteState(),
        usedQuestionIds:[...s.usedQuestionIds, s.currentQuestion?.id??0],
      };
    });
  }, []);

  /* ── VOTE ── */
  function addVote(pid:number) {
    setState(s=>{
      const alive = s.players.filter(p=>p.alive);
      const totalVotes = Object.values(s.voteState.votes).reduce((a,b)=>a+b,0);
      // Cap total votes at the number of alive players
      if (totalVotes >= alive.length) return s;
      return {...s,
        voteState:{...s.voteState, votes:{
          ...s.voteState.votes,
          [pid]:(s.voteState.votes[pid]||0)+1,
        }},
      };
    });
  }
  function revealVote() {
    setState(s=>{
      const alive = s.players.filter(p=>p.alive);
      const maxV = Math.max(...alive.map(p=>s.voteState.votes[p.id]||0));
      const top = alive.filter(p=>(s.voteState.votes[p.id]||0)===maxV&&maxV>0);
      const elim = top.length>0?top[0]:null;
      return {...s, voteState:{...s.voteState, revealed:true, eliminatedId:elim?.id??null}};
    });
  }
  function confirmVote(elimId:number|null) {
    setState(s=>{
      let players = s.players;
      let newScore = s.score;
      if (elimId!==null) {
        const elim = players.find(p=>p.id===elimId);
        if (elim?.role==="wolf") newScore+=20;
        else newScore-=10;
        players = players.map(p=>p.id===elimId?{...p,alive:false,roleRevealed:true}:p);
      }
      // Check win
      const gameOver = checkWin(players);
      return {...s,
        players, score:Math.max(0,newScore), eliminatedByVote:elimId,
        screen:gameOver?"gameover":"elimination",
        totalRounds:s.round,
      };
    });
  }

  /* ── CONTINUE after elimination ── */
  function handleContinue() {
    setState(s=>{
      const q = pickQuestion(s.difficulty, s.usedQuestionIds);
      return {...s,
        screen:"night",
        round:s.round+1,
        nightState:makeNightState(s.witchSaveUsed, s.witchKillUsed),
        voteState:makeVoteState(),
        currentQuestion:q,
        attackedPlayerId:null,
        eliminatedThisRound:null,
        eliminatedByVote:null,
        questionAnswered:null,
      };
    });
  }

  /* ── REPLAY ── */
  function handleReplay() {
    setState(s=>({...s, screen:"lobby", players:[]}));
  }

  const s = state;
  const showHeader = s.screen!=="lobby" && s.screen!=="roleReveal" && s.screen!=="gameover";
  const attackedPlayer = s.players.find(p=>p.id===s.attackedPlayerId);

  return (
    <div style={{ position:"fixed", inset:0, background:C.navy, display:"flex",
      flexDirection:"column", zIndex:3000, overflow:"hidden" }}>

      {showHeader && (
        <GameHeader screen={s.screen} round={s.round} score={s.score} correct={s.correctAnswers}
          players={s.players} onClose={onClose} />
      )}

      <AnimatePresence mode="wait">
        {s.screen==="lobby" && (
          <motion.div key="lobby" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            transition={{duration:0.3}} style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
            <LobbyScreen onStart={startGame} onClose={onClose} />
          </motion.div>
        )}

        {s.screen==="roleReveal" && (
          <motion.div key={`role-${s.roleRevealIndex}`} initial={{opacity:0,scale:0.96}} animate={{opacity:1,scale:1}}
            exit={{opacity:0,scale:1.04}} transition={{duration:0.35}}
            style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
            <RoleRevealScreen players={s.players} index={s.roleRevealIndex} onConfirm={confirmRole} />
          </motion.div>
        )}

        {s.screen==="night" && (
          <motion.div key={`night-${s.round}`} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            transition={{duration:0.35}} style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
            <NightScreen players={s.players} night={s.nightState} round={s.round}
              onNightDone={handleNightDone} score={s.score} correct={s.correctAnswers} />
          </motion.div>
        )}

        {s.screen==="question" && s.currentQuestion && (
          <motion.div key={`q-${s.round}`} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            transition={{duration:0.35}} style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
            <QuestionScreen question={s.currentQuestion}
              attackedName={attackedPlayer?.name ?? "???"}
              players={s.players} round={s.round}
              onAnswer={handleAnswer} score={s.score}
              correct={s.correctAnswers} diff={s.difficulty} />
          </motion.div>
        )}

        {s.screen==="vote" && (
          <motion.div key={`vote-${s.round}`} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            transition={{duration:0.35}} style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
            <VoteScreen players={s.players} round={s.round} vote={s.voteState}
              onVote={addVote} onReveal={revealVote} onConfirm={confirmVote}
              score={s.score} correct={s.correctAnswers} />
          </motion.div>
        )}

        {s.screen==="elimination" && (
          <motion.div key={`elim-${s.round}`} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            transition={{duration:0.35}} style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
            <EliminationScreen players={s.players}
              attackedId={s.attackedPlayerId} voteEliminatedId={s.eliminatedByVote}
              nightSaved={s.questionAnswered===true}
              round={s.round} onContinue={handleContinue}
              score={s.score} correct={s.correctAnswers} question={s.currentQuestion} />
          </motion.div>
        )}

        {s.screen==="gameover" && (
          <motion.div key="gameover" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            transition={{duration:0.4}} style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
            <GameOverScreen players={s.players} score={s.score}
              correct={s.correctAnswers} round={s.round}
              onReplay={handleReplay} onClose={onClose} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
