import React, { useState, useRef, useEffect } from 'react';
import ToolTip from '../../components/ToolTip';
import DndContainer from '../../components/DragNDrop';
import axios from 'axios';

interface BookmarkFolder {
  id: number;
  name: string;
  url: string;
  bookmarks: Bookmark[];
}

interface Bookmark {
  id: number;
  name: string;
  url: string;
  imageUrl: string;
  summary: string;
}

interface BookmarkPageProps {
  name: string;
}

const BookmarkPage: React.FC<BookmarkPageProps> = ({ name }) => {
  const [selectedFolder, setSelectedFolder] = useState<BookmarkFolder | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [bookmarkFolders, setBookmarkFolders] = useState<BookmarkFolder[]>([]);
  const [folderName, setFolderName] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleFolderClick = (folder: BookmarkFolder) => {
    if (selectedFolder && selectedFolder.id === folder.id) {
      setSelectedFolder(null);
    } else {
      setSelectedFolder(folder);
    }
  };

  const handlePopoverClick = (event: MouseEvent) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
      setSelectedFolder(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handlePopoverClick);
    return () => {
      document.removeEventListener('mousedown', handlePopoverClick);
    };
  }, []);

  // 폴더 생성
  const handleFolderCreate = async (user_id: number, folderName: string) => {
    try {
      const jsonData = { name: folderName, user_id: user_id };
      const response = await axios.post(`http://localhost:8000/api/v1/folders`, jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  };

  // 유저의 폴더 조회
  const handleFolderFetch = async (user_id: number) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/folders/list/${user_id}`);
      const userFolders = response.data;
      console.log(response.data);
      setBookmarkFolders(userFolders);
    } catch (err) {
      console.error('Error fetching folders:', err);
    }
  };

  useEffect(() => {
    const user_id = 1;
    handleFolderFetch(user_id);
  }, []);

  // 폴더와 종속된 북마크 삭제 로직
  const handleFolderDelete = async (folder_id: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/folders/${folder_id}`);
      console.log(`Deleting folder: ${folder_id}`);
      // 폴더 삭제 후 bookmarkFolders를 업데이트
      setBookmarkFolders((prevFolders) => prevFolders.filter((folder) => folder.id !== folder_id));

      // 삭제된 폴더가 선택된 폴더인 경우, selectedFolder를 초기화
      if (selectedFolder && selectedFolder.id === folder_id) {
        setSelectedFolder(null);
      }
    } catch (error) {
      console.error('폴더 삭제 오류:', error);
    }
  };

  const updateSelectedFolderBookmarks = (newBookmarks: Bookmark[]) => {
    if (selectedFolder) {
      const updatedFolder = { ...selectedFolder, bookmarks: newBookmarks };
      setSelectedFolder(updatedFolder);
    }
  };

  const handleFolderCreateClick = () => {
    setIsFormVisible(true);
  };

  const handleFolderCreateSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const user_id = 1;
    await handleFolderCreate(user_id, folderName);
    setFolderName('');
    setIsFormVisible(false);
  };

  return (
    <div className="flex flex-col items-center">
      <img className="mt-10 w-28 h-auto mb-2" src="https://i.ibb.co/kGjjkfk/Frame-427318914.png" alt={name} />
      <div className="text-gray-500 self-start text-xl flex items-center">
        <h2 className="ml-4">북마크</h2>
        <button
          onClick={handleFolderCreateClick}
          className="bg-blue-600 text-white rounded px-2 py-0 hover:bg-blue-800 ml-2 text-sm"
        >
          생성
        </button>
      </div>
      {isFormVisible && (
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
              className="ml-2 border-2 border-blue-400 rounded px-2 py-1"
            />
          </label>
          <button type="submit" className="bg-blue-600 text-white rounded px-2 py-0 hover:bg-blue-800 ml-2 text-sm">
            생성
          </button>
          <button type="reset" className="bg-blue-600 text-white rounded px-2 py-0 hover:bg-blue-800 ml-2 text-sm">
            취소
          </button>
        </form>
      )}
      <div
        className={`mx-auto mt-4 w-[90%] bg-white rounded-[20px] shadow-xl border-2 border-blue-400 mb-4 ${
          selectedFolder ? 'h-max' : 'h-[12rem]'
        }`}
      >
        <ul className="text-sm p-5 leading-10">
          {bookmarkFolders.map((folder) => (
            <li key={folder.id} className="flex items-center mb-2">
              <img className="w-4 h-4 mr-2" src="https://i.ibb.co/nsvNYV1/folder.png" alt="Folder Icon" />

              <a href="#" onClick={() => handleFolderClick(folder)}>
                {folder.name}
              </a>
              <button className="ml-5 text-blue-700 hover:text-red-700 focus:outline-none">수정</button>
              <button
                onClick={() => handleFolderDelete(folder.id)}
                className="ml-5 text-red-700 hover:text-red-700 focus:outline-none"
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
        {selectedFolder && (
          <div className=" w-[90%] h-[17rem] bg-[#DFEBFF] rounded-[20px] shadow-xl mb-4 mx-auto mt-[-1rem] py-4">
            <DndContainer post={selectedFolder.bookmarks} setPost={updateSelectedFolderBookmarks}>
              <div>삭제</div>
            </DndContainer>
          </div>
        )}
      </div>
      <div className="text-gray-500 self-start text-xl flex items-center">
        <h2 className="ml-4">북마크 편집</h2>
        <img className="ml-2  w-4 h-4" src="https://i.ibb.co/Bj1DmqY/add-square.png" alt="Add Icon" />
      </div>
      <div className="mx-auto mt-4 w-[90%] h-[9rem] bg-white rounded-[20px] shadow-xl border-2 border-blue-400 mb-4">
        <ul className="text-sm p-5 leading-8 m-0">
          {bookmarks.map((bookmark) => (
            <li key={bookmark.id} className="flex items-center">
              <img className="w-4 h-4 mr-2" src={bookmark.imageUrl} alt="Bookmark Icon" />
              <a href={bookmark.url}>{bookmark.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookmarkPage;
