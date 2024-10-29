import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PushPinIcon from '@mui/icons-material/PushPin';
import MenuIcon from '@mui/icons-material/Menu';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward'; //Logo tạm thời

export const mainNavItem = [
    {
        id: 0, //Logo tạm thời
        icon: <AccessibleForwardIcon />,
        label: 'T1',
        route: 'home'
    },
    {
        id: 1,
        icon: <HomeIcon />,
        label: 'Home',
        route: 'home'
    },
    {
        id: 2,
        icon: <SearchIcon />,
        label: 'Search',
        route: 'search'
    },
    {
        id: 3,
        icon: <AddIcon />,
        label: 'Post',
        route: 'post'
    },
    {
        id: 4,
        icon: <FavoriteBorderIcon />,
        label: 'Favorite',
        route: 'favorite'
    },
    {
        id: 5,
        icon: <PermIdentityIcon />,
        label: 'Profiles',
        route: 'profiles'
    },
    {
        id: 6,
        icon: <PushPinIcon />,
        label: 'Pin',
        route: 'pin'
    },
    {
        id: 7,
        icon: <MenuIcon />,
        label: 'Menu',
        route: 'menu'
    },

]