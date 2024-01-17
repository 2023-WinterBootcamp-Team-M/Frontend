import React, { ReactElement, useEffect, useState } from 'react';
import Button from './components/Button';
import StartPage from './pages/start';
import SettingPage from './pages/setting/settingpage';
import AlarmPage from './pages/alarm/alarmpage';
import BookmarkPage from './pages/bookmark/BookmarkPage';
import ClipBoardPage from './pages/clipboard/clipboardpage';
export const APP_EXTEND_WIDTH = 405;
export const APP_COLLAPSE_WIDTH = 55;
export default function Panel({
  onWidthChange,
  initialEnabled,
}: {
  onWidthChange: (value: number) => void;
  initialEnabled: boolean;
}): ReactElement {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [sidePanelWidth, setSidePanelWidth] = useState(enabled ? APP_EXTEND_WIDTH : APP_COLLAPSE_WIDTH);
  const [tabIndex, setTabIndex] = useState(0);
  function handleOnToggle(enabled: boolean) {
    const value = enabled ? APP_EXTEND_WIDTH : APP_COLLAPSE_WIDTH;
    setSidePanelWidth(value);
    onWidthChange(value);
    window['chrome'].storage?.local.set({ enabled });
  }
  function openPanel(force?: boolean) {
    const newValue = force || !enabled;
    setEnabled(newValue);
    handleOnToggle(newValue);
  }
  const pages = [
    { component: StartPage, image: 'https://i.ibb.co/NLhT9rM/icon4-1-2-1.png' },
    { component: BookmarkPage, image: 'https://i.ibb.co/1r871hN/bookmark.png' },
    { component: ClipBoardPage, image: 'https://i.ibb.co/8zswCqT/Icon.png' },
    { component: AlarmPage, image: 'https://i.ibb.co/7rCxDb9/notifications-1.png' },
    { component: SettingPage, image: 'https://i.ibb.co/th2mHGg/build-2.png' },
  ];

  return (
    <div
      id="themeDiv"
      style={{
        width: sidePanelWidth - 5,
        boxShadow: '0px 0px 5px #0000009e',
      }}
      className="absolute top-0 right-0 bottom-0 z-max bg-[#ffffff] ease-in-out duration-300 overflow-hidden"
    >
      {/* 오른쪽에 고정된 메뉴바 섹션 */}
      <div className="absolute top-0 right-0 bottom-0 flex-none w-[50px] border-none flex flex-col ease-linear space-y-3 p-1 bg-gray-200">
        {pages.map(({ component, image }, index) => (
          <Button
            key={index}
            active={index === tabIndex}
            onClick={() => {
              setTabIndex(index);
              openPanel(true);
            }}
            className="py-2 flex justify-center items-center"
          >
            <img src={image} alt={`Button ${index + 1}`} className="w-7 h-7 object-cover" />
          </Button>
        ))}
      </div>

      {/* 콘텐츠 섹션: enabled 상태에 따라 표시 */}
      <div id="contentDiv" style={{ display: 'flex', flexGrow: 1, paddingRight: '50px' }}>
        {enabled && (
          <div style={{ width: '100%', height: '100%' }}>{React.createElement(pages[tabIndex].component)}</div>
        )}
      </div>
      <div className="absolute bottom-0 right-0 w-[50px] z-10 flex justify-center items-center p-1">
        <button className="mb-1" onClick={() => openPanel()}>
          <span>
            {enabled ? (
              <img src="https://i.ibb.co/hcVyZ3w/full-screen-exit.png" alt="Open Panel" className="w-6 h-6" />
            ) : (
              // 패널이 닫혀 있을 때
              <img src="https://i.ibb.co/GQM9zPg/full-screen.png" alt="Close Panel" className="w-6 h-6" />
            )}
          </span>
        </button>
      </div>
    </div>
  );
}
