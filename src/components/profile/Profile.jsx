import React from 'react';

const Profile = () => {
  const containerStyle = {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: '24px', color: '#080733', marginBottom: '20px' }}>Личный кабинет</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <div style={{ padding: '15px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          Сохраненные мемы (заглушка)
        </div>
        <div style={{ padding: '15px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          Шаблоны (заглушка)
        </div>
        <div style={{ padding: '15px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          Потоки (заглушка)
        </div>
      </div>
    </div>
  );
};

export default Profile;