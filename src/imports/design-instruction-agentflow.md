# Design Instruction — MaivenPoint AgentFlow Dashboard
**Dành cho AI Designer · Phiên bản redesign v1**

---

## 1. Bối cảnh & Nhiệm vụ

Đây là web MVP demo hệ thống Multi-Agent Workflow Automation của **MaivenPoint** — một tổ chức giáo dục công nghệ. Sản phẩm mô phỏng ba "Nhân viên số" (Digital Workers) giao tiếp với nhau qua cơ chế A2A (Agent-to-Agent) để tự động hóa quy trình tuyển sinh workshop: từ quét lịch học của trường, phân loại CV ứng viên, đến điều phối phỏng vấn và ký hợp đồng điện tử.

**Yêu cầu cốt lõi của thiết kế mới:**

- Giữ nguyên hoàn toàn cấu trúc layout (sidebar trái + main content), toàn bộ nội dung text, dữ liệu, và 5 section điều hướng hiện tại (Tổng quan, Đối ngoại & Thu hút, Sàng lọc & Tư vấn, Phỏng vấn & Onboarding, Kho dữ liệu RAG).
- Giữ nguyên toàn bộ logic JavaScript và tương tác (toast, switch section, các nút bấm).
- Chỉ thay đổi visual identity: màu sắc, typography, hình dạng, bề mặt, các yếu tố trang trí, và motion.
- Kết quả cuối cùng phải có visual identity đủ mạnh để nhìn vào là nhận ra ngay — không thể nhầm với bất kỳ SaaS dashboard nào khác.

---

## 2. Chẩn đoán bản thiết kế hiện tại

Bản hiện tại dùng nền xanh nhạt `#f4f7fb`, font Inter trắng trải đều, sidebar trắng mờ blur, gradient blue-cyan-orange dạng blob — đây là bộ lựa chọn "an toàn mặc định" của hàng trăm enterprise SaaS. Không có điểm nhận diện riêng. Orbit diagram của hero section là static và không truyền được cảm giác các agent thực sự đang giao tiếp với nhau. Các card trắng đều nhau không phân biệt được thứ bậc thông tin.

---

## 3. Concept Thiết Kế: "Phòng Điều Phối Số"

**Metaphor chủ đạo:** Đây không phải admin panel của một phần mềm quản lý — đây là **màn hình Command Room** nơi các Digital Workers đang vận hành thời gian thực. Giống như một trung tâm điều phối tác chiến hoặc phòng kiểm soát không lưu, nhưng cho giáo dục công nghệ. Nền tối sâu. Tín hiệu điện sáng. Mọi con số và trạng thái đều cảm giác đang "sống".

**Tên concept:** `NERVE CENTER` — Trung khu thần kinh số.

Lý do chọn hướng này: Concept phải xuất phát từ bản chất sản phẩm. Sản phẩm này không phải công cụ để người dùng nhập liệu — nó là hệ thống tự động chạy ngầm và người dùng là người **quan sát, duyệt và can thiệp khi cần**. Trải nghiệm đó gần với "watching a live operation" hơn là "filling a form". Dark mode với tín hiệu sáng thể hiện chính xác cảm giác đó.

---

## 4. Hệ Thống Token

### 4.1 Màu Sắc

Xây dựng từ đầu — không tái sử dụng palette hiện tại.

**Nền & Bề mặt (từ sâu nhất đến cao nhất):**
- `--bg-void: #050A12` — Nền sâu nhất, body background. Không hoàn toàn đen mà có gợi ý màu midnight navy.
- `--bg-surface: #0B1220` — Nền card, sidebar background. Tách biệt rõ ràng với void.
- `--bg-raised: #111C2F` — Card được raise lên (hover state, card trong sidebar).
- `--bg-glass: rgba(15, 25, 46, 0.72)` — Glassmorphism cho hero panel và overlay.
- `--border-default: rgba(0, 180, 220, 0.12)` — Border mặc định, tất cả cards và panels dùng màu này, không dùng grey.
- `--border-active: rgba(0, 208, 255, 0.35)` — Border khi element được active hoặc highlight.

