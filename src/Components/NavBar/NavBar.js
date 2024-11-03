import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { mainNavItem } from './Consts/navList';
import { useNavigate } from "react-router-dom";
import CreatePostDialog from './Consts/CreatePostDialog';

const NavBar = () => {
  const [openCreatePost, setOpenCreatePost] = useState(false);

  const handleClickOpenCreatePost = () => {
    setOpenCreatePost(true);
  };

  const handleCloseCreatePost = () => {
    setOpenCreatePost(false);
  };


  const navigate = useNavigate();

  const drawerWidth = 200;

  const handleSignOut = () => {
    sessionStorage.removeItem('token');
    navigate('/sign-in');
  };

  

  return (
    <div>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#0A0A0A',
            color: '#FFFFFF'
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {mainNavItem.map((item) => (
            <ListItem
              button
              key={item.id}
              onClick={() => {
                if (item.label === 'Đăng xuất') {
                  handleSignOut(item.label === 'Đăng xuất');
                } else if (item.label === 'Đăng bài') {
                  handleClickOpenCreatePost();
                } else {
                  navigate(item.route);
                }
              }}>
              <ListItemButton>
                <ListItemIcon sx={{ color: '#FFFFFF' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <CreatePostDialog open={openCreatePost} handleClose={handleCloseCreatePost}/>
    </div>
  )
}


export default NavBar;