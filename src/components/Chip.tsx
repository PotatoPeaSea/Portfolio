import { type ReactNode } from 'react';
import './Chip.css';

export type ChipSize = 'lg' | 'md' | 'sm';
export type PackageType = 'DIP' | 'QFP' | 'DIMM';

interface ChipProps {
  title: string;
  partNumber?: string;
  variant?: string;       // CPU, RAM, ROM, GPU, etc.
  pinCount?: number;
  size?: ChipSize;
  packageType?: PackageType;
  children?: ReactNode;
  className?: string;
  id?: string;
}

export default function Chip({
  title,
  partNumber,
  variant = 'IC',
  pinCount = 8,
  size = 'md',
  packageType = 'DIP',
  children,
  className = '',
  id,
}: ChipProps) {
  // Calculate pins based on package type
  const isQFP = packageType === 'QFP';
  const isDIMM = packageType === 'DIMM';

  // For DIP: 2 sides. For QFP: 4 sides. For DIMM: 1 edge (bottom)
  const sides = isQFP ? 4 : isDIMM ? 1 : 2;
  const pinsPerSide = Math.ceil(pinCount / sides);
  
  const renderPins = (prefix: string, count: number) => (
    <div className={`chip__pins chip__pins--${prefix}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="chip__pin">
          <span className="chip__pin-pad" />
        </div>
      ))}
    </div>
  );

  return (
    <div className={`chip chip--${size} chip--${packageType.toLowerCase()} ${className}`} id={id}>
      {/* Notch or Pin 1 marker */}
      <div className={`chip__notch chip__notch--${packageType.toLowerCase()}`} />

      {/* Top pins (QFP only) */}
      {isQFP && renderPins('top', pinsPerSide)}

      <div className="chip__middle-row">
        {/* Left pins (DIP & QFP) */}
        {!isDIMM && renderPins('left', pinsPerSide)}

        {/* Body */}
        <div className="chip__body">
          <span className="chip__variant silk-text">{variant}</span>
          <h2 className="chip__title">{title}</h2>
          {partNumber && (
            <span className="chip__part-number silk-text">{partNumber}</span>
          )}
          <div className="chip__content">{children}</div>
        </div>

        {/* Right pins (DIP & QFP) */}
        {!isDIMM && renderPins('right', pinsPerSide)}
      </div>

      {/* Bottom pins (QFP and DIMM) */}
      {(isQFP || isDIMM) && renderPins('bottom', pinsPerSide)}
    </div>
  );
}
