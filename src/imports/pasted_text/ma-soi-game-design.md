# MA SÓI KINH TẾ CHÍNH TRỊ — CHƯƠNG 3
## Tài liệu thiết kế Figma + Bộ câu hỏi đầy đủ

---

# PHẦN 1 — PROMPT CHO FIGMA / THIẾT KẾ GAME

## Mô tả tổng thể

Thiết kế giao diện game **"Ma Sói Kinh Tế Chính Trị"** — trò chơi học thuật kết hợp cơ chế Ma Sói với câu hỏi trắc nghiệm về Giá trị Thặng dư Siêu ngạch (Chương 3 — Kinh tế Chính trị Mác-Lênin). Game chiếu trên màn hình lớp học, 1 người host điều khiển, nhiều người chơi tham gia.

---

## Prompt cho Figma (copy nguyên vào Figma AI / Make hoặc giao cho designer)

```
Design a mobile-first but also large-screen-friendly game UI called
"Ma Sói Kinh Tế" (Werewolf Economics Quiz Game) for Vietnamese university
students. The game teaches Marxist political economy through werewolf
social deduction mechanics.

VISUAL STYLE:
- Dark atmospheric theme with a village-at-night aesthetic
- Color palette: Deep navy (#0D1B2A) background, warm amber (#F4A261)
  accents, blood red (#E63946) for wolf elements, soft teal (#2EC4B6)
  for villager/safe elements, muted gold (#E9C46A) for correct answers
- Typography: Bold Vietnamese-friendly font (Nunito or Be Vietnam Pro),
  large readable sizes for classroom projection
- Flat design, no gradients except subtle overlay on the night scene
- Village silhouette illustration at the top of each screen (simple SVG:
  rooftops, trees, moon)

SCREENS TO DESIGN (7 screens total):

--- SCREEN 1: START / LOBBY ---
- Title: "MA SÓI KINH TẾ CHÍNH TRỊ" in large bold type
- Subtitle: "Chương 3 — Giá trị Thặng dư Siêu ngạch"
- Village night scene illustration (top half)
- Two buttons: "Bắt đầu chơi" (primary, amber) | "Luật chơi" (secondary, outline)
- Player count selector: 5 / 7 / 9 / 11 players (tab selector)
- Difficulty toggle: DỄ (3 lives) | THƯỜNG (2 lives) | KHÓ (1 life)

--- SCREEN 2: ROLE REVEAL (private, shown per device) ---
- Dark overlay, centered card
- Role icon (large, 80px): 🐺 for Wolf | 🏡 for Villager | 🔍 for Detective
  | ⚕️ for Doctor | 🧙 for Witch
- Role name in large type
- Short role description (2 lines max)
- Special power if any (e.g., "Thám tử: Mỗi đêm điều tra 1 người")
- "Đã hiểu vai" confirm button

--- SCREEN 3: NIGHT PHASE ---
- Background: Very dark navy, moon illustration top-right
- Phase chip: "ĐÊM — Vòng N" in purple pill badge
- Atmospheric text: "Bóng tối bao trùm làng..." (italic, muted)
- Player grid: 2-3 columns of player cards
  Each card: Avatar circle (initials) + Name + Status dot (alive=green, dead=red)
  Wolf-targeted card: subtle red pulsing border
- Action panel (bottom): Role-specific action buttons
  Wolf: "Chọn nạn nhân" → tap player card → confirm
  Doctor: "Bảo vệ ai đêm nay?" → tap player → confirm
  Detective: "Điều tra ai?" → tap → reveal wolf/not wolf
- Host-only "Kết thúc đêm → Bình minh" button (large, bottom)

--- SCREEN 4: QUESTION PHASE (Day — Quiz) ---
- Background: Warm daylight gradient (very subtle, cream to white)
- Phase chip: "NGÀY — Vòng N" in amber pill badge
- Attacked player banner: "[Tên] bị Sói tấn công đêm qua!" with red icon
- Question card (main area, 60% height):
  - "Sói [Tên Sói] thách đố:" label in small red text
  - Question text: large, bold, max 2 lines
  - 4 answer buttons: A / B / C / D
    Each: white card, left-aligned text, letter badge on left
    States: default | hover | selected | correct (teal) | wrong (red)
- Timer bar: thin progress bar below question (30 seconds, amber → red)
- If answered correctly: green banner "✓ Đúng! [Tên] được bảo vệ!"
- If answered wrongly: red banner "✗ Sai! [Tên] bị loại khỏi làng."

--- SCREEN 5: VOTE PHASE ---
- Phase chip: "BỎ PHIẾU — Chọn nghi phạm" in red pill badge
- Header: "Ai là Sói ẩn náu?"
- Player grid: all alive players shown as vote cards
  Each card: Avatar + Name + Vote count badge
  Tapped = highlighted in red with checkmark
- Vote tally bar: horizontal bar chart updating live
- "Xác nhận bỏ phiếu" button (locked until selection)
- Reveal button (host only): "Công bố kết quả" → animate card flip
  → show role (Sói 🐺 or Dân làng 🏡)

--- SCREEN 6: ELIMINATION RESULT ---
- Large centered card with dramatic reveal animation
- If wolf eliminated: Green success state
  Icon: 🎉, Text: "[Tên] là SÓI! Làng chiến thắng vòng này!"
  Bonus: "+20 điểm cho đội Dân làng"
- If villager wrongly eliminated: Red failure state  
  Icon: 💀, Text: "[Tên] là Dân làng vô tội. Sói còn ẩn náu..."
  Penalty: "-5 điểm | Sói cười thầm"
- Knowledge snippet: small card at bottom with the correct answer explanation
  (2-3 lines, educational takeaway from the question)
- "Tiếp tục → Đêm tiếp theo" button

--- SCREEN 7: GAME OVER ---
- Two states: WIN (Dân làng thắng) | LOSE (Sói thắng)
- WIN: Village daytime scene, celebration, trophy icon
  Score display: large number, "X câu đúng / Y vòng"
  Knowledge summary: 3 key facts learned (accordion or card list)
- LOSE: Dark scene, wolf howling silhouette
  Encouraging message: "Sói giỏi lắm. Nhưng kiến thức vẫn là của bạn!"
  Review button: "Xem lại các câu hỏi"
- Replay button: "Chơi lại từ đầu"

COMPONENT LIBRARY TO DESIGN:
- Player card (4 states: alive, dead, targeted, protected)
- Answer button (5 states: default, hover, selected, correct, wrong)
- Phase chip / badge (night, day, vote, end)
- Role card (5 roles: wolf, villager, detective, doctor, witch)
- Knowledge snippet card
- Timer bar component
- Vote tally bar
- Score badge

INTERACTION NOTES FOR PROTOTYPE:
- Night → Day: transition with sunrise animation overlay (simple fade from
  dark navy to warm cream, 1.5s)
- Answer reveal: 0.5s delay after selection, then color change + explanation
  slides up from bottom
- Vote reveal: card flip animation (3D transform, 0.8s)
- Player elimination: card fades to 40% opacity, strikethrough name
- All transitions: ease-in-out, max 400ms (except special reveals)

ACCESSIBILITY:
- Minimum font size 16px for body, 24px+ for questions (classroom projection)
- High contrast: text on dark bg minimum 4.5:1 ratio
- Touch targets minimum 44x44px
- Color not used as sole indicator (icons + text always accompany color)
```

