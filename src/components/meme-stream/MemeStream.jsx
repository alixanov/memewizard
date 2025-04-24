import React, { useState } from 'react';
import memeStreamsData from '../data/memeStreamsData';
import SearchIcon from '@mui/icons-material/Search';

const AllStreams = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedStream, setSelectedStream] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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
    borderRadius: '4px',
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

  const gridStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    overflow: 'hidden',
    padding: '10px',
    width: '100%',
    height: '70px',
    transition: 'background-color 0.3s, border 0.3s',
    cursor: 'pointer',
  };

  const cardHoverStyle = {
    ...cardStyle,
    backgroundColor: '#f0f1f5',
    border: '1px solid #333',
  };

  const categoryStyle = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '8px',
  };

  const descriptionStyle = {
    fontSize: '12px',
    color: '#666',
    marginBottom: '8px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  };

  const streamContentStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '20px',
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  };

  const streamContentInnerStyle = {
    display: 'flex',
    gap: '20px',
    flexDirection: 'row',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
    },
  };

  const streamImageStyle = {
    width: '300px',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '4px',
    flexShrink: 0,
  };

  const streamCommentsStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };

  const streamCommentStyle = {
    fontSize: '12px',
    color: '#666',
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
  };

  // Example comments
  const exampleComments = [
    { user: 'User1', text: 'Это супер мем!' },
    { user: 'User2', text: 'Ха, котята всегда побеждают!' },
    { user: 'User3', text: 'Гифки тут огонь!' },
  ];

  // Filter streams based on search query
  const filteredStreams = memeStreamsData.filter(stream => {
    const query = searchQuery.toLowerCase();
    return (
      stream.category.toLowerCase().includes(query) ||
      stream.description.toLowerCase().includes(query)
    );
  });

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>Все мем-потоки</h2>
        <div style={searchContainerStyle}>
          <SearchIcon style={searchIconStyle} />
          <input
            type="text"
            placeholder="Поиск по категории или описанию..."
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
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setSelectedStream({
                  ...stream,
                  image: stream.image || 'https://via.placeholder.com/300x300',
                  comments: stream.comments || exampleComments
                })}
              >
                <div style={categoryStyle}>{stream.category}</div>
                <div style={descriptionStyle}>{stream.description}</div>
              </div>
            ))
          ) : (
            <div style={{ fontSize: '14px', color: '#666' }}>
              {searchQuery ? 'Ничего не найдено' : 'Нет доступных мем-потоков'}
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
                <div style={{ fontSize: '12px', color: '#666' }}>Нет комментариев</div>
              )}
            </div>
          </div>
          <button style={backButtonStyle} onClick={() => setSelectedStream(null)}>
            Назад
          </button>
        </div>
      )}
    </div>
  );
};

export default AllStreams;