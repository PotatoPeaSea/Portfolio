import Chip from '../components/Chip';
import './SkillsChip.css';

const skills = [
  { category: 'Languages', items: ['C++', 'Python', 'TypeScript', 'JavaScript'] },
  { category: 'Embedded', items: ['ESP-IDF', 'Arduino', 'Serial', 'SPI/I2C', 'PID Control'] },
  { category: 'Concepts', items: ['Embedded Systems', 'PCB Design', 'Data Analysis'] },
  { category: 'Web', items: ['React', 'Vite', 'Firebase', 'HTML/CSS'] },
];

export default function SkillsChip() {
  return (
    <div className="skills-section" id="skills-section">
      <div className="skills-silk silk-text">U2 — RAM MODULE</div>
      <Chip
        title="SKILLS"
        partNumber="RAM-002"
        variant="RAM"
        pinCount={30}
        packageType="DIMM"
        size="md"
        className="skills-chip"
        id="skills-chip"
      >
        <div className="skills-grid">
          {skills.map((group) => (
            <div key={group.category} className="skills-group">
              <span className="skills-cat silk-text">{group.category}</span>
              <div className="skills-items">
                {group.items.map((item) => (
                  <span key={item} className="skills-item">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Chip>
    </div>
  );
}
