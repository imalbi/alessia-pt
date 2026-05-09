# Design

Documento visivo per la landing di Alessia · Personal Trainer & Chinesiologa. Definisce il sistema di design — colori, tipografia, spaziatura, componenti, motion — coerente con `PRODUCT.md`.

Riferimento spec di prodotto/architettura: [`docs/superpowers/specs/2026-05-08-alessia-pt-landing-design.md`](docs/superpowers/specs/2026-05-08-alessia-pt-landing-design.md).

---

## Visual Theme

**Mood**: atelier sportivo notturno. Nero quasi-puro come superficie dominante, viola elettrico saturato come voce, oro antico opaco come dettaglio raro. Riferimenti incrociati: Lululemon × Métier per il restraint athletic-luxury, Bottega Veneta sport per l'uso del viola committed e dell'oro come dettaglio mai dominante.

**Direzione cromatica**: **dark default**, light come toggle esplicito in nav. Il dark è la voce vera del brand; il light è cortesia.

**Categoria di superficie**: brand (la landing è il prodotto stesso).

**Color strategy**: **Drenched** sul dark (viola che porta superficie quando appare), **Committed** sul light (viola accent ≤20% della superficie). Mai Restrained — sarebbe timido e farebbe scivolare nella lane MLM/wellness saturata.

---

## Color Palette

Tutti i token sono custom properties in `app/globals.css`. Tailwind v4 `@theme inline` li mappa a utility classes (`bg-paper`, `text-ink`, etc.).

### Dark (default)

| Token           | HEX                    | Ruolo                                                                |
| --------------- | ---------------------- | -------------------------------------------------------------------- |
| `--paper`       | `#0A0A0C`              | Sfondo principale, "nero studio" (mai `#000`)                        |
| `--paper-2`     | `#14141A`              | Sfondo secondario, leggero shift viola, sezioni alternate            |
| `--ink`         | `#F4F2EE`              | Testo principale, off-white tenue (mai `#fff`)                       |
| `--ink-70`      | `rgba(244,242,238,.70)` | Testo secondario, body lungo                                         |
| `--ink-55`      | `rgba(244,242,238,.55)` | Caption, meta, label discrete                                        |
| `--ink-30`      | `rgba(244,242,238,.20)` | Bordi soft, divisori                                                 |
| `--ink-15`      | `rgba(244,242,238,.10)` | Bordi extra-soft, hairlines                                          |
| `--accent`      | `#9C5BFF`              | Viola elettrico — CTA, link in-text, headline accent, focus visible  |
| `--accent-deep` | `#7B3AE0`              | Viola scuro — hover state CTA                                        |
| `--gold`        | `#D4A958`              | Oro antico — solo hairlines, dettagli underline, separator. Mai testo |
| `--gold-deep`   | `#B68A3A`              | Oro scuro — hover su elementi gold                                   |

### Light (toggle)

| Token           | HEX                  | Ruolo                                                                  |
| --------------- | -------------------- | ---------------------------------------------------------------------- |
| `--paper`       | `#F4F2EE`            | Sfondo, off-white greige (NON cream, NON `#fff`)                       |
| `--paper-2`     | `#EAE7E1`            | Sfondo secondario                                                      |
| `--ink`         | `#0F0E12`            | Testo principale, nero quasi-puro con micro-shift viola (mai `#000`)   |
| `--ink-70`      | `rgba(15,14,18,.70)` | Testo secondario                                                       |
| `--ink-55`      | `rgba(15,14,18,.55)` | Caption, meta                                                          |
| `--ink-30`      | `rgba(15,14,18,.22)` | Bordi soft                                                             |
| `--ink-15`      | `rgba(15,14,18,.12)` | Bordi extra-soft                                                       |
| `--accent`      | `#6D2DD6`            | Viola elettrico — CTA, link, focus                                     |
| `--accent-deep` | `#4F1FAF`            | Viola scuro — hover/focus                                              |
| `--gold`        | `#B0823A`            | Oro antico opaco — solo hairlines/dettagli. Mai testo body            |
| `--gold-deep`   | `#8C6629`            | Oro scuro — hover                                                      |

### Regole d'uso

