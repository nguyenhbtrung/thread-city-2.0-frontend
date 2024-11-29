import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setId, setTitle } from "../Redux/titleSlice";

const Favorite = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle("Yêu thích"));
        dispatch(setId(3));
    }, []);
    return (
        <div style={{ margin: 0 }}>
            Trang yêu thích
        </div>
    )
}

export default Favorite