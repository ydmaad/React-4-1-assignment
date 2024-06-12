import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// 사용자가 인증되었는지 여부를 확인할 수 있는 변수
const token = localStorage.getItem("accessToken");

// 하위 컴포넌트{children}에게 인증 상태를 제공하는 역할
export const AuthProvider = ({ children }) => {
  // 초기값이 token이 존재하면 true, 없으면 false를 반환
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  const login = (token) => {
    // 로컬스토리지에 accessToken을 저장함. 로그인 상태를 유지하는데 사용
    localStorage.setItem("accessToken", token);
    // isAuthenticated 상태를 true로 설정
    setIsAuthenticated(true);
  };

  const logout = () => {
    // 로컬스토리지에 accessToken을 제거함. 로그아웃된 상태를 나타냄
    localStorage.removeItem("accessToken");
    // isAuthenticated 상태를 false로 설정
    setIsAuthenticated(false);
  };

  return (
    // AuthContext.Provider를 사용하여 컨택스트 값을 제공
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
