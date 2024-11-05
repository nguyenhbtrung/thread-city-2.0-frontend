import Grid from '@mui/material/Grid';
import { Box, Skeleton } from "@mui/material";
import Post from '../views/post';


const PostList = (props) => {
    let {
        posts,
        loading,
        onDeletedSuccessfully
    } = props;
    return (
        <Grid container direction="column" alignItems="center" spacing={2}>
            {posts?.map((item, index) => {
                return (
                    <Grid item key={index}>
                        <Box sx={{ width: { xs: '100%', sm: 700 }, mb: 2 }}>
                            <Post
                                data={{
                                    postId: item?.postId,
                                    author: item?.authorUserName,
                                    title: item?.title,
                                    content: item?.content,
                                    createdAt: item?.createdAt,
                                    likeCount: item?.likeCount,
                                    commentCount: item?.commentCount,
                                    isLiked: item?.isLiked
                                }}
                                onDeletedSuccessfully={onDeletedSuccessfully}
                            />
                        </Box>
                    </Grid>
                );
            })}

            {loading && (
                <Grid item>
                    <Box sx={{ width: { xs: '100%', sm: 700 }, mb: 2 }}>
                        <Skeleton variant="rectangular" height={118} />
                        <Skeleton variant="text" />
                        <Skeleton variant="text" />
                    </Box>
                </Grid>
            )}

        </Grid>
    )
};

export default PostList;