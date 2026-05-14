import { useState } from 'react';

export default function Step0Landing({ onNext }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    // The CSS animation lasts 0.75s, wait 800ms before transition
    setTimeout(() => {
      onNext();
    }, 800);
  };

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
      <h1 className="title" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
        A Special Invitation
      </h1>
      <p style={{ fontSize: '1.4rem', marginBottom: '3rem', color: '#831843', fontWeight: 500 }}>
        I have something to ask you...
      </p>
      
      <button 
        className={`bubbly-button ${isAnimating ? 'animate' : ''}`} 
        onClick={handleClick}
      >
        Click to open
      </button>
    </div>
  );
}
