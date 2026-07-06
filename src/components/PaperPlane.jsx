import React, { useState } from 'react';
import { Reorder } from 'framer-motion';
import { ArrowRight, Play, RefreshCw, GripVertical } from 'lucide-react';

const CORRECT_STEPS = [
  "Fold paper in half vertically, then unfold.",
  "Fold top corners down to center line.",
  "Fold top triangle down.",
  "Fold top corners down to center line again.",
  "Fold small triangle up to lock folds.",
  "Fold plane in half.",
  "Fold wings down to match bottom edge."
];

// Start with a bug (e.g. fold plane in half at step 2, lock folds before corners, etc.)
const BUGGY_ITEMS = [
  { id: "p1", text: "Fold paper in half vertically, then unfold." },
  { id: "p2", text: "Fold plane in half." }, // BUG: Folded in half too early!
  { id: "p3", text: "Fold top triangle down." },
  { id: "p4", text: "Fold top corners down to center line." },
  { id: "p5", text: "Fold small triangle up to lock folds." },
  { id: "p6", text: "Fold top corners down to center line again." },
  { id: "p7", text: "Fold wings down to match bottom edge." }
];

export default function PaperPlane({ onComplete, onBack }) {
  const [items, setItems] = useState(BUGGY_ITEMS);
  const [simulationState, setSimulationState] = useState('idle'); // idle, running, fly, crash
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [feedback, setFeedback] = useState('');

  const runAlgorithm = async () => {
    setSimulationState('running');
    setFeedback('Checking folds step by step...');

    for (let i = 0; i < items.length; i++) {
      setCurrentStepIndex(i);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    const userOrder = items.map(item => item.text);
    const isCorrect = userOrder.every((val, index) => val === CORRECT_STEPS[index]);

    await new Promise(resolve => setTimeout(resolve, 400));

    if (isCorrect) {
      setSimulationState('fly');
      setFeedback('🎉 SUCCESS! The airplane folds perfectly and flies far! ✈️💨');
    } else {
      setSimulationState('crash');
      // Give a helpful hint
      if (userOrder.indexOf("Fold plane in half.") < userOrder.indexOf("Fold top corners down to center line.")) {
        setFeedback("❌ CRASH! You folded the plane in half before folding the corners down!");
      } else if (userOrder.indexOf("Fold small triangle up to lock folds.") < userOrder.indexOf("Fold top corners down to center line again.")) {
        setFeedback("❌ CRASH! You tried to lock the folds before the second set of corners were folded!");
      } else {
        setFeedback("❌ CRASH! The folds are in the wrong order, so the airplane can't catch the wind!");
      }
    }
  };

  const handleReset = () => {
    setItems(BUGGY_ITEMS);
    setSimulationState('idle');
    setCurrentStepIndex(-1);
    setFeedback('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <button className="btn-secondary" onClick={onBack}>⬅ Map</button>
        <h1>Level 6: Improve the Algorithm</h1>
        <div style={{ width: '80px' }}></div>
      </div>

      <div className="glass-panel assistant-box" style={{ marginBottom: '25px' }}>
        <div className="assistant-avatar">🤖</div>
        <div className="speech-bubble">
          <p>This paper airplane algorithm has a <strong>bug</strong> (error). It folds in the wrong order! Rearrange the steps to debug it and make it fly!</p>
        </div>
      </div>

      <div className="order-puzzle-container">
        {/* Left Panel: Step List */}
        <div className="draggable-list">
          <h3 style={{ marginBottom: '10px', color: 'var(--color-accent)' }}>Debug Steps:</h3>
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
                    touchAction: 'none'
                  }}
                  disabled={simulationState === 'running'}
                >
                  <div className="item-index-badge">{index + 1}</div>
                  <span style={{ flexGrow: 1, textAlign: 'left', fontSize: '0.95rem' }}>{item.text}</span>
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
              <Play size={20} /> Test Flight
            </button>
            {simulationState !== 'idle' && simulationState !== 'running' && (
              <button className="btn-secondary" onClick={handleReset}>
                <RefreshCw size={18} /> Reset
              </button>
            )}
          </div>
        </div>

        {/* Right Panel: Flight Arena */}
        <div className="bed-preview-panel glass-panel" style={{ flexGrow: 1 }}>
          <h3>Flight Arena</h3>
          
          <div className="paper-plane-scene">
            {/* Plane animation layer */}
            {simulationState === 'fly' && (
              <div className="plane-animation fly">✈️</div>
            )}
            {simulationState === 'crash' && (
              <div className="plane-animation crash">✈️</div>
            )}
            {simulationState === 'running' && (
              <div style={{ position: 'absolute', top: '45%', left: '42%', fontSize: '1.2rem', color: 'var(--color-accent)', fontWeight: 'bold' }}>
                ⚙️ FOLDING...
              </div>
            )}
            {simulationState === 'idle' && (
              <div style={{ position: 'absolute', top: '45%', left: '30%', color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
                Fix steps & click Test Flight
              </div>
            )}
          </div>

          <div style={{ marginTop: '20px', width: '100%', minHeight: '60px' }}>
            {feedback && (
              <div style={{
                padding: '12px',
                borderRadius: '12px',
                background: 'rgba(0,0,0,0.2)',
                fontWeight: 'bold',
                color: simulationState === 'fly' ? 'var(--color-success)' : simulationState === 'crash' ? 'var(--color-danger)' : '#fff',
                fontSize: '1.05rem',
                textAlign: 'center'
              }}>
                {feedback}
              </div>
            )}
          </div>
        </div>
      </div>

      {simulationState === 'fly' && (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button className="btn-primary pulse-glow" onClick={onComplete}>
            Finish Adventure! <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
