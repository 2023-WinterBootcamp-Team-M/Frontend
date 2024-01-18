import axios from 'axios';
import React, { useEffect, useRef } from 'react';

export default function SignUpModal({ isOpen, onClose }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordAgain, setPasswordAgain] = React.useState('');
  const [isPasswordValid, setIsPasswordValid] = React.useState(true);
  const [isPasswordMatching, setIsPasswordMatching] = React.useState(true);

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
    const isComplexityValid =
      /[0-9]/.test(newPassword) && /[a-zA-Z]/.test(newPassword) && /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
    setIsPasswordValid(isLengthValid && isComplexityValid);
  };

  const handlePasswordAgainChange = (event) => {
    const newPasswordAgain = event.target.value;
    setPasswordAgain(newPasswordAgain);
    setIsPasswordMatching(newPasswordAgain === password);
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
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div className="mx-auto w-[50%] h-max bg-white rounded-[20px] shadow-xl border-2 border-blue-400 p-4">
          <form>
            <div>
              <div className="w-full text-gray-500 text-sm">Name</div>
              <input
                className="w-[90%] h-11 mx-4 my-1 px-4 border-2 border-blue-400 rounded-lg text-xs shadow-xl focus:outline-blue-500"
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div>
              <div className="w-full text-gray-500 text-sm">Email</div>
              <input
                className="w-[90%] h-11 mx-4 my-1 px-4 border-2 border-blue-400 rounded-lg text-xs shadow-xl focus:outline-blue-500"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div>
              <div className="w-full text-gray-500 text-sm">Password</div>
              <input
                className={`w-[90%] h-11 mx-4 my-2 px-4 border-2 border-blue-400 rounded-lg text-xs shadow-xl focus:outline-blue-500 ${
                  !isPasswordValid ? 'border-red-500' : ''
                }`}
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            {!isPasswordValid && (
              <p className="text-red-500 text-xs mx-4 my-1">
                Password must be 8-20 characters and include at least two of the following: numbers, letters, special
                characters.
              </p>
            )}
            <div>
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
              {!isPasswordMatching && <p className="text-red-500 text-xs mx-4 my-1">Passwords do not match.</p>}
            </div>
            <button
              className="bg-[#0096FB] rounded-md shadow-lg text-white px-4 py-1 mx-4 mt-4 w-[90%] h-11 ${isPasswordValid && isPasswordMatching ? '' : 'cursor-not-allowed'}"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  );
}
