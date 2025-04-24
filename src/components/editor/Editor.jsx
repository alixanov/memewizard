import React, { useState, useRef, useEffect } from 'react';
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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Draggable from 'react-draggable';

const Editor = () => {
  const [image, setImage] = useState(null);
  const [texts, setTexts] = useState([
    {
      id: 1,
      text: '',
      position: { x: 50, y: 50 },
      styles: {
        fontSize: 24,
        fontFamily: 'Arial',
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
  const canvasRef = useRef(null);
  const textRefs = useRef({});

  const colorScheme = {
    primary: '#080733',
    secondary: '#ffffff',
    text: '#080733',
    secondaryText: '#555',
    background: '#ffffff',
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
    setTexts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: value } : t))
    );
  };

  const handleStyleChange = (id, key, value) => {
    setTexts((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const updatedText = { ...t, styles: { ...t.styles, [key]: value } };
          if (key === 'textPosition' && canvasRef.current) {
            const { position } = calculateTextPosition(
              updatedText.text,
              updatedText.styles,
              canvasRef.current
            );
            updatedText.position = position;
          }
          return updatedText;
        }
        return t;
      })
    );
  };

  const handleDrag = (id, e, data) => {
    setTexts((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, position: { x: data.x, y: data.y } } : t
      )
    );
  };

  const addText = () => {
    const newId = texts.length + 1;
    const newText = {
      id: newId,
      text: '',
      position: { x: 50, y: 50 },
      styles: {
        fontSize: 24,
        fontFamily: 'Arial',
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

  const handlePublish = () => {
    const meme = {
      id: Date.now(), // Unique ID based on timestamp
      image,
      texts,
    };
    const existingMemes = JSON.parse(localStorage.getItem('publishedMemes') || '[]');
    localStorage.setItem('publishedMemes', JSON.stringify([...existingMemes, meme]));
    alert('Meme published successfully!');
  };

  const calculateTextPosition = (text, styles, canvas) => {
    const ctx = canvas.getContext('2d');
    ctx.font = `${styles.fontStyle === 'italic' ? 'italic ' : ''}${styles.fontWeight === 'bold' ? 'bold ' : ''
      }${styles.fontSize}px ${styles.fontFamily}`;
    const lines = text.split('\n');
    const lineHeight = styles.fontSize * 1.2;
    const textWidth = Math.max(...lines.map((line) => ctx.measureText(line).width));
    const textHeight = lines.length * lineHeight;

    let x, y;
    switch (styles.textPosition) {
      case 'start':
        x = 10;
        y = canvas.height / 2;
        break;
      case 'end':
        x = canvas.width - textWidth - 10;
        y = canvas.height / 2;
        break;
      case 'top':
        x = canvas.width / 2;
        y = styles.fontSize + 10;
        break;
      case 'bottom':
        x = canvas.width / 2;
        y = canvas.height - textHeight - 10;
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
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        texts.forEach(({ text, position, styles }) => {
          ctx.font = `${styles.fontStyle === 'italic' ? 'italic ' : ''}${styles.fontWeight === 'bold' ? 'bold ' : ''
            }${styles.fontSize}px ${styles.fontFamily}`;
          ctx.fillStyle = styles.color;
          ctx.globalAlpha = styles.opacity;

          ctx.textAlign =
            styles.textPosition === 'center' ||
              styles.textPosition === 'top' ||
              styles.textPosition === 'bottom'
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
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f8f9fa', // Match background with other components
      }}
    >
      <Paper elevation={0} sx={{ p: 2, bgcolor: colorScheme.background, maxWidth: 800, width: '100%', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <Typography
          variant="h5"
          sx={{ color: colorScheme.text, fontWeight: '600', mb: 2, textAlign: 'center' }}
        >
          Meme Creator
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Toolbar */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              variant="contained"
              component="label"
              sx={{
                py: 1,
                bgcolor: colorScheme.primary,
                color: colorScheme.secondary,
                '&:hover': { bgcolor: 'rgba(8, 7, 51, 0.8)' },
              }}
            >
              Upload Image
              <input
                type="file"
                accept=".jpg,.png,.gif"
                hidden
                onChange={handleImageUpload}
              />
            </Button>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <TextField
                fullWidth
                label="Meme Text"
                value={activeText?.text || ''}
                onChange={(e) => handleTextChange(activeTextId, e.target.value)}
                size="small"
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: colorScheme.secondaryText },
                    '&:hover fieldset': { borderColor: colorScheme.text },
                    '&.Mui-focused fieldset': { borderColor: colorScheme.primary },
                  },
                  '& .MuiInputBase-input': { color: colorScheme.text },
                  '& .MuiInputLabel-root': { color: colorScheme.secondaryText },
                  '& .MuiInputLabel-root.Mui-focused': { color: colorScheme.primary },
                }}
              />
              <Button
                variant="outlined"
                onClick={addText}
                sx={{
                  minWidth: 'auto',
                  bgcolor: colorScheme.primary,
                  color: colorScheme.secondary,
                  '&:hover': { bgcolor: 'rgba(8, 7, 51, 0.8)' },
                }}
              >
                <AddIcon />
              </Button>
              {texts.length > 1 && (
                <Button
                  variant="outlined"
                  onClick={() => deleteText(activeTextId)}
                  sx={{
                    minWidth: 'auto',
                    bgcolor: colorScheme.primary,
                    color: colorScheme.secondary,
                    '&:hover': { bgcolor: 'rgba(8, 7, 51, 0.8)' },
                  }}
                >
                  <DeleteIcon />
                </Button>
              )}
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel sx={{ color: colorScheme.secondaryText, '&.Mui-focused': { color: colorScheme.primary } }}>
                  Font
                </InputLabel>
                <Select
                  value={activeText?.styles.fontFamily || 'Arial'}
                  onChange={(e) => handleStyleChange(activeTextId, 'fontFamily', e.target.value)}
                  sx={{
                    color: colorScheme.text,
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: colorScheme.secondaryText },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: colorScheme.text },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: colorScheme.primary },
                    '& .MuiSelect-icon': { color: colorScheme.text },
                  }}
                >
                  <MenuItem value="Arial">Arial</MenuItem>
                  <MenuItem value="Roboto">Roboto</MenuItem>
                  <MenuItem value="Impact">Impact</MenuItem>
                  <MenuItem value="Times New Roman">Times New Roman</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel sx={{ color: colorScheme.secondaryText, '&.Mui-focused': { color: colorScheme.primary } }}>
                  Font Size
                </InputLabel>
                <Select
                  value={activeText?.styles.fontSize || 24}
                  onChange={(e) => handleStyleChange(activeTextId, 'fontSize', e.target.value)}
                  sx={{
                    color: colorScheme.text,
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: colorScheme.secondaryText },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: colorScheme.text },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: colorScheme.primary },
                    '& .MuiSelect-icon': { color: colorScheme.text },
                  }}
                >
                  {[16, 20, 24, 28, 32, 36, 40].map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}px
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel sx={{ color: colorScheme.secondaryText, '&.Mui-focused': { color: colorScheme.primary } }}>
                  Weight
                </InputLabel>
                <Select
                  value={activeText?.styles.fontWeight || 'bold'}
                  onChange={(e) => handleStyleChange(activeTextId, 'fontWeight', e.target.value)}
                  sx={{
                    color: colorScheme.text,
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: colorScheme.secondaryText },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: colorScheme.text },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: colorScheme.primary },
                    '& .MuiSelect-icon': { color: colorScheme.text },
                  }}
                >
                  <MenuItem value="normal">Normal</MenuItem>
                  <MenuItem value="bold">Bold</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel sx={{ color: colorScheme.secondaryText, '&.Mui-focused': { color: colorScheme.primary } }}>
                  Italic
                </InputLabel>
                <Select
                  value={activeText?.styles.fontStyle || 'normal'}
                  onChange={(e) => handleStyleChange(activeTextId, 'fontStyle', e.target.value)}
                  sx={{
                    color: colorScheme.text,
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: colorScheme.secondaryText },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: colorScheme.text },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: colorScheme.primary },
                    '& .MuiSelect-icon': { color: colorScheme.text },
                  }}
                >
                  <MenuItem value="normal">No</MenuItem>
                  <MenuItem value="italic">Yes</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel sx={{ color: colorScheme.secondaryText, '&.Mui-focused': { color: colorScheme.primary } }}>
                  Position
                </InputLabel>
                <Select
                  value={activeText?.styles.textPosition || 'center'}
                  onChange={(e) => handleStyleChange(activeTextId, 'textPosition', e.target.value)}
                  sx={{
                    color: colorScheme.text,
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: colorScheme.secondaryText },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: colorScheme.text },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: colorScheme.primary },
                    '& .MuiSelect-icon': { color: colorScheme.text },
                  }}
                >
                  <MenuItem value="start">Start</MenuItem>
                  <MenuItem value="end">End</MenuItem>
                  <MenuItem value="top">Top</MenuItem>
                  <MenuItem value="bottom">Bottom</MenuItem>
                  <MenuItem value="center">Center</MenuItem>
                </Select>
              </FormControl>
              <TextField
                type="color"
                label="Text Color"
                value={activeText?.styles.color || '#ffffff'}
                onChange={(e) => handleStyleChange(activeTextId, 'color', e.target.value)}
                size="small"
                sx={{
                  minWidth: 120,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: colorScheme.secondaryText },
                    '&:hover fieldset': { borderColor: colorScheme.text },
                    '&.Mui-focused fieldset': { borderColor: colorScheme.primary },
                    backgroundColor: colorScheme.background,
                  },
                  '& .MuiInputBase-input': { color: colorScheme.text, padding: '4px' },
                  '& .MuiInputLabel-root': { color: colorScheme.secondaryText },
                  '& .MuiInputLabel-root.Mui-focused': { color: colorScheme.primary },
                }}
              />
              <TextField
                type="color"
                label="Stroke Color"
                value={activeText?.styles.strokeColor || '#000000'}
                onChange={(e) => handleStyleChange(activeTextId, 'strokeColor', e.target.value)}
                size="small"
                sx={{
                  minWidth: 120,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: colorScheme.secondaryText },
                    '&:hover fieldset': { borderColor: colorScheme.text },
                    '&.Mui-focused fieldset': { borderColor: colorScheme.primary },
                    backgroundColor: colorScheme.background,
                  },
                  '& .MuiInputBase-input': { color: colorScheme.text, padding: '4px' },
                  '& .MuiInputLabel-root': { color: colorScheme.secondaryText },
                  '& .MuiInputLabel-root.Mui-focused': { color: colorScheme.primary },
                }}
              />
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel sx={{ color: colorScheme.secondaryText, '&.Mui-focused': { color: colorScheme.primary } }}>
                  Stroke Width
                </InputLabel>
                <Select
                  value={activeText?.styles.strokeWidth || 0}
                  onChange={(e) => handleStyleChange(activeTextId, 'strokeWidth', e.target.value)}
                  sx={{
                    color: colorScheme.text,
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: colorScheme.secondaryText },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: colorScheme.text },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: colorScheme.primary },
                    '& .MuiSelect-icon': { color: colorScheme.text },
                  }}
                >
                  <MenuItem value={0}>None</MenuItem>
                  <MenuItem value={1}>1px</MenuItem>
                  <MenuItem value={2}>2px</MenuItem>
                  <MenuItem value={3}>3px</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel sx={{ color: colorScheme.secondaryText, '&.Mui-focused': { color: colorScheme.primary } }}>
                  Shadow
                </InputLabel>
                <Select
                  value={activeText?.styles.textShadow || '2px 2px 4px #000000'}
                  onChange={(e) => handleStyleChange(activeTextId, 'textShadow', e.target.value)}
                  sx={{
                    color: colorScheme.text,
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: colorScheme.secondaryText },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: colorScheme.text },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: colorScheme.primary },
                    '& .MuiSelect-icon': { color: colorScheme.text },
                  }}
                >
                  <MenuItem value="none">No Shadow</MenuItem>
                  <MenuItem value="2px 2px 4px #000000">Black Shadow</MenuItem>
                  <MenuItem value="2px 2px 4px #ffffff">White Shadow</MenuItem>
                </Select>
              </FormControl>
              <TextField
                type="number"
                label="Opacity"
                value={activeText?.styles.opacity || 1}
                onChange={(e) =>
                  handleStyleChange(activeTextId, 'opacity', Math.max(0, Math.min(1, e.target.value)))
                }
                size="small"
                sx={{
                  minWidth: 120,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: colorScheme.secondaryText },
                    '&:hover fieldset': { borderColor: colorScheme.text },
                    '&.Mui-focused fieldset': { borderColor: colorScheme.primary },
                  },
                  '& .MuiInputBase-input': { color: colorScheme.text },
                  '& .MuiInputLabel-root': { color: colorScheme.secondaryText },
                  '& .MuiInputLabel-root.Mui-focused': { color: colorScheme.primary },
                }}
                inputProps={{ min: 0, max: 1, step: 0.1 }}
              />
            </Box>
          </Box>
          {/* Preview Area */}
          <Box
            sx={{
              position: 'relative',
              mt: 2,
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              overflow: 'hidden',
              minHeight: 200,
            }}
          >
            {image ? (
              <>
                <canvas ref={canvasRef} style={{ display: 'block', maxWidth: '100%' }} />
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
                        fontWeight: styles.fontWeight,
                        fontStyle: styles.fontStyle,
                        textShadow: styles.textShadow,
                        userSelect: 'none',
                        whiteSpace: 'pre-wrap',
                        maxWidth: '90%',
                        border: activeTextId === id ? '1px dashed #080733' : '1px dashed #e0e0e0',
                        padding: '2px',
                        opacity: 0.5,
                        transition: 'opacity 0.3s',
                        '&:hover': { opacity: 0.8 },
                      }}
                    >
                      {text || 'Drag to position'}
                    </Box>
                  </Draggable>
                ))}
              </>
            ) : (
              <Typography
                variant="body2"
                sx={{ color: colorScheme.secondaryText, textAlign: 'center', py: 4 }}
              >
                Upload an image to create a meme
              </Typography>
            )}
          </Box>
          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={!image}
              sx={{
                py: 1,
                flex: 1,
                bgcolor: colorScheme.primary,
                color: colorScheme.secondary,
                '&:hover': { bgcolor: 'rgba(8, 7, 51, 0.8)' },
                '&:disabled': { bgcolor: '#e0e0e0', color: '#555' },
              }}
            >
              Download Meme
            </Button>
            <Button
              variant="contained"
              onClick={handlePublish}
              disabled={!image}
              sx={{
                py: 1,
                flex: 1,
                bgcolor: colorScheme.primary,
                color: colorScheme.secondary,
                '&:hover': { bgcolor: 'rgba(8, 7, 51, 0.8)' },
                '&:disabled': { bgcolor: '#e0e0e0', color: '#555' },
              }}
            >
              Publish Meme
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Editor;