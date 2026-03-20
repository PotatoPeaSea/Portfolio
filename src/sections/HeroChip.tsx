import Chip from '../components/Chip';
import './HeroChip.css';

export default function HeroChip() {
  return (
    <div className="hero-section" id="hero-section">
      <Chip
        title="MATTHEW"
        partNumber="CPU-001"
        variant="CPU"
        pinCount={48}
        packageType="QFP"
        size="lg"
        className="hero-chip"
        id="hero-chip"
      >
        <p className="hero-subtitle">
          Software &amp; Hardware Engineer
        </p>
        <p className="hero-bio">
          Building things at the intersection of embedded systems,
          desktop applications, and the web.
        </p>
      </Chip>

      {/* Silkscreen annotation */}
      <div className="hero-annotation silk-text">
        U1 — MAIN PROCESSOR
      </div>
    </div>
  );
}
