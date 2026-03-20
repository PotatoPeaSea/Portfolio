import './MemoryBus.css';

interface MemoryBusProps {
  className?: string;
}

const contactInfo = [
  { label: 'Email', value: 'matthewmoxuanlin@gmail.com', href: 'mailto:matthewmoxuanlin@gmail.com', icon: '✉' },
  { label: 'GitHub', value: 'PotatoPeaSea', href: 'https://github.com/PotatoPeaSea', icon: '⌘' },
  { label: 'LinkedIn', value: 'Matthew Lin', href: 'https://www.linkedin.com/in/matthew-lin-0167462b9/', icon: '◈' },
];

export default function MemoryBus({ className = '' }: MemoryBusProps) {
  return (
    <div className={`memory-bus ${className}`}>
      {/* Silk label */}
      <span className="memory-bus__label silk-text">U5 — COMM MODULE</span>

      {/* Permanently visible contact info box */}
      <div className="memory-bus__contact-box">
        {/* Top Pins */}
        <div className="memory-bus__pins memory-bus__pins--top">
          {Array.from({ length: 8 }).map((_, i) => <div key={i} className="memory-bus__pin" />)}
        </div>

        <div className="memory-bus__contact-header">
          <span className="silk-text">CONTACT INFO</span>
        </div>

        <div className="memory-bus__contact-list">
          {contactInfo.map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="memory-bus__contact-item"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="memory-bus__contact-icon">{c.icon}</span>
              <div className="memory-bus__contact-info">
                <span className="memory-bus__contact-label silk-text">{c.label}</span>
                <span className="memory-bus__contact-value">{c.value}</span>
              </div>
              <span className="memory-bus__contact-arrow">→</span>
            </a>
          ))}
        </div>

        <div className="memory-bus__contact-hint silk-text">
          LINK ACTIVE
        </div>

        {/* Bottom Pins */}
        <div className="memory-bus__pins memory-bus__pins--bottom">
          {Array.from({ length: 8 }).map((_, i) => <div key={i} className="memory-bus__pin" />)}
        </div>
      </div>
    </div>
  );
}
