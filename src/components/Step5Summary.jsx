import { useState } from 'react';
import { Calendar, Clock, Popcorn, CupSoda, RotateCcw, Send, MessageSquare, MapPin } from 'lucide-react';

export default function Step5Summary({ data, onRestart }) {
  const formatLabel = (id) => {
    return id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [note, setNote] = useState('');

  const handleAutomaticSend = async () => {
    // -------------------------------------------------------------------
    // HOW TO GET THIS WORKING SILENTLY:
    // Because browsers cannot secretly send WhatsApp messages in the 
    // background (for security), we will send it silently to your EMAIL!
    // 
    // 1. Go to https://web3forms.com/
    // 2. Click "Create your Access Key" and enter your email address.
    // 3. They will email you a key. Paste that key inside the quotes below:
    // -------------------------------------------------------------------
    const YOUR_ACCESS_KEY = '137156df-4970-4cfe-b2bc-d3f348b5aeb4'; // Paste your Web3Forms key here

    if (!YOUR_ACCESS_KEY) {
      alert("Oops! The developer needs to add the Access Key to send this silently.");
      return;
    }

    setIsSending(true);

    const snackText = data.snacks.length > 0 ? data.snacks.map(formatLabel).join(', ') : 'No snacks';
    const drinkText = data.beverages.length > 0 ? data.beverages.map(formatLabel).join(', ') : 'No drinks';
    
    const message = `Hey! I'm ready for the Michael Jackson movie! 🎬\n\nHere is what I picked:\n📍 Location: ${data.location || 'TBD'}\n📅 Day: ${data.date || 'TBD'}\n⏰ Time: ${data.time || 'TBD'}\n🍿 Snacks: ${snackText}\n🥤 Drinks: ${drinkText}\n\n${note.trim() ? `📝 Note: ${note.trim()}\n\n` : ''}looking forward to see you! ✨`;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: YOUR_ACCESS_KEY,
          subject: "🎬 Mariem has confirmed the Movie Night Plan!",
          message: message,
        }),
      });

      if (response.ok) {
        setIsSent(true);
      } else {
        alert("Something went wrong while sending. Please try again.");
      }
    } catch (error) {
      alert("Network error. Please check your connection.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="glass-card desktop-split">
      <div className="column-left">
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '1.5rem' }}>
          <button className="btn btn-secondary" onClick={onRestart} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', padding: '0.6rem 1rem' }}>
            <RotateCcw size={16} /> Change options
          </button>
        </div>

        <img
          src="/045c52adfa3551066e0d69e82f5f2e4a.jpg"
          alt="Michael Jackson Movie Poster"
          className="hero-image"
          style={{ width: '100%', height: '100%', minHeight: '300px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1rem', background: '#000' }}
        />
      </div>

      <div className="column-right">
        <h2 className="title" style={{ marginBottom: '0.5rem' }}>It's a Plan!</h2>
        <p className="subtitle" style={{ marginBottom: '1rem' }}>Here is what I've got for our movie night...</p>

        <div style={{ background: 'rgba(255,255,255,0.4)', borderRadius: '16px', padding: '1rem', textAlign: 'left' }}>
          <div className="summary-item" style={{ padding: '0.5rem 1rem' }}>
            <div className="summary-label"><MapPin size={20} color="var(--primary)" /> Location</div>
            <div className="summary-value" style={{ textAlign: 'right', maxWidth: '60%' }}>{data.location || 'To be decided'}</div>
          </div>

          <div className="summary-item" style={{ padding: '0.5rem 1rem' }}>
            <div className="summary-label"><Calendar size={20} color="var(--primary)" /> Day</div>
            <div className="summary-value">{data.date || 'To be decided'}</div>
          </div>

          <div className="summary-item" style={{ padding: '0.5rem 1rem' }}>
            <div className="summary-label"><Clock size={20} color="var(--primary)" /> Time</div>
            <div className="summary-value">{data.time || 'To be decided'}</div>
          </div>

          <div className="summary-item" style={{ padding: '0.5rem 1rem' }}>
            <div className="summary-label"><Popcorn size={20} color="var(--primary)" /> Snacks</div>
            <div className="summary-value" style={{ textAlign: 'right' }}>
              {data.snacks.length > 0 ? data.snacks.map(formatLabel).join(', ') : 'None? Are you sure?'}
            </div>
          </div>

          <div className="summary-item" style={{ padding: '0.5rem 1rem' }}>
            <div className="summary-label"><CupSoda size={20} color="var(--primary)" /> Beverages</div>
            <div className="summary-value" style={{ textAlign: 'right' }}>
              {data.beverages.length > 0 ? data.beverages.map(formatLabel).join(', ') : 'None'}
            </div>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', width: '100%', textAlign: 'left' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>
            <MessageSquare size={16} color="var(--primary)" /> Any notes? (Optional)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Anything else you'd like to add..."
            className="glass-input"
            style={{ width: '100%', minHeight: '50px', resize: 'vertical', fontSize: '0.9rem', padding: '0.8rem', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <p style={{ fontWeight: 600, fontSize: '1.2rem', marginBottom: '0.5rem' }}>Looking forward to see you!</p>
          
          <button 
            className="btn" 
            onClick={handleAutomaticSend} 
            disabled={isSending || isSent}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              width: '100%', 
              justifyContent: 'center',
              backgroundColor: isSent ? '#4ade80' : 'var(--primary)',
              opacity: isSending ? 0.7 : 1
            }}
          >
            {isSending ? 'Sending silently...' : isSent ? 'Sent Successfully! 🎉' : <><Send size={18} /> Confirm Plan</>}
          </button>
        </div>
      </div>
    </div>
  );
}
