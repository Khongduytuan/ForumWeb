import { Outlet } from "react-router-dom";
import React from "react";
import TopBar from "./topBar/TopBar";
import Sidebar from "./SlideBar/SlideBar";
import CreateButton from "./createButton/CreateButton";

const Layout = () =>{
    return(
        <div
            className="relative w-screen flex flex-col justify-center items-center 
          overflow-x-hidden bg-white dark:bg-[#32353F]"
          >
            <TopBar />
            <div
              className="w-full h-screen flex justify-center items-start px-4 
            md:px-12 pt-12 dark:bg-[#32353F]"
            >
              <Sidebar />
              <Outlet />
              <div
                className="right-section
              hidden md:block
              h-80 fixed z-10 top-24 right-28"
              >
                <CreateButton />
              </div>
            </div>
          </div>
      )
}

export default Layout