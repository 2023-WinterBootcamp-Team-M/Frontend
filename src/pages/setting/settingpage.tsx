import * as React from 'react';
import ThemeToggle from './darktheme';
import { optStore, userIdStore } from '../../store/store';
import { GetSetting, PutSetting } from './SettingAPI';
import ChangeProfileModal from '../../components/ChangeProfileModal';
type SettingItemProps = {
  children: React.ReactNode;
  onClick?: () => void;
  iconSrc: string;
};

function SettingItem({ children, onClick, iconSrc }: SettingItemProps) {
  const {opt_theme} = optStore();
  return (
    <div
      onClick={onClick}
      className={`w-[48%] justify-evenly flex flex-col mb-4 px-2 items-center text-gray-700 cursor-pointer text-[1.2rem] rounded-[20px] shadow-xl ${opt_theme ? "bg-dark-component":"bg-white" }`}
    >
      <img src={iconSrc} alt="Icon" className="" style={{ width: '20px', height: '20px' }} />
      <p className={`text-sm font-bold ${opt_theme ? "text-dark-text" : "text-cliptab-blue"}`}>{children}</p>
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

export default function SettingPage() {
  const [currentDropdown, setCurrentDropdown] = React.useState(null);
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const { userId, userName, userEmail } = userIdStore();
  const { opt_sum, opt_start, opt_theme, opt_alarm, toggleOptSum, toggleOptStart, toggleOptTheme, toggleOptAlarm } =
    optStore();
  const [isChangeProfileOpen, setIsChangeProfileOpen] = React.useState(false);

  //유저아이디 or 설정 정보가 업데이트 될때마다 설정정보 조회
  React.useEffect(() => {
    GetSetting(userId);
  }, [userId, opt_sum, opt_start, opt_theme, opt_alarm]);

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

  const openChangeProfileModal = () => {
    setIsChangeProfileOpen(true);
  };

  const closeChangeProfileModal = () => {
    setIsChangeProfileOpen(false);
  };

  const icons = {
    summary: 'https://i.ibb.co/s1tpM8f/free-icon-open-book-167755.png',
    changeStartPage: 'https://i.ibb.co/R6kYBpq/free-icon-page-layout-4548040.png',
    darkTheme: 'https://i.ibb.co/mNXCmNb/free-icon-night-2007907.png',
    lightTheme: 'https://i.ibb.co/mGwtxDj/free-icon-sun-5497432.png',
    bookmarkNotif: 'https://i.ibb.co/BNZH1V4/free-icon-notification-bell-9437878.png',
  };

  return (
    <div className={`flex flex-col items-center h-screen relative px-5 ${isDarkTheme ? 'dark' : ''}`}>
      <div className={`w-full h-[19%] absolute -z-20 rounded-b-md ${opt_theme ? "bg-[#090a0d]" : "bg-cliptab-blue"}`} />
      <div className={`w-full h-[82%] bottom-0 rounded-t-lg absolute -z-10 shadow-top ${opt_theme ? "bg-dark-btn" : "bg-[#fcfcfc]"}`} />
      <img //로고 이미지
        className={`w-[11.75rem] h-[4.8125rem] z-10 ${opt_theme ? "desaturate":""} `}
        src={` ${opt_theme ? "https://i.ibb.co/YhgZ89r/Cliptab-1-4.png" : "https://i.ibb.co/d73mffp/clip-tab-3.png" }`}
        alt="clip_tab_logo"
      />
      <p className={`self-start py-2 z-20 ${opt_theme ? "text-dark-text" : "text-cliptab-text"} `}>설정</p>
      <div //이미지 추출 창
        className={`w-full h-[10rem] rounded-[20px] shadow-lg mb-4 flex flex-col justify-center items-center z-20 ${opt_theme ? " bg-dark-component" : "bg-white"}`}
      >
        <img //작은 로고
          className={`size-24 animate-bounce ${opt_theme ? "desaturate" : ""}`}
          src="https://i.ibb.co/TkGRQ90/icon4-8-1-2.png"
        />
        <p className={`${opt_theme ? "text-dark-text" : "text-cliptab-blue"}`}>계정을 관리하고 옵션을 선택할 수 있어요!</p>
      </div>

      <p className="self-start py-2 text-gray-400">내 계정</p>
      <div className={`w-full rounded-[20px] shadow-xl flex flex-row itmes-center mb-5 py-4 px-2 ${opt_theme ? " bg-dark-component" : "bg-white"}`}>
        <div className="flex items-center">
          <img className="size-11 rounded-full mx-4 my-1 w-7 h-7 mb-2" src="https://i.ibb.co/pK0XHr7/user.png" />
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row items-center">
            <div className={`font-semibold my-1 ${opt_theme ? "text-[#a1a5b6]" : "text-gray-950"}`}>{userName}</div>
            <img
              src="https://i.ibb.co/4KDg9K1/edit-02.png"
              className="ml-2 h-4 hover:cursor-pointer"
              onClick={() => {
                openChangeProfileModal();
              }}
            />
          </div>
          <p className="w-full text-gray-500 text-sm">{userEmail}</p>
        </div>
      </div>
      <p className="text-gray-400 self-start py-2">옵션</p>
      <div className={`flex w-full h-[31rem] ${isDarkTheme ? 'bg-dark-component' : 'bg-transparent'}`}>
        <div className="flex flex-row text-center flex-wrap justify-between">
          <SettingItem
            iconSrc={icons.summary}
            onClick={() => {
              // handleItemClick('summary')
              toggleOptSum();
              PutSetting(userId, opt_sum, opt_start, opt_theme, opt_alarm);
            }}
          >
            요약 설정
            <p className={` ${opt_sum ? 'text-[#9799FF]' : ' text-[#747ED9]'} text-lg mt-4 `}>
              {opt_sum ? '3줄 요약' : '6줄 요약'}
            </p>
          </SettingItem>
          {currentDropdown === 'summary' && (
            <Dropdown onSelect={handleDropdownSelect} options={dropdownOptions.summary} />
          )}
          <SettingItem
            iconSrc={icons.changeStartPage}
            onClick={() => {
              //handleItemClick('changeStartPage')
              toggleOptStart();
              PutSetting(userId, opt_sum, opt_start, opt_theme, opt_alarm);
            }}
          >
            시작 페이지 변경
            <p className={` ${opt_start ? 'text-[#9799FF]' : ' text-[#747ED9]'} text-lg mt-4 `}>
              {opt_start ? '북마크' : '이미지 클립'}
            </p>
          </SettingItem>
          {currentDropdown === 'changeStartPage' && (
            <Dropdown onSelect={handleDropdownSelect} options={dropdownOptions.changeStartPage} />
          )}
          <ThemeToggle />
          <SettingItem
            iconSrc={icons.bookmarkNotif}
            onClick={() => {
              //handleItemClick('bookmarkNotif')
              toggleOptAlarm();
              PutSetting(userId, opt_sum, opt_start, opt_theme, opt_alarm);
            }}
          >
            북마크 알림 주기
            <p className={` ${opt_alarm ? 'text-[#9799FF]' : ' text-[#747ED9]'} text-lg mt-4 `}>
              {opt_alarm ? '15일' : '30일'}
            </p>
          </SettingItem>
          {currentDropdown === 'bookmarkNotif' && (
            <Dropdown onSelect={handleDropdownSelect} options={dropdownOptions.bookmarkNotif} />
          )}
        </div>
        <ChangeProfileModal isOpen={isChangeProfileOpen} onClose={closeChangeProfileModal} />
      </div>
    </div>
  );
}
