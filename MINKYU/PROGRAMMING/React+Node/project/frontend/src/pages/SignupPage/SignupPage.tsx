// RegisterPage.tsx
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import signupStore from '../../stores/signupStore.ts';
import './css/Signup.css';

function SignupPage() {
  const {
    email,
    setEmail,
    isEmailValid,
    isEmailCheck,
    setIsEmailCheck,
    name,
    setName,
    isNameValid,
    isNameCheck,
    setIsNameCheck,
    password,
    setPassword,
    isPasswordValid,
    password2,
    setPassword2,
    isPassword2Valid,
  } = signupStore();
  const navigate = useNavigate();

  const onEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const onNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  };

  const onPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const onPassword2Handler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword2(event.currentTarget.value);
  };

  const onCheckEmailHandler = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (!isEmailValid) {
      alert('이메일 양식을 확인하세요.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/email-check',
        { email }
      );
      console.log(response.status, response.data);
      if (response.data.success) {
        setIsEmailCheck(true);
        alert('이메일 사용 가능');
      } else {
        setIsEmailCheck(false);
        alert('이메일 중복 발생');
      }
    } catch (error) {
      console.error(error);
      alert('이메일 중복 체크 중 오류 발생');
    }
  };

  const onCheckNameHandler = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (!isNameValid) {
      alert('닉네임 양식을 확인하세요.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/name-check',
        { name }
      );
      console.log(response.status, response.data);
      if (response.data.success) {
        setIsNameCheck(true);
        alert('닉네임 사용 가능');
      } else {
        setIsNameCheck(false);
        alert('닉네임 중복 발생');
      }
    } catch (error) {
      console.error(error);
      alert('닉네임 중복 체크 중 오류 발생');
    }
  };

  const onSubmitHandler = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (
      !isEmailCheck ||
      !isNameCheck ||
      !isPasswordValid ||
      !isPassword2Valid
    ) {
      alert('모든 필드를 확인해 주세요.');
      return;
    }

    const body = { email, name, password, password2 };

    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/signup',
        body
      );
      console.log(response.status, response.data);
      if (response.status === 201) {
        alert('회원가입 성공!');
        navigate('/login');
      } else {
        alert('회원가입 실패: 입력을 확인해 주세요.');
      }
    } catch (error) {
      console.error(error);
      alert('회원가입 실패: 서버 오류');
    }
  };

  return (
    <div className="register-container">
      <form className="form" action="">
        <label htmlFor="">Email</label>
        <div>
          <input type="email" value={email} onChange={onEmailHandler} />
          <button onClick={onCheckEmailHandler}>이메일중복체크</button>
          {!isEmailValid && (
            <p className="error-message">유효하지 않은 이메일 형식입니다.</p>
          )}
        </div>

        <label htmlFor="">Name</label>
        <div>
          <input type="text" value={name} onChange={onNameHandler} />
          <button onClick={onCheckNameHandler}>닉네임중복체크</button>
          {!isNameValid && (
            <p className="error-message">유효하지 않은 닉네임 형식입니다.</p>
          )}
        </div>

        <label htmlFor="">Password</label>
        <input type="password" value={password} onChange={onPasswordHandler} />
        {!isPasswordValid && (
          <p className="error-message">
            특수문자 1개 이상 포함, 8자 ~ 20자 사이
          </p>
        )}

        <label htmlFor="">Password Check</label>
        <input
          type="password"
          value={password2}
          onChange={onPassword2Handler}
        />
        {!isPassword2Valid && (
          <p className="error-message">
            유효하지 않은 비밀번호 확인 형식입니다.
          </p>
        )}
        <br />
        <button onClick={onSubmitHandler}>Register</button>
      </form>
    </div>
  );
}

export default SignupPage;
