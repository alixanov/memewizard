import React, { useState } from 'react';
import memeData from '../data/memeData';
import SearchIcon from '@mui/icons-material/Search';

const AllMeme = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const containerStyle = {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '10px'
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: '700',
    color: '#333',
    margin: 0,
  };

  const searchContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    border: '1px solid #ddd',
    padding: '8px 12px',
    width: '300px',
    maxWidth: '100%'
  };

  const searchInputStyle = {
    border: 'none',
    outline: 'none',
    width: '100%',
    fontSize: '14px',
    marginLeft: '8px'
  };

  const searchIconStyle = {
    color: '#666',
    fontSize: '20px'
  };

  const categoryStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '20px 0 10px',
    color: '#080733'
  };

  const cardMemsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '15px',
    marginBottom: '30px'
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    width: '100%',
    height: '250px', // Increased height
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
    },
  };

  const cardImageStyle = {
    width: '100%',
    height: '250px', // Increased height
    objectFit: 'cover',
  };


  const emptyStateStyle = {
    fontSize: '14px',
    color: '#666',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px'
  };

  // Group memes by categories
  const groupedMemes = memeData.reduce((acc, meme) => {
    if (!acc[meme.category]) {
      acc[meme.category] = [];
    }
    acc[meme.category].push(meme);
    return acc;
  }, {});

  // Filter memes by search term (by category and description if available)
  const filteredMemes = Object.keys(groupedMemes).reduce((acc, category) => {
    const filtered = groupedMemes[category].filter(meme =>
      meme.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (meme.description && meme.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {});

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>All Memes</h2>
        <div style={searchContainerStyle}>
          <SearchIcon style={searchIconStyle} />
          <input
            type="text"
            placeholder="Search by category or description..."
            style={searchInputStyle}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {Object.keys(filteredMemes).length > 0 ? (
        Object.keys(filteredMemes).map((category, index) => (
          <div key={index}>
            <div style={categoryStyle}>{category}</div>
            <div style={cardMemsStyle}>
              {filteredMemes[category].map((meme, idx) => (
                <div key={idx} style={cardStyle}>
                  <img
                    src={meme.url}
                    alt={meme.category}
                    style={cardImageStyle}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div style={emptyStateStyle}>
          {searchTerm ? 'Nothing found' : 'No memes available'}
        </div>
      )}
    </div>
  );
};

export default AllMeme;