import * as React from 'react';

interface StartPageProps {}

export default function StartPage(props: StartPageProps) {
  const [SignUp, setSignUp] = React.useState<boolean>(false);

  const openModal = () => {
    setSignUp(true);
  };

  const closeModal = () => {
    setSignUp(false);
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen">
      <img src="https://i.ibb.co/mR6vRvf/clip-tab-2-removebg-preview.png" alt="logo_icon" className="h-auto" />
      <div className="flex items-center justify-center">
        <div
          className={`mx-auto w-[90%] h-[15rem] bg-white rounded-[20px] shadow-xl border-2 border-blue-400 mb-4 ${
            SignUp ? 'hidden' : ''
          }`}
        >
          <form>
            <input
              className="w-[90%] h-11 mx-4 my-2 px-4 border-2 border-blue-400 rounded-lg text-xs shadow-xl focus:outline-blue-500"
              type="text"
              placeholder="이메일을 입력하세요"
            />
            <input
              className="w-[90%] h-11 mx-4 my-1 px-4 border-2 border-blue-400 rounded-lg text-xs shadow-xl focus:outline-blue-500"
              type="password"
              placeholder="비밀번호를 입력하세요"
            />
          </form>
          <div className="w-full text-gray-500 text-xs text-right px-5 py-1 mt-1">
            <button>아이디</button>/<button>비밀번호 찾기</button> | <button onClick={openModal}>회원가입</button>
            <button className="bg-[#0096FB] rounded-md shadow-lg text-white px-4 py-1 mx-3 mt-8 w-[90%] h-11">
              로그인
            </button>
          </div>
        </div>

        {/* 회원가입 모달 창 */}
        {SignUp && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="mx-auto w-[50%] h-[25rem] bg-white rounded-[20px] shadow-xl border-2 border-blue-400 p-4">
              <form>
                <label htmlFor="Username" className="w-full text-gray-500 text-sm">
                  Username
                </label>
                <input
                  className="w-[90%] h-11 mx-4 my-2 px-4 border-2 border-blue-400 rounded-lg text-xs shadow-xl focus:outline-blue-500"
                  type="text"
                  placeholder="Enter username"
                />
                <label htmlFor="Email" className="w-full text-gray-500 text-sm">
                  Email
                </label>
                <input
                  className="w-[90%] h-11 mx-4 my-1 px-4 border-2 border-blue-400 rounded-lg text-xs shadow-xl focus:outline-blue-500"
                  type="email"
                  placeholder="Enter email"
                />
                <label htmlFor="Password" className="w-full text-gray-500 text-sm">
                  Password
                </label>
                <input
                  className="w-[90%] h-11 mx-4 my-2 px-4 border-2 border-blue-400 rounded-lg text-xs shadow-xl focus:outline-blue-500"
                  type="password"
                  placeholder="Enter password"
                />
                <label htmlFor="Password again" className="w-full text-gray-500 text-sm">
                  Password again
                </label>
                <input
                  className="w-[90%] h-11 mx-4 my-1 px-4 border-2 border-blue-400 rounded-lg text-xs shadow-xl focus:outline-blue-500"
                  type="password"
                  placeholder="Enter password again"
                />
              </form>
              <button
                className="bg-[#0096FB] rounded-md shadow-lg text-white px-4 py-1 mx-3 mt-4 w-[90%] h-11"
                onClick={closeModal}
              >
                submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
