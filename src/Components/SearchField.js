import React from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SearchPosts } from '../Services/PostService';


const SearchField = (props) => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleSearch = async () => {
        try {
            console.log(searchTerm);
            const response = await SearchPosts(searchTerm);
            const data = response.data;
            console.log(data);
            props.setSearchResults(data);
        }
        catch (err) {
            console.log(err);
        }
    }


    return (
        <div style={{ margin: '20px 0', width: '75%', display: 'flex', justifyContent: 'center', marginLeft: '220px' }}>
            <TextField
                id="outlined-search"
                label="Tìm kiếm"
                type="search"
                onChange={handleSearchChange}
                fullWidth
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'white',
                        },
                        '&:hover fieldset': {
                            borderColor: 'white',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'white',
                        },
                    },
                    '& .MuiInputBase-input': {
                        color: 'white',
                    },
                }}
                InputLabelProps={{
                    style: { color: 'white' },
                }}
            />
            <Button
                variant="contained"
                onClick={handleSearch}
                sx={{
                    marginLeft: '10px',
                    backgroundColor: '#121212',
                    borderColor: '#121212',
                    border: 1
                }}>
                <SearchIcon />
            </Button>
        </div>
    );
}

export default SearchField;