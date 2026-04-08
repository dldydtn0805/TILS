// src/components/common/Header/Header.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import {
  HeaderContainer,
  Logo,
  Nav,
  NavLinkStyled, // NavLinkStyled 그대로 사용
  AuthButton,
} from './Header.styles';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    alert('로그아웃되었습니다.');
    navigate('/');
  };

  return (
    <HeaderContainer>
      <Logo onClick={() => navigate('/')}>My App</Logo>
      <Nav>
        <NavLinkStyled to="/">홈</NavLinkStyled>
        <NavLinkStyled to="/board">게시판</NavLinkStyled>
        {isAuthenticated ? (
          <AuthButton onClick={handleLogout}>로그아웃</AuthButton>
        ) : (
          <NavLinkStyled to="/login">로그인</NavLinkStyled>
        )}
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
