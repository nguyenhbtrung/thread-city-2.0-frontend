import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MessageIcon from '@mui/icons-material/Message';
import ShareIcon from '@mui/icons-material/Share';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { convertToCustomMonthDate } from '../AppConst';
import axios from 'axios';
import { Box, Divider, TextField } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { DeletePost } from '../Services/PostService';

const CenteredContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh', // Makes the container full height of the viewport
});

export default function Post(props) {
  let {
    data,
    onDeletedSuccessfully
  } = props;

  const expanded = useState(false);
  const [likeCount, SetLikeCount] = useState(data?.likeCount || 0);
  const [like, SetLike] = useState(data?.isLiked || false);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newCommentList, setNewCommentList] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    if (sessionStorage.getItem('userName') !== data?.author) {
      console.log(sessionStorage.getItem('userName'));
      console.log(data?.author);
      return;
    }

    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeletePost = async () => {
    const token = sessionStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
    try {
      const response = await DeletePost(data?.postId, config);
      if (response?.status === 200) {
        toast.success("Đã xoá bài viết");
        onDeletedSuccessfully();
      }
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra");
    }
    console.log('Delete post');
    handleMenuClose();
  };

  const navigate = useNavigate();

  const toggleCommentsVisibility = async () => {
    setCommentsVisible(!commentsVisible);
    if (comments.length == 0) {
      const commentPage = await GetCommentPage(1);
      setComments(commentPage);
    }
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const submitComment = () => {
    handleAddComment(newComment);
    setNewComment('');
  };

  const handleAddComment = async (newComment) => {
    const payload = {
      postId: data?.postId,
      content: newComment
    };
    const token = sessionStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
    try {
      const response = await axios.post(`https://localhost:7135/api/Comment`, payload, config);
      if (response?.status === 200) {
        setComments([...comments, response?.data]);
      }

    } catch (error) {
      console.log(error);
    }
  };


  const GetCommentPage = async (pageNumber = 1) => {
    try {
      const response = await axios.get(`https://localhost:7135/api/Comment/${data?.postId}?PageNumber=${pageNumber}`);
      if (response?.status === 200) {
        return response?.data;
      }
      return [];
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  const handleLikePost = async () => {
    const token = sessionStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
    try {
      const response = await axios.put(`https://localhost:7135/api/LikePost/${data?.postId}`, {}, config);
      console.log(response?.data);
      SetLikeCount(response?.data?.likeCount);
      SetLike(response?.data?.isLiked);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickNavigateToAuthor = () => {
    navigate(`/profile/by-username/${data?.author}`);
  }

  React.useEffect(() => {
    SetLikeCount(data?.likeCount || 0);
    SetLike(data?.isLiked || false);
    setCommentsVisible(false);
    setComments([]);
    setNewComment("");
    setNewCommentList([]);
  }, [data]);

  return (
    <Card sx={{
      maxWidth: { xs: '100%', sm: 600, md: 700 },
      width: '100%',
      backgroundColor: '#1c1c1c'
    }}>
      <CardHeader
        avatar={
          <Avatar
            onClick={handleClickNavigateToAuthor}
            aria-label="recipe"
            src="https://1.bp.blogspot.com/-R8gnX_mf-hI/XZwpsZoVyNI/AAAAAAAADOc/zfTGRKC1VyUVP2hxELrNk04TJTrHDg0mQCLcBGAsYHQ/s0/72487982_2513824035518413_4387733843654737920_n.png">
          </Avatar>
        }
        action={
          <div>
            <IconButton aria-label="settings" onClick={handleMenuOpen}>
              <MoreVertIcon sx={{ color: 'white' }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              PaperProps={{
                style: {
                  backgroundColor: '#1c1c1c',
                  color: 'white',
                },
              }}
            >
              <MenuItem onClick={handleDeletePost}>Xoá bài</MenuItem>
            </Menu>
          </div>
        }
        // Người dùng
        title={<Typography onClick={handleClickNavigateToAuthor} align="left" fontWeight="bold" sx={{ color: 'white' }}>{data?.author}</Typography>}
        // Thời gian đăng bài
        subheader={<Typography align="left" sx={{ color: 'white' }}>{convertToCustomMonthDate(data?.createdAt, 'vi-VN', 'long')}</Typography>}
      />

      <CardContent>
        {/* Tiêu đề */}
        <Typography align='left' fontWeight="bold" sx={{ color: 'text.secondary', color: 'white' }}>
          {data?.title}
        </Typography>
        {/* Nội dung */}
        <Typography align='left' variant="body2" sx={{ color: 'text.secondary', color: 'white' }}>
          {data?.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like" onClick={handleLikePost}>
          <ThumbUpIcon sx={{ color: like ? '#4CC9FE' : 'white' }} />
          <Typography variant="body2" sx={{ color: 'white', marginLeft: '4px' }}>
            {likeCount}
          </Typography>
        </IconButton>
        <IconButton aria-label="comment" onClick={toggleCommentsVisibility}>
          <MessageIcon sx={{ color: 'white' }} />
          <Typography variant="body2" sx={{ color: 'white', marginLeft: '4px' }}>
            {data?.commentCount}
          </Typography>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon sx={{ color: 'white' }} />
        </IconButton>
      </CardActions>

      {commentsVisible && (
        <>
          <Divider sx={{ backgroundColor: 'white' }} />
          <CardContent>
            <Typography variant="h6" align='left' sx={{ color: 'white' }}>
              Bình luận
            </Typography>

            {comments?.map((comment, index) => (
              <Box key={index} sx={{ marginTop: '10px', display: 'flex', alignItems: 'flex-start' }}>
                <Avatar
                  aria-label="comment-avatar"
                  src={comment.authorAvatar}
                  sx={{ marginRight: '10px' }}
                />
                <Box sx={{
                  padding: '10px',
                  borderRadius: '10px',
                  backgroundColor: '#333333',
                  display: 'inline-block',
                  maxWidth: 'calc(100% - 60px)',
                  flexGrow: 1
                }}>
                  <Typography align='left' sx={{ color: 'white', fontWeight: 'bold' }}>
                    {comment.authorUserName}
                  </Typography>
                  <Typography align='left' variant="body2" sx={{ color: 'text.secondary', color: 'white', marginTop: '5px' }}>
                    {comment.content}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                    <IconButton aria-label="like-comment">
                      <ThumbUpIcon sx={{ color: 'white' }} />
                    </IconButton>
                    <IconButton aria-label="reply-comment">
                      <ReplyIcon sx={{ color: 'white' }} />
                    </IconButton>
                    <Typography variant="body2" sx={{ color: 'text.secondary', color: 'white', marginLeft: '10px' }}>
                      {convertToCustomMonthDate(comment?.createdAt, 'vi-VN', 'long')}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}



            {/* Thêm bình luận */}
            <Box sx={{ marginTop: '20px', display: 'flex', alignItems: 'flex-start' }}>
              <Avatar
                aria-label="comment-avatar"
                src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fuser%2F&psig=AOvVaw1bscKecF5yVYUxbAeH0cF8&ust=1730718872225000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLDAnq6EwIkDFQAAAAAdAAAAABAE"
                sx={{ marginRight: '10px' }}
              />
              <Box sx={{
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: '#333333',
                display: 'inline-block',
                maxWidth: 'calc(100% - 60px)',
                flexGrow: 1,
                position: 'relative'
              }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Viết bình luận..."
                  multiline
                  maxRows={4}
                  value={newComment}
                  onChange={handleCommentChange}
                  sx={{ backgroundColor: '#333333', borderRadius: '10px' }}
                  InputProps={{
                    sx: {
                      color: 'white',
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'white',
                        },
                        '&:hover fieldset': {
                          borderColor: '#4CC9FE',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#4CC9FE',
                        },
                      },
                    },
                  }}
                />
                <IconButton
                  aria-label="send-comment"
                  sx={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    color: 'white'
                  }}
                  onClick={submitComment}
                >
                  <SendIcon />
                </IconButton>
              </Box>
            </Box>


          </CardContent>
        </>
      )}




    </Card>
  );

}
