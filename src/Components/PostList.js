import Grid from '@mui/material/Grid';
import { Box, Skeleton } from "@mui/material";
import Post from './post';


const PostList = (props) => {
    let {
        posts,
        loading,
        onDeletedSuccessfully
    } = props;
    return (
        <Grid container direction="column" alignItems="center" spacing={2} style={{ paddingTop: '20px' }}>
            {posts?.map((item, index) => {
                return (
                    <Grid item key={index} style={{ paddingTop: '2px' }}>
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
                        <Skeleton sx={{ bgcolor: 'grey.900' }} variant="rectangular" height={118} />
                        <Skeleton sx={{ bgcolor: 'grey.900' }} variant="text" />
                        <Skeleton sx={{ bgcolor: 'grey.900' }} variant="text" />
                    </Box>
                </Grid>
            )}

        </Grid>
    )
};

export default PostList;