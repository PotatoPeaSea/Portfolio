import './Antenna.css';

/**
 * SVG antenna with animated RF signal arcs.
 * Attaches visually to the CPU chip.
 */
export default function Antenna({ className = '' }: { className?: string }) {
  return (
    <div className={`antenna ${className}`}>
      {/* Antenna mast */}
      <div className="antenna__mast">
        <div className="antenna__base" />
        <div className="antenna__rod" />
        <div className="antenna__tip" />
      </div>

      {/* RF signal arcs */}
      <div className="antenna__signals">
        <div className="antenna__arc antenna__arc--1" />
        <div className="antenna__arc antenna__arc--2" />
        <div className="antenna__arc antenna__arc--3" />
      </div>

      {/* Silk label */}
      <span className="antenna__label silk-text">RF-TX</span>
    </div>
  );
}
