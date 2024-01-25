//NewBookmarkModal.tsx

import React, { useEffect, useRef } from 'react';

interface NewBookmarkModalProps {
  isVisible: boolean;
  bookmarkName: string;
  bookmarkUrl: string;
  setBookmarkName: (name: string) => void;
  setBookmarkUrl: (url: string) => void;
  createBookmark: (event: React.FormEvent) => void;
  setIsBookmarkFormVisible: (isVisible: boolean) => void;
}

const NewBookmarkModal: React.FC<NewBookmarkModalProps> = ({
  isVisible,
  bookmarkName,
  bookmarkUrl,
  setBookmarkName,
  setBookmarkUrl,
  createBookmark,
  setIsBookmarkFormVisible,
}) => {
  const modalRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsBookmarkFormVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, setIsBookmarkFormVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="fixed top-0 right-0 h-full z-50 overflow-auto bg-smoke-light flex"
      style={{ width: '300px', right: '75px', top: '-185px' }}
    >
      <form
        ref={modalRef}
        onSubmit={createBookmark}
        className="relative p-4 bg-white rounded-lg m-auto flex-col flex border-gray-400 border-2"
        style={{ maxWidth: '100%' }}
      >
        <label className="text-sm">
          북마크 이름:
          <input
            type="text"
            value={bookmarkName}
            onChange={(e) => setBookmarkName(e.target.value)}
            placeholder="북마크 이름을 입력하세요"
            className="ml-2 border-2 border-blue-400 rounded px-2 py-1"
          />
        </label>
        <label className="text-sm mt-2">
          url:
          <input
            type="text"
            value={bookmarkUrl}
            onChange={(e) => setBookmarkUrl(e.target.value)}
            placeholder="url을 입력하세요"
            className="ml-2 border-2 border-blue-400 rounded px-2 py-1 w-[210px]"
          />
        </label>

        <div className="flex justify-end mt-4">
          <button type="submit" className="bg-blue-600 text-white rounded px-2 py-0 hover:bg-blue-800 text-sm">
            생성
          </button>
          <button
            type="button"
            onClick={() => setIsBookmarkFormVisible(false)}
            className="bg-gray-500 text-white rounded px-2 py-0 hover:bg-gray-700 ml-2 text-sm"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewBookmarkModal;
