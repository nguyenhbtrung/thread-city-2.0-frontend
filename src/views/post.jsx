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


const CenteredContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Makes the container full height of the viewport
  });

export default function Post() {
  const expanded = React.useState(false);

  return (
    <CenteredContainer>
    <Card sx={{ maxWidth: 700 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            C
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={<Typography align="left" fontWeight="bold">Mèo 123</Typography>}
        subheader={<Typography align="left">14 tháng 9 2024</Typography>}
      />
      <CardMedia
        component="img"
        height="auto"
        image="https://www.animalfriends.co.uk/siteassets/media/images/article-images/cat-articles/51_afi_article1_the-secret-language-of-cats.png"
        alt="Cat"
      />
      <CardContent>
        <Typography align='left' variant="body2" sx={{ color: 'text.secondary' }}>
          Meow Meow Meow, Meow Meow Meow......... Meow Meow Meow. 
          Meow Meow Meow Meow, Meow Meow Meow~~ 
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      <IconButton aria-label="like">
          <ThumbUpIcon />
        </IconButton>
        <IconButton aria-label="comment">
          <MessageIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
    </CenteredContainer>
  );
}
