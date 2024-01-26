import React, { useEffect, useState } from 'react';
import { optStore, userIdStore } from '../../store/store';
import { GetSetting, PutSetting } from './SettingAPI';

const ThemeToggle = () => {
  const { opt_theme, opt_alarm, opt_start, opt_sum, toggleOptTheme } = optStore();
  const { userId } = userIdStore();
  useEffect(() => {
    const themeDiv = document.getElementById('themeDiv');
    const contentDiv = document.getElementById('contentDiv');
    if (!themeDiv) return;

    if (opt_theme) {
      themeDiv.classList.add('dark');
      contentDiv?.classList.add('dark');
    } else {
      themeDiv.classList.remove('dark');

      contentDiv?.classList.remove('dark');
    }
  }, [opt_theme]);

  const toggleTheme = () => {
    toggleOptTheme();
  };

  const Icons = {
    darkTheme: 'https://i.ibb.co/mNXCmNb/free-icon-night-2007907.png',
    lightTheme: 'https://i.ibb.co/mGwtxDj/free-icon-sun-5497432.png',
  };

  return (
    <button
      onClick={() => {
        toggleTheme();
        PutSetting(userId, opt_sum, opt_start, opt_theme, opt_alarm);
      }}
      className="w-[48%] flex flex-col justify-evenly items-center cursor-pointer text-[1.2rem] mb-4  bg-white rounded-[20px] shadow-xl text-sm font-semibold text-cliptab-blue"
    >
      <img
        src={opt_theme ? Icons.lightTheme : Icons.darkTheme}
        alt="Theme Icon"
        style={{ width: '20px', height: '20px', marginRight: '8px' }}
      />
      <div>
      <p className='text-sm text-cliptab-blue font-bold'>테마 설정</p>
      <p className={` ${opt_theme ? '클래스1' : ' text-[#747ED9]'} text-lg mt-4 `}>
              {opt_theme ? '어두운 테마' : '밝은 테마'}
      </p>
      </div>
    </button>
  );
};
export default ThemeToggle;
