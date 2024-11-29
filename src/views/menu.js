import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../Redux/titleSlice";
const Menu = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle("Cài đặt"));
    }, []);

    return (
        <div style={{ margin: 0 }}>
            Trang cài đặt
        </div>
    )
}

export default Menu