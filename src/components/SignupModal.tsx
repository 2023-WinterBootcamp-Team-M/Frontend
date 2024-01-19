import axios from 'axios';
import React, { useEffect, useRef } from 'react';

export default function SignUpModal({ isOpen, onClose }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordAgain, setPasswordAgain] = React.useState('');
  const [isPasswordValid, setIsPasswordValid] = React.useState(true);
  const [isPasswordMatching, setIsPasswordMatching] = React.useState(true);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose(); // 모달 바깥 클릭시 닫기 함수 호출
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    const isLengthValid = newPassword.length >= 8 && newPassword.length <= 20;

    if (newPassword.length === 0) {
      setIsPasswordValid(true);
      return;
    }
    const isComplexityValid =
      /[0-9]/.test(newPassword) && /[a-zA-Z]/.test(newPassword) && /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
    setIsPasswordValid(isLengthValid && isComplexityValid);
  };

  const handlePasswordAgainChange = (event) => {
    const newPasswordAgain = event.target.value;
    setPasswordAgain(newPasswordAgain);

    setIsPasswordMatching(newPasswordAgain === password);
    if (newPasswordAgain.length === 0) {
      setIsPasswordValid(true);
      return;
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/sign-up', {
        user_name: name,
        email: email,
        password: password,
      });
      console.log('회원가입 성공:', response.data);
      onClose();
    } catch (error) {
      console.error('회원가입 실패:', error.response ? error.response.data : error.message);
    }
  };

  const handleSubmit = () => {
    if (isPasswordValid && isPasswordMatching) {
      handleSignUp();
      onClose();
    } else {
      console.error('유효하지 않은 비밀번호 또는 비밀번호 불일치!');
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60">
        <div
          ref={modalRef}
          className="mx-auto w-[25rem] h-max bg-white rounded-[20px] shadow-xl border-2 border-blue-400 p-4"
        >
          <div className="flex items-center justify-center">
            <img className=" w-28 h-auto mb-2" src="https://i.ibb.co/kGjjkfk/Frame-427318914.png" alt={name} />
          </div>

          <form>
            <div>
              <div className="w-full text-gray-500 text-sm mt-1 ml-4">이름</div>
              <input
                className="w-[90%] h-11 mx-4 my-1 px-4 border-2 border-blue-400 rounded-lg text-xs shadow-xl focus:outline-blue-500"
                type="name"
                placeholder="이름을 입력하세요"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div>
              <div className="w-full text-gray-500 text-sm mt-1 ml-4">이메일</div>
              <input
                className="w-[90%] h-11 mx-4 my-1 px-4 border-2 border-blue-400 rounded-lg text-xs shadow-xl focus:outline-blue-500"
                type="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div>
              <div className="w-full text-gray-500 text-sm mt-1 ml-4">비밀번호</div>
              <input
                className={`w-[90%] h-11 mx-4 my-2 px-4 border-2 border-blue-400 rounded-lg text-xs shadow-xl focus:outline-blue-500 ${
                  !isPasswordValid ? 'border-red-500' : ''
                }`}
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            {!isPasswordValid && (
              <p className="text-red-500 text-xs mx-4 my-1">
                비밀번호는 8-20자여야 하고 숫자, 알파벳, 특수문자 중 2개 이상을 포함해야 합니다.
              </p>
            )}
            <div>
              <label htmlFor="PasswordAgain" className="w-full text-gray-500 text-sm ml-4">
                비밀번호 확인
              </label>
              <input
                className={`w-[90%] h-11 mx-4 my-1 px-4 border-2 border-blue-400 rounded-lg text-xs shadow-xl focus:outline-blue-500 mt-1 ${
                  !isPasswordMatching ? 'border-red-500' : ''
                }`}
                type="password"
                placeholder="비밀번호 재입력"
                value={passwordAgain}
                onChange={handlePasswordAgainChange}
              />
              {!isPasswordMatching && <p className="text-red-500 text-xs mx-4 my-1">비밀번호가 일치하지 않습니다.</p>}
            </div>
            <button
              className="bg-[#0096FB] rounded-md shadow-lg text-white px-4 py-1 mx-4 mt-4 w-[90%] h-11 ${isPasswordValid && isPasswordMatching ? '' : 'cursor-not-allowed'}"
              onClick={handleSubmit}
            >
              회원가입
            </button>
          </form>
        </div>
      </div>
    )
  );
}
