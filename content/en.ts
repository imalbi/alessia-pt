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
      'Postural work and movement re-education. Chronic back pain, post-partum, post-sports-injury.',
    mode: 'one-to-one · clinical',
  },
  {
    id: 'gruppo',
    title: 'Small-group training',
    description:
      'Small groups of 3-6 with similar goals. The quality of individual work, shared.',
    mode: '3-6 people',
  },
  {
    id: 'online',
    title: 'Online personal training',
    description:
      'Remote programmes with form-check videos, weekly plans, check-ins. For those out of town or preferring flexibility.',
    mode: 'remote',
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
