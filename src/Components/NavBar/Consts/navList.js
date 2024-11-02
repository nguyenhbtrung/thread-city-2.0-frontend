import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PushPinIcon from '@mui/icons-material/PushPin';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward'; //Logo tạm thời

export const mainNavItem = [
    {
        id: 0, //Logo tạm thời
        icon: <AccessibleForwardIcon />,
        label: 'Thread T1',
        route: 'home'
    },
    {
        id: 1,
        icon: <HomeIcon />,
        label: 'Trang chủ',
        route: 'home'
    },
    {
        id: 2,
        icon: <SearchIcon />,
        label: 'Tìm kiếm',
        route: 'search'
    },
    {
        id: 3,
        icon: <AddIcon />,
        label: 'Đăng bài',
        route: 'post'
    },
    {
        id: 4,
        icon: <FavoriteBorderIcon />,
        label: 'Yêu thích',
        route: 'favorite'
    },
    {
        id: 5,
        icon: <PermIdentityIcon />,
        label: 'Cá nhân',
        route: 'profiles'
    },
    {
        id: 6,
        icon: <PushPinIcon />,
        label: 'Lưu trữ',
        route: 'pin'
    },
    {
        id: 7,
        icon: <MenuIcon />,
        label: 'Cài đặt',
        route: 'menu'
    },
    {
        id: 8,
        icon: <LogoutIcon />,
        label: 'Đăng xuất',
        route: 'sign-in'
    },
]