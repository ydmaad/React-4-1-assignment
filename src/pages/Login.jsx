import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

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
  input {
    margin: 20px 0;
  }
  button {
    margin-bottom: 20px;
  }
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
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleToSignup = () => {
    navigate(`/signup`);
  };

  // async로 비동기함수 생성
  const handleSubmit = async (e) => {
    // 페이지가 새로고침되는 기본 동작을 막음
    e.preventDefault();
    // 오류가 발생할 수 있는 코드를 작성(catch,finally)
    try {
      // 주어진 url로 http post요청을 보냄
      // await로 요청이 끝날때까지 기다림
      // 요청이 완료되면 변수 안에 넣음
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/login",
        {
          id,
          password,
        } // body로 보냄
      );

      console.log(response);
      const data = response.data;
      if (data.success) {
        // 로그인에 성공하면 'login'함수를 호출하여 받은
        // 'accessToken'을 사용하여 로그인 상태를 설정
        login(data.accessToken);
        alert("login success");
        navigate(`/`);
      } else {
        alert("login failed");
      }
    } catch (error) {
      console.error("login error : ", error);
      alert("login failed");
    }
  };

  return (
    <>
      <LoginContainer>
        <Title>로그인</Title>
        <LoginBox>
          <form onSubmit={handleSubmit}>
            <p>아이디</p>
            <Input
              type="text"
              placeholder="아이디"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />

            <p>비밀번호</p>
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <Button type="submit" onClick={handleToSignup}>
              회원가입
            </Button>
            <Button type="submit">로그인</Button>
          </form>
        </LoginBox>
      </LoginContainer>
    </>
  );
};

export default Login;
