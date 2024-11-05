import SearchField from "../Components/SearchField";
import { useState } from "react";
import PostList from "../Components/PostList.js";


const Search = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [loadingPost, setLoadingPost] = useState(true);
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