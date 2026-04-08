// src/components/common/Footer/Footer.styles.ts
import styled from 'styled-components';

export const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;
  margin-top: auto; /* 푸터를 하단에 고정 */

  ${({ theme }) => theme.breakpoints.sm} {
    padding: ${({ theme }) => theme.spacing.sm};
    font-size: 0.9rem;
  }
`;

export const Text = styled.p`
  margin: ${({ theme }) => theme.spacing.xxs} 0; /* 작은 마진 적용 */
  font-size: 0.9rem;

  ${({ theme }) => theme.breakpoints.sm} {
    font-size: 0.8rem;
  }
`;
