import * as React from 'react';
import ThemeToggle from './darktheme';

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

function Dropdown({ onSelect, options }) {
  return (
    <div className="flex flex-col bg-gray-100 shadow-md rounded-md mt-2">
      {options.map((option, index) => (
        <div key={index} onClick={() => onSelect(option)} className="px-4 py-2 hover:bg-blue-200 cursor-pointer">
          {option}
        </div>
      ))}
    </div>
  );
}

function Divider() {
  return <hr className="w-[180%] -ml-16 mb-4 mt-4 border-gray-300" />;
}

export default function SettingPage() {
  const [currentDropdown, setCurrentDropdown] = React.useState(null);
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const handleItemClick = (itemName) => {
    setCurrentDropdown(currentDropdown === itemName ? null : itemName);
  };

  const handleDropdownSelect = (option) => {
    console.log(`${option} 선택됨`);
    setCurrentDropdown(null);
  };

  const dropdownOptions = {
    summary: ['3줄 요약', '6줄 요약'],
    changeStartPage: ['북마크 페이지', '클립보드 페이지'],
    bookmarkNotif: ['20일', '30일', '50일'],
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);

    const htmlEl = document.querySelector('html');
    if (!htmlEl) return;

    const enabledDarkMode = htmlEl.classList.contains('dark');
    if (isDarkTheme) {
      // 다크모드인 경우(html 태그의 className에 dark가 있을때)
      // -> className에서 dark를 제거
      htmlEl.classList.remove('dark');
    } else {
      // 다크모드가 아닌 경우, className에서 dark를 추가
      htmlEl.classList.add('dark');
    }
  };

  const icons = {
    summary: 'https://i.ibb.co/s1tpM8f/free-icon-open-book-167755.png',
    changeStartPage: 'https://i.ibb.co/R6kYBpq/free-icon-page-layout-4548040.png',
    darkTheme: 'https://i.ibb.co/mNXCmNb/free-icon-night-2007907.png',
    lightTheme: 'https://i.ibb.co/mGwtxDj/free-icon-sun-5497432.png',
    bookmarkNotif: 'https://i.ibb.co/BNZH1V4/free-icon-notification-bell-9437878.png',
  };

  return (
    <div className={`flex flex-col items-center h-screen px-5 ${isDarkTheme ? 'dark' : ''}`}>
      <img src="https://i.ibb.co/kGjjkfk/Frame-427318914.png" alt="logo_icon" className="mt-10 mb-10 w-28 h-auto" />
      <div className='w-full bg-white rounded-[15px] shadow flex flex-row itmes-center mb-4 py-4 px-2'>
        <img 
        className='size-11 rounded-full mx-4 my-1'
        src='https://i.ibb.co/RpBHbh3/8-2.png'/>
        <div className='flex flex-col'>
        <p className='w-full font-semibold my-1'>임동민</p>
        <p className='w-full text-gray-500 text-sm'>dongmin11566@gmail.com</p>
        </div>
      </div>
      <div
        className={`flex flex-col justify-start items-center w-full h-[28rem] ${
          isDarkTheme ? 'bg-gray-800' : 'bg-white'
        } rounded-[20px] shadow-xl border-2 border-blue-600 mb-4`}
      >
        <div className="text-center mt-8 mb-8">
          <div className="text-gray-500 text-2xl font-semibold mb-16">환경 설정</div>
          <SettingItem iconSrc={icons.summary} onClick={() => handleItemClick('summary')}>
            요약 설정
          </SettingItem>
          {currentDropdown === 'summary' && (
            <Dropdown onSelect={handleDropdownSelect} options={dropdownOptions.summary} />
          )}
          <Divider />
          <SettingItem iconSrc={icons.changeStartPage} onClick={() => handleItemClick('changeStartPage')}>
            시작 페이지 변경
          </SettingItem>
          {currentDropdown === 'changeStartPage' && (
            <Dropdown onSelect={handleDropdownSelect} options={dropdownOptions.changeStartPage} />
          )}
          <Divider />
          <ThemeToggle />
          <Divider />
          <SettingItem iconSrc={icons.bookmarkNotif} onClick={() => handleItemClick('bookmarkNotif')}>
            북마크 알림 주기
          </SettingItem>
          {currentDropdown === 'bookmarkNotif' && (
            <Dropdown onSelect={handleDropdownSelect} options={dropdownOptions.bookmarkNotif} />
          )}
        </div>
      </div>
    </div>
  );
}
