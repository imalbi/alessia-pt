# Product

## Register

brand

## Users

Visitatori potenziali clienti di Alessia, una professionista che opera tra **Personal Training** e **Chinesiologia** (laurea in Scienze Motorie). Profili tipici:

- **Adulti 30-55 anni** con esigenze di postura, recupero post-infortunio, mal di schiena cronico, riabilitazione post-parto, riacquisizione di mobilità.
- **Sportivi amatoriali** (corsa, tennis, sci) che cercano lavoro sulla forza funzionale e prevenzione infortuni.
- **Clienti online** (italiani all'estero, italiani in regioni senza accesso fisico al suo studio) cercando programmi remoti.
- **Pubblico bilingue**: italiano default, inglese per espatriati e turisti.

Contesto d'uso: principalmente **mobile**, spesso scoperti via Instagram, ricerca Google locale ("personal trainer + città", "chinesiologa + città"), o passaparola con un link condiviso. Tempo medio sulla landing: 30-90 secondi prima di decidere se contattare. Decisione guidata da fiducia (competenza percepita) e senso di "questa persona mi può aiutare davvero", non da prezzo o gimmick.

## Product Purpose

La landing è il primo punto di contatto digitale con Alessia. Deve fare **una sola cosa bene**: convincere un visitatore qualificato che lei è la professionista giusta, e portarlo a inviare un messaggio dal form contatti.

**Successo misurabile**:

- Form submission rate ≥3% delle visite (benchmark landing locale fascia alta)
- Bounce rate <50% mobile
- Tempo medio sulla pagina ≥45 secondi
- Lighthouse Performance ≥95 mobile

**Successo qualitativo (gate non-tecnico, verificato manualmente con Alessia)**:

- Nei primi 5 secondi il visitatore percepisce **competenza tecnica + presenza umana reale**, non aesthetic mood
- Alessia stessa, leggendo la landing, si riconosce nel tono e nel lessico — non legge un'identità "fittizia da template"

## Brand Personality

**Tre parole**: presente, precisa, fisica.

**Voce in prima persona** (Alessia parla, non un ghostwriter generico). Presenza senza performatività, precisione senza freddezza, fisicità senza esibizione.

**Lessico**: chinesiologia, postura, recupero, percorso, presenza, ascolto, forza, mobilità, metodo, scienze motorie. **Mai**: trasformazione, challenge, no excuses, lifestyle, wellness, armonia, equilibrio (vago), tonificare, "rimettersi in forma", "energia femminile", "il tuo viaggio interiore".

**Emozioni che la landing deve evocare**: affidamento ("posso fidarmi di lei"), riconoscimento ("parla la mia lingua, capisce il mio problema"), concretezza ("vedo come si lavora insieme").

**Tensione produttiva voce/visual**: la voce è calda e tecnica, il visual è scuro/saturato. Questo contrasto è identità — non è un bug. Una voce calda su un visual notturno legge come "atelier privato di sera, luce diretta sul lavoro" (= competenza che non ha bisogno di scintillare).

**Reference positivi** (mood, non copia — e MAI singolarmente, sempre incrociati):

- **Lululemon × Métier** — registro athletic-luxury, restraint sport-tecnico. Tipografia opinionata, niente fronzoli wellness, palette che commette.
- **Bottega Veneta sport** (campagne dopo Daniel Lee) — viola saturo come voce, nero profondo, oro come dettaglio raro mai dominante. Foto ferme, niente sorriso commerciale.
- **Notion Boost / On Running editorial** — pulizia tipografica + un colore committed che porta l'identità.

## Anti-references

Esplicitamente da NON sembrare. La lane nero/viola/oro è saturata in 2026 — la maggior parte dei siti che la occupano fanno schifo e dobbiamo evitare *attivamente* le quattro trappole AI-slop:

- **Mistico/spirituale-femminile**: cristalli, frasi tipo "energia divina femminile", luna/sole/zodiaco glifo, font calligrafici, gradient viola-rosa-oro come "aura". Posizionamento sbagliato: Alessia è scienze motorie, non una shaman.
- **Beauty MLM (Younique, MaryKay vibe)**: viola vivace + oro lucido glitter + foto donna primo piano patinata + copy tipo "diventa la versione migliore di te". Tipica trappola del lusso sintetico.
- **Crypto / NFT bro / tech dark**: viola neon + glow effects + grid futuristico + copy "the future of X". Wrong audience, wrong tone, wrong everything.
- **Twitch streamer / Discord bot landing**: viola Twitch piatto + nero pieno + accenti fluo + UI gaming. Visivamente nello stesso quadrante ma registro completamente fuori.
- **Landing fitness coach trasformazionale** stile Trainerize / "Coach App" SaaS. Pattern: hero coach in palestra con luci dure, call-out "Trasforma il tuo corpo in 12 settimane", before/after slider, CTA "Inizia ora!" su bottoni fluo. Invertirebbe il posizionamento.
- **Wellness yoga acquerello pastello**: palette tenue, foto meditazione su natura sfocata, handlettering frilly, copy "il tuo viaggio interiore". Sbagliato registro.
- **SaaS-cream Mindbody-style**: bianco panna + accenti tealino + UI prodotto SaaS. Tipico delle piattaforme aggregatrici, sbaglia totalmente registro per una professionista singola.
- **Personal trainer Behance/Dribbble preset**: design "fancy" magazine generico, glitch animations gratuite, big typography vuota, hero da agenzia creativa.

## Design Principles

1. **Foto reale prima di tutto.** Senza foto vere di Alessia il design è un costume. Tipografia, dettagli oro, palette sono condimento; la foto è la struttura. Se il giorno X non ci sono foto reali, il sito si lancia accettando consapevolmente che il MVP è ridotto.

2. **Ogni decorazione deve giustificarsi.** Se un dettaglio oro, un effetto, un'animazione non rinforza fiducia/competenza/presenza, esce. Niente animazione "perché fa fico", niente glow viola gratuito.

3. **Viola committed, oro raro, mai timido.** Il viola è la voce — porta superficie quando serve. L'oro è solo dettaglio (linee, focus, hairlines), MAI riempimento, MAI testo body. Se il visual sembra "dorato in giro", è sbagliato.

4. **Mobile-first nel pensiero, non solo nel layout.** La maggior parte arriva da Instagram link su iPhone in piedi alla fermata. Il primo viewport deve dire chi è e cosa fa, e il CTA al form deve essere raggiungibile col pollice senza scroll su iPhone SE.

5. **Due momenti coreografati, mai sei piccoli effetti.** Hero entrance + un dettaglio oro che si disegna sotto la headline. Tutto il resto stabile. Il rumore visivo diffuso indebolisce la sensazione di competenza.

6. **Dark default, light come courtesy.** Il dark è la voce vera del brand (richiesta esplicita dell'owner). Il light è disponibile via toggle per chi preferisce, ma il primo carico mostra l'identità nera/viola.

## Accessibility & Inclusion

- **Target**: WCAG 2.2 AA (Lighthouse Accessibility 100, axe nessun _serious_ o _critical_).
- **Reduced motion**: rispettato sempre. `prefers-reduced-motion: reduce` → durate animation a 0.01ms, no Lenis smooth scroll, hero entrance sostituita da fade istantaneo.
- **Contrasti**: minimo 4.5:1 per body, 3:1 per testo grande/UI. Verifica nel design system: `var(--ink)` su `var(--paper)` deve passare, idem `var(--accent)` (viola) su `var(--paper)` per CTA. **L'oro è ad uso esclusivamente decorativo (UI components 3:1)**: linee, hairlines, focus ring, mai testo leggibile.
- **Tastiera**: Tab order coerente (logico top-to-bottom), focus visibili (outline 2px `var(--accent)`).
- **Form**: label associate, errori validation accessibili (`aria-describedby`, `aria-invalid`), focus su primo errore al submit fallito.
- **Lingua**: `<html lang>` corretto per locale (`it`, `en`), hreflang.
- **Touch targets**: ≥44px per CTA e link nav (iOS HIG).
- **Considerazioni domain-specific**: il pubblico include persone con dolore cronico/problemi posturali — il design non deve essere fisicamente faticoso da consumare. Niente flashing, niente parallax pesanti, niente font sotto 16px su mobile.
