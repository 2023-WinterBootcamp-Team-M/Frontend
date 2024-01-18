import React, { useState } from 'react';
import axios from 'axios';
import { userIdStore, pageStore } from '../store/store';
import SignInModal from '../components/SigninModal';

export default function StartPage() {
  const { userId, userName, userEmail, setUserId, setUserName, setUserEmail } = userIdStore();
  const setPageIndex = pageStore((state) => state.setPageIndex);
  const [enabled, setEnabled] = useState(false); // 패널 활성화 상태

  const handleLoginSuccess = (userData) => {
    setUserId(userData.id);
    setUserName(userData.name);
    setUserEmail(userData.email);
    // 추가적인 로그인 성공 후 처리
  };

  const handleStartClick = () => {
    setPageIndex(1); // 북마크 페이지 탭 인덱스
    console.log('1번 페이지로 이동');
    setEnabled(true); // 패널을 활성화 상태로 설정
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen">
      <img src="https://i.ibb.co/mR6vRvf/clip-tab-2-removebg-preview.png" alt="logo_icon" className="h-auto" />
      {!userId ? (
        <SignInModal onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div className="">
          <div>{userName}님 접속을 환영합니다!</div>
          <button onClick={handleStartClick}>시작하기</button>
        </div>
      )}
    </div>
  );
}
