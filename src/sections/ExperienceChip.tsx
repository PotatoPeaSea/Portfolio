import { useState } from 'react';
import './ExperienceChip.css';

const experiences = [
  {
    role: 'Firmware Engineer',
    company: 'ALEASAT Project',
    period: '2026 — Present',
  },
  {
    role: 'Computer Vision Engineer',
    company: 'SFU Ascension Robotics',
    period: '2025 — Present',
  },
  {
    role: 'Programming Team Lead',
    company: '16031 FTC Team Parabellum',
    period: '2022 — 2025',
  },
];

export default function ExperienceChip() {
  const [showResume, setShowResume] = useState(false);

  return (
    <>
      <div className="exp-section" id="experience-section">
        <div className="exp-silk silk-text">U3 — SD MODULE</div>

        {/* SD Card shape wrapper */}
        <div 
          className="sd-card" 
          onClick={() => setShowResume(true)}
          style={{ cursor: 'pointer' }}
          title="View Resume"
        >
          {/* SD card chamfer */}
          <div className="sd-card__chamfer" />

        {/* SD card label strip */}
        <div className="sd-card__label-strip">
          <span className="sd-card__capacity silk-text">64GB</span>
        </div>

        {/* Card body */}
        <div className="sd-card__body">
          <span className="sd-card__variant silk-text">SD</span>
          <h2 className="sd-card__title">EXPERIENCE</h2>
          <span className="sd-card__part silk-text">SD-003</span>

          <div className="exp-timeline">
            {experiences.map((exp, i) => (
              <div key={i} className="exp-entry">
                <div className="exp-dot" />
                <div className="exp-info">
                  <span className="exp-role">{exp.role}</span>
                  <span className="exp-company silk-text">{exp.company}</span>
                  <span className="exp-period silk-text">{exp.period}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gold contact pads at bottom */}
        <div className="sd-card__contacts">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="sd-card__pad" />
          ))}
        </div>
      </div>
    </div>

      {showResume && (
        <div className="resume-modal-overlay" onClick={() => setShowResume(false)}>
          <div className="resume-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="resume-modal-header">
              <h3 className="resume-modal-title silk-text">RESUME PREVIEW</h3>
              <button className="resume-modal-close" onClick={() => setShowResume(false)}>&times;</button>
            </div>
            <div className="resume-modal-body">
              <iframe 
                src="/Technical_resume___January.pdf#toolbar=0&navpanes=0&scrollbar=0" 
                title="Resume Preview" 
                className="resume-preview-iframe" 
              />
            </div>
            <div className="resume-modal-footer">
              <a 
                href="/Technical_resume___January.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="resume-full-btn silk-text"
                onClick={() => setShowResume(false)}
              >
                OPEN FULL RESUME
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
