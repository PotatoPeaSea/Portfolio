import { type ReactNode } from 'react';
import './Board.css';

interface BoardProps {
  children: ReactNode;
}

export default function Board({ children }: BoardProps) {
  return (
    <div className="pcb-board pcb-grid-bg">
      {/* Silkscreen corner marks */}
      <div className="board-corner board-corner--tl" />
      <div className="board-corner board-corner--tr" />
      <div className="board-corner board-corner--bl" />
      <div className="board-corner board-corner--br" />

      {/* Board edge label */}
      <span className="board-label silk-text">PCB-PORTFOLIO REV 1.0</span>
      <span className="board-label board-label--right silk-text">
        © 2026 MATTHEW
      </span>

      {children}
    </div>
  );
}
