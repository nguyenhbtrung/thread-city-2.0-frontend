import React from "react";
import ProfileInfo from "../Components/ProfileInfo.js";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Post from '../views/post.jsx';
import PostList from "../Components/PostList.js";
import { toast } from "react-toastify";

const Profiles = () => {
    const { userName } = useParams()
    const navigate = useNavigate();
    const [profileData, setProfileData] = React.useState({});
    const [posts, setPosts] = React.useState([]);
    const [loadingPost, setLoadingPost] = React.useState(true);
    const [page, setPage] = React.useState(1);

    useEffect(() => {
        console.log(userName);
        const getProfileData = async () => {
            try {
                if (userName === null) {
                    console.log('userName is null');
                    navigate('/home');
                } else {
                    const response = await axios.get(`https://localhost:7135/api/User/profile/by-username/${userName}`);
                    const post = await axios.get(`https://localhost:7135/api/User/profile/by-username/${userName}/posts`);
                    if (response.status === 200 && post.status === 200) {
                        setProfileData(response.data);
                        setPosts(post.data);
                        console.log(response.data);
                        console.log(post.data);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };
        getProfileData();
    }, [userName]);

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
        if (page > 1) {
            LoadMorePost();
        }
    }, [page]);

    const LoadMorePost = async () => {
        try {
            const post = await axios.get(`https://localhost:7135/api/User/profile/by-username/${userName}/posts?PageNumber=${page}`);
            if (post.status === 200) {
                setPosts(prev => [...prev, ...post.data]);
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra");
        }
    };

    return (
        <div style={{ marginTop: '20px' }}>
            <div style={{ margin: 0, display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                {profileData && <ProfileInfo{...profileData} />}
            </div>
            <PostList
                posts={posts}
                loading={loadingPost}
            />
        </div>
    )
}

export default Profiles