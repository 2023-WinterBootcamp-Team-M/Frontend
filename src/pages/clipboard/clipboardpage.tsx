import * as React from 'react';

export default function ClipBoardPage() {
  return (
    <div className="flex flex-col items-center">
      <img src="https://i.ibb.co/kGjjkfk/Frame-427318914.png" alt="logo_icon" className="mt-10 mb-10 w-28 h-auto" />
      <div className="w-full h-[9rem] bg-white rounded-[20px] shadow-xl border-2 border-blue-600 mb-4">
        <p className="pl-4 pt-2 text-gray-500">url 입력</p>
        <form>
          <input
            className="w-[90%] h-11 mx-4 my-1 px-4 border-2 border-blue-600 rounded-lg text-xs shadow-xl"
            type="text"
            placeholder="이미지를 추출할 페이지의 url을 입력하세요"
          />
          <button className="bg-blue-600 bg-opacity-95 rounded-md shadow-lg text-white px-1 py-1 mx-4 mt-1 w-[90%] h-11">
            이미지 추출
          </button>
        </form>
      </div>
      <p className="text-gray-500 self-start py-2">Clip Board</p>
      <div className="w-full h-[60%] bg-white rounded-[20px] shadow-xl border-2 border-blue-600 py-4 px-4">
        <ul className="flex flex-wrap items-center text-center h-[90%]">
          <li className="w-1/2">이미지</li>
          <li className="w-1/2">이미지</li>
          <li className="w-1/2">이미지</li>
          <li className="w-1/2">이미지</li>
          <li className="w-1/2">이미지</li>
          <li className="w-1/2">이미지</li>
          <li className="w-1/2">이미지</li>
          <li className="w-1/2">이미지</li>
          <li className="w-1/2">이미지</li>
          <li className="w-1/2">이미지</li>
        </ul>
        <button className="bg-blue-600 bg-opacity-95 rounded-md shadow-lg text-white px-1 py-1 mx-4 mt-1 w-[90%] h-11">
          클립보드 비우기
        </button>
      </div>
    </div>
  );
}
