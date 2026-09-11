import { SITE_NAME, STUDIO_LOCALITY, STUDIO_REGION } from '@/i18n/metadata';

/**
 * The policy text as markdown, inlined rather than read from disk.
 *
 * It used to live in two .md files loaded with `readFileSync(process.cwd() +
 * ...)` at render time. That works locally and returns 500 on Workers: the
 * deployed bundle is one JS file plus static assets, and there is no repo
 * directory behind `process.cwd()` to read the files back out of. Both privacy
 * routes were dead in production for the whole life of the deploy.
 *
 * The controller's identity comes from the same constants the metadata and the
 * footer use, so her name and town cannot say one thing in the JSON-LD graph
 * and another in the legal text.
 */

/** Shown only once she has one: an empty row reads worse than no row. */
const VAT = process.env.NEXT_PUBLIC_VAT_NUMBER;

/**
 * The public address, when there is one. Until then the contact form is the
 * channel for exercising rights: it reaches her today, it is on this same site
 * and it costs the visitor no third-party account. Naming an address she has
 * not given us would be the one lie a privacy policy cannot afford.
 */
const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

/**
 * Kept in step with the beacon in the layout: with analytics off, claiming it
 * is a false statement, and with analytics on, omitting it is a missing one.
 */
const ANALYTICS = Boolean(process.env.NEXT_PUBLIC_CF_BEACON);

const CONTROLLER = `${SITE_NAME}, ${STUDIO_LOCALITY} (${STUDIO_REGION})`;

/**
 * The processor list under "chi altro li vede" is written by hand rather than
 * derived from the env, because the env cannot answer the question here. The
 * email path is a runtime secret on the Worker, absent at build time, so a
 * conditional would render "no email provider" on every build regardless of the
 * truth. Today the form reaches her on Telegram only; whoever sets
 * RESEND_API_KEY has to add the bullet back, and .env.example says so.
 */

function it(): string {
  return `# Informativa privacy

Ultimo aggiornamento: 19 agosto 2026.

## Chi tratta i tuoi dati

${CONTROLLER}${VAT ? `, P.IVA ${VAT}` : ''}. Sono io, non c'è una società dietro.
${EMAIL ? `Per qualsiasi richiesta scrivimi a [${EMAIL}](mailto:${EMAIL}).` : 'Per qualsiasi richiesta usa il modulo di contatto di questo sito.'}

## Cosa raccolgo

Solo quello che scrivi nel modulo di contatto: nome, indirizzo email, il telefono se lo lasci, l'obiettivo se lo selezioni e il messaggio. Nient'altro. Non c'è un account da creare, non compro liste di contatti, non c'è pubblicità.

## Perché

Per risponderti. Non ti iscrivo a nessuna newsletter, non faccio profilazione, non passo i tuoi dati a nessuno per scopi commerciali.

La base giuridica è il consenso che dai spuntando la casella prima di inviare. Puoi revocarlo quando vuoi, e vale come una richiesta di cancellazione.

## Sulla salute, meglio non scrivere qui

Il modulo non ti chiede niente sulla tua salute, e ti chiedo di non scriverne: di dolori, infortuni o diagnosi parliamo di persona, alla prima seduta, dove posso anche capirci qualcosa. Se decidi comunque di accennarne nel messaggio, quelle righe le leggo solo per risponderti e le cancello insieme al resto.

## Per quanto tempo li tengo

Ventiquattro mesi dall'ultimo contatto, poi cancello il messaggio dalla chat Telegram, che è l'unico posto in cui finisce. Se mi chiedi di cancellarlo prima, lo cancello.

## Chi altro li vede

Nessuno, oltre a me. Il messaggio attraversa solo i servizi che me lo recapitano:

- **Telegram** (Telegram FZ LLC, Emirati Arabi Uniti), che me lo notifica sul telefono.
- **Cloudflare**, che ospita il sito e serve queste pagine.

## Cookie e statistiche

Niente cookie di profilazione, e infatti niente banner da chiudere. Il sito salva due cose sole, tecniche entrambe e per questo esenti da consenso: un cookie con la lingua che stai leggendo e, nel tuo browser, il tema chiaro o scuro che hai scelto. Cloudflare può aggiungere un proprio cookie tecnico anti-bot (\`__cf_bm\`).

Quando invii il modulo, il tuo indirizzo IP viene letto sul momento per impedire invii ripetuti a raffica, e non viene conservato.

${
  ANALYTICS
    ? 'Per le visite uso Cloudflare Web Analytics, che non usa cookie, non ti identifica e non ti segue da un sito a un altro.'
    : 'Non uso servizi di statistiche: non so quante persone leggono questa pagina, e va benissimo così.'
}

## I tuoi diritti

Puoi chiedermi di vedere i dati che ho su di te, correggerli, cancellarli, limitarne l'uso o revocare il consenso: ${EMAIL ? `scrivi a [${EMAIL}](mailto:${EMAIL})` : 'scrivimi dal modulo di contatto'} e rispondo entro trenta giorni. Se qualcosa non ti torna, puoi rivolgerti al [Garante per la protezione dei dati personali](https://www.garanteprivacy.it).
`;
}

export function privacyMarkdown(): string {
  return it();
}
