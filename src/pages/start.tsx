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
  const { opt_start, opt_theme } = optStore();
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
    // 패널이 열려있지 않은 경우에만 setPageIndex 호출
    setPageIndex(optPage); // 북마크 페이지 탭 인덱스
    setEnabled(true); // 패널 활성화 상태
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen">
      <img src={`${opt_theme ? "https://i.ibb.co/0nZP2Gv/Cliptab.png" : "https://i.ibb.co/mR6vRvf/clip-tab-2-removebg-preview.png"}`} alt="logo_icon" className={`h-auto ${opt_theme ? "desaturate":""}`} />
      {!userId ? (
        <SignInModal onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="text-lg mb-4 -mt-44 text-gray-700 ">
            <span className={`font-bold text-xl ${opt_theme ? "text-dark-text" : "text-[#68a8f7]"}`}>{userName}</span> 님 접속을 환영합니다!
          </div>
          <Button
            onClick={handleStartClick}
            className={`animate-bounce rounded-md shadow-lg px-1 py-1 mx-4 mt-1 w-[90%] h-11 cursor-pointer ${opt_theme ? "bg-dark-btn text-dark-text " : "bg-[#0096FB] hover:bg-[#0078d4] text-white"}`}
          >
            시작하기
          </Button>
        </div>
      )}
    </div>
  );
}