**Màu nhận diện (Signal Colors):**
- `--signal-cyan: #00D0FF` — Màu primary chủ đạo. Dùng cho: active nav item, link, badge primary, accent. Đây là "màu của dữ liệu đang chảy".
- `--signal-orange: #FF6B2B` — Màu action chính (CTA button, warning badge, "Duyệt"). Đây là "màu của quyết định con người".
- `--signal-green: #0DEB72` — Trạng thái done/success. Đây là "màu của workflow hoàn thành".
- `--signal-amber: #F59E0B` — Warning cấp thấp, "đang chờ".
- `--signal-violet: #8B5CF6` — Màu phụ cho RAG / AI layer, phân biệt với các signal khác.

**Typography Colors:**
- `--text-primary: #E8F0FF` — Text chính, gần trắng nhưng có màu cool.
- `--text-secondary: rgba(180, 200, 240, 0.65)` — Subtext, description, placeholder.
- `--text-muted: rgba(140, 165, 210, 0.45)` — Metadata, timestamp, caption.
- `--text-data: #00D0FF` — Số liệu quan trọng (stat numbers, score).

### 4.2 Typography

Thay toàn bộ Inter bằng bộ đôi sau:

**Display / Heading:** `Space Grotesk` (Google Fonts) — geometric nhưng có cá tính, các chữ cái có nét cut bất đối xứng nhẹ tạo cảm giác kỹ thuật số mà không lạnh lẽo. Dùng cho tất cả h1–h4, brand name, section title.

**Body / UI text:** `Inter` — giữ nguyên vì đọc tốt cho tiếng Việt ở size nhỏ.

**Data / Mono:** `JetBrains Mono` (Google Fonts) — dùng riêng cho: stat numbers lớn, điểm fit score, timestamp, code-like labels (status tags). Đây là font của máy móc đang báo cáo.

**Type Scale:**
- Brand logotype trong sidebar: Space Grotesk 20px, weight 700, letter-spacing -0.04em.
- Hero headline (h3): Space Grotesk 44–48px trên desktop, weight 700, letter-spacing -0.06em.
- Section title (h3 in section-head): Space Grotesk 26px, weight 600, letter-spacing -0.04em.
- Agent name (h4 in agent-card): Space Grotesk 17px, weight 600.
- Stat number (strong in .stat): JetBrains Mono 34px, weight 700, letter-spacing -0.03em.
- Score badge trong bảng trường: JetBrains Mono 15px.
- Nav button text: Inter 14px, weight 600.
- Body / desc: Inter 14px, line-height 1.6.
- Caption / muted text: Inter 12px.
- Eyebrow label: Space Grotesk 11px, weight 800, letter-spacing 0.12em, uppercase.

### 4.3 Hình Học & Radius

Triết lý: **Angular hơn, có chủ ý hơn**. Bản hiện tại dùng border-radius 26px cho mọi thứ tạo cảm giác mềm và generic. Bản mới phân biệt rõ vai trò của từng shape.

- Radius lớn (containers, hero panel, side-card): 20px — giảm xuống để trông structural hơn.
- Radius trung bình (cards, table wrapper): 14px.
- Radius nhỏ (chips, tags, step-num): 8px.
- Radius pill (badges, status, buttons): 999px — giữ nguyên nhưng dùng có chọn lọc hơn.
- Đặc biệt: Sidebar có border-right với độ dày 1px màu `--border-default`, không blur/glass. Sidebar phải cảm giác structural và solid.

### 4.4 Shadow & Depth

Loại bỏ tất cả box-shadow màu trắng/xám. Shadow trong dark mode phải dùng màu của light source (tức là signal colors), không phải màu đen.

- Shadow card mặc định: `0 0 0 1px var(--border-default), 0 8px 32px rgba(0, 0, 0, 0.4)` — viền mỏng + shadow tối.
- Shadow card active/featured: `0 0 0 1px var(--border-active), 0 16px 48px rgba(0, 208, 255, 0.08)` — glow cyan nhẹ.
- Shadow button primary (orange): `0 8px 24px rgba(255, 107, 43, 0.35)` — ambient glow màu cam.
- Shadow brand-mark logo: `0 0 32px rgba(0, 208, 255, 0.4)` — cyan glow.
- Không dùng `box-shadow` kiểu `0 24px 70px rgba(15, 23, 42, .10)` — quá nhạt để thấy trên dark background.

---

## 5. Layout & Cấu Trúc

### 5.1 Sidebar

