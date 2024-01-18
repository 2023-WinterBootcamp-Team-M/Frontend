// SignInModal.tsx
import React, { useState } from 'react';
import axios from 'axios';
import SignUpModal from './SignupModal';

const SignInModal = ({ onLoginSuccess }) => {
  const [isSignUpOpen, setIsSignUpOpen] = React.useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordMatching, setIsPasswordMatching] = React.useState<boolean>(true);

  const openSignUpModal = () => {
    setIsSignUpOpen(true);
  };

  const closeSignUpModal = () => {
    setIsSignUpOpen(false);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setIsPasswordValid(newPassword.length >= 8 && newPassword.length <= 20);
  };

  const handleLogin = async () => {
    if (isPasswordValid) {
      try {
        const response = await axios.post('http://localhost:8000/api/v1/sign-in', {
          email: email,
          password: password,
        });
        console.log('로그인 성공:', response.data);
        onLoginSuccess(response.data);
      } catch (error) {
        console.error('로그인 실패:', error.response ? error.response.data : error.message);
      }
    } else {
      console.error('유효하지 않은 비밀번호!');
    }
  };

  return (
    <div className="modal-container flex items-center justify-center">
      <div className="mx-auto w-[90%] h-max bg-white rounded-[20px] shadow-xl border-2 border-blue-400 mb-4">
        <input
          className="w-[90%] h-11 mx-4 my-2 px-4 border-2 border-blue-400 rounded-lg text-xs shadow-xl focus:outline-blue-500"
          type="email"
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
        <div className="w-full text-gray-500 text-xs text-right px-5 py-1 mt-1">
          <button>아이디</button>/<button>비밀번호 찾기</button> | <button onClick={openSignUpModal}>회원가입</button>
          <button
            className={`bg-[#0096FB] rounded-md shadow-lg text-white px-4 py-1 mx-3 mt-8 mb-3 w-[90%] h-11 ${
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
  );
};

export default SignInModal;
