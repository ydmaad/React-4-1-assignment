import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const NavigationBar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("정말로 로그아웃 하시겠습니까?");
    if (confirmLogout) {
      logout();
      navigate("/");
    }
  };

  const handleToMyPage = () => {
    navigate("/mypage");
  };

  return (
    <>
      <HeaderStyle>
        <h1>
          <LinkStyle onClick={() => navigate(`/`)}>가계부다</LinkStyle>
        </h1>
        <NavStyle>
          {isAuthenticated ? (
            <>
              <MyPageButton onClick={handleToMyPage}>MyPage</MyPageButton>
              <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </>
          ) : (
            <>
              <LinkStyle onClick={() => navigate(`/login`)}>Login</LinkStyle>
              <LinkStyle onClick={() => navigate(`/signup`)}>Signup</LinkStyle>
            </>
          )}
        </NavStyle>
      </HeaderStyle>
      <Outlet />
    </>
  );
};

const HeaderStyle = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  background-color: white;
  height: 70px;
  font-size: 20px;
  margin: 20px 0;
`;

const LinkStyle = styled.div`
  display: flex;
  flex-direction: row;
  text-decoration: none;
  color: black;
  margin: 0 20px;
  cursor: pointer;
`;

const NavStyle = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LogoutButton = styled.button`
  color: white;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  margin: 0 20px;
  background-color: red;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  text-align: center;
  &:hover {
    background-color: darkred;
  }
`;

const MyPageButton = styled.button`
  color: white;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  margin: 0 20px;
  background-color: #2ec4b6;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  text-align: center;
  &:hover {
    background-color: #17645c;
  }
`;

export default NavigationBar;