**Giữ nguyên**: chiều rộng 284px, sticky, flex column.

**Thay đổi bề mặt:**
- Background: `var(--bg-surface)` — solid, không blur, không transparency.
- Border right: `1px solid rgba(0, 180, 220, 0.15)`.
- Thêm một vertical accent line cực mỏng (2px) bên trong cạnh border phải, màu `var(--signal-cyan)`, opacity 0.6, chạy từ top xuống khoảng 200px rồi fade to transparent. Đây là chi tiết nhỏ nhưng tạo cảm giác "đường truyền tín hiệu".

**Brand mark (logo "M"):**
- Shape: Không còn là hình vuông bo góc bình thường. Dùng `clip-path: polygon(0 0, 85% 0, 100% 15%, 100% 100%, 0 100%)` — cắt góc trên phải một chút, tạo hình dạng angular riêng biệt.
- Background: Gradient từ `#0090C8` đến `#00D0FF` (cyan range thuần túy, bỏ cam khỏi logo).
- Thêm glow: `filter: drop-shadow(0 0 12px rgba(0, 208, 255, 0.5))`.

**Navigation:**
- Nav item mặc định: background transparent, text `var(--text-secondary)`.
- Nav item hover: background `rgba(0, 208, 255, 0.07)`, text `var(--text-primary)`.
- Nav item active: **Không dùng gradient button**. Thay vào đó: background `rgba(0, 208, 255, 0.10)`, text `var(--signal-cyan)`, border-left `3px solid var(--signal-cyan)` (hoặc `2px`), padding-left giảm 3px để bù. Icon trong nav item active đổi màu thành cyan.
- Mỗi nav icon: thay emoji bằng ký hiệu đơn giản hơn hoặc giữ nhưng đặt trong một ô vuông với background `rgba(0, 208, 255, 0.08)` và border `1px solid var(--border-default)`.

**Side-card (Tuần tuyển sinh):**
- Background: Gradient từ `rgba(0, 90, 130, 0.6)` đến `rgba(0, 180, 220, 0.15)`, border `1px solid var(--border-active)`.
- Thêm một horizontal scan line animation chạy từ trên xuống dưới, lặp lại mỗi 4 giây — đây là chi tiết signature duy nhất trong sidebar.
- Button "Duyệt đề xuất": background `var(--signal-orange)`, text trắng, border-radius 8px (không dùng pill), font-weight 700.

### 5.2 Body Background

Thay nền hiện tại (gradient blobby xanh cam trên trắng).

Dùng nền `var(--bg-void)` thuần túy với hai yếu tố overlay:

**Overlay 1 — Grid pattern:** Background-image dạng grid nhỏ với line-width 1px, màu `rgba(0, 180, 220, 0.04)`, kích thước ô 28x28px. Không fade theo mask như hiện tại — để full nhưng với opacity rất thấp để không compete với content.

**Overlay 2 — Corner glow:** Một radial gradient ở góc trên trái `rgba(0, 150, 200, 0.08)` — nhỏ và tinh tế, bán kính khoảng 400px. Không đặt ở nhiều góc như hiện tại (quá bận).

### 5.3 Topbar

Giữ cấu trúc flex (title trái, actions phải).

Thay đổi: Eyebrow label "Frontend mockup · không backend" đổi màu thành `var(--signal-cyan)` + thêm một chấm nhấp nháy trước text ("● ") bằng animation pulse, `animation: pulse 2s ease-in-out infinite`. Đây là detail nhỏ truyền đạt "hệ thống đang sống".

**Pill badge "Demo data đang chạy":** Border `var(--border-active)`, background `rgba(0, 208, 255, 0.06)`, text màu `var(--signal-cyan)`, chấm "●" trước text nhấp nháy màu `var(--signal-green)`.

---

## 6. Hero Section

Đây là phần cần thay đổi nhiều nhất và là **Signature Element** của toàn bộ thiết kế.

### 6.1 Layout Hero

Giữ grid 2 cột (copy trái + panel phải) nhưng đổi tỉ lệ thành `1fr 1.05fr` để panel phải rộng hơn nhẹ.

Background của hero container: Không còn là card trắng nữa. Thay bằng `transparent` — để background body hiện ra xuyên qua, chỉ giữ border `1px solid var(--border-default)` và một subtle inner padding. Hero section là phần "nổi lên" từ background, không phải một card riêng biệt.

