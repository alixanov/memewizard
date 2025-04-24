import React, { useState } from 'react';
import memeStreamsData from '../data/memeStreamsData';
import SearchIcon from '@mui/icons-material/Search';
import { useMediaQuery } from '@mui/material';

const AllStreams = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedStream, setSelectedStream] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Основные стили
  const containerStyle = {
    padding: isMobile ? '10px' : '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '10px',
    width: '100%',
  };

  const titleStyle = {
    fontSize: isMobile ? '18px' : '20px',
    fontWeight: '700',
    color: '#333',
    margin: 0,
  };

  const searchContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: '4px',
    border: '1px solid #ddd',
    padding: '8px 12px',
    width: isMobile ? '100%' : '300px',
    boxSizing: 'border-box',
  };

  const searchInputStyle = {
    border: 'none',
    outline: 'none',
    width: '100%',
    fontSize: '14px',
    marginLeft: '8px',
  };

  const searchIconStyle = {
    color: '#666',
    fontSize: '20px',
  };

  const gridStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '100%',
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '6px',
    overflow: 'hidden',
    padding: isMobile ? '8px' : '10px',
    width: '100%',
    minHeight: isMobile ? '60px' : '70px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    border: '1px solid transparent',
    transition: 'background-color 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
    boxSizing: 'border-box',
  };

  const cardHoverStyle = {
    ...cardStyle,
    backgroundColor: '#f0f1f5',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
  };

  const categoryStyle = {
    fontSize: isMobile ? '14px' : '16px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '4px',
  };

  const descriptionStyle = {
    fontSize: isMobile ? '11px' : '12px',
    color: '#666',
    marginBottom: '4px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: isMobile ? 2 : 3,
    WebkitBoxOrient: 'vertical',
    lineHeight: '1.4',
  };

  const streamContentStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '6px',
    padding: isMobile ? '15px' : '20px',
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '100%',
    boxSizing: 'border-box',
  };

  const streamContentInnerStyle = {
    display: 'flex',
    gap: isMobile ? '10px' : '20px',
    flexDirection: isMobile ? 'column' : 'row',
    width: '100%',
  };

  const streamImageStyle = {
    width: isMobile ? '100%' : '300px',
    height: isMobile ? 'auto' : '300px',
    maxHeight: isMobile ? '300px' : 'none',
    objectFit: 'cover',
    borderRadius: '4px',
    flexShrink: 0,
  };

  const streamCommentsStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '100%',
  };

  const streamCommentStyle = {
    fontSize: isMobile ? '11px' : '12px',
    color: '#666',
    lineHeight: '1.4',
  };

  const streamCommentUserStyle = {
    fontWeight: '600',
    color: '#333',
  };

  const backButtonStyle = {
    fontSize: '14px',
    color: '#333',
    backgroundColor: '#f0f1f5',
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    alignSelf: 'flex-start',
    transition: 'background-color 0.3s',
    marginTop: isMobile ? '10px' : '0',
  };

  const exampleComments = [
    { user: 'User1', text: 'This is a great meme!' },
    { user: 'User2', text: 'Cats always win!' },
    { user: 'User3', text: 'These GIFs are fire!' },
  ];

  const filteredStreams = memeStreamsData.filter((stream) => {
    const query = searchQuery.toLowerCase();
    return (
      stream.category.toLowerCase().includes(query) ||
      stream.description.toLowerCase().includes(query)
    );
  });

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>All Meme Streams</h2>
        <div style={searchContainerStyle}>
          <SearchIcon style={searchIconStyle} />
          <input
            type="text"
            placeholder="Search by category or description..."
            style={searchInputStyle}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {!selectedStream ? (
        <div style={gridStyle}>
          {filteredStreams && filteredStreams.length > 0 ? (
            filteredStreams.map((stream, index) => (
              <div
                key={index}
                style={hoveredCard === index ? cardHoverStyle : cardStyle}
                onMouseEnter={() => !isMobile && setHoveredCard(index)}
                onMouseLeave={() => !isMobile && setHoveredCard(null)}
                onClick={() =>
                  setSelectedStream({
                    ...stream,
                    image: stream.image || 'https://via.placeholder.com/300x300',
                    comments: stream.comments || exampleComments,
                  })
                }
              >
                <div style={categoryStyle}>{stream.category}</div>
                <div style={descriptionStyle}>{stream.description}</div>
              </div>
            ))
          ) : (
            <div style={{ fontSize: '14px', color: '#666', padding: '10px' }}>
              {searchQuery ? 'Nothing found' : 'No meme streams available'}
            </div>
          )}
        </div>
      ) : (
        <div style={streamContentStyle}>
          <div style={categoryStyle}>{selectedStream.category}</div>
          <div style={streamContentInnerStyle}>
            <img
              src={selectedStream.image}
              alt={selectedStream.category}
              style={streamImageStyle}
            />
            <div style={streamCommentsStyle}>
              {selectedStream.comments && selectedStream.comments.length > 0 ? (
                selectedStream.comments.map((comment, cIndex) => (
                  <div key={cIndex} style={streamCommentStyle}>
                    <span style={streamCommentUserStyle}>{comment.user}: </span>
                    {comment.text}
                  </div>
                ))
              ) : (
                <div style={{ fontSize: '12px', color: '#666' }}>No comments</div>
              )}
            </div>
          </div>
          <button style={backButtonStyle} onClick={() => setSelectedStream(null)}>
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default AllStreams;