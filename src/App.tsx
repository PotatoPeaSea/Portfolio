import Board from './components/Board';
import HeroChip from './sections/HeroChip';
import SkillsChip from './sections/SkillsChip';
import ExperienceChip from './sections/ExperienceChip';
import ProjectBoard from './sections/ProjectBoard';
import MemoryBus from './components/MemoryBus';
import Antenna from './components/Antenna';
import './App.css';

export default function App() {
  return (
    <Board>
      {/* Main content sections */}
      <main className="app-layout">
        {/* CPU with antenna */}
        <div className="app-hero-wrapper">
          <div className="app-antenna-wrapper">
            <Antenna />
          </div>
          <HeroChip />
        </div>

        {/* Connection row: Memory Bus → Skills, Storage Controller → SD Card */}
        <div className="app-connections">
          {/* Left side: Memory Bus to RAM */}
          <div className="app-connection-col">
            <div className="app-trace-down" />
            <MemoryBus />
            <div className="app-trace-down" />
          </div>

          {/* Right side: Storage Controller trace to SD Card — opens resume */}
          <div className="app-connection-col">
            <div className="app-trace-down" />
            <a
              href="/Technical_resume___January.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="app-storage-ctrl"
              title="View Resume"
            >
              <span className="app-ctrl-label silk-text">STORAGE CTRL</span>
              <div className="app-ctrl-traces">
                <div className="app-ctrl-wire" />
                <div className="app-ctrl-wire" />
                <div className="app-ctrl-wire" />
                <div className="app-ctrl-wire" />
              </div>
              <span className="app-ctrl-hint silk-text">↗ OPEN RESUME</span>
            </a>
            <div className="app-trace-down" />
          </div>
        </div>

        {/* Skills (RAM) and Experience (SD Card) row */}
        <div className="app-row">
          <SkillsChip />
          <ExperienceChip />
        </div>

        {/* Projects section with wireless MCU hub */}
        <ProjectBoard />
      </main>
    </Board>
  );
}
