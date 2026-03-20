import { projects } from '../data/projectData';
import ProjectChip from '../components/ProjectChip';
import Microcontroller from '../components/Microcontroller';
import Antenna from '../components/Antenna';
import DynamicTraces, { type TraceConnection } from '../components/DynamicTraces';
import './ProjectBoard.css';

export default function ProjectBoard() {
  const projectConnections: TraceConnection[] = [
    // Pseudo Vinyl (top-left) to MCU left pins (4 wires)
    { fromId: 'mcu-pin-left-0', toId: 'pin-proj-001-0' },
    { fromId: 'mcu-pin-left-1', toId: 'pin-proj-001-1' },
    { fromId: 'mcu-pin-left-2', toId: 'pin-proj-001-2' },
    { fromId: 'mcu-pin-left-3', toId: 'pin-proj-001-3' },

    // Bakeout CLI (top-center) to MCU top pins (6 wires)
    { fromId: 'mcu-pin-top-0', toId: 'pin-proj-002-0' },
    { fromId: 'mcu-pin-top-1', toId: 'pin-proj-002-1' },
    { fromId: 'mcu-pin-top-2', toId: 'pin-proj-002-2' },
    { fromId: 'mcu-pin-top-3', toId: 'pin-proj-002-3' },
    { fromId: 'mcu-pin-top-4', toId: 'pin-proj-002-4' },
    { fromId: 'mcu-pin-top-5', toId: 'pin-proj-002-5' },

    // Soldering Game (top-right) to MCU right pins (3 wires)
    { fromId: 'mcu-pin-right-0', toId: 'pin-proj-003-SIG' },
    { fromId: 'mcu-pin-right-1', toId: 'pin-proj-003-VCC' },
    { fromId: 'mcu-pin-right-2', toId: 'pin-proj-003-GND' },

    // Poker Night (mid-left) to MCU left pins (2 wires)
    { fromId: 'mcu-pin-left-4', toId: 'pin-proj-004-left' },
    { fromId: 'mcu-pin-left-5', toId: 'pin-proj-004-right' },

    // Poker Tracker (mid-right) to MCU right pins (2 wires)
    { fromId: 'mcu-pin-right-4', toId: 'pin-proj-005-top' },
    { fromId: 'mcu-pin-right-5', toId: 'pin-proj-005-bottom' },

    // UART Antenna (bottom-left e1) to MCU bottom pins (2 wires)
    { fromId: 'mcu-pin-bottom-0', toId: 'board-antenna-tx' },
    { fromId: 'mcu-pin-bottom-1', toId: 'board-antenna-rx' },

    // PCB Portfolio (bottom-center) to MCU bottom pins (3 wires)
    { fromId: 'mcu-pin-bottom-2', toId: 'pin-proj-006-SCK' },
    { fromId: 'mcu-pin-bottom-3', toId: 'pin-proj-006-MISO' },
    { fromId: 'mcu-pin-bottom-4', toId: 'pin-proj-006-CS' },
  ];

  return (
    <section className="project-board" id="projects-section">
      <div className="project-board__wireless-label silk-text">
        ⟨⟨⟨ DATA BUS LINK ACTIVE ⟩⟩⟩
      </div>

      <div className="project-board__layout-container">
        
        {/* Dynamic Trace Canvas */}
        <div className="project-board__traces-layer">
          <DynamicTraces connections={projectConnections} />
        </div>

        {/* 3x3 Grid centered around MCU */}
        <div className="project-board__3x3-grid">
          
          <div className="project-board__cell" style={{ gridArea: 'p1' }}>
            <ProjectChip project={projects[0]} />
            <span className="project-board__ref silk-text">U1</span>
          </div>
          
          <div className="project-board__cell" style={{ gridArea: 'p2' }}>
            <ProjectChip project={projects[1]} />
            <span className="project-board__ref silk-text">U2</span>
          </div>
          
          <div className="project-board__cell" style={{ gridArea: 'p3' }}>
            <ProjectChip project={projects[2]} />
            <span className="project-board__ref silk-text">U3</span>
          </div>
          
          <div className="project-board__cell" style={{ gridArea: 'p4' }}>
            <ProjectChip project={projects[3]} />
            <span className="project-board__ref silk-text">U4</span>
          </div>

          <div className="project-board__mcu-cell" style={{ gridArea: 'mcu' }}>
            <Microcontroller />
          </div>

          <div className="project-board__cell" style={{ gridArea: 'p5' }}>
            <ProjectChip project={projects[4]} />
            <span className="project-board__ref silk-text">U5</span>
          </div>

          <div className="project-board__cell" style={{ gridArea: 'e1' }}>
            <Antenna idPrefix="board" />
            <span className="project-board__ref silk-text">ANTENNA 1</span>
          </div>

          <div className="project-board__cell" style={{ gridArea: 'p6' }}>
            <ProjectChip project={projects[5]} />
            <span className="project-board__ref silk-text">U6</span>
          </div>

          <div className="project-board__cell" style={{ gridArea: 'e2' }}></div>
          
        </div>
      </div>

      <div className="project-board__ground silk-text">
        <span>GND</span>
        <div className="project-board__ground-lines">
          <div /><div /><div />
        </div>
      </div>
    </section>
  );
}
