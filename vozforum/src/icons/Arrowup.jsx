import axios from "axios";
import React from "react";

const Arrowup = ({ id, updateCounts }) => {
  const userId = JSON.parse(localStorage.getItem("user")).uID;

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // Kiểm tra xem đã downvote hay chưa
      const response = await axios.get(`/likes/likeexist/${id}/${userId}`);
      const isAlreadyLike = response.data;

      if (isAlreadyLike) {
        // Nếu đã like, gọi API để xóa đối tượng like trước đó
        await axios.delete(`/likes/deletelike/${id}/${userId}`);
        alert("Downvote removed successfully");
      } else {
        const like = {
          pID: id,
          uID: userId
        };
        // Nếu chưa like, thực hiện like
        const res = await axios.post(`/likes/like`, like);
        if (res.status === 200) {
          alert("Downvoted successfully");
        } else {
          alert("Failed to downvote");
        }
      }
      updateCounts();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
    // try {
    //   const res = await axios.post(
    //     `https://discussion-forum-production.up.railway.app/upvote/${id}`,
    //     {
    //       userId,
    //     }
    //   );
    //   console.log(res.status);
    //   if (res.status === 200) {
    //     alert("Upvoted successfully");
    //   } else {
    //     alert("You have already upvoted");
    //   }
    // } catch (err) {
    //   console.log(err);
    //   alert("You have already upvoted");
    // }
  };

  return (
    <svg
      onClick={handleClick}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4 md:w-5 md:h-5 cursor-pointer dark:text-white"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
      />
    </svg>
  );
};

export default Arrowup;
