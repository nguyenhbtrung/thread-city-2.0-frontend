import React from "react";
import ProfileInfo from "../Components/ProfileInfo.js";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import PostList from "../Components/PostList.js";
import { toast } from "react-toastify";
import { GetProfileData, GetProfilePosts } from "../Services/UserService.js";

const Profiles = () => {
    const { userName } = useParams()
    const navigate = useNavigate();
    const [profileData, setProfileData] = React.useState({});
    const [posts, setPosts] = React.useState([]);
    const [loadingPost, setLoadingPost] = React.useState(true);
    const [page, setPage] = React.useState(1);

    useEffect(() => {
        console.log(userName);
        getProfileData();
    }, [userName]);

    const getProfileData = async () => {
        try {
            if (userName === null) {
                console.log('userName is null');
                navigate('/home');
            } else {
                const userInfo = await GetProfileData(userName);
                if (userInfo.status === 200) {
                    setProfileData(userInfo.data);
                    console.log(userInfo.data);
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getProfilePost = async () => {
        try {
            if (userName === null) {
                console.log('userName is null');
                navigate('/home');
            } else {
                const post = await GetProfilePosts(userName, 1);
                if (post.status === 200) {
                    setPosts(post.data);
                    console.log(post.data);
                }
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra");
        }
}

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
        const post = await GetProfilePosts(userName, page);
        if (post.status === 200) {
            setPosts(prev => [...prev, ...post.data]);
        }
    } catch (error) {
        toast.error("Có lỗi xảy ra");
    }
};

const ResetPosts = () => {
    setPage(1);
    setPosts([]);
    getProfileData();
}

return (
    <div style={{ marginTop: '20px' }}>
        <div style={{ margin: 0, display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            {profileData && <ProfileInfo{...profileData} />}
        </div>
        <PostList
            posts={posts}
            loading={loadingPost}
            onDeletedSuccessfully={ResetPosts}
        />
    </div>
)
}

export default Profiles