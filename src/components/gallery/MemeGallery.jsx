import React, { useState, useEffect } from 'react';
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
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Typography, IconButton } from '@mui/material';
import { Profile } from '../../components/';

const MemeGallery = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [activeMenuItem, setActiveMenuItem] = useState('profile');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const containerStyle = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
  };

  const sidebarStyle = {
    width: { xs: '100%', sm: '250px' }, // Full width on mobile, fixed on desktop
    backgroundColor: '#ffffff',
    padding: '15px',
    boxShadow: { sm: '2px 0 4px rgba(0, 0, 0, 0.1)' }, // Shadow only on desktop
    position: { xs: 'fixed', sm: 'sticky' },
    top: 0,
    height: { xs: '100vh', sm: '100vh' },
    zIndex: 1000,
    transform: { xs: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)', sm: 'none' },
    transition: 'transform 0.3s ease-in-out',
    display: { xs: isSidebarOpen ? 'block' : 'none', sm: 'block' },
  };

  const sidebarTitleStyle = {
    fontSize: '18px',
    fontWeight: 700,
    color: '#080733',
    mb: '20px',
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
    fontWeight: 500,
    color: '#555',
    backgroundColor: '#ffffff',
    border: '1px solid transparent', // Prevent shifting
    borderRadius: '4px',
    textTransform: 'none',
    justifyContent: 'flex-start',
    transition: 'background-color 0.3s, color 0.3s, box-shadow 0.3s',
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: '#f0f1f5',
    color: '#080733',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const buttonActiveStyle = {
    ...buttonStyle,
    backgroundColor: '#e6e8f0',
    color: '#080733',
    fontWeight: 600,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const contentStyle = {
    flex: 1,
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const contentTitleStyle = {
    fontSize: '24px',
    fontWeight: 700,
    color: '#080733',
    mb: '15px',
  };

  const contentTextStyle = {
    fontSize: '16px',
    color: '#555',
    mb: '10px',
  };

  const createButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 600,
    color: '#080733',
    backgroundColor: '#ffffff',
    border: '1px solid #080733',
    borderRadius: '4px',
    textDecoration: 'none',
    transition: 'background-color 0.3s',
    textTransform: 'none',
  };

  const createButtonHoverStyle = {
    ...createButtonStyle,
    backgroundColor: '#f0f1f5',
  };

  const hamburgerStyle = {
    display: { xs: 'block', sm: 'none' },
    position: 'fixed',
    top: '10px',
    left: '10px',
    zIndex: 1100,
  };

  const menuItems = [
    { name: 'Profile', icon: <AccountCircleIcon sx={{ fontSize: '20px', color: '#080733' }} />, key: 'profile' },
    { name: 'My Images', icon: <ImageIcon sx={{ fontSize: '20px', color: '#080733' }} />, key: 'images' },
    { name: 'Update', icon: <RefreshIcon sx={{ fontSize: '20px', color: '#080733' }} />, key: 'update' },
    { name: 'My Templates', icon: <BookmarkIcon sx={{ fontSize: '20px', color: '#080733' }} />, key: 'templates' },
    { name: 'My Streams', icon: <StreamIcon sx={{ fontSize: '20px', color: '#080733' }} />, key: 'streams' },
    { name: 'My Votes', icon: <ThumbUpIcon sx={{ fontSize: '20px', color: '#080733' }} />, key: 'votes' },
    { name: 'My Comments', icon: <CommentIcon sx={{ fontSize: '20px', color: '#080733' }} />, key: 'comments' },
    { name: 'Top Users', icon: <StarIcon sx={{ fontSize: '20px', color: '#080733' }} />, key: 'top-users' },
    { name: 'Messages', icon: <MessageIcon sx={{ fontSize: '20px', color: '#080733' }} />, key: 'messages' },
    { name: 'Notifications', icon: <NotificationsIcon sx={{ fontSize: '20px', color: '#080733' }} />, key: 'notifications' },
    { name: 'Settings', icon: <SettingsIcon sx={{ fontSize: '20px', color: '#080733' }} />, key: 'settings' },
  ];

  const renderContent = () => {
    switch (activeMenuItem) {
      case 'profile':
        return <Profile />;
      case 'images':
        return (
          <>
            <Typography variant="h2" sx={contentTitleStyle}>My Images</Typography>
            <Typography sx={contentTextStyle}>List of your saved images.</Typography>
          </>
        );
   
   
      case 'update':
        return (
          <>
            <Typography variant="h2" sx={contentTitleStyle}>Update</Typography>
            <Typography sx={contentTextStyle}>Update your memes.</Typography>
          </>
        );
      case 'templates':
        return (
          <>
            <Typography variant="h2" sx={contentTitleStyle}>My Templates</Typography>
            <Typography sx={contentTextStyle}>List of your templates.</Typography>
          </>
        );
      case 'streams':
        return (
          <>
            <Typography variant="h2" sx={contentTitleStyle}>My Streams</Typography>
            <Typography sx={contentTextStyle}>Your activity streams.</Typography>
          </>
        );
      case 'votes':
        return (
          <>
            <Typography variant="h2" sx={contentTitleStyle}>My Votes</Typography>
            <Typography sx={contentTextStyle}>Your votes for memes.</Typography>
          </>
        );
      case 'comments':
        return (
          <>
            <Typography variant="h2" sx={contentTitleStyle}>My Comments</Typography>
            <Typography sx={contentTextStyle}>Your comments on memes.</Typography>
          </>
        );
      case 'top-users':
        return (
          <>
            <Typography variant="h2" sx={contentTitleStyle}>Top Users</Typography>
            <Typography sx={contentTextStyle}>Ranking of top users.</Typography>
          </>
        );
      case 'messages':
        return (
          <>
            <Typography variant="h2" sx={contentTitleStyle}>Messages</Typography>
            <Typography sx={contentTextStyle}>Your messages.</Typography>
          </>
        );
      case 'notifications':
        return (
          <>
            <Typography variant="h2" sx={contentTitleStyle}>Notifications</Typography>
            <Typography sx={contentTextStyle}>Your notifications.</Typography>
          </>
        );
      case 'settings':
        return (
          <>
            <Typography variant="h2" sx={contentTitleStyle}>Settings</Typography>
            <Typography sx={contentTextStyle}>Configure your profile.</Typography>
          </>
        );
      default:
        return <Profile />;
    }
  };

  return (
    <Box sx={containerStyle}>
      {/* Hamburger Menu for Mobile */}
      <IconButton sx={hamburgerStyle} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? <CloseIcon sx={{ color: '#080733' }} /> : <MenuIcon sx={{ color: '#080733' }} />}
      </IconButton>

      {/* Sidebar */}
      <Box sx={sidebarStyle}>
        <Typography variant="h3" sx={sidebarTitleStyle}>Profile</Typography>
        <Box sx={buttonContainerStyle}>

          {menuItems.map((item, index) => (
            <Button
              key={index}
              sx={
                activeMenuItem === item.key
                  ? buttonActiveStyle
                  : activeButton === index
                    ? buttonHoverStyle
                    : buttonStyle
              }
              onMouseEnter={() => setActiveButton(index)}
              onMouseLeave={() => setActiveButton(null)}
              onClick={() => {
                setActiveMenuItem(item.key);
                setIsSidebarOpen(false); // Close sidebar on mobile
              }}
            >
              {item.icon}
              {item.name}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={contentStyle}>{renderContent()}</Box>
    </Box>
  );
};

export default MemeGallery;