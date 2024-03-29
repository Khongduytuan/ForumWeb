import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import NothingHere from "../nothingHere/NothingHere";
import { useParams } from "react-router-dom";
import Loading from "../loading/Loading";
import { useQuery } from "react-query";
import UserInfo from "../userInfor/UserInfor";
import Arrowdown from "../../icons/Arrowdown";
import Arrowup from "../../icons/Arrowup";
import { useNavigate } from "react-router-dom";





function Content(){
    // const { tag } = useParams();
    // const [openId, setOpenId] = useState([]);
    // const [answer, setAnswer] = React.useState("");
    // // const [data, setPostDatas] = useState([]);
    // // console.log("data ban dau: ",data);

    // const fetchData = async (url) => {
    //     try {
    //       const response = await axios.get(url);
    //       console.log("reponse.data trong ham: ",response.data);
    //       return response.data;
    //     } catch (error) {
    //       console.error('Error fetching data: ', error);
    //       throw error;
    //     }
    //   };
    //   // Hafm lấy số like của bài viết
    //   const fetchLikesCount = async (pID) => {
    //     try {
    //       const response = await axios.get(`/likes/count/${pID}`);
    //       return response.data;
    //     } catch (error) {
    //       console.error('Error fetching likes count: ', error);
    //       throw error;
    //     }
    //   };
      
    //   // Sử dụng useQuery
    //   const { isLoading, data } = useQuery("getAllQuestions", async () => {
    //     let url = "/posts/post"; // URL mặc định
      
    //     // Nếu tồn tại biến tag, sử dụng API "/posts/tag/${tag}"
    //     if (tag) {
    //       url = `/posts/tag/${tag}`;
          
    //     }
      
    //     // Gọi fetchData với URL tương ứng
    //     return fetchData(url);
    //   });

      
    //   console.log("data: ", data);

      
    //   // Nếu isLoading là true, hiển thị component Loading
    //   if (isLoading) return <Loading />;


    //   // Sử dụng hook để lấy số lượng like cho mỗi bài viết
    //   const [likesCounts, setLikesCounts] = useState({});
    //   useEffect(() => {
    //     if (!data || data.length === 0) return;
    
    //     const fetchLikesCounts = async () => {
    //       const counts = {};
    //       for (const question of data) {
    //         const count = await fetchLikesCount(question.pID);
    //         counts[question.pID] = count;
    //       }
    //       setLikesCounts(counts);
    //     };
    
    //     fetchLikesCounts();
    //   }, [data]);




  const { tag } = useParams();
  const [openId, setOpenId] = useState([]);
  const [answer, setAnswer] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.uID) {
      navigate('/login');
    }
  }, [navigate]);

  const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      console.log("reponse.data trong ham: ",response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching data: ', error);
      throw error;
    }
  };
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
  
  const { isLoading, data } = useQuery("getAllQuestions", async () => {
    let url = "/posts/post"; // URL mặc định
  
    // Nếu tồn tại biến tag, sử dụng API "/posts/tag/${tag}"
    if (tag) {
      url = `/posts/tag/${tag}`;
    }
  
    // Gọi fetchData với URL tương ứng
    return fetchData(url);
  });

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

  if (isLoading) return <Loading />;
      

  const updateCounts = async () => {
    try {
      // Fetch dữ liệu mới
      const newData = await fetchData("/posts/post"); // Thay url bằng đúng url của API

      // Cập nhật lại state của likesCounts và dislikesCounts
      const newLikesCounts = {};
      const newDislikesCounts = {};
      for (const question of newData) {
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




    return(
        <div
      className="md:w-[60%] flex flex-col items-center gap-y-5 
    md:gap-8 my-8 "
    >
      <Toaster />
      {data.length > 0 &&
        data.map((question, index) => {
          console.log("question", question);
          return (
            <div
              key={index}
              className="w-[96%] md:w-[80%] mx-12 flex flex-col 
              items-end  p-3 md:p-4 rounded-md bg-purple-100
               dark:bg-slate-400"
            >
              <div
                className="w-full bg-white dark:bg-[#1E212A]
              
              p-4 md:p-5 rounded-lg shadow-md flex items-start gap-5"
              >
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
                  <h1 className="text-base md:text-lg dark:text-white">
                    {question?.title}
                  </h1>
                  <p className="text-sm md:text-base">
                    {question?.content}
                  </p>
                  <hr />
                  <UserInfo
                    openId={openId}
                    index={index + 1}
                    setOpenId={setOpenId}
                    question={question}
                  />
                </div>
              </div>
            </div>
          );
        })}
      {data.length === 0 && <NothingHere />}
    </div>
    )
    
    
}

export default Content;