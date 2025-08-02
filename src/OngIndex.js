import OngLocation from "./OngLocation";
import OngLock from "./OngLock";
import EndGame from "./EndGame";
import TrinhSatIndex from "./TrinhSatIndex";
import App from "./App";
import React, { useState } from 'react';

function OngIndex({ onBack }) {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleSelectCharacter = (character) => {
    setSelectedCharacter(character);
  };

  if (selectedCharacter === 'nhen-index') {
    return <App onBack={() => handleSelectCharacter(null)} />;
  }

  if (selectedCharacter === 'trinhsat-index') {
    return <TrinhSatIndex onBack={() => handleSelectCharacter(null)} />;
  }

  if (selectedCharacter === 'ong-location') {
    return <OngLocation onBack={() => handleSelectCharacter(null)} />;
  }

  if (selectedCharacter === 'ong-lock') {
    return <OngLock onBack={() => handleSelectCharacter(null)} />;
  }

  if (selectedCharacter === 'end-game') {
    return <EndGame onBack={() => handleSelectCharacter(null)} />;
  }

  const backgroundStyle = {
    background: 'linear-gradient(180deg, #FAE43F 0%, #B6953D 50%, #B9993D 100%)',
    minHeight: '100vh',
    fontFamily: 'sans-serif',
    position: 'relative' // Quan trọng để nút quay lại được định vị chính xác
  };

  const buttonGradient1 = {
    background: 'linear-gradient(90deg, #FFD700 0%, #FF8C00 100%)',
    border: 'none',
    color: '#fff',
    fontWeight: 'bold',
    borderRadius: '50px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s'
  };

  const buttonGradient2 = {
    background: 'linear-gradient(90deg, #C78FF8 0%, #A276B8 100%)',
    border: 'none',
    color: '#fff',
    fontWeight: 'bold',
    borderRadius: '50px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s'
  };

  const imagePlaceholder = {
    width: '100%',
    maxWidth: '120px',
    height: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    padding: '8px'
  };

  return (
    <div className="d-flex flex-column" style={backgroundStyle}>
      <main className="container-fluid flex-grow-1 d-flex flex-column justify-content-center align-items-center p-4">
        {/* Logo và Tiêu đề */}
        <div className="text-center mb-5 mt-5">
          <h1 className="fw-bold text-white mb-2" style={{ fontSize: '3rem', textShadow: '2px 2px 4px #000' }}>
            <span style={{ color: '#baff00' }}>Spider | Bee</span>
          </h1>
          <h2 className="text-white fs-4 fw-light mt-3">
            Bạn là Ong <img src="/ong-icon.png" width='7%' alt="ong-icon" />
          </h2>
        </div>

        {/* Các nút bấm */}
        <div className="d-flex justify-content-center w-100 mb-5">
          <button className="btn btn-primary me-2 px-4 py-2" style={buttonGradient1}>
            Xem Nhiệm Vụ
          </button>
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="vaiTroDropdown" data-bs-toggle="dropdown" aria-expanded="false" style={buttonGradient2}>
              Vai trò
            </button>
            <ul className="dropdown-menu" aria-labelledby="vaiTroDropdown">
              <li onClick={() => setSelectedCharacter('nhen-index')}><span className="dropdown-item">Nhện</span></li>
              <li onClick={() => setSelectedCharacter('trinhsat-index')}><span className="dropdown-item">Ong Trinh Sát</span></li>
            </ul>
          </div>
        </div>

        {/* Khu vực Icons trên cùng */}
        <div className="row justify-content-around text-center w-100 mb-2">
          <div className="col-4">
            <i className="fa-solid fa-location-dot text-white fs-1"></i>
          </div>
          <div className="col-4">
            <i className="fa-solid fa-unlock text-white fs-1"></i>
          </div>
          <div className="col-4">
            <i className="fa-solid fa-ban text-white fs-1"></i>
          </div>
        </div>

        {/* Khu vực Hình ảnh */}
        <div className="row justify-content-center w-100 g-4">
          <div className="col-4 d-flex justify-content-center">
            <div style={imagePlaceholder} onClick={() => setSelectedCharacter('ong-location')}>
              <img
                src="/location.png"
                alt="Vị trí"
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </div>
          </div>
          <div className="col-4 d-flex justify-content-center">
            <div style={imagePlaceholder} onClick={() => setSelectedCharacter('ong-lock')}>
              <img
                src="/bee-fly.png"
                alt="Ong bay"
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </div>
          </div>
          <div className="col-4 d-flex justify-content-center">
            <div style={imagePlaceholder} onClick={() => setSelectedCharacter('end-game')}>
              <img
                src="/button-ong.png"
                alt="Nút bấm"
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-100 mt-auto py-3 text-white text-center">
        <div className="container">
          <div className="row">
            {/* Cột Hướng Dẫn */}
            <div className="col-6 text-start">
              <h5 className="text-uppercase fw-bold text-white mb-3">
                Hướng Dẫn
              </h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#!" className="text-white text-decoration-none">Giới thiệu</a></li>
                <li className="mb-2"><a href="#!" className="text-white text-decoration-none">Trợ Giúp</a></li>
                <li className="mb-2"><a href="#!" className="text-white text-decoration-none">Chính Sách</a></li>
              </ul>
            </div>
            {/* Cột Thông tin */}
            <div className="col-6 text-start">
              <h5 className="text-uppercase fw-bold text-white mb-3">
                Thông tin
              </h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#!" className="text-white text-decoration-none">Trang chủ</a></li>
                <li className="mb-2"><a href="#!" className="text-white text-decoration-none">Liên Hệ</a></li>
                <li className="mb-2"><a href="#!" className="text-white text-decoration-none">Điểm Số</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default OngIndex;