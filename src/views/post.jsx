import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MessageIcon from '@mui/icons-material/Message';
import ShareIcon from '@mui/icons-material/Share';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { convertToCustomMonthDate } from '../AppConst';


const CenteredContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Makes the container full height of the viewport
  });

export default function Post(props) {
  let {
    data
} = props;

  const expanded = React.useState(false);

  return (
    <Card sx={{ 
      maxWidth: { xs: '100%', sm: 600, md: 700 }, 
      width: '100%', 
      backgroundColor: '#1c1c1c' 
    }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            C
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon sx={{ color: 'white' }}/>
          </IconButton>
        }
        // Người dùng
        title={<Typography align="left" fontWeight="bold" sx={{ color: 'white' }}>{data?.author}</Typography>}
        // Thời gian đăng bài
        subheader={<Typography align="left" sx={{ color: 'white' }}>{convertToCustomMonthDate(data?.createdAt, 'vi-VN', 'long')}</Typography>}
      />
      {/* <CardMedia
        component="img"
        height="auto"
        image="https://www.animalfriends.co.uk/siteassets/media/images/article-images/cat-articles/51_afi_article1_the-secret-language-of-cats.png"
        alt="Cat"
      /> */}

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
      <IconButton aria-label="like">
          <ThumbUpIcon sx={{ color: 'white' }}/>
        </IconButton>
        <IconButton aria-label="comment">
          <MessageIcon sx={{ color: 'white' }}/>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon sx={{ color: 'white' }}/>
        </IconButton>
      </CardActions>
    </Card>
  );
}
