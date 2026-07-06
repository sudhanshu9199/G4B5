import React, { useState } from 'react';
import { HelpCircle, RefreshCw, ArrowRight } from 'lucide-react';

export default function DefinitionsHub({ onComplete, onBack }) {
  const [flipped, setFlipped] = useState({ algo: false, pseudo: false });
  const [answers, setAnswers] = useState({ algo: null, pseudo: null });

  const handleFlip = (card) => {
    setFlipped(prev => ({ ...prev, [card]: !prev[card] }));
  };

  const handleAnswer = (card, value) => {
    setAnswers(prev => ({ ...prev, [card]: value }));
  };

  const isCompleted = answers.algo === 'correct' && answers.pseudo === 'correct';

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <button className="btn-secondary" onClick={onBack}>⬅ Map</button>
        <h1>Level 1: Words to Know</h1>
        <div style={{ width: '80px' }}></div>
      </div>

      <div className="glass-panel assistant-box" style={{ marginBottom: '40px' }}>
        <div className="assistant-avatar">🤖</div>
        <div className="speech-bubble">
          <p>Tap each card to flip it over! Read the secret definitions and answer the easy questions.</p>
        </div>
      </div>

      <div className="cards-container">
        {/* Card 1: Algorithm */}
        <div className="card-wrapper" onClick={() => !flipped.algo && handleFlip('algo')}>
          <div className={`definition-card ${flipped.algo ? 'flipped' : ''}`}>
            {/* Front */}
            <div className="card-face card-front">
              <div style={{ fontSize: '4rem' }}>🗺️</div>
              <h2>Algorithm</h2>
              <p className="text-muted">Tap to flip & learn!</p>
            </div>
            
            {/* Back */}
            <div className="card-face card-back" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span style={{ fontSize: '1.5rem' }}>🗺️</span>
                <button className="btn-secondary" style={{ padding: '6px 12px' }} onClick={() => handleFlip('algo')}>
                  <RefreshCw size={14} /> Flip
                </button>
              </div>
              <div style={{ margin: '15px 0' }}>
                <h3 style={{ color: 'var(--color-accent)', marginBottom: '8px' }}>What is it?</h3>
                <p style={{ fontSize: '1rem', lineHeight: '1.4' }}>An <strong>Algorithm</strong> is a list of steps in the correct order to do a task or solve a problem. Just like a recipe for a cake!</p>
              </div>
              <div style={{ width: '100%', textAlign: 'left' }}>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--color-warning)' }}>Quick Question:</h4>
                <button 
                  className={`quiz-option ${answers.algo === 'correct' ? 'correct' : ''}`}
                  onClick={() => handleAnswer('algo', 'correct')}
                >
                  🍞 A list of steps to make toast
                </button>
                <button 
                  className={`quiz-option ${answers.algo === 'incorrect' ? 'incorrect' : ''}`}
                  onClick={() => handleAnswer('algo', 'incorrect')}
                >
                  🎲 A pile of random toys
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Pseudocode */}
        <div className="card-wrapper" onClick={() => !flipped.pseudo && handleFlip('pseudo')}>
          <div className={`definition-card ${flipped.pseudo ? 'flipped' : ''}`}>
            {/* Front */}
            <div className="card-face card-front">
              <div style={{ fontSize: '4rem' }}>📝</div>
              <h2>Pseudocode</h2>
              <p className="text-muted">Tap to flip & learn!</p>
            </div>
            
            {/* Back */}
            <div className="card-face card-back" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span style={{ fontSize: '1.5rem' }}>📝</span>
                <button className="btn-secondary" style={{ padding: '6px 12px' }} onClick={() => handleFlip('pseudo')}>
                  <RefreshCw size={14} /> Flip
                </button>
              </div>
              <div style={{ margin: '15px 0' }}>
                <h3 style={{ color: 'var(--color-accent)', marginBottom: '8px' }}>What is it?</h3>
                <p style={{ fontSize: '1rem', lineHeight: '1.4' }}><strong>Pseudocode</strong> means "false code". It is planning your steps in simple, everyday words before writing real computer code.</p>
              </div>
              <div style={{ width: '100%', textAlign: 'left' }}>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--color-warning)' }}>Quick Question:</h4>
                <button 
                  className={`quiz-option ${answers.pseudo === 'correct' ? 'correct' : ''}`}
                  onClick={() => handleAnswer('pseudo', 'correct')}
                >
                  💻 Planning steps in easy words
                </button>
                <button 
                  className={`quiz-option ${answers.pseudo === 'incorrect' ? 'incorrect' : ''}`}
                  onClick={() => handleAnswer('pseudo', 'incorrect')}
                >
                  🤖 Speaking in robotic noises
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isCompleted && (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button className="btn-primary pulse-glow" onClick={onComplete}>
            Next Level: Flowcharts! <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
