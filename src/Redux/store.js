import { configureStore } from "@reduxjs/toolkit";
import postsReducer from './postsSlice';


const store = configureStore({
    reducer: {
        post: postsReducer,
    },
});

export default store;