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
