import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DrawIcon from '@mui/icons-material/Draw';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import ImageIcon from '@mui/icons-material/Image';
import CropIcon from '@mui/icons-material/Crop';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import memeData from '../data/memeData';

const Home = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const containerStyle = {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const featuresStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '15px',
    marginBottom: '40px',
  };

  const featureItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '15px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'background-color 0.3s, border 0.3s',
  };

  const featureItemHoverStyle = {
    ...featureItemStyle,
    backgroundColor: '#f0f1f5',
    border: '1px solid #080733',
  };

  const featureTextStyle = {
    marginTop: '10px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#080733',
    textAlign: 'center',
  };

  const myMemsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '40px',
  };

  const myMemsLinkStyle = {
    fontSize: '16px',
    fontWeight: '700',
    color: '#080733',
    textDecoration: 'none',
  };

  const allLinkStyle = {
    fontSize: '14px',
    fontWeight: '500',
    color: '#555',
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  };

  const allLinkHoverStyle = {
    ...allLinkStyle,
    backgroundColor: '#f0f1f5',
  };

  const cardMemsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
    gap: '5px',
    marginBottom: '20px',
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '4px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    width: '60px',
    height: '60px',
    transition: 'transform 0.2s',
  };

  const cardHoverStyle = {
    ...cardStyle,
    transform: 'scale(1.05)',
  };

  const cardImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const allMemesLinkStyle = {
    fontSize: '14px',
    fontWeight: '500',
    color: '#080733',
    textDecoration: 'none',
    transition: 'color 0.3s',
  };

  const allMemesLinkHoverStyle = {
    ...allMemesLinkStyle,
    color: '#555',
  };

  const features = [
    { name: 'Сделать мем', icon: <DrawIcon style={{ color: '#080733', fontSize: '24px' }} />, link: '/editor' },
    { name: 'Сделать GIF файл', icon: <AddCircleOutlineIcon style={{ color: '#080733', fontSize: '24px' }} />, link: '/editor' },
    { name: 'Мем ИИ', icon: <AutoGraphIcon style={{ color: '#080733', fontSize: '24px' }} />, link: '/editor' },
    { name: 'Диаграмма', icon: <ImageIcon style={{ color: '#080733', fontSize: '24px' }} />, link: '/editor' },
    { name: 'Изменить размер', icon: <CropIcon style={{ color: '#080733', fontSize: '24px' }} />, link: '/editor' },
    { name: 'Демотиватор', icon: <SentimentDissatisfiedIcon style={{ color: '#080733', fontSize: '24px' }} />, link: '/editor' },
  ];

  const displayedMemes = memeData.slice(0, 14); // Показываем первые 8 мемов

  return (
    <div style={containerStyle}>
      {/* Список функций */}
      <div style={featuresStyle}>
        {features.map((feature, index) => (
          <Link
            key={index}
            to={feature.link}
            style={hoveredCard === index ? featureItemHoverStyle : featureItemStyle}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {feature.icon}
            <span style={featureTextStyle}>{feature.name}</span>
          </Link>
        ))}
      </div>

      {/* Мои творения */}
      <div style={myMemsStyle}>
        <Link to="/profile" style={myMemsLinkStyle}>
          Мои творения
        </Link>
        <Link
          to="/gallery"
          style={hoveredCard === 'all' ? allLinkHoverStyle : allLinkStyle}
          onMouseEnter={() => setHoveredCard('all')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          Все
        </Link>
      </div>

      {/* Галерея мемов */}
      <div style={cardMemsStyle}>
        {displayedMemes.map((meme, index) => (
          <Link
            key={index}
            to="/editor"
            style={hoveredCard === `meme-${index}` ? cardHoverStyle : cardStyle}
            onMouseEnter={() => setHoveredCard(`meme-${index}`)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <img src={meme.url} alt={meme.category} style={cardImageStyle} />
          </Link>
        ))}
        <Link
          to="/all-memes"
          style={hoveredCard === 'all-memes' ? allMemesLinkHoverStyle : allMemesLinkStyle}
          onMouseEnter={() => setHoveredCard('all-memes')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          Все
        </Link>
      </div>
    </div>
  );
};

export default Home;