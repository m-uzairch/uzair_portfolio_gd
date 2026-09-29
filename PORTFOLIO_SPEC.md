# Graphic Designer Portfolio — Build Spec for Antigravity Agents

> **How to use this file:** Put this file in the root of an empty Antigravity workspace and tell the agent:
> *"Read `PORTFOLIO_SPEC.md` fully and build the project exactly as described. Follow every section. Do not add extra pages."*

---

## 1. Project Overview

Build a **single-page, projects-only portfolio website** for a **graphic designer**.

- **No** Home page, About page, Services page, Contact page, or blog.
- The whole site is: a slim header (designer name + one-line tagline) → a grid of **5 project cards** → a tiny footer.
- Clicking a card opens a **glassmorphism modal** showing that project's **image gallery** (multiple images), title, category, year, description, and meta details.
- Dark, calm, minimal. **No vibrant colors.** Smooth animations and hover effects.
- Fully responsive (mobile, tablet, desktop).
- The owner will **add real project text and images after the build**, so everything must be easy to edit and heavily commented.

---

## 2. Tech Stack (keep it simple)

Use **plain HTML + CSS + vanilla JavaScript**. No frameworks, no build step, no npm dependencies. It should work by opening `index.html` or by any static host (Netlify, Vercel, GitHub Pages).

| Item | Choice |
|------|--------|
| Markup | HTML5, semantic tags |
| Styling | Single `css/styles.css` using CSS variables |
| Logic | Single `js/main.js` (ES6, no libraries) |
| Data | `js/projects.js` (the **only** file the owner edits to add content) |
| Font | **Poppins** via Google Fonts (weights 300, 400, 500, 600), with `system-ui, sans-serif` fallback |
| Icons | Inline SVG only (close, arrow-left, arrow-right) |

---

## 3. File Structure

```
/portfolio
├── index.html
├── PORTFOLIO_SPEC.md
├── css/
│   └── styles.css
├── js/
│   ├── projects.js        ← OWNER EDITS THIS
│   └── main.js
└── assets/
    └── projects/
        ├── project-1/     ← cover.svg + image-1.svg … image-4.svg (placeholders)
        ├── project-2/
        ├── project-3/
        ├── project-4/
        └── project-5/
```

**Placeholder images:** The agent must generate simple **dark-gradient SVG placeholders** (with the text "Project 1 · Image 2" centered in muted gray) so the site looks complete before real images are added. Each project gets 1 cover + 4 gallery placeholders. Cover ratio 4:3, gallery images 16:10.

---

## 4. Data Model — `js/projects.js`

This is the single source of truth. The UI must be **generated from this array**, so the owner never touches HTML or CSS to add content.

```js
/* ==========================================================
   PROJECTS DATA  —  EDIT THIS FILE TO ADD YOUR REAL WORK
   ----------------------------------------------------------
   • There are exactly 5 projects. Keep the array to 5 items.
   • "cover"  = image shown on the card in the grid.
   • "images" = ALL images shown inside the popup gallery.
                Add as many as you like — just add more paths.
   • Put your image files inside: assets/projects/project-X/
   • Recommended image size: 1600px wide, JPG/WebP/PNG/SVG.
   ========================================================== */

const PROJECTS = [
  {
    id: "project-1",
    title: "Project Title One",                 // ← REPLACE: project name
    category: "Brand Identity",                 // ← REPLACE: e.g. Logo, Packaging, Poster, Social
    year: "2025",                               // ← REPLACE
    cover: "assets/projects/project-1/cover.svg",   // ← REPLACE with your cover image
    description:
      "Write a short summary of this project here. Explain the brief, your idea, and the result. " +
      "Two or three sentences is perfect.",     // ← REPLACE
    details: {
      client: "Client Name",                    // ← REPLACE
      role: "Art Direction, Logo Design",       // ← REPLACE
      tools: "Illustrator, Photoshop, Figma",   // ← REPLACE
    },
    images: [
      // ← ADD / REPLACE: one line per image. Add as many as you want.
      { src: "assets/projects/project-1/image-1.svg", alt: "Project one – image 1", caption: "Caption for image 1" },
      { src: "assets/projects/project-1/image-2.svg", alt: "Project one – image 2", caption: "Caption for image 2" },
      { src: "assets/projects/project-1/image-3.svg", alt: "Project one – image 3", caption: "Caption for image 3" },
      { src: "assets/projects/project-1/image-4.svg", alt: "Project one – image 4", caption: "Caption for image 4" },
    ],
  },

  // ↓↓↓ Repeat the same structure for project-2 … project-5 ↓↓↓
  // (Agent: generate all 5 objects with unique placeholder titles/categories,
  //  e.g. "Brand Identity", "Poster Series", "Packaging Design", "Social Media Kit", "Editorial Layout")
];
```

