import TextField from '@mui/material/TextField';
import { Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchField = (props) => {
    const {
        handleSearchChange,
        handleSearch,
    } = props;

    const handleSubmit = (e) => {
        e.preventDefault(); // tránh reload trang
        handleSearch();
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                margin: '20px 0',
                width: '75%',
                display: 'flex',
                justifyContent: 'center',
                marginLeft: '220px',
            }}
        >
            <TextField
                id="outlined-search"
                label="Tìm kiếm"
                type="search"
                placeholder="Tìm bài viết theo tiêu đề hoặc nội dung..."
                onChange={(e) => handleSearchChange(e.target.value)}
                fullWidth
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'white' },
                        '&:hover fieldset': { borderColor: 'white' },
                        '&.Mui-focused fieldset': { borderColor: 'white' },
                    },
                    '& .MuiInputBase-input': { color: 'white' },
                    '& input:-webkit-autofill': {
                        WebkitBoxShadow: '0 0 0 1000px #121212 inset',
                        WebkitTextFillColor: 'white',
                        caretColor: 'white',
                        transition: 'background-color 5000s ease-in-out 0s',
                    },
                    '& input:-webkit-autofill:hover': {
                        WebkitBoxShadow: '0 0 0 1000px #121212 inset',
                        WebkitTextFillColor: 'white',
                    },
                    '& input:-webkit-autofill:focus': {
                        WebkitBoxShadow: '0 0 0 1000px #121212 inset',
                        WebkitTextFillColor: 'white',
                    },
                }}
                slotProps={{
                    inputLabel: {
                        style: { color: 'white' },
                    }
                }}
            />
            <Button
                type="submit"
                variant="contained"
                sx={{
                    marginLeft: '10px',
                    backgroundColor: '#121212',
                    borderColor: '#121212',
                    border: 1,
                }}
            >
                <SearchIcon />
            </Button>
        </Box>
    );
};

export default SearchField;
