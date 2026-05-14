import { ExternalLink } from 'lucide-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Step2DateTime({ data, updateData, onNext, onPrev }) {
  const isComplete = data.date && data.time && data.location;

  // Helper to get a date object from the stored strings to pass back into the picker
  const getSelectedDate = () => {
    if (!data.date) return null;
    return new Date(data.date);
  };

  const getSelectedTime = () => {
    if (!data.time) return null;
    const d = new Date();
    if (data.date) {
       return new Date(`${data.date} ${data.time}`);
    }
    return null;
  };

  return (
    <div className="glass-card desktop-split">
      <div className="column-left">
        <h2 className="title">good decision!</h2>
        <p className="subtitle">Let's lock in a location, day, and time.</p>
        
        <div className="cinema-links" style={{ justifyContent: 'flex-start' }}>
          <a href="https://epaymentwebapp.gsc.com.my/showtime-by-movies/5674/michael?id=5674" target="_blank" rel="noreferrer" className="cinema-link">
            GSC Showtimes <ExternalLink size={16} />
          </a>
          <a href="https://www.tgv.com.my/movies/details/michael" target="_blank" rel="noreferrer" className="cinema-link">
            TGV Showtimes <ExternalLink size={16} />
          </a>
        </div>

        <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem', opacity: 0.8, textAlign: 'left' }}>
          Check the links above for real showtimes, then enter your preferred slot!
        </p>
      </div>

      <div className="column-right">
        <div className="input-group">
          <label>Location</label>
          <select 
            className="glass-input" 
            value={data.location || ''} 
            onChange={(e) => updateData({ location: e.target.value })}
            style={{ appearance: 'auto' }}
          >
            <option value="" disabled>Select a cinema...</option>
            <optgroup label="GSC">
              <option value="GSC Mid Valley Megamall (2D)">Mid Valley Megamall (2D)</option>
              <option value="GSC NU Sentral (2D)">NU Sentral (2D)</option>
              <option value="GSC LaLaport BBCC (2D)">LaLaport BBCC (2D)</option>
              <option value="GSC EkoCheras Mall (2D)">EkoCheras Mall (2D)</option>
              <option value="GSC MyTown (2D)">MyTown (2D)</option>
              <option value="GSC KL East Mall (2D)">KL East Mall (2D)</option>
              <option value="GSC Melawati Mall (2D)">Melawati Mall (2D)</option>
              <option value="GSC Setapak Central (2D)">Setapak Central (2D)</option>
              <option value="GSC 1 Utama (New Wing) (2D)">1 Utama (New Wing) (2D)</option>
              <option value="GSC IOI Mall Damansara (2D)">IOI Mall Damansara (Tropicana Gardens) (2D)</option>
              <option value="GSC Aurum, The Exchange TRX (Premium)">Aurum, The Exchange TRX (Premium)</option>
            </optgroup>
            <optgroup label="TGV">
              <option value="TGV Sunway Square (New) (2D / Premium)">Sunway Square (New) (2D / Premium)</option>
              <option value="TGV 1 Utama (2D / Premium)">1 Utama (2D / Premium)</option>
              <option value="TGV Sunway Velocity (2D / Premium)">Sunway Velocity (2D / Premium)</option>
              <option value="TGV Pavilion Bukit Jalil (2D)">Pavilion Bukit Jalil (2D)</option>
              <option value="TGV Suria KLCC (2D)">Suria KLCC (2D)</option>
              <option value="TGV Sunway Putra (2D)">Sunway Putra (2D)</option>
              <option value="TGV Central i-City (2D)">Central i-City (2D)</option>
              <option value="TGV 1 Shamelin (2D)">1 Shamelin (2D)</option>
              <option value="TGV Ampang Point (2D)">Ampang Point (2D)</option>
              <option value="TGV AU2 Setiawangsa (2D)">AU2 Setiawangsa (2D)</option>
              <option value="TGV Bukit Raja (2D)">Bukit Raja (2D)</option>
              <option value="TGV Bukit Tinggi (2D)">Bukit Tinggi (2D)</option>
              <option value="TGV Cheras Selatan (2D)">Cheras Selatan (2D)</option>
              <option value="TGV DPULZE Cyberjaya (2D)">DPULZE Cyberjaya (2D)</option>
              <option value="TGV Strand Kota Damansara (2D)">Strand Kota Damansara (2D)</option>
              <option value="TGV Jaya Seksyen 14 (2D)">Jaya Seksyen 14 (2D)</option>
              <option value="TGV Kepong (2D)">Kepong (2D)</option>
              <option value="TGV Mines (2D)">Mines (2D)</option>
              <option value="TGV Rawang (2D)">Rawang (2D)</option>
              <option value="TGV SetiaWalk Puchong (2D)">SetiaWalk Puchong (2D)</option>
              <option value="TGV Sunway Wangsa Mall (2D)">Sunway Wangsa Mall (2D)</option>
            </optgroup>
          </select>
        </div>

        <div className="input-group custom-datepicker-wrapper">
          <label>Day</label>
          <DatePicker 
            selected={getSelectedDate()}
            onChange={(date) => updateData({ date: date ? date.toDateString() : '' })}
            className="glass-input"
            dateFormat="MMMM d, yyyy"
            placeholderText="Select a day"
            minDate={new Date()}
            onFocus={(e) => e.target.blur()}
            readOnly={true}
          />
        </div>

        <div className="input-group custom-datepicker-wrapper">
          <label>Time</label>
          <DatePicker 
            selected={getSelectedTime()}
            onChange={(date) => updateData({ time: date ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '' })}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            className="glass-input"
            placeholderText="Select a time"
            onFocus={(e) => e.target.blur()}
            readOnly={true}
          />
        </div>

        <div className="nav-buttons">
          <button className="btn btn-secondary" onClick={onPrev}>Back</button>
          <button className="btn" onClick={onNext} disabled={!isComplete} style={{ opacity: isComplete ? 1 : 0.5 }}>
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
}
