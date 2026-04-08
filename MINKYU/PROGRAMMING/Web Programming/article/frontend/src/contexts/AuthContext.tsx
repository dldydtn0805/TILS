// src/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
// 인증 관련 타입 정의 (옵션: src/types/auth.ts로 분리 가능)
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  user: { username: string } | null;
}

// 초기 Context 값 (실제 사용 전 기본값)
// 이 부분을 export 해야 외부에서 import 할 수 있습니다.
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// AuthProvider 컴포넌트
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // 백엔드 연동 전까지는 isLoading을 사용하여 초기 로딩 상태를 흉내냅니다.
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // 로그인 상태 (백엔드 연동 전까지는 항상 true로 가정)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  // 사용자 정보 (더미 데이터)
  const [user, setUser] = useState<{ username: string } | null>({
    username: 'testuser',
  });

  // 컴포넌트 마운트 시 초기 인증 상태 로딩 (더미)
  useEffect(() => {
    const checkAuthStatus = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsAuthenticated(true);
      setUser({ username: 'dummyUser' });
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  // 더미 로그인 함수
  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log(`Attempting login with: ${username}, ${password}`);
    setIsAuthenticated(true);
    setUser({ username: username });
    setIsLoading(false);
    return true;
  };

  // 더미 로그아웃 함수
  const logout = async (): Promise<void> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    console.log('Logging out...');
    setIsAuthenticated(false);
    setUser(null);
    setIsLoading(false);
  };

  const authContextValue = {
    isAuthenticated,
    isLoading,
    login,
    logout,
    user,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
