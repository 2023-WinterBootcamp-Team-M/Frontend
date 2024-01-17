import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const themeDiv = document.getElementById('themeDiv');
    const contentDiv = document.getElementById('contentDiv');
    if (!themeDiv) return;

    if (isDarkTheme) {
      themeDiv.classList.add('dark');
      contentDiv?.classList.add('dark');
    } else {
      themeDiv.classList.remove('dark');

      contentDiv?.classList.remove('dark');
    }
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const Icons = {
    darkTheme: 'https://i.ibb.co/mNXCmNb/free-icon-night-2007907.png',
    lightTheme: 'https://i.ibb.co/mGwtxDj/free-icon-sun-5497432.png',
  };

  return (
    <button
      onClick={toggleTheme}
      className="w-[48%] flex flex-col justify-evenly items-center cursor-pointer text-[1.2rem] rounded-xl mb-4 shadow-md shadow-[#77A5FF] bg-white text-sm font-semibold text-cliptab-blue"
    >
      <img
        src={isDarkTheme ? Icons.lightTheme : Icons.darkTheme}
        alt="Theme Icon"
        style={{ width: '20px', height: '20px', marginRight: '8px' }}
      />
      {isDarkTheme ? '어두운 테마' : '밝은 테마'}
    </button>
  );
};

export default ThemeToggle;