### 6.2 Hero Copy (Bên Trái)

Badges: Đổi từ pill shape hiện tại thành **rectangular badge với góc cut** — dùng `clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)` tạo kiểu sci-fi nhẹ. Badge primary màu `rgba(0, 208, 255, 0.12)` với border `1px solid rgba(0, 208, 255, 0.3)` và text màu `var(--signal-cyan)`.

Headline h3: `Space Grotesk` 44px. Đoạn `<span>tất cả nằm trong một màn hình.</span>` — thay vì màu blue đơn thuần, dùng gradient text: `-webkit-background-clip: text` với gradient từ `var(--signal-cyan)` đến `#5EC8F0`. Effect gradient text trên dark background sẽ nổi bật hơn nhiều so với flat color.

Search bar: Background `var(--bg-raised)`, border `1px solid var(--border-default)`. Khi focus vào input: border đổi thành `var(--border-active)` + box-shadow `0 0 0 3px rgba(0, 208, 255, 0.1)`. Button tìm kiếm trong searchbar: background `var(--signal-cyan)`, text `var(--bg-void)` (text tối trên nền sáng — đảo ngược so với phần còn lại), border-radius 8px.

### 6.3 Hero Panel — Agent Network (Bên Phải) — Signature Element

Đây là **Signature Element** của toàn bộ thiết kế. Phần này phải được thực hiện đúng để tạo ra ấn tượng riêng biệt.

**Container panel:** Background `var(--bg-surface)`, border `1px solid var(--border-active)`, border-radius 20px, không dùng gradient dark blue như hiện tại. Thêm một thin top border với màu `var(--signal-cyan)` opacity 0.8 ở top edge (height 2px) như một "header bar" kỹ thuật số.

**Bốn Agent Nodes (n1 đến n4):**
Đổi hoàn toàn visual của các node. Mỗi node không còn là card glass đơn thuần mà là một **"Process Terminal"**:
- Background: `var(--bg-raised)`.
- Border: `1px solid var(--border-default)`.
- Thêm một small status indicator — một chấm tròn góc trên phải, màu `var(--signal-green)` với `animation: statusPulse 2s ease-in-out infinite` — nhấp nháy như LED status đang hoạt động.
- Tên node: `Space Grotesk` weight 600.
- Mô tả nhỏ: Inter 11px, màu `var(--text-secondary)`.
- Node "e-Sign" (n4): Dùng màu border `rgba(255, 107, 43, 0.35)` thay vì default — phân biệt node final action này với các process nodes khác.

**Connector Lines — Animated Signal Flow (QUAN TRỌNG NHẤT):**
Đây là phần tạo nên điểm khác biệt. Không dùng static `<div class="connector">` với gradient đơn giản như hiện tại.

Thay bằng SVG absolute positioned bên trong `.orbit` (hoặc hero-panel), vẽ ba đường path (path element) nối giữa các node. Mỗi path có:
- Stroke màu `rgba(0, 208, 255, 0.2)` — đường nền mờ luôn hiển thị.
- Overlay thứ hai: một `<circle>` (hoặc dùng `stroke-dasharray` + `stroke-dashoffset` animation) màu `var(--signal-cyan)`, chạy dọc theo path, tạo hiệu ứng "tín hiệu đang chạy từ node này sang node kia".
- Mỗi đường connector có animation duration khác nhau (2.2s, 3.1s, 1.8s) và animation-delay khác nhau để tạo cảm giác async — giống A2A communication thực sự.
- Không dùng `rotate` và `width` trick như hiện tại — dùng SVG `<path d="...">` với Bezier curves để đường nối cong tự nhiên.

**Label phía trên panel:** "Workflow đang chạy" — đổi thành `JetBrains Mono` 13px, thêm prefix `> ` màu `var(--signal-green)` như terminal prompt. Tiếp theo là một animated typing cursor `|` nhấp nháy sau text.

---

## 7. Stat Cards (Overview Section)

Bốn card thống kê hiện tại đều trông giống nhau. Trong bản mới:

