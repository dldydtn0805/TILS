// src/pages/Home/HomePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth'; // 인증 훅 임포트
import {
  HomePageContainer,
  WelcomeMessage,
  AuthStatus,
  ActionButton,
} from './HomePage.styles'; // 스타일 임포트

const HomePage: React.FC = () => {
  const { isAuthenticated, user, logout, isLoading } = useAuth(); // useAuth 훅 사용
  const navigate = useNavigate(); // 라우팅을 위한 useNavigate 훅

  const handleAuthAction = async () => {
    if (isAuthenticated) {
      await logout(); // 로그아웃
      alert('로그아웃되었습니다.'); // 알림
    } else {
      navigate('/login'); // 로그인 페이지로 이동
    }
  };

  // 인증 상태 로딩 중일 때
  if (isLoading) {
    return (
      <HomePageContainer>
        <WelcomeMessage>인증 정보 로딩 중...</WelcomeMessage>
      </HomePageContainer>
    );
  }

  return (
    <HomePageContainer>
      <WelcomeMessage>환영합니다!</WelcomeMessage>
      {isAuthenticated ? (
        <>
          <AuthStatus>
            안녕하세요, <strong>{user?.username || '게스트'}</strong>님!
          </AuthStatus>
          <ActionButton onClick={handleAuthAction}>로그아웃</ActionButton>
        </>
      ) : (
        <>
          <AuthStatus>로그인되어 있지 않습니다.</AuthStatus>
          <ActionButton onClick={handleAuthAction}>로그인</ActionButton>
        </>
      )}
    </HomePageContainer>
  );
};

export default HomePage;
