import React, { useState } from 'react';
import {
  TextField, Button, Container, Typography, Box, Paper, Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#303030',
      paper: '#424242',
    },
    primary: {
      main: '#90caf9',
    },
  },
  typography: {
    h4: {
      fontWeight: 'bold',
    },
  },
});

const PostForm = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Post Submitted', { title, content });
    handleClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box sx={{ marginLeft: '200px', marginTop: '50px' }}>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Thêm bài đăng mới
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Thêm bài đăng mới</DialogTitle>
            <DialogContent>
              <TextField
                label="Tiêu đề"
                fullWidth
                margin="normal"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                label="Nội dung"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                variant="outlined"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Hủy
              </Button>
              <Button onClick={handleSubmit} variant="contained" color="primary">
                Đăng
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default PostForm;
