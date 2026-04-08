// src/styles/theme.ts
import type { DefaultTheme } from 'styled-components';

// 앞으로 사용할 것들 정리
export const theme: DefaultTheme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    light: '#f8f9fa',
    dark: '#343a40',
    white: '#ffffff',
    black: '#000000',
    text: '#212529',
    muted: '#6c757d',
    border: '#dee2e6',
    naver: '#03C75A',
    kakao: '#FEE500',
    google: '#EA4335',
  },
  fonts: {
    main: 'Arial, sans-serif',
    code: 'monospace',
  },
  breakpoints: {
    xs: '0px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px',
  },
  spacing: {
    xxs: '0.125rem',
    xs: '0.25rem', // 4px
    sm: '0.5rem', // 8px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
  },
  borderRadius: '0.375rem', // 6px
};

export type ThemeType = typeof theme;
