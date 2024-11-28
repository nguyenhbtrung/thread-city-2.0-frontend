import SearchField from "../Components/SearchField";
import { useState } from "react";
import PostList from "../Components/PostList.js";
import { useEffect } from "react";

const Search = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [loadingPost, setLoadingPost] = useState(true);

    useEffect(() => {
        document.title = `Tìm kiếm`;
    });
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