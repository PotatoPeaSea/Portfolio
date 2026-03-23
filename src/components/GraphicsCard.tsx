import './GraphicsCard.css';

export default function GraphicsCard() {
  return (
    <div className="gpu-module">
      {/* Silk label */}
      <div className="gpu-silk silk-text">U6 — GPU MEDIA CO-PROCESSOR</div>

      {/* GPU Board */}
      <div className="gpu-board" title="Media Portfolio Placeholder">
        
        {/* PCIe Connector at the bottom */}
        <div className="gpu-pcie">
          <div className="gpu-pcie-pins">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={`left-${i}`} className="gpu-pcie-pin" />
            ))}
          </div>
          <div className="gpu-pcie-notch" />
          <div className="gpu-pcie-pins">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={`right-${i}`} className="gpu-pcie-pin" />
            ))}
          </div>
        </div>

        {/* Board Surface */}
        <div className="gpu-surface">
          {/* IO Bracket on the left edge */}
          <div className="gpu-io-bracket">
            <div className="gpu-port hdmi" />
            <div className="gpu-port dp" />
            <div className="gpu-port dp" />
          </div>

          {/* Lines / Traces on the PCB */}
          <div className="gpu-pcb-traces">
            <div className="gpu-trace-line" style={{ top: '20px', width: '40px' }} />
            <div className="gpu-trace-line" style={{ top: '100px', width: '60px', right: '10px' }} />
            <div className="gpu-trace-line" style={{ top: '60px', width: '30px', left: '20px', transform: 'rotate(45deg)' }} />
          </div>

          {/* Main Chip Area */}
          <div className="gpu-chip-area">
            {/* VRAM top */}
            <div className="gpu-vram-group">
              <div className="gpu-vram" /><div className="gpu-vram" />
            </div>

            {/* Main Processor / Fan */}
            <div className="gpu-die">
              <div className="gpu-die-center">
                <span>MEDIA</span>
                <span className="gpu-die-hint silk-text">COMING SOON</span>
              </div>
            </div>

            {/* VRAM bottom */}
            <div className="gpu-vram-group">
              <div className="gpu-vram" /><div className="gpu-vram" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
