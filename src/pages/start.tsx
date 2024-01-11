import * as React from 'react';

export default function StartPage() {
  return (
    <div className="flex flex-col items-center justify-start h-screen">
      <img src="https://i.ibb.co/mR6vRvf/clip-tab-2-removebg-preview.png" alt="logo_icon" className="h-auto" />
      <div className="flex items-center justify-center">
        <div className=" mx-auto w-[90%] h-[15rem] bg-white rounded-[20px] shadow-xl border-2 border-blue-400 mb-4">
          <form>
            <input
              className="w-[90%] h-11 mx-4 my-2 px-4 border-2 border-blue-400 rounded-lg text-xs shadow-xl focus:outline-blue-500"
              type="text"
              placeholder="아이디를 입력하세요"
            />
            <input
              className="w-[90%] h-11 mx-4 my-1 px-4 border-2 border-blue-400 rounded-lg text-xs shadow-xl focus:outline-blue-500"
              type="password"
              placeholder="비밀번호를 입력하세요"
            />
          </form>
          <div className="w-full text-gray-500 text-xs text-right px-5 py-1 mt-1">
            <button>아이디</button>/<button>비밀번호 찾기</button> | <button>회원가입</button>
            <button className="bg-[#0096FB] rounded-md shadow-lg text-white px-4 py-1 mx-3 mt-8 w-[90%] h-11">
              로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
