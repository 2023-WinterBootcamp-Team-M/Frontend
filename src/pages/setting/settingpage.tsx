import * as React from 'react';

// SettingItem 컴포넌트 prop 타입 정의
type SettingItemProps = {
  children: React.ReactNode;
  onClick?: () => void;
  iconSrc: string;
};

function SettingItem({ children, onClick, iconSrc }: SettingItemProps) {
  return (
    <div onClick={onClick} className="flex items-center text-gray-700 cursor-pointer mt-4 text-[1.2rem]">
      <img src={iconSrc} alt="Icon" className="mr-2" style={{ width: '20px', height: '20px' }} />
      {children}
    </div>
  );
}

function Divider() {
  return <hr className="w-[80%] mb-4 mt-4 border-gray-300" />;
}

export default function SettingPage() {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  // 각 설정 항목 및 테마에 대한 아이콘 URL
  const icons = {
    summary: 'https://i.ibb.co/s1tpM8f/free-icon-open-book-167755.png',
    changeStartPage: 'https://i.ibb.co/R6kYBpq/free-icon-page-layout-4548040.png',
    darkTheme: 'https://i.ibb.co/mNXCmNb/free-icon-night-2007907.png',
    lightTheme: 'https://i.ibb.co/mGwtxDj/free-icon-sun-5497432.png',
    bookmarkNotif: 'https://i.ibb.co/BNZH1V4/free-icon-notification-bell-9437878.png',
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <img src="https://i.ibb.co/kGjjkfk/Frame-427318914.png" alt="logo_icon" className="mt-10 mb-10 w-28 h-auto" />
      <div className="flex flex-col justify-start items-center w-[90%] h-[28rem] bg-white rounded-[20px] shadow-xl border-2 border-blue-600 mb-4">
        <div className="text-center mt-8 mb-8">
          <div className="text-gray-500 text-xl font-semibold mb-16">환경 설정</div>
          <SettingItem iconSrc={icons.summary}>요약 설정</SettingItem>
          <Divider />
          <SettingItem iconSrc={icons.changeStartPage}>시작 페이지 변경</SettingItem>
          <Divider />
          <SettingItem onClick={toggleTheme} iconSrc={isDarkTheme ? icons.lightTheme : icons.darkTheme}>
            {isDarkTheme ? '밝은 테마' : '어두운 테마'}
          </SettingItem>
          <Divider />
          <SettingItem iconSrc={icons.bookmarkNotif}>북마크 알림 주기</SettingItem>
        </div>
      </div>
    </div>
  );
}
