// App.tsx
import React from 'react';
import { useEffect } from 'react';
// libraries
import { Routes, Route } from 'react-router-dom'; // react-router-dom
import axios from 'axios';
// pages
import Navbar from './pages/Navbar/Navbar.tsx';
import LandingPage from './pages/LandingPage/LandingPage.tsx';
import BoardPage from './pages/BoardPage/BoardPage.tsx';
import ArticlePage from './pages/ArticlePage/ArticlePage.tsx';
import LoginPage from './pages/LoginPage/LoginPage.tsx';
import SignupPage from './pages/SignupPage/SignupPage.tsx';
import Footer from './pages/Footer/Footer.tsx';
// stores
import userStore from './stores/userStore.ts';
// css
import './App.css';

function App() {
  const { user, setUser, isLogin, setIsLogin } = userStore();
  // const getUserHandler = async () => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     try {
  //       const response = await axios.get(
  //         'http://localhost:5000/api/users/get/myinfo',
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       console.log('response : ', response);
  //       setIsLogin(true);
  //       setUser({
  //         email: response.data.email,
  //         name: response.data.name,
  //         role: response.data.role,
  //         userId: response.data._id,
  //       });
  //       console.log(isLogin, user);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   console.log('토큰 값 : ', token);
  //   if (token) {
  //     getUserHandler();
  //   }
  // }, []);
  return (
    <div className="App">
      {/* Navbar */}
      <Navbar />
      {/* Routing */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/board/:boardId" element={<BoardPage />}></Route>
          <Route
            path="/board/:boardId/article/:articleId"
            element={<ArticlePage />}
          ></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
        </Routes>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
