// src/router/AppRouter.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 페이지 컴포넌트 임포트
import HomePage from '../pages/Home/HomePage';
import LoginPage from '../pages/Login/LoginPage';
import BoardListPage from '../pages/Board/BoardListPage';
import BoardDetailPage from '../pages/Board/BoardDetailPage';
import BoardWritePage from '../pages/Board/BoardWritePage';
import NotFoundPage from '../pages/NotFound/NotFoundPage';

// 라우트 보호 컴포넌트 임포트
import ProtectedRoute from './ProtectedRoute';
// Layout 컴포넌트 임포트
import Layout from '../components/layout/Layout';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 모든 페이지를 Layout 컴포넌트로 감쌉니다. */}
        <Route element={<Layout />}>
          {/* Layout 안에 렌더링될 하위 라우트들 */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/board" element={<BoardListPage />} />
          <Route path="/board/:id" element={<BoardDetailPage />} />

          {/* 게시글 작성/수정 페이지 (인증 필요)도 Layout 안에 포함됩니다. */}
          <Route
            path="/board/write"
            element={
              <ProtectedRoute>
                <BoardWritePage />
              </ProtectedRoute>
            }
          />

          {/* 일치하는 라우트가 없을 경우 404 페이지 렌더링 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
