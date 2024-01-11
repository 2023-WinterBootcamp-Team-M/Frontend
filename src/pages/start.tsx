import * as React from 'react';

interface StartPageProps {}

export default function StartPage(props: StartPageProps) {
  const [SignUp, setSignUp] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [passwordAgain, setPasswordAgain] = React.useState<string>('');
  const [isPasswordValid, setIsPasswordValid] = React.useState<boolean>(true);
  const [isPasswordMatching, setIsPasswordMatching] = React.useState<boolean>(true);

  const openModal = () => {
    setSignUp(true);
  };

  const closeModal = () => {
    setSignUp(false);
    // 모달이 닫힐 때 초기화
    setEmail('');
    setPassword('');
    setPasswordAgain('');
    setIsPasswordValid(true);
    setIsPasswordMatching(true);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    // 비밀번호 유효성 검사
    const isLengthValid = newPassword.length >= 8 && newPassword.length <= 20;
    const isComplexityValid =
      /[0-9]/.test(newPassword) && /[a-zA-Z]/.test(newPassword) && /[!@#$%^&*(),.?":{}|<>]/.test(newPassword); // 특수문자 추가 가능
    setIsPasswordValid(isLengthValid && isComplexityValid);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  };

  const handlePasswordAgainChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPasswordAgain = event.target.value;
    setPasswordAgain(newPasswordAgain);

    // 비밀번호 재입력과의 일치 여부 검사
    setIsPasswordMatching(newPasswordAgain === password);
  };

  const handleSubmit = () => {
    // 폼 제출 로직 추가
    if (isPasswordValid && isPasswordMatching) {
      // 제출 성공
      console.log('제출 성공!');
      closeModal(); // 모달을 성공적으로 제출 후 닫음
    } else {
      // 유효하지 않은 비밀번호 또는 불일치하는 경우 처리
      console.error('유효하지 않은 비밀번호 또는 비밀번호 불일치!');
    }
  };

  const handleLogin = () => {
    // 폼 제출 로직 추가
    if (isPasswordValid && isPasswordMatching) {
      // 제출 성공
      console.log('로그인 성공!');

      closeModal(); // 모달을 성공적으로 제출 후 닫음
    } else {
      // 유효하지 않은 비밀번호 또는 불일치하는 경우 처리
      console.error('유효하지 않은 비밀번호 또는 비밀번호 불일치!');
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
            <button>아이디</button>/<button>비밀번호 찾기</button> | <button onClick={openModal}>회원가입</button>
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

        {/* 회원가입 모달 창 */}
        {SignUp && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="mx-auto w-[50%] h-[30rem] bg-white rounded-[20px] shadow-xl border-2 border-blue-400 p-4">
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
                  value={email}
                  onChange={handleEmailChange}
                />
                <label htmlFor="Password" className="w-full text-gray-500 text-sm">
                  Password
                </label>
                <input
                  className={`w-[90%] h-11 mx-4 my-2 px-4 border-2 border-blue-400 rounded-lg text-xs shadow-xl focus:outline-blue-500 ${
                    !isPasswordValid ? 'border-red-500' : ''
                  }`}
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {!isPasswordValid && (
                  <p className="text-red-500 text-xs mx-4 my-1">
                    비밀번호는 8-20자 이내이며, 숫자, 영문자, 특수문자 중 2가지 이상을 포함해야 합니다.
                  </p>
                )}
                <label htmlFor="PasswordAgain" className="w-full text-gray-500 text-sm">
                  Password again
                </label>
                <input
                  className={`w-[90%] h-11 mx-4 my-1 px-4 border-2 border-blue-400 rounded-lg text-xs shadow-xl focus:outline-blue-500 ${
                    !isPasswordMatching ? 'border-red-500' : ''
                  }`}
                  type="password"
                  placeholder="Enter password again"
                  value={passwordAgain}
                  onChange={handlePasswordAgainChange}
                />
                {!isPasswordMatching && <p className="text-red-500 text-xs mx-4 my-1">비밀번호가 일치하지 않습니다.</p>}
              </form>
              <button
                className={`bg-[#0096FB] rounded-md shadow-lg text-white px-4 py-1 mx-4 mt-4 w-[90%] h-11 ${
                  isPasswordValid && isPasswordMatching ? '' : 'cursor-not-allowed'
                }`}
                onClick={isPasswordValid && isPasswordMatching ? handleSubmit : undefined}
              >
                제출
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
