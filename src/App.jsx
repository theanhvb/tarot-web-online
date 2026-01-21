import React, { useState } from 'react';
import { TAROT_CARDS } from './tarotData';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

 // Thay thế hàm getCardImage cũ bằng hàm này
const getCardImage = (index) => {
  // Vì ảnh nằm trong thư mục public, ta chỉ cần dẫn link từ gốc '/'
  return `/cards/${index}.jpg`; 
};

  const handleDraw = () => {
    if (!input.trim()) return;

    setIsAnimating(true);
    setResult(null); // Ẩn kết quả cũ khi đang "xáo bài"

    setTimeout(() => {
      let userNumber = 0;
      if (!isNaN(input) && input.trim() !== "") {
        userNumber = parseInt(input); 
      } else {
        for (let i = 0; i < input.length; i++) {
          userNumber += input.charCodeAt(i);
        }
      }

      const timestamp = Date.now();
      const index = (userNumber + timestamp) % 78;

      setResult({
        ...TAROT_CARDS[index],
        image: getCardImage(index)
      });
      
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <div className="app-container">
      <div className="tarot-card-panel">
        <h1 className="main-title">🔮 MYSTIC TAROT</h1>
        
        <div className="input-section">
          <input 
            type="text"
            className="tarot-input"
            placeholder="Nhập ngày sinh hoặc con số may mắn..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button 
            onClick={handleDraw} 
            className="draw-btn"
            disabled={isAnimating}
          >
            {isAnimating ? "Đang kết nối..." : "RÚT BÀI CHIÊM NGHIỆM"}
          </button>
        </div>

        {result && (
          <div className="result-container fade-in">
            {/* Ảnh lá bài hiện lên trên cùng */}
            <div className="card-image-wrapper">
              <img 
                src={result.image} 
                alt={result.name} 
                className="tarot-img"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/200x350?text=Tarot+Card'; }}
              />
            </div>

            {/* Tên và ý nghĩa hiện ở dưới */}
            <div className="card-info">
              <h2 className="card-name">{result.name}</h2>
              <p className="card-meaning">{result.mean}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;