import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Card, CardMedia, CardContent, Grid } from '@mui/material';

const MyMem = () => {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    const publishedMemes = JSON.parse(localStorage.getItem('publishedMemes') || '[]');
    setMemes(publishedMemes);
  }, []);

  return (
    <Container sx={{ py: 4, bgcolor: '#f8f9fa', minHeight: '100vh' }}>
      <Typography
        variant="h4"
        sx={{
          color: '#080733',
          fontWeight: 700,
          mb: 4,
          textAlign: 'center',
        }}
      >
        My Memes
      </Typography>
      {memes.length === 0 ? (
        <Typography
          variant="body1"
          sx={{
            color: '#555',
            textAlign: 'center',
            fontSize: '16px',
          }}
        >
          No memes published yet. Create and publish a meme in the Editor!
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {memes.map((meme) => (
            <Grid item xs={12} sm={6} md={4} key={meme.id}>
              <Card
                sx={{
                  bgcolor: '#ffffff',
                  borderRadius: '6px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  transition: 'background-color 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    bgcolor: '#f0f1f5',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={meme.image}
                  alt="Published Meme"
                  sx={{
                    height: 200,
                    objectFit: 'contain',
                    borderRadius: '6px 6px 0 0',
                  }}
                />
                <CardContent sx={{ position: 'relative', p: 2 }}>
                  {meme.texts.map((text) => (
                    <Typography
                      key={text.id}
                      sx={{
                        position: 'absolute',
                        top: text.position.y,
                        left: text.position.x,
                        color: text.styles.color,
                        fontSize: `${text.styles.fontSize}px`,
                        fontWeight: text.styles.fontWeight,
                        fontStyle: text.styles.fontStyle,
                        textShadow: text.styles.textShadow,
                        opacity: text.styles.opacity,
                        whiteSpace: 'pre-wrap',
                        maxWidth: '90%',
                        textAlign:
                          text.styles.textPosition === 'center' ||
                            text.styles.textPosition === 'top' ||
                            text.styles.textPosition === 'bottom'
                            ? 'center'
                            : text.styles.textPosition === 'start'
                              ? 'left'
                              : 'right',
                      }}
                    >
                      {text.text || 'No text'}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default MyMem;