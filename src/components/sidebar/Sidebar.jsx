import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import HistoryIcon from '@mui/icons-material/History';
import XIcon from '@mui/icons-material/X';

const Navigation = () => {
  const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 768px)').matches);
  const [hoveredLink, setHoveredLink] = useState(null);



  const generateMockVideos = (page, count) => {
    const videos = [];
    for (let i = 1; i <= count; i++) {
      const id = `v${(page - 1) * count + i}`;
      videos.push({
        id,
        snippet: {
          title: `Memecoin Video #${id}`,
          channelTitle: `Creator${i % 5 || 1}`,
          thumbnails: {
            medium: {
              url: `https://i.ytimg.com/vi/${['dQw4w9WgXcQ', '9bZkp7q19f0', 'TGjB2D6hQ8U'][i % 3]}/mqdefault.jpg`,
            },
          },
          publishedAt: new Date(2025, 3 - (page % 12), i).toISOString(),
        },
        statistics: {
          viewCount: `${Math.floor(Math.random() * 500) + 50}K`,
        },
      });
    }
    return videos;
  };


  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleMediaChange = (e) => setIsMobile(e.matches);

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  // Navbar Styles
  const navbarStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '10px 20px',
    backgroundColor: '#000000',
    boxShadow: '0 2px 4px rgba(255, 255, 255, 0.1)',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
  };

  const logoStyle = {
    fontSize: '24px',
    fontWeight: '700',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const searchContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    maxWidth: '600px',
    margin: '0 20px',
    backgroundColor: '#222222',
    borderRadius: '20px',
    padding: '5px 10px',
  };

  const searchInputStyle = {
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#ffffff',
    fontSize: '16px',
    padding: '5px',
  };

  const searchIconStyle = {
    color: '#cccccc',
    fontSize: '20px',
  };

  const profileLinkStyle = {
    color: '#ffffff',
    padding: '8px',
    borderRadius: '50%',
    transition: 'background-color 0.3s',
  };

  // Sidebar Styles
  const sidebarStyle = isMobile
    ? {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: '10px 20px',
        backgroundColor: '#000000',
        boxShadow: '0 -2px 4px rgba(255, 255, 255, 0.1)',
        position: 'fixed',
        bottom: 0,
        left: 0,
        zIndex: 1000,
      }
    : {
        display: 'flex',
        flexDirection: 'column',
        width: '250px',
        height: 'calc(100vh - 60px)',
        padding: '20px',
        backgroundColor: '#000000',
        boxShadow: '-2px 0 4px rgba(255, 255, 255, 0.1)',
        position: 'fixed',
        top: '60px',
        right: 0,
        zIndex: 1000,
      };

  const sidebarLogoStyle = isMobile
    ? {
        display: 'none',
      }
    : {
        fontSize: '24px',
        fontWeight: '700',
        color: '#ffffff',
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
        flex: 1,
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
        color: '#cccccc',
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
        backgroundColor: '#333333',
      }
    : {
        ...linkStyle,
        color: '#ffffff',
        backgroundColor: '#333333',
      };

  const hoverLinkStyle = isMobile
    ? {
        ...linkStyle,
        backgroundColor: '#222222',
      }
    : {
        ...linkStyle,
        color: '#ffffff',
        backgroundColor: '#222222',
      };

  const getLinkStyle = (isActive, linkName) =>
    isActive ? activeLinkStyle : hoveredLink === linkName ? hoverLinkStyle : linkStyle;

  const links = [
    { name: 'Home', icon: <HomeIcon style={{ color: '#ffffff', fontSize: isMobile ? '20px' : '24px' }} />, to: '/' },
    {
      name: 'Hot',
      icon: <LocalFireDepartmentIcon style={{ color: '#ffffff', fontSize: isMobile ? '20px' : '24px' }} />,
      to: '/hot',
    },
    {
      name: 'History',
      icon: <HistoryIcon style={{ color: '#ffffff', fontSize: isMobile ? '20px' : '24px' }} />,
      to: '/history',
    },
  ];

  return (
    <>
      {/* Navbar */}
      <nav style={navbarStyle}>
        <NavLink to="/" style={logoStyle}>
          <VideoLibraryIcon style={{ color: '#ffffff', fontSize: '24px' }} />
          REELX
        </NavLink>
        <div style={searchContainerStyle}>
          <input
            type="text"
            placeholder="Search for memecoin videos..."
            style={searchInputStyle}
          />
          <SearchIcon style={searchIconStyle} />
        </div>
        <NavLink
          to="/profile"
          style={({ isActive }) =>
            isActive ? { ...profileLinkStyle, backgroundColor: '#333333' } : profileLinkStyle
          }
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#333333')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <AccountCircleIcon style={{ color: '#ffffff', fontSize: '24px' }} />
        </NavLink>
      </nav>

      {/* Sidebar */}
      <nav style={sidebarStyle}>
        {!isMobile && (
          <div style={sidebarLogoStyle}>
            <VideoLibraryIcon style={{ color: '#ffffff', fontSize: '24px' }} />
            REELX
          </div>
        )}
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
        <a
          href="https://x.com/memewizzard_sol"
          target="_blank"
          rel="noopener noreferrer"
          style={hoveredLink === 'follow-us' ? hoverLinkStyle : linkStyle}
          onMouseEnter={() => !isMobile && setHoveredLink('follow-us')}
          onMouseLeave={() => !isMobile && setHoveredLink(null)}
        >
          <XIcon style={{ color: '#ffffff', fontSize: isMobile ? '20px' : '24px' }} />
          {!isMobile && <span>Follow Us</span>}
        </a>
      </nav>
    </>
  );
};

export default Navigation;