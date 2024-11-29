import { Box } from '@mui/material';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch } from 'react-redux';
import { setTitle } from '../Redux/titleSlice';

// props gom ten, anh dai dien, anh bia, so bai dang, so nguoi theo doi, so nguoi dang theo doi
const ProfileInfo = (props) => {
    const { avatarImgId, coverImgId, createdAt, email, userName, bio } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch();

    const handleMenuOpen = (event) => {
        if (sessionStorage.getItem('userName') !== userName) {
            return;
        }

        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    useEffect(() => {
        dispatch(setTitle(`${userName} - Trang cá nhân`));
    }, [userName]);



    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    return (
        <Box component="section" sx={{ p: 2, borderRadius: '15px', backgroundColor: '#1c1c1c', width: { xs: '90%', sm: '70%', md: '50%' }, maxWidth: '700px' }}>
            <img
                width='100%'
                height='auto'
                src={coverImgId ? `` : `https://cdn.oneesports.vn/cdn-data/sites/4/2024/11/lmht-esports-riot-games-cktg-2024-t1-vo-dich.jpg`}
                style={{ maxHeight: '200px', objectFit: 'cover', marginBottom: '-50px' }}
            />
            <div style={{ display: 'flex' }}>

                <Avatar
                    sx={{ bgcolor: 'gray', width: 100, height: 100, left: 20, }}
                    aria-label="recipe"
                    src={avatarImgId ? `https://localhost:7135/api/User/avatar/${avatarImgId}` : 'https://1.bp.blogspot.com/-R8gnX_mf-hI/XZwpsZoVyNI/AAAAAAAADOc/zfTGRKC1VyUVP2hxELrNk04TJTrHDg0mQCLcBGAsYHQ/s0/72487982_2513824035518413_4387733843654737920_n.png'}
                />
                <div style={{ textAlign: 'right' }}>
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
                        <MenuItem >Chỉnh sửa</MenuItem>
                    </Menu>
                </div>
            </div>
            <h2 style={{ textAlign: 'left', marginBottom: '5px' }}>{userName}</h2>
            <h3 style={{ textAlign: 'left', fontSize: '12px', color: 'gray' }}>{email}</h3>
            <h3 style={{ textAlign: 'left', fontSize: '12px', color: 'gray' }}>Gia nhập ngày: {formatDate(createdAt)}</h3>
            <h3 style={{ textAlign: 'left', fontSize: '16px', color: 'white', margin: '0px' }}>{bio ? bio : ""}</h3>
            <div style={{ display: 'flex', marginTop: '0px', fontSize: '14px' }}>
                <h2 style={{ textAlign: 'left', marginBottom: '5px', marginRight: '20px' }}>0 người theo dõi</h2>
                <h2 style={{ textAlign: 'left', marginBottom: '5px' }}>0 người đang theo dõi</h2>
            </div>
        </Box>
    )
}

export default ProfileInfo;