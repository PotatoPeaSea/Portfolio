import './Node.css';

interface NodeProps {
  x?: number;
  y?: number;
  label?: string;
  active?: boolean;
  className?: string;
}

/**
 * A solder-point / via / pin node on the PCB.
 */
export default function Node({
  label,
  active = false,
  className = '',
}: NodeProps) {
  return (
    <div className={`node ${active ? 'node--active' : ''} ${className}`}>
      <div className="node__dot" />
      <div className="node__ring" />
      {label && <span className="node__label silk-text">{label}</span>}
    </div>
  );
}
