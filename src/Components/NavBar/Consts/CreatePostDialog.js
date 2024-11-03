import React, { useState } from 'react';
import {
    TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, useTheme
} from '@mui/material';
import AppTheme from '../../../views/shared-theme/AppTheme';
import { colorSchemes } from '../../../views/shared-theme/themePrimitives';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreatePostDialog = (props) => {
    let {
        open,
        handleClose
    } = props;
    const theme = useTheme();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        CreatePost();
        handleClose();
    };

    const CreatePost = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };
            const response = await axios.post('https://localhost:7135/api/Post', {
                title: title,
                content: content,
            }, config);

            if (response.status === 200) {
                toast.success('Đăng bài thành công');
            }
            const res = await axios.put('https://localhost:7135/api/Post/update-posts-scores', config);
        } catch (error) {
            toast.error('Có lỗi xảy ra');
            console.log(error);
        }


    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                style: {
                    backgroundColor: colorSchemes.dark.palette.background.paper,
                    color: colorSchemes.dark.palette.text.primary
                }
            }}
        >
            <DialogTitle>Thêm bài đăng mới</DialogTitle>
            <DialogContent>
                <TextField
                    label="Tiêu đề"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={title}
                    sx={{
                        // Tùy chỉnh màu cho root của TextField
                        '& .MuiOutlinedInput-root': {
                            color: colorSchemes.dark.palette.text.primary
                        },
                        // Tùy chỉnh màu cho đường viền
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: colorSchemes.dark.palette.text.primary
                        },
                        // Tùy chỉnh màu cho label
                        '& .MuiInputLabel-outlined': {
                            color: colorSchemes.dark.palette.text.primary
                        },
                    }}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    label="Nội dung"
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                    variant="outlined"
                    sx={{
                        // Tùy chỉnh màu cho root của TextField
                        '& .MuiOutlinedInput-root': {
                            color: colorSchemes.dark.palette.text.primary
                        },
                        // Tùy chỉnh màu cho đường viền
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: colorSchemes.dark.palette.text.primary
                        },
                        // Tùy chỉnh màu cho label
                        '& .MuiInputLabel-outlined': {
                            color: colorSchemes.dark.palette.text.primary
                        },
                    }}
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
    );
};

export default CreatePostDialog;