---

# PHẦN 2 — BỘ CÂU HỎI ĐẦY ĐỦ (15 câu)
## Trích từ Chương 3: Giá trị Thặng dư Siêu ngạch — Kinh tế Chính trị Mác-Lênin

> Định dạng mỗi câu: Câu hỏi | 4 đáp án | Đáp án đúng | Giải thích | Chủ đề | Độ khó

---

### NHÓM A — KHÁI NIỆM CƠ BẢN (Mục I)

---

**Câu 1**
**Câu hỏi:** Giá trị thặng dư siêu ngạch là gì theo Marx?

- A. Phần lợi nhuận doanh nghiệp thu được nhờ tăng giá bán vượt thị trường
- B. Phần giá trị thặng dư vượt trội khi giá trị cá biệt của hàng hóa thấp hơn giá trị xã hội trung bình ✅
- C. Tiền thưởng năng suất mà nhà tư bản trả cho công nhân làm việc giỏi
- D. Lợi nhuận độc quyền nhờ rào cản pháp lý bảo hộ

**Đáp án đúng:** B

**Giải thích:** Marx định nghĩa: GTTSN = phần dư thu được khi W_cb (giá trị cá biệt) < W_xh (giá trị xã hội). Doanh nghiệp bán theo giá thị trường nhưng sản xuất với chi phí thấp hơn trung bình xã hội nhờ công nghệ vượt trội.

