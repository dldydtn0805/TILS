// src/components/layout/Layout.tsx
import React from 'react'; // ReactNode는 더 이상 필요 없으므로 제거
import Header from '../common/Header/Header';
import Footer from '../common/Footer/Footer';
import { LayoutContainer, MainContent } from './Layout.styles';
import { Outlet } from 'react-router-dom'; // react-router-dom에서 Outlet 임포트

// LayoutProps에서 children은 더 이상 필요 없습니다.
// 왜냐하면 Router에서 Layout을 element로 사용할 때 children prop을 받지 않기 때문입니다.
interface LayoutProps {} // 이제 빈 인터페이스입니다.

const Layout: React.FC<LayoutProps> = () => {
  // children prop을 받지 않도록 변경
  return (
    <LayoutContainer>
      <Header /> {/* 헤더 */}
      <MainContent>
        <Outlet />{' '}
        {/* <-- 여기가 중요! 중첩된 라우트의 콘텐츠가 여기에 렌더링됩니다. */}
      </MainContent>
      <Footer /> {/* 푸터 */}
    </LayoutContainer>
  );
};

export default Layout;
