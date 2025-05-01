import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import DrawIcon from '@mui/icons-material/Draw';

// Generate mock video data dynamically
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

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef(null);

  // Simulate API call with mock data
  const fetchVideos = async (pageNum) => {
    setIsLoading(true);
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newVideos = generateMockVideos(pageNum, 12); // Fetch 12 videos per page
    setVideos((prev) => [...prev, ...newVideos]);
    setIsLoading(false);
  };

  // Initial fetch
  useEffect(() => {
    fetchVideos(page);
  }, []);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setPage((prev) => prev + 1);
          fetchVideos(page + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [isLoading, page]);

  const homeContainerStyle = {
    padding: '20px',
    backgroundColor: '#f5f5f5', // Matches body background from your CSS
    minHeight: '100vh',
  };

  const videoGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    padding: '0 10px',
  };

  const videoCardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
  };

  const thumbnailStyle = {
    width: '100%',
    aspectRatio: '16/9',
    objectFit: 'cover',
  };

  const videoInfoStyle = {
    padding: '10px',
    color: '#000000',
  };

  const titleStyle = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#000000',
    marginBottom: '5px',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const channelStyle = {
    fontSize: '14px',
    color: '#666666',
    marginBottom: '5px',
  };

  const metaStyle = {
    fontSize: '12px',
    color: '#888888',
    display: 'flex',
    gap: '10px',
  };

  const loadingStyle = {
    textAlign: 'center',
    padding: '20px',
    color: '#666666',
    fontSize: '16px',
  };

  return (
    <div style={homeContainerStyle}>
      <div style={videoGridStyle}>
        {videos.map((video) => (
          <Link
            to={`/video/${video.id}`}
            key={video.id}
            style={{ textDecoration: 'none' }}
          >
            <div
              style={videoCardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                style={thumbnailStyle}
              />
              <div style={videoInfoStyle}>
                <div style={titleStyle}>{video.snippet.title}</div>
                <div style={channelStyle}>{video.snippet.channelTitle}</div>
                <div style={metaStyle}>
                  <span>{video.statistics.viewCount} views</span>
                  <span>
                    {new Date(video.snippet.publishedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div ref={loaderRef} style={loadingStyle}>
        {isLoading ? 'Loading more videos...' : ''}
      </div>
    </div>
  );
};

export default Home;