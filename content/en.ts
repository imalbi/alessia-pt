import type { LucideIcon } from 'lucide-react';
import { Compass, HeartPulse, Users, Laptop } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  emphasis?: boolean;
}

export const services: Service[] = [
  {
    id: 'in-studio',
    title: 'In-studio personal training',
    description:
      'One-to-one sessions, initial assessment, programme built on the person. For those seeking presence, attention, and technically precise work.',
    icon: Compass,
    emphasis: true,
  },
  {
    id: 'recupero',
    title: 'Kinesiology & recovery',
    description:
      'Postural work and movement re-education. Chronic back pain, post-partum rehabilitation, post-sports-injury.',
    icon: HeartPulse,
  },
  {
    id: 'gruppo',
    title: 'Small-group training',
    description:
      'Small groups of 3-6 with similar goals. All the quality of individual work, shared.',
    icon: Users,
  },
  {
    id: 'online',
    title: 'Online personal training',
    description:
      'Remote programmes with form-check videos, weekly plans, check-ins. For those out of town or preferring flexibility.',
    icon: Laptop,
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
      'I came to Alessia with chronic back pain after my second pregnancy. Six months of focused work on core and posture, and today I play tennis with my kids without thinking about it.',
    name: 'Marta R.',
    age: 38,
    situation: 'chronic post-partum back pain',
    duration: '6 months',
  },
  {
    id: 'paolo',
    quote:
      'I had stopped running after a knee injury. Alessia rebuilt the movement starting from the basics: hip, ankle, control. Now I run 10 km a week without pain.',
    name: 'Paolo M.',
    age: 45,
    situation: 'post-injury recovery (knee)',
    duration: '4 months',
  },
  {
    id: 'sofia',
    quote:
      'I work eight hours at a computer and had neck pain and headaches almost every day. Three months of work on posture and spinal mobility, and the headaches have practically disappeared.',
    name: 'Sofia D.',
    age: 32,
    situation: 'neck pain from sedentary posture',
    duration: '3 months',
  },
];
