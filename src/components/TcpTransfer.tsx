import { useEffect, useState } from 'react';
import './TcpTransfer.css';

export default function TcpTransfer() {
  const [pathTx, setPathTx] = useState('');
  const [pathRx, setPathRx] = useState('');
  const [labelPos, setLabelPos] = useState<{ x: number; yList: number[] }>({ x: 0, yList: [] });

  useEffect(() => {
    const updatePath = () => {
      const parent = document.getElementById('tcp-container');
      const heroTip = document.getElementById('hero-antenna-tip');
      const boardTip = document.getElementById('board-antenna-tip');

      if (!parent || !heroTip || !boardTip) return;

      const parentRect = parent.getBoundingClientRect();
      const heroRect = heroTip.getBoundingClientRect();
      const boardRect = boardTip.getBoundingClientRect();

      const p1 = {
        x: heroRect.left + heroRect.width / 2 - parentRect.left,
        y: heroRect.top + heroRect.height / 2 - parentRect.top,
      };

      const p2 = {
        x: boardRect.left + boardRect.width / 2 - parentRect.left,
        y: boardRect.top + boardRect.height / 2 - parentRect.top,
      };

      // Ensure the lines are always precisely on the screen edge, regardless of the container's max-width
      const edgeTx = 15 - parentRect.left;
      const edgeRx = 75 - parentRect.left;

      // TX path (Hero to Board): Top antenna points left, so we move straight left
      const dTx = `M ${p1.x} ${p1.y - 12} 
                   L ${edgeTx} ${p1.y - 12} 
                   L ${edgeTx} ${p2.y - 60} 
                   L ${p2.x - 16} ${p2.y - 60} 
                   L ${p2.x - 16} ${p2.y}`;

      // RX path (Board to Hero): Bottom antenna points up
      const dRx = `M ${p2.x + 16} ${p2.y} 
                   L ${p2.x + 16} ${p2.y - 15} 
                   L ${edgeRx} ${p2.y - 15} 
                   L ${edgeRx} ${p1.y + 12} 
                   L ${p1.x} ${p1.y + 12}`;

      setPathTx(dTx);
      setPathRx(dRx);
      const span = p2.y - p1.y;
      setLabelPos({ 
        x: (edgeTx + edgeRx) / 2, 
        yList: [p1.y + span * 0.25, p1.y + span * 0.5, p1.y + span * 0.75] 
      });
    };

    updatePath();
    setTimeout(updatePath, 50);
    setTimeout(updatePath, 500);
    window.addEventListener('resize', updatePath);
    return () => window.removeEventListener('resize', updatePath);
  }, []);

  return (
    <div id="tcp-container" className="tcp-container">
      <svg width="100%" height="100%" style={{ overflow: 'visible' }}>
        <defs>
          <filter id="tcpGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path id="tcp-path-tx" d={pathTx} stroke="var(--trace-green)" strokeWidth="1.5" fill="none" opacity="0.15" strokeDasharray="4 8" />
        <path id="tcp-path-rx" d={pathRx} stroke="var(--trace-gold)" strokeWidth="1.5" fill="none" opacity="0.15" strokeDasharray="4 8" />

        {labelPos.x !== 0 && labelPos.yList.map((y, idx) => (
          <text
            key={idx}
            x={labelPos.x}
            y={y}
            fill="var(--trace-green)"
            fontSize="28"
            fontWeight="bold"
            fontFamily="monospace"
            letterSpacing="0.4em"
            opacity="0.3"
            transform={`rotate(-90 ${labelPos.x} ${y})`}
            textAnchor="middle"
          >
            TCP
          </text>
        ))}

        {pathTx && pathRx && (
          <>
            {/* TX: SYN, ACK, DATA (slower duration: 16s) */}
            <Packet label="SYN" delay="0s" color="#ffb74d" dur="16s" pathId="#tcp-path-tx" />
            <Packet label="ACK" delay="4s" color="#ffb74d" dur="16s" pathId="#tcp-path-tx" />
            <Packet label="[DATA]" delay="6s" color="#66ff66" dur="16s" pathId="#tcp-path-tx" />
            <Packet label="[DATA]" delay="7s" color="#66ff66" dur="16s" pathId="#tcp-path-tx" />
            <Packet label="[DATA]" delay="8s" color="#66ff66" dur="16s" pathId="#tcp-path-tx" />

            {/* RX: SYN-ACK, ACK (flowing upwards from board to hero) */}
            <Packet label="SYN-ACK" delay="2s" color="#42a5f5" dur="16s" pathId="#tcp-path-rx" />
            <Packet label="ACK" delay="9s" color="#42a5f5" dur="16s" pathId="#tcp-path-rx" />
            <Packet label="[DATA]" delay="11s" color="#42a5f5" dur="16s" pathId="#tcp-path-rx" />
            <Packet label="[DATA]" delay="12s" color="#42a5f5" dur="16s" pathId="#tcp-path-rx" />
          </>
        )}
      </svg>
    </div>
  );
}

function Packet({ label, delay, color, dur, pathId }: any) {
  return (
    <g filter="url(#tcpGlow)">
      <rect x="-18" y="-9" width="36" height="18" fill="var(--pcb-bg)" stroke={color} strokeWidth="1" rx="3" />
      <text x="0" y="3" fill={color} fontSize="7" fontFamily="monospace" textAnchor="middle" letterSpacing="0.05em">{label}</text>
      <animateMotion
        dur={dur}
        repeatCount="indefinite"
        begin={delay}
        keyPoints="0;1"
        keyTimes="0;1"
        calcMode="linear"
      >
        <mpath href={pathId} />
      </animateMotion>
    </g>
  );
}
