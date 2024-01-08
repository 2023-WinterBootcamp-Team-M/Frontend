import * as React from 'react';

export default function SettingPage() {
  return (
    <div className="flex flex-col items-center h-screen">
      <img src="https://i.ibb.co/kGjjkfk/Frame-427318914.png" alt="logo_icon" className="mt-10 w-28 h-auto" />
      <div className="bg-white border-2 border-cliptab-blue mt-20 p-16 rounded-15 text-center shadow-md rounded-md ">
        <div className="cursor-pointer mt-4">요약 설정</div>
        <hr className="mb-4 mt-4 border-gray-300" />
        <div className="cursor-pointer mt-4">시작 페이지 설정</div>
        <hr className="mb-4 mt-4 border-gray-300" />
        <div className="cursor-pointer mt-4">테마 옵션</div>
        <hr className="mb-4 mt-4 border-gray-300" />
        <div className="cursor-pointer mt-4 mb-4">미접속 북마크 알림 주기 설정</div>
      </div>
    </div>
  );
}
