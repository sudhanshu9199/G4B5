import React, { useState } from 'react';
import { Award, RotateCcw, Download } from 'lucide-react';

export default function Certificate({ onReset }) {
  const [studentName, setStudentName] = useState('');
  const [claimed, setClaimed] = useState(false);

  return (
    <div style={{ padding: '20px', maxWidth: '850px', margin: '0 auto' }}>
      <h1>Congratulations! 🎉</h1>
      
      {!claimed ? (
        <div className="certificate-container glass-panel pulse-glow">
          <div className="badge-spin">🏆</div>
          <h2>You Are an Algorithm Master!</h2>
          <p>You learned what algorithms are, how to follow and write steps in order, and how to debug mistakes!</p>
          
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '300px' }}>
            <label style={{ fontWeight: 'bold', color: 'var(--color-accent)' }}>Type your name for the badge:</label>
            <input 
              type="text" 
              placeholder="e.g. Alex" 
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              style={{
                padding: '12px 18px',
                borderRadius: '30px',
                border: '2px solid var(--color-primary)',
                background: 'rgba(0,0,0,0.3)',
                color: '#fff',
                fontSize: '1.2rem',
                textAlign: 'center'
              }}
            />
          </div>

          <button 
            className="btn-primary" 
            disabled={!studentName.trim()}
            onClick={() => setClaimed(true)}
            style={{ opacity: studentName.trim() ? 1 : 0.5, cursor: studentName.trim() ? 'pointer' : 'not-allowed' }}
          >
            Claim My Badge!
          </button>
        </div>
      ) : (
        <div className="certificate-container glass-panel" style={{ borderColor: 'var(--color-success)', padding: '50px 30px' }}>
          <div style={{ border: '4px double #fde047', padding: '30px', borderRadius: '16px', background: 'rgba(0,0,0,0.3)', position: 'relative' }}>
            <span style={{ fontSize: '3rem', position: 'absolute', top: '-25px', left: 'calc(50% - 24px)' }}>🏅</span>
            <h2 style={{ color: '#fde047', fontFamily: 'serif', fontSize: '2.5rem', marginBottom: '20px' }}>CERTIFICATE OF MASTERY</h2>
            <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--color-text-muted)' }}>This certifies that</p>
            <h3 style={{ fontSize: '2.2rem', color: '#fff', margin: '15px 0', textDecoration: 'underline' }}>{studentName}</h3>
            <p style={{ fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto', color: 'var(--color-text-main)' }}>
              has successfully completed all levels of <strong>Algorithm Adventures</strong> and is officially crowned an <strong>Algorithm Master</strong>!
            </p>
            <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
              <span>Date: {new Date().toLocaleDateString()}</span>
              <span>Signature: Algy the Robot 🤖</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
            <button className="btn-secondary" onClick={onReset}>
              <RotateCcw size={16} /> Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
