import React, { ReactElement, useEffect, useState } from 'react';
import { APP_COLLAPSE_WIDTH, APP_EXTEND_WIDTH, URLS } from './const';
import classNames from 'classnames';
import Button from './components/Button';
import StartPage from './pages/start';
import SettingPage from './pages/setting/settingpage';
import AlarmPage from './pages/alarm/alarmpage';
import ClipBoardPage from './pages/clipboard/clipboardpage';

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
    { component: StartPage, image: 'https://i.ibb.co/wBJrCvH/Icon.png' },
    { component: ClipBoardPage, image: 'https://i.ibb.co/bPj17JY/Icon-1.png' },
    { component: AlarmPage, image: 'https://i.ibb.co/wBJrCvH/Icon.png' },
    { component: SettingPage, image: 'https://i.ibb.co/H7LLFLr/Icon-2.png' },
  ];

  return (
    <div
      style={{
        width: sidePanelWidth - 5,
        boxShadow: '0px 0px 5px #0000009e',
      }}
      className="absolute top-0 right-0 bottom-0 z-max bg-[#ffffff] ease-in-out duration-300 overflow-hidden"
    >
      {/* 오른쪽에 고정된 메뉴바 섹션 */}
      <div className="absolute top-0 right-0 bottom-0 flex-none w-[50px] border-none flex flex-col ease-linear space-y-3 p-1">
        {pages.map(({ component, image }, index) => (
          <Button
            key={index}
            active={index === tabIndex}
            onClick={() => {
              setTabIndex(index);
              openPanel(true);
            }}
            className="py-2"
          >
            <img src={image} alt={`Button ${index + 1}`} className="w-5 h-5 object-cover" />
          </Button>
        ))}
      </div>

      {/* 콘텐츠 섹션: enabled 상태에 따라 표시 */}
      <div style={{ display: 'flex', flexGrow: 1, paddingRight: '50px' }}>
        {enabled && (
          <div style={{ width: '100%', height: '100%' }}>{React.createElement(pages[tabIndex].component)}</div>
        )}
      </div>
      <div className="absolute bottom-0 right-0 w-[50px] z-10 flex justify-center items-center p-1">
        <Button active={enabled} onClick={() => openPanel()}>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  enabled
                    ? 'M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25'
                    : 'M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15'
                }
              />
            </svg>
          </span>
        </Button>
      </div>
    </div>
  );
}