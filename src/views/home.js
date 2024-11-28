import React, { useEffect, useState } from "react";
import Post from "../Components/post";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setNewPost, setNewsfeed } from "../Redux/postsSlice";
import PostList from "../Components/PostList";
import { GetNewsfeed } from "../Services/PostService";
import { CreateHeadersConfigWithToken } from "../AppConst";

const Home = () => {
    const [state, setState] = useState({});

    const [page, setPage] = useState(1);
    const [loadingPost, setLoadingPost] = useState(true);

    useEffect(() => {
        document.title = `Trang chủ`;
    });

    const setDataState = (value, source) => {
        setState((pre) => ({ ...pre, [source]: value }))
    }

    const posts = useSelector((state) => state.post.newsfeed);
    const newPost = useSelector((state) => state.post.newPost);
    const dispatch = useDispatch();


    const fetchData = async () => {
        const config = CreateHeadersConfigWithToken();
        try {
            const response = await GetNewsfeed(page, config);
            dispatch(setNewsfeed(response?.data));
            setDataState(response?.data, 'posts');
            console.log('state.posts', state?.posts);
            console.log('posts', posts);
        } catch (error) {
            toast.error("Có lỗi xảy ra");
        }
    };

    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight) {
            setPage(prev => prev + 1);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {


        if (newPost == null) {
            fetchData();
        } else {
            // posts = posts || []
            console.log("update:", [newPost, ...posts]);
            dispatch(setNewsfeed([newPost, ...posts]));
            dispatch(setNewPost(null));
        }

    }, []);

    useEffect(() => {
        if (page > 1) {
            LoadMorePost();
        }
    }, [page]);

    const LoadMorePost = async () => {
        const config = CreateHeadersConfigWithToken();
        try {
            const response = await GetNewsfeed(page, config);
            const newList = [...posts, ...response?.data]
            dispatch(setNewsfeed(newList));
            setDataState(newList, 'posts');
            console.log('state.posts', state?.posts);
            console.log('posts', posts);
        } catch (error) {
            toast.error("Có lỗi xảy ra");
        }
    };

    useEffect(() => {
        // posts = posts || []
        if (newPost == null)
            return;
        console.log("update:", [newPost, ...posts]);
        dispatch(setNewsfeed([newPost, ...posts]));
        dispatch(setNewPost(null));
    }, [newPost]);

    const ResetPage = () => {
        setPage(1);
        dispatch(setNewsfeed([]));
        fetchData();
    };
    // useEffect(() => console.log('posts', post?.posts), [post?.posts]);
    // useEffect(() => console.log('state.posts', state?.posts), [state?.posts]);

    return (
        <PostList
            posts={posts}
            loading={loadingPost}
            onDeletedSuccessfully={ResetPage}
        />
    )
}

export default Home;