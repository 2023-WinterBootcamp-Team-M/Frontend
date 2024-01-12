import * as React from 'react';
import ToolTip from '../../components/ToolTip';
import axios from 'axios';
import { DownloadImage, DeleteImage, DeleteAllImages } from './ClipboardAPI';

export default function ClipBoardPage(){

    const [clipImages,setClipImages] = React.useState<string[]|number[]>(['https://i.ibb.co/RpBHbh3/8-2.png','https://i.ibb.co/RpBHbh3/8-2.png','https://i.ibb.co/RpBHbh3/8-2.png','https://i.ibb.co/RpBHbh3/8-2.png','https://i.ibb.co/RpBHbh3/8-2.png','https://i.ibb.co/RpBHbh3/8-2.png','https://i.ibb.co/RpBHbh3/8-2.png','https://i.ibb.co/RpBHbh3/8-2.png']);
    const [clipboardId,setClipBoardId] = React.useState<number>(1);

    //클립보드 리스트 조회 함수
    const getClipBoardList = async () => {
        const resopnse = axios.get(`/api/v1/clipboard/${clipboardId}`);
    }

    //선택한 이미지 삭제 함수
    const deleteImage = (e:React.MouseEvent<HTMLDivElement>, id:number) => {
        e.preventDefault();
    }

    return (
    <div className='flex flex-col items-center px-5 h-screen'>
    <img 
    className='w-[11.75rem] h-[4.8125rem]'
    src="https://i.ibb.co/d73mffp/clip-tab-3.png" 
    alt="clip_tab_logo"/>
    <p className='text-gray-500 self-start py-2'>이미지 추출</p>
    <div className='w-full h-[10rem] rounded-[20px] shadow-xl mb-4 bg-white border-2 border-cliptab-blue'>
        <div className='flex flex-row items-center justify-between'>
        <img 
        className='size-8 ml-4'
        src='https://i.ibb.co/NLhT9rM/icon4-1-2-1.png'/>
        <ToolTip title='내 북마크 링크 가져오기'>
        <div className='flex flex-row items-center mr-4 text-sm bg-[#0096FB] text-white rounded-md py-1 px-2 mt-2 mb-1 cursor-pointer'>
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
        <input 
        className='w-[90%] h-11 mx-4 my-1 px-4 border-2 border-blue-400 rounded-lg text-xs shadow-xl focus:outline-blue-500'
        type='text'
        placeholder='이미지를 추출할 페이지의 url을 입력하세요'/>
        <button className=' bg-[#0096FB] rounded-md shadow-lg text-white px-1 py-1 mx-4 mt-1 w-[90%] h-11'>이미지 클립</button>
        </form>
    </div>
    <p className='text-gray-500 self-start py-2'>Clip Board</p>
    <div className='w-full h-[60%] rounded-[20px] shadow-xl py-2 px-2 bg-white border-2 border-cliptab-blue'>
        <ul className='flex flex-wrap items-center justify-center h-[90%]'>
            {clipImages.map((e)=>(
                <li className='w-1/2 flex justify-center items-center'>
                <div className='relative'>
                <img className='rounded-md shadow-md size-28 border-2 border-cliptab-blue' src={e}/>
                <ToolTip title='삭제'>
                <div className='absolute top-1 right-1 bg-white rounded-full p-1 hover:cursor-pointer' onClick={(event)=>DeleteImage(event,e.clipboardId,e.pictureId)}>
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' viewBox='0 0 20 20' fill='currentColor'>
                        <path fillRule='evenodd' d='M13.293 6.293a1 1 0 011.414 1.414L11.414 11l3.293 3.293a1 1 0 01-1.414 1.414L10 12.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 11 5.293 7.707a1 1 0 111.414-1.414L10 9.586l3.293-3.293a1 1 0 011.414 0z' clipRule='evenodd' />
                    </svg>
                </div>
                </ToolTip>
                <ToolTip title='저장'>
                <div className='absolute top-1 left-1 bg-white rounded-full p-1 cursor-pointer hover:bg-gray-200' onClick={(event)=>DownloadImage(event,e)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className='h-4 w-4' viewBox="0 0 16 16" fill="none">
                        <path d="M8 2.66669V10.6667M8 10.6667L10 8.66669M8 10.6667L6 8.66669M3.33334 13.3334H12.6667" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                </ToolTip>
            </div>
            </li>
            ))}
        </ul>
        <button onClick={(event)=>DeleteAllImages(event,clipboardId)}
        className=' bg-[#0096FB] rounded-md shadow-lg text-white px-1 py-1 mx-4 mt-1 w-[90%] h-11'>클립보드 비우기</button>
    </div>
    </div>)
}