# Design

Documento visivo per la landing di Alessia · Personal Trainer & Chinesiologa. Definisce il sistema di design — colori, tipografia, spaziatura, componenti, motion — coerente con `PRODUCT.md`.

---

## Visual Theme

**Mood**: atelier sportivo notturno. Nero quasi-puro come superficie dominante, viola elettrico saturato come voce, oro antico opaco come dettaglio raro. Riferimenti incrociati: Lululemon × Métier per il restraint athletic-luxury, Bottega Veneta sport per l'uso del viola committed e dell'oro come dettaglio mai dominante.

**Direzione cromatica**: **dark default**, light come toggle esplicito in nav. Il dark è la voce vera del brand; il light è cortesia. Due temi in tutto: le varianti di tono provate in review (`dark-noir`, `dark-neon`, `light-warm`) sono state rimosse una volta scelto il default.

**Categoria di superficie**: brand (la landing è il prodotto stesso).

**Color strategy**: **Drenched** sul dark (viola che porta superficie quando appare), **Committed** sul light (viola accent ≤20% della superficie). Mai Restrained — sarebbe timido e farebbe scivolare nella lane MLM/wellness saturata.

---

## Color Palette

Tutti i token sono custom properties in `app/globals.css`. Tailwind v4 `@theme inline` li mappa a utility classes (`bg-paper`, `text-ink`, etc.).

### Dark (default)

| Token           | HEX                     | Ruolo                                                                 |
| --------------- | ----------------------- | --------------------------------------------------------------------- |
| `--paper`       | `#0A0A0C`               | Sfondo principale, "nero studio" (mai `#000`)                         |
| `--paper-2`     | `#14141A`               | Sfondo secondario, leggero shift viola, sezioni alternate             |
| `--ink`         | `#F4F2EE`               | Testo principale, off-white tenue (mai `#fff`)                        |
| `--ink-70`      | `rgba(244,242,238,.72)` | Testo secondario, body lungo                                          |
| `--ink-55`      | `rgba(244,242,238,.55)` | Caption, meta, label discrete                                         |
| `--ink-30`      | `rgba(244,242,238,.20)` | Bordi soft, divisori                                                  |
| `--ink-15`      | `rgba(244,242,238,.10)` | Bordi extra-soft, hairlines                                           |
| `--accent`      | `#9C5BFF`               | Viola elettrico — CTA, link in-text, headline accent, focus visible   |
| `--accent-deep` | `#7B3AE0`               | Viola scuro — hover state CTA                                         |
| `--gold`        | `#D4A958`               | Oro antico — solo hairlines, dettagli underline, separator. Mai testo |
| `--gold-deep`   | `#B68A3A`               | Oro scuro — hover su elementi gold                                    |

### Light (toggle)

| Token           | HEX                  | Ruolo                                                                |
| --------------- | -------------------- | -------------------------------------------------------------------- |
| `--paper`       | `#F4F2EE`            | Sfondo, off-white greige (NON cream, NON `#fff`)                     |
| `--paper-2`     | `#EAE7E1`            | Sfondo secondario                                                    |
| `--ink`         | `#0F0E12`            | Testo principale, nero quasi-puro con micro-shift viola (mai `#000`) |
| `--ink-70`      | `rgba(15,14,18,.72)` | Testo secondario                                                     |
| `--ink-55`      | `rgba(15,14,18,.55)` | Caption, meta                                                        |
| `--ink-30`      | `rgba(15,14,18,.22)` | Bordi soft                                                           |
| `--ink-15`      | `rgba(15,14,18,.12)` | Bordi extra-soft                                                     |
| `--accent`      | `#6D2DD6`            | Viola elettrico — CTA, link, focus                                   |
| `--accent-deep` | `#4F1FAF`            | Viola scuro — hover/focus                                            |
| `--gold`        | `#B0823A`            | Oro antico opaco — solo hairlines/dettagli. Mai testo body           |
| `--gold-deep`   | `#8C6629`            | Oro scuro — hover                                                    |

### Regole d'uso

