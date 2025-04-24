import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ImageIcon from '@mui/icons-material/Image';
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
import { Profile, MyMem } from '../../components/';

const MobileOptimizedMemeGallery = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('profile');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    width: '100%',
    overflowX: 'hidden',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 15px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  };

  const headerTitleStyle = {
    fontSize: '18px',
    fontWeight: 700,
    color: '#080733',
    margin: 0,
  };

  const sidebarStyle = {
    width: '85%',
    maxWidth: '300px',
    backgroundColor: '#ffffff',
    padding: '15px',
    boxShadow: '2px 0 8px rgba(0, 0, 0, 0.2)',
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    height: '100vh',
    zIndex: 1000,
    transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
    transition: 'transform 0.3s ease-in-out',
    overflowY: 'auto',
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
    opacity: isSidebarOpen ? 1 : 0,
    visibility: isSidebarOpen ? 'visible' : 'hidden',
    transition: 'opacity 0.3s, visibility 0.3s',
  };

  const sidebarTitleStyle = {
    fontSize: '18px',
    fontWeight: 700,
    color: '#080733',
    mb: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    fontWeight: 500,
    color: '#555',
    backgroundColor: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    textTransform: 'none',
    justifyContent: 'flex-start',
    transition: 'background-color 0.3s, color 0.3s',
  };

  const buttonActiveStyle = {
    ...buttonStyle,
    backgroundColor: '#e6e8f0',
    color: '#080733',
    fontWeight: 600,
  };

  const contentStyle = {
    flex: 1,
    padding: '15px',
    width: '100%',
  };

  const bottomNavStyle = {
    display: { xs: 'none', sm: 'flex' }, // Hide on mobile
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    borderTop: '1px solid #e0e0e0',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '8px 0',
    zIndex: 10,
  };

  const topNavStyle = {
    display: { xs: 'flex', sm: 'none' }, // Show on mobile
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e0e0e0',
    position: 'fixed',
    top: '56px', // Below header
    left: 0,
    right: 0,
    padding: '8px 0',
    zIndex: 10,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const tabStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '12px',
    color: '#777',
    gap: '4px',
    padding: '4px 8px',
  };

  const activeTabStyle = {
    ...tabStyle,
    color: '#080733',
    fontWeight: 600,
  };

  const contentPaddingStyle = {
    paddingTop: { xs: '104px', sm: '15px' }, // Header (56px) + Navbar (48px) on mobile
    paddingBottom: { xs: '15px', sm: '60px' }, // Bottom nav on desktop
  };

  // Bottom/top navigation tabs
  const tabs = [
    { name: 'Profile', icon: <AccountCircleIcon sx={{ fontSize: '24px', color: '#080733' }} />, key: 'profile' },
    { name: 'Images', icon: <ImageIcon sx={{ fontSize: '24px', color: '#080733' }} />, key: 'images' },
    { name: 'Templates', icon: <BookmarkIcon sx={{ fontSize: '24px', color: '#080733' }} />, key: 'templates' },
    { name: 'Messages', icon: <MessageIcon sx={{ fontSize: '24px', color: '#080733' }} />, key: 'messages' },
    { name: 'Menu', icon: <MenuIcon sx={{ fontSize: '24px', color: '#080733' }} />, key: 'menu' },
  ];

  // Sidebar items (exclude footer tabs)
  const sidebarItems = [
    { name: 'Update', icon: <RefreshIcon sx={{ fontSize: '22px', color: '#080733' }} />, key: 'update' },
    { name: 'My Streams', icon: <StreamIcon sx={{ fontSize: '22px', color: '#080733' }} />, key: 'streams' },
    { name: 'My Votes', icon: <ThumbUpIcon sx={{ fontSize: '22px', color: '#080733' }} />, key: 'votes' },
    { name: 'My Comments', icon: <CommentIcon sx={{ fontSize: '22px', color: '#080733' }} />, key: 'comments' },
    { name: 'Top Users', icon: <StarIcon sx={{ fontSize: '22px', color: '#080733' }} />, key: 'top-users' },
    { name: 'Notifications', icon: <NotificationsIcon sx={{ fontSize: '22px', color: '#080733' }} />, key: 'notifications' },
    { name: 'Settings', icon: <SettingsIcon sx={{ fontSize: '22px', color: '#080733' }} />, key: 'settings' },
  ];

  // Combined menu items for content rendering
  const allMenuItems = [
    ...tabs.filter(tab => tab.key !== 'menu'),
    ...sidebarItems,
  ];

  const renderContent = () => {
    switch (activeMenuItem) {
      case 'profile':
        return <Profile />;
      case 'images':
        return <MyMem />;
      case 'update':
        return (
          <>
            <Typography variant="h2" sx={{ fontSize: '20px', fontWeight: 700, mb: 2 }}>Update</Typography>
            <Typography sx={{ fontSize: '14px' }}>Update your memes.</Typography>
          </>
        );
      case 'templates':
        return (
          <>
            <Typography variant="h2" sx={{ fontSize: '20px', fontWeight: 700, mb: 2 }}>My Templates</Typography>
            <Typography sx={{ fontSize: '14px' }}>List of your templates.</Typography>
          </>
        );
      case 'streams':
        return (
          <>
            <Typography variant="h2" sx={{ fontSize: '20px', fontWeight: 700, mb: 2 }}>My Streams</Typography>
            <Typography sx={{ fontSize: '14px' }}>Your activity streams.</Typography>
          </>
        );
      case 'votes':
        return (
          <>
            <Typography variant="h2" sx={{ fontSize: '20px', fontWeight: 700, mb: 2 }}>My Votes</Typography>
            <Typography sx={{ fontSize: '14px' }}>Your votes for memes.</Typography>
          </>
        );
      case 'comments':
        return (
          <>
            <Typography variant="h2" sx={{ fontSize: '20px', fontWeight: 700, mb: 2 }}>My Comments</Typography>
            <Typography sx={{ fontSize: '14px' }}>Your comments on memes.</Typography>
          </>
        );
      case 'top-users':
        return (
          <>
            <Typography variant="h2" sx={{ fontSize: '20px', fontWeight: 700, mb: 2 }}>Top Users</Typography>
            <Typography sx={{ fontSize: '14px' }}>Ranking of top users.</Typography>
          </>
        );
      case 'messages':
        return (
          <>
            <Typography variant="h2" sx={{ fontSize: '20px', fontWeight: 700, mb: 2 }}>Messages</Typography>
            <Typography sx={{ fontSize: '14px' }}>Your messages.</Typography>
          </>
        );
      case 'notifications':
        return (
          <>
            <Typography variant="h2" sx={{ fontSize: '20px', fontWeight: 700, mb: 2 }}>Notifications</Typography>
            <Typography sx={{ fontSize: '14px' }}>Your notifications.</Typography>
          </>
        );
      case 'settings':
        return (
          <>
            <Typography variant="h2" sx={{ fontSize: '20px', fontWeight: 700, mb: 2 }}>Settings</Typography>
            <Typography sx={{ fontSize: '14px' }}>Configure your profile.</Typography>
          </>
        );
      default:
        return <Profile />;
    }
  };

  const handleTabClick = (tab, index) => {
    setActiveTab(index);
    if (tab.key === 'menu') {
      setIsSidebarOpen(true);
    } else {
      setActiveMenuItem(tab.key);
    }
  };

  return (
    <Box sx={containerStyle}>
      {/* Header */}
      <Box sx={headerStyle}>
        <Typography variant="h1" sx={headerTitleStyle}>
          {allMenuItems.find(item => item.key === activeMenuItem)?.name || 'Profile'}
        </Typography>
        <Link to="/editor" style={{ textDecoration: 'none' }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<AddCircleOutlineIcon sx={{ color: '#080733' }} />}
            sx={{
              color: '#080733',
              borderColor: '#080733',
              textTransform: 'none',
              fontSize: '14px',
              padding: '4px 10px',
            }}
          >
            Create
          </Button>
        </Link>
      </Box>

      {/* Top Navigation (Mobile) */}
      <Box sx={topNavStyle}>
        {tabs.map((tab, index) => (
          <Box
            key={index}
            sx={activeTab === index ? activeTabStyle : tabStyle}
            onClick={() => handleTabClick(tab, index)}
          >
            {React.cloneElement(tab.icon, {
              sx: { fontSize: '24px', color: activeTab === index ? '#080733' : '#777' },
            })}
            <Typography sx={{ fontSize: '12px' }}>{tab.name}</Typography>
          </Box>
        ))}
      </Box>

      {/* Sidebar Overlay */}
      <Box sx={overlayStyle} onClick={() => setIsSidebarOpen(false)} />

      {/* Sidebar */}
      <Box sx={sidebarStyle}>
        <Box sx={sidebarTitleStyle}>
          <Typography variant="h3" sx={{ fontSize: '18px', fontWeight: 700 }}>Menu</Typography>
          <IconButton onClick={() => setIsSidebarOpen(false)} sx={{ padding: '4px' }}>
            <CloseIcon sx={{ color: '#080733' }} />
          </IconButton>
        </Box>
        <Box sx={buttonContainerStyle}>
          {sidebarItems.map((item, index) => (
            <Button
              key={index}
              sx={activeMenuItem === item.key ? buttonActiveStyle : buttonStyle}
              onClick={() => {
                setActiveMenuItem(item.key);
                setIsSidebarOpen(false);
              }}
            >
              {item.icon}
              {item.name}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ ...contentStyle, ...contentPaddingStyle }}>{renderContent()}</Box>

      {/* Bottom Navigation (Desktop) */}
      <Box sx={bottomNavStyle}>
        {tabs.map((tab, index) => (
          <Box
            key={index}
            sx={activeTab === index ? activeTabStyle : tabStyle}
            onClick={() => handleTabClick(tab, index)}
          >
            {React.cloneElement(tab.icon, {
              sx: { fontSize: '24px', color: activeTab === index ? '#080733' : '#777' },
            })}
            <Typography sx={{ fontSize: '12px' }}>{tab.name}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MobileOptimizedMemeGallery;