import React from "react";
import SyncLoader from "react-spinners/SyncLoader";
import UserInfo from "../userInfor/UserInfor";
import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useEffect } from "react";
import Arrowdown from "../../icons/Arrowdown";
import Arrowup from "../../icons/Arrowup";



const Myanswers = () => {
    const [openId, setOpenId] = useState([]);
    // State sửa thông tin bài viết
    const [editPost, setEditPost] = useState(null); // State để lưu thông tin bài post đang được sửa
    const [editedTitle, setEditedTitle] = useState(""); // State để lưu title được sửa
    const [editedContent, setEditedContent] = useState(""); // State để lưu content được sửa

    const id = JSON.parse(localStorage.getItem("user")).uID;
    console.log("id In Myanswers =>", id);
    const { isLoading, data, refetch } = useQuery("getMyQuestions", () =>
        axios.get(`/posts/post/${id}`).then((res) => res.data)
    );

    console.log("data In Myanswer=>", data);

    // Lấy ra số like
  const fetchLikesCount = async (pID) => {
    try {
      const response = await axios.get(`/likes/count/${pID}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching likes count: ', error);
      throw error;
    }
  };
  // Lấy ra số dislike
  const fetchDislikesCount = async (pID) => {
    try {
        // /countDislike/{pID}
      const response = await axios.get(`/dislikes/countDislike/${pID}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching dislikes count: ', error);
      throw error;
    }
  };

  // Sử dụng hook để lấy số lượng like cho mỗi bài viết
  const [likesCounts, setLikesCounts] = useState({});
  useEffect(() => {
    if (!data || data.length === 0) return;

    const fetchLikesCounts = async () => {
      const counts = {};
      for (const question of data) {
        const count = await fetchLikesCount(question.pID);
        counts[question.pID] = count;
      }
      setLikesCounts(counts);
    };

    fetchLikesCounts();
  }, [data]);


  // Sử dụng Hook để lấy số lượng dislike
  const [dislikesCounts, setDislikesCounts] = useState({});
  useEffect(() => {
    if (!data || data.length === 0) return;

    const fetchDislikesCounts = async () => {
      const counts = {};
      for (const question of data) {
        const count = await fetchDislikesCount(question.pID);
        counts[question.pID] = count;
      }
      setDislikesCounts(counts);
    };

    fetchDislikesCounts();
  }, [data]);


  const updateCounts = async () => {
    try {
      // Fetch dữ liệu mới
      await refetch();

      // Cập nhật lại state của likesCounts và dislikesCounts
      const newLikesCounts = {};
      const newDislikesCounts = {};
      for (const question of data) {
        const likeCount = await fetchLikesCount(question.pID);
        const dislikeCount = await fetchDislikesCount(question.pID);
        newLikesCounts[question.pID] = likeCount;
        newDislikesCounts[question.pID] = dislikeCount;
      }
      setLikesCounts(newLikesCounts);
      setDislikesCounts(newDislikesCounts);
    } catch (error) {
      console.error(error);
    }
  };


  const handleEdit = (question) => {
    setEditPost(question); // Lưu thông tin bài post đang được sửa vào state
    setEditedTitle(question.title); // Set title của bài post vào state
    setEditedContent(question.content); // Set content của bài post vào state
  };

  const handleSubmitEdit = async () => {
    try {
      // Gọi API để cập nhật thông tin bài post đã sửa
      await axios.put(`/posts//updatepost/${editPost.pID}`, {
        title: editedTitle,
        content: editedContent,
      });

      // Sau khi cập nhật thành công, refetch data
      await refetch();
      // Đặt lại editPost về null để kết thúc chế độ sửa
      setEditPost(null);
    } catch (error) {
      console.error(error);
    }
  };
      
    if (isLoading)
      return (
        <div className="h-screen mt-[10%] w-[100%] text-center">
          <SyncLoader size={10} color="#7E22CE" />
        </div>
      );
    return (
      <div
        className="h-full w-full md:w-[60%] flex flex-col items-center 
      gap-8 "
      >
        {data.length > 0 &&
          data.map((question, index) => (
            <div
              key={index}
              className="w-full my-8 md:w-[80%] md:mx-12 flex flex-col items-end border 
            
            p-2
            md:p-4 rounded-md bg-purple-100"
            >
              <div className="w-full bg-white p-4 md:p-5 rounded-lg shadow-md flex items-start gap-5">
                <div className="left-section space-y-1 text-center">
                <Arrowup id={question.pID} updateCounts={updateCounts} />
                  <h3 className="text-sm md:text-base">
                    {likesCounts[question.pID] || 0}
                  </h3>
                  <Arrowdown id={question.pID} updateCounts={updateCounts}/>
                  <h3 className="text-sm md:text-base">
                    {dislikesCounts[question.pID] || 0}
                  </h3>
                </div>
                <div className="right-section w-full">
                  <h1 className="text-base md:text-lg">{question?.title}</h1>
                  <p className="text-sm md:text-base">{question?.content}</p>
                  <hr />
                  <UserInfo
                    openId={openId}
                    index={index + 1}
                    setOpenId={setOpenId}
                    question={question}
                  />
                </div>
              </div>
              
              {editPost && editPost.pID === question.pID ? ( // Kiểm tra nếu bài post đang được sửa
              <div>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
                <button onClick={handleSubmitEdit}>Submit</button>
              </div>
            ) : (
              <button onClick={() => handleEdit(question)}>Edit</button>
            )}
            </div>
          ))}
        {data.length === 0 && <NothingHere />}
      </div>
    );
  };
  
  export default Myanswers;