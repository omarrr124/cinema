export default function Step4Beverages({ data, updateData, onNext, onPrev }) {
  const drinksList = [
    { id: 'water', img: '/5b10da7e73fce38360520a5ecd18e62d.jpg', label: 'Mineral Water' },
    { id: 'soda', img: '/db0878dbef9f3dcd4d4085c0a806b2d8.jpg', label: 'Soda' },
    { id: 'iced_tea', img: '/fd0b347a94a16150a88f9f457969cf34.jpg', label: 'Iced Tea' },
    { id: 'coffee', img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800', label: 'Coffee' }
  ];

  const toggleBeverage = (id) => {
    const current = data.beverages;
    if (current.includes(id)) {
      updateData({ beverages: current.filter(s => s !== id) });
    } else {
      updateData({ beverages: [...current, id] });
    }
  };

  return (
    <div className="glass-card desktop-split">
      <div className="column-left">
        <h2 className="title">Thirsty?</h2>
        <p className="subtitle">Choose your beverages to wash down those snacks.</p>
        
        <div className="nav-buttons">
          <button className="btn btn-secondary" onClick={onPrev}>Back</button>
          <button className="btn" onClick={onNext}>
            See Summary
          </button>
        </div>
      </div>
      
      <div className="column-right">
        <div className="choices-grid">
          {drinksList.map(drink => (
            <div 
              key={drink.id}
              className={`choice-item ${data.beverages.includes(drink.id) ? 'selected' : ''}`}
              onClick={() => toggleBeverage(drink.id)}
            >
              <img src={drink.img} alt={drink.label} className="choice-img" />
              <div className="choice-label">{drink.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
