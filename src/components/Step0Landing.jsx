import { useState } from 'react';

export default function Step0Landing({ onNext }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleEnvelopeClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleButtonClick = (e) => {
    e.stopPropagation(); // Prevent triggering envelope click again
    if (isNavigating) return;
    setIsNavigating(true);
    setTimeout(() => {
      onNext();
    }, 800);
  };

  return (
    <div className={`envelope-wrapper ${isOpen ? 'open' : ''}`} onClick={handleEnvelopeClick}>
      <div className="envelope">
        <div className="flap"></div>
        <div className="pocket-left"></div>
        <div className="pocket-right"></div>
        <div className="pocket-bottom"></div>
        
        <div className="letter">
          <h1 className="title" style={{ fontSize: 'clamp(1.5rem, 6vw, 2.2rem)', marginBottom: '0.5rem' }}>
            A Special Invitation
          </h1>
          <p style={{ fontSize: 'clamp(0.9rem, 4vw, 1.1rem)', marginBottom: '1.5rem', color: '#831843', fontWeight: 500 }}>
            I have something to ask you...
          </p>
          
          <button 
            className={`bubbly-button ${isNavigating ? 'animate' : ''}`} 
            onClick={handleButtonClick}
            style={{ 
              marginTop: '0', 
              marginBottom: '0',
              padding: '0.8em 1.5em',
              opacity: isOpen ? 1 : 0,
              pointerEvents: isOpen ? 'auto' : 'none',
              transition: 'opacity 0.3s ease 0.8s' // Fade in after letter slides up
            }}
          >
            Open Invitation
          </button>
        </div>
      </div>
      {!isOpen && (
        <p className="envelope-hint">Tap to open envelope</p>
      )}
    </div>
  );
}