**Chủ đề:** Khái niệm | **Độ khó:** Dễ

---

**Câu 2**
**Câu hỏi:** Công thức tính Giá trị Thặng dư Siêu ngạch là?

- A. GTTSN = Giá bán − Chi phí sản xuất
- B. GTTSN = Tiền lương × Số giờ làm thêm
- C. GTTSN = (W_xh − W_cb) × Sản lượng ✅
- D. GTTSN = Lợi nhuận ÷ Vốn đầu tư ban đầu

**Đáp án đúng:** C

**Giải thích:** GTTSN = (Giá trị xã hội − Giá trị cá biệt) × Sản lượng. Điều kiện tiên quyết: W_cb < W_xh — đạt được nhờ áp dụng công nghệ tiên tiến hơn mức trung bình xã hội.

**Chủ đề:** Công thức | **Độ khó:** Dễ

---

**Câu 3**
**Câu hỏi:** Giá trị thặng dư tuyệt đối khác giá trị thặng dư siêu ngạch ở điểm nào?

- A. Giá trị thặng dư tuyệt đối thu được bằng cách kéo dài ngày lao động; siêu ngạch thu được nhờ hạ giá trị cá biệt xuống thấp hơn giá trị xã hội ✅
- B. Giá trị thặng dư tuyệt đối chỉ xuất hiện trong kỷ nguyên 4.0
- C. Siêu ngạch là hình thức bóc lột nặng nề hơn tuyệt đối
- D. Cả hai đều được tạo ra bằng cách nâng cao năng suất lao động

**Đáp án đúng:** A

**Giải thích:** Tuyệt đối = kéo dài/tăng cường độ lao động, giữ nguyên giá trị sức lao động. Siêu ngạch = hạ W_cb dưới W_xh nhờ công nghệ — bản chất là hình thức của giá trị thặng dư tương đối ở cấp độ doanh nghiệp cá biệt.

**Chủ đề:** So sánh | **Độ khó:** Trung bình

---

**Câu 4**
**Câu hỏi:** Theo Marx, về bản chất, giá trị thặng dư siêu ngạch là hình thức của loại giá trị thặng dư nào?

- A. Giá trị thặng dư tuyệt đối
- B. Giá trị thặng dư tương đối ✅
- C. Giá trị thặng dư độc quyền
- D. Giá trị thặng dư bình quân

**Đáp án đúng:** B

**Giải thích:** Marx khẳng định trong "Tư bản, Quyển I": "Xét về mặt bản chất, giá trị thặng dư siêu ngạch cũng là giá trị thặng dư tương đối, vì nó cũng gắn với việc tăng năng suất lao động."

**Chủ đề:** Bản chất | **Độ khó:** Trung bình

---

**Câu 5**
**Câu hỏi:** Ba kênh chính mà công nghệ tạo ra giá trị thặng dư siêu ngạch là gì?

- A. Tăng lương, giảm thuế, mở rộng thị trường
- B. Giảm chi phí cá biệt, nâng cao chất lượng tạo khác biệt, tạo ra thị trường mới hoàn toàn ✅
- C. Robot hóa, thuê ngoài, sáp nhập doanh nghiệp
- D. Xuất khẩu, độc quyền, lobby chính sách

**Đáp án đúng:** B

**Giải thích:** Tài liệu nêu 3 kênh: (1) Giảm chi phí sản xuất cá biệt; (2) Nâng cao chất lượng & tạo pricing power; (3) Đổi mới triệt để tạo thị trường mới — nơi người tiên phong hưởng toàn bộ GTTSN trong giai đoạn độc quyền tạm thời.

**Chủ đề:** Cơ chế | **Độ khó:** Khó

---

### NHÓM B — CASE STUDY DOANH NGHIỆP (Mục II)

---

**Câu 6**
**Câu hỏi:** VinFast tạo ra giá trị thặng dư siêu ngạch thông qua cơ chế nào?

