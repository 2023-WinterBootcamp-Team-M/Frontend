import * as React from 'react';

export default function StartPage(){
    return(
    <div className='flex flex-col items-center justify-center h-screen'>
        <img 
        src="https://i.ibb.co/mR6vRvf/clip-tab-2-removebg-preview.png" alt="logo_icon"
        style={{
            paddingBottom:'15rem',
        }}/>
        <button
        style={{ 
        width: '16rem',
        height: '3.75rem',
        background: 'rgba(42, 114, 231, 0.95)',
        borderRadius: '3.125rem',
        boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.50)',
        color: 'white',
        textAlign: 'center', // 텍스트 가운데 정렬
        textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', // 텍스트 쉐도우
        fontFamily: 'Holtwood One SC', // 폰트
        fontSize: '1rem', // 폰트 크기
        fontStyle: 'normal', // 폰트 스타일
        fontWeight: '400', // 폰트 굵기
        lineHeight: '1.5rem' // 줄 높이
        }}
        >
        시작하기
        </button>
    </div>);
}
