// RegisterPage.tsx
// react
import React, { useState } from 'react';
// libraries
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// css
import './css/Signup.css';

function SignupPage() {
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
  // 중복 여부
  const [isEmailExisted, setIsEmailExisted] = useState(true);
  const [isNameExisted, setIsNameExisted] = useState(true);

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
  };

  const onNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setName(value);
  };

  const onLastNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setLastName(value);
  };

  const onPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setPassword(value);
  };

  const onPassword2Handler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setPassword2(value);
  };

  // 이메일중복체크
  const onCheckEmailHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
    email: string
  ) => {
    event.preventDefault();
    axios
      .get('http://localhost:5000/api/users/email-check', {
        params: { email },
      })
      .then((response) => {
        // 중복 발생 O
        if (!response.data.success) {
          console.log(response, '중복 발생');
          setIsEmailExisted(true);
          // 중복 발생 X
        } else {
          setIsEmailExisted(false);
          console.log(response, '사용 가능');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // 이메일중복체크
  const onCheckNameHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
    name: string
  ) => {
    event.preventDefault();
    axios
      .get('http://localhost:5000/api/users/name-check', {
        params: { name },
      })
      .then((response) => {
        // 중복 발생 O
        if (!response.data.success) {
          setIsNameExisted(true);
          console.log(response, '중복 발생');
          // 중복 발생 X
        } else {
          setIsNameExisted(false);
          console.log(response, '사용 가능');
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
        sessionStorage.setItem('token', response.data.token);
        console.log('토큰값 : ', response.data.token);
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
      email: email,
      name: name,
      lastname: lastName,
      password: password,
      password2: password2,
    };

    axios
      .post('http://localhost:5000/api/users/signup', body)
      .then((response) => {
        const status = response.status;
        console.log(status);
        if (status === 201) {
          alert('회원가입 성공!');
          onLoginHandler();
        } else if (status === 400) {
          alert('회원가입 실패 : 입력 똑바로 해줘');
        } else if (status == 500) {
          alert('회원가입 실패 : 서버 에러');
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
        <div>
          <input type="email" value={email} onChange={onEmailHandler} />
          <button onClick={(event) => onCheckEmailHandler(event, email)}>
            이메일중복체크
          </button>
        </div>
        {emailError && <div className="error-message">{emailError}</div>}

        <label htmlFor="">Name</label>
        <div>
          <input type="text" value={name} onChange={onNameHandler} />
          <button onClick={(event) => onCheckNameHandler(event, name)}>
            닉네임중복체크
          </button>
        </div>
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

export default SignupPage;
