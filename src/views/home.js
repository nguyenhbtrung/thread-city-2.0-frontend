import React, { useEffect, useState } from "react";
import Post from "./post";
import axios from "axios";
import { toast } from "react-toastify";
import Grid from '@mui/material/Grid';
import { Box } from "@mui/material";

const Home = () => {
    const [state, setState] = useState({});

    const setDataState = (value, source) => {
        setState((pre) => ({ ...pre, [source]: value }))
    }


    useEffect( () => {
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
                setDataState(response?.data, 'posts');
                console.log('posts', state?.posts);
            } catch (error) {
                toast.error("Có lỗi xảy ra");
            }
        };

        fetchData();
        

    }, []);

    useEffect(() => console.log('posts', state?.posts),  [state] );

    return(
        <Grid container direction="column" alignItems="center" spacing={2}>
            {state?.posts?.map((item, index) => {
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