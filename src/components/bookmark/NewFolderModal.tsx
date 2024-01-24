import React, { useEffect, useRef } from 'react';

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

  return (
    <div
      className="fixed top-0 right-0 h-full z-50 overflow-auto bg-smoke-light flex"
      style={{ width: '300px', right: '75px', top: '-150px' }}
    >
      <form
        ref={modalRef}
        onSubmit={handleFolderCreateSubmit}
        className="relative p-4 bg-white rounded-lg m-auto flex-col flex border-gray-400 border-2"
        style={{ maxWidth: '100%' }}
      >
        <label className="text-sm">
          폴더 이름:
          <input
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="폴더 이름을 입력하세요"
            className="ml-2 border-2 border-blue-400 rounded px-2 py-1 w-full"
          />
        </label>

        <div className="flex justify-end mt-4">
          <button type="submit" className="bg-blue-600 text-white rounded px-2 py-0 hover:bg-blue-800 text-sm">
            생성
          </button>
          <button
            type="button"
            onClick={() => setIsFormVisible(false)}
            className="bg-gray-500 text-white rounded px-2 py-0 hover:bg-gray-700 ml-2 text-sm"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewFolderModal;
