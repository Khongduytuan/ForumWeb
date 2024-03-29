import React from "react";
// import Share from "../icons/Share";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { duration } from "moment";
import { UseDispatch, useDispatch } from "react-redux";
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { addPost } from "../../redux/actions";

const Askquestion = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const naviate = useNavigate();
  console.log(user.uID);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentTime = new Date();
    const formattedTime = format(currentTime, 'dd-MM-yy HH:mm');
    console.log(typeof formattedTime);
    
    const { title, content, tags } = e.target;
    const question = {
      dateAndTime: formattedTime,
      title: title.value,
      content: content.value,
      tag: tags.value,
      uid: user.uID.toString(),
      author: user.name
    };
    // dispatch(addPost(question));

    console.log(question);

    const res = await axios.post(
      "/posts/create",
      question
    );
    console.log(res.status);
    
    if (res.status === 201) {
      toast.success("Question added successfully", (duration = 2000));
      setTimeout(() => {
        naviate("/");
      }, 2000);
    }
  };

  return (
    <div className="h-full md:w-[50%]">
      <Toaster />
      <div
        className="md:mx-12 flex flex-col items-center 
      gap-4 mb-12 border p-4 pb-6 rounded-md bg-purple-300 
      dark:bg-[#1E212A]  mt-12"
      >
        <h1
          className="text-2xl font-bold text-center
        text-purple-600 
        "
        >
          Ask a Question
        </h1>

        <form onSubmit={handleSubmit} className="form w-full ">
          <div className="title">
            <label className="text-gray-800 text-start dark:text-white">
              Question Title
            </label>
            <input
              name="title"
              className="mt-2 w-full h-10 px-3 rounded outline-none border-none
                shadow-sm"
              type="text"
            />
          </div>
          <div className="desc mt-3">
            <label className="text-gray-800 text-start dark:text-white">
              Question Description
            </label>
            <textarea
              name="content"
              className="mt-2 w-full h-24 px-3 py-2 rounded outline-none border-none  shadow-sm"
              type="text"
            />
          </div>
          <div className="tages mt-3">
            <label className="text-gray-800 text-start dark:text-white">
              Related Tags
            </label>
            <input
              name="tags"
              placeholder="Enter tags seperated by comma"
              className="mt-2 w-full h-10 px-3 rounded outline-none border-none  shadow-sm"
              type="text"
            />
          </div>
          <button
            type="submit"
            className="mt-8 w-[230px] mx-auto flex items-center gap-2 bg-purple-700 rounded-md shadow-sm px-8 py-2 cursor-pointer"
          >
            {/* <Share /> */}
            <span className="text-white">Ask on Community</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Askquestion;