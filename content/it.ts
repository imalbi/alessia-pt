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
    title: 'Personal training in studio',
    description:
      'Sedute uno-a-uno, valutazione iniziale, programma costruito sulla persona. Indicato per chi cerca presenza, attenzione, e un lavoro tecnicamente preciso.',
    icon: Compass,
    emphasis: true,
  },
  {
    id: 'recupero',
    title: 'Chinesiologia e recupero',
    description:
      'Lavoro posturale e di rieducazione del movimento. Mal di schiena cronico, riabilitazione post-parto, post-infortunio sportivo.',
    icon: HeartPulse,
  },
  {
    id: 'gruppo',
    title: 'Allenamento di gruppo',
    description:
      'Piccoli gruppi di 3-6 persone con obiettivi simili. Tutta la qualità del lavoro individuale, condivisa.',
    icon: Users,
  },
  {
    id: 'online',
    title: 'Personal training online',
    description:
      'Programmi a distanza con video di controllo, schede settimanali, check-in. Per chi è fuori città o preferisce flessibilità.',
    icon: Laptop,
  },
];
