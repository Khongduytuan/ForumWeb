import axios from 'axios';
import './App.css';
// import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import RegisterPage from './components/Register/Register';
import Login from './login/login';

function App() {
  // const [posts, setPosts] = useState();
  // const getPosts = async () =>{
  //   try{
  //     const response = await axios.get("/api/v1/posts");
  //     // console.log(response.data);
  //     setPosts(response.data);

  //   } catch(err){
  //     console.log(err);
  //   }
    
  // }

  // useEffect(() => {
  //   getPosts();
  // },[])
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/register" element={<RegisterPage/>}></Route>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
        </Route>
        
      </Routes>
      
    </div>
  );
}

export default App;
