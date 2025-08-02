import React, { useState, useEffect, useRef } from 'react';

// Custom CSS styles
// We are injecting these styles as they are not part of Bootstrap
const styles = `
  body {
    background-color: #f8f9fa;
  }
  .custom-bg {
    background: linear-gradient(180deg, #FAE43F 0%, #B6953D 50%, #B9993D 100%);
    min-height: 100vh;
    font-family: sans-serif;
    color: white;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }
  .back-button {
    position: fixed;
    top: 1rem;
    left: 1rem;
    background-color: rgba(255, 255, 255, 0.2);
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    z-index: 100;
    transition: transform 0.3s;
  }
  .back-button:hover {
    transform: scale(1.1);
  }
  .map-card-container {
    background-color: white;
    padding: 0.5rem;
    border-radius: 1rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    border: 4px solid #fcd34d;
    width: 100%;
    max-width: 56rem;
  }
  .map-image {
    width: 100%;
    height: auto;
    border-radius: 0.75rem;
  }
  .dot {
    width: 1rem;
    height: 1rem;
    background-color: #84cc16;
    border-radius: 50%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  @keyframes pulse-slow {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(132, 204, 22, 0.7);
    }
    50% {
      transform: scale(1.1);
      box-shadow: 0 0 0 10px rgba(132, 204, 22, 0);
    }
  }
  .location-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(4px);
    border-radius: 50rem;
    padding: 0.5rem 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
    cursor: pointer;
    width: 100%;
    max-width: 20rem;
  }
  .location-item:hover {
    transform: scale(1.05);
  }
  .location-icon-blue {
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #3b82f6;
    color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .location-icon-orange {
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #f97316;
    color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .action-button {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    background: linear-gradient(to bottom right, #dc2626, #7f1d1d);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
    cursor: pointer;
    font-size: 2rem; /* Thêm kích thước chữ cho số đếm ngược */
    font-weight: bold;
  }
  .action-button:hover {
    transform: scale(1.1);
  }
  .countdown-text {
    font-size: 1.8rem; /* Kích thước chữ cho số đếm ngược */
    font-weight: bold;
    color: white;
  }
`;

function OngLocation({ onBack }) {
  // Inject styles into the document head
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const backButtonStyle = {
    position: 'fixed',
    top: '20px',
    left: '20px',
    background: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    zIndex: 100
  };

  // State để lưu trữ thời gian đếm ngược (tính bằng giây)
  const [countdownTime, setCountdownTime] = useState(0); // 0: không đếm, >0: đang đếm
  // Ref để lưu trữ ID của interval, giúp clear khi component unmount hoặc đếm ngược kết thúc
  const intervalRef = useRef(null);

  const startCountdown = () => {
    // Chỉ bắt đầu đếm ngược nếu chưa có bộ đếm nào đang chạy
    if (countdownTime === 0) {
      setCountdownTime(120); // 2 phút = 120 giây
      intervalRef.current = setInterval(() => {
        setCountdownTime(prevTime => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current); // Dừng đếm ngược khi hết giờ
            intervalRef.current = null;
            return 0; // Đặt lại về 0
          }
          return prevTime - 1;
        });
      }, 1000); // Cập nhật mỗi giây
    }
  };

  // Cleanup effect để xóa interval khi component bị unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Hàm để định dạng thời gian từ giây sang MM:SS
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="custom-bg">
      {/* Back button */}
      <button style={backButtonStyle} onClick={onBack}>
        <i className="fas fa-arrow-left"></i>
      </button>

      {/* Main content container */}
      <div className="container-fluid d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="row justify-content-center w-100">
          <div className="col-lg-8 col-md-10 col-12 mb-4">
            {/* Map card container */}
            <div className="map-card-container">
              {/* Placeholder for the map image */}
              <img src="/map.png" alt="Map of an area" className="map-image" />
            </div>
          </div>
        </div>

        {/* Status dots */}
        <div className="d-flex justify-content-center gap-3 mb-4">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>

        {/* Location information */}
        <div className="d-flex flex-column align-items-center w-100 mb-5" style={{ gap: '2rem' }}>
          <div className="location-item">
            <div className="location-icon-blue">
              <i className="fa-solid fa-location-dot fs-1"></i>
            </div>
            <span className="text-white fw-bold fs-5">Vị Trí Đồng Đội</span>
          </div>

          <div className="location-item">
            <div className="location-icon-orange">
              <i className="fa-solid fa-location-dot fs-1"></i>
            </div>
            <span className="text-white fw-bold fs-5">Vị Trí Tổ Nhện</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="d-flex justify-content-around w-100" style={{ maxWidth: '28rem' }}>
          <div className="d-flex flex-column align-items-center">
            <button className="action-button">
              <i className="fa-solid fa-location-dot fs-1 text-white"></i>
            </button>
            <span className="mt-2 text-white fw-bold fs-5">Gửi Vị Trí</span>
          </div>
          <div className="d-flex flex-column align-items-center">
            <button
              className="action-button"
              id='countdown'
              onClick={startCountdown} // Gọi hàm startCountdown khi nhấn nút
              disabled={countdownTime > 0} // Vô hiệu hóa nút khi đang đếm ngược
            >
              {countdownTime > 0 ? (
                <span className="countdown-text">{formatTime(countdownTime)}</span>
              ) : (
                <i className="fa-solid fa-egg fs-1 text-white"></i>
              )}
            </button>
            <span className="mt-2 text-white fw-bold fs-5">Đẻ Trứng</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OngLocation;