- Background: `var(--bg-surface)`.
- Border: `1px solid var(--border-default)`.
- Số lớn (strong): Font `JetBrains Mono`, màu `var(--text-data)` (cyan), size 36px.
- Label: Inter 12px, `var(--text-secondary)`, UPPERCASE, letter-spacing 0.08em.
- Trend badge: Thay pill bo tròn bằng label rectangular nhỏ với clip-path cut góc (cùng style với hero badge). `+3 mới` dùng màu amber, `+24%` dùng cyan, `tuần này` dùng violet.
- Decorative element trong card: Thay vì circle `::after` hiện tại, mỗi card có một thin horizontal line ở dưới cùng (như progress bar) với màu khác nhau cho mỗi card theo ý nghĩa nội dung — không phải decoration mà là "visual mã hóa ý nghĩa".

---

## 8. Agent Cards

Ba card agent là phần cần sự chú ý đặc biệt.

**Header bar (::before):** Hiện tại là gradient đồng nhất `blue-cyan-orange` cho cả 3. Đổi thành: mỗi agent có màu accent riêng biệt và rõ ràng hơn.
- Outreach Agent (card 1): Gradient `#0060A0` đến `#00D0FF` — màu xanh dương lạnh, thể hiện "đối ngoại, kết nối mạng lưới".
- Screening & Concierge Agent (card 2): Gradient `#5B21B6` đến `#8B5CF6` — màu violet, thể hiện "AI tư vấn, RAG, nhận thức".
- Interview & Onboarding Agent (card 3): Gradient `#065F46` đến `#0DEB72` — màu xanh lá, thể hiện "hoàn thành, kết quả, onboard".

**Agent icon:** Thay emoji đơn thuần. Tạo icon container hình vuông có border matching màu accent của card đó, background semi-transparent cùng màu accent. Giữ emoji hoặc thay bằng ký hiệu ASCII phù hợp nhưng render với font-size và màu rõ hơn.

**Chip tags:** Background `rgba(0, 208, 255, 0.06)`, border `1px solid rgba(0, 208, 255, 0.18)`, text `var(--text-secondary)`, border-radius 6px (không pill). Font Inter 11px, weight 600, uppercase.

**Mini metrics (3 số nhỏ dưới mỗi card):** Font `JetBrains Mono` cho số, align center, background `var(--bg-void)` (tối nhất), border `1px solid var(--border-default)`. Tạo cảm giác đây là "data readout" thực sự.

**Status badge:** Bỏ pill background xanh lá/cam/xanh lam. Thay bằng label chỉ có text và một chấm trước (`● Đang đề xuất`), màu sắc phù hợp trạng thái, không có background — tối giản hơn.

---

## 9. Workflow Steps

Các `.flow-step` hiện tại trông giống checklist. Trong bản mới, tạo visual **Pipeline**:

- Background: `var(--bg-surface)`.
- Border: `1px solid var(--border-default)`.
- Step number circle: Đổi thành hexagonal shape bằng `clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)` — hình lục giác nhỏ. Màu theo trạng thái: `done` = `var(--signal-green)`, `active` = `var(--signal-orange)`, `wait` = `var(--bg-raised)` với text mờ.
- Step `done`: Toàn bộ row có left border `3px solid var(--signal-green)`.
- Step `active`: Left border `3px solid var(--signal-orange)`, background `rgba(255, 107, 43, 0.04)`.
- Step `wait`: Left border `3px solid var(--border-default)`, opacity giảm nhẹ.
- Time label: `JetBrains Mono` 11px, màu `var(--text-muted)`.

---

## 10. Table (Outreach Section)

**Header row:** Background `var(--bg-void)`, text `Space Grotesk` 10px uppercase letter-spacing 0.1em, màu `var(--text-muted)`.

**Data rows:** Background transparent (odd) và `rgba(0, 208, 255, 0.02)` (even) — zebra striping cực nhẹ.

**Table wrapper:** Border `1px solid var(--border-default)`, background `var(--bg-surface)`.

**Score column:** Dùng `JetBrains Mono`, màu `var(--signal-cyan)`, thêm visual progress bar mini (height 3px) bên dưới số, fill theo tỷ lệ điểm/100 với màu gradient từ cyan đến green.

**Tag/badge status:** Giữ màu sắc phân biệt theo trạng thái nhưng dùng style mới: rectangular với clip-path cut góc nhỏ, font `JetBrains Mono` 11px.

