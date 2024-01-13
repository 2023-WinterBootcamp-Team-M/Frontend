import * as React from 'react';
import ToolTip from '../../components/ToolTip';
import { DownloadImage, DeleteImage, DeleteAllImages, CreateClipboard } from './ClipboardAPI';

export default function ClipBoardPage(){

    const [userId,setUserId] = React.useState<number>(1);
    const [clipImages,setClipImages] = React.useState<string[]|number[]>([]);
    const [clipboardId,setClipBoardId] = React.useState<number>(1);
    const [link,setLink] = React.useState<string>('');
    const [loadedPage, setLoadedPage] = React.useState(1);
    const itemsPerPage = 8;
    const containerRef = React.useRef<HTMLDivElement>(null);

    //input창에 입력한 텍스트 link로 업데이트
    const handleInputChange = (event) => {
        setLink(event.target.value);
        console.log(link);
    }

    const handleIntersection = (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          setLoadedPage((prevPage) => prevPage + 1);
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
      }, [containerRef]);
      const allItems = clipImages; // 모든 이미지를 가져오기
      const currentItems = allItems.slice(0, loadedPage * itemsPerPage);


    return (
    <div className='flex flex-col items-center px-5 h-screen'>
    <img //로고 이미지
    className='w-[11.75rem] h-[4.8125rem]'
    src="https://i.ibb.co/d73mffp/clip-tab-3.png" 
    alt="clip_tab_logo"/>
    <p className='text-gray-500 self-start py-2'>이미지 추출</p>
    <div //이미지 추출 창
    className='w-full h-[10rem] rounded-[20px] shadow-xl mb-4 bg-white border-2 border-cliptab-blue'>
        <div className='flex flex-row items-center justify-between'>
        <img //작은 로고
        className='size-8 ml-4'
        src='https://i.ibb.co/NLhT9rM/icon4-1-2-1.png'/>
        <ToolTip title='내 북마크 링크 가져오기'>
        <div //내 북마크 링크 가져오기 div
        className='flex flex-row items-center mr-4 text-sm bg-[#0096FB] text-white rounded-md py-1 px-2 mt-2 mb-1 cursor-pointer'>
        <img 
        className='size-6'
        src="https://i.ibb.co/kH4Xjbj/bookmark-4.png" 
        alt="bookmark-4"/>
        <img
        className='size-3'
        src="https://i.ibb.co/0rJCLSp/arrow-down-simple.png"
        alt="arrow-down-simple"/>
        </div>
        </ToolTip>
        </div>
        <form>
        <input //링크 입력창
        className='w-[90%] h-11 mx-4 my-1 px-4 border-2 border-blue-400 rounded-lg text-xs shadow-xl focus:outline-blue-500'
        type='text'
        placeholder='이미지를 추출할 페이지의 url을 입력하세요'
        onChange={handleInputChange}
        value={link}/>
        <button //이미지 클립 버튼
        className=' bg-[#0096FB] rounded-md shadow-lg text-white px-1 py-1 mx-4 mt-1 w-[90%] h-11' 
        onClick={(event)=>CreateClipboard(event,userId,setClipImages,link)}>이미지 클립</button>
        </form>
    </div>
    <p className='text-gray-500 self-start py-2'>Clip Board</p>
    <div
    ref={containerRef} style={{ overflowY: 'scroll', height: '500px' }}
    className='w-full h-[60%] rounded-[20px] shadow-xl py-2 px-2 bg-white border-2 border-cliptab-blue'>
        <ul className='flex flex-wrap items-center justify-center h-[90%]'>
            {currentItems.map((e)=>(
                <li className='w-1/2 flex justify-center items-center'>
                <div className='relative'>
                <img className='rounded-md shadow-md size-28 border-2 border-cliptab-blue' src={e.img_url}/>
                <ToolTip title='삭제'>
                <div className='absolute top-1 right-1 bg-white rounded-full p-1 hover:cursor-pointer' onClick={(event)=>DeleteImage(event,e.clipboardId,e.pictureId)}>
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' viewBox='0 0 20 20' fill='currentColor'>
                        <path fillRule='evenodd' d='M13.293 6.293a1 1 0 011.414 1.414L11.414 11l3.293 3.293a1 1 0 01-1.414 1.414L10 12.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 11 5.293 7.707a1 1 0 111.414-1.414L10 9.586l3.293-3.293a1 1 0 011.414 0z' clipRule='evenodd' />
                    </svg>
                </div>
                </ToolTip>
                <ToolTip title='저장'>
                <div className='absolute top-1 left-1 bg-white rounded-full p-1 cursor-pointer hover:bg-gray-200' onClick={(event)=>DownloadImage(event,e.img_url)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className='h-4 w-4' viewBox="0 0 16 16" fill="none">
                        <path d="M8 2.66669V10.6667M8 10.6667L10 8.66669M8 10.6667L6 8.66669M3.33334 13.3334H12.6667" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                </ToolTip>
            </div>
            </li>
            ))}
        </ul>
    </div>
    <button onClick={(event)=>DeleteAllImages(event,clipboardId)}
        className=' bg-[#0096FB] rounded-md shadow-lg text-white px-1 py-1 mx-4 mt-1 w-[90%] h-11'>클립보드 비우기</button>
    </div>)
}