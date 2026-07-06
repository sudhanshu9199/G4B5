import React from 'react';
import { Play, Lock, CheckCircle2, Star, Award } from 'lucide-react';

const LEVEL_NAMES = [
  "Definitions Hub",
  "Lamp Flowchart",
  "Why Use Algorithms?",
  "Order the Bed Maker",
  "Tie the Laces",
  "Fold the Plane"
];

const LEVEL_ICONS = ["❓", "💡", "🔄", "🛏️", "👟", "✈️"];

export default function LevelMap({ currentLevel, completedLevels, onSelectLevel }) {
  const totalLevels = 6;
  const progressPercent = Math.round((completedLevels.length / totalLevels) * 100);

  return (
    <div className="map-container">
      <div className="glass-panel assistant-box pulse-glow">
        <div className="assistant-avatar">🤖</div>
        <div className="speech-bubble">
          <h2>Hi, I'm Algy! 👋</h2>
          <p>Welcome to <strong>Algorithm Adventures</strong>! Algorithms are just lists of steps. Tap Level 1 to start our adventure!</p>
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: '800px', margin: '20px 0', textAlign: 'left' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontWeight: 'bold' }}>
          <span>Adventure Progress: {completedLevels.length} / {totalLevels} Levels Done</span>
          <span>{progressPercent}% Complete</span>
        </div>
        <div className="progress-bar-container">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className="map-path">
        {Array.from({ length: totalLevels }).map((_, index) => {
          const lvlNum = index + 1;
          const isCompleted = completedLevels.includes(lvlNum);
          const isUnlocked = lvlNum <= currentLevel;
          const name = LEVEL_NAMES[index];
          const icon = LEVEL_ICONS[index];

          return (
            <div key={lvlNum} className="map-node-wrapper">
              <div 
                className={`map-node ${isCompleted ? 'completed' : ''} ${!isUnlocked ? 'locked' : ''}`}
                onClick={() => isUnlocked && onSelectLevel(lvlNum)}
                title={name}
              >
                {isCompleted ? (
                  <CheckCircle2 size={40} color="#fff" />
                ) : !isUnlocked ? (
                  <Lock size={36} color="#64748b" />
                ) : (
                  <span style={{ fontSize: '2.5rem' }}>{icon}</span>
                )}

                <div className="node-label">
                  Level {lvlNum}: {name} {isCompleted && <Star size={16} fill="#f59e0b" color="#f59e0b" style={{ display: 'inline', marginLeft: '4px' }} />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {completedLevels.length === totalLevels && (
        <button 
          className="btn-primary pulse-glow" 
          onClick={() => onSelectLevel(7)}
          style={{ marginTop: '40px' }}
        >
          <Award size={24} /> Get Your Badge!
        </button>
      )}
    </div>
  );
}
