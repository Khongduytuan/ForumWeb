import React from "react";
import { useNavigate } from "react-router-dom";
import "./TopBar.css"
function TopBar(){
    const navigate = useNavigate()
    return (
        <div
          className="fixed bg-white dark:bg-[#1E212A]
         top-0 left-0 right-0 z-10 h-14  shadow-md  flex items-center justify-between
         px-4
         md:px-20"
        >
          <div className="text-sm md:text-base font-bold text-purple-500 cursor-pointer flex items-center gap-4">
            <div
              className="
              transition-transform   ease-linear
            duration-700 cursor-pointer
            "
            >
            </div>
           Forum
          </div>
          <div className="flex items-center gap-3">
            
    
            {/* // Logout */}
            {/* <Logout /> */}
            <div className="hidden md:flex items-center gap-5">
              <div
                className="cursor-pointer text-sm 
              md:text-base dark:text-white"
                onClick={() => {
                  localStorage.removeItem("user");
                  navigate("/login");
                }}
              >
                Logout
              </div>
              <img
                //onClick={() => navigate("/login")}
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFY677t7F_8Epm50xo5OfqI882l5OBOPKRDxDWeGo7OQ&s"
                }
                alt="profile"
                className="
              w-6 h-6
              md:w-7 md:h-7 rounded-full cursor-pointer"
              />
            </div>
          </div>
        </div>
      );

}
export default TopBar;