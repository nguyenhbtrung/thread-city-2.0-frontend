import SearchField from "../Components/SearchField";
import { useRef, useState } from "react";
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
    const [page, setPage] = useState(1);
    const [loadingPost, setLoadingPost] = useState(false);
    const loadingPostRef = useRef(false);
    const isLastPageRef = useRef(false);
    const dispatch = useDispatch();

    const setLoadingPostRef = (value) => {
        setLoadingPost(value);
        loadingPostRef.current = value;
    }

    useEffect(() => {
        dispatch(setTitle("Tìm kiếm"));
        dispatch(setId(1));
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (page > 1) loadMorePost();
    }, [page]);

    const handleSearchResults = (results) => {
        setSearchResults(results);
        setHasSearched(true);
    }

    const handleSearch = async () => {
        setLoadingPostRef(true);
        setPage(1);
        isLastPageRef.current = false;
        const config = CreateHeadersConfigWithToken();
        try {
            const response = await SearchPosts(searchTerm, 1, config);
            const data = response.data;
            handleSearchResults(data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoadingPostRef(false);
        }
    }

    const handleSearchChange = (value) => {
        setSearchTerm(value);
    }

    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight - window.innerHeight && !loadingPostRef.current && !isLastPageRef.current) {
            setLoadingPostRef(true);
            setPage(prev => prev + 1);
        }
    };

    const loadMorePost = async () => {
        if (!searchResults?.length) {
            setLoadingPostRef(false);
            return;
        }
        const config = CreateHeadersConfigWithToken();
        try {
            const response = await SearchPosts(searchTerm, page, config);
            const data = response.data;
            if (!data?.length) {
                isLastPageRef.current = true;
                return;
            }
            setSearchResults(prev => [...prev, ...data]);
        } catch (err) {
            console.log(err);
        } finally {
            setLoadingPostRef(false);
        }
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