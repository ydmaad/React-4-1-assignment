import React, { useContext, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Mypage = () => {
  const [newNickname, setNewNickname] = useState("");
  const [currentNickname, setCurrentNickname] = useState("");
  const [avatar, setAvatar] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // 사용자가 인증이 되지 않았다면
    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      // 사용자가 인증이 된 경우
    } else {
      const fetchUserInfo = async () => {
        try {
          // 로컬스토리지에 엑세스 토큰을 가져온다
          const token = localStorage.getItem("accessToken");
          // 사용자 정보를 가져오는데 헤더에 토큰을 포함한다
          const response = await axios.get(
            "https://moneyfulpublicpolicy.co.kr/user",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // 서버로부터 받은 닉네임을 상태에 저장
          setCurrentNickname(response.data.nickname);
        } catch (error) {
          console.error("Failed to fetch user info:", error);
        }
      };
      // 비동기 함수 실행
      fetchUserInfo();
    }
  }, [isAuthenticated]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      // 로컬스토리지에 엑세스 토큰을 가져온다
      const token = localStorage.getItem("accessToken");
      console.log("내 토큰값 =>", token);
      // 새로운 formData 객체 생성
      const formData = new FormData();
      // formData에 닉네임을 추가
      formData.append("nickname", newNickname);
      // formData에 아바타를 추가
      formData.append("avatar", avatar);

      // 서버에 patch요청을 보내 프로필을 업데이트
      // 요청 헤더에 엑세스 토큰과 콘텐츠 타입을 추가
      const response = await axios.patch(
        "https://moneyfulpublicpolicy.co.kr/profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // 이전 상태를 복사한 후 새로운 닉네임으로 업데이트
        setNewNickname((prevState) => ({
          ...prevState,
          nickname: response.data.nickname,
          avatar: response.data.avatar,
        }));
        alert("프로필이 변경되었습니다.");
        setNewNickname("");
        setAvatar("");
        console.log(response.data.nickname);
      } else {
        alert("닉네임 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error("Failed to update nickname : ", error);

      alert("닉네임 변경에 실패했습니다.");
    }
  };

  return (
    <Container>
      <Title>프로필 수정</Title>
      <Form>
        <FormGroup>
          <Label htmlFor="currentNickname">
            현재 닉네임 : {currentNickname}
          </Label>
          <Input
            type="text"
            placeholder="새 닉네임"
            minLength="1"
            maxLength="10"
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="avatar">프로필 이미지</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </FormGroup>
        <UpdateButton onClick={handleUpdateProfile}>
          프로필 업데이트
        </UpdateButton>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const UpdateButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export default Mypage;
