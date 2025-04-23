import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

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
      backgroundColor: '#ffffff',
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
      backgroundColor: '#ffffff',
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
    }
    : {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    };

  const linkStyle = {
    color: '#555',
    fontSize: isMobile ? '14px' : '16px',
    fontWeight: '500',
    padding: isMobile ? '8px' : '10px',
    borderRadius: '4px',
    transition: 'background-color 0.3s, color 0.3s',
    display: 'block',
  };

  const activeLinkStyle = {
    ...linkStyle,
    color: '#080733',
    backgroundColor: '#e6e8f0',
  };

  const hoverLinkStyle = {
    ...linkStyle,
    color: '#080733',
    backgroundColor: '#f0f1f5',
  };

  const getLinkStyle = (isActive, linkName) =>
    isActive ? activeLinkStyle : hoveredLink === linkName ? hoverLinkStyle : linkStyle;

  return (
    <nav style={sidebarStyle}>
      <div style={logoStyle}>
        <SettingsSuggestIcon style={{ color: '#080733', fontSize: isMobile ? '20px' : '24px' }} />
        MemeWizard
      </div>
      <ul style={navLinksStyle}>
        <li>
          <NavLink
            to="/"
            style={({ isActive }) => getLinkStyle(isActive, 'home')}
            onMouseEnter={() => !isMobile && setHoveredLink('home')}
            onMouseLeave={() => !isMobile && setHoveredLink(null)}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/editor"
            style={({ isActive }) => getLinkStyle(isActive, 'editor')}
            onMouseEnter={() => !isMobile && setHoveredLink('editor')}
            onMouseLeave={() => !isMobile && setHoveredLink(null)}
          >
            Editor
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/gallery"
            style={({ isActive }) => getLinkStyle(isActive, 'gallery')}
            onMouseEnter={() => !isMobile && setHoveredLink('gallery')}
            onMouseLeave={() => !isMobile && setHoveredLink(null)}
          >
            Gallery
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;