// LoginPage.tsx
import React from 'react';
// Hooks
import { useState } from 'react';
// stores
import userStore from '../../stores/userStore.ts';

// css
import './css/Login.css';
// libraries
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLogin, setIsLogin, user, setUser } = userStore();
  const navigate = useNavigate();

  const onEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/login',
        { email, password }
      );
      localStorage.setItem('token', response.data.token);
      setIsLogin(true);
      setUser({
        email: response.data.user.email,
        name: response.data.user.name,
        role: response.data.user.role,
        _id: response.data.user._id,
      });
      navigate('/');
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };
  return (
    <div className="login-container">
      <form className="form" action="">
        <label htmlFor="">Email</label>
        <input type="email" value={email} onChange={onEmailHandler} />
        <label htmlFor="">Password</label>
        <input type="password" value={password} onChange={onPasswordHandler} />
        <br />
        <button onClick={onSubmitHandler}>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
