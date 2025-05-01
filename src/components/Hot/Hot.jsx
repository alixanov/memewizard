import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled components for better organization
const HotContainer = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 0 10px;
`;

const VideoCard = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
`;

const VideoInfo = styled.div`
  padding: 10px;
  color: #000000;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 5px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Channel = styled.div`
  font-size: 14px;
  color: #666666;
  margin-bottom: 5px;
`;

const Meta = styled.div`
  font-size: 12px;
  color: #888888;
  display: flex;
  gap: 10px;
`;

const Loading = styled.div`
  text-align: center;
  padding: 20px;
  color: #666666;
  font-size: 16px;
`;

const HotHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 10px;
`;

const HotTitle = styled.h1`
  font-size: 24px;
  color: #333;
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  background-color: ${props => props.active ? '#ff0000' : '#e0e0e0'};
  color: ${props => props.active ? '#fff' : '#333'};
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.active ? '#ff3333' : '#d0d0d0'};
  }
`;

// Enhanced mock data generator with popularity metrics
const generateHotVideos = (count) => {
  const videos = [];
  const now = new Date();

  for (let i = 1; i <= count; i++) {
    const isTrending = i % 3 === 0; // Every 3rd video is trending
    const isNew = i % 4 === 0; // Every 4th video is new

    const daysOld = i % 7;
    const hoursOld = i % 24;

    const id = `hot${i}`;
    const viewCount = isTrending
      ? `${Math.floor(Math.random() * 1000) + 500}K`
      : `${Math.floor(Math.random() * 500) + 50}K`;

    const publishedAt = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - daysOld,
      now.getHours() - hoursOld
    ).toISOString();

    videos.push({
      id,
      snippet: {
        title: `${isTrending ? '🔥 ' : ''}${isNew ? '🆕 ' : ''}Memecoin Video #${id}`,
        channelTitle: `Creator${i % 5 || 1}`,
        thumbnails: {
          medium: {
            url: `https://i.ytimg.com/vi/${['dQw4w9WgXcQ', '9bZkp7q19f0', 'TGjB2D6hQ8U'][i % 3]}/mqdefault.jpg`,
          },
        },
        publishedAt,
      },
      statistics: {
        viewCount,
        likeCount: `${Math.floor(Math.random() * 100) + (isTrending ? 50 : 10)}K`,
      },
      trending: isTrending,
      new: isNew,
    });
  }

  // Sort by trending first, then by views, then by newest
  return videos.sort((a, b) => {
    if (a.trending !== b.trending) return b.trending - a.trending;
    if (parseInt(a.statistics.viewCount) !== parseInt(b.statistics.viewCount)) {
      return parseInt(b.statistics.viewCount) - parseInt(a.statistics.viewCount);
    }
    return new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt);
  });
};

const Hot = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('trending'); // 'trending', 'newest', 'popular'
  const loaderRef = useRef(null);

  // Filter videos based on selection
  const filteredVideos = React.useMemo(() => {
    if (!videos.length) return [];

    const sorted = [...videos];

    switch (filter) {
      case 'newest':
        return sorted.sort((a, b) =>
          new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt)
        );
      case 'popular':
        return sorted.sort((a, b) =>
          parseInt(b.statistics.viewCount) - parseInt(a.statistics.viewCount)
        );
      case 'trending':
      default:
        return sorted.sort((a, b) => {
          if (a.trending !== b.trending) return b.trending - a.trending;
          return parseInt(b.statistics.viewCount) - parseInt(a.statistics.viewCount);
        });
    }
  }, [videos, filter]);

  // Simulate API call with mock data
  const fetchVideos = async () => {
    setIsLoading(true);
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    const hotVideos = generateHotVideos(24); // Fetch 24 hot videos
    setVideos(hotVideos);
    setIsLoading(false);
  };

  // Initial fetch
  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <HotContainer>
      <HotHeader>
        <HotTitle>🔥 Hot Memecoin Videos</HotTitle>
        <FilterButtons>
          <FilterButton
            active={filter === 'trending'}
            onClick={() => setFilter('trending')}
          >
            Trending
          </FilterButton>
          <FilterButton
            active={filter === 'newest'}
            onClick={() => setFilter('newest')}
          >
            Newest
          </FilterButton>
          <FilterButton
            active={filter === 'popular'}
            onClick={() => setFilter('popular')}
          >
            Most Popular
          </FilterButton>
        </FilterButtons>
      </HotHeader>

      <VideoGrid>
        {filteredVideos.map((video) => (
          <Link
            to={`/video/${video.id}`}
            key={video.id}
            style={{ textDecoration: 'none' }}
          >
            <VideoCard>
              <Thumbnail
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
              />
              <VideoInfo>
                <Title>{video.snippet.title}</Title>
                <Channel>{video.snippet.channelTitle}</Channel>
                <Meta>
                  <span>{video.statistics.viewCount} views</span>
                  <span>
                    {new Date(video.snippet.publishedAt).toLocaleDateString()}
                  </span>
                </Meta>
              </VideoInfo>
            </VideoCard>
          </Link>
        ))}
      </VideoGrid>

      <Loading ref={loaderRef}>
        {isLoading ? 'Loading hot videos...' : ''}
      </Loading>
    </HotContainer>
  );
};

export default Hot;