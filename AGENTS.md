<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->


# CLAUDE.md — armenu.az

Landing site for **AR Menu** — Azerbaijan's first AR restaurant menu (view dishes in 3D at real size on your table) + **AI Waiter** (voice/text assistant that recommends by budget, diet, mood). Built by MR Technology, Baku. Audience: restaurant owners (B2B). The site's single job: make a restaurant owner request a free demo.

Site language: **Azerbaijani**. All visible copy is Azerbaijani (provided below — use it verbatim unless told otherwise). No English UI text ever.

A design imported from Claude Design exists as the visual reference. Match its look 1:1, but do NOT copy its code structure — rebuild as production Next.js per the conventions below.

---

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4 (`@theme` tokens in `globals.css` — no color config elsewhere)
- GSAP 3 + ScrollTrigger via `@gsap/react` (`useGSAP` hook) — ALL scroll animation. No Framer Motion.
- Lenis smooth scroll (one `SmoothScroll` client component wrapping the page)
- React Three Fiber + drei later for real 3D dishes (GLB models exist; use illustrated SVG dish placeholders until then, structured as swappable blocks)

### Commands
- `npm run dev` — dev server
- `npm run build` — must pass with zero TS errors before any task is "done"

---

## Design direction — "Daylight Kitchen"

Light, warm, appetizing — morning light on a linen tablecloth. NOT cold white minimal SaaS, NOT dark. Rich with texture, oversized type, scroll-driven scenes.

### Color tokens (Tailwind v4 `@theme`)
```css
@theme {
  --color-ivory:     #FAF6EF;  /* page base — never pure #fff */
  --color-porcelain: #FFFDF8;  /* cards, raised surfaces */
  --color-sand:      #F1E8D8;  /* alternating section bands */
  --color-ink:       #221A12;  /* primary text */
  --color-clay:      #8A7A66;  /* muted text */
  --color-saffron:   #E8962E;  /* the ONLY accent — CTAs, highlights, AR brackets */
  --color-heat:      #C4501B;  /* strictly inside soft gradients/glows behind dishes, never solid UI */
}
```
Rules: one accent per viewport (saffron). Text is `ink` on ivory/sand, `clay` for secondary. Borders: `ink` at 8–12% opacity. Shadows: soft, warm-toned (`#C4501B` at very low alpha), never harsh gray/black.

### Typography (all three verified for Azerbaijani ə/Ə — do not substitute)
- **Display:** `Unbounded` — ONLY hero statements and section-opening lines. Weight 500–700. This font is loud; max ~6 words per use.
- **Headings/UI:** `Space Grotesk` — h2/h3, nav, buttons, labels. Weight 500–700.
- **Body:** `Inter` — paragraphs, captions. 400–500, line-height 1.6.
Load via `next/font/google` with `subsets: ['latin', 'latin-ext']` — latin-ext is REQUIRED for ə.

Type scale: Display `clamp(2.8rem, 8vw, 7.5rem)`; H2 `clamp(2rem, 4.5vw, 4rem)`; body 1–1.125rem; eyebrows 0.75rem, tracking 0.2em, uppercase, `saffron` or `clay`.

### Signature element — the AR viewfinder
Four corner brackets `⌜ ⌝ ⌞ ⌟` (SVG, saffron, 2px): frame the hero dish, mark section eyebrows as small marks, animate outward 8px on card/button hovers. The one recurring identity device — use consistently, don't invent competing motifs.

### Texture & imagery
- Subtle paper grain overlay: fixed full-screen div, tiled noise PNG, ~3% opacity, `pointer-events-none`, `mix-blend-multiply`.
- Dish visuals: beautiful stylized SVG/CSS illustrations (plates, steam, garnish) — warm, appetizing. NO stock photos. Real photos/3D come later; keep visuals as swappable components.
- Images/visuals melt into background with soft fades — never hard rectangle edges.

---

## Animation system

- Lenis `lerp: 0.1`, synced with ScrollTrigger (lenis scroll event → `ScrollTrigger.update`, gsap ticker pattern).
- All scroll animation in `useGSAP(() => {...}, { scope: containerRef })`, client components only.
- Scrub animations: `scrub: 1` (never `true`).
- Non-scrub reveals: `once: true`, start `"top 75%"`, y 40→0, opacity 0→1, duration 0.9, ease `power3.out`, stagger 0.08.
- Pinned sections: `pin: true, anticipatePin: 1`. Max 3 pinned on the page (Hero, Ingredient Reveal, How-it-works). Don't pin everything.
- `gsap.matchMedia()` everywhere: `prefers-reduced-motion` → simple fades, no pinning. Mobile (≤768px) → disable Hero and How-it-works pinning (vertical reveals instead), keep Ingredient Reveal but shorten to `+=150%`.
- Animate only `transform` and `opacity` (brief `filter: blur` allowed in hero exit). Never width/height/top/left.
- No exit-on-scroll-out animations; reveals are `once: true`.

---

## Page structure — build in this order, one section per task

### 0. NAV
Fixed, ivory with backdrop-blur, bottom border ink/10. Logo wordmark "armenu" (Space Grotesk 700, "ar" in saffron). Links: Məhsul, Necə işləyir, AI Ofisiant, Analitika. CTA pill: "Demo istə" (saffron bg, ivory text). Hides on scroll down, reveals on scroll up (GSAP).

