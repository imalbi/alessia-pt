# Design

Documento visivo per la landing di Alessia · Personal Trainer & Chinesiologa. Definisce il sistema di design — colori, tipografia, spaziatura, componenti, motion — coerente con `PRODUCT.md`.

Riferimento spec di prodotto/architettura: [`docs/superpowers/specs/2026-05-08-alessia-pt-landing-design.md`](docs/superpowers/specs/2026-05-08-alessia-pt-landing-design.md).

---

## Visual Theme

**Mood**: editorial magazine warm, carta da stampa con pulizia tipografica. Riferimento Aesop per respiro tipografico e calore asciutto; The Movement Lab per registro tecnico-professionale.

**Direzione cromatica unica in production**: `caldo` (terracotta + crema). Niente light/dark switch pubblico. Le altre due direzioni (`diretto`, `mediterraneo`) restano come `data-theme` accessibili solo dal tweaks-panel dev-only.

**Categoria di superficie**: brand (la landing è il prodotto stesso).

**Color strategy**: **Committed** — un'unica famiglia warm porta il 60-70% della superficie. Non Restrained (sarebbe troppo "asciutto"), non Drenched (lo accent terracotta è puntuale, non immersivo).

---

## Color Palette (caldo, light only)

Tutti i valori in OKLCH equivalente per coerenza percettiva. Convertiti da HEX di partenza del design originale, neutralizzati verso il warm hue (~50° / orange-brown).

| Token           | HEX                  | Ruolo                                                                         |
| --------------- | -------------------- | ----------------------------------------------------------------------------- |
| `--paper`       | `#F4ECE0`            | Sfondo principale, "carta crema"                                              |
| `--paper-2`     | `#ECE1D0`            | Sfondo secondario (sezioni alternate, callout)                                |
| `--ink`         | `#1F1B17`            | Testo principale, deep warm-black tinto verso il paper hue (mai `#000`)       |
| `--ink-70`      | `rgba(31,27,23,.70)` | Testo secondario, body lungo                                                  |
| `--ink-55`      | `rgba(31,27,23,.55)` | Caption, meta, label discrete                                                 |
| `--ink-30`      | `rgba(31,27,23,.18)` | Bordi soft, divisori                                                          |
| `--ink-15`      | `rgba(31,27,23,.12)` | Bordi extra-soft, hairlines                                                   |
| `--accent`      | `#B5532A`            | Terracotta — solo per CTA primaria, link in-text, scribbles, sottolineature   |
| `--accent-deep` | `#8C3D1C`            | Terracotta scura — hover state CTA, focus ring                                |
| `--hand`        | `#1F1B17`            | Default colore handwritten (= `--ink`); override a `--accent` per emfatizzare |

**Regole d'uso**:

- Accent terracotta ≤15% della superficie. Se sembra troppo, è troppo.
- Mai due accent diversi. Una sola famiglia.
- Niente gradient text. Mai `background-clip: text` come decorazione.
- Niente `#000` o `#fff`. Tutti i neri sono `--ink`, tutti i bianchi sono `--paper`.

**Contrast check** (WCAG 2.2 AA):

- `--ink` su `--paper`: ratio ~14:1 ✅
- `--ink-70` su `--paper`: ~10:1 ✅
- `--accent` su `--paper`: ~4.6:1 ✅ (passa AA, body text consentito)
- `--paper` su `--accent`: ~4.6:1 ✅ (CTA white-on-accent ok)

---

## Typography

Tre famiglie via `next/font/google`, tutte self-hosted post-build.

| Token            | Family                                            | Uso                                                        |
| ---------------- | ------------------------------------------------- | ---------------------------------------------------------- |
| `--font-display` | **Bricolage Grotesque** (500/700/800, opsz 12-96) | H1, H2, hero, display text                                 |
| `--font-body`    | **Newsreader** (400/500, italic 400)              | Body, paragrafi, citazioni testimonial                     |
| `--font-hand`    | **Caveat** (500/700)                              | Handwritten emphasis, caption manoscritte, scribble labels |

**Scale typographic** (mobile → desktop, fluid via `clamp()`):

| Step       | Size mobile → desktop                    | Line-height | Use                |
| ---------- | ---------------------------------------- | ----------- | ------------------ |
| Display XL | `clamp(2.5rem, 6vw + 1rem, 5.5rem)`      | 0.95        | Hero H1            |
| Display L  | `clamp(2rem, 4vw + 0.8rem, 3.5rem)`      | 1.05        | Section H2         |
| Display M  | `clamp(1.5rem, 2vw + 0.7rem, 2.25rem)`   | 1.15        | Sub-section H3     |
| Body L     | `clamp(1.125rem, 0.5vw + 1rem, 1.25rem)` | 1.6         | Lead paragraph     |
| Body       | `1rem` (mobile ≥16px lock)               | 1.65        | Default            |
| Caption    | `0.875rem`                               | 1.5         | Meta, footer       |
| Hand       | `clamp(1.25rem, 1vw + 1rem, 1.5rem)`     | 1.2         | Caveat handwritten |

