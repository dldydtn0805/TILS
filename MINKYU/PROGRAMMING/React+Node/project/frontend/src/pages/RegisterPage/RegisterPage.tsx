// RegisterPage.tsx
// react
import React, { useState } from 'react';
// libraries
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// css
import './css/Register.css';

function RegisterPage() {
  // 입력 값
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  // 입력 에러 내용
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [password2Error, setPassword2Error] = useState('');

  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 간단한 이메일 정규 표현식
    return emailRegex.test(email);
  };

  const validateName = (name: string) => {
    return name.trim().length > 0; // 이름이 비어있지 않은지 확인
  };

  const validatePassword = (password: string) => {
    return password.length >= 6; // 비밀번호가 6자 이상인지 확인
  };

  const onEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setEmail(value);
    setEmailError(validateEmail(value) ? '' : '유효한 이메일을 입력하세요.');
  };

  const onNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setName(value);
    setNameError(validateName(value) ? '' : '이름을 입력하세요.');
  };

  const onLastNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setLastName(value);
    // LastName 유효성 검사 추가 가능
  };

  const onPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setPassword(value);
    setPasswordError(
      validatePassword(value) ? '' : '비밀번호는 6자 이상이어야 합니다.'
    );
  };

  const onPassword2Handler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setPassword2(value);
    setPassword2Error(
      value === password ? '' : '비밀번호가 일치하지 않습니다.'
    );
  };
  // 로그인
  const onLoginHandler = () => {
    const body = {
      email: email,
      password: password,
    };
    axios
      .post('http://localhost:5000/api/users/login', body)
      .then((response) => {
        // console.log('로그인 Response : ', response);
        const previousUrl = sessionStorage.getItem('previousUrl') || '/';
        // console.log(previousUrl);
        navigate(previousUrl);
      })
      .catch((error) => {
        console.log(error);
        // alert('로그인 실패!');
      });
  };
  const onSubmitHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const body = {
      email,
      name,
      lastname: lastName,
      password,
    };

    axios
      .post('http://localhost:5000/api/users/register', body)
      .then((response) => {
        // 회원가입 성공
        if (response.status === 201) {
          // 해당 계정을 통해 로그인
          onLoginHandler();
        }
      })
      .catch((error) => {
        console.log(error);
        alert('회원가입 실패!');
      });
  };

  return (
    <div className="register-container">
      <form className="form" action="">
        <label htmlFor="">Email</label>
        <input type="email" value={email} onChange={onEmailHandler} />
        {emailError && <div className="error-message">{emailError}</div>}

        <label htmlFor="">Name</label>
        <input type="text" value={name} onChange={onNameHandler} />
        {nameError && <span className="error-message">{nameError}</span>}

        <label htmlFor="">LastName</label>
        <input type="text" value={lastName} onChange={onLastNameHandler} />

        <label htmlFor="">Password</label>
        <input type="password" value={password} onChange={onPasswordHandler} />
        {passwordError && (
          <span className="error-message">{passwordError}</span>
        )}

        <label htmlFor="">Password Check</label>
        <input
          type="password"
          value={password2}
          onChange={onPassword2Handler}
        />
        {password2Error && (
          <span className="error-message">{password2Error}</span>
        )}

        <br />
        <button onClick={onSubmitHandler}>Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
