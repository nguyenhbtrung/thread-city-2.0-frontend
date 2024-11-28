import React from "react";
import { useEffect } from "react";
const Pin = () => {

    useEffect(() => {
        document.title = `Lưu trữ`;
    });
    return(
        <div style={{margin: 0}}>
            Trang lưu trữ
        </div>
    )
}

export default Pin