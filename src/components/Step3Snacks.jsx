export default function Step3Snacks({ data, updateData, onNext, onPrev }) {
  const snacksList = [
    { id: 'popcorn', img: '/7119960673d27743b57c4eb47f5a9f39.jpg', label: 'Popcorn' },
    { id: 'nachos', img: '/f3856d6b0f2f4b51b226c0e7bac95db5.jpg', label: 'Nachos' },
    { id: 'chocolates', img: '/51b9da45345cab1a93add261d82760a9.jpg', label: 'Chocolates' },
    { id: 'cookies', img: '/571195f2bc8e95bd79ffa78c4fcdae33.jpg', label: 'Cookies' }
  ];

  const toggleSnack = (id) => {
    const current = data.snacks;
    if (current.includes(id)) {
      updateData({ snacks: current.filter(s => s !== id) });
    } else {
      updateData({ snacks: [...current, id] });
    }
  };

  return (
    <div className="glass-card desktop-split">
      <div className="column-left">
        <h2 className="title">Snack Time!</h2>
        <p className="subtitle">Pick your favs from the options below!</p>
        
        <div className="nav-buttons">
          <button className="btn btn-secondary" onClick={onPrev}>Back</button>
          <button className="btn" onClick={onNext}>
            Next Step
          </button>
        </div>
      </div>
      
      <div className="column-right">
        <div className="choices-grid">
          {snacksList.map(snack => (
            <div 
              key={snack.id}
              className={`choice-item ${data.snacks.includes(snack.id) ? 'selected' : ''}`}
              onClick={() => toggleSnack(snack.id)}
            >
              <img src={snack.img} alt={snack.label} className="choice-img" />
              <div className="choice-label">{snack.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
