import React, { useState } from 'react';
import { Reorder } from 'framer-motion';
import { ArrowRight, Play, RefreshCw, GripVertical } from 'lucide-react';

const CORRECT_ORDER = [
  "Spread a bedspread over the bed.",
  "Ruff up the pillows.",
  "Lay them at the head of the bed.",
  "Pull the bedspread over the pillows.",
  "Smooth it out."
];

const INITIAL_ITEMS = [
  { id: "1", text: "Pull the bedspread over the pillows." },
  { id: "2", text: "Smooth it out." },
  { id: "3", text: "Spread a bedspread over the bed." },
  { id: "4", text: "Lay them at the head of the bed." },
  { id: "5", text: "Ruff up the pillows." }
];

export default function BedMaker({ onComplete, onBack }) {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [simulationState, setSimulationState] = useState('idle'); // idle, running, success, fail
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [bedState, setBedState] = useState({
    spreadOn: false,
    pillowsFluffed: false,
    pillowsLaid: false,
    pillowsUnderSpread: false,
    smoothed: false
  });
  const [feedback, setFeedback] = useState('');

  const runAlgorithm = async () => {
    setSimulationState('running');
    setFeedback('Running your algorithm step by step...');
    
    // Initial states
    let tempBed = {
      spreadOn: false,
      pillowsFluffed: false,
      pillowsLaid: false,
      pillowsUnderSpread: false,
      smoothed: false
    };
    setBedState({ ...tempBed });

    // Execute each step with a 1.2 second delay
    for (let i = 0; i < items.length; i++) {
      setCurrentStepIndex(i);
      const step = items[i].text;

      await new Promise(resolve => setTimeout(resolve, 1200));

      if (step === "Spread a bedspread over the bed.") {
        tempBed.spreadOn = true;
      } 
      else if (step === "Ruff up the pillows.") {
        tempBed.pillowsFluffed = true;
      } 
      else if (step === "Lay them at the head of the bed.") {
        if (tempBed.spreadOn) {
          // If spread is already on, pillows are laid on top of it, but not tucked under yet
          tempBed.pillowsLaid = true;
        } else {
          // Laid directly on sheet, so when spread goes on, they will go under
          tempBed.pillowsLaid = true;
          tempBed.pillowsUnderSpread = true; 
        }
      } 
      else if (step === "Pull the bedspread over the pillows.") {
        // If pillows are laid and spread is on
        if (tempBed.pillowsLaid && tempBed.spreadOn) {
          tempBed.pillowsUnderSpread = true; // neatly covered now
        }
      } 
      else if (step === "Smooth it out.") {
        if (tempBed.spreadOn) {
          tempBed.smoothed = true;
        }
      }

      setBedState({ ...tempBed });
    }

    // Verify if it matches CORRECT_ORDER exactly
    const userOrder = items.map(item => item.text);
    const isCorrect = userOrder.every((val, index) => val === CORRECT_ORDER[index]);

    await new Promise(resolve => setTimeout(resolve, 800));

    if (isCorrect) {
      setSimulationState('success');
      setFeedback('✨ Hurrah! The bed is neatly made! Order is perfect! ✨');
    } else {
      setSimulationState('fail');
      // Create friendly hints based on specific mistakes
      if (userOrder.indexOf("Pull the bedspread over the pillows.") < userOrder.indexOf("Lay them at the head of the bed.")) {
        setFeedback("❌ Bug found: You pulled the bedspread before laying the pillows down! The pillows are now on top of the sheet but outside the spread.");
      } else if (userOrder.indexOf("Spread a bedspread over the bed.") > userOrder.indexOf("Lay them at the head of the bed.")) {
        setFeedback("❌ Bug found: The pillows got trapped UNDER the bedspread because you spread it first!");
      } else {
        setFeedback("❌ The bed looks a bit messy. Make sure you ruff the pillows, lay them, and pull the sheet over in order!");
      }
    }
  };

  const handleReset = () => {
    setItems(INITIAL_ITEMS);
    setSimulationState('idle');
    setCurrentStepIndex(-1);
    setBedState({
      spreadOn: false,
      pillowsFluffed: false,
      pillowsLaid: false,
      pillowsUnderSpread: false,
      smoothed: false
    });
    setFeedback('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <button className="btn-secondary" onClick={onBack}>⬅ Map</button>
        <h1>Level 4: Order Matters!</h1>
        <div style={{ width: '80px' }}></div>
      </div>

      <div className="glass-panel assistant-box" style={{ marginBottom: '30px' }}>
        <div className="assistant-avatar">🤖</div>
        <div className="speech-bubble">
          <p>If steps are out of order, the task won't work! Drag the bed-making steps into the correct order, then click <strong>Run Algorithm</strong>!</p>
        </div>
      </div>

      <div className="order-puzzle-container">
        {/* Left Side: Drag-and-drop List */}
        <div className="draggable-list">
          <h3 style={{ marginBottom: '10px', color: 'var(--color-accent)' }}>Drag Steps to Order:</h3>
          <Reorder.Group axis="y" values={items} onReorder={setItems} style={{ listStyle: 'none', padding: 0 }}>
            {items.map((item, index) => {
              const isActive = currentStepIndex === index;
              return (
                <Reorder.Item 
                  key={item.id} 
                  value={item}
                  className="draggable-item"
                  style={{
                    borderLeft: isActive ? '6px solid var(--color-accent)' : '1px solid rgba(255,255,255,0.1)',
                    background: isActive ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.06)',
                    touchAction: 'none' // Crucial for Smartboard dragging
                  }}
                  disabled={simulationState === 'running'}
                >
                  <div className="item-index-badge">{index + 1}</div>
                  <span style={{ flexGrow: 1, textAlign: 'left' }}>{item.text}</span>
                  <GripVertical className="item-drag-handle" />
                </Reorder.Item>
              );
            })}
          </Reorder.Group>

          <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
            <button 
              className="btn-primary" 
              onClick={runAlgorithm}
              disabled={simulationState === 'running'}
              style={{ flexGrow: 1, justifyContent: 'center' }}
            >
              <Play size={20} /> Run Algorithm
            </button>
            {simulationState !== 'idle' && simulationState !== 'running' && (
              <button className="btn-secondary" onClick={handleReset}>
                <RefreshCw size={18} /> Reset
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Bed Visual Simulation */}
        <div className="bed-preview-panel glass-panel">
          <h3>Bed Simulator</h3>
          
          <div className="bed-canvas">
            {/* Sheet layer */}
            <div className="bed-sheet"></div>

            {/* Pillows layer */}
            {bedState.pillowsLaid && (
              <div 
                className="bed-pillows" 
                style={{
                  transform: bedState.pillowsFluffed ? 'scale(1.15)' : 'scale(1)',
                  zIndex: bedState.pillowsUnderSpread ? 12 : 20
                }}
              >
                <div className="bed-pillow"></div>
                <div className="bed-pillow"></div>
              </div>
            )}

            {/* Bedspread layer */}
            {bedState.spreadOn && (
              <div 
                className="bed-spread" 
                style={{
                  height: bedState.pillowsUnderSpread ? '85%' : '75%',
                  borderTopColor: bedState.smoothed ? 'var(--color-success)' : 'var(--color-secondary)'
                }}
              ></div>
            )}
          </div>

          <div style={{ textAlign: 'center', width: '100%' }}>
            {feedback && (
              <div style={{
                padding: '12px',
                borderRadius: '12px',
                background: 'rgba(0,0,0,0.2)',
                fontWeight: 'bold',
                color: simulationState === 'success' ? 'var(--color-success)' : simulationState === 'fail' ? 'var(--color-danger)' : '#fff',
                fontSize: '1.05rem',
                minHeight: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {feedback}
              </div>
            )}
          </div>
        </div>
      </div>

      {simulationState === 'success' && (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button className="btn-primary pulse-glow" onClick={onComplete}>
            Next Level: Tie the Laces! <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