- **Viola** ≤25% della superficie. Su CTA grandi (filled accent), citazioni evidenziate, focus ring. Una sola intensità per surface; non si mischiano viola light e dark sullo stesso schermo.
- **Oro** ≤5% della superficie e **MAI testo body**. Solo: hairline separator (1-2px), focus ring outer (3px outline), underline hero detail, bordo CTA outline. Se l'oro sta riempendo qualcosa, è sbagliato.
- **L'oro è il singolo elemento warm del visual.** PRODUCT.md prescrive una tensione voce-calda / visual-notturno: il caldo nel visual vive lì — hairline oro sopra il blocco contact, ratio caps oro nel Photo placeholder, separatore oro sotto la featured Services card. Non aggiungere altri elementi warm (no foto sepia-tinted, no accent secondario warm) — romperebbero il committment.
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

Due famiglie via `next/font/google`, self-hosted post-build. Bricolage porta display e body; IBM Plex Mono porta solo le etichette. La divisione è per _ruolo del testo_, non per livello gerarchico: prosa contro tag.

| Token            | Family                                         | Uso                                                  |
| ---------------- | ---------------------------------------------- | ---------------------------------------------------- |
| `--font-display` | **Bricolage Grotesque** (400/500/600/700/800)  | H1, H2, H3, hero, display text                       |
| `--font-body`    | **Bricolage Grotesque** (stessa famiglia, 400) | Body, paragrafi                                      |
| `--font-mono`    | **IBM Plex Mono** (400/500)                    | Eyebrow, meta, label form, numerali di fase, caption |

Il token `--font-body` resta semantico (un giorno potremmo divergere) ma oggi resolve allo stesso `--font-bricolage`.

**Il mono è la voce delle etichette (redesign v2).** La regola precedente era single-family: Bricolage per tutto. In pratica rendeva label e body indistinguibili, perché nulla separava "CHI SONO" da un paragrafo se non la dimensione. IBM Plex Mono entra solo dove il testo è un _tag_ e mai dove è prosa: eyebrow di sezione, meta della timeline, label dei campi, ratio caps, disclosure. Vive in un'unica classe, `.mono-cap` in `app/globals.css` (10px, tracking .18em, uppercase), così non può sfilacciarsi in venti varianti.

Se stai per usare il mono per una frase, è sbagliato: quella è prosa e va in Bricolage.

**Niente Caveat / niente font handwritten.** La mano disegnata era coerente con la palette warm precedente; nel registro atelier-sportivo è troppo amichevole. I "dettagli marcati" sono ora linee oro precise (vedi `<Hairline />` sotto), non grafia umana.

**Scale typographic** (mobile → desktop, fluid via `clamp()`):

| Step       | Size mobile → desktop                    | Line-height | Use            |
| ---------- | ---------------------------------------- | ----------- | -------------- |
| Display XL | `clamp(2.5rem, 6vw + 1rem, 5.5rem)`      | 0.95        | Hero H1        |
| Display L  | `clamp(2rem, 4vw + 0.8rem, 3.5rem)`      | 1.05        | Section H2     |
| Display M  | `clamp(1.5rem, 2vw + 0.7rem, 2.25rem)`   | 1.15        | Sub-section H3 |
| Body L     | `clamp(1.125rem, 0.5vw + 1rem, 1.25rem)` | 1.6         | Lead paragraph |
| Body       | `1rem` (mobile ≥16px lock)               | 1.65        | Default        |
| Caption    | `0.875rem`                               | 1.5         | Meta, footer   |

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

- **`<Scribble kind="underline" | "underline-double" />`** — brush-mark sottolineatura. Single low-amplitude bezier con stroke-width 4 (default) e `stroke-linecap: round`, color `var(--accent)` (viola). Reads as "marker pen pass" sotto headline — non handwritten squiggle, non geometric line, ha gestualità ma è decisa. Animation draw-in 1.1s `cubic-bezier(.2,.7,.3,1)` via `stroke-dashoffset`, trigger via IntersectionObserver con `threshold: 0.4`. Una volta per elemento.
- **`<Photo ratio caption label />`** — placeholder/foto. Quando `src` manca: art-director brief layout con ratio in caps oro top-left, crosshair sottile oro al centro, label centrale su chip `--paper-2`, footer "fotografia in arrivo". Quando arriva la foto reale: `next/image` con shadow tinted viola sottile.

