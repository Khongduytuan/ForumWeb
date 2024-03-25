import React from "react";
import TopBar from "../topBar/TopBar";


function Home(){
    // Lấy đối tượng người dùng từ localStorage
    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString);
    console.log("user => ", user.username);

    return(
        <div>
            <TopBar />
        </div>
    )
}

export default Home