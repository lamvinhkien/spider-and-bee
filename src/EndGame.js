function EndGame({ onBack }) {
  const imagePlaceholder = {
    width: '100%',
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '170px',
    padding: '0px 20px 0px 20px'
  };

  const backButtonStyle = {
    position: 'fixed',
    top: '20px',
    left: '20px',
    background: 'rgba(81, 81, 81, 0.2)',
    color: 'black',
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
      <div style={imagePlaceholder}>
        <img src="/end-game.jpg" alt="end-game" width='90%' />
      </div>
    </div>
  );
}
export default EndGame;