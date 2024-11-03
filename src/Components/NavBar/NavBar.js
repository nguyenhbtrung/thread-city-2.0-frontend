import React from 'react';
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

const NavBar = () => {

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
                  handleSignOut();
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
    </div>
  )
}


export default NavBar;