import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setId, setTitle } from "../Redux/titleSlice";
const Pin = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle("Lưu trữ"));
        dispatch(setId(5));
    }, []);
    return (
        <div style={{ margin: 0 }}>
            Trang lưu trữ
        </div>
    )
}

export default Pin