- A. Bán xe với giá cao hơn các đối thủ trong khu vực
- B. Dùng hơn 1.400 robot tự động hóa, hạ giá trị cá biệt xuống dưới mức trung bình ngành ô tô Đông Nam Á ✅
- C. Nhập khẩu linh kiện rẻ từ Trung Quốc để giảm chi phí
- D. Nhận trợ cấp chính phủ thay thế cho đổi mới công nghệ

**Đáp án đúng:** B

**Giải thích:** VinFast đầu tư 3,5 tỷ USD, triển khai 1.400+ robot, tự phát triển pin LFP — hạ W_cb (giá trị cá biệt) xuống thấp hơn W_xh (trung bình ngành ĐNÁ). Đây là GTTSN điển hình qua tự động hóa.

**Chủ đề:** VinFast | **Độ khó:** Dễ

---

**Câu 7**
**Câu hỏi:** Mô hình Battery-as-a-Service của VinFast thể hiện điều gì theo lý luận Mác-Lênin?

- A. Chiến lược phá giá để loại bỏ đối thủ cạnh tranh
- B. Đổi mới mô hình kinh doanh tối đa hóa GTTSN qua doanh thu dịch vụ định kỳ ✅
- C. Vi phạm quy luật giá trị thặng dư vì bán thấp hơn giá trị thực
- D. Hình thức cho thuê tài chính thông thường không liên quan đến GTTSN

**Đáp án đúng:** B

**Giải thích:** BaaS tách pin khỏi xe → hạ giá xe → tăng doanh số → tạo dòng doanh thu dịch vụ liên tục. Đây là đổi mới toàn diện (cả sản phẩm lẫn mô hình kinh doanh) để tối đa hóa GTTSN.

**Chủ đề:** VinFast | **Độ khó:** Khó

---

**Câu 8**
**Câu hỏi:** FPT Software thu được GTTSN từ thị trường quốc tế nhờ cơ chế nào?

- A. Lách thuế quốc tế để giảm chi phí hoạt động
- B. Chênh lệch giữa chi phí lao động cá biệt (lương kỹ sư Việt Nam) và giá trị xã hội trung bình trên thị trường quốc tế ✅
- C. Bán phần mềm lậu với giá thấp hơn các công ty phương Tây
- D. Nhận đầu tư nước ngoài để bù đắp chi phí vận hành cao

**Đáp án đúng:** B

**Giải thích:** FPT cung cấp dịch vụ thấp hơn 30–50% so với công ty cùng chất lượng tại nước phát triển. Chênh lệch chi phí lao động (W_cb thấp) so với giá trị xã hội quốc tế (W_xh cao) = GTTSN. AI & DevOps càng khuếch đại thêm.

**Chủ đề:** FPT Software | **Độ khó:** Trung bình

---

**Câu 9**
**Câu hỏi:** MoMo tạo GTTSN trong "kinh tế nền tảng" nhờ đặc điểm gì?

- A. Độc quyền pháp lý trên thị trường ví điện tử Việt Nam
- B. Chi phí biên gần bằng 0 khi thêm người dùng mới, trong khi doanh thu tăng tuyến tính ✅
- C. Lợi nhuận từ cho vay nặng lãi qua ứng dụng di động
- D. Nhập khẩu công nghệ độc quyền từ nước ngoài và cho thuê lại

**Đáp án đúng:** B

**Giải thích:** Platform economy: thêm 1 người dùng = chi phí biên ≈ 0, nhưng phí giao dịch + quảng cáo + dữ liệu tăng tuyến tính theo 31 triệu user. Đây là GTTSN trong hình thái số hóa — lợi thế quy mô cực đoan.

**Chủ đề:** MoMo | **Độ khó:** Trung bình

---

**Câu 10**
**Câu hỏi:** Tesla tạo ra nguồn GTTSN "thuần túy từ tài sản trí tuệ" thông qua cơ chế nào?

- A. Bán xe với giá cao nhất phân khúc EV toàn cầu
- B. Bán tính năng phần mềm (Autopilot, FSD) qua OTA với chi phí biên gần bằng 0 ✅
- C. Sở hữu mỏ lithium độc quyền để giảm chi phí pin
- D. Nhận trợ cấp R&D lớn từ chính phủ Mỹ

**Đáp án đúng:** B