- **Viola** ≤25% della superficie. Su CTA grandi (filled accent), citazioni evidenziate, scribble underline hero, focus ring. Una sola intensità per surface; non si mischiano viola light e dark sullo stesso schermo.
- **Oro** ≤5% della superficie e **MAI testo body**. Solo: hairline separator (1-2px), focus ring outer (3px outline), underline hero detail, bordo CTA outline. Se l'oro sta riempendo qualcosa, è sbagliato.
- **Niente gradient text**. Mai `background-clip: text`.
- **Mai `#000` o `#fff`**. Tutti i neri sono `--paper` (dark) o `--ink` (light), tutti i bianchi specularmente.
- **Niente terza famiglia colore**. Solo viola + oro + grayscale ink. Aggiungere un blu/verde/rosa rompe il committment.

### Contrast check (WCAG 2.2 AA, body 4.5:1, UI 3:1)

Dark:
- `--ink` su `--paper` (#F4F2EE su #0A0A0C): ratio ~17:1 ✅ AAA
- `--ink-70` su `--paper`: ~12:1 ✅
- `--accent` su `--paper` (#9C5BFF su #0A0A0C): ~6.8:1 ✅ body OK
- `--paper` su `--accent` (CTA filled): ~6.8:1 ✅
- `--gold` su `--paper` (#D4A958 su #0A0A0C): ~10:1 ✅ ma SOLO decorazione (regola di brand)

Light:
- `--ink` su `--paper` (#0F0E12 su #F4F2EE): ratio ~18:1 ✅ AAA
- `--ink-70` su `--paper`: ~13:1 ✅
- `--accent` su `--paper` (#6D2DD6 su #F4F2EE): ~5.7:1 ✅ body OK
- `--gold` su `--paper` (#B0823A su #F4F2EE): ~3.4:1 — UI/decorazione 3:1 OK, body text NO

---

## Typography

Due famiglie via `next/font/google`, self-hosted post-build. **Single-family voice**: Bricolage porta sia display che body — l'unicità è la voce.

| Token            | Family                                            | Uso                                                        |
| ---------------- | ------------------------------------------------- | ---------------------------------------------------------- |
| `--font-display` | **Bricolage Grotesque** (400/500/700/800)         | H1, H2, H3, hero, display text                             |
| `--font-body`    | **Bricolage Grotesque** (stessa famiglia, 400)    | Body, paragrafi, label form                                |

Il token `--font-body` resta semantico (un giorno potremmo divergere) ma oggi resolve allo stesso `--font-bricolage`.

**Niente Caveat / niente font handwritten.** La mano disegnata era coerente con la palette warm precedente; nel registro atelier-sportivo è troppo amichevole. I "dettagli marcati" sono ora linee oro precise (vedi `<Hairline />` sotto), non grafia umana.

**Scale typographic** (mobile → desktop, fluid via `clamp()`):

| Step       | Size mobile → desktop                    | Line-height | Use                |
| ---------- | ---------------------------------------- | ----------- | ------------------ |
| Display XL | `clamp(2.5rem, 6vw + 1rem, 5.5rem)`      | 0.95        | Hero H1            |
| Display L  | `clamp(2rem, 4vw + 0.8rem, 3.5rem)`      | 1.05        | Section H2         |
| Display M  | `clamp(1.5rem, 2vw + 0.7rem, 2.25rem)`   | 1.15        | Sub-section H3     |
| Body L     | `clamp(1.125rem, 0.5vw + 1rem, 1.25rem)` | 1.6         | Lead paragraph     |
| Body       | `1rem` (mobile ≥16px lock)               | 1.65        | Default            |
| Caption    | `0.875rem`                               | 1.5         | Meta, footer       |

**Hierarchy contrast**: ratio ≥1.25 tra step adiacenti. Peso variation 400→500→700→800 per Bricolage rinforza la gerarchia all'interno della stessa famiglia.

**Body line length**: cap a `max-width: 65ch` per paragrafi lunghi.

**Letter-spacing**: tight per display (`-0.02em`), default per body, slight loose per caption (`+0.02em`).

**Light text on dark**: aggiungo `+0.05` al line-height del body in dark mode (regola impeccable: light type on dark legge come più sottile, serve respiro).

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

**No card grid identico**. Le 4 card servizi NON sono identiche per altezza/contenuto: variano in lunghezza testo, una può avere "icona" sostituita da hairline oro, una può essere più alta perché più importante. La griglia regolare = preset.

---

## Components

### Primitives (custom, sotto `components/primitives/`)

- **`<Scribble kind="..." />`** — SVG marks. Originariamente "scribble handwritten"; nel registro atelier-sportivo questi diventano **hairlines geometriche oro** (stroke 1.5px, `var(--gold)`), usate **una sola volta per pagina** sotto la headline hero. Tutti gli altri usi precedenti vengono rimossi. Animazione draw-in via `stroke-dashoffset` keyframe (1.4s `cubic-bezier(.7,0,.3,1)`).
- **`<Photo ratio caption label />`** — placeholder/foto. Quando `src` manca: rectangle `--paper-2` con bordo `--ink-15` e label in display caps. Quando arriva la foto reale: `next/image` con shadow tinted viola sottile.

### shadcn/ui (sotto `components/ui/`)

- `button` — variants: `default` (viola filled), `outline` (border `--gold` 1px, hover background `--paper-2`), `ghost` (testo + underline gold at hover). Border radius `rounded-sm` (= 2px) per look spigoloso.
- `dialog`
- `form`, `input`, `textarea`, `label`
- `select` (Radix-based, custom-styled)
- `dropdown-menu` — selettore lingua nav
- `toast` (Sonner)
- `theme-toggle` (custom, sun/moon icon)

### Sezioni (sotto `components/sections/`)

- `<Hero />` — client, entrance choreography
- `<About />` — server
- `<Services />` — server
- `<CaseStories />` — server (carousel removed)
- `<Contact />` — client, form `react-hook-form` + zod
- `<Footer />` — server

### Nav

- Top-left: nome "Alessia" in Bricolage 800
- Top-right desktop: anchor links + selettore lingua + **theme toggle (sun/moon)**
- Mobile: hamburger → bottom-sheet via Vaul, anchor links + lingua + toggle
- Scroll behavior: nav iniziale trasparente, dopo 80px diventa `bg-paper/90 backdrop-blur` con bordo bottom hairline `--ink-15`

---

## Motion

**Filosofia**: due momenti coreografati, tutto il resto stabile. Mai animazione decorativa diffusa.

### Momento 1 — Hero entrance

Stagger sequence al mount, una volta sola:

1. `0.0s` foto Alessia entra da destra (`x: 24px → 0`, `opacity: 0 → 1`, `scale: 1.02 → 1`)
2. `0.15s` headline Bricolage scala display rivelata via mask top-down (`clip-path: inset(100% 0 0 0) → inset(0 0 0 0)`)
3. `0.4s` sub-headline fade-in
4. `0.6s` CTA primaria fade + slight `y: 8px → 0`
5. `0.8s` underline gold hairline sotto headline draw-in

Ease: **ease-out-expo** `cubic-bezier(0.16, 1, 0.3, 1)`. Durata totale ~1.2s.

### Momento 2 — (rimosso: scribble draw-in diffuso)

Il momento 2 originale era "scribble draw-in on scroll" su 4+ scribble in pagina. Nel registro atelier-sportivo questo era chiasso. Eliminato.

### Smooth scroll

`Lenis` attivato globalmente con default config (no overshoot). Ridotto a no-op su `prefers-reduced-motion`.

### Micro-interactions

- **Button hover (desktop only)**: leggero `translateY(-1px)` + cambio `--accent → --accent-deep`, durata 150ms ease-out-quart.
- **Form input focus**: outline `2px solid var(--accent)` (viola) con offset 2px, NO ring shadow blur (look "marker pen", non "glow viola").
- **Link in-text hover**: underline gold che si disegna al hover (animation 300ms).
- **Theme toggle**: icona ruota 90° + crossfade 200ms.

### Cosa NON facciamo

- Niente parallax tilt
- Niente lettera-per-lettera sui titoli
- Niente bounce / spring / elastic
- Niente animazione su `width`, `height`, `top`, `left`, `padding`, `margin` (solo `transform`, `opacity`, `clip-path`)
- Niente continuous loop animations
- **Niente glow viola** (è la trappola tech-bro/Twitch)

### Reduced motion

`@media (prefers-reduced-motion: reduce)`:

- Tutte le `transition-duration` e `animation-duration` → `0.01ms !important`
- Lenis disattivato
- Hero entrance → fade istantaneo opacity 0 → 1 senza stagger
- Hairline gold → mostrato già completo

---

## Surface Treatment

### Paper grain

Texture SVG turbulence (`feTurbulence baseFrequency='.85'`) overlay su `body::before`, fixed, opacity 0.20 in light, 0.12 in dark, `mix-blend-mode: overlay` (su dark) / `multiply` (su light). Solo desktop e tablet.

### Borders

- Hairlines `1px solid var(--ink-15)` per separazioni morbide
- Hairlines `1px solid var(--gold)` per dettagli "atelier" (max 1-2 per fold)
- Card e contenitori: border completo + box-shadow tinted viola sottile (dark: `0 30px 60px -30px rgba(156,91,255,.20)`)
- **Mai side-stripe borders** colorati

### Niente "tape effect"

Era coerente con la palette warm (mood "magazine ritagliato"). Nel registro atelier-sportivo è fuori. Rimosso dal Photo primitive.

---

## Iconography

**Lucide React** come default.

Variant: stroke 1.5px, color `var(--ink-70)` per icone neutre, `var(--accent)` (viola) per CTA-related, `var(--gold)` SOLO per dettagli decorativi (max 1-2 per pagina, mai per icone funzionali).

**Niente icon flat colored cute**.

---

## Forbidden

Cross-checked con AI-slop bans del manifesto impeccable + decisioni del progetto:

- ❌ Side-stripe borders su card (`border-left: 4px solid accent`)
- ❌ Gradient text (`background-clip: text`)
- ❌ Glassmorphism decorativo
- ❌ Hero "big number + small label + supporting stats" (template SaaS)
- ❌ Identical card grid
- ❌ Modal come prima soluzione
- ❌ Em dash `—` o `--` come punteggiatura — usare virgole, due punti, parentesi
- ❌ Body/heading in `#000` o `#fff` puro
- ❌ Icone flat colorate
- ❌ Gradient di sfondo che imitano paper
- ❌ Animazioni decorative gratuite
- ❌ **Glow viola dietro i bottoni o sotto la headline** (Twitch-trap)
- ❌ **Oro come riempimento** (MLM-trap)
- ❌ **Font handwritten / calligraphic** (mistico-trap)
- ❌ **Gradient viola → rosa o viola → oro** (acid lane / spiritual-femminile)

---

## Token export

I token sopra finiscono in `app/globals.css` come custom properties. Tailwind v4 `@theme inline` li mappa a utility classes.

```css
@import 'tailwindcss';

@theme inline {
  --color-paper: var(--paper);
  --color-paper-2: var(--paper-2);
  --color-ink: var(--ink);
  --color-ink-70: var(--ink-70);
  --color-ink-55: var(--ink-55);
  --color-ink-30: var(--ink-30);
  --color-ink-15: var(--ink-15);
  --color-accent: var(--accent);
  --color-accent-deep: var(--accent-deep);
  --color-gold: var(--gold);
  --color-gold-deep: var(--gold-deep);

  --font-display: var(--font-bricolage);
  --font-body: var(--font-bricolage);
}

/* Default = dark */
:root,
[data-theme='dark'] {
  --paper: #0a0a0c;
  --paper-2: #14141a;
  --ink: #f4f2ee;
  --ink-70: rgba(244, 242, 238, 0.7);
  --ink-55: rgba(244, 242, 238, 0.55);
  --ink-30: rgba(244, 242, 238, 0.2);
  --ink-15: rgba(244, 242, 238, 0.1);
  --accent: #9c5bff;
  --accent-deep: #7b3ae0;
  --gold: #d4a958;
  --gold-deep: #b68a3a;
}

[data-theme='light'] {
  --paper: #f4f2ee;
  --paper-2: #eae7e1;
  --ink: #0f0e12;
  --ink-70: rgba(15, 14, 18, 0.7);
  --ink-55: rgba(15, 14, 18, 0.55);
  --ink-30: rgba(15, 14, 18, 0.22);
  --ink-15: rgba(15, 14, 18, 0.12);
  --accent: #6d2dd6;
  --accent-deep: #4f1faf;
  --gold: #b0823a;
  --gold-deep: #8c6629;
}
```
