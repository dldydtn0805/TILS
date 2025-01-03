// Navbar.tsx
import React from 'react';
import { useState, useEffect } from 'react';

// libraries
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Navbar() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <div>
      <div>
        {isLogin ? (
          <div>
            <button>로그아웃</button>
          </div>
        ) : (
          <div>
            <button onClick={() => navigate('/login')}>로그인</button>
            <button onClick={() => navigate('/signup')}>회원가입</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
