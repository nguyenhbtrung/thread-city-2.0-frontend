import React from "react";
import { useEffect } from "react";
const Menu = () => {
    useEffect(() => {
        document.title = `Cài đặt`;
    });
    return(
        <div style={{margin: 0}}>
            Trang cài đặt
        </div>
    )
}

export default Menu