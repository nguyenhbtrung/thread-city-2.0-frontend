import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PushPinIcon from '@mui/icons-material/PushPin';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

export const getNavItems = (token) => [
    {
        id: 0,
        icon: <HomeIcon />,
        label: 'Trang chủ',
        route: 'home'
    },
    {
        id: 1,
        icon: <SearchIcon />,
        label: 'Tìm kiếm',
        route: 'search'
    },
    {
        id: 2,
        icon: <AddIcon />,
        label: 'Đăng bài',
        route: 'post'
    },
    {
        id: 3,
        icon: <FavoriteBorderIcon />,
        label: 'Yêu thích',
        route: 'favorite'
    },
    {
        id: 4,
        icon: <PermIdentityIcon />,
        label: 'Cá nhân',
        route: token ? `profile/username/${sessionStorage.getItem('userName')}` : 'sign-in'
    },
    {
        id: 5,
        icon: <PushPinIcon />,
        label: 'Lưu trữ',
        route: 'pin'
    },
    {
        id: 6,
        icon: <MenuIcon />,
        label: 'Cài đặt',
        route: 'menu'
    },
    {
        id: 7,
        icon: <LogoutIcon />,
        label: token ? 'Đăng xuất' : 'Đăng nhập',
        route: 'sign-in'
    },
];