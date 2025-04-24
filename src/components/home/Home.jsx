import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DrawIcon from '@mui/icons-material/Draw';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import ImageIcon from '@mui/icons-material/Image';
import CropIcon from '@mui/icons-material/Crop';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import memeData from '../data/memeData';
import memeStreamsData from '../data/memeStreamsData';

const Home = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const containerStyle = {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#f8f9fa',
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
    borderRadius: '6px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    border: '1px solid transparent', // Зарезервировать место для границы
    cursor: 'pointer',
    transition: 'background-color 0.3s, box-shadow 0.3s',
  };

  const featureItemHoverStyle = {
    ...featureItemStyle,
    backgroundColor: '#f0f1f5',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)', // Усиление тени вместо границы
  };

  const featureTextStyle = {
    marginTop: '10px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  };

  const myMemsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    backgroundColor: '#ffffff',
    borderRadius: '6px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '40px',
  };

  const myMemsLinkStyle = {
    fontSize: '16px',
    fontWeight: '700',
    color: '#333',
    textDecoration: 'none',
  };

  const allLinkStyle = {
    fontSize: '14px',
    fontWeight: '500',
    color: '#555',
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    transition: 'background-color 0.3s, color 0.3s',
  };

  const allLinkHoverStyle = {
    ...allLinkStyle,
    backgroundColor: '#f0f1f5',
    color: '#080733', // Более насыщенный цвет при наведении
  };

  const cardMemsStyle = {
    marginBottom: '40px',
  };

  const cardMemsHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  };

  const cardMemsTitleStyle = {
    fontSize: '20px',
    fontWeight: '700',
    color: '#333',
  };

  const cardGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
    gap: '5px',
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '4px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    border: '1px solid transparent', // Зарезервировать место
    overflow: 'hidden',
    width: '60px',
    height: '60px',
    transition: 'background-color 0.3s, box-shadow 0.3s',
  };

  const cardHoverStyle = {
    ...cardStyle,
    backgroundColor: '#f0f1f5',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)', // Усиление тени
  };

  const cardImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const allMemesLinkStyle = {
    fontSize: '14px',
    fontWeight: '500',
    color: '#333',
    textDecoration: 'none',
    transition: 'color 0.3s',
  };

  const allMemesLinkHoverStyle = {
    ...allMemesLinkStyle,
    color: '#080733', // Более насыщенный цвет
  };

  const streamsSectionStyle = {
    marginBottom: '40px',
  };

  const streamsHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  };

  const streamsTitleStyle = {
    fontSize: '20px',
    fontWeight: '700',
    color: '#333',
  };

  const streamsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    marginBottom: '10px',
  };

  const streamCardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '6px',
    border: '1px solid transparent', // Зарезервировать место
    overflow: 'hidden',
    padding: '10px',
    transition: 'background-color 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
  };

  const streamCardHoverStyle = {
    ...streamCardStyle,
    backgroundColor: '#f0f1f5',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)', // Усиление тени
  };

  const streamCategoryStyle = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '8px',
  };

  const streamDescriptionStyle = {
    fontSize: '12px',
    color: '#666',
    marginBottom: '8px',
  };

  const features = [
    { name: 'Сделать мем', icon: <DrawIcon style={{ color: '#080733', fontSize: '24px' }} />, link: '/editor' },
    { name: 'Сделать GIF файл', icon: <AddCircleOutlineIcon style={{ color: '#080733', fontSize: '24px' }} />, link: '/editor' },
    { name: 'Мем ИИ', icon: <AutoGraphIcon style={{ color: '#080733', fontSize: '24px' }} />, link: '/editor' },
    { name: 'Диаграмма', icon: <ImageIcon style={{ color: '#080733', fontSize: '24px' }} />, link: '/editor' },
    { name: 'Изменить размер', icon: <CropIcon style={{ color: '#080733', fontSize: '24px' }} />, link: '/editor' },
    { name: 'Демотиватор', icon: <SentimentDissatisfiedIcon style={{ color: '#080733', fontSize: '24px' }} />, link: '/editor' },
  ];

  const displayedMemes = memeData.slice(0, 14);
  const displayedStreams = memeStreamsData.slice(0, 5);

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
        <div style={cardMemsHeaderStyle}>
          <div style={cardMemsTitleStyle}>Шаблоны</div>
          <Link
            to="/all-memes"
            style={hoveredCard === 'all-memes' ? allMemesLinkHoverStyle : allMemesLinkStyle}
            onMouseEnter={() => setHoveredCard('all-memes')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            Все
          </Link>
        </div>
        <div style={cardGridStyle}>
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
        </div>
      </div>

      {/* Мем-потоки */}
      <div style={streamsSectionStyle}>
        <div style={streamsHeaderStyle}>
          <div style={streamsTitleStyle}>Мем-потоки</div>
          <Link
            to="/all-streams"
            style={hoveredCard === 'all-streams' ? allMemesLinkHoverStyle : allMemesLinkStyle}
            onMouseEnter={() => setHoveredCard('all-streams')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            Все
          </Link>
        </div>
        <div style={streamsGridStyle}>
          {displayedStreams && displayedStreams.length > 0 ? (
            displayedStreams.map((stream, index) => (
              <Link
                key={index}
                to="/all-streams"
                style={hoveredCard === `stream-${index}` ? streamCardHoverStyle : streamCardStyle}
                onMouseEnter={() => setHoveredCard(`stream-${index}`)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={streamCategoryStyle}>{stream.category}</div>
                <div style={streamDescriptionStyle}>{stream.description}</div>
              </Link>
            ))
          ) : (
            <div style={{ fontSize: '14px', color: '#666' }}>Нет доступных мем-потоков</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;