import axios from "axios";
import React from "react";

const Arrowdown = ({ id }) => {
  const userId = JSON.parse(localStorage.getItem("user")).uID;
  console.log("ArrowdownLog-> userID: ", userId);
  console.log("ArrowdownLog-> id: ", id);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // Kiểm tra xem đã downvote hay chưa
      const response = await axios.get(`/dislikes/dislikeexist/${id}/${userId}`);
      const isAlreadyDislike = response.data;
      console.log("ArrowdownLog-> isAlreadyDislike: ", isAlreadyDislike);

      if (isAlreadyDislike) {
        // Nếu đã dislike, gọi API để xóa đối tượng dislike trước đó
        await axios.delete(`/dislikes/deletedislike/${id}/${userId}`);
        alert("Downvote removed successfully");
      } else {
        const dislike = {
          pID: id,
          uID: userId
        };
        // Nếu chưa dislike, thực hiện dislike
        const res = await axios.post(`/dislikes/dislike`, dislike);
        if (res.status === 200) {
          alert("Downvoted successfully");
        } else {
          alert("Failed to downvote");
        }
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
    // try {
    //   const res = await axios.post(
    //     `/likes/likeexist/${id}/${userId}`
    //   );
    //   console.log(res.status);
    //   if (res.status === 200) {
    //     alert("downvoted successfully");
    //   } else {
    //     alert("You have already downvoted");
    //   }
    // } catch (err) {
    //   console.log(err);
    //   alert("You have already downvoted");
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
        d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
      />
    </svg>
  );
};

export default Arrowdown;
