'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// A module body runs once per bundle, so plugins register a single time no
// matter how many components import from here. `useGSAP` is registered too so
// it binds to this exact gsap instance (see @gsap/react's `useGSAP.register`).
gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };
