// LoginPage.tsx
import React from 'react';
// Hooks
import { useState } from 'react';

// css
import './css/Login.css';
// libraries
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // console.log(email);
    // console.log(password);
    const body = {
      email: email,
      password: password,
    };
    axios
      .post('http://localhost:5000/api/users/login', body)
      .then((response) => {
        // console.log('로그인 Response : ', response);
        const previousUrl = sessionStorage.getItem('previousUrl') || '/';
        console.log(previousUrl);
        navigate(previousUrl);
      })
      .catch((error) => {
        // console.log(error);
        alert('로그인 실패!');
      });
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
