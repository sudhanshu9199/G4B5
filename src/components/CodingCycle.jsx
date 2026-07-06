import React, { useState } from 'react';
import { ArrowRight, HelpCircle } from 'lucide-react';

const CORRECT_CYCLE = ["PLAN", "DO", "CHECK", "ACT"];

const CYCLE_DETAILS = {
  "PLAN": { title: "1. PLAN 📝", desc: "Write down the steps of your algorithm." },
  "DO": { title: "2. DO 🛠️", desc: "Follow the steps to code or build." },
  "CHECK": { title: "3. CHECK 🔍", desc: "Test the results and look for mistakes." },
  "ACT": { title: "4. ACT ⚡", desc: "Fix any errors and improve the steps!" }
};

export default function CodingCycle({ onComplete, onBack }) {
  const [selectedSteps, setSelectedSteps] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState('idle'); // idle, correct, incorrect

  const handleStepClick = (step) => {
    if (selectedSteps.includes(step) || status === 'correct') return;

    const newSteps = [...selectedSteps, step];
    setSelectedSteps(newSteps);

    // Check if we have placed all 4 steps
    if (newSteps.length === 4) {
      const isCorrect = newSteps.every((val, index) => val === CORRECT_CYCLE[index]);
      if (isCorrect) {
        setStatus('correct');
        setFeedback('Perfect! Programmers use this cycle to build and debug software!');
      } else {
        setStatus('incorrect');
        setFeedback('Oops! That is not the correct order. Let\'s think: We must PLAN before we DO!');
      }
    }
  };

  const handleReset = () => {
    setSelectedSteps([]);
    setFeedback('');
    setStatus('idle');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <button className="btn-secondary" onClick={onBack}>⬅ Map</button>
        <h1>Level 3: Why Use Algorithms?</h1>
        <div style={{ width: '80px' }}></div>
      </div>

      <div className="glass-panel assistant-box" style={{ marginBottom: '20px' }}>
        <div className="assistant-avatar">🤖</div>
        <div className="speech-bubble">
          <p>Programmers use algorithms to plan. Can you order the steps of the <strong>Coding Cycle</strong>? Tap the blocks in order!</p>
        </div>
      </div>

      <div className="cycle-game-container">
        {/* The Wheel */}
        <div className="cycle-wheel-wrapper">
          <div className={`cycle-wheel glass-panel ${status === 'correct' ? 'rotating' : ''}`} style={{
            borderColor: status === 'correct' ? 'var(--color-success)' : 'rgba(255,255,255,0.1)'
          }}>
            {/* Displaying selected items in quadrants */}
            <div className="cycle-segment" style={{ top: 0, left: 0, opacity: selectedSteps.length > 0 ? 1 : 0.3 }}>
              <div style={{ transform: 'rotate(0deg)' }}>
                {selectedSteps[0] || "1. ?"}
              </div>
            </div>
            <div className="cycle-segment" style={{ top: 0, right: 0, opacity: selectedSteps.length > 1 ? 1 : 0.3 }}>
              <div style={{ transform: 'rotate(-90deg)' }}>
                {selectedSteps[1] || "2. ?"}
              </div>
            </div>
            <div className="cycle-segment" style={{ bottom: 0, right: 0, opacity: selectedSteps.length > 2 ? 1 : 0.3 }}>
              <div style={{ transform: 'rotate(-180deg)' }}>
                {selectedSteps[2] || "3. ?"}
              </div>
            </div>
            <div className="cycle-segment" style={{ bottom: 0, left: 0, opacity: selectedSteps.length > 3 ? 1 : 0.3 }}>
              <div style={{ transform: 'rotate(-270deg)' }}>
                {selectedSteps[3] || "4. ?"}
              </div>
            </div>

            {/* Inner center badge */}
            <div style={{
              position: 'absolute',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: '#0f172a',
              border: '4px solid var(--color-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              zIndex: 10,
              fontSize: '1rem',
              textAlign: 'center',
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.8)'
            }}>
              {status === 'correct' ? 'CYCLE ON!' : 'BUILD CYCLE'}
            </div>
          </div>
        </div>

        {/* Selected descriptions */}
        {selectedSteps.length > 0 && (
          <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {selectedSteps.map(step => (
              <div key={step} style={{ textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px' }}>
                <strong style={{ color: 'var(--color-accent)' }}>{CYCLE_DETAILS[step].title}</strong>: {CYCLE_DETAILS[step].desc}
              </div>
            ))}
          </div>
        )}

        {/* Status / Feedback messages */}
        {feedback && (
          <div style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: status === 'correct' ? 'var(--color-success)' : 'var(--color-danger)',
            textAlign: 'center',
            maxWidth: '500px'
          }}>
            {feedback}
          </div>
        )}

        {/* Buttons to click */}
        {status !== 'correct' && (
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {CORRECT_CYCLE.map(step => {
              const isSelected = selectedSteps.includes(step);
              return (
                <button
                  key={step}
                  className="btn-secondary"
                  disabled={isSelected}
                  onClick={() => handleStepClick(step)}
                  style={{
                    fontSize: '1.2rem',
                    padding: '14px 28px',
                    borderColor: isSelected ? 'transparent' : 'rgba(255,255,255,0.2)',
                    opacity: isSelected ? 0.4 : 1,
                    cursor: isSelected ? 'not-allowed' : 'pointer'
                  }}
                >
                  {step}
                </button>
              );
            })}
          </div>
        )}

        {status === 'incorrect' && (
          <button className="btn-secondary" onClick={handleReset} style={{ borderColor: 'var(--color-danger)' }}>
            🔄 Reset and Try Again
          </button>
        )}

        {status === 'correct' && (
          <div style={{ marginTop: '20px' }}>
            <button className="btn-primary pulse-glow" onClick={onComplete}>
              Next Level: Make the Bed! <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
