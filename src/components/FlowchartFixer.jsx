import React, { useState } from 'react';
import { ArrowRight, RefreshCw } from 'lucide-react';

export default function FlowchartFixer({ onComplete, onBack }) {
  const [currentNode, setCurrentNode] = useState('start');
  const [lampState, setLampState] = useState('broken'); // broken, plugged_in, bulb_replaced, repaired

  const handleChoice = (choice) => {
    if (currentNode === 'start') {
      if (choice === 'no') {
        setCurrentNode('plug_in');
        setLampState('plugged_in');
      } else {
        setCurrentNode('bulb_check');
      }
    } else if (currentNode === 'bulb_check') {
      if (choice === 'yes') {
        setCurrentNode('replace_bulb');
        setLampState('bulb_replaced');
      } else {
        setCurrentNode('repair_lamp');
        setLampState('repaired');
      }
    }
  };

  const handleReset = () => {
    setCurrentNode('start');
    setLampState('broken');
  };

  const isLampOn = lampState === 'bulb_replaced' || lampState === 'repaired';

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <button className="btn-secondary" onClick={onBack}>⬅ Map</button>
        <h1>Level 2: Flowchart Fixer</h1>
        <div style={{ width: '80px' }}></div>
      </div>

      <div className="glass-panel assistant-box" style={{ marginBottom: '30px' }}>
        <div className="assistant-avatar">🤖</div>
        <div className="speech-bubble">
          <p>This flowchart helps us fix a lamp. Follow the steps! If you reach the end, the lamp will glow!</p>
        </div>
      </div>

      <div className="flowchart-wrapper">
        {/* Left Side: Diagram */}
        <div className="flowchart-diagram glass-panel" style={{ padding: '20px' }}>
          
          {/* Start node */}
          <div className={`flowchart-node ${currentNode === 'start' ? 'active' : ''}`} style={{ borderLeft: '6px solid var(--color-warning)' }}>
            🔴 Lamp Doesn't Work
          </div>

          <div style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem' }}>⬇️</div>

          {/* Decision Node 1 */}
          {currentNode === 'start' && (
            <div className="flowchart-node decision active">
              🔌 Lamp Plugged In?
              <div className="flowchart-actions" style={{ marginTop: '15px' }}>
                <button className="flowchart-btn yes" onClick={() => handleChoice('yes')}>YES</button>
                <button className="flowchart-btn no" onClick={() => handleChoice('no')}>NO</button>
              </div>
            </div>
          )}

          {/* Action Node: Plug in lamp */}
          {currentNode === 'plug_in' && (
            <div className="flowchart-node active" style={{ borderColor: 'var(--color-warning)' }}>
              🔌 action: Plug in lamp!
              <div style={{ marginTop: '15px' }}>
                <p style={{ fontSize: '0.9rem', marginBottom: '10px' }}>Ok, we plugged it in, but it still doesn't light up! Let's test it again.</p>
                <button className="btn-secondary" onClick={handleReset}>Try Again</button>
              </div>
            </div>
          )}

          {/* Decision Node 2 */}
          {currentNode === 'bulb_check' && (
            <div className="flowchart-node decision active">
              💡 Bulb Burned Out?
              <div className="flowchart-actions" style={{ marginTop: '15px' }}>
                <button className="flowchart-btn yes" onClick={() => handleChoice('yes')}>YES</button>
                <button className="flowchart-btn no" onClick={() => handleChoice('no')}>NO</button>
              </div>
            </div>
          )}

          {/* Action Node: Replace bulb */}
          {currentNode === 'replace_bulb' && (
            <div className="flowchart-node active" style={{ borderColor: 'var(--color-success)', background: 'rgba(16, 185, 129, 0.15)' }}>
              🟢 action: Replace the bulb!
              <p style={{ fontSize: '1rem', marginTop: '8px' }}>Yay! It works perfectly now!</p>
            </div>
          )}

          {/* Action Node: Repair lamp */}
          {currentNode === 'repair_lamp' && (
            <div className="flowchart-node active" style={{ borderColor: 'var(--color-success)', background: 'rgba(16, 185, 129, 0.15)' }}>
              🟢 action: Repair the switch/lamp!
              <p style={{ fontSize: '1rem', marginTop: '8px' }}>Awesome! The lamp is fixed!</p>
            </div>
          )}

        </div>

        {/* Right Side: Lamp Visual Preview */}
        <div className="lamp-preview glass-panel">
          <h3>My Lamp</h3>
          <svg 
            className={`lamp-svg ${isLampOn ? 'on' : ''}`} 
            viewBox="0 0 100 150" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Lamp base */}
            <path d="M 30 140 L 70 140 L 60 120 L 40 120 Z" fill="#64748b" />
            <rect x="46" y="90" width="8" height="30" fill="#475569" />
            
            {/* Bulb glow effect */}
            {isLampOn && (
              <circle cx="50" cy="55" r="30" fill="rgba(253, 224, 71, 0.6)" filter="blur(8px)" />
            )}

            {/* Bulb */}
            <circle cx="50" cy="55" r="16" fill={isLampOn ? '#fde047' : '#475569'} stroke="#334155" strokeWidth="2" />
            <path d="M 44 70 L 56 70" stroke="#334155" strokeWidth="2" />
            
            {/* Lamp Shade */}
            <path d="M 20 85 L 80 85 L 65 30 L 35 30 Z" fill={isLampOn ? '#fbcfe8' : '#334155'} stroke="#1e293b" strokeWidth="2" />
          </svg>

          {isLampOn ? (
            <div style={{ color: 'var(--color-success)', fontWeight: 'bold', fontSize: '1.2rem', textAlign: 'center' }}>
              💡 LIGHT IS ON!
            </div>
          ) : (
            <div style={{ color: 'var(--color-danger)', fontWeight: 'bold', fontSize: '1.1rem', textAlign: 'center' }}>
              🌑 Lamp is Dark
            </div>
          )}
        </div>
      </div>

      {isLampOn && (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button className="btn-primary pulse-glow" onClick={onComplete}>
            Next Level: The Coding Cycle <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
