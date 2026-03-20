import { useEffect, useState } from 'react';

export interface TraceConnection {
  fromId: string;
  toId: string;
  color?: string;
  thickness?: number;
}

interface Point {
  x: number;
  y: number;
}

function generatePCBPath(from: Point, to: Point, startDir: string) {
  // Basic Manhattan + 45deg routing.
  // 1. Move out straight from the MCU pin to gain clearance.
  const clearance = 20;
  let p1x = from.x;
  let p1y = from.y;
  
  if (startDir === 'top') p1y -= clearance;
  else if (startDir === 'bottom') p1y += clearance;
  else if (startDir === 'left') p1x -= clearance;
  else if (startDir === 'right') p1x += clearance;

  // 2. We want to route from P1 to 'to' using a 45-deg segment if possible, or 90-deg.
  // A standard way is to go straight, then 45-deg, then straight.
  // Let's just do a simple routing:
  // Calculate delta from p1 to `to`
  let dx = to.x - p1x;
  let dy = to.y - p1y;
  
  // We'll insert an intermediate point p2 that is reached via 45-deg turn
  // If we move by min(abs(dx), abs(dy)) in both directions, that's a 45-deg angle.
  const move45 = Math.min(Math.abs(dx), Math.abs(dy));
  const signX = Math.sign(dx);
  const signY = Math.sign(dy);
  
  // To avoid traces crossing too much, we choose whether the 45-deg comes first or second
  // based on the start direction.
  let p2x = p1x;
  let p2y = p1y;
  
  const isVertical = startDir === 'top' || startDir === 'bottom';
  
  // if exiting vertically, maybe go vertical first, then 45 deg
  if (isVertical) {
     p2x += move45 * signX;
     p2y += move45 * signY;
  } else {
     p2x += move45 * signX;
     p2y += move45 * signY;
  }
  // Wait, if we just do a 45-deg immediately, they will bunch up.
  // Instead, let's do:
  // Go straight in start direction until we match X or Y of the target, OR
  // Go 45-deg halfway.
  
  // A simpler, very PCB-like route: Go half vertical, then horizontal. But we want 45s.
  // Let's go straight in the start direction halfway, then 45 deg, then straight.
  
  // Let's use a straightforward approach:
  // P0 (from) -> P1 (clearance) -> P2 (orthogonal) -> P3 (45 deg) -> P4 (to)
  
  // Better algorithm:
  // Start at P1. Target is `to`.
  let path = `M ${from.x} ${from.y} L ${p1x} ${p1y}`;
  
  if (Math.abs(dx) > Math.abs(dy)) {
    // Horizontally dominant
    let p2x_mid = p1x + (dx - dy * signX * signY) / 2;
    if (Math.sign(to.x - p2x_mid) !== signX) p2x_mid = p1x; // fallback
    
    let p3x = p2x_mid + Math.abs(dy) * signX;
    let p3y = to.y;
    
    path += ` L ${p2x_mid} ${p1y} L ${p3x} ${p3y} L ${to.x} ${to.y}`;
  } else {
    // Vertically dominant
    let p2y_mid = p1y + (dy - dx * signX * signY) / 2;
    if (Math.sign(to.y - p2y_mid) !== signY) p2y_mid = p1y; // fallback
    
    let p3x = to.x;
    let p3y = p2y_mid + Math.abs(dx) * signY;
    
    path += ` L ${p1x} ${p2y_mid} L ${p3x} ${p3y} L ${to.x} ${to.y}`;
  }
  
  return path;
}

export default function DynamicTraces({ connections }: { connections: TraceConnection[] }) {
  const [paths, setPaths] = useState<{ d: string, color: string, thickness: number }[]>([]);

  useEffect(() => {
    const updatePaths = () => {
      const parentSVG = document.getElementById('project-board-svg');
      if (!parentSVG) return;
      
      const parentRect = parentSVG.getBoundingClientRect();
      const newPaths: { d: string, color: string, thickness: number }[] = [];

      for (const conn of connections) {
        const fromEl = document.getElementById(conn.fromId);
        const toEl = document.getElementById(conn.toId);

        if (fromEl && toEl) {
          const fromRect = fromEl.getBoundingClientRect();
          const toRect = toEl.getBoundingClientRect();

          const fromPt: Point = {
            x: fromRect.left + fromRect.width / 2 - parentRect.left,
            y: fromRect.top + fromRect.height / 2 - parentRect.top,
          };
          
          const toPt: Point = {
            x: toRect.left + toRect.width / 2 - parentRect.left,
            y: toRect.top + toRect.height / 2 - parentRect.top,
          };

          // Extract direction from MCU pin ID (e.g. 'mcu-pin-top-0' -> 'top')
          let startDir = 'top';
          if (conn.fromId.includes('-left-')) startDir = 'left';
          else if (conn.fromId.includes('-right-')) startDir = 'right';
          else if (conn.fromId.includes('-bottom-')) startDir = 'bottom';

          newPaths.push({
            d: generatePCBPath(fromPt, toPt, startDir),
            color: conn.color || 'var(--trace-copper)',
            thickness: conn.thickness || 2,
          });
        }
      }
      setPaths(newPaths);
    };

    // Initial render and a tiny timeout to ensure DOM paints first
    updatePaths();
    setTimeout(updatePaths, 50);
    setTimeout(updatePaths, 300);
    
    window.addEventListener('resize', updatePaths);
    
    return () => window.removeEventListener('resize', updatePaths);
  }, [connections]);

  return (
    <svg 
      id="project-board-svg" 
      className="project-board__traces-svg" 
      width="100%" 
      height="100%" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="dashPattern" width="4" height="8" patternUnits="userSpaceOnUse">
          <rect width="4" height="4" fill="var(--trace-copper)" />
        </pattern>
        {/* Adds a slight glow to the lines */}
        <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {paths.map((p, idx) => (
        <path 
          key={idx}
          d={p.d} 
          stroke={p.color} 
          strokeWidth={p.thickness} 
          fill="none" 
          className="flowing-trace"
          filter="url(#neonGlow)"
        />
      ))}
    </svg>
  );
}
