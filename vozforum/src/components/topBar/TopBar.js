import React from "react";
import { useNavigate } from "react-router-dom";
import "./TopBar.css"
function TopBar(){
    const navigate = useNavigate()
    return(
        <div className="topbar">
            <div className="topbar-name">
                <div className="class3"></div>
                H-Forum
            </div>

            <div className="class4">
                {/* <Logout /> */}
                <div className="class5">
                    <div
                        className="class6"
                        onClick={() => {
                        localStorage.removeItem("user");
                        navigate("/login");
                        }}
                    >
                        Logout
                    </div>
                    <img
                        //onClick={() => navigate("/login")}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFY677t7F_8Epm50xo5OfqI882l5OBOPKRDxDWeGo7OQ&s"
                        alt="profile"
                        className="class7"
                    />
                </div>
            </div>
        </div>
    )

}
export default TopBar;