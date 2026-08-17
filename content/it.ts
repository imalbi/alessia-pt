export interface Service {
  id: string;
  title: string;
  description: string;
  /** Delivery format, shown opposite the numeral on the presence scale. */
  mode: string;
}

export const services: Service[] = [
  {
    id: 'in-studio',
    title: 'Personal training in studio',
    description:
      'Sedute uno-a-uno: valutazione iniziale di postura, mobilità, abitudini di movimento e un programma costruito sulla persona, non sul template. Indicato per chi cerca presenza, attenzione e un lavoro tecnicamente preciso da costruire nel tempo.',
    mode: 'uno-a-uno · in studio',
  },
  {
    id: 'recupero',
    title: 'Chinesiologia e recupero',
    description:
      'Lavoro posturale e rieducazione del movimento. Mal di schiena cronico, post-parto, post-infortunio.',
    mode: 'uno-a-uno · clinico',
  },
  {
    id: 'gruppo',
    title: 'Allenamento di gruppo',
    description:
      'Piccoli gruppi di 2-4 persone con obiettivi simili. La qualità del lavoro individuale ma condivisa.',
    mode: '2-4 persone',
  },
  {
    id: 'online',
    title: 'Personal training online',
    description:
      'Programmi a distanza con video e report settimanali. Per chi è fuori città o preferisce flessibilità.',
    mode: 'a distanza',
  },
];

export interface ProcessStep {
  id: string;
  /** Displayed numeral, kept as a string so "01" survives. */
  num: string;
  /** When this phase happens, shown in the mono meta line. */
  meta: string;
  title: string;
  body: string;
  /** What Alessia is doing in this phase. Drives the live card on the rail. */
  presence: string;
}

export const processSteps: ProcessStep[] = [
  {
    id: 'valutazione',
    num: '01',
    meta: 'circa un’ora · in studio · online',
    title: 'Ti valuto',
    body: 'Storia clinica, postura, mobilità articolare, come ti muovi davvero. Se serve anche plicometria e bioimpedenza. Esci sapendo com’è il tuo corpo: fatti, non impressioni.',
    presence: 'Ti ascolto e ti valuto',
  },
  {
    id: 'percorso',
    num: '02',
    meta: 'entro pochi giorni',
    title: 'Ti scrivo il percorso',
    body: 'Obiettivo, frequenza, progressione e i criteri con cui capiremo insieme se sta funzionando. Nessun programma copiato da qualcun altro: il tuo nasce dalla tua valutazione.',
    presence: 'Lo costruisco su di te',
  },
  {
    id: 'allenamento',
    num: '03',
    meta: 'ogni seduta',
    title: 'Ti alleno',
    body: 'Ci lavoriamo. Io guardo, correggo, aggiusto il carico in tempo reale; tu impari il gesto e te lo porti via. Il modo giusto di muoverti resta tuo anche quando non ci sono.',
    presence: 'Ti correggo, seduta per seduta',
  },
  {
    id: 'verifica',
    num: '04',
    meta: 'ogni 4-8 settimane',
    title: 'Rivalutiamo',
    body: 'Rifacciamo la valutazione dell’inizio e vediamo cosa è cambiato. Se qualcosa non si muove cambio il programma, non la persona. E se si muove alziamo l’asticella insieme.',
    presence: 'Non ti perdo di vista',
  },
];

export interface CaseStory {
  id: string;
  quote: string;
  name: string;
  age: number;
  situation: string;
  duration: string;
  /** Duration in months. Drives the proportional bar length. */
  months: number;
}

export const caseStories: CaseStory[] = [
  {
    id: 'marta',
    quote:
      'Ero arrivata da Alessia con un mal di schiena cronico dopo il secondo parto. Sei mesi di lavoro mirato sul core e sulla postura, e oggi gioco a tennis con i miei figli senza pensarci.',
    name: 'Marta R.',
    age: 38,
    situation: 'mal di schiena cronico post-parto',
    duration: '6 mesi',
    months: 6,
  },
  {
    id: 'paolo',
    quote:
      'Avevo smesso di correre dopo un infortunio al ginocchio. Alessia ha rimesso insieme il movimento partendo dalle basi: anca, caviglia, controllo. Ora corro 10 km a settimana senza dolore.',
    name: 'Paolo M.',
    age: 45,
    situation: 'recupero post-infortunio (ginocchio)',
    duration: '4 mesi',
    months: 4,
  },
  {
    id: 'sofia',
    quote:
      'Lavoro otto ore davanti al computer e avevo cervicale e mal di testa quasi ogni giorno. Tre mesi di lavoro su postura e mobilità della colonna, e i mal di testa sono praticamente spariti.',
    name: 'Sofia D.',
    age: 32,
    situation: 'cervicalgia da postura sedentaria',
    duration: '3 mesi',
    months: 3,
  },
];
