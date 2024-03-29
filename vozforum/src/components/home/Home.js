import React from "react";
import TopBar from "../topBar/TopBar";
import Sidebar from "../SlideBar/SlideBar";
import Explore from "../explore/Explore";


function Home(){
    // Lấy đối tượng người dùng từ localStorage
    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString);
    console.log("user => ", user.username);

    return(
        <div>
            <TopBar />
            <Sidebar />
            <Explore />
        </div>
    )
}

export default Home