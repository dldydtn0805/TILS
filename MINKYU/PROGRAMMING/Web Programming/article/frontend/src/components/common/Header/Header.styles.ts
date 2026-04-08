// src/components/common/Header/Header.styles.ts
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;

  ${({ theme }) => theme.breakpoints.md} {
    padding: ${({ theme }) => theme.spacing.sm}
      ${({ theme }) => theme.spacing.lg};
  }

  ${({ theme }) => theme.breakpoints.sm} {
    flex-direction: column;
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

export const Logo = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  cursor: pointer;
  margin: 0;

  ${({ theme }) => theme.breakpoints.sm} {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  /* Nav의 높이를 명시적으로 설정하여 NavLinkStyled의 height: 100%가 적용되도록 합니다.
     이전 HeaderContainer의 align-items: center 덕분에 Nav도 수직 중앙에 있을 것입니다. */
  height: 100%; /* HeaderContainer에 의해 결정되는 높이 */

  ${({ theme }) => theme.breakpoints.md} {
    gap: ${({ theme }) => theme.spacing.md};
  }

  ${({ theme }) => theme.breakpoints.sm} {
    flex-wrap: wrap;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const NavLinkStyled = styled(Link)`
  color: ${({ theme }) => theme.colors.white};
  font-size: 1rem;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) =>
  theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: background-color 0.2s ease-in-out;

  /* 수정된 부분: display 속성 변경 및 line-height 활용 */
  **display: inline-block;** /* 또는 block */
  **height: 100%; /* Nav의 높이를 채우도록 */**
  **line-height: calc(100% - (${({ theme }) =>
    theme.spacing
      .xs} * 2)); /* height에서 상하 패딩을 뺀 높이와 line-height를 동일하게 */**
  **box-sizing: border-box; /* 패딩이 포함된 높이 계산을 위해 */**
  **text-align: center; /* 텍스트 가로 중앙 정렬 */**
  **vertical-align: middle; /* 텍스트 세로 정렬의 fallback */**

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  ${({ theme }) => theme.breakpoints.sm} {
    font-size: 0.9rem;
    padding: ${({ theme }) => theme.spacing.xxs} ${({ theme }) =>
  theme.spacing.xs};
    /* 작은 화면에서의 line-height도 다시 계산 */
    **line-height: calc(100% - (${({ theme }) => theme.spacing.xxs} * 2));**
  }
`;

export const AuthButton = styled.button`
  color: ${({ theme }) => theme.colors.white};
  font-size: 1rem;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) =>
  theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.secondary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  /* AuthButton도 NavLinkStyled와 유사하게 변경 */
  **display: inline-block;**
  **height: 100%;**
  **line-height: calc(100% - (${({ theme }) => theme.spacing.xs} * 2));**
  **box-sizing: border-box;**
  **text-align: center;**
  **vertical-align: middle;**

  &:hover {
    background-color: ${({ theme }) => theme.colors.danger};
  }

  ${({ theme }) => theme.breakpoints.sm} {
    font-size: 0.9rem;
    padding: ${({ theme }) => theme.spacing.xxs} ${({ theme }) =>
  theme.spacing.xs};
    **line-height: calc(100% - (${({ theme }) => theme.spacing.xxs} * 2));**
  }
`;
