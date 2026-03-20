import './Microcontroller.css';

/**
 * Small QFP-style microcontroller IC at the centre of the projects section.
 * Has an antenna receiver and connects to all project chips.
 */
export default function Microcontroller({ className = '' }: { className?: string }) {
  const pinsPerSide = 10;
  const pins = Array.from({ length: pinsPerSide });

  return (
    <div className={`mcu ${className}`}>

      {/* Silk label */}
      <span className="mcu__silk silk-text">U4 — PERIPHERAL MCU</span>

      {/* QFP body */}
      <div className="mcu__package">
        {/* Top pins */}
        <div className="mcu__pins mcu__pins--top">
          {pins.map((_, i) => <div key={i} id={`mcu-pin-top-${i}`} className="mcu__pin" />)}
        </div>

        <div className="mcu__middle">
          {/* Left pins */}
          <div className="mcu__pins mcu__pins--left">
            {pins.map((_, i) => <div key={i} id={`mcu-pin-left-${i}`} className="mcu__pin" />)}
          </div>

          {/* IC body */}
          <div className="mcu__body">
            <div className="mcu__notch" />
            <span className="mcu__label">MCU</span>
            <span className="mcu__part silk-text">ATMega328P</span>
            <span className="mcu__sub silk-text">PROJECTS</span>
          </div>

          {/* Right pins */}
          <div className="mcu__pins mcu__pins--right">
            {pins.map((_, i) => <div key={i} id={`mcu-pin-right-${i}`} className="mcu__pin" />)}
          </div>
        </div>

        {/* Bottom pins */}
        <div className="mcu__pins mcu__pins--bottom">
          {pins.map((_, i) => <div key={i} id={`mcu-pin-bottom-${i}`} className="mcu__pin" />)}
        </div>
      </div>
    </div>
  );
}
