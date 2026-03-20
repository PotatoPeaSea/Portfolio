import './Trace.css';

interface TraceProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  animated?: boolean;
  className?: string;
}

/**
 * Renders an SVG trace (circuit connection line) between two points.
 * Uses right-angle routing like real PCB traces.
 */
export default function Trace({
  x1,
  y1,
  x2,
  y2,
  color,
  animated = true,
  className = '',
}: TraceProps) {
  // Right-angle routing: go horizontal first, then vertical
  const midX = x1 + (x2 - x1) * 0.5;
  const path = `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`;

  const strokeColor = color || 'var(--trace-copper)';
  const filterId = `glow-${x1}-${y1}-${x2}-${y2}`;

  return (
    <g className={`trace ${animated ? 'trace--animated' : ''} ${className}`}>
      {/* Glow filter */}
      <defs>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background trace (wider, dimmer) */}
      <path
        d={path}
        fill="none"
        stroke={strokeColor}
        strokeWidth="4"
        strokeOpacity="0.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Main trace */}
      <path
        d={path}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#${filterId})`}
        className="trace__line"
      />
    </g>
  );
}
