import SearchField from "../Components/SearchField";
import { useState } from "react";
import PostList from "../Components/PostList.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setId, setTitle } from "../Redux/titleSlice.js";
import { Box, Typography } from "@mui/material";

const Search = () => {
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

    return (
        <Box >
            <SearchField
                handleSearchResults={handleSearchResults}
                setLoading={setLoadingPost}
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