**Giải thích:** Software-Defined Vehicle: Tesla bán Autopilot/FSD hàng nghìn USD/xe, nhưng chi phí biên gần 0 (chỉ là cập nhật phần mềm qua OTA). Đây là GTTSN thuần túy từ tài sản trí tuệ — điển hình kỷ nguyên 4.0.

**Chủ đề:** Tesla | **Độ khó:** Trung bình

---

**Câu 11**
**Câu hỏi:** AWS (Amazon Web Services) chiếm khoảng bao nhiêu % lợi nhuận hoạt động của Amazon năm 2023, minh chứng cho GTTSN trong dịch vụ số?

- A. ~20%
- B. ~40%
- C. ~62% ✅
- D. ~85%

**Đáp án đúng:** C

**Giải thích:** AWS chiếm ~62% lợi nhuận hoạt động của Amazon năm 2023. Sau đầu tư cố định khổng lồ xây hạ tầng đám mây, chi phí biên phục vụ mỗi khách hàng thêm cực thấp — đây là GTTSN cực đoan trong dịch vụ số.

**Chủ đề:** Amazon | **Độ khó:** Dễ (ghi nhớ số liệu)

---

**Câu 12**
**Câu hỏi:** Samsung duy trì GTTSN trong ngành chip bán dẫn bằng chiến lược nào?

- A. Hạ giá chip xuống thấp hơn tất cả đối thủ để chiếm thị phần
- B. Đầu tư R&D chiếm 8–10% doanh thu/năm (~20 tỷ USD), đi trước đối thủ về quy trình 3nm và HBM3 ✅
- C. Mua lại các công ty chip nhỏ để loại bỏ cạnh tranh
- D. Thuê kỹ sư từ TSMC và Intel để sao chép công nghệ

**Đáp án đúng:** B

**Giải thích:** Samsung đầu tư R&D ~20 tỷ USD/năm, tạo rào cản công nghệ khổng lồ. Chip 3nm & HBM3 → W_cb thấp hơn đối thủ, bán cùng giá hoặc cao hơn → GTTSN bền vững từ R&D dài hạn.

**Chủ đề:** Samsung | **Độ khó:** Trung bình

---

### NHÓM C — Ý NGHĨA VÀ MÂU THUẪN (Mục III)

---

**Câu 13**
**Câu hỏi:** "Quy luật bình quân hóa GTTSN" có nghĩa là gì?

- A. Nhà nước phân phối lại GTTSN cho tất cả doanh nghiệp bằng nhau
- B. Khi công nghệ tiên phong lan rộng, W_xh hạ xuống → GTTSN của người tiên phong bị triệt tiêu → buộc phải đổi mới tiếp ✅
- C. Các doanh nghiệp thỏa thuận chia sẻ bằng sáng chế để cùng hưởng GTTSN
- D. Lợi nhuận siêu ngạch được tính bình quân vào thuế thu nhập doanh nghiệp

**Đáp án đúng:** B

**Giải thích:** Khi CN lan rộng: W_cb của toàn ngành giảm → W_xh trung bình hạ xuống → GTTSN của người tiên phong bị triệt tiêu. Đây chính là động cơ của đổi mới liên tục — vòng lặp bất tận thúc đẩy tiến bộ kỹ thuật.

**Chủ đề:** Quy luật | **Độ khó:** Khó

---

**Câu 14**
**Câu hỏi:** Theo báo cáo WEF (2023), tự động hóa (một công cụ tạo GTTSN) có thể tạo ra bao nhiêu việc làm mới toàn cầu đến năm 2025?

- A. 25 triệu việc làm mới
- B. 60 triệu việc làm mới
- C. 97 triệu việc làm mới ✅
- D. 150 triệu việc làm mới

**Đáp án đúng:** C

**Giải thích:** WEF (2023): tự động hóa thay thế 85 triệu việc làm nhưng tạo ra 97 triệu việc làm mới — yêu cầu kỹ năng cao hơn. Đây là mâu thuẫn nội tại: GTTSN thúc đẩy tiến bộ nhưng cũng gây phân hóa lao động.

**Chủ đề:** Số liệu / Mâu thuẫn | **Độ khó:** Dễ (ghi nhớ)

---

**Câu 15**
**Câu hỏi:** Theo Chiến lược KTXH 2021–2030 (Đại hội XIII), con đường nào giúp Việt Nam thoát "bẫy thu nhập trung bình" gắn với lý luận GTTSN?