**Button "Soạn mail":** Thay `.btn-ghost` thành style `text + underline` — không có border, không background, chỉ là text màu `var(--signal-cyan)` underline khi hover. Bớt visual weight trong table row.

**Avatar trong cột trường:** Giữ hình vuông bo góc nhưng background gradient theo màu accent đơn giản cyan/violet, font mono.

---

## 11. Kanban Board (Screening Section)

**Lane container:** Background `var(--bg-surface)`, border `1px solid var(--border-default)`.

**Lane header:** Font `Space Grotesk` 13px weight 600. Count badge: background `var(--bg-void)`, border `var(--border-default)`, text `var(--signal-cyan)`, font `JetBrains Mono`.

**Candidate card:** Background `var(--bg-raised)`, border `1px solid var(--border-default)`.
- Candidate name: `Space Grotesk` 14px weight 600.
- Description text: Inter 11px `var(--text-secondary)`.
- Footer tag (điểm số hoặc trạng thái): `JetBrains Mono` 11px. Cột "Ưu tiên cao" có score màu `var(--signal-green)`. Cột "Cần tư vấn" có tag "Cần gọi" màu `var(--signal-amber)` và "RAG" màu `var(--signal-violet)`.
- Hover state trên candidate card: border đổi thành `var(--border-active)`, translate-y `-2px`.

---

## 12. Timeline (Interview Section)

**Vertical line (::before):** Thay màu `#dbe7f8` bằng gradient từ `var(--signal-cyan)` opacity 0.4 xuống transparent — tạo cảm giác "tín hiệu đang chảy xuống" theo timeline.

**Timeline dot (event::before):** Thay vì chỉ circle đặc, dùng circle với `box-shadow: 0 0 0 3px var(--bg-void), 0 0 0 5px rgba(0, 208, 255, 0.4)` — tạo glow ring xung quanh dot.

**Event card:** Background `var(--bg-surface)`, border `1px solid var(--border-default)`. Title: `Space Grotesk`. Timestamp: `JetBrains Mono` màu `var(--signal-orange)`.

**Onboarding flow bên cạnh:** Áp dụng hexagonal step style từ section 9.

---

## 13. RAG Knowledge Base Section

Đây là section thể hiện "AI layer" của hệ thống — phải cảm giác khác biệt rõ ràng.

**Doc list (bên trái):** Mỗi doc item có icon thay bằng một ký tự `▤` trong container vuông với background `rgba(139, 92, 246, 0.12)` border `1px solid rgba(139, 92, 246, 0.25)` — màu violet riêng cho "tài liệu AI".

**RAG box (bên phải):** Đây là visual quan trọng. Không dùng dark blue gradient đặc như hiện tại. Thay bằng:
- Background: `var(--bg-surface)`.
- Border: `1px solid rgba(139, 92, 246, 0.4)` — violet để phân biệt với cyan của data flow.
- Header "Câu trả lời mẫu": Thêm prefix `[RAG] ` dùng `JetBrains Mono` màu violet.
- Blockquote text của câu trả lời mẫu: Đặt trong `<blockquote>` style với left border `3px solid var(--signal-violet)`, background `rgba(139, 92, 246, 0.06)`, padding, font style italic. Đây là visual phân biệt "đây là output từ AI, không phải UI label".
- Source card: Background `rgba(139, 92, 246, 0.08)`, border `1px solid rgba(139, 92, 246, 0.2)`.

---

## 14. Buttons

**Primary button (btn-primary):** Background `var(--signal-orange)`, text màu trắng `#FFFFFF` (không phải `#3b1c00` như hiện tại — đủ contrast và đọc tốt hơn trên dark), shadow `0 8px 24px rgba(255, 107, 43, 0.35)`, border-radius 8px (không pill), font `Space Grotesk` weight 700.

**Secondary button (btn-secondary):** Background transparent, border `1px solid var(--signal-cyan)`, text `var(--signal-cyan)`, hover: background `rgba(0, 208, 255, 0.1)`. Không dùng solid blue gradient.

**Ghost button (btn-ghost):** Background `var(--bg-raised)`, border `1px solid var(--border-default)`, text `var(--text-secondary)`, border-radius 8px. Hover: border `var(--border-active)`, text `var(--text-primary)`.

---

## 15. Toast Notification