**Hierarchy contrast**: ratio ≥1.25 tra step adiacenti, peso variation (500 → 700 → 800) per Bricolage rinforza la gerarchia.

**Body line length**: cap a `max-width: 65ch` per paragrafi lunghi.

**Letter-spacing**: tight per display (`-0.02em`), default per body, slight loose per caption (`+0.02em`).

---

## Spacing & Layout

**Scale (Tailwind v4 default + custom)**:

- Base: 4px
- Scale: 0, 1, 2, 3, 4, 6, 8, 12, 16, 24, 32 (× 4px)
- Section vertical padding: 12 → 24 → 32 (mobile/tablet/desktop) tramite Tailwind `py-12 md:py-24 lg:py-32`

**Grid**:

- Page max-width: `1280px` (`max-w-screen-xl`)
- Inner gutter: `px-4 md:px-8 lg:px-12`
- Sezioni di lettura (about, percorsi, contatti): `max-w-3xl` per il body, allineato a sinistra (no center stack)
- Hero: full-bleed, foto + testo asimmetrici (mai centrato simmetrico — è il preset banale)

**Rhythm**: spaziatura **non uniforme** tra sezioni — alcuni passaggi sono respiri stretti (sotto Hero), altri stacchi ampi (prima di Percorsi). Mai stesso `py-X` ovunque.

**Breakpoints (Tailwind defaults)**:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

**No card grid identico**. Le 4 card servizi NON sono identiche per altezza/contenuto: variano in lunghezza testo, una può avere "icona" sostituita da scribble, una può essere più alta perché più importante. La griglia regolare = preset.

---

## Components

### Primitives (custom, sotto `components/primitives/`)

- **`<Scribble kind="..." />`** — SVG handwritten marks. `kind`: `underline`, `underline-double`, `circle`, `arrow-curve`, `arrow-down`, `star`, `scribble-block`, `tick`. Disegnati al mount via `stroke-dashoffset` keyframe (1.4s `cubic-bezier(.7,0,.3,1)`), con stagger opzionale per multipli. Trigger via IntersectionObserver una volta per elemento.
- **`<Photo ratio caption tone taped rotate />`** — placeholder/foto wrapped con effetto magazine (warm filter, optional tape, optional handwritten caption). Quando arriva la foto reale, sostituisce il gradient placeholder mantenendo il wrap.
- **`<Hand>`** — testo Caveat handwritten, slight rotation (-1°/-2°) per autenticità.

### shadcn/ui (sotto `components/ui/`)

- `button` — variants: `default` (terracotta filled), `outline` (border `--ink-30`), `ghost` (testo + underline scribble at hover). Border radius `rounded-sm` (= 2px) per look magazine spigoloso.
- `dialog`
- `form`, `input`, `textarea`, `label`
- `dropdown-menu` — selettore lingua nav
- `toast` (Sonner)

### Sezioni (sotto `components/sections/`)

- `<Hero />` — client, entrance choreography
- `<About />` — server
- `<Services />` — server, 4 card asimmetriche
- `<CaseStories />` — client, Embla carousel testimonial estesi
- `<Contact />` — client, form `react-hook-form` + zod
- `<Footer />` — server

### Nav

- Top-left: nome "Alessia" in Bricolage 800 + sottotitolo "Personal Trainer & Chinesiologa" in Newsreader italic
- Top-right desktop: anchor links (Chi sono, Servizi, Percorsi, Contatti) + selettore lingua
- Mobile: hamburger → bottom-sheet via Vaul, anchor links + lingua
- Scroll behavior: nav iniziale trasparente, dopo 80px diventa `bg-paper/90 backdrop-blur` con bordo bottom hairline

---

## Motion

**Filosofia**: due momenti coreografati, tutto il resto stabile. Mai animazione decorativa diffusa.

### Momento 1 — Hero entrance

Stagger sequence al mount, una volta sola:

1. `0.0s` foto Alessia entra da destra (`x: 24px → 0`, `opacity: 0 → 1`, `scale: 1.02 → 1`)
2. `0.15s` headline Bricolage scala display rivelata via mask top-down (`clip-path: inset(100% 0 0 0) → inset(0 0 0 0)`)
3. `0.4s` sub-headline Newsreader fade-in
4. `0.6s` CTA primaria fade + slight `y: 8px → 0`
5. `0.8s` scribble underline sotto headline draw-in

Ease: **ease-out-expo** `cubic-bezier(0.16, 1, 0.3, 1)`. Durata totale ~1.2s.

### Momento 2 — Scribble draw-in on scroll

Scribble SVG (`<Scribble />`) si "disegnano" alla prima entrata in viewport. Ogni scribble: `stroke-dasharray: 600; stroke-dashoffset: 600 → 0` con animation 1.4s ease-out, trigger via IntersectionObserver con `threshold: 0.4`. Una volta per elemento, no replay.

### Smooth scroll

`Lenis` attivato globalmente con default config (no overshoot). Ridotto a no-op su `prefers-reduced-motion`.

### Micro-interactions

