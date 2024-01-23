import React from 'react';

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
  if (!isVisible) {
    return null;
  }

  return (
    <form
      onSubmit={createBookmark}
      className="mx-auto w-[70%] h-[rem] bg-white rounded-[20px] shadow-xl border-2 border-blue-400 p-4 mb-4"
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
      <label className="text-sm">
        url:
        <input
          type="text"
          value={bookmarkUrl}
          onChange={(e) => setBookmarkUrl(e.target.value)}
          placeholder="url을 입력하세요"
          className="ml-2 border-2 border-blue-400 rounded px-2 py-1"
        />
      </label>

      <button type="submit" className="bg-blue-600 text-white rounded px-2 py-0 hover:bg-blue-800 ml-2 text-sm">
        생성
      </button>
      <button
        type="reset"
        onClick={() => setIsBookmarkFormVisible(false)}
        className="bg-blue-600 text-white rounded px-2 py-0 hover:bg-blue-800 ml-2 text-sm"
      >
        취소
      </button>
    </form>
  );
};

export default NewBookmarkModal;