Rules for the agent:
- Generate **all 5** objects with different placeholder titles and categories.
- Each project must have **at least 3 images**, and the gallery must work correctly with **any number** (1 to 20+).
- If `images` has only 1 item, hide the arrows, thumbnails, and counter.

---

## 5. Page Layout (`index.html`)

```
<body>
  <div class="bg-glow"></div>          <!-- soft background blobs, very subtle -->
  <header class="site-header">
    <h1 class="logo">Designer Name</h1>          <!-- ← REPLACE: your name -->
    <p class="tagline">Graphic Designer — Selected Work</p>   <!-- ← REPLACE -->
  </header>

  <main>
    <section id="projects" class="grid" aria-label="Projects">
      <!-- Cards are injected by main.js from PROJECTS -->
    </section>
  </main>

  <footer class="site-footer">© <span id="year"></span> Designer Name</footer>

  <div id="modal" class="modal" hidden> ... </div>   <!-- built by main.js or static markup -->

  <script src="js/projects.js"></script>
  <script src="js/main.js"></script>
</body>
```

- Add `<meta name="viewport" content="width=device-width, initial-scale=1">`.
- Add `<title>` and meta description with **placeholder text** and comments like `<!-- REPLACE: page title -->`.
- Use `loading="lazy"` on card images and `decoding="async"`.

### Card grid (5 cards)

Five cards look odd in equal columns, so use a **6-column CSS grid**:

| Screen | Layout |
|--------|--------|
| Desktop (≥ 1024px) | Row 1: **2 cards** (each spans 3 cols) · Row 2: **3 cards** (each spans 2 cols) |
| Tablet (600–1023px) | 2 columns; the 5th card spans the full width |
| Mobile (< 600px) | 1 column |

Gap: `clamp(16px, 2.5vw, 28px)`. Container max-width: `1200px`, centered, with side padding `clamp(16px, 4vw, 40px)`.

### Card design

Each card is a `<button>` (or `<article>` with `role="button"` and `tabindex="0"`) containing:
1. Cover image (aspect-ratio 4/3, `object-fit: cover`).
2. A **glass info bar** at the bottom overlaying the image with: category (small, muted), title (medium), and a small "View project →" hint.
3. A small badge in the top-right showing image count, e.g. `4 images`.

---

## 6. Design System

### 6.1 Colors — dark, muted, NO vibrant colors

```css
:root {
  /* Base */
  --bg:            #0b0c0f;   /* page background */
  --bg-soft:       #111318;
  --text:          #e6e7ea;   /* main text */
  --text-muted:    #8d919b;   /* secondary text */

  /* Glass */
  --glass-bg:      rgba(255, 255, 255, 0.05);
  --glass-bg-hover:rgba(255, 255, 255, 0.09);
  --glass-border:  rgba(255, 255, 255, 0.10);
  --glass-shadow:  0 8px 32px rgba(0, 0, 0, 0.45);
  --blur:          16px;

  /* One soft neutral accent (silver-gray, NOT colorful) */
  --accent:        #b8bcc6;

  /* Shape & motion */
  --radius:        20px;
  --ease:          cubic-bezier(0.22, 1, 0.36, 1);
  --t-fast:        200ms;
  --t-med:         450ms;
}
```

**Forbidden:** neon, saturated blue/purple/pink/green/red accents, rainbow gradients. Background blobs (`.bg-glow`) may use only very dark desaturated tones (e.g. `#1a1d26`, `#14161d`) at low opacity with heavy blur.

### 6.2 Typography (Poppins)

