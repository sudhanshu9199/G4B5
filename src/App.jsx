import React, { useState, useEffect } from 'react';
import LevelMap from './components/LevelMap';
import DefinitionsHub from './components/DefinitionsHub';
import FlowchartFixer from './components/FlowchartFixer';
import CodingCycle from './components/CodingCycle';
import BedMaker from './components/BedMaker';
import ShoeTyer from './components/ShoeTyer';
import PaperPlane from './components/PaperPlane';
import Certificate from './components/Certificate';
import './App.css';

function App() {
  const [activeScreen, setActiveScreen] = useState('map'); // map, level1-6, certificate
  const [currentLevel, setCurrentLevel] = useState(() => {
    const saved = localStorage.getItem('algo_current_level');
    return saved ? parseInt(saved, 10) : 1;
  });
  const [completedLevels, setCompletedLevels] = useState(() => {
    const saved = localStorage.getItem('algo_completed_levels');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('algo_current_level', currentLevel.toString());
  }, [currentLevel]);

  useEffect(() => {
    localStorage.setItem('algo_completed_levels', JSON.stringify(completedLevels));
  }, [completedLevels]);

  const handleCompleteLevel = (levelNum) => {
    if (!completedLevels.includes(levelNum)) {
      setCompletedLevels([...completedLevels, levelNum]);
    }
    
    const nextLevel = levelNum + 1;
    if (nextLevel <= 6) {
      setCurrentLevel(prev => Math.max(prev, nextLevel));
      setActiveScreen('map');
    } else {
      setActiveScreen('certificate');
    }
  };

  const handleSelectLevel = (levelNum) => {
    if (levelNum === 7) {
      setActiveScreen('certificate');
    } else {
      setActiveScreen(`level${levelNum}`);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to start your adventure over?")) {
      setCurrentLevel(1);
      setCompletedLevels([]);
      setActiveScreen('map');
      localStorage.removeItem('algo_current_level');
      localStorage.removeItem('algo_completed_levels');
    }
  };

  return (
    <div style={{ padding: '20px 10px', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* Top Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1000px',
        width: '100%',
        margin: '0 auto 20px',
        padding: '10px 20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => setActiveScreen('map')}>
          <span style={{ fontSize: '2.2rem' }}>🚀</span>
          <span style={{ fontSize: '1.6rem', fontWeight: '800', tracking: '-0.5px' }}>ALGORITHM ADVENTURES</span>
        </div>

        <button className="btn-secondary" style={{ padding: '10px 18px', fontSize: '0.9rem' }} onClick={handleReset}>
          Reset Progress
        </button>
      </header>

      {/* Main Content Area */}
      <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {activeScreen === 'map' && (
          <LevelMap 
            currentLevel={currentLevel}
            completedLevels={completedLevels}
            onSelectLevel={handleSelectLevel}
          />
        )}

        {activeScreen === 'level1' && (
          <DefinitionsHub 
            onComplete={() => handleCompleteLevel(1)} 
            onBack={() => setActiveScreen('map')} 
          />
        )}

        {activeScreen === 'level2' && (
          <FlowchartFixer 
            onComplete={() => handleCompleteLevel(2)} 
            onBack={() => setActiveScreen('map')} 
          />
        )}

        {activeScreen === 'level3' && (
          <CodingCycle 
            onComplete={() => handleCompleteLevel(3)} 
            onBack={() => setActiveScreen('map')} 
          />
        )}

        {activeScreen === 'level4' && (
          <BedMaker 
            onComplete={() => handleCompleteLevel(4)} 
            onBack={() => setActiveScreen('map')} 
          />
        )}

        {activeScreen === 'level5' && (
          <ShoeTyer 
            onComplete={() => handleCompleteLevel(5)} 
            onBack={() => setActiveScreen('map')} 
          />
        )}

        {activeScreen === 'level6' && (
          <PaperPlane 
            onComplete={() => handleCompleteLevel(6)} 
            onBack={() => setActiveScreen('map')} 
          />
        )}

        {activeScreen === 'certificate' && (
          <Certificate 
            onReset={() => {
              setCurrentLevel(1);
              setCompletedLevels([]);
              setActiveScreen('map');
              localStorage.removeItem('algo_current_level');
              localStorage.removeItem('algo_completed_levels');
            }} 
          />
        )}
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '30px 10px 10px',
        color: 'var(--color-text-muted)',
        fontSize: '0.9rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        maxWidth: '1000px',
        width: '100%',
        margin: '20px auto 0'
      }}>
        Grade 4 Computer Science • Algorithm Adventures Portal • Made for Smartboards
      </footer>
    </div>
  );
}

export default App;