- A. Thu hút tối đa FDI không phân biệt ngành nghề
- B. Làm chủ công nghệ cốt lõi để tạo ra GTTSN ở quy mô quốc gia ✅
- C. Tập trung xuất khẩu lao động phổ thông để tích lũy ngoại tệ
- D. Bảo hộ thị trường nội địa tuyệt đối, hạn chế cạnh tranh quốc tế

**Đáp án đúng:** B

**Giải thích:** Chiến lược XIII: "Quốc gia nào làm chủ công nghệ cốt lõi sẽ nắm giữ khả năng tạo ra GTTSN ở quy mô quốc gia." 5 khuyến nghị: đầu tư R&D+STEM, hệ sinh thái khởi nghiệp, luật SHTT, hạ tầng số, FDI công nghệ cao có chọn lọc.

**Chủ đề:** Chính sách Việt Nam | **Độ khó:** Trung bình

---

# PHẦN 3 — BẢNG PHÂN PHỐI CÂU HỎI THEO VAI MA SÓI

| Vai | Câu hỏi phân công | Mức độ |
|-----|-------------------|--------|
| Sói Trình Độc (Wolf 1) | Câu 1, 4 | Dễ → Trung bình |
| Sói Giả Mạo (Wolf 2) | Câu 6, 10 | Dễ → Trung bình |
| Thám Tử (Detective) | Câu 3, 13 | Trung bình → Khó |
| Thầy Thuốc (Doctor) | Câu 5, 8 | Khó → Trung bình |
| Phù Thủy (Witch) | Câu 7, 14 | Khó → Dễ |
| Dân Làng 1 | Câu 2, 9 | Dễ → Trung bình |
| Dân Làng 2 | Câu 11, 15 | Dễ → Trung bình |
| Dân Làng 3 | Câu 12 | Trung bình |

---

# PHẦN 4 — LUẬT CHƠI ĐẦY ĐỦ (để in ra cho người chơi)

## Cơ chế tích hợp câu hỏi + Ma Sói

### Giai đoạn ĐÊM
1. Sói chọn mục tiêu tấn công (bí mật, chỉ host biết)
2. Host ghi nhớ ai bị tấn công, chưa thông báo
3. Thầy Thuốc chọn bảo vệ 1 người
4. Thám Tử điều tra 1 người (host trả lời bí mật: Sói / Không phải Sói)

### Giai đoạn NGÀY — Câu hỏi
1. Host công bố: "[Tên] bị Sói tấn công đêm qua!"
2. Câu hỏi kinh tế chính trị hiện lên màn hình (30 giây)
3. Người bị tấn công hoặc đại diện cả nhóm trả lời:
   - **Đúng** → nạn nhân được bảo vệ, không ai chết đêm đó (**+10 điểm**)
   - **Sai** → nạn nhân bị loại khỏi làng, lật thẻ lộ vai trò (**−5 điểm nếu là Dân làng bị oan**)
4. Host đọc giải thích đáp án (learning moment)

### Giai đoạn BỎ PHIẾU
1. Cả nhóm thảo luận 2 phút: ai là Sói?
2. Bỏ phiếu: mỗi người chỉ ra 1 nghi phạm
3. Người nhiều phiếu nhất bị loại → lật thẻ
   - Đúng Sói: **+20 điểm** cho đội Dân làng
   - Oan Dân làng: **−10 điểm**, Sói tiếp tục ẩn náu

### Điều kiện thắng/thua
- **Dân làng thắng:** Loại hết tất cả Sói
- **Sói thắng:** Số Sói còn lại = số Dân làng còn lại (hoặc nhiều hơn)

### Bảng điểm
| Hành động | Điểm |
|-----------|------|
| Trả lời câu hỏi đúng | +10 |
| Loại đúng Sói qua bỏ phiếu | +20 |
| Trả lời sai → mất người | −5 |
| Bỏ phiếu loại oan Dân làng | −10 |
| Hoàn thành 5 vòng còn sống | +30 |

---

*Tài liệu này được tạo từ nội dung Chương 3: Công nghệ và Giá trị Thặng dư Siêu ngạch trong Kỷ nguyên 4.0 — Kinh tế Chính trị Mác-Lênin*