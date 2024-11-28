import React from "react";
import { useEffect } from "react";
const Favorite = () => {
    useEffect(() => {
        document.title = `Yêu thích`;
    });
    return(
        <div style={{margin: 0}}>
            Trang yêu thích
        </div>
    )
}

export default Favorite