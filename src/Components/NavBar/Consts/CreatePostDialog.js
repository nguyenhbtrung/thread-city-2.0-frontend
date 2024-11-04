import React, { useState } from 'react';
import {
    TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, useTheme,
    CircularProgress
} from '@mui/material';
import { colorSchemes } from '../../../views/shared-theme/themePrimitives';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNewPost } from '../../../Redux/postsSlice';

const CreatePostDialog = (props) => {
    let {
        open,
        handleClose
    } = props;
    const theme = useTheme();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);  // Set loading to true when submitting
        CreatePost();
    };

    const CreatePost = async () => {
        const token = sessionStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        try {
            const response = await axios.post('https://localhost:7135/api/Post', {
                title: title,
                content: content,
            }, config);

            if (response.status === 200) {
                console.log("New post:", response.data);
                toast.success('Đăng bài thành công');
            }
            dispatch(setNewPost(response.data));
            navigate("/home");
            handleClose();
        } catch (error) {
            if (error.code === "ERR_BAD_REQUEST") {
                if (error?.response?.data?.errors?.Title != null) {
                    toast.error(error?.response?.data?.errors?.Title[0]);
                }
                if (error?.response?.data?.errors?.Content != null) {
                    toast.error(error?.response?.data?.errors?.Content[0]);
                }
            } else {
                toast.error('Có lỗi xảy ra');
                console.log(error);
                handleClose();
            }
        } finally {
            setLoading(false);
        }

        try {
            const res = await axios.put('https://localhost:7135/api/Post/update-posts-scores', {}, config);
            console.log(res);
        } catch (error) {
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
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    disabled={loading}  // Disable button when loading
                // startIcon={loading && <CircularProgress size={24} />}  // Show loading spinner
                >
                    {loading ? <CircularProgress size={24} /> : 'Đăng'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreatePostDialog;