- Logo/name: 600, `clamp(1.5rem, 3vw, 2.2rem)`, letter-spacing `-0.02em`.
- Tagline: 300, muted color, `clamp(0.9rem, 1.5vw, 1.05rem)`.
- Card title: 500, `1.1rem`. Category: 400, `0.75rem`, uppercase, letter-spacing `0.12em`, muted.
- Body text in modal: 300–400, line-height 1.7.

### 6.3 Glassmorphism recipe (reuse everywhere)

```css
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--blur)) saturate(120%);
  -webkit-backdrop-filter: blur(var(--blur)) saturate(120%);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
}
```

Apply to: card info bar, card image-count badge, modal panel, modal buttons (close/arrows), thumbnail strip container.
Add a `@supports not (backdrop-filter: blur(1px))` fallback using a solid `rgba(20,22,28,0.85)` background.

---

## 7. Animations & Hover Effects

All animations must feel **smooth and subtle** (use `--ease`, transitions of 200–450ms, animate only `transform` and `opacity` where possible).

**Page load**
- Header fades in and slides up 12px.
- Cards **stagger-reveal** (fade + translateY 24px → 0) using `IntersectionObserver`, 80ms delay between cards.

**Card hover (desktop)**
- Card lifts `translateY(-6px)` and gets a slightly stronger shadow.
- Cover image scales to `1.06` (inside an `overflow:hidden` wrapper).
- Glass info bar background goes from `--glass-bg` to `--glass-bg-hover`; the "View project →" arrow slides 4px right.
- Border brightens subtly (`rgba(255,255,255,0.18)`).
- Optional: gentle 3D tilt (max 4°) following the mouse. **Disable on touch devices.**

**Card focus / active**
- Visible focus ring (`outline: 2px solid var(--accent); outline-offset: 4px`).
- On press: `scale(0.985)`.

**Modal**
- Backdrop fades in (`rgba(5,6,8,0.7)` + `backdrop-filter: blur(8px)`).
- Panel scales from `0.96 → 1` and fades in.
- Gallery image change: cross-fade + slight horizontal slide (direction depends on next/prev).
- Buttons (close, arrows): scale `1.08` and brighten on hover.
- Thumbnails: hover raises opacity to 1 and scales `1.04`; the active thumbnail has a `--accent` border.

**Accessibility:** wrap all motion in
```css
@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition-duration: 0.01ms !important; } }
```

---

## 8. Project Modal + Multi-Image Gallery (core feature)

When a card is clicked (or Enter/Space pressed), open a modal for that project.

### Modal layout

**Desktop (≥ 900px):** two columns inside one large glass panel.
- **Left (≈ 62%)** — Gallery viewer:
  - Large main image (`object-fit: contain`, max-height `78vh`) on a slightly darker inset background.
  - **Prev / Next** glass arrow buttons on the left/right edges of the image.
  - **Counter** bottom-center: `2 / 4`.
  - **Thumbnail strip** below (horizontally scrollable, active one highlighted).
- **Right (≈ 38%)** — Details, scrollable:
  - Category (muted, uppercase) · Year
  - Title (large)
  - Description paragraph
  - Details list: **Client**, **Role**, **Tools**
  - Caption of the current image (updates when the image changes)

**Mobile (< 900px):** single column, gallery on top, details below; panel becomes near full-screen with 12px margin and the whole panel scrolls.

### Gallery behavior (must all work)

- Prev / Next buttons, **looping** at the ends.
- **Keyboard:** `←` `→` change image, `Esc` closes.
- **Touch swipe** left/right on the main image (threshold ≈ 50px).
- **Click a thumbnail** to jump to that image.
- Preload the next and previous images for instant switching.
- Show a soft skeleton/shimmer (dark gray) while an image loads.
- Close by: X button, `Esc`, or clicking the dark backdrop outside the panel.
- Lock body scroll while open (`overflow: hidden`) and restore it on close.
- **Focus management:** move focus into the modal on open, trap Tab inside, return focus to the clicked card on close. Use `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing at the title.
- Update the URL hash (`#project-2`) on open, and open the correct modal if the page loads with that hash. Clear hash on close.

### Suggested `main.js` structure (agent should implement)

