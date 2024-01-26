import React, { useState } from 'react';
import axios from 'axios';
import { userIdStore, pageStore, optStore, alarmStoare, isAlarmStoare } from '../store/store';
import SignInModal from '../components/SigninModal';
import { getAlarm, isAlarm } from './alarm/alarmpage';
import { Button } from '@mui/material';

export default function StartPage() {
  const { userId, userName, userEmail, setUserId, setUserName, setUserEmail } = userIdStore();
  const setPageIndex = pageStore((state) => state.setPageIndex);
  const [enabled, setEnabled] = useState(false); // 패널 활성화 상태
  const { opt_start } = optStore();
  const { alarmList, setAlarmList } = alarmStoare();
  const { setIsAlarm } = isAlarmStoare();

  const handleLoginSuccess = (userData) => {
    setUserId(userData.id);
    setUserName(userData.name);
    setUserEmail(userData.email);
    // 추가적인 로그인 성공 후 처리
  };

  const handleStartClick = () => {
    getAlarm(userId, alarmList, setAlarmList);
    isAlarm(userId, setIsAlarm);
    console.log('현재 pageIndex:', pageStore.getState().pageIndex);
    const optPage = opt_start ? 1 : 2;
    setPageIndex(optPage); // 북마크 페이지 탭 인덱스
    console.log('1번 페이지로 이동');
    setEnabled(true); // 패널 활성화 상태
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen">
      <img src="https://i.ibb.co/mR6vRvf/clip-tab-2-removebg-preview.png" alt="logo_icon" className="h-auto" />
      {!userId ? (
        <SignInModal onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="text-lg mb-4 -mt-44 text-gray-700 ">
            <span className="font-bold text-xl text-[#68a8f7]">{userName}</span> 님 접속을 환영합니다!
          </div>
          <Button
            onClick={handleStartClick}
            className="animate-bounce bg-[#0096FB] hover:bg-[#0078d4] rounded-md shadow-lg text-white px-1 py-1 mx-4 mt-1 w-[90%] h-11 cursor-pointer"
          >
            시작하기
          </Button>
        </div>
      )}
    </div>
  );
}
