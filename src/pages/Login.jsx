import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoginContainer = styled.div`
  display: grid;
  place-items: center;
  width: 600px;
  height: 600px;
  background-color: #f0f0f0;
  border-radius: 8px;
`;

const LoginBox = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  gap: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 30px;
  font-weight: bold;
  margin: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #2ec4b6;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #28b2a5;
  }
`;

const Login = () => {
  const navigate = useNavigate();

  const handleToSignup = () => {
    navigate(`/signup`);
  };

  const handleLogin = () => {
    navigate(`/`);
  };

  return (
    <>
      <LoginContainer>
        <Title>로그인</Title>
        <LoginBox>
          <p>아이디</p>
          <Input type="text" placeholder="아이디" />

          <p>비밀번호</p>
          <Input type="text" placeholder="비밀번호" />
          <br />
          <Button onClick={handleToSignup}>회원가입</Button>
          <Button onClick={handleLogin}>로그인</Button>
        </LoginBox>
      </LoginContainer>
    </>
  );
};

export default Login;
