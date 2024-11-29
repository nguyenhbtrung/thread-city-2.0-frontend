import { createSlice } from '@reduxjs/toolkit';

const titleSlice = createSlice({
    name: 'title',
    initialState: {
        title: '',
        id: 0,
    },
    reducers: {
        setTitle: (state, action) => {
            state.title = action.payload;
            document.title = action.payload;
        },
        setId: (state, action) => {
            state.id = action.payload;
        },
    },
});

export const { setTitle, setId } = titleSlice.actions;
export default titleSlice.reducer;
