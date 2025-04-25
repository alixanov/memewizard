import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  IconButton,
  Snackbar,
} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// Configure API base URL
const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://memewizard-server.vercel.app'
    : 'http://localhost:5000';

const Profile = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', type: 'error' });
  const navigate = useNavigate();

  const colorScheme = {
    primary: '#080733',
    secondary: '#ffffff',
    text: '#080733',
    secondaryText: '#555',
    background: '#ffffff',
  };

  const showNotification = (message, type = 'error') => {
    setNotification({ open: true, message, type });
    setTimeout(() => setNotification({ open: false, message: '', type: 'error' }), 3000);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchProfile(token);
    }
  }, []);

  const fetchProfile = async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setCurrentUser(data);
      } else {
        localStorage.removeItem('token');
        showNotification(data.message || 'Failed to fetch profile');
      }
    } catch (err) {
      localStorage.removeItem('token');
      showNotification('Server error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? `${API_BASE_URL}/api/auth/login`
      : `${API_BASE_URL}/api/auth/register`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          localStorage.setItem('token', data.token);
          setCurrentUser(data.user);
          showNotification('Logged in successfully', 'success');
          navigate('/gallery');
        } else {
          setIsLogin(true);
          setFormData({ email: '', password: '', name: '' });
          showNotification('Registration successful, please log in', 'success');
        }
      } else {
        showNotification(data.message || 'Authentication failed');
      }
    } catch (err) {
      showNotification('Server error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    setFormData({ email: '', password: '', name: '' });
    showNotification('Logged out successfully', 'success');
    navigate('/gallery');
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setNotification({ open: false, message: '', type: 'error' });
    setFormData({ email: '', password: '', name: '' });
  };

  const handleCreateMeme = () => {
    navigate('/editor');
  };

  if (currentUser) {
    return (
      <Container maxWidth="xs" sx={{ mt: 4, bgcolor: '#f8f9fa', minHeight: '70vh' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography
            variant="h5"
            sx={{ color: colorScheme.text, fontWeight: 600, fontSize: '24px', textAlign: 'center', width: '100%' }}
          >
            Personal Account
          </Typography>
          <IconButton
            onClick={handleLogout}
            sx={{
              color: colorScheme.primary,
              '&:hover': { bgcolor: 'rgba(8, 7, 51, 0.1)' },
            }}
            aria-label="Logout"
          >
            <ExitToAppIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              bgcolor: colorScheme.primary,
              width: 48,
              height: 48,
              fontSize: '1.5rem',
            }}
          >
            {currentUser.name.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="h6" sx={{ color: colorScheme.text, fontWeight: 500, fontSize: '20px' }}>
            {currentUser.name}
          </Typography>
          <Typography variant="body2" sx={{ color: colorScheme.secondaryText, fontSize: '14px' }}>
            {currentUser.email}
          </Typography>
          <Button
            variant="outlined"
            startIcon={<AddCircleOutlineIcon sx={{ fontSize: '20px' }} />}
            onClick={handleCreateMeme}
            sx={{
              mt: 1,
              py: 1,
              px: 2,
              color: colorScheme.primary,
              borderColor: colorScheme.primary,
              bgcolor: colorScheme.secondary,
              fontSize: '16px',
              fontWeight: 500,
              textTransform: 'none',
              borderRadius: '4px',
              '&:hover': {
                bgcolor: '#f0f1f5',
                borderColor: colorScheme.primary,
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            Create Meme
          </Button>
        </Box>
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
      </Container>
    );
  }

  return (
    <Container
      maxWidth="xs"
      sx={{
        minHeight: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f8f9fa',
      }}
    >
      <Paper elevation={0} sx={{ p: 2, bgcolor: colorScheme.background, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <Typography
          variant="h5"
          sx={{
            color: colorScheme.text,
            fontWeight: 600,
            mb: 2,
            textAlign: 'center',
            fontSize: '24px',
          }}
        >
          {isLogin ? 'Login' : 'Register'}
        </Typography>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              size="small"
              sx={{ mb: 2 }}
              InputProps={{
                style: { color: colorScheme.text, borderColor: '#e0e0e0' },
              }}
              InputLabelProps={{
                style: { color: colorScheme.secondaryText },
              }}
              slotProps={{
                input: {
                  sx: {
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e0e0e0',
                      boxShadow: 'none',
                    },
                  },
                },
              }}
            />
          )}
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            size="small"
            sx={{ mb: 2 }}
            InputProps={{
              style: { color: colorScheme.text, borderColor: '#e0e0e0' },
            }}
            InputLabelProps={{
              style: { color: colorScheme.secondaryText },
            }}
            slotProps={{
              input: {
                sx: {
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#e0e0e0',
                    boxShadow: 'none',
                  },
                },
              },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            size="small"
            sx={{ mb: 2 }}
            InputProps={{
              style: { color: colorScheme.text, borderColor: '#e0e0e0' },
            }}
            InputLabelProps={{
              style: { color: colorScheme.secondaryText },
            }}
            slotProps={{
              input: {
                sx: {
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#e0e0e0',
                    boxShadow: 'none',
                  },
                },
              },
            }}
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{
              py: 1,
              bgcolor: colorScheme.primary,
              color: colorScheme.secondary,
              fontSize: '16px',
              fontWeight: 500,
              textTransform: 'none',
              '&:hover': { bgcolor: 'rgba(8, 7, 51, 0.8)' },
            }}
          >
            {isLogin ? 'Login' : 'Register'}
          </Button>
          <Typography
            variant="body2"
            sx={{
              mt: 1,
              textAlign: 'center',
              color: colorScheme.secondaryText,
              fontSize: '14px',
            }}
          >
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <Button
              onClick={toggleAuthMode}
              sx={{
                color: colorScheme.primary,
                textTransform: 'none',
                ml: 0.5,
                fontSize: '14px',
                '&:hover': { bgcolor: 'rgba(8, 7, 51, 0.1)' },
              }}
            >
              {isLogin ? 'Register' : 'Login'}
            </Button>
          </Typography>
        </form>
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
      </Paper>
    </Container>
  );
};

export default Profile;