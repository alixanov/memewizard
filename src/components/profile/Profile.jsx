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
} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Profile = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        setCurrentUser(user);
        navigate('/gallery');
      } else {
        setError('Неверный email или пароль');
      }
    } else {
      if (!formData.email || !formData.password || !formData.name) {
        setError('Все поля обязательны');
        return;
      }

      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userExists = users.some((u) => u.email === formData.email);

      if (userExists) {
        setError('Пользователь с этим email уже существует');
      } else {
        const newUser = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        setCurrentUser(newUser);
        navigate('/');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setFormData({ email: '', password: '', name: '' });
    navigate('/');
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({ email: '', password: '', name: '' });
  };

  const colorScheme = {
    primary: '#080733',
    secondary: '#ffffff',
    text: '#080733',
    secondaryText: '#555',
    background: '#ffffff',
  };

  if (currentUser) {
    return (
      <Container maxWidth="xs" sx={{ mt: 4 }}>
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h5" sx={{ color: colorScheme.text, fontWeight: '600' }}>
              Личный кабинет
            </Typography>
            <IconButton
              onClick={handleLogout}
              sx={{
                color: colorScheme.primary,
                '&:hover': { bgcolor: 'rgba(8, 7, 51, 0.1)' },
              }}
            >
              <ExitToAppIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
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
            <Typography variant="h6" sx={{ color: colorScheme.text, fontWeight: '500' }}>
              {currentUser.name}
            </Typography>
            <Typography variant="body2" sx={{ color: colorScheme.secondaryText }}>
              {currentUser.email}
            </Typography>
          </Box>
        </Box>
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
      }}
    >
      <Paper elevation={0} sx={{ p: 2, bgcolor: colorScheme.background }}>
        <Typography
          variant="h5"
          sx={{
            color: colorScheme.text,
            fontWeight: '600',
            mb: 2,
            textAlign: 'center',
          }}
        >
          {isLogin ? 'Авторизация' : 'Регистрация'}
        </Typography>
        {error && (
          <Typography color="error" variant="body2" sx={{ mb: 1, textAlign: 'center' }}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <TextField
              fullWidth
              label="Имя"
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
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e0e0e0',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e0e0e0',
                    },
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
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#e0e0e0',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#e0e0e0',
                  },
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
            label="Пароль"
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
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#e0e0e0',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#e0e0e0',
                  },
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
              '&:hover': { bgcolor: 'rgba(8, 7, 51, 0.8)' },
            }}
          >
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </Button>
          <Typography
            variant="body2"
            sx={{
              mt: 1,
              textAlign: 'center',
              color: colorScheme.secondaryText,
            }}
          >
            {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
            <Button
              onClick={toggleAuthMode}
              sx={{
                color: colorScheme.primary,
                textTransform: 'none',
                ml: 0.5,
                '&:hover': { bgcolor: 'rgba(8, 7, 51, 0.1)' },
              }}
            >
              {isLogin ? 'Регистрация' : 'Войти'}
            </Button>
          </Typography>
        </form>
      </Paper>
    </Container>
  );
};

export default Profile;