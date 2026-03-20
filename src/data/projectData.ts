export interface ProjectLink {
  label: string;
  url: string;
}

export type ChipVariant = 'ic' | 'capacitor' | 'resistor' | 'led' | 'connector' | 'round-display' | 'rect-display' | 'rotary-encoder' | 'adc';

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
    name: 'Bakeout CLI',
    partNumber: 'BK-QT-002',
    description: 'A Qt-based desktop application for controlling ArduCam cameras. Features a bakeout wizard, firmware update integration, and serial command queue visualization.',
    techStack: ['C++', 'Qt/QML', 'ArduCam', 'Serial'],
    chipVariant: 'rect-display',
    spiConnection: true,
    links: [{ label: 'GitHub', url: 'https://github.com/PotatoPeaSea/Payload-Arducam-Bakeout-Test-Automation-UI' }],
  },
  {
    id: 'proj-003',
    name: 'Telebuddy',
    partNumber: 'TB-ROB-003',
    description: 'A solution to shaky soldering. A 3D-printed 6-DOF robotic arm to mimic a 3D-printed pen controller in real-time. By applying an EMA filter to remove human tremors, it turns a shaky hand into surgeon-like precision. It also features an AR mode for virtual soldering practice.',
    techStack: ['Python', 'Ursina', 'ESP32', 'Robotics'],
    chipVariant: 'rotary-encoder',
    award: '1st Place @ UBC Hack the Coast',
    links: [
      { label: 'GitHub', url: 'https://github.com/PotatoPeaSea/TeleBuddy' },
      { label: 'Devpost', url: 'https://devpost.com/software/park-e-rmejf2' }
    ],
  },
  {
    id: 'proj-004',
    name: 'Poker Night',
    partNumber: 'PK-JS-004',
    description: 'A fully playable web-based Texas Hold\'em poker game with 3 AI opponents, chip animations, and a premium casino-style dark theme.',
    techStack: ['JavaScript', 'HTML/CSS', 'Canvas'],
    chipVariant: 'led',
    links: [{ label: 'Play', url: '#' }],
  },
  {
    id: 'proj-005',
    name: 'Poker Tracker',
    partNumber: 'PT-FS-005',
    description: 'A session-based poker tracking app with player profiles, leaderboards, and aggregated statistics across sessions.',
    techStack: ['React', 'Firebase', 'TypeScript'],
    chipVariant: 'capacitor',
    links: [{ label: 'GitHub', url: '#' }],
  },
  {
    id: 'proj-006',
    name: 'PCB Portfolio',
    partNumber: 'WB-RE-006',
    description: 'This very website — a PCB-themed interactive portfolio built with React and TypeScript, where each project is a circuit component.',
    techStack: ['React', 'TypeScript', 'Vite', 'CSS'],
    chipVariant: 'adc',
    links: [{ label: 'Source', url: '#' }],
  },
];
