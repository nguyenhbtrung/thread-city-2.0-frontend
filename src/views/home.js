import React, { useEffect, useState } from "react";
import Post from "./post";
import axios from "axios";
import { toast } from "react-toastify";
import Grid from '@mui/material/Grid';
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setNewPost, setNewsfeed } from "../Redux/postsSlice";

const Home = () => {
    const [state, setState] = useState({});

    const setDataState = (value, source) => {
        setState((pre) => ({ ...pre, [source]: value }))
    }

    const posts = useSelector((state) => state.post.newsfeed);
    const newPost = useSelector((state) => state.post.newPost);
    const dispatch = useDispatch();


    const fetchData = async () => {
        const token = sessionStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        try {
            const response = await axios.get('https://localhost:7135/api/Post/newsfeed', config);
            dispatch(setNewsfeed(response?.data));
            setDataState(response?.data, 'posts');
            console.log('state.posts', state?.posts);
            console.log('posts', posts);
        } catch (error) {
            toast.error("Có lỗi xảy ra");
        }
    };
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
        // posts = posts || []
        if (newPost == null)
            return;
        console.log("update:", [newPost, ...posts]);
        dispatch(setNewsfeed([newPost, ...posts]));
        dispatch(setNewPost(null));
    }, [newPost]);

    // useEffect(() => console.log('posts', post?.posts), [post?.posts]);
    // useEffect(() => console.log('state.posts', state?.posts), [state?.posts]);

    return (
        <Grid container direction="column" alignItems="center" spacing={2}>
            {posts?.map((item, index) => {
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
    )
}

export default Home