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

**Tre parole**: calda, precisa, fisica.

**Voce in prima persona** (Alessia parla, non un ghostwriter generico). Calore senza dolcezza, precisione senza freddezza, fisicità senza performatività.

**Lessico**: chinesiologia, postura, recupero, percorso, presenza, ascolto, forza, mobilità, metodo, scienze motorie. **Mai**: trasformazione, challenge, no excuses, lifestyle, wellness, armonia, equilibrio (vago), tonificare, "rimettersi in forma".

**Emozioni che la landing deve evocare**: affidamento ("posso fidarmi di lei"), riconoscimento ("parla la mia lingua, capisce il mio problema"), concretezza ("vedo come si lavora insieme").

**Reference positivi** (mood, non copia):

- **Aesop** — warm editorial, fisicità tattile, parole curate, calore asciutto. La landing dovrebbe avere lo stesso "respiro" tipografico e la stessa fiducia non-urlata.
- **The Movement Lab** (studio fisioterapia high-end UK) — registro professionale-tecnico applicato al body work, rispetto per la disciplina, niente body-comparison gratuito.

## Anti-references

Esplicitamente da NON sembrare:

- **Landing fitness coach trasformazionale** stile Trainerize / "Coach App" SaaS. Pattern tipico: hero foto del coach in palestra con luci dure, call-out tipo "Trasforma il tuo corpo in 12 settimane", before/after slider come elemento centrale, tab di pricing aggressivi, CTA "Inizia ora!" su bottoni rossi/arancio fluo. Tutto questo **invertirebbe il posizionamento**: Alessia non è un fitness coach trasformazionale.
- **Wellness yoga acquerello rosa cipria**: palette pastel, foto donna in posizione di meditazione su sfondo natura sfocato, tipografia handlettering frilly, copy tipo "il tuo viaggio interiore". Sbagliato registro: Alessia è una professionista delle scienze motorie, non una guida spirituale generica.
- **SaaS-cream Mindbody-style**: bianco panna + accenti tealino + foto stock di donne sorridenti in palestra moderna + UI da prodotto SaaS (modali, dropdown, toast). Tipico delle piattaforme aggregatrici, sbaglia totalmente registro per una professionista singola.
- **Personal trainer Behance/Dribbble preset**: design "fancy" con layout magazine generico ma senza sostanza, glitch animations gratuite, big typography vuota, hero section da agenzia creativa.

## Design Principles

1. **Foto reale prima di tutto.** Senza foto vere di Alessia il design è un costume. Tipografia, scribbles, paper grain sono condimento; la foto è la struttura. Se il giorno X non ci sono foto reali, il sito si lancia accettando consapevolmente che il MVP è ridotto.

2. **Ogni decorazione deve giustificarsi.** Se uno scribble, un effetto, un'animazione non rinforza fiducia/competenza/presenza, esce. Niente animazione "perché fa fico".

3. **Calore senza dolcezza.** Palette warm terracotta, ma niente lessico vago, niente promesse, niente "il tuo viaggio". La voce è quella di una professionista che spiega cosa fa con precisione.

4. **Mobile-first nel pensiero, non solo nel layout.** La maggior parte arriva da Instagram link su iPhone in piedi alla fermata. Il primo viewport deve dire chi è e cosa fa, e il CTA al form deve essere raggiungibile col pollice senza scroll su iPhone SE.

5. **Due momenti coreografati, mai sei piccoli effetti.** Hero entrance + scribble draw-in. Tutto il resto stabile. Il rumore visivo diffuso indebolisce la sensazione di competenza.

## Accessibility & Inclusion

- **Target**: WCAG 2.2 AA (Lighthouse Accessibility 100, axe nessun _serious_ o _critical_).
- **Reduced motion**: rispettato sempre. `prefers-reduced-motion: reduce` → durate animation a 0.01ms, no Lenis smooth scroll, hero entrance sostituita da fade istantaneo.
- **Contrasti**: minimo 4.5:1 per body, 3:1 per testo grande. Verifica nel design system: `var(--ink)` su `var(--paper)` deve passare, idem `var(--accent)` su `var(--paper)` per CTA.
- **Tastiera**: Tab order coerente (logico top-to-bottom), focus visibili (outline 2px `var(--accent)`).
- **Form**: label associate, errori validation accessibili (`aria-describedby`, `aria-invalid`), focus su primo errore al submit fallito.
- **Lingua**: `<html lang>` corretto per locale (`it`, `en`), hreflang.
- **Touch targets**: ≥44px per CTA e link nav (iOS HIG).
- **Considerazioni domain-specific**: il pubblico include persone con dolore cronico/problemi posturali — il design non deve essere fisicamente faticoso da consumare. Niente flashing, niente parallax pesanti, niente font sotto 16px su mobile.
