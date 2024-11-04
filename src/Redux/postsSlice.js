import { createSlice } from "@reduxjs/toolkit";


const postsSlice = createSlice({
    name: "post",
    initialState: { newsfeed: [], newPost: null },
    reducers: {
        setNewsfeed: (state, action) => {
            state.newsfeed = action.payload;
            // console.log("set newsfeed:", state.newsfeed);
        },
        setNewPost: (state, action) => {
            state.newPost = action.payload;
        },
    },
});

export const { setNewsfeed, setNewPost } = postsSlice.actions;
export default postsSlice.reducer;