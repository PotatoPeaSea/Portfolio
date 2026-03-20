import { useState } from 'react';
import './MemoryBus.css';

interface MemoryBusProps {
  className?: string;
}

const contactInfo = [
  { label: 'Email', value: 'matthewmoxuanlin@gmail.com', href: 'mailto:matthewmoxuanlin@gmail.com', icon: '✉' },
  { label: 'GitHub', value: 'PotatoPeaSea', href: 'https://github.com/PotatoPeaSea', icon: '⌘' },
  { label: 'LinkedIn', value: 'Matthew Lin', href: 'https://linkedin.com/in/matthew-lin-016746269', icon: '◈' },
];

const busLines = ['D0', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'A0', 'A1', 'A2', 'A3', 'CLK', 'R/W', 'CS', 'GND'];

export default function MemoryBus({ className = '' }: MemoryBusProps) {
  const [showContact, setShowContact] = useState(false);

  return (
    <div className={`memory-bus ${className}`}>
      {/* Silk label */}
      <span className="memory-bus__label silk-text">MEMORY BUS — 16-BIT</span>

      {/* Bus body - clickable */}
      <div
        className={`memory-bus__body ${showContact ? 'memory-bus__body--active' : ''}`}
        onClick={() => setShowContact(!showContact)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setShowContact(!showContact)}
        title="Click to reveal contact info"
      >
        {/* Bus lines */}
        <div className="memory-bus__lines">
          {busLines.map((line) => (
            <div key={line} className="memory-bus__line">
              <div className="memory-bus__wire" />
              <span className="memory-bus__wire-label silk-text">{line}</span>
            </div>
          ))}
        </div>

        {/* Bus bracket markers */}
        <div className="memory-bus__bracket memory-bus__bracket--top" />
        <div className="memory-bus__bracket memory-bus__bracket--bottom" />
      </div>

      {/* Contact info overlay */}
      {showContact && (
        <div className="memory-bus__contact" onClick={(e) => e.stopPropagation()}>
          <div className="memory-bus__contact-header">
            <span className="silk-text">CONTACT — DATA SHEET</span>
            <button className="memory-bus__close" onClick={() => setShowContact(false)}>✕</button>
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
            PIN ACTIVE — DATA READY
          </div>
        </div>
      )}
    </div>
  );
}
