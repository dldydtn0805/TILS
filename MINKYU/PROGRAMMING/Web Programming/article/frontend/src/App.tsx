// src/App.tsx
import React from 'react';
import { ThemeProvider } from 'styled-components'; // styled-components의 ThemeProvider
import { theme } from './styles/theme'; // 우리가 정의한 테마
import { GlobalStyle } from './styles/GlobalStyle'; // 전역 스타일
import AppRouter from './router/AppRouter'; // 라우터 설정 컴포넌트
import { AuthProvider } from './contexts/AuthContext'; // 인증 Context Provider

const App: React.FC = () => {
  return (
    // 1. AuthProvider: 인증 상태를 애플리케이션 전역에 제공합니다.
    //    이제 AuthContext가 export 되었으므로, 정상적으로 작동합니다.
    <AuthProvider>
      {/* 2. ThemeProvider: styled-components의 테마를 애플리케이션 전역에 제공합니다. */}
      <ThemeProvider theme={theme}>
        {/* 3. GlobalStyles: 전역 CSS 리셋 및 기본 스타일을 적용합니다. */}
        <GlobalStyle />
        {/* 4. AppRouter: 모든 페이지 라우팅을 관리합니다. */}
        <AppRouter />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
