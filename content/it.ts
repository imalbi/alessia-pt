export interface Service {
  id: string;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    id: 'in-studio',
    title: 'Personal training in studio',
    description:
      'Sedute uno-a-uno: valutazione iniziale di postura, mobilità, abitudini di movimento, e un programma costruito sulla persona, non sul template. Indicato per chi cerca presenza, attenzione e un lavoro tecnicamente preciso, da costruire nel tempo.',
  },
  {
    id: 'recupero',
    title: 'Chinesiologia e recupero',
    description:
      'Lavoro posturale e rieducazione del movimento. Mal di schiena cronico, post-parto, post-infortunio sportivo.',
  },
  {
    id: 'gruppo',
    title: 'Allenamento di gruppo',
    description:
      'Piccoli gruppi di 3-6 persone con obiettivi simili. La qualità del lavoro individuale, condivisa.',
  },
  {
    id: 'online',
    title: 'Personal training online',
    description:
      'Programmi a distanza con video, schede settimanali, check-in. Per chi è fuori città o preferisce flessibilità.',
  },
];

export interface CaseStory {
  id: string;
  quote: string;
  name: string;
  age: number;
  situation: string;
  duration: string;
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
  },
  {
    id: 'paolo',
    quote:
      'Avevo smesso di correre dopo un infortunio al ginocchio. Alessia ha rimesso insieme il movimento partendo dalle basi: anca, caviglia, controllo. Ora corro 10 km a settimana senza dolore.',
    name: 'Paolo M.',
    age: 45,
    situation: 'recupero post-infortunio (ginocchio)',
    duration: '4 mesi',
  },
  {
    id: 'sofia',
    quote:
      'Lavoro otto ore davanti al computer e avevo cervicale e mal di testa quasi ogni giorno. Tre mesi di lavoro su postura e mobilità della colonna, e i mal di testa sono praticamente spariti.',
    name: 'Sofia D.',
    age: 32,
    situation: 'cervicalgia da postura sedentaria',
    duration: '3 mesi',
  },
];
