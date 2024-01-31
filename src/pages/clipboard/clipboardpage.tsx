import * as React from 'react';
import { optStore, userIdStore } from '../../store/store';
import ToolTip from '../../components/ToolTip';
import { DownloadImage, DeleteImage, DeleteAllImages, CreateClipboard, GetClipboardList } from './ClipboardAPI';
import Button from '@mui/material/Button';
import { clipStore } from '../../store/store';
import ClipBookmarkDropdown from '../../components/ClipBookmarkDropdown';
import { useState } from 'react';

export default function ClipBoardPage(){

    const {userId} = userIdStore();
    const [link,setLink] = React.useState<string>('');
    const [loadedPage, setLoadedPage] = React.useState(1);
    const itemsPerPage = 10;
    const containerRef = React.useRef<HTMLUListElement|null>(null);
    const [showBookmarks, setShowBookmarks] = useState(false);
    const { clipboardId, clipImages, setClipboardId, setClipImages } = clipStore();
    const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
    const { opt_theme } = optStore();

    const handleSelectBookmark = (url: string) => {
      setLink(url);
    };
  
  //input창에 입력한 텍스트 link로 업데이트
  const handleInputChange = (event) => {
    setLink(event.target.value);
    console.log(clipImages);
  };

  const handleIntersection = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setLoadedPage((prevPage) => prevPage + 1);
    }
  };

  const handleShowBookmarks = (event) => {
    const { clientX, clientY } = event;
    setButtonPosition({ x: clientX, y: clientY });
    setShowBookmarks(!showBookmarks);
  };

  // userId가 존재할 때 CreateClipboard 실행
  const handleCreateClipboard = (event) => {
    if (userId !== null) {
      CreateClipboard( userId, link, setClipboardId,setClipImages);
    } else {
      console.log('로그인이 필요합니다.');
    }
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // 설정한 값에 따라 화면에 어느 정도 들어올 때 감지할지 조절 가능
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [containerRef.current]);
  
  const allItems = clipImages || []; // 모든 이미지를 가져오기

    return (
    <div className='flex flex-col items-center px-5 h-screen relative z-20'>
      <div className={`w-full h-[19%] absolute z-0 rounded-b-md  ${opt_theme ? "bg-[#121319]" : "bg-cliptab-blue"}`}/>
      <div className={`w-full h-[82%] bottom-0 rounded-t-lg  absolute z-10 shadow-top ${opt_theme ? "bg-[#121319]" : "bg-[#fcfcfc]"} `}/>
    <img //로고 이미지
    className={`w-[11.75rem] h-[4.7rem] z-10 ${opt_theme ? "desaturate":""}`}
    src={` ${opt_theme ? "https://i.ibb.co/YhgZ89r/Cliptab-1-4.png" : "https://i.ibb.co/d73mffp/clip-tab-3.png" }`}
    alt="clip_tab_logo"/>
    <p className={`self-start py-2 z-20 ${opt_theme ? "text-dark-text" : "text-cliptab-text"} `}>이미지 클립</p>
    <div //이미지 추출 창
    className={`w-full h-[10rem] rounded-[20px] shadow-lg mb-4  flex flex-col justify-between z-20 ${opt_theme ? " bg-dark-component" : "bg-white"}`}>
        <div className='flex flex-row items-center justify-between'>
        <img //작은 로고
        className={`size-8 ml-4 ${opt_theme ? "desaturate" : ""}`}
        src='https://i.ibb.co/NLhT9rM/icon4-1-2-1.png'/>
        <ToolTip title='내 북마크 링크 가져오기'>
        <div //내 북마크 링크 가져오기 div
        className={`flex flex-row items-center mr-4 text-sm rounded-md py-1 px-2 my-2 cursor-pointer relative ${opt_theme ? "bg-dark-btn text-dark-text" : "bg-cliptab-blue text-white"}`}
        onClick={(event)=>handleShowBookmarks(event)}>
        <img 
        className={`size-6 ${opt_theme ? "desaturate" : ""}`}
        src="https://i.ibb.co/kH4Xjbj/bookmark-4.png" 
        alt="bookmark-4"/>
        <img
        className={`size-3 ${opt_theme ? "desaturate" : ""}`}
        src="https://i.ibb.co/0rJCLSp/arrow-down-simple.png"
        alt="arrow-down-simple"/>
        </div>
        </ToolTip>
        {showBookmarks && 
        <div 
        style={{
          position: 'fixed',
          top: `${buttonPosition.y}px`,
          left: `${buttonPosition.x}px`,
          zIndex: 9999,
        }}>
        <ClipBookmarkDropdown userId={userId} onSelectBookmark={handleSelectBookmark} />
        </div>}
        </div>
        <input //링크 입력창
          className={`w-[90%] h-11 mx-auto px-4 rounded-lg text-xs shadow-lg  ${opt_theme ? "bg-dark-btn/50 focus:outline-none" : "border-2 border-cliptab-blue focus:outline-[#3e95ff]"}`}
          type="text"
          placeholder="이미지를 추출할 페이지의 url을 입력하세요"
          onChange={handleInputChange}
          value={link}
        />
        <Button //이미지 클립 버튼
          variant="contained"
          className={` rounded-xl shadow-lg px-1 py-1 mx-auto my-auto w-[90%] h-11 hover:opacity-90 ${opt_theme ? "bg-dark-btn text-dark-text " : "bg-cliptab-blue text-cliptab-text "}`}
          onClick={handleCreateClipboard}
        >
          이미지 클립
        </Button>
      </div>
      <p className={`self-start py-2 z-20 ${opt_theme ? "text-dark-text" : "text-gray-400"}`}>클립보드</p>
      <div className={`w-full h-[60%] rounded-[20px] shadow-xl px-2 pt-4 flex flex-col mb-4 z-20 ${opt_theme ? "bg-dark-component" : "bg-white "}`}>
        {allItems.length === 0 ? 
        (
          <div className='flex flex-col items-center justify-evenly h-[88%]'>
            <img 
            className='h-fit w-[80%]'
            src="https://i.ibb.co/8cX39Gs/free-sticker-printing-11932393.png" alt="emptyclip_icon"/>
            <p className={`flex h-[20%] text-lg items-center ${opt_theme ? "text-dark-text" : "text-cliptab-blue"}`}>이미지를 추출해보세요!</p>
          </div>
        ):(
          <ul
          ref={containerRef}
          style={{ overflowY: 'auto' }}
          className="flex flex-wrap items-center justify-center h-[88%]"
        >
          {allItems.map((e) => (
            <li key={e.id}  className="w-1/2 flex justify-center items-center pb-2 animate-pop">
              <div id={e.id} className="relative">
                <img className={`rounded-md shadow-md size-32 border-2 ${opt_theme ? "border-dark-btn" : "border-cliptab-blue"}`} src={e.img_url} />
                <ToolTip title="삭제">
                  <div
                    className={`absolute top-1 right-1 rounded-full p-1 hover:cursor-pointer ${opt_theme ? "bg-dark-text": "bg-white"}`}
                    onClick={(event) => {
                      DeleteImage(event,clipboardId,e.id,clipImages,setClipImages);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M13.293 6.293a1 1 0 011.414 1.414L11.414 11l3.293 3.293a1 1 0 01-1.414 1.414L10 12.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 11 5.293 7.707a1 1 0 111.414-1.414L10 9.586l3.293-3.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </ToolTip>
                <ToolTip title="저장">
                  <div
                    className={`absolute top-1 left-1 rounded-full p-1 cursor-pointer hover:bg-gray-200 ${opt_theme ? "bg-dark-text": "bg-white"}`}
                    onClick={(event) => DownloadImage(event, e.img_url)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 2.66669V10.6667M8 10.6667L10 8.66669M8 10.6667L6 8.66669M3.33334 13.3334H12.6667"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </ToolTip>
              </div>
            </li>
          ))}
        </ul>
        )}
        <Button
          variant="contained"
          onClick={(event) => DeleteAllImages(event, clipboardId, setClipImages)}
          className={`rounded-xl shadow-lg  my-auto mx-auto w-[95%] h-11 hover:opacity-80 ${opt_theme ? "bg-dark-btn text-dark-text " : "bg-cliptab-blue text-cliptab-text "}`}
        >
          클립보드 비우기
        </Button>
      </div>
    </div>
  );
}
