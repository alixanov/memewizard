import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  IconButton,
  Grid,
  Slider,
  Switch,
  FormControlLabel,
  Divider,
  Collapse,
  Snackbar,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import PublishIcon from '@mui/icons-material/Publish';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Draggable from 'react-draggable';

// Configure API base URL
const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://memewizard-server.vercel.app'
    : 'http://localhost:5000';

const Editor = () => {
  const [image, setImage] = useState(null);
  const [texts, setTexts] = useState([
    {
      id: 1,
      text: 'Your text here',
      position: { x: 50, y: 50 },
      styles: {
        fontSize: 24,
        fontFamily: 'Impact',
        color: '#ffffff',
        textShadow: '2px 2px 4px #000000',
        fontWeight: 'bold',
        fontStyle: 'normal',
        textPosition: 'center',
        strokeColor: '#000000',
        strokeWidth: 0,
        opacity: 1,
      },
    },
  ]);
  const [activeTextId, setActiveTextId] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [expanded, setExpanded] = useState(false); // Added missing state
  const [notification, setNotification] = useState({ open: false, message: '', type: 'error' });
  const canvasRef = useRef(null);
  const textRefs = useRef({});
  const navigate = useNavigate();

  const colorScheme = darkMode
    ? {
      primary: '#080733',
      secondary: '#ffffff',
      text: '#ffffff',
      secondaryText: '#b0b0b0',
      background: '#2d3436',
      paper: 'linear-gradient(135deg, #e6e8f0 0%, #f8f9fa 33%, #c3cfe2 66%, #a1a8b9 100%)',
      border: '#3d4a54',
    }
    : {
      primary: '#080733',
      secondary: '#ffffff',
      text: '#2d3436',
      secondaryText: '#636e72',
      background: '#ffffff',
      paper: '#f5f6fa',
      border: '#dfe6e9',
    };

  const showNotification = (message, type = 'error') => {
    setNotification({ open: true, message, type });
    setTimeout(() => setNotification({ open: false, message: '', type: 'error' }), 3000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && ['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleTextChange = (id, value) => {
    setTexts((prev) => prev.map((t) => (t.id === id ? { ...t, text: value } : t)));
  };

  const handleStyleChange = (id, key, value) => {
    setTexts((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const updatedText = { ...t, styles: { ...t.styles, [key]: value } };
          if (key === 'textPosition' && canvasRef.current) {
            const { position } = calculateTextPosition(updatedText.text, updatedText.styles, canvasRef.current);
            updatedText.position = position;
          }
          return updatedText;
        }
        return t;
      })
    );
  };

  const handleDrag = (id, e, data) => {
    setTexts((prev) => prev.map((t) => (t.id === id ? { ...t, position: { x: data.x, y: data.y } } : t)));
  };

  const addText = () => {
    const newId = texts.length > 0 ? Math.max(...texts.map((t) => t.id)) + 1 : 1;
    const newText = {
      id: newId,
      text: 'New text',
      position: { x: 50, y: 50 },
      styles: {
        fontSize: 24,
        fontFamily: 'Impact',
        color: '#ffffff',
        textShadow: '2px 2px 4px #000000',
        fontWeight: 'bold',
        fontStyle: 'normal',
        textPosition: 'center',
        strokeColor: '#000000',
        strokeWidth: 0,
        opacity: 1,
      },
    };
    setTexts((prev) => [...prev, newText]);
    setActiveTextId(newId);
  };

  const deleteText = (id) => {
    setTexts((prev) => prev.filter((t) => t.id !== id));
    if (activeTextId === id) {
      setActiveTextId(texts[0]?.id || null);
    }
  };

  const handleTextClick = (id) => {
    setActiveTextId(id);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handlePublish = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      showNotification('Please log in to publish');
      navigate('/gallery');
      return;
    }

    setIsPublishing(true);
    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL('image/png');

    try {
      const response = await fetch(`${API_BASE_URL}/api/memes/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ image: imageData }),
      });

      const data = await response.json();
      if (response.ok) {
        setPublishSuccess(true);
        showNotification('Meme published successfully', 'success');
        setTimeout(() => {
          setPublishSuccess(false);
          setIsPublishing(false);
        }, 2000);
      } else {
        setIsPublishing(false);
        if (response.status === 401) {
          showNotification('Session expired. Please log in');
          localStorage.removeItem('token');
          navigate('/gallery');
        } else {
          showNotification(data.message || 'Failed to publish');
        }
      }
    } catch (err) {
      console.error('Publish error:', err);
      setIsPublishing(false);
      showNotification('Server error');
    }
  };

  const calculateTextPosition = (text, styles, canvas) => {
    const ctx = canvas.getContext('2d');
    ctx.font = `${styles.fontStyle === 'italic' ? 'italic ' : ''}${styles.fontWeight === 'bold' ? 'bold ' : ''}${styles.fontSize
      }px ${styles.fontFamily}`;
    const lines = text.split('\n');
    const lineHeight = styles.fontSize * 1.2;
    const textWidth = Math.max(...lines.map((line) => ctx.measureText(line).width));
    const textHeight = lines.length * lineHeight;

    let x, y;
    switch (styles.textPosition) {
      case 'start':
        x = 5;
        y = canvas.height / 2;
        break;
      case 'end':
        x = canvas.width - textWidth - 5;
        y = canvas.height / 2;
        break;
      case 'top':
        x = canvas.width / 2;
        y = styles.fontSize + 5;
        break;
      case 'bottom':
        x = canvas.width / 2;
        y = canvas.height - textHeight - 5;
        break;
      case 'center':
        x = canvas.width / 2;
        y = canvas.height / 2;
        break;
      default:
        x = canvas.width / 2;
        y = canvas.height / 2;
    }

    return { position: { x, y }, textWidth, textHeight };
  };

  useEffect(() => {
    if (image && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = image;
      img.onload = () => {
        const maxWidth = 350;
        const maxHeight = 200;
        let width = img.width;
        let height = img.height;
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = width * ratio;
          height = height * ratio;
        }
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        texts.forEach(({ text, position, styles }) => {
          ctx.font = `${styles.fontStyle === 'italic' ? 'italic ' : ''}${styles.fontWeight === 'bold' ? 'bold ' : ''}${styles.fontSize
            }px ${styles.fontFamily}`;
          ctx.fillStyle = styles.color;
          ctx.globalAlpha = styles.opacity;

          ctx.textAlign =
            styles.textPosition === 'center' || styles.textPosition === 'top' || styles.textPosition === 'bottom'
              ? 'center'
              : styles.textPosition === 'start'
                ? 'left'
                : 'right';

          if (styles.textShadow !== 'none') {
            const [offsetX, offsetY, blur, color] = styles.textShadow.split(' ');
            ctx.shadowOffsetX = parseFloat(offsetX);
            ctx.shadowOffsetY = parseFloat(offsetY);
            ctx.shadowBlur = parseFloat(blur);
            ctx.shadowColor = color;
          } else {
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 0;
            ctx.shadowColor = 'transparent';
          }

          if (styles.strokeWidth > 0) {
            ctx.strokeStyle = styles.strokeColor;
            ctx.lineWidth = styles.strokeWidth;
            const lines = text.split('\n');
            const lineHeight = styles.fontSize * 1.2;
            lines.forEach((line, index) => {
              ctx.strokeText(line, position.x, position.y + index * lineHeight);
            });
          }

          const lines = text.split('\n');
          const lineHeight = styles.fontSize * 1.2;
          lines.forEach((line, index) => {
            ctx.fillText(line, position.x, position.y + index * lineHeight);
          });

          ctx.globalAlpha = 1;
        });
      };
    }
  }, [image, texts]);

  const activeText = texts.find((t) => t.id === activeTextId) || texts[0];

  return (
    <Container
      // maxWidth="md"
      sx={{
        py: 1.5,
        minHeight: 'auto',
        transition: 'background-color 0.3s ease',
        display: 'flex',
        marginTop: '50px',
        minHeight: '80vh', // Увеличивает высоту элемента

      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 1.5,
          width: '100%',
          background: 'linear-gradient(135deg, #e6e8f0 0%, #f0f2f8 33%,rgba(208, 220, 255, 0.66) 66%,rgb(199, 207, 241) 100%)',
          borderRadius: '6px',
          boxShadow: '0 3px 10px rgba(0, 0, 0, 0.05)',
          transition: 'background-color 0.3s ease',
        }}
      >




        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
          <Typography
            variant="h5"
            sx={{
              color: colorScheme.primary,
              fontWeight: 700,
              fontSize: { xs: '18px', sm: '22px' },
            }}
          >
            Meme Creator
          </Typography>
        </Box>

        <Divider sx={{ borderColor: colorScheme.border, mb: 1.5 }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1.5 }}>
          {/* Left panel - Controls */}
          <Box sx={{ width: { xs: '100%', md: '250px' } }}>
            <Box sx={{ mb: 1.5 }}>
              <Typography variant="subtitle2" sx={{ color: colorScheme.text, mb: 0.5, fontWeight: 600, fontSize: '11px' }}>
                Image
              </Typography>
              <Button
                variant="contained"
                component="label"
                startIcon={<CloudUploadIcon />}
                fullWidth
                sx={{
                  py: 0.8,
                  bgcolor: colorScheme.primary,
                  color: colorScheme.secondary,
                  '&:hover': { bgcolor: darkMode ? '#1a1a5e' : '#1a1a5e' },
                  borderRadius: '5px',
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '11px',
                }}
              >
                Upload Image
                <input type="file" accept=".jpg,.png,.gif" hidden onChange={handleImageUpload} />
              </Button>
            </Box>

            <Box sx={{ mb: 1.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                <Typography variant="subtitle2" sx={{ color: colorScheme.text, fontWeight: 600, fontSize: '11px' }}>
                  Text Elements
                </Typography>
                <Button
                  variant="outlined"
                  onClick={addText}
                  startIcon={<AddIcon />}
                  size="small"
                  sx={{
                    color: colorScheme.primary,
                    borderColor: colorScheme.primary,
                    '&:hover': { borderColor: colorScheme.primary, bgcolor: 'rgba(8, 7, 51, 0.1)' },
                    borderRadius: '5px',
                    textTransform: 'none',
                    fontSize: '11px',
                  }}
                >
                  Add
                </Button>
              </Box>

              {texts.length > 0 && (
                <Box sx={{ maxHeight: '120px', overflowY: 'auto', mb: 0.5 }}>
                  {texts.map((text) => (
                    <Paper
                      key={text.id}
                      elevation={0}
                      onClick={() => handleTextClick(text.id)}
                      sx={{
                        p: 0.8,
                        mb: 0.3,
                        bgcolor: activeTextId === text.id ? (darkMode ? '#3d4a54' : '#e6e8fa') : darkMode ? '#2d3436' : '#f8f9fa',
                        borderRadius: '5px',
                        border: `1px solid ${activeTextId === text.id ? colorScheme.primary : colorScheme.border}`,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        '&:hover': { borderColor: colorScheme.primary },
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: colorScheme.text,
                            fontWeight: activeTextId === text.id ? 600 : 400,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontSize: '11px',
                          }}
                        >
                          {text.text || 'Empty text'}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteText(text.id);
                          }}
                          sx={{ color: activeTextId === text.id ? colorScheme.primary : colorScheme.secondaryText }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Paper>
                  ))}
                </Box>
              )}
            </Box>

            {activeText && (
              <Box>
                <Typography variant="subtitle2" sx={{ color: colorScheme.text, mb: 0.5, fontWeight: 600, fontSize: '11px' }}>
                  Text Settings
                </Typography>

                <TextField
                  fullWidth
                  label="Text Content"
                  value={activeText?.text || ''}
                  onChange={(e) => handleTextChange(activeTextId, e.target.value)}
                  size="small"
                  sx={{
                    mb: 1,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: colorScheme.border },
                      '&:hover fieldset': { borderColor: colorScheme.primary },
                      '&.Mui-focused fieldset': { borderColor: colorScheme.primary },
                      borderRadius: '5px',
                      fontSize: '11px',
                    },
                    '& .MuiInputBase-input': { color: colorScheme.text, fontSize: '11px', padding: '5px 8px' },
                    '& .MuiInputLabel-root': {
                      color: colorScheme.secondaryText,
                      fontSize: '12px',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: colorScheme.primary,
                    },
                  }}
                />

                <Grid container spacing={0.5}>
                  <Grid item xs={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel sx={{ color: colorScheme.secondaryText, fontSize: '12px' }}>Font</InputLabel>
                      <Select
                        value={activeText?.styles.fontFamily || 'Impact'}
                        onChange={(e) => handleStyleChange(activeTextId, 'fontFamily', e.target.value)}
                        label="Font"
                        sx={{
                          color: colorScheme.text,
                          fontSize: '11px',
                          '& .MuiOutlinedInput-notchedOutline': { borderColor: colorScheme.border },
                          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: colorScheme.primary },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: colorScheme.primary },
                          borderRadius: '5px',
                        }}
                      >
                        <MenuItem value="Impact">Impact</MenuItem>
                        <MenuItem value="Arial">Arial</MenuItem>
                        <MenuItem value="Roboto">Roboto</MenuItem>
                        <MenuItem value="Comic Sans MS">Comic Sans</MenuItem>
                        <MenuItem value="Times New Roman">Times New Roman</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel sx={{ color: colorScheme.secondaryText, fontSize: '12px' }}>Position</InputLabel>
                      <Select
                        value={activeText?.styles.textPosition || 'center'}
                        onChange={(e) => handleStyleChange(activeTextId, 'textPosition', e.target.value)}
                        label="Position"
                        sx={{
                          color: colorScheme.text,
                          fontSize: '11px',
                          '& .MuiOutlinedInput-notchedOutline': { borderColor: colorScheme.border },
                          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: colorScheme.primary },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: colorScheme.primary },
                          borderRadius: '5px',
                        }}
                      >
                        <MenuItem value="start">Left</MenuItem>
                        <MenuItem value="center">Center</MenuItem>
                        <MenuItem value="end">Right</MenuItem>
                        <MenuItem value="top">Top</MenuItem>
                        <MenuItem value="bottom">Bottom</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 1, mb: 1 }}>
                  <Typography variant="body2" sx={{ color: colorScheme.text, mb: 0.3, fontSize: '11px' }}>
                    Font Size: {activeText?.styles.fontSize || 24}px
                  </Typography>
                  <Slider
                    value={activeText?.styles.fontSize || 24}
                    onChange={(e, value) => handleStyleChange(activeTextId, 'fontSize', value)}
                    min={12}
                    max={72}
                    step={2}
                    sx={{
                      color: colorScheme.primary,
                      height: 3,
                      '& .MuiSlider-thumb': {
                        width: 10,
                        height: 10,
                        '&:hover, &.Mui-focusVisible': {
                          boxShadow: `0px 0px 0px 5px ${darkMode ? 'rgba(8, 7, 51, 0.16)' : 'rgba(8, 7, 51, 0.16)'}`,
                        },
                      },
                    }}
                  />
                </Box>

                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ color: colorScheme.text, mb: 0.3, fontSize: '11px' }}>
                    Opacity: {Math.round((activeText?.styles.opacity || 1) * 100)}%
                  </Typography>
                  <Slider
                    value={activeText?.styles.opacity || 1}
                    onChange={(e, value) => handleStyleChange(activeTextId, 'opacity', value)}
                    min={0}
                    max={1}
                    step={0.1}
                    sx={{
                      color: colorScheme.primary,
                      height: 3,
                      '& .MuiSlider-thumb': { width: 10, height: 10 },
                    }}
                  />
                </Box>

                <Box sx={{ mb: 1 }}>
                  <Button
                    onClick={() => setExpanded(!expanded)}
                    fullWidth
                    sx={{
                      color: colorScheme.primary,
                      justifyContent: 'space-between',
                      textTransform: 'none',
                      fontSize: '11px',
                      bgcolor: darkMode ? '#3d4a54' : '#e6e8fa',
                      borderRadius: '5px',
                      p: 0.8,
                    }}
                    endIcon={<ExpandMoreIcon sx={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }} />}
                  >
                    Advanced Settings
                  </Button>
                  <Collapse in={expanded}>
                    <Box sx={{ mt: 1 }}>
                      <Grid container spacing={0.5}>
                        <Grid item xs={6}>
                          <Box>
                            <Typography variant="body2" sx={{ color: colorScheme.text, mb: 0.3, fontSize: '11px' }}>
                              Text Color
                            </Typography>
                            <TextField
                              type="color"
                              value={activeText?.styles.color || '#ffffff'}
                              onChange={(e) => handleStyleChange(activeTextId, 'color', e.target.value)}
                              size="small"
                              fullWidth
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  height: '28px',
                                  p: '1px !important',
                                  bgcolor: colorScheme.background,
                                  borderRadius: '5px',
                                },
                                '& .MuiInputBase-input': {
                                  p: 0,
                                  height: '100%',
                                  cursor: 'pointer',
                                },
                              }}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box>
                            <Typography variant="body2" sx={{ color: colorScheme.text, mb: 0.3, fontSize: '11px' }}>
                              Stroke Color
                            </Typography>
                            <TextField
                              type="color"
                              value={activeText?.styles.strokeColor || '#000000'}
                              onChange={(e) => handleStyleChange(activeTextId, 'strokeColor', e.target.value)}
                              size="small"
                              fullWidth
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  height: '28px',
                                  p: '1px !important',
                                  bgcolor: colorScheme.background,
                                  borderRadius: '5px',
                                },
                                '& .MuiInputBase-input': {
                                  p: 0,
                                  height: '100%',
                                  cursor: 'pointer',
                                },
                              }}
                            />
                          </Box>
                        </Grid>
                      </Grid>

                      <Grid container spacing={0.5} sx={{ mt: 0.5 }}>
                        <Grid item xs={6}>
                          <FormControl fullWidth size="small">
                            <InputLabel sx={{ color: colorScheme.secondaryText, fontSize: '12px' }}>
                              Stroke Width
                            </InputLabel>
                            <Select
                              value={activeText?.styles.strokeWidth || 0}
                              onChange={(e) => handleStyleChange(activeTextId, 'strokeWidth', e.target.value)}
                              label="Stroke Width"
                              sx={{
                                color: colorScheme.text,
                                fontSize: '11px',
                                '& .MuiOutlinedInput-notchedOutline': { borderColor: colorScheme.border },
                                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: colorScheme.primary },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: colorScheme.primary },
                                borderRadius: '5px',
                              }}
                            >
                              <MenuItem value={0}>None</MenuItem>
                              <MenuItem value={1}>1px</MenuItem>
                              <MenuItem value={2}>2px</MenuItem>
                              <MenuItem value={3}>3px</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                          <FormControl fullWidth size="small">
                            <InputLabel sx={{ color: colorScheme.secondaryText, fontSize: '12px' }}>Shadow</InputLabel>
                            <Select
                              value={activeText?.styles.textShadow || '2px 2px 4px #000000'}
                              onChange={(e) => handleStyleChange(activeTextId, 'textShadow', e.target.value)}
                              label="Shadow"
                              sx={{
                                color: colorScheme.text,
                                fontSize: '11px',
                                '& .MuiOutlinedInput-notchedOutline': { borderColor: colorScheme.border },
                                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: colorScheme.primary },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: colorScheme.primary },
                                borderRadius: '5px',
                              }}
                            >
                              <MenuItem value="none">None</MenuItem>
                              <MenuItem value="2px 2px 4px #000000">Black</MenuItem>
                              <MenuItem value="2px 2px 4px #ffffff">White</MenuItem>
                              <MenuItem value="0 0 8px #ff00ff">Neon</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Box>
                  </Collapse>
                </Box>
              </Box>
            )}
          </Box>

          {/* Right panel - Canvas */}
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                position: 'relative',
                border: `1px solid ${colorScheme.border}`,
                borderRadius: '5px',
                overflow: 'hidden',
                minHeight: '150px',
                maxHeight: '200px',
                bgcolor: darkMode ? '#1a1a1a' : '#e0e0e0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mb: 1.5,
              }}
            >
              {image ? (
                <>
                  <canvas
                    ref={canvasRef}
                    style={{
                      display: 'block',
                      maxWidth: '100%',
                      maxHeight: '200px',
                      objectFit: 'contain',
                    }}
                  />
                  {texts.map(({ id, text, position, styles }) => (
                    <Draggable
                      key={id}
                      position={position}
                      onDrag={(e, data) => handleDrag(id, e, data)}
                      bounds="parent"
                      nodeRef={textRefs.current[id] || (textRefs.current[id] = React.createRef())}
                    >
                      <Box
                        ref={textRefs.current[id]}
                        onClick={() => handleTextClick(id)}
                        sx={{
                          position: 'absolute',
                          cursor: 'move',
                          color: styles.color,
                          fontSize: `${styles.fontSize}px`,
                          fontFamily: styles.fontFamily,
                          fontWeight: styles.fontWeight,
                          fontStyle: styles.fontStyle,
                          textShadow: styles.textShadow,
                          userSelect: 'none',
                          whiteSpace: 'pre-wrap',
                          maxWidth: '90%',
                          border: activeTextId === id ? `2px dashed ${colorScheme.primary}` : '1px dashed rgba(255,255,255,0.3)',
                          padding: '1px',
                          opacity: activeTextId === id ? 0.9 : 0.7,
                          transition: 'all 0.2s ease',
                          '&:hover': { opacity: 0.9 },
                          bgcolor: activeTextId === id ? 'rgba(0,0,0,0.1)' : 'transparent',
                          borderRadius: '3px',
                        }}
                      >
                        {text || 'Double click to edit'}
                      </Box>
                    </Draggable>
                  ))}
                </>
              ) : (
                <Box sx={{ textAlign: 'center', p: 1.5 }}>
                  <CloudUploadIcon sx={{ fontSize: '40px', color: colorScheme.secondaryText, mb: 0.5 }} />
                  <Typography variant="body2" sx={{ color: colorScheme.secondaryText, fontSize: '11px' }}>
                    Upload an image to start
                  </Typography>
                </Box>
              )}
            </Box>

            <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
              <Button
                variant="contained"
                onClick={handleSave}
                disabled={!image}
                startIcon={<DownloadIcon />}
                sx={{
                  py: 0.8,
                  px: 1.5,
                  bgcolor: colorScheme.primary,
                  color: colorScheme.secondary,
                  '&:hover': { bgcolor: darkMode ? '#1a1a5e' : '#1a1a5e' },
                  borderRadius: '5px',
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '11px',
                  '&:disabled': {
                    bgcolor: darkMode ? '#3d4a54' : '#e0e0e0',
                    color: darkMode ? '#b0b0b0' : '#9e9e9e',
                  },
                }}
              >
                Download
              </Button>
              <Button
                variant="outlined"
                onClick={handlePublish}
                disabled={!image || isPublishing}
                startIcon={publishSuccess ? null : <PublishIcon />}
                sx={{
                  py: 0.8,
                  px: 1.5,
                  color: publishSuccess ? colorScheme.secondary : colorScheme.primary,
                  borderColor: colorScheme.primary,
                  bgcolor: publishSuccess ? colorScheme.primary : 'transparent',
                  '&:hover': {
                    borderColor: colorScheme.primary,
                    bgcolor: publishSuccess ? (darkMode ? '#1a1a5e' : '#1a1a5e') : 'rgba(8, 7, 51, 0.1)',
                  },
                  borderRadius: '5px',
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: publishSuccess ? '9px' : '11px',
                  minWidth: publishSuccess ? '180px' : 'auto',
                  transition: 'all 0.3s ease',
                  '&:disabled': {
                    borderColor: darkMode ? '#3d4a54' : '#e0e0e0',
                    color: darkMode ? '#b0b0b0' : '#9e9e9e',
                  },
                }}
              >
                {publishSuccess ? 'Meme published successfully!' : isPublishing ? 'Publishing...' : 'Publish'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
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
};

export default Editor;