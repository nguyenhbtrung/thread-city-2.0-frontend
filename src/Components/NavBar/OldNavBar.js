import React, { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { getNavItems } from './Consts/navList';
import { useNavigate } from "react-router-dom";
import CreatePostDialog from '../CreatePostDialog';

const OldNavBar = () => {
    const [openCreatePost, setOpenCreatePost] = useState(false);
    const [token, setToken] = useState(sessionStorage.getItem('token'));

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
        sessionStorage.removeItem('userName');
        setToken(null); // Update the token state
        navigate('/sign-in');
    };

    useEffect(() => {
        const handleStorageChange = () => {
            setToken(sessionStorage.getItem('token'));
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        // This effect will run whenever the token state changes
    }, [token]);

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
                <Divider />
                <List sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    {getNavItems(token).map((item) => (
                        <ListItem
                            button
                            key={item.id}
                            sx={{ paddingRight: '0px' }}
                            onClick={() => {
                                if (item.label === 'Đăng xuất') {
                                    handleSignOut();
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
            <CreatePostDialog open={openCreatePost} handleClose={handleCloseCreatePost} />
        </div>
    )
}

export default OldNavBar;