### shadcn/ui (sotto `components/ui/`)

- `button` — variants: `default` (viola filled), `outline` (border `--gold` 1px, hover background `--paper-2`), `ghost` (testo + underline gold at hover). Border radius: token `--radius-field` (8px).

### Raggio dei controlli

Un solo token, `--radius-field: 8px`, per bottoni, input, select e textarea. Vale ovunque: se un controllo ha un raggio diverso, è un errore.

Il valore precedente era `rounded-sm` descritto qui come "2px, look spigoloso". Due problemi: in Tailwind v4 `rounded-sm` vale **4px** (era 2px in v3), quindi i bottoni erano a 4px mentre gli input, stilizzati inline, stavano a 2px; e lo spigolo vivo su fondo quasi nero rendeva i campi duri, in tensione con la voce calda che PRODUCT.md chiede.

8px è il punto scelto: toglie la durezza senza avvicinarsi alla pill. **La pill resta riservata al dock in nav**, che è l'unico elemento completamente tondo della pagina. Se anche i controlli diventassero tondi il dock smetterebbe di essere riconoscibile, e viola più pill è la corsia app-wellness che PRODUCT.md vieta.

### Superficie dei campi

Input, select e textarea sono **superfici piene** (`--paper-2`) con hairline `--ink-15`, non box trasparenti con bordo. Su fondo quasi nero un rettangolo vuoto contornato legge come il wireframe di un campo; pieno legge come qualcosa in cui si scrive, e su telefono l'area toccabile si vede invece di essere dedotta.

Lo stile vive in un unico posto, la classe `.field-control` in `app/globals.css`, usata sia dai primitive `components/ui/` sia dal form contatti, così non possono più divergere.

- `dialog`
- `form`, `input`, `textarea`, `label`
- `select` (Radix-based, custom-styled)
- `dropdown-menu` — selettore lingua nav
- `toast` (Sonner)
- `theme-toggle` (custom, sun/moon icon)

### Sezioni (sotto `components/sections/`)

- `<Hero />` — server, full-bleed su foto, entrance in CSS
- `<Marquee />` — server, fascia keyword in loop fra hero e About
- `<About />` — server, ritratto sticky + rail credenziali
- `<Process />` — client, la timeline in quattro fasi (vedi sotto)
- `<Services />` — server, sticky stack in CSS pura
- `<CaseStories />` — client, rail orizzontale drag-to-pan
- `<Contact />` — client, form `react-hook-form` + zod
- `<Footer />` — server, wordmark al vivo

### `<Process />` — la sezione che giustifica il redesign

PRODUCT.md posiziona Alessia sulla **presenza**: c'è in ogni fase, non consegna una scheda e sparisce. Quattro card in griglia lo _dichiarano_; un binario che si percorre, con il suo ritratto che scende insieme al fill e una card che continua a nominare cosa sta facendo adesso, lo _dimostra_. Il layout è l'argomento, ed è la ragione per cui questa sezione esiste.

Divisione del lavoro, che va mantenuta: il fill del binario e l'avatar sono scritti in modo imperativo a ogni frame (solo `transform` e `height`); la fase attiva è state React e cambia al massimo tre volte in tutta la sezione. Non spostare la fase attiva dentro il frame loop.

### Superficie scura indipendente dal tema

`[data-surface='dark']` ridichiara i token dark su una sezione qualsiasi. Serve all'apertura (hero + marquee): la foto è uno still viola su quasi nero, e sotto tema light finirebbe slavata oppure con testo scuro su una lastra scura. Tenuta scura, l'apertura legge come una lastra editoriale a tutta pagina e il tema light mantiene i suoi rapporti di contrasto.

### Token derivati

`--paper-3` (superficie rialzata, campi form), `--ink-08` (inchiostro dei watermark) e `--accent-15` (wash di hover sulle CTA outline) sono definiti una volta sola come `color-mix` sui token base, così entrambi i temi li ereditano senza due blocchi in più.

### Nav (floating dock)

