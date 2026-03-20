export interface ProjectLink {
  label: string;
  url: string;
}

export type ChipVariant = 'ic' | 'capacitor' | 'resistor' | 'led' | 'connector' | 'round-display' | 'rect-display' | 'rotary-encoder' | 'adc' | 'mems-mic' | 'stepper' | 'arducam';

export interface Project {
  id: string;
  name: string;
  partNumber: string;
  description: string;
  techStack: string[];
  image?: string;
  links?: ProjectLink[];
  chipVariant: ChipVariant;
  /** SPI connection to MCU (only for certain projects) */
  spiConnection?: boolean;
  /** Optional award text to display as a badge */
  award?: string;
}

import telebuddyImg from '../assets/telebuddy.jpg';
import arducamImg from '../assets/Arducam.png';
import hudsonImg from '../assets/HUDson.jpg';
import ecoDepotImg from '../assets/ECODEPOT.jpg';

// ─── Projects — replace with your own ───
export const projects: Project[] = [
  {
    id: 'proj-001',
    name: 'Pseudo Vinyl MP3',
    partNumber: 'PV-ESP32-001',
    description: 'A retro-styled MP3 player built on ESP32-S3 with a circular GC9A01 display, rotary encoder input, and PCM5102 DAC output. Features a vinyl-themed GUI.',
    techStack: ['C++', 'ESP-IDF', 'LVGL', 'PCM5102'],
    chipVariant: 'round-display',
    spiConnection: true,
    links: [{ label: 'GitHub', url: 'https://github.com/PotatoPeaSea/Pseudo-Vinyl-MP3-Player' }],
  },
  {
    id: 'proj-002',
    name: 'Arducam Test Automation',
    partNumber: 'BK-QT-002',
    description: 'A Qt-based desktop application for controlling ArduCam cameras. Features a bakeout wizard, firmware update integration, and serial command queue visualization.',
    techStack: ['C++', 'Qt/QML', 'ArduCam', 'Serial'],
    image: arducamImg,
    chipVariant: 'arducam',
    spiConnection: true,
    links: [{ label: 'GitHub', url: 'https://github.com/PotatoPeaSea/Payload-Arducam-Bakeout-Test-Automation-UI' }],
  },
  {
    id: 'proj-003',
    name: 'Telebuddy',
    partNumber: 'TB-ROB-003',
    description: 'A solution to shaky soldering. A 3D-printed 6-DOF robotic arm to mimic a 3D-printed pen controller in real-time. By applying an EMA filter to remove human tremors, it turns a shaky hand into surgeon-like precision. It also features an AR mode for virtual soldering practice.',
    techStack: ['Python', 'Ursina', 'ESP32', 'Robotics'],
    image: telebuddyImg,
    chipVariant: 'rotary-encoder',
    award: '1st Place @ UBC Hack the Coast',
    links: [
      { label: 'GitHub', url: 'https://github.com/PotatoPeaSea/TeleBuddy' },
      { label: 'Devpost', url: 'https://devpost.com/software/park-e-rmejf2' }
    ],
  },
  {
    id: 'proj-004',
    name: 'HUDson',
    partNumber: 'HD-AR-004',
    description: 'A wearable system that visualizes sound for those with hearing loss. Uses ESP32 microcontrollers, AR glasses, and a vibrating wristband to provide visual and tactile audio feedback in 3D space.',
    techStack: ['C++', 'Python', 'ESP32', 'Kotlin', '3D Printing'],
    image: hudsonImg,
    chipVariant: 'mems-mic',
    award: 'Overall Winner @ nwHacks',
    links: [{ label: 'Devpost', url: 'https://devpost.com/software/hudson-uw5kn7' }],
  },
  {
    id: 'proj-005',
    name: 'EcoDepot',
    partNumber: 'ED-ML-005',
    description: 'A smart recycling bin that sorts recyclables using computer vision and TensorFlow. Features a Next.js dashboard with student ID authentication to provide monetary returns for deposited bottles.',
    techStack: ['React', 'Next.js', 'Python', 'TensorFlow', 'C++', 'Arduino'],
    image: ecoDepotImg,
    chipVariant: 'stepper',
    award: 'Winner @ StormHacks',
    links: [
      { label: 'GitHub', url: 'https://github.com/iancdev/recycle-sorter' },
      { label: 'Devpost', url: 'https://devpost.com/software/ecodepot' }
    ],
  },
];