```js
// 1. renderCards()        → builds the 5 cards from PROJECTS
// 2. observeReveal()      → stagger reveal on scroll
// 3. openModal(id)        → fills modal content, sets state { projectId, index }
// 4. renderGallery()      → main image, counter, thumbs, caption (handles 1-image case)
// 5. go(delta) / goTo(i)  → change image with slide direction
// 6. closeModal()         → cleanup, restore focus & scroll
// 7. bindEvents()         → click, keyboard, swipe, hash change, focus trap
// Add short comments above every function explaining what it does.
```

---

## 9. Responsive Checklist

- [ ] No horizontal scroll at 320px width.
- [ ] Grid changes as defined in section 5.
- [ ] Modal is usable one-handed on mobile (large tap targets ≥ 44px).
- [ ] Thumbnails scroll horizontally with `scroll-snap`.
- [ ] Hover effects only under `@media (hover: hover)`; touch devices get tap feedback instead.
- [ ] Fluid type with `clamp()`.
- [ ] Images never distort (`object-fit`), and all have `alt` text.

---

## 10. Comments & Placeholder Requirements

The owner will edit content later, so the agent **must**:

1. Add a comment block at the top of every file explaining its purpose.
2. Mark every editable text with `<!-- REPLACE: ... -->` (HTML) or `// ← REPLACE: ...` (JS).
3. Use obvious placeholders: *"Project Title One"*, *"Client Name"*, *"Write a short summary here…"*, *"Designer Name"*.
4. Add comments inside `styles.css` grouping sections: `/* ===== TOKENS ===== */`, `/* ===== HEADER ===== */`, `/* ===== GRID ===== */`, `/* ===== CARD ===== */`, `/* ===== MODAL ===== */`, `/* ===== GALLERY ===== */`, `/* ===== ANIMATIONS ===== */`, `/* ===== RESPONSIVE ===== */`.
5. Create a short `README.md` (see section 12) with the "How to add content" steps.

---

## 11. Quality Bar / Acceptance Criteria

The build is done only when **all** of these are true:

- [ ] `index.html` opens directly and shows header + **exactly 5** placeholder cards.
- [ ] Clicking any card opens its modal with a working multi-image gallery (arrows, thumbnails, keyboard, swipe, counter).
- [ ] Editing only `js/projects.js` (adding an image line) instantly adds that image to the gallery.
- [ ] Glassmorphism is visible on cards' info bars, badges, modal, and buttons.
- [ ] Palette is dark and muted — no vibrant colors anywhere.
- [ ] All hover animations from section 7 work; reduced-motion is respected.
- [ ] Looks correct at 320px, 768px, 1024px, and 1440px.
- [ ] No console errors; Lighthouse Accessibility ≥ 90.
- [ ] All files are commented as described in section 10.

Agent: **after building, open the site in the browser, test each item above, take screenshots at mobile/tablet/desktop, and fix anything that fails.**

---

## 12. README.md the Agent Should Generate

Include these exact sections in plain language:

**How to add your real project content**
1. Put your images in `assets/projects/project-X/` (X = 1–5).
2. Open `js/projects.js`.
3. Change `title`, `category`, `year`, `description`, and `details` for each project.
4. Set `cover` to your cover image path.
5. In `images`, add one line per image (copy an existing line, change `src`, `alt`, `caption`).
6. Save and refresh the browser.

**How to change the name/tagline:** edit the two marked lines in `index.html`.
**How to change colors:** edit the variables at the top of `css/styles.css`.
**How to deploy:** drag the folder into Netlify Drop, or push to GitHub Pages / Vercel.

---

## 13. Out of Scope (do NOT build)

- Home / About / Contact / Services / Blog pages or navigation menus
- Contact forms, login, CMS, or backend
- More or fewer than 5 projects
- Bright accent colors or light theme
- Heavy libraries (React, Tailwind, GSAP, jQuery, etc.)

---

## 14. One-Line Prompt to Start the Agent

> *"Read PORTFOLIO_SPEC.md completely. Build the portfolio exactly as specified using plain HTML, CSS, and JS with the given file structure, generate the SVG placeholders, add all comments, then run it in the browser, verify the acceptance criteria in section 11, and fix any issues."*
