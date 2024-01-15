import * as React from 'react';
import axios from 'axios';
import SignUpModal from './../components/SignupModal';

export default function StartPage() {
  const [isSignUpOpen, setIsSignUpOpen] = React.useState(false);
  const [SignUp, setSignUp] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [isPasswordValid, setIsPasswordValid] = React.useState<boolean>(true);
  const [isPasswordMatching, setIsPasswordMatching] = React.useState<boolean>(true);

  const openSignUpModal = () => {
    setIsSignUpOpen(true);
  };

  const closeSignUpModal = () => {
    setIsSignUpOpen(false);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    // 비밀번호 유효성 검사
    const isLengthValid = newPassword.length >= 8 && newPassword.length <= 20;
    const isComplexityValid =
      /[0-9]/.test(newPassword) && /[a-zA-Z]/.test(newPassword) && /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
    setIsPasswordValid(isLengthValid && isComplexityValid);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleLogin = async () => {
    if (isPasswordValid) {
      try {
        const response = await axios.post('http://localhost:8000/api/v1/signin', {
          email: email,
          password: password,
        });
        console.log('로그인 성공:', response.data);
        // 성공 처리 로직 (예: 페이지 리디렉션)
      } catch (error) {
        console.error('로그인 실패:', error.response ? error.response.data : error.message);
        // 실패 처리 로직
      }
    } else {
      console.error('유효하지 않은 비밀번호!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen">
      <img src="https://i.ibb.co/mR6vRvf/clip-tab-2-removebg-preview.png" alt="logo_icon" className="h-auto" />
      <div className="flex items-center justify-center">
        <div
          className={`mx-auto w-[90%] h-[17rem] bg-white rounded-[20px] shadow-xl border-2 border-blue-400 mb-4 ${
            SignUp ? 'hidden' : ''
          }`}
        >
          <form>
            <input
              className="w-[90%] h-11 mx-4 my-2 px-4 border-2 border-blue-400 rounded-lg text-xs shadow-xl focus:outline-blue-500"
              type="text"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={handleEmailChange}
            />
            <input
              className={`w-[90%] h-11 mx-4 my-1 px-4 border-2 border-blue-400 rounded-lg text-xs shadow-xl focus:outline-blue-500 ${
                !isPasswordValid ? 'border-red-500' : ''
              }`}
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={handlePasswordChange}
            />
            {!isPasswordValid && (
              <p className="text-red-500 text-xs mx-4 my-1">
                비밀번호는 8-20자 이내이며, 숫자, 영문자, 특수문자 중 2가지 이상을 포함해야 합니다.
              </p>
            )}

            {!isPasswordMatching && <p className="text-red-500 text-xs mx-4 my-1">비밀번호가 일치하지 않습니다.</p>}
          </form>
          <div className="w-full text-gray-500 text-xs text-right px-5 py-1 mt-1">
            <button>아이디</button>/<button>비밀번호 찾기</button> | <button onClick={openSignUpModal}>회원가입</button>
            <button
              className={`bg-[#0096FB] rounded-md shadow-lg text-white px-4 py-1 mx-3 mt-8 w-[90%] h-11 ${
                isPasswordValid && isPasswordMatching ? '' : 'cursor-not-allowed'
              }`}
              onClick={isPasswordValid && isPasswordMatching ? handleLogin : undefined}
            >
              로그인
            </button>
          </div>
        </div>

        <SignUpModal isOpen={isSignUpOpen} onClose={closeSignUpModal} />
      </div>
    </div>
  );
}
