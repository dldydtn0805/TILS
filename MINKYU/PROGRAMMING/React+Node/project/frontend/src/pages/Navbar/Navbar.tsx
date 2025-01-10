// Navbar.tsx
import React from 'react';
import { useState, useEffect } from 'react';
import userStore from '../../stores/userStore.ts';
// libraries
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// css
import './css/Navbar.css';
function Navbar() {
  const { user, setUser, isLogin, setIsLogin } = userStore();
  const navigate = useNavigate();

  const onLogoutHandler = async () => {
    localStorage.removeItem('token');
    setUser({});
    setIsLogin(false);
    alert('로그아웃이 완료되었습니다.');
    navigate('/');
    // try {
    //   const token = localStorage.getItem('token');
    //   const response = await axios.post(
    //     'http://localhost:5000/api/users/logout',
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );
    //   console.log(response);
    //   localStorage.removeItem('token');
    //   setIsLogin(false);
    //   setUser({});
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div className="navbar">
      <div className="logo">APP</div>
      <div className="nav-links">
        {isLogin ? (
          <>
            <span>{user?.name}님, 환영합니다!</span>
            <button onClick={() => onLogoutHandler()}>로그아웃</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')}>로그인</button>
            <button onClick={() => navigate('/signup')}>회원가입</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
