import React from 'react';

const Profile = () => {
  const containerStyle = {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#f8f9fa',
  };

  const headerStyle = {
    fontSize: '24px',
    fontWeight: '700',
    color: '#333',
    marginBottom: '20px',
  };

  const userInfoStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  };

  const usernameStyle = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#333',
  };

  const statsStyle = {
    display: 'flex',
    gap: '20px',
    fontSize: '14px',
    color: '#555',
  };

  const statItemStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const statLabelStyle = {
    fontWeight: '500',
    color: '#333',
  };

  const statValueStyle = {
    color: '#555',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  };

  const cardStyle = {
    padding: '15px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    fontSize: '16px',
    color: '#333',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Личный кабинет</h1>

      {/* Информация о пользователе */}
      <div style={userInfoStyle}>
        <div style={usernameStyle}>User123</div>
        <div style={statsStyle}>
          <div style={statItemStyle}>
            <span style={statLabelStyle}>Избранные изображения</span>
            <span style={statValueStyle}>0</span>
          </div>
          <div style={statItemStyle}>
            <span style={statLabelStyle}>Творения</span>
            <span style={statValueStyle}>0</span>
          </div>
          <div style={statItemStyle}>
            <span style={statLabelStyle}>Комментарии</span>
            <span style={statValueStyle}>0</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Profile;