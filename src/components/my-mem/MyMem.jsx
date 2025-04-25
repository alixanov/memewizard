import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  Grid,
  IconButton,
  Button,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';

// Configure API base URL
const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://memewizard-server.vercel.app'
    : 'http://localhost:5000';

const MyMem = () => {
  const [memes, setMemes] = useState([]);
  const [notification, setNotification] = useState({ open: false, message: '', type: 'error' });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, memeId: null });
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const colorScheme = {
    primary: '#080733',
    secondary: '#ffffff',
    text: '#2d3436',
    secondaryText: '#636e72',
    background: '#f8f9fa',
    border: '#dfe6e9',
  };

  const showNotification = (message, type = 'error') => {
    setNotification({ open: true, message, type });
    setTimeout(() => setNotification({ open: false, message: '', type: 'error' }), 3000);
  };

  useEffect(() => {
    const fetchMemes = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        showNotification('Please log in to view your memes');
        navigate('/');
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/memes/my-memes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setMemes(data);
        } else {
          if (response.status === 401) {
            showNotification('Session expired. Please log in');
            localStorage.removeItem('token');
            navigate('/');
          } else {
            showNotification(data.message || 'Failed to fetch memes');
          }
        }
      } catch (err) {
        console.error('Fetch memes error:', err);
        showNotification('Server error');
      }
    };

    fetchMemes();
  }, [navigate]);

  const handleDelete = async (memeId) => {
    if (!memeId) {
      showNotification('Invalid meme ID');
      return;
    }

    setDeleteDialog({ open: true, memeId });
  };

  const confirmDelete = async () => {
    const { memeId } = deleteDialog;
    setIsDeleting(true);

    const token = localStorage.getItem('token');
    if (!token) {
      showNotification('Please log in to delete memes');
      navigate('/');
      setDeleteDialog({ open: false, memeId: null });
      setIsDeleting(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/memes/${memeId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setMemes((prev) => {
          const updatedMemes = prev.filter((meme) => meme._id !== memeId);
          console.log('Deleted meme:', memeId, 'Remaining memes:', updatedMemes);
          return updatedMemes;
        });
        showNotification('Meme deleted successfully!', 'success');
      } else {
        if (response.status === 401) {
          showNotification('Session expired. Please log in');
          localStorage.removeItem('token');
          navigate('/');
        } else {
          showNotification(data.message || 'Failed to delete meme');
        }
      }
    } catch (err) {
      console.error('Delete meme error:', err);
      showNotification('Server error');
    } finally {
      setDeleteDialog({ open: false, memeId: null });
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialog({ open: false, memeId: null });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    showNotification('Logged out successfully', 'success');
    navigate('/');
  };

  return (
    <Container sx={{ py: 3, bgcolor: colorScheme.background, minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography
          variant="h4"
          sx={{
            color: colorScheme.primary,
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          My Memes
        </Typography>
        <Button
          variant="outlined"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            color: colorScheme.primary,
            borderColor: colorScheme.primary,
            '&:hover': { borderColor: colorScheme.primary, bgcolor: 'rgba(8, 7, 51, 0.1)' },
            borderRadius: '5px',
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '12px',
          }}
        >
          Logout
        </Button>
      </Box>
      {memes.length === 0 ? (
        <Typography
          variant="body1"
          sx={{
            color: colorScheme.secondaryText,
            textAlign: 'center',
            fontSize: '16px',
          }}
        >
          No memes published yet. Create and publish a meme in the Editor!
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {memes.map((meme) => (
            <Grid item xs={12} sm={6} md={4} key={meme._id}>
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
                  position: 'relative',
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
                <IconButton
                  onClick={() => handleDelete(meme._id)}
                  disabled={isDeleting}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    bgcolor: 'rgba(255, 255, 255, 0.8)',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 1)',
                    },
                    '&:disabled': {
                      bgcolor: 'rgba(255, 255, 255, 0.5)',
                      cursor: 'not-allowed',
                    },
                  }}
                >
                  <DeleteIcon sx={{ color: colorScheme.primary }} />
                </IconButton>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Snackbar
        open={notification.open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        message={notification.message}
        sx={{
          '& .MuiSnackbarContent-root': {
            bgcolor: notification.type === 'success' ? '#2e7d32' : colorScheme.primary,
            color: colorScheme.secondary,
            fontSize: '12px',
            borderRadius: '5px',
            padding: '6px 12px',
          },
        }}
      />
      <Dialog
        open={deleteDialog.open}
        onClose={handleCancelDelete}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title" sx={{ bgcolor: colorScheme.primary, color: colorScheme.secondary }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent sx={{ bgcolor: colorScheme.background }}>
          <DialogContentText sx={{ color: colorScheme.text, mt: 2 }}>
            Are you sure you want to delete this meme? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ bgcolor: colorScheme.background, p: 2 }}>
          <Button
            onClick={handleCancelDelete}
            sx={{
              color: colorScheme.primary,
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            disabled={isDeleting}
            sx={{
              bgcolor: colorScheme.primary,
              color: colorScheme.secondary,
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': { bgcolor: '#1a1a5e' },
              '&:disabled': { bgcolor: '#3d4a54', cursor: 'not-allowed' },
            }}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MyMem;