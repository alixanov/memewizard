import React from 'react';

const MemeGallery = () => {
  const containerStyle = {
    display: 'flex',
    height: '100vh',
  };

  const sidebarStyle = {
    width: '250px',
    backgroundColor: '#f4f4f4',
    padding: '20px',
  };

  const contentStyle = {
    flex: 1,
    padding: '20px',
  };

  return (
    <div style={containerStyle}>
      {/* Левая боковая панель */}
      <div style={sidebarStyle}>
        <h3>Профиль</h3>
        <ul>
          <li>Создавать</li>
          <li>Мои изображения</li>
          <li>Поиск по названию</li>
          <li>Последний</li>
          <li>Обновлять</li>
          <li>Мои шаблоны</li>
          <li>Мои потоки</li>
          <li>Мои голоса</li>
          <li>Мои комментарии</li>
          <li>Лучшие пользователи</li>
          <li>Сообщения</li>
          <li>Уведомления</li>
          <li>Настройки</li>
        </ul>
      </div>

      {/* Основное содержимое */}
      <div style={contentStyle}>
        <h2>Добро пожаловать!</h2>
        <p>У вас пока нет сохраненных изображений на вашем аккаунте.</p>
        <p>Попробуйте создать их с помощью одного из генераторов в разделе «Создать»!</p>
      </div>
    </div>
  );
};

export default MemeGallery;
