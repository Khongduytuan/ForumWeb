import React from "react";
import moment from "moment";

const UserInfo = ({ openId, index, setOpenId, question, answer }) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  console.log("question trong UserInfor: ", question);
  console.log("question dateAndTime: ", question.dateAndTime);
  return (
    <div className="w-full  flex items-cente justify-between">
      <div className="w-[48%] md:max-w-screen-md posted-by flex items-center gap-2 md:gap-3">
        <h2 className="text-gray-300 text-xs">
          {answer ? "answered by\n" : "posted by "}{" "}
          <span className="text-purple-800 font-bold  md:text-sm">
            {question
              ? question?.author === currentUser?.name
                ? question?.author + " (You)"
                : question?.author
              : answer
              ? answer?.author?.name === currentUser?.name
                ? answer?.author?.name + " (You)"
                : answer?.author?.name
              : ""}
          </span>
        </h2>
      </div>
      <div className="posted-on mx-auto">
        <h2 className="text-gray-300 text-xs">
          {question.dataAndTime
            ? question.dataAndTime: question.tag}
        </h2>
      </div>
      {/* {openId && (
        <div
          className="comment flex gap-2 ml-auto cursor-pointer"
          onClick={() => {
            if (!openId.find((ele) => ele === index)) {
              console.log("hello");
              setOpenId([...openId, index]);
            }
            if (openId.find((ele) => ele === index)) {
              setOpenId(openId.filter((ele) => ele !== index));
            }
          }}
        >
          <Comment />
          <span className="text-gray-300 text-xs">
            {question?.replies?.length || "No replies"}
          </span>
        </div>
      )} */}
    </div>
  );
};

export default UserInfo;
