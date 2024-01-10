import * as React from 'react';

export default function ClipBoardPage(){

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
    <div className='w-full h-[9rem] rounded-[20px] shadow-xl mb-4 bg-white border-2 border-cliptab-blue'>
        <div className='flex flex-row items-center justify-between'>
        <p className='ml-4 text-sm font-medium'>url 입력</p>
        <img 
        className='size-8 mr-4'
        src='https://i.ibb.co/NLhT9rM/icon4-1-2-1.png'/>
        </div>
        <form>
        <input 
        className='w-[90%] h-11 mx-4 my-1 px-4 border-2 border-blue-400 rounded-lg text-xs shadow-xl focus:outline-blue-500'
        type='text'
        placeholder='이미지를 추출할 페이지의 url을 입력하세요'/>
        <button className=' bg-cliptab-blue rounded-md shadow-lg text-white px-1 py-1 mx-4 mt-1 w-[90%] h-11'>이미지 클립</button>
        </form>
    </div>
    <p className='text-gray-500 self-start py-2'>Clip Board</p>
    <div className='w-full h-[60%] rounded-[20px] shadow-xl py-2 px-2 bg-white border-2 border-cliptab-blue'>
        <ul className='flex flex-wrap items-center justify-center h-[90%]'>
            <li className='w-1/2 flex justify-center items-center'>
                <div className='relative'>
                <img className='rounded-md size-28 border-2 border-cliptab-blue/80' src='https://i.ibb.co/RpBHbh3/8-2.png'/>
                <div className='absolute top-1 right-1 bg-white rounded-full p-1 hover:cursor-pointer'>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' viewBox='0 0 20 20' fill='currentColor'>
                    <path fillRule='evenodd' d='M13.293 6.293a1 1 0 011.414 1.414L11.414 11l3.293 3.293a1 1 0 01-1.414 1.414L10 12.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 11 5.293 7.707a1 1 0 111.414-1.414L10 9.586l3.293-3.293a1 1 0 011.414 0z' clipRule='evenodd' />
                </svg>
            </div>
            </div>
            </li>
            <li className='w-1/2 flex justify-center items-center'><img className='rounded-md size-28 border-2 border-cliptab-blue/80' src='https://i.ibb.co/RpBHbh3/8-2.png'/></li>
            <li className='w-1/2 flex justify-center items-center'><img className='rounded-md size-28 border-2 border-cliptab-blue/80' src='https://i.ibb.co/RpBHbh3/8-2.png'/></li>
            <li className='w-1/2 flex justify-center items-center'><img className='rounded-md size-28 border-2 border-cliptab-blue/80' src='https://i.ibb.co/RpBHbh3/8-2.png'/></li>
            <li className='w-1/2 flex justify-center items-center'><img className='rounded-md size-28 border-2 border-cliptab-blue/80' src='https://i.ibb.co/RpBHbh3/8-2.png'/></li>
            <li className='w-1/2 flex justify-center items-center'><img className='rounded-md size-28 border-2 border-cliptab-blue/80' src='https://i.ibb.co/RpBHbh3/8-2.png'/></li>
            <li className='w-1/2 flex justify-center items-center'><img className='rounded-md size-28 border-2 border-cliptab-blue/80' src='https://i.ibb.co/RpBHbh3/8-2.png'/></li>
            <li className='w-1/2 flex justify-center items-center'><img className='rounded-md size-28 border-2 border-cliptab-blue/80' src='https://i.ibb.co/RpBHbh3/8-2.png'/></li>
        </ul>
        <button className=' bg-cliptab-blue rounded-md shadow-lg text-white px-1 py-1 mx-4 mt-1 w-[90%] h-11'>클립보드 비우기</button>
    </div>
    </div>)
}