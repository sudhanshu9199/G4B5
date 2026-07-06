import React, { useState } from 'react';
import { ArrowRight, Play, RefreshCw, Plus, X } from 'lucide-react';

const CORRECT_STEPS = [
  "Cross the laces.",
  "Put the top lace under and through the hole.",
  "Make loops with both laces.",
  "Cross the loops.",
  "Put the top loop under and through.",
  "Pull both loops tight."
];

const AVAILABLE_BLOCKS = [
  "Cross the loops.",
  "Make loops with both laces.",
  "Cross the laces.",
  "Pull both loops tight.",
  "Put the top loop under and through.",
  "Put the top lace under and through the hole."
];

export default function ShoeTyer({ onComplete, onBack }) {
  const [program, setProgram] = useState([]);
  const [simulationState, setSimulationState] = useState('idle'); // idle, running, success, fail
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [feedback, setFeedback] = useState('');

  const addBlock = (block) => {
    if (program.length < 6 && !program.includes(block) && simulationState !== 'running') {
      setProgram([...program, block]);
    }
  };

  const removeBlock = (index) => {
    if (simulationState !== 'running') {
      const newProgram = [...program];
      newProgram.splice(index, 1);
      setProgram(newProgram);
    }
  };

  const runProgram = async () => {
    if (program.length < 6) {
      setFeedback("⚠️ Please add all 6 steps before running your program!");
      return;
    }

    setSimulationState('running');
    setFeedback("Running pseudocode...");

    for (let i = 0; i < program.length; i++) {
      setCurrentStepIndex(i);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const isCorrect = program.every((val, index) => val === CORRECT_STEPS[index]);

    if (isCorrect) {
      setSimulationState('success');
      setFeedback("🎉 Success! The laces are perfectly tied! 👟🎀");
    } else {
      setSimulationState('fail');
      // Give details about the bug
      const firstIncorrectIndex = program.findIndex((val, index) => val !== CORRECT_STEPS[index]);
      setFeedback(`❌ Bug at Step ${firstIncorrectIndex + 1}: Check if "${program[firstIncorrectIndex]}" is in the right spot.`);
    }
  };

  const handleReset = () => {
    setProgram([]);
    setSimulationState('idle');
    setCurrentStepIndex(-1);
    setFeedback('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '950px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <button className="btn-secondary" onClick={onBack}>⬅ Map</button>
        <h1>Level 5: Write Pseudocode</h1>
        <div style={{ width: '80px' }}></div>
      </div>

      <div className="glass-panel assistant-box" style={{ marginBottom: '25px' }}>
        <div className="assistant-avatar">🤖</div>
        <div className="speech-bubble">
          <p>Let's plan how to tie shoelaces! Tap blocks on the left to add them to your program. Get them in the right order to tie the bow!</p>
        </div>
      </div>

      <div className="blocks-workspace">
        {/* Left Panel: Available commands */}
        <div className="blocks-library glass-panel">
          <h3 style={{ marginBottom: '15px', color: 'var(--color-accent)' }}>1. Command Blocks</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {AVAILABLE_BLOCKS.map(block => {
              const isInProgram = program.includes(block);
              return (
                <button
                  key={block}
                  className="code-block action"
                  onClick={() => addBlock(block)}
                  disabled={isInProgram || simulationState === 'running'}
                  style={{
                    opacity: isInProgram ? 0.4 : 1,
                    cursor: isInProgram ? 'not-allowed' : 'pointer',
                    width: '100%',
                    textAlign: 'left'
                  }}
                >
                  <span>{block}</span>
                  {!isInProgram && <Plus size={18} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Workspace */}
        <div className="blocks-canvas glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyBetween: 'space-between' }}>
          <h3 style={{ marginBottom: '15px', color: 'var(--color-secondary)' }}>2. My Pseudocode Program</h3>
          
          <div className="blocks-container" style={{ flexGrow: 1 }}>
            {/* Start block */}
            <div className="code-block start-stop">
              <span>🚀 START PROGRAM</span>
            </div>

            {/* User slots */}
            {Array.from({ length: 6 }).map((_, idx) => {
              const blockText = program[idx];
              const isActive = currentStepIndex === idx;

              return blockText ? (
                <div 
                  key={idx} 
                  className="code-block action"
                  style={{
                    borderLeftColor: isActive ? 'var(--color-warning)' : 'var(--color-success)',
                    boxShadow: isActive ? 'var(--shadow-glow-warning)' : 'none',
                    transform: isActive ? 'scale(1.02)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span style={{ fontSize: '0.95rem' }}>{idx + 1}. {blockText}</span>
                  {simulationState !== 'running' && (
                    <button 
                      onClick={() => removeBlock(idx)} 
                      style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ) : (
                <div 
                  key={idx} 
                  style={{
                    height: '48px',
                    border: '2px dashed rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255,255,255,0.3)',
                    fontSize: '0.9rem'
                  }}
                >
                  Step {idx + 1} Slot
                </div>
              );
            })}

            {/* Stop block */}
            <div className="code-block start-stop" style={{ marginTop: 'auto' }}>
              <span>🛑 STOP PROGRAM</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
            <button 
              className="btn-primary" 
              onClick={runProgram}
              disabled={program.length < 6 || simulationState === 'running'}
              style={{ flexGrow: 1, justifyContent: 'center' }}
            >
              <Play size={20} /> Run Program
            </button>
            {program.length > 0 && simulationState !== 'running' && (
              <button className="btn-secondary" onClick={handleReset}>
                <RefreshCw size={18} /> Reset
              </button>
            )}
          </div>
        </div>

        {/* Visual Animation Output */}
        <div className="glass-panel" style={{ width: '100%', maxWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <h3>Shoe State</h3>
          <div className="shoe-anim-panel" style={{ 
            fontSize: '4.5rem', 
            margin: '20px 0',
            boxShadow: simulationState === 'success' ? 'var(--shadow-glow-success)' : simulationState === 'fail' ? 'var(--shadow-glow-warning)' : 'none'
          }}>
            {simulationState === 'success' ? '👟🎀' : simulationState === 'fail' ? '💥🪢' : '👟'}
          </div>

          <div style={{ textAlign: 'center', fontSize: '1rem', minHeight: '60px', fontWeight: 'bold' }}>
            {feedback || "Build your program and click Run to test it!"}
          </div>
        </div>
      </div>

      {simulationState === 'success' && (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button className="btn-primary pulse-glow" onClick={onComplete}>
            Next Level: Fold the Plane! <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
