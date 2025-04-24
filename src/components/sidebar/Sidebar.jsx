import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupsIcon from '@mui/icons-material/Groups';


const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 768px)').matches);
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleMediaChange = (e) => setIsMobile(e.matches);

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  const sidebarStyle = isMobile
    ? {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      padding: '10px 20px',
      backgroundColor: '#e6e8f0', // Updated background color
      boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)',
      position: 'fixed',
      bottom: 0,
      left: 0,
      zIndex: 1000,
    }
    : {
      display: 'flex',
      flexDirection: 'column',
      width: '250px',
      height: '100vh',
      padding: '20px',
      backgroundColor: '#e6e8f0', // Updated background color
      boxShadow: '2px 0 4px rgba(0, 0, 0, 0.1)',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1000,
    };

  const logoStyle = isMobile
    ? {
      fontSize: '18px',
      fontWeight: '700',
      color: '#080733',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
    }
    : {
      fontSize: '24px',
      fontWeight: '700',
      color: '#080733',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '30px',
    };

  const navLinksStyle = isMobile
    ? {
      display: 'flex',
      flexDirection: 'row',
      gap: '15px',
      flex: 1,
      justifyContent: 'flex-end',
    }
    : {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    };

  const linkStyle = isMobile
    ? {
      padding: '8px',
      borderRadius: '8px',
      transition: 'background-color 0.3s, color 0.3s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
    : {
      color: '#555',
      fontSize: '16px',
      fontWeight: '500',
      padding: '10px',
      borderRadius: '8px',
      transition: 'background-color 0.3s, color 0.3s',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    };

  const activeLinkStyle = isMobile
    ? {
      ...linkStyle,
      backgroundColor: '#ffffff', // More minimal active color
    }
    : {
      ...linkStyle,
      color: '#080733',
      backgroundColor: '#ffffff', // More minimal active color
    };

  const hoverLinkStyle = isMobile
    ? {
      ...linkStyle,
      backgroundColor: '#f0f1f5',
    }
    : {
      ...linkStyle,
      color: '#080733',
      backgroundColor: '#f0f1f5',
    };

  const getLinkStyle = (isActive, linkName) =>
    isActive ? activeLinkStyle : hoveredLink === linkName ? hoverLinkStyle : linkStyle;

  const links = [
    { name: 'Home', icon: <HomeIcon style={{ color: '#080733', fontSize: isMobile ? '20px' : '24px' }} />, to: '/' },
    { name: 'Profile', icon: <AccountCircleIcon style={{ color: '#080733', fontSize: isMobile ? '20px' : '24px' }} />, to: '/gallery' },
    { name: 'Editor', icon: <EditIcon style={{ color: '#080733', fontSize: isMobile ? '20px' : '24px' }} />, to: '/editor' },
    { name: 'All Meme', icon: <AutoAwesomeMotionIcon style={{ color: '#080733', fontSize: isMobile ? '20px' : '24px' }} />, to: '/all-memes' },
    {
      name: 'All Streams', icon: <GroupsIcon style={{ color: '#080733', fontSize: isMobile ? '20px' : '24px' }} />, to: '/all-streams'
    },
  ];

  return (
    <nav style={sidebarStyle}>
      <div style={logoStyle}>
        <SettingsSuggestIcon style={{ color: '#080733', fontSize: isMobile ? '20px' : '24px' }} />
        {isMobile ? '' : 'MemeWizard'}
      </div>
      <ul style={navLinksStyle}>
        {links.map((link) => (
          <li key={link.name}>
            <NavLink
              to={link.to}
              style={({ isActive }) => getLinkStyle(isActive, link.name.toLowerCase())}
              onMouseEnter={() => !isMobile && setHoveredLink(link.name.toLowerCase())}
              onMouseLeave={() => !isMobile && setHoveredLink(null)}
            >
              {link.icon}
              {!isMobile && <span>{link.name}</span>}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;