function OngLock({ onBack }) {
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
    zIndex: 100 // Đảm bảo nút nằm trên các phần tử khác
  };

  return (
    <div>
      <button style={backButtonStyle} onClick={onBack}>
        <i className="fas fa-arrow-left"></i>
      </button>
      <img src="/ong-lock.png" alt="nhen-lock" width='100%' />
    </div>
  );
}

export default OngLock;