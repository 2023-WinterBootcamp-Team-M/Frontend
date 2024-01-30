//NewFolderModal.tsx

import React, { useEffect, useRef } from 'react';
import { optStore } from '../../store/store';

interface NewFolderModalProps {
  isVisible: boolean;
  folderName: string;
  setFolderName: (name: string) => void;
  handleFolderCreateSubmit: (event: React.FormEvent) => void;
  setIsFormVisible: (isVisible: boolean) => void;
}

const NewFolderModal: React.FC<NewFolderModalProps> = ({
  isVisible,
  folderName,
  setFolderName,
  handleFolderCreateSubmit,
  setIsFormVisible,
}) => {
  const modalRef = useRef<HTMLFormElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsFormVisible(false);
      }
    };

    // 모달이 보일 때만 이벤트 리스너를 추가
    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // 클린업 함수
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, setIsFormVisible]); // 종속성 배열에 isVisible 추가

  if (!isVisible) {
    return null;
  }
  const { opt_theme } = optStore();
  return (
      <form
        ref={modalRef}
        onSubmit={handleFolderCreateSubmit}
        className={`flex flex-col justify-center mx-auto w-[90%] h-[60%] rounded-[20px] shadow-xl p-4 ${opt_theme ? " bg-dark-btn": "bg-white border-2 border-blue-400"}`}
      >
        <label className={`text-sm my-auto  ${opt_theme ? "text-dark-text" : "text-cliptab-blue"}`}>
          폴더 이름
          <input
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="폴더 이름을 입력하세요"
            className={`rounded px-2 py-2 text-xs w-full  ${opt_theme ? "bg-dark-component focus:outline-none text-white" : "border-2 border-cliptab-blue focus:outline-[#3e95ff] text-gray-700"}`}
          />
        </label>

        <div className="flex justify-between mt-4">
          <button type="submit" className={` rounded-lg py-1 hover:opacity-90 text-sm w-[48%] ${opt_theme ? "bg-dark-bg/30 text-white" : "bg-cliptab-blue text-white"}`}>
            생성
          </button>
          <button
            type="button"
            onClick={() => setIsFormVisible(false)}
            className={` rounded-lg py-1 hover:opacity-90 text-sm w-[48%] ${opt_theme ? "bg-dark-text" : "bg-white text-cliptab-blue border border-cliptab-blue"}`}
          >
            취소
          </button>
        </div>
      </form>
  );
};

export default NewFolderModal;
