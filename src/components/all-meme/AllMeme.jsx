import React, { useState } from 'react';
import memeData from '../data/memeData';

const AllMeme = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const containerStyle = {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const categoryStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '20px 0 10px',
  };

  const cardMemsStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '4px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    width: '100px',
    height: '100px',
  };

  const cardImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  // Группируем мемы по категориям
  const groupedMemes = memeData.reduce((acc, meme) => {
    if (!acc[meme.category]) {
      acc[meme.category] = [];
    }
    acc[meme.category].push(meme);
    return acc;
  }, {});

  // Фильтруем мемы по поисковому запросу
  const filteredMemes = Object.keys(groupedMemes).reduce((acc, category) => {
    const filtered = groupedMemes[category].filter(meme =>
      meme.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {});

  return (
    <div style={containerStyle}>
      {/* Поле ввода для поиска */}
      <input
        type="text"
        placeholder="Поиск мемов..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '10px', width: '100%', marginBottom: '20px', fontSize: '16px',borderRadius:8 }}
      />

      {Object.keys(filteredMemes).map((category, index) => (
        <div key={index}>
          <div style={categoryStyle}>{category}</div>
          <div style={cardMemsStyle}>
            {filteredMemes[category].map((meme, idx) => (
              <img key={idx} src={meme.url} alt={meme.category} style={cardStyle} loading="lazy" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllMeme;
