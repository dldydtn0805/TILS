// src/components/layout/Layout.styles.ts
import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 뷰포트 전체 높이를 차지하도록 설정 */
  background-color: ${({ theme }) => theme.colors.light};
`;

export const MainContent = styled.main`
  flex-grow: 1; /* 남은 공간을 모두 차지하도록 설정 */
  padding: ${({ theme }) => theme.spacing.lg} 0; /* 상하 여백 */
  width: 100%;
  max-width: 1200px; /* 최대 너비 설정 (옵션) */
  margin: 0 auto; /* 가운데 정렬 */
  padding-left: ${({ theme }) => theme.spacing.xl}; /* 좌우 패딩 추가 */
  padding-right: ${({ theme }) => theme.spacing.xl};

  ${({ theme }) => theme.breakpoints.lg} {
    padding-left: ${({ theme }) => theme.spacing.lg};
    padding-right: ${({ theme }) => theme.spacing.lg};
  }

  ${({ theme }) => theme.breakpoints.md} {
    padding-left: ${({ theme }) => theme.spacing.md};
    padding-right: ${({ theme }) => theme.spacing.md};
  }

  ${({ theme }) => theme.breakpoints.sm} {
    padding-left: ${({ theme }) => theme.spacing.sm};
    padding-right: ${({ theme }) => theme.spacing.sm};
  }
`;
