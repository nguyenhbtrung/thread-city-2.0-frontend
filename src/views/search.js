import SearchField from "../Components/SearchField";
import { useState } from "react";
import PostList from "../Components/PostList.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setId, setTitle } from "../Redux/titleSlice.js";
import { Box, Typography } from "@mui/material";
import { CreateHeadersConfigWithToken } from "../AppConst.js";
import { SearchPosts } from "../Services/PostService.js";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [loadingPost, setLoadingPost] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle("Tìm kiếm"));
        dispatch(setId(1));
    }, []);

    const handleSearchResults = (results) => {
        setSearchResults(results);
        setHasSearched(true);
    }

    const handleSearch = async () => {
        setLoadingPost(true);
        const config = CreateHeadersConfigWithToken();
        try {
            const response = await SearchPosts(searchTerm, config);
            const data = response.data;
            setLoadingPost(false);
            handleSearchResults(data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleSearchChange = (value) => {
        setSearchTerm(value);
    }


    return (
        <Box >
            <SearchField
                handleSearchChange={handleSearchChange}
                handleSearch={handleSearch}
            />
            {(hasSearched && !searchResults?.length) &&
                <Typography
                    variant="body1"
                    sx={{ px: 2, py: 1, fontStyle: "italic" }}
                >
                    Không tìm thấy kết quả nào.
                </Typography>
            }
            <PostList
                posts={searchResults}
                loading={loadingPost}
            />
        </Box>
    )
}

export default Search