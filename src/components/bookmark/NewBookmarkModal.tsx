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
      <form
        ref={modalRef}
        onSubmit={createBookmark}
        className="flex flex-col justify-center mx-auto w-[90%] h-[60%] bg-white rounded-[20px] shadow-xl border-2 border-blue-400 p-4"
      >
        <label className="text-sm my-auto text-cliptab-blue">
          북마크 이름
          <input
            type="text"
            value={bookmarkName}
            onChange={(e) => setBookmarkName(e.target.value)}
            placeholder="북마크 이름을 입력하세요"
            className="border-2 border-blue-400 rounded px-2 py-1 text-xs w-full focus:outline-[#3e95ff] text-gray-700"
          />
        </label>
        <label className="text-sm my-auto text-cliptab-blue">
          url
          <input
            type="text"
            value={bookmarkUrl}
            onChange={(e) => setBookmarkUrl(e.target.value)}
            placeholder="url을 입력하세요"
            className="border-2 border-blue-400 rounded px-2 py-1 text-xs w-full focus:outline-[#3e95ff] text-gray-700"
          />
        </label>

        <div className="flex justify-between mt-4">
          <button type="submit" className="bg-cliptab-blue text-white rounded-lg py-1 hover:opacity-90 text-sm w-[48%]">
            생성
          </button>
          <button
            type="button"
            onClick={() => setIsBookmarkFormVisible(false)}
            className="bg-white text-cliptab-blue border border-cliptab-blue rounded-lg py-1 hover:opacity-90 text-sm w-[48%]"
          >
            취소
          </button>
        </div>
      </form>
  );
};

export default NewBookmarkModal;
