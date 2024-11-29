import SearchField from "../Components/SearchField";
import { useState } from "react";
import PostList from "../Components/PostList.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setId, setTitle } from "../Redux/titleSlice.js";

const Search = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [loadingPost, setLoadingPost] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle("Tìm kiếm"));
        dispatch(setId(1));
    }, []);

    return (
        <div style={{ margin: 0 }}>
            <SearchField setSearchResults={setSearchResults} />
            <PostList
                posts={searchResults}
                loading={loadingPost}
            />
        </div>
    )
}

export default Search