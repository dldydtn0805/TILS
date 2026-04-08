// src/hooks/useAuth.ts
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'; // AuthContext 임포트

const useAuth = () => {
  const context = useContext(AuthContext);

  // AuthContext.Provider 내부에서 사용되지 않으면 오류 발생
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export default useAuth;
