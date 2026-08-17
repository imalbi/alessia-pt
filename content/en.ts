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
    title: 'In-studio personal training',
    description:
      'One-to-one sessions: initial assessment of posture, mobility and movement habits, and a programme built on the person, never on a template. For those seeking presence, attention, and technically precise work to build over time.',
    mode: 'one-to-one · in studio',
  },
  {
    id: 'recupero',
    title: 'Kinesiology & recovery',
    description:
      'Postural work and movement re-education. Chronic back pain, post-partum, post-injury.',
    mode: 'one-to-one · clinical',
  },
  {
    id: 'gruppo',
    title: 'Small-group training',
    description: 'Small groups of 2-4 with similar goals. The quality of individual work, shared.',
    mode: '2-4 people',
  },
  {
    id: 'online',
    title: 'Online personal training',
    description:
      'Remote programmes with videos and weekly reports. For those out of town or preferring flexibility.',
    mode: 'remote',
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
    meta: 'about an hour · in studio · online',
    title: 'I assess you',
    body: 'Clinical history, posture, joint mobility, how you actually move. Skinfold and bioimpedance readings too, where they help. You leave knowing what your body is like: facts, not impressions.',
    presence: 'I listen, and I assess',
  },
  {
    id: 'percorso',
    num: '02',
    meta: 'within a few days',
    title: 'I write your programme',
    body: 'Goal, frequency, progression, and the criteria we will use together to tell whether it is working. Nothing copied from someone else: yours comes out of your assessment.',
    presence: 'I build it around you',
  },
  {
    id: 'allenamento',
    num: '03',
    meta: 'every session',
    title: 'I train you',
    body: 'We work. I watch, correct, and adjust the load in real time; you learn the movement and take it with you. Moving well stays yours even on the days I am not there.',
    presence: 'I correct you, session by session',
  },
  {
    id: 'verifica',
    num: '04',
    meta: 'every 4-8 weeks',
    title: 'We reassess',
    body: 'We run the first assessment again and see what has changed. If something has not moved, I change the programme, not the person. If it has, we raise the bar together.',
    presence: 'I keep track of you',
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
      'I came to Alessia with chronic back pain after my second pregnancy. Six months of focused work on core and posture, and today I play tennis with my kids without thinking about it.',
    name: 'Marta R.',
    age: 38,
    situation: 'chronic post-partum back pain',
    duration: '6 months',
    months: 6,
  },
  {
    id: 'paolo',
    quote:
      'I had stopped running after a knee injury. Alessia rebuilt the movement starting from the basics: hip, ankle, control. Now I run 10 km a week without pain.',
    name: 'Paolo M.',
    age: 45,
    situation: 'post-injury recovery (knee)',
    duration: '4 months',
    months: 4,
  },
  {
    id: 'sofia',
    quote:
      'I work eight hours at a computer and had neck pain and headaches almost every day. Three months of work on posture and spinal mobility, and the headaches have practically disappeared.',
    name: 'Sofia D.',
    age: 32,
    situation: 'neck pain from sedentary posture',
    duration: '3 months',
    months: 3,
  },
];
