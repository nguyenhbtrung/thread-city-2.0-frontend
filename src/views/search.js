import SearchField from "../Components/SearchField";
import { Grid, Box } from '@mui/material';
import Post from '../views/post.jsx';
import { useState } from "react";


const Search = () => {
    const [searchResults, setSearchResults] = useState([]);
    return (
        <div style={{ margin: 0 }}>
            <SearchField setSearchResults={setSearchResults} />
            <Grid container direction="column" alignItems="center" spacing={2}>
                {searchResults?.map((item, index) => {
                    return (
                        <Grid item key={index}>
                            <Box sx={{ width: { xs: '100%', sm: 700 }, mb: 2 }}>
                                <Post
                                    data={{
                                        author: item?.authorUserName,
                                        title: item?.title,
                                        content: item?.content,
                                        createdAt: item?.createdAt
                                    }}
                                />
                            </Box>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    )
}

export default Search