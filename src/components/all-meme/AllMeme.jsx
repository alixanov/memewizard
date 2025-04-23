import React from 'react';
import memeData from '../data/memeData';

const AllMeme = () => {
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

  return (
    <div style={containerStyle}>
      {Object.keys(groupedMemes).map((category, index) => (
        <div key={index}>
          <div style={categoryStyle}>{category}</div>
          <div style={cardMemsStyle}>
            {groupedMemes[category].map((meme, idx) => (
              <img key={idx} src={meme.url} alt={meme.category} style={cardStyle} loading="lazy" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllMeme;
