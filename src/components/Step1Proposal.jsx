import { useState } from 'react';
import { MouseFollowingEyes } from './ui/MouseFollowingEyes';

export default function Step1Proposal({ onNext }) {
  const [noStyle, setNoStyle] = useState({});
  const [isEscaping, setIsEscaping] = useState(false);
  const [yesScale, setYesScale] = useState(1);

  const handleHover = () => {
    setIsEscaping(true);
    setYesScale(prev => prev + 0.15); // Grow by 15% each hover
    const randomX = Math.floor(Math.random() * 80) + 10;
    const randomY = Math.floor(Math.random() * 80) + 10;
    
    setNoStyle({
      position: 'fixed',
      top: `${randomY}%`,
      left: `${randomX}%`,
      transform: 'translate(-50%, -50%)',
      transition: 'all 0.2s ease',
      zIndex: 50
    });
  };

  return (
    <div className="glass-card desktop-split">
      <div className="column-left">
        <img 
          src="/9572bd60fadb77c520335eb54696e3df.jpg" 
          alt="Michael Jackson Movie" 
          className="hero-image"
          style={{ width: '100%', height: '100%', minHeight: '300px', objectFit: 'cover', borderRadius: '12px', display: 'block', objectPosition: 'top' }} 
        />
      </div>
      <div className="column-right" style={{ position: 'relative' }}>
        <h1 className="title" style={{ marginTop: '1.5rem', marginBottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', flexWrap: 'wrap' }}>
          <span>Yoo Mariem!</span>
          <div style={{ transform: 'scale(0.8)' }}>
            <MouseFollowingEyes />
          </div>
        </h1>
        <h2 style={{ marginBottom: '1.5rem', marginTop: '1rem', fontSize: '1.8rem', lineHeight: '1.4' }}>
          wanna go to the movie?
        </h2>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', minHeight: '60px', marginTop: '1.5rem' }} className="nav-buttons">
          <button 
            className="btn" 
            onClick={onNext} 
            style={{ 
              zIndex: 100, 
              transform: `scale(${yesScale})`, 
              transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Add a little bounce to the growth
              transformOrigin: 'center'
            }}
          >
            Yes, I'd love to!
          </button>
          <button 
            className="btn btn-secondary" 
            onMouseEnter={handleHover}
            onClick={handleHover}
            style={{ ...noStyle, zIndex: 50 }}
          >
            {isEscaping ? 'Nice try!' : 'No'}
          </button>
        </div>
      </div>
    </div>
  );
}