- **Layout**: pill floating centrato top, `top-4 md:top-6`, mai full-width. La topbar full-width letta come "preset 2018-2024"; il dock pill è il pattern atelier 2026 (Vercel/Linear/Raycast adjacent) e regge meglio il registro.
- **Desktop**: dock contiene logo "Alessia" (no sottotitolo — quello vive nell'hero), divider verticale hairline, anchor links inline, divider, lang switch, theme toggle.
- **Mobile**: dock compatto con logo + hamburger. Apertura via Drawer (Vaul) bottom-sheet 60vh con anchor links scalati, lang, theme toggle.
- **Surface**: `paper-2` con 72% opacity + backdrop-blur, border `ink-15`, soft shadow tinted ink.
- **Niente scroll-state behavior** (era pattern bg-toggle inutile dato che il dock floating ha sempre la sua surface).

---

## Motion

**Filosofia**: due momenti coreografati, tutto il resto stabile. Mai animazione decorativa diffusa.

### Momento 1 — Hero entrance

Stagger sequence al mount, una volta sola:

1. `0.0s` foto Alessia entra da destra (`x: 24px → 0`, `opacity: 0 → 1`, `scale: 1.02 → 1`)
2. `0.15s` headline Bricolage scala display rivelata via mask top-down (`clip-path: inset(100% 0 0 0) → inset(0 0 0 0)`)
3. `0.4s` sub-headline fade-in
4. `0.6s` CTA primaria fade + slight `y: 8px → 0`
5. `0.8s` underline brush-mark draw-in sotto headline

Ease: **ease-out-expo** `cubic-bezier(0.16, 1, 0.3, 1)`. Durata totale ~1.2s.

### Momento 2 — Underline draw-in on scroll

Le sottolineature `<Scribble />` sotto le H2 di About, Services, Stories, Contact si "disegnano" alla prima entrata in viewport. Animation gestita dal componente stesso via IntersectionObserver. Una volta per elemento, no replay.

### Smooth scroll

CSS native `html { scroll-behavior: smooth }` con `scroll-padding-top: 96px` per offset del dock floating. Disabilitato via `@media (prefers-reduced-motion)`. Lenis è stato rimosso: non intercettava i click anchor (i link saltavano comunque instant) e il wheel-inertia smoothing non era percepibile per giustificare il bundle weight.

### Micro-interactions

- **Button hover (desktop only)**: leggero `translateY(-1px)` + cambio `--accent → --accent-deep`, durata 150ms ease-out-quart.
- **Form input focus**: outline `2px solid var(--accent)` (viola) con offset 2px, NO ring shadow blur (look "marker pen", non "glow viola").
- **Link in-text hover**: underline gold che si disegna al hover (animation 300ms).
- **Theme toggle**: icona ruota 90° + crossfade 200ms.

### Cosa NON facciamo

- Niente parallax tilt (il parallax verticale su foto e watermark è ammesso: vedi sotto)
- Niente lettera-per-lettera sui titoli
- Niente bounce / spring / elastic
- Niente animazione su `width`, `height`, `top`, `left`, `padding`, `margin` (solo `transform`, `opacity`, `clip-path`, e `height` sul solo fill della timeline)
- Niente cursore custom, salvo il disco di `PointerTool` con le sue condizioni (vedi "Divieti rilasciati nel redesign v2")
- Niente magnetismo sulle CTA: sposta il bersaglio via da dove l'utente ha mirato
- Niente reveal sul form contatti. È l'unica cosa che la pagina deve far succedere e non può passare il primo secondo a `opacity: 0` in attesa di un IntersectionObserver.

### Un solo rAF

Progress bar, parallax e timeline girano tutti su `subscribeToScrollFrame` (`lib/scroll-frame.ts`): un loop, un set di subscriber, si ferma da solo quando l'ultimo se ne va. Loop separati significherebbero letture di layout in competizione ogni frame e altrettante occasioni di lasciarne uno acceso allo smontaggio.

### Lo stack dei servizi non sfuma

Le card dei servizi sono fogli opachi che si coprono a vicenda, senza fade, senza blur e senza JavaScript. Il mock sfumava e sfocava la card uscente, ma tutte le card dello stack stanno allo stesso offset: rendere translucida quella sotto significa **vederci attraverso**, e ci si ritrova il testo di due servizi sovrapposti. L'occlusione È l'effetto; la hairline in cima è ciò che la rende leggibile.

Le card hanno una `min-height` comune. Il testo dei servizi ha lunghezze diverse, e una card più corta che si ferma sopra una più lunga lascerebbe scoperta una striscia del servizio precedente.

Gli easing esponenziali vanno agganciati a una soglia (l'avatar della timeline si assesta sotto il mezzo pixel): un ease che insegue soltanto non arriva mai, e continua a scrivere transform per sempre su una pagina ferma.

### Reduced motion

`@media (prefers-reduced-motion: reduce)`:

- Tutte le `transition-duration` e `animation-duration` → `0.01ms !important`
- `scroll-behavior` torna a `auto` (no smooth)
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
- ❌ **Oro come riempimento** (MLM-trap)
- ❌ **Font handwritten / calligraphic** (mistico-trap)
- ❌ **Gradient viola → rosa** (acid lane / spiritual-femminile)
- ❌ **Cursore custom senza le condizioni di `PointerTool`** (`cursor: none` globale, dot, ring o torch). Distrugge l'affordance del puntatore per chi ha ipovisione o difficoltà motorie, e il "torch" è un glow viola di 520px agganciato al mouse. Fuori per accessibilità, non per gusto: l'unica eccezione è il disco descritto in "Divieti rilasciati nel redesign v2".
- ❌ **Opacity di gruppo che porta il testo sotto contrasto AA.** La timeline dimmava gli step inattivi a `opacity: .32`, che si moltiplica su ogni figlio: il body arrivava a 1.64:1 e il numerale a 1.52:1, e axe fa fallire la pagina. Lo stato si esprime con colore, dot e ring; il testo a schermo resta leggibile. `--ink-55` è il pavimento (~5.2:1 su paper-2).

### Divieti rilasciati nel redesign v2

Questi erano nella lista e sono stati tolti con decisione esplicita. Sono annotati qui perché la ragione per cui c'erano resta valida altrove.

- ✅ **Glow viola** — ammesso come _alone di stato_, non come atmosfera: ring 5px sul dot della fase attiva, ombra sotto l'avatar che scorre, `box-shadow` sul fill della timeline. Il divieto era scritto contro il glow sotto la headline e dietro le CTA (Twitch-trap), e lì vale ancora.
- ✅ **Gradient viola → oro** — ammesso su due elementi, entrambi larghi 2px e senza testo sopra: la progress bar e il fill della timeline. Il divieto era scritto contro gradient su titoli e riempimenti di CTA, e lì vale ancora.
- ✅ **Animazioni in loop continuo** — ammesse per marquee, `bob` dello scroll hint e `halo` dell'avatar. Obbligo che le accompagna: sotto `prefers-reduced-motion` si spengono con `animation: none`, mai con durata collassata (una durata di 0.01ms su un loop infinito lo riavvia centinaia di volte al secondo, che è peggio dell'animazione stessa). Il marquee si mette in pausa all'hover, perché una parola in movimento non è una parola leggibile.
- ✅ **Cursore custom**: ammesso solo come `PointerTool` (`components/primitives/pointer-tool.tsx`), tenuto per scelta nel redesign v2. Un disco viola di 12px che segue il puntatore, si allarga a 34px su ciò che si clicca e si apre in una pillola con etichetta su ciò che porta `data-cursor`. Il divieto era scritto contro un cursore che sparisce per chi ha ipovisione o difficoltà motorie, e le condizioni lo tengono vivo: il componente non esiste su puntatori non precisi (touch) né con `prefers-reduced-motion`, restituisce il cursore di sistema sopra i campi del form (caret e freccia del select sono informazione), e `cursor: none` è legato a `body[data-pointer-tool='on']`, attributo che il componente imposta al mount e toglie allo smontaggio: se il bundle non carica, il cursore di sistema c'è. Resta vietato il "torch", cioè un glow viola di 520px agganciato al mouse.

### Raggio: la pill non è più solo del dock

La regola precedente riservava la pill al dock in nav. Nel redesign v2 le due CTA primarie (hero e submit del form) sono pill con hairline accent: sono lo stesso oggetto in due punti della pagina e devono somigliarsi. Campi e controlli restano a `--radius-field` (8px).

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
