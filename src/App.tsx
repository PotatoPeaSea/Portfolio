import Board from './components/Board';
import HeroChip from './sections/HeroChip';
import SkillsChip from './sections/SkillsChip';
import ExperienceChip from './sections/ExperienceChip';
import ProjectBoard from './sections/ProjectBoard';
import MemoryBus from './components/MemoryBus';
import Antenna from './components/Antenna';
import TcpTransfer from './components/TcpTransfer';
import GraphicsCard from './components/GraphicsCard';
import './App.css';

export default function App() {
  return (
    <Board>
      {/* Main content sections */}
      <main className="app-layout">
        
        <TcpTransfer />

        {/* CPU with antenna */}
        <div className="app-hero-wrapper">
          <div className="app-antenna-wrapper">
            <Antenna />
          </div>
          <HeroChip />
        </div>

        {/* Connection row: Memory Bus → Skills, GPU → Media Placeholder */ }
        <div className="app-connections">
          {/* Left side: Memory Bus to RAM */}
          <div className="app-connection-col">
            <div className="app-trace-down" />
            <MemoryBus />
            <div className="app-trace-down" />
          </div>

          {/* Right side: GPU trace */}
          <div className="app-connection-col">
            <div className="app-trace-down" />
            <GraphicsCard />
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
