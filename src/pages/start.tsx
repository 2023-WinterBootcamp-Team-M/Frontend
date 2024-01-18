import * as React from 'react';
import axios from 'axios';
import SignUpModal from './../components/SignupModal';
import { userIdStore } from '../store/store';
import SignInModal from '../components/SigninModal';

export default function StartPage() {
  const { userId, setUserId, setUserName, setUserEmail } = userIdStore();

  const handleLoginSuccess = (userData) => {
    setUserId(userData.id);
    setUserName(userData.name);
    setUserEmail(userData.email);
    // 추가적인 로그인 성공 후 처리
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen">
      <img src="https://i.ibb.co/mR6vRvf/clip-tab-2-removebg-preview.png" alt="logo_icon" className="h-auto" />
      {!userId ? <SignInModal onLoginSuccess={handleLoginSuccess} /> : <button>시작하기</button>}
    </div>
  );
}
