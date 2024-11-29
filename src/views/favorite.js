import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../Redux/titleSlice";

const Favorite = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle("Yêu thích"));
    }, []);
    return (
        <div style={{ margin: 0 }}>
            Trang yêu thích
        </div>
    )
}

export default Favorite