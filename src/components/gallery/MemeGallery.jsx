import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ImageIcon from '@mui/icons-material/Image';
import SearchIcon from '@mui/icons-material/Search';
import HistoryIcon from '@mui/icons-material/History';
import RefreshIcon from '@mui/icons-material/Refresh';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import StreamIcon from '@mui/icons-material/Stream';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import StarIcon from '@mui/icons-material/Star';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Profile } from "../../components/";

const MemeGallery = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [activeMenuItem, setActiveMenuItem] = useState('welcome');

  const containerStyle = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
  };

  const sidebarStyle = {
    width: '250px',
    backgroundColor: '#ffffff',
    padding: '15px',
    boxShadow: '2px 0 4px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    height: '100vh',
  };

  const sidebarTitleStyle = {
    fontSize: '18px',
    fontWeight: '700',
    color: '#080733',
    marginBottom: '20px',
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#555',
    backgroundColor: '#ffffff',
    border: '1px solid transparent',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s, border-color 0.3s',
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: '#f0f1f5',
    color: '#080733',
    border: '1px solid #080733',
  };

  const buttonActiveStyle = {
    ...buttonStyle,
    backgroundColor: '#e6e8f0',
    color: '#080733',
    fontWeight: '600',
    border: '1px solid #080733',
  };

  const contentStyle = {
    flex: 1,
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const contentTitleStyle = {
    fontSize: '24px',
    fontWeight: '700',
    color: '#080733',
    marginBottom: '15px',
  };

  const contentTextStyle = {
    fontSize: '16px',
    color: '#555',
    marginBottom: '10px',
  };

  const createButtonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#080733',
    backgroundColor: '#ffffff',
    border: '1px solid #080733',
    borderRadius: '4px',
    textDecoration: 'none',
    transition: 'background-color 0.3s, border-color 0.3s',
  };

  const createButtonHoverStyle = {
    ...createButtonStyle,
    backgroundColor: '#f0f1f5',
  };

  const menuItems = [
    { name: 'Профиль', icon: <AccountCircleIcon style={{ fontSize: '20px', color: '#080733' }} />, key: 'profile' },
    { name: 'Мои изображения', icon: <ImageIcon style={{ fontSize: '20px', color: '#080733' }} />, key: 'images' },
    { name: 'Поиск по названию', icon: <SearchIcon style={{ fontSize: '20px', color: '#080733' }} />, key: 'search' },
    { name: 'Последний', icon: <HistoryIcon style={{ fontSize: '20px', color: '#080733' }} />, key: 'recent' },
    { name: 'Обновлять', icon: <RefreshIcon style={{ fontSize: '20px', color: '#080733' }} />, key: 'update' },
    { name: 'Мои шаблоны', icon: <BookmarkIcon style={{ fontSize: '20px', color: '#080733' }} />, key: 'templates' },
    { name: 'Мои потоки', icon: <StreamIcon style={{ fontSize: '20px', color: '#080733' }} />, key: 'streams' },
    { name: 'Мои голоса', icon: <ThumbUpIcon style={{ fontSize: '20px', color: '#080733' }} />, key: 'votes' },
    { name: 'Мои комментарии', icon: <CommentIcon style={{ fontSize: '20px', color: '#080733' }} />, key: 'comments' },
    { name: 'Лучшие пользователи', icon: <StarIcon style={{ fontSize: '20px', color: '#080733' }} />, key: 'top-users' },
    { name: 'Сообщения', icon: <MessageIcon style={{ fontSize: '20px', color: '#080733' }} />, key: 'messages' },
    { name: 'Уведомления', icon: <NotificationsIcon style={{ fontSize: '20px', color: '#080733' }} />, key: 'notifications' },
    { name: 'Настройки', icon: <SettingsIcon style={{ fontSize: '20px', color: '#080733' }} />, key: 'settings' },
  ];

  const renderContent = () => {
    switch (activeMenuItem) {
      case 'welcome':
        return (
          <>
            <h2 style={contentTitleStyle}>Добро пожаловать!</h2>
            <p style={contentTextStyle}>У вас пока нет сохраненных изображений на вашем аккаунте.</p>
            <p style={contentTextStyle}>Попробуйте создать их с помощью одного из генераторов в разделе «Создать»!</p>
            <Link
              to="/editor"
              style={activeButton === 'create' ? createButtonHoverStyle : createButtonStyle}
              onMouseEnter={() => setActiveButton('create')}
              onMouseLeave={() => setActiveButton(null)}
            >
              <AddCircleOutlineIcon style={{ fontSize: '20px', color: '#080733' }} />
              Создать сейчас
            </Link>
          </>
        );
      case 'profile':
        return <Profile />;
      case 'images':
        return (
          <>
            <h2 style={contentTitleStyle}>Мои изображения</h2>
            <p style={contentTextStyle}>Список ваших сохраненных изображений.</p>
          </>
        );
      case 'search':
        return (
          <>
            <h2 style={contentTitleStyle}>Поиск по названию</h2>
            <p style={contentTextStyle}>Введите название для поиска мемов.</p>
          </>
        );
      case 'recent':
        return (
          <>
            <h2 style={contentTitleStyle}>Последний</h2>
            <p style={contentTextStyle}>Ваши последние действия.</p>
          </>
        );
      case 'update':
        return (
          <>
            <h2 style={contentTitleStyle}>Обновлять</h2>
            <p style={contentTextStyle}>Обновите ваши мемы.</p>
          </>
        );
      case 'templates':
        return (
          <>
            <h2 style={contentTitleStyle}>Мои шаблоны</h2>
            <p style={contentTextStyle}>Список ваших шаблонов.</p>
          </>
        );
      case 'streams':
        return (
          <>
            <h2 style={contentTitleStyle}>Мои потоки</h2>
            <p style={contentTextStyle}>Ваши потоки активности.</p>
          </>
        );
      case 'votes':
        return (
          <>
            <h2 style={contentTitleStyle}>Мои голоса</h2>
            <p style={contentTextStyle}>Ваши голоса за мемы.</p>
          </>
        );
      case 'comments':
        return (
          <>
            <h2 style={contentTitleStyle}>Мои комментарии</h2>
            <p style={contentTextStyle}>Ваши комментарии к мемам.</p>
          </>
        );
      case 'top-users':
        return (
          <>
            <h2 style={contentTitleStyle}>Лучшие пользователи</h2>
            <p style={contentTextStyle}>Рейтинг лучших пользователей.</p>
          </>
        );
      case 'messages':
        return (
          <>
            <h2 style={contentTitleStyle}>Сообщения</h2>
            <p style={contentTextStyle}>Ваши сообщения.</p>
          </>
        );
      case 'notifications':
        return (
          <>
            <h2 style={contentTitleStyle}>Уведомления</h2>
            <p style={contentTextStyle}>Ваши уведомления.</p>
          </>
        );
      case 'settings':
        return (
          <>
            <h2 style={contentTitleStyle}>Настройки</h2>
            <p style={contentTextStyle}>Настройте ваш профиль.</p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div style={containerStyle}>
      {/* Левая боковая панель */}
      <div style={sidebarStyle}>
        <h3 style={sidebarTitleStyle}>Профиль</h3>
        <div style={buttonContainerStyle}>
          {menuItems.map((item, index) => (
            <button
              key={index}
              style={
                activeMenuItem === item.key
                  ? buttonActiveStyle
                  : activeButton === index
                    ? buttonHoverStyle
                    : buttonStyle
              }
              onMouseEnter={() => setActiveButton(index)}
              onMouseLeave={() => setActiveButton(null)}
              onClick={() => setActiveMenuItem(item.key)}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Основное содержимое */}
      <div style={contentStyle}>{renderContent()}</div>
    </div>
  );
};

export default MemeGallery;