- **Button hover (desktop only)**: leggero `translateY(-1px)` + cambio `--accent → --accent-deep`, durata 150ms ease-out-quart.
- **Form input focus**: outline `2px solid var(--accent)` con offset 2px, no ring shadow blur (look "marker pen", non "glow").
- **Link in-text hover**: scribble underline che si disegna al hover (animation 300ms).

### Cosa NON facciamo

- Niente parallax tilt sulle card
- Niente lettera-per-lettera sui titoli (`splitting`)
- Niente bounce, elastic, spring overshoot
- Niente animazione su `width`, `height`, `top`, `left`, `padding`, `margin` (solo `transform`, `opacity`, `clip-path`)
- Niente continuous loop animations (marquee escluso ma non in production)

### Reduced motion

`@media (prefers-reduced-motion: reduce)`:

- Tutte le `transition-duration` e `animation-duration` → `0.01ms !important`
- Lenis disattivato (instant scroll nativo)
- Hero entrance → fade istantaneo opacity 0 → 1 senza stagger
- Scribble draw-in → SVG mostrato già completo (no draw animation)

---

## Surface Treatment

### Paper grain

Texture SVG turbulence (`feTurbulence baseFrequency='.85'`) overlay su `body::before`, fixed, `mix-blend-mode: multiply`, opacity 0.35. Aggiunge sottilissima granulosità tipo carta crema. Solo desktop e tablet — su mobile su test reale può aggiungere noise visivo non ripagato (decisione dopo QA mobile).

### Borders

- Hairlines `1px solid var(--ink-15)` per separazioni morbide
- Card e contenitori usano border completo + leggero `box-shadow` paper (`0 30px 60px -30px rgba(0,0,0,.35)`)
- **Mai side-stripe borders** (border-left/right colorato come accent)

### Tape effect

Per le foto, opzionale "nastro adesivo" via pseudo-element bianco semi-transparent + slight rotation. Solo dove rinforza il mood "magazine ritagliato", non ovunque.

---

## Iconography

**Lucide React** come default (set incluso in shadcn).

Variant: stroke 1.5px (più sottile del default 2px), color `var(--ink-70)` per icone neutre, `var(--accent)` per CTA-related.

**Niente icon flat colored cute**. Stile coerente line-icon professionale.

---

## Iconographic limits — SCRIBBLES

I scribble SVG sono **handwritten marks** — non icone. Vincoli:

- Solo i tipi predefiniti (`underline`, `circle`, `arrow-curve`, `arrow-down`, `star`, `scribble-block`, `tick`). Non si aggiunge un nuovo tipo senza review.
- Mai più di **2 scribble per fold** (viewport visibile). Più di così = chiasso, indebolisce la voce.
- Stroke `var(--hand)` (= `--ink`) di default. Override a `var(--accent)` solo per evidenziare un concetto specifico (max 1 per pagina).

---

## Forbidden

Cross-checked con le AI-slop bans del manifesto impeccable + decisioni specifiche di questo progetto:

- ❌ Side-stripe borders su card (`border-left: 4px solid accent`)
- ❌ Gradient text (`background-clip: text`)
- ❌ Glassmorphism decorativo
- ❌ Hero "big number + small label + supporting stats" (template SaaS)
- ❌ Identical card grid (servizi)
- ❌ Modal come prima soluzione (tutto inline o navigation)
- ❌ Em dash `—` o `--` come punteggiatura — usare virgole, due punti, parentesi
- ❌ Body/heading in `#000` o `#fff` puro
- ❌ Icone flat colorate
- ❌ Gradient di sfondo che imitano paper
- ❌ Animazioni decorative gratuite (vedi Motion sopra)

---

## Token export

I token sopra finiscono in `app/globals.css` come custom properties. Tailwind v4 `@theme` block li mappa a utility classes.

```css
@import "tailwindcss";

@theme {
  --color-paper: var(--paper);
  --color-paper-2: var(--paper-2);
  --color-ink: var(--ink);
  --color-ink-70: var(--ink-70);
  --color-ink-55: var(--ink-55);
  --color-ink-30: var(--ink-30);
  --color-ink-15: var(--ink-15);
  --color-accent: var(--accent);
  --color-accent-deep: var(--accent-deep);

  --font-display: 'Bricolage Grotesque', system-ui, sans-serif;
  --font-body:    'Newsreader', Georgia, serif;
  --font-hand:    'Caveat', cursive;
}

[data-theme="caldo"] {
  --paper: #F4ECE0;
  --paper-2: #ECE1D0;
  --ink: #1F1B17;
  --ink-70: rgba(31,27,23,.70);
  --ink-55: rgba(31,27,23,.55);
  --ink-30: rgba(31,27,23,.18);
  --ink-15: rgba(31,27,23,.12);
  --accent: #B5532A;
  --accent-deep: #8C3D1C;
  --hand: #1F1B17;
}

/* dev-only alternatives, non shippate in production */
[data-theme="diretto"] { --paper:#F2EEE6; --ink:#0E0D0B; --accent:#C0492A; ... }
[data-theme="mediterraneo"] { --paper:#F6EFDD; --ink:#2A211A; --accent:#D38A2C; ... }
```
