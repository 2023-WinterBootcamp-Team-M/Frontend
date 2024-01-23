import React from 'react';

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
  if (!isVisible) {
    return null;
  }

  return (
    <form
      onSubmit={handleFolderCreateSubmit}
      className="mx-auto w-[70%] h-[rem] bg-white rounded-[20px] shadow-xl border-2 border-blue-400 p-4 mb-4"
    >
      <label className="text-sm">
        폴더 이름:
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="폴더 이름을 입력하세요"
          className="ml-2 border-2 border-blue-400 rounded px-2 py-1"
        />
      </label>

      <button type="submit" className="bg-blue-600 text-white rounded px-2 py-0 hover:bg-blue-800 ml-2 text-sm">
        생성
      </button>
      <button
        type="reset"
        onClick={() => setIsFormVisible(false)}
        className="bg-blue-600 text-white rounded px-2 py-0 hover:bg-blue-800 ml-2 text-sm"
      >
        취소
      </button>
    </form>
  );
};

export default NewFolderModal;