### 1. HERO — pinned, scrubbed, `end: "+=120%"`
Full viewport. Center: large illustrated dish framed by animated AR brackets, soft saffron/heat radial glow behind. Display (Unbounded): **"Yemək artıq masanızdadır."** Sub (Inter, clay): **"Azərbaycanda ilk AR Menyu — qonaq yeməyi sifarişdən əvvəl 3D formada, real ölçüdə görür."** Badge: "Azərbaycanda ilk" (saffron pill). Scrub: headline scales 1→1.4 + blurs + fades, brackets expand, dish scales 0.95→1.1. Bottom-left: "MR Technology · Bakı".

### 2. INGREDIENT REVEAL — THE signature section, pinned, `end: "+=300%"`
Dish pinned center. As user scrolls, the dish "opens": illustrated ingredient elements (herbs, meat, vegetables, spices) float outward one by one, each connected by an elegant leader line to a label chip (ingredient name + small icon). Then: calorie counter counts up + diet tags (Vegan variantı / Halal / Allergen məlumatı). Copy beside: eyebrow "Animasiyalı tərkib", H2 **"Qonaq nə yediyini dəqiq görür."**, body "Hər yeməyin tərkibi animasiya ilə açılır — allergiyası, dietası olan qonaq üçün tam şəffaflıq." Final scroll beat reassembles the dish smoothly.

### 3. NECƏ İŞLƏYİR — horizontal scroll (pinned track, desktop only)
3 oversized cards (porcelain, rounded-3xl, border ink/10): **"QR skan"** — "Masadakı QR kodu skan edir." / **"3D + AR masada"** — "Yemək telefonda canlanır — real ölçüdə." / **"İnamlı sifariş"** — "Gözlənti = reallıq. Orta çek artır." Huge outlined step numbers (stroke text) parallax behind cards, slower than cards.

### 4. AR PREVIEW
Phone mockup pinned; on scroll, inside the phone a table scene appears and a dish "lands" on the table framed by AR brackets, chip: "Sac içi · 24 ₼ · 360° baxış". Copy: H2 **"Menyu telefonda canlanır."**, body "Heç bir tətbiq yüklənmir. Skan et, gör, sifariş ver."

### 5. AI OFİSİANT
Split. Left: H2 **"Heç vaxt yorulmayan ofisiant."** + three lines: "Canlı səsli söhbət — Azərbaycan dilində" / "Büdcəyə, dietaya, əhvala uyğun tövsiyə" / "Hər söhbətdə nəzakətli əlavə satış". Right: phone frame, chat types itself message-by-message on enter (staggered, NOT scrubbed):
- user: "120 manata 4 nəfərlik süfrə qur, biri vegandır."
- ai: "Təklifim: 2 × Sac içi, 1 × Vegan dolma, mövsüm salatı və qutab seti. Cəmi: 112 ₼. İçki əlavə edək?"
- user: "Bəli."
- ai: "Ev limonadı məsləhətdir. Yekun: 120 ₼. Nuş olsun!"
Subtle animated voice-waveform chip (CSS keyframes).

### 6. ANALİTİKA — sand band
Left: dashboard card (porcelain) with 4 bars (Sac içi, Qutab seti, Toyuq ləvəngi, Düşbərə) — widths animate in, values count up (gsap snap on textContent), tag "Nümunə göstəricilər". Right: H2 **"Menyunuz sizə hesabat verəcək."**, body "Hansı yeməyə baxılır, hansı ötürülür, qonaqlar hansı dildə oxuyur — qərarları hisslə yox, data ilə verin."

### 7. MANİFESTO — the only type-only section
Full-height, centered, Unbounded display, word-by-word scroll reveal (opacity 0.1→1, scrub): **"Bunu Azərbaycanda ilk dəfə biz etdik. Sıradakı restoran sizinki ola bilər."** — "ilk dəfə" in saffron.

### 8. CTA + FOOTER
H2 (Unbounded): **"Restoranını gələcəyə daşı."** Sub: "Demo pulsuzdur — öz menyunuzdan bir yemək 3D-də." Contact form: Ad, Restoran adı, Telefon + saffron button "15 dəqiqəlik demo istə" (AR brackets animate around it on hover). Form posts nowhere yet — stub the handler, mark TODO.
Footer: wordmark, +994 XX XXX XX XX / info@mrtechnology.az / @mrtechnology.az, "MR Technology · Bakı · © 2026".

---

## Conventions

- One component per section in `src/components/sections/` (`Nav.tsx`, `Hero.tsx`, `IngredientReveal.tsx`, `HowItWorks.tsx`, `ArPreview.tsx`, `AiWaiter.tsx`, `Analytics.tsx`, `Manifesto.tsx`, `Cta.tsx`). Shared: `src/components/ui/` (`ArBrackets.tsx`, `Eyebrow.tsx`, `CtaButton.tsx`, `Grain.tsx`, `PhoneFrame.tsx`).
- Sections are client components; `page.tsx` is a simple server component composing them.
- Every section root gets an `id` matching nav anchors: `mehsul`, `nece-isleyir`, `ai-ofisiant`, `analitika`.
- `next/image` with explicit sizes for any raster asset.
- Lighthouse budget: LCP < 2.5s.
- After each section: `npm run build` must pass, then screenshot at 1440px and 390px (Playwright MCP) and self-review against this file before calling it done.

## Do NOT

- No pure #fff or #000 anywhere. No default Tailwind blue/indigo/violet. No glassmorphism.
- No emoji in UI. No lorem ipsum — use the Azerbaijani copy above.
- No Framer Motion, no CSS scroll-snap hacks — GSAP only, one animation brain.
- No stock photos.
- Don't build multiple sections in one task. One section, review, then next.