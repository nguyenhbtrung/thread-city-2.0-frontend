import { configureStore } from "@reduxjs/toolkit";
import postsReducer from './postsSlice';
import titleReducer from './titleSlice'

const store = configureStore({
    reducer: {
        post: postsReducer,
        title: titleReducer,
    },
});

export default store;