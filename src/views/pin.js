import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../Redux/titleSlice";
const Pin = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle("Lưu trữ"));
    }, []);
    return (
        <div style={{ margin: 0 }}>
            Trang lưu trữ
        </div>
    )
}

export default Pin