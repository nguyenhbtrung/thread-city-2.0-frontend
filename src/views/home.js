import React, { useEffect, useRef, useState } from "react";
import Post from "../Components/post";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setNewPost, setNewsfeed } from "../Redux/postsSlice";
import PostList from "../Components/PostList";
import { GetNewsfeed } from "../Services/PostService";
import { CreateHeadersConfigWithToken } from "../AppConst";
import { setId, setTitle } from "../Redux/titleSlice";

const Home = () => {
    const [state, setState] = useState({});

    const [page, setPage] = useState(1);
    const loadingPostRef = useRef(true);

    const setDataState = (value, source) => {
        setState((pre) => ({ ...pre, [source]: value }))
    }

    const posts = useSelector((state) => state.post.newsfeed);
    const newPost = useSelector((state) => state.post.newPost);
    const dispatch = useDispatch();


    const fetchData = async () => {
        const config = CreateHeadersConfigWithToken();
        try {
            loadingPostRef.current = true;
            const response = await GetNewsfeed(page, config);
            dispatch(setNewsfeed(response?.data));
            setDataState(response?.data, 'posts');
        } catch (error) {
            toast.error("Có lỗi xảy ra");
        } finally {
            loadingPostRef.current = false;
        }
    };

    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight - window.innerHeight && !loadingPostRef.current) {
            loadingPostRef.current = true;
            setPage(prev => prev + 1);
        }
    };

    useEffect(() => {
        dispatch(setTitle("Trang chủ"));
        dispatch(setId(0));
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {


        if (newPost == null) {
            fetchData();
        } else {
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
        } catch (error) {
            toast.error("Có lỗi xảy ra");
        } finally {
            loadingPostRef.current = false;
        }
    };

    useEffect(() => {
        if (newPost == null)
            return;
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
            loading={loadingPostRef.current}
            onDeletedSuccessfully={ResetPage}
        />
    )
}

export default Home;