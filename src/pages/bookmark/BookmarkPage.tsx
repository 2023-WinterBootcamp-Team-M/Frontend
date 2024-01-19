import React, { useState, useRef, useEffect } from 'react';
import ToolTip from '../../components/ToolTip';
import DndContainer from '../../components/DragNDrop';
import axios from 'axios';
import { userIdStore } from '../../store/store';

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
  const [bookmarkName,setBookmarkName] = useState("");
  const [bookmarkUrl,setBookmarkUrl] = useState("");
  const [bookmarkFolders, setBookmarkFolders] = useState<BookmarkFolder[]>([]);
  const [folderName, setFolderName] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingFolderId, setEditingFolderId] = useState<number | null>(null);
  const { userId } = userIdStore();
  const [showBookmarkInput,setShowBookmarkInput] = useState(false);

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

  // 유저의 폴더 조회
  const handleFolderFetch = async (user_id: number|null) => {
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
    handleFolderFetch(userId);
  }, []);

  // 폴더와 종속된 북마크 삭제 로직
  const handleFolderDelete = async (folder_id: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/folders/${folder_id}`);
      console.log(`Deleting folder: ${folder_id}`);

      setBookmarkFolders((prevFolders) => prevFolders.filter((folder) => folder.id !== folder_id));

      if (selectedFolder && selectedFolder.id === folder_id) {
        setSelectedFolder(null);
      }
    } catch (error) {
      console.error('폴더 삭제 오류:', error);
    }
  };

  // 폴더 이름 수정 로직
  const handleFolderEditSubmit = async (event: React.FormEvent, folderId: number) => {
    event.preventDefault();

    try {
      const jsonData = { name: folderName };
      const response = await axios.patch(`http://localhost:8000/api/v1/folders/${folderId}`, jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // 수정된 이름으로 상태에서 폴더를 업데이트
      setBookmarkFolders((prevFolders) =>
        prevFolders.map((folder) => (folder.id === folderId ? { ...folder, name: response.data.name } : folder))
      );

      // 편집 상태를 초기화
      setEditingFolderId(null);
    } catch (error) {
      console.error('폴더 편집 오류:', error);
    }
  };
  //북마크 생성
  const createBookmark = async (event,folderId,bookmarkName,url) => {
    event.preventDefault();

    try {
      const jsonData = { 
        "folder_id": folderId,
        "name": bookmarkName,
        "url": url,
      };
      const response = await axios.post(`http://localhost:8000/api/v1/bookmarks`, jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // 새롭게 생성된 폴더를 bookmarkFolders 상태에 추가
      setBookmarks((prevBookmarks) => [...prevBookmarks, response.data]);
      console.log("북마크 생성 성공 :",response.data);
      // 폼 입력을 지우고 폼을 숨김
      // setFolderName('');
      // setIsFormVisible(false);
    } catch (error) {
      console.error('북마크 생성 오류:', error);
    }
  }

  const updateSelectedFolderBookmarks = (newBookmarks: Bookmark[]) => {
    if (selectedFolder) {
      const updatedFolder = { ...selectedFolder, bookmarks: newBookmarks };
      setSelectedFolder(updatedFolder);
    }
  };

  const handleFolderCreateClick = () => {
    setIsFormVisible(true);
  };

  const handleFolderEditClick = (folderId: number) => {
    setEditingFolderId(folderId);
    setFolderName(bookmarkFolders.find((folder) => folder.id === folderId)?.name || '');
  };
  //폴더생성
  const handleFolderCreateSubmit = async (event: React.FormEvent,user_id:number|null) => {
    event.preventDefault();

    try {
      const jsonData = { name: folderName, user_id: user_id };
      const response = await axios.post(`http://localhost:8000/api/v1/folders`, jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // 새롭게 생성된 폴더를 bookmarkFolders 상태에 추가
      setBookmarkFolders((prevFolders) => [...prevFolders, response.data]);

      // 폼 입력을 지우고 폼을 숨김
      setFolderName('');
      setIsFormVisible(false);
    } catch (error) {
      console.error('폴더 생성 오류:', error);
    }
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
          북마크 폴더 생성
        </button>
      </div>
      {/* 북마크 폴더생성 */}
      {isFormVisible && (
        <form
          onSubmit={(event)=>handleFolderCreateSubmit(event,userId)}
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
              {editingFolderId === folder.id ? (
                <form
                  onSubmit={(e) => handleFolderEditSubmit(e, folder.id)}
                  className="ml-2 border-2 border-blue-400 rounded px-2 py-1"
                >
                  <input
                    type="text"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    onBlur={() => setEditingFolderId(null)}
                  />
                </form>
              ) : (
                <>
                  <p 
                  className='cursor-pointer'
                  onClick={() => handleFolderClick(folder)}>
                    {folder.name}
                  </p>

                  <button
                    onClick={()=> setShowBookmarkInput(!showBookmarkInput)}
                  >
                    북마크 추가
                  </button>

                  <button
                    onClick={() => handleFolderEditClick(folder.id)}
                    className="ml-5 text-blue-700 hover:text-red-700 focus:outline-none"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleFolderDelete(folder.id)}
                    className="ml-5 text-red-700 hover:text-red-700 focus:outline-none"
                  >
                    삭제
                  </button>
                </>
              )}
              {showBookmarkInput && (
              <form
                onSubmit={(event)=>createBookmark(event,folder.id,bookmarkName,bookmarkUrl)}
                className="mx-auto w-[70%] h-[rem] bg-white rounded-[20px] shadow-xl border-2 border-blue-400 p-4 mb-4"
              >
                <label className="text-sm">
                  북마크이름:
                  <input
                    type="text"
                    value={bookmarkName}
                    onChange={(e) => setBookmarkName(e.target.value)}
                    className="ml-2 border-2 border-blue-400 rounded px-2 py-1"
                  />
                </label>
                <label className="text-sm">
                  북마크 링크
                  <input
                    type="text"
                    value={bookmarkUrl}
                    onChange={(e) => setBookmarkUrl(e.target.value)}
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