Background: `var(--bg-raised)`, border `1px solid var(--border-active)`, thêm left accent bar `4px solid var(--signal-cyan)`. Text primary: `var(--text-primary)`. Text phụ: `var(--text-secondary)`. Shadow: `0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px var(--border-default)`.

---

## 16. Animations

Chỉ dùng animation có mục đích. Không thêm animation thuần trang trí.

**Bắt buộc thêm mới:**
- `@keyframes signalFlow`: Dùng cho connector lines trong hero panel — một "dot" chạy dọc theo path SVG, thể hiện A2A communication. Đây là animation cốt lõi của concept.
- `@keyframes statusPulse`: `opacity` từ 1 → 0.3 → 1 trong 2s ease-in-out infinite. Dùng cho status dot trong agent nodes và eyebrow indicator ở topbar.
- `@keyframes scanLine`: Một horizontal line mờ chạy từ top → bottom của `.side-card` trong sidebar, mỗi 4 giây. Thể hiện "scanning/monitoring".

**Giữ nguyên:** Transition trên button hover (translateY -1px), transition sidebar open/close trên mobile, toast show/hide.

**Giảm thiểu:** Không thêm scroll-triggered reveal, không thêm page-load sequence phức tạp — MVP demo phải load nhanh và không gây distraction.

**Respect reduced motion:** Thêm `@media (prefers-reduced-motion: reduce)` — tắt toàn bộ keyframe animations, giữ transitions với duration max 100ms.

---

## 17. Mobile Responsive

Giữ nguyên toàn bộ breakpoint logic hiện tại (`900px` và `1180px`). Chỉ cập nhật visual để khớp dark mode.

**Mobile bar sticky:** Background `var(--bg-surface)`, border-bottom `1px solid var(--border-default)`. Button hamburger: background `var(--signal-cyan)`, text `var(--bg-void)`.

**Sidebar khi open trên mobile:** Background `var(--bg-surface)`, border `1px solid var(--border-active)`, border-radius 20px.

---

## 18. Những Gì Tuyệt Đối Không Được Thay Đổi

- Tất cả text content: tên agent, mô tả, số liệu mock, tên trường, tên ứng viên.
- Cấu trúc HTML: thứ tự các section, các `id`, `data-section` attributes.
- Toàn bộ JavaScript: switchSection, toast, renderAgents, renderSchools, tất cả event listeners.
- Grid layout: sidebar + main, grid.cols-4, grid.cols-3, grid.cols-2, kanban 4 cột.
- Responsive breakpoints và behavior.
- Thứ tự điều hướng 5 sections.
- Tên thương hiệu "MaivenPoint" và "AgentFlow".

---

## 19. Thứ Tự Ưu Tiên Thực Hiện

Nếu thời gian có hạn, implement theo thứ tự sau (từ impact cao nhất):

1. Token system: màu nền, màu text, màu signal — ảnh hưởng toàn bộ visual ngay lập tức.
2. Typography: nạp Space Grotesk và JetBrains Mono, áp dụng cho headings và data numbers.
3. Hero panel: animated SVG connector lines giữa các agent nodes — đây là signature element.
4. Agent cards: header bar màu riêng, icon container, metric font mono.
5. Sidebar: brand mark clip-path, nav active state, scan line animation trong side-card.
6. Buttons: style mới cho primary/secondary/ghost.
7. Table, Kanban, Timeline: update theo hướng dẫn từng section.
8. RAG section: violet accent system.

---

## 20. Tóm Tắt Visual DNA

Nhìn vào bản thiết kế hoàn thành, người xem phải cảm nhận:

- **Tối nhưng không nặng nề** — dark mode có chiều sâu, không phải dark mode ảm đạm.
- **Sống động nhưng không loạn** — animation có mục đích, không phải decoration ngẫu hứng.
- **Kỹ thuật nhưng không lạnh lẽo** — Space Grotesk và các signal color có tính nhân văn.
- **Rõ ràng về thứ bậc** — cyan = data flow, orange = human decision, green = completed, violet = AI layer. Hệ màu phải encode ý nghĩa, không chỉ phân biệt visual.
- **Có một điều duy nhất người ta nhớ**: những đường tín hiệu đang chạy giữa các agent nodes — hình ảnh trực quan của giao tiếp A2A mà không cần một dòng giải thích.
