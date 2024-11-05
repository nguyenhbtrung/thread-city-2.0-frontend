import React from "react";
import ProfileInfo from "../Components/ProfileInfo.js";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Post from '../views/post.jsx';

const Profiles = () => {
    const {userName} = useParams()
    const navigate = useNavigate();
    const [profileData, setProfileData] = React.useState({});
    const [posts, setPosts] = React.useState([]);

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
    });
    return (
        <div style={{ marginTop: '20px' }}>
            <div style={{ margin: 0, display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                {profileData && <ProfileInfo{...profileData} />}
            </div>
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
                                        createdAt: item?.createdAt,
                                        likeCount: item?.likeCount,
                                        commentCount: item?.commentCount
                                    }}
                                />
                            </Box>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    )
}

export default Profiles