import axios from 'axios';
import './App.css';
// import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import Layout from './components/Layout';
import { Routes, Route,Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/home/Home';
import RegisterPage from './components/Register/Register';
import Login from './components/login/login';
import Content from './components/Content/Content';
import Askquestion from './components/askQuestion/AskQuestion';
import { useQueryClient, QueryClient, QueryClientProvider } from 'react-query';
import Myanswers from './components/myanswers/MyAnswers';
import Explore from './components/explore/Explore';
import { useNavigate } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Content />,
      },
      {
        path: "/ask",
        element: <Askquestion />,
      },
      {
        path: "/myqna",
        element: <Myanswers />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/explore/:topic",
        element: <Content />,
      },
      // {
      //   path: "*",
      //   element: <Notfound />,
      // },
    ],
  },
  // {
  //   path: "*",
  //   element: <Notfound />,
  // },
]);

const queryClient = new QueryClient();

export default function App() {
  // const navigate = useNavigate();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   if (user && user.uID) {
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate('/');
  //   } else {
  //     navigate('/login');
  //   }
  // }, [isLoggedIn, navigate]);
  
  return (
    <QueryClientProvider client={queryClient}> {/* Bao bọc ứng dụng trong QueryClientProvider và cung cấp QueryClient */}
      <RouterProvider router={router} />
   </QueryClientProvider>
  )
  // return (
  //   <div>
  //     <RouterProvider router={router} />
  //   </div>
  // );
}
