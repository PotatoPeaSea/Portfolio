import type { Project } from '../data/projectData';
import './ProjectChip.css';

interface ProjectChipProps {
  project: Project;
  expanded: boolean;
  onToggle: () => void;
}

export default function ProjectChip({ project, expanded, onToggle }: ProjectChipProps) {

  return (
    <div
      className={`pchip pchip--${project.chipVariant} ${expanded ? 'pchip--expanded' : ''}`}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onToggle()}
      id={`project-${project.id}`}
    >
      {/* Component body differs by variant */}
      {project.chipVariant === 'ic' && <ICBody project={project} expanded={expanded} />}
      {project.chipVariant === 'capacitor' && <CapacitorBody project={project} expanded={expanded} />}
      {project.chipVariant === 'resistor' && <ResistorBody project={project} expanded={expanded} />}
      {project.chipVariant === 'led' && <LEDBody project={project} expanded={expanded} />}
      {project.chipVariant === 'connector' && <ConnectorBody project={project} expanded={expanded} />}
      {project.chipVariant === 'round-display' && <RoundDisplayBody project={project} expanded={expanded} />}
      {project.chipVariant === 'rect-display' && <RectDisplayBody project={project} expanded={expanded} />}
      {project.chipVariant === 'rotary-encoder' && <RotaryEncoderBody project={project} expanded={expanded} />}
      {project.chipVariant === 'adc' && <ADCBody project={project} expanded={expanded} />}
      {project.chipVariant === 'arducam' && <ArducamBody project={project} expanded={expanded} />}
      {project.chipVariant === 'mems-mic' && <MemsMicBody project={project} expanded={expanded} />}
      {project.chipVariant === 'stepper' && <StepperBody project={project} expanded={expanded} />}

      {/* Expanded overlay */}
      {expanded && (
        <div className="pchip__detail" onClick={(e) => e.stopPropagation()}>
          <div className="pchip__detail-header" style={{ justifyContent: project.award ? 'space-between' : 'flex-end' }}>
            {project.award && <span className="pchip__award-badge">🏆 {project.award}</span>}
            <button className="pchip__close" onClick={(e) => { e.stopPropagation(); onToggle(); }}>✕</button>
          </div>
          {project.image && (
            <div className="pchip__detail-image-box">
              <img src={project.image} alt={`${project.name} preview`} className="pchip__detail-image" />
            </div>
          )}
          <h3 className="pchip__detail-name">{project.name}</h3>
          <p className="pchip__detail-desc">{project.description}</p>
          <div className="pchip__detail-tech">
            {project.techStack.map((t) => (
              <span key={t} className="pchip__tag">{t}</span>
            ))}
          </div>
          {project.links && project.links.length > 0 && (
            <div className="pchip__detail-links">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  className="pchip__link"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  {link.label} →
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Variant Sub-components ─── */

function ICBody({ project, expanded }: { project: Project; expanded: boolean }) {
  const pins = Array.from({ length: 6 });
  return (
    <div className={`pchip__ic ${expanded ? 'pchip__ic--glow' : ''}`}>
      <div className="pchip__ic-pins pchip__ic-pins--left">
        {pins.map((_, i) => <div key={i} id={`pin-${project.id}-left-${i}`} className="pchip__ic-pin" />)}
      </div>
      <div className="pchip__ic-body">
        <div className="pchip__ic-notch" />
        <span className="pchip__ic-label">{project.name}</span>
        <span className="pchip__ic-part silk-text">{project.partNumber}</span>
      </div>
      <div className="pchip__ic-pins pchip__ic-pins--right">
        {pins.map((_, i) => <div key={i} id={`pin-${project.id}-right-${i}`} className="pchip__ic-pin" />)}
      </div>
    </div>
  );
}

function CapacitorBody({ project, expanded }: { project: Project; expanded: boolean }) {
  return (
    <div className={`pchip__cap ${expanded ? 'pchip__cap--glow' : ''}`}>
      <div id={`pin-${project.id}-top`} className="pchip__cap-lead pchip__cap-lead--top" />
      <div className="pchip__cap-body">
        <span className="pchip__cap-label">{project.name}</span>
        <span className="pchip__cap-value silk-text">{project.partNumber}</span>
      </div>
      <div id={`pin-${project.id}-bottom`} className="pchip__cap-lead pchip__cap-lead--bottom" />
    </div>
  );
}

function ResistorBody({ project, expanded }: { project: Project; expanded: boolean }) {
  return (
    <div className={`pchip__res ${expanded ? 'pchip__res--glow' : ''}`}>
      <div id={`pin-${project.id}-top`} className="pchip__res-lead" />
      <div className="pchip__res-body">
        <div className="pchip__res-bands">
          <span className="pchip__res-band" style={{ background: '#e53935' }} />
          <span className="pchip__res-band" style={{ background: '#8e24aa' }} />
          <span className="pchip__res-band" style={{ background: '#ff9800' }} />
          <span className="pchip__res-band" style={{ background: '#d4a843' }} />
        </div>
        <span className="pchip__res-label silk-text">{project.name}</span>
      </div>
      <div id={`pin-${project.id}-bottom`} className="pchip__res-lead" />
    </div>
  );
}

function LEDBody({ project, expanded }: { project: Project; expanded: boolean }) {
  return (
    <div className={`pchip__led ${expanded ? 'pchip__led--glow' : ''}`}>
      <div id={`pin-${project.id}-left`} className="pchip__led-lead" />
      <div className="pchip__led-dome">
        <div className="pchip__led-glow-inner" />
      </div>
      <div className="pchip__led-label silk-text">{project.name}</div>
      <div id={`pin-${project.id}-right`} className="pchip__led-lead" />
    </div>
  );
}

function ConnectorBody({ project, expanded }: { project: Project; expanded: boolean }) {
  const pins = Array.from({ length: 4 });
  return (
    <div className={`pchip__conn ${expanded ? 'pchip__conn--glow' : ''}`}>
      <div className="pchip__conn-body">
        <div className="pchip__conn-pins">
          {pins.map((_, i) => <div key={i} id={`pin-${project.id}-${i}`} className="pchip__conn-pin" />)}
        </div>
        <span className="pchip__conn-label">{project.name}</span>
        <span className="pchip__conn-part silk-text">{project.partNumber}</span>
      </div>
    </div>
  );
}

function RoundDisplayBody({ project, expanded }: { project: Project; expanded: boolean }) {
  const pins = Array.from({ length: 4 }); // 4 wires for Vinyl player
  return (
    <div className={`pchip__disp pchip__disp--round ${expanded ? 'pchip__disp--glow' : ''}`}>
      <div className="pchip__disp-screen">
        <div className="pchip__disp-screen-inner" />
        <span className="pchip__disp-label">{project.name}</span>
      </div>
      <div className="pchip__disp-header">
        {pins.map((_, i) => <div key={i} id={`pin-${project.id}-${i}`} className="pchip__disp-pin" />)}
      </div>
    </div>
  );
}

function RectDisplayBody({ project, expanded }: { project: Project; expanded: boolean }) {
  const pins = Array.from({ length: 6 }); // 6 wires for Bakeout CLI
  return (
    <div className={`pchip__disp pchip__disp--rect ${expanded ? 'pchip__disp--glow' : ''}`}>
      <div className="pchip__disp-screen">
        <div className="pchip__disp-screen-inner" />
        <span className="pchip__disp-label">{project.name}</span>
      </div>
      <div className="pchip__disp-header">
        {pins.map((_, i) => <div key={i} id={`pin-${project.id}-${i}`} className="pchip__disp-pin" />)}
      </div>
    </div>
  );
}

function RotaryEncoderBody({ project, expanded }: { project: Project; expanded: boolean }) {
  const pinLabels = ['VCC', 'GND', 'SIG'];
  return (
    <div className={`pchip__enc ${expanded ? 'pchip__enc--glow' : ''}`}>
      {/* Knob */}
      <div className="pchip__enc-knob">
        <div className="pchip__enc-shaft" />
        {/* Detent marks */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="pchip__enc-detent"
            style={{ transform: `rotate(${i * 30}deg)` }}
          />
        ))}
        <div className="pchip__enc-indicator" />
      </div>
      <span className="pchip__enc-label">{project.name}</span>
      <span className="pchip__enc-part silk-text">{project.partNumber}</span>
      {/* Pins */}
      <div className="pchip__enc-pins">
        {pinLabels.map((label) => (
          <div key={label} className="pchip__enc-pin-group">
            <div id={`pin-${project.id}-${label}`} className="pchip__enc-pin" />
            <span className="pchip__enc-pin-label silk-text">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ADCBody({ project, expanded }: { project: Project; expanded: boolean }) {
  // ADC schematic drawing
  return (
    <div className={`pchip__adc-circuit ${expanded ? 'pchip__adc-circuit--glow' : ''}`}>
      <span className="pchip__adc-label silk-text">{project.name}</span>
      <div className="pchip__adc-schema">
        <svg viewBox="0 0 120 80" width="120" height="80" className="adc-svg">
          <g stroke="var(--trace-copper)" strokeWidth="1.5" fill="none" className="adc-trace">
            {/* Op-Amp Triangle */}
            <polygon points="40,20 40,60 70,40" stroke="var(--silk-color)" />
            {/* Inverting & Non-inverting symbols */}
            <text x="43" y="32" fill="var(--silk-color)" fontSize="8" fontFamily="monospace">-</text>
            <text x="43" y="52" fill="var(--silk-color)" fontSize="8" fontFamily="monospace">+</text>

            {/* Inputs */}
            <line x1="10" y1="30" x2="40" y2="30" />
            <circle cx="10" cy="30" r="2" fill="var(--trace-copper)" />
            <text x="0" y="32" fill="var(--silk-color)" fontSize="5" fontFamily="monospace">AIN</text>

            <line x1="10" y1="50" x2="40" y2="50" />
            <circle cx="10" cy="50" r="2" fill="var(--trace-copper)" />
            <text x="0" y="52" fill="var(--silk-color)" fontSize="5" fontFamily="monospace">REF</text>

            {/* Feedback loop with resistor */}
            <polyline points="55,30 55,10 25,10 25,30" />
            {/* Resistor zig-zag */}
            <polyline points="32,10 34,7 38,13 42,7 46,13 48,10" stroke="var(--silk-color)" />

            {/* Output to Digital Block */}
            <line x1="70" y1="40" x2="85" y2="40" />

            {/* Digital conversion block */}
            <rect x="85" y="25" width="20" height="30" stroke="var(--silk-color)" />
            <text x="88" y="42" fill="var(--silk-dim)" fontSize="6" fontFamily="monospace">SAR</text>

            {/* Digital outputs */}
            <line x1="105" y1="30" x2="115" y2="30" />
            <text x="117" y="32" fill="var(--silk-color)" fontSize="5" fontFamily="monospace">SCK</text>

            <line x1="105" y1="40" x2="115" y2="40" />
            <text x="117" y="42" fill="var(--silk-color)" fontSize="5" fontFamily="monospace">MISO</text>

            <line x1="105" y1="50" x2="115" y2="50" />
            <text x="117" y="52" fill="var(--silk-color)" fontSize="5" fontFamily="monospace">CS</text>

            <circle id={`pin-${project.id}-SCK`} cx="115" cy="30" r="2" fill="var(--trace-copper)" />
            <circle id={`pin-${project.id}-MISO`} cx="115" cy="40" r="2" fill="var(--trace-copper)" />
            <circle id={`pin-${project.id}-CS`} cx="115" cy="50" r="2" fill="var(--trace-copper)" />
          </g>
        </svg>
      </div>
      <span className="pchip__adc-part silk-text">{project.partNumber}</span>
    </div>
  );
}

function MemsMicBody({ project, expanded }: { project: Project; expanded: boolean }) {
  return (
    <div className={`pchip__mems ${expanded ? 'pchip__mems--glow' : ''}`}>
      <div className="pchip__mems-body">
        <div className="pchip__mems-padgroup pchip__mems-padgroup--top">
          <div id={`pin-${project.id}-SD`} className="pchip__mems-pad" />
          <div id={`pin-${project.id}-VDD`} className="pchip__mems-pad" />
          <div id={`pin-${project.id}-GND`} className="pchip__mems-pad" />
        </div>
        <div className="pchip__mems-silk-top silk-text">SD VDD GND</div>
        <div className="pchip__mems-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--silk-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8">
            <rect x="9" y="2" width="6" height="12" rx="3"></rect>
            <path d="M5 10v2a7 7 0 0 0 14 0v-2"></path>
            <line x1="12" y1="19" x2="12" y2="22"></line>
          </svg>
        </div>
        <div className="pchip__mems-silk-bottom silk-text">L/R WS SCK</div>
        <div className="pchip__mems-padgroup pchip__mems-padgroup--bottom">
          <div id={`pin-${project.id}-LR`} className="pchip__mems-pad" />
          <div id={`pin-${project.id}-WS`} className="pchip__mems-pad" />
          <div id={`pin-${project.id}-SCK`} className="pchip__mems-pad" />
        </div>
      </div>
    </div>
  );
}

function StepperBody({ project, expanded }: { project: Project; expanded: boolean }) {
  const pins = Array.from({ length: 4 });
  return (
    <div className={`pchip__stepper ${expanded ? 'pchip__stepper--glow' : ''}`}>
      <div className="pchip__stepper-pins pchip__stepper-pins--left">
        {pins.map((_, i) => <div key={i} id={`pin-${project.id}-left-${i + 1}`} className="pchip__stepper-pin" />)}
      </div>
      <div className="pchip__stepper-body">
        <div className="pchip__stepper-ring">
          <div className="pchip__stepper-shaft" />
        </div>
        <div className="pchip__stepper-mounts">
          <div className="pchip__stepper-hole" />
          <div className="pchip__stepper-hole" />
          <div className="pchip__stepper-hole" />
          <div className="pchip__stepper-hole" />
        </div>
        <span className="pchip__stepper-label silk-text">{project.name}</span>
      </div>
    </div>
  );
}

function ArducamBody({ project, expanded }: { project: Project; expanded: boolean }) {
  const pinLabels = ['CS', 'MOSI', 'MISO', 'SCK', 'GND', 'VCC', 'SDA', 'SCL'];
  return (
    <div className={`pchip__arducam ${expanded ? 'pchip__arducam--glow' : ''}`}>
      <div className="pchip__arducam-body">
        <div className="pchip__arducam-mount">
          <div className="pchip__arducam-lens">
            <div className="pchip__arducam-lens-inner" />
          </div>
          <div className="pchip__arducam-ear pchip__arducam-ear--left" />
          <div className="pchip__arducam-ear pchip__arducam-ear--right" />
        </div>
        <div className="pchip__arducam-ic" />
        <div className="pchip__arducam-pins pchip__arducam-pins--bottom">
          {pinLabels.map((label, i) => (
            <div key={label} className="pchip__arducam-pin-group">
              <span className="pchip__arducam-pin-silk silk-text">{label}</span>
              <div id={`pin-${project.id}-${i}`} className="pchip__arducam-pin" />
            </div>
          ))}
        </div>
        <span className="pchip__arducam-label silk-text">{project.name}</span>
      </div>
    </div>
  );
}
