import React, { useState, useRef, useEffect } from 'react';
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
  const [isBookmarkFormVisible, setIsBookmarkFormVisible] = useState(false);
  const [editingFolderId, setEditingFolderId] = useState<number | null>(null);
  const [bookmarkName, setBookmarkName] = useState('');
  const [bookmarkUrl, setBookmarkUrl] = useState('');

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
  const handleFolderCreateSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const user_id = 1;

    try {
      const jsonData = { name: folderName, user_id: user_id };
      const response = await axios.post(`http://localhost:8000/api/v1/folders`, jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setBookmarkFolders((prevFolders) => [...prevFolders, response.data]);
      setFolderName('');
      setIsFormVisible(false);
    } catch (error) {
      console.error('폴더 생성 오류:', error);
    }
  };

  //유저의 폴더 조회
  const handleFolderFetch = async (user_id: number) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/folders/list/${user_id}`);
      setBookmarkFolders(response.data);
    } catch (err) {
      console.error('Error fetching folders:', err);
    }
  };

  useEffect(() => {
    const user_id = 1;
    handleFolderFetch(user_id);
  }, []);

  // 폴더 삭제
  const handleFolderDelete = async (folder_id: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/folders/${folder_id}`);
      setBookmarkFolders((prevFolders) => prevFolders.filter((folder) => folder.id !== folder_id));

      if (selectedFolder && selectedFolder.id === folder_id) {
        setSelectedFolder(null);
      }
    } catch (error) {
      console.error('폴더 삭제 오류:', error);
    }
  };

  // 폴더 수정
  const handleFolderEditSubmit = async (event: React.FormEvent, folderId: number) => {
    event.preventDefault();

    try {
      const jsonData = { name: folderName };
      const response = await axios.patch(`http://localhost:8000/api/v1/folders/${folderId}`, jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setBookmarkFolders((prevFolders) =>
        prevFolders.map((folder) => (folder.id === folderId ? { ...folder, name: response.data.name } : folder))
      );

      setEditingFolderId(null);
    } catch (error) {
      console.error('폴더 편집 오류:', error);
    }
  };

  // 북마크 생성
  const handleBookmarkCreateSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const folder_id = 1;

      if (!folder_id) {
        console.error('Please select a folder.');
        return;
      }

      const jsonData = {
        name: bookmarkName,
        url: bookmarkUrl,
        folder_id: folder_id,
      };
      console.log(bookmarkName, bookmarkUrl, folder_id);
      const response = await axios.post(`http://localhost:8000/api/v1/bookmarks`, jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await handleBookmarkFetch(folder_id);
      setBookmarkName('');
      setBookmarkUrl('');
      setIsBookmarkFormVisible(false);
    } catch (error) {
      console.error('북마크 생성 중 오류 발생:', error);
    }
  };

  // 북마크 조회
  const handleBookmarkFetch = async (folder_id: number) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/bookmarks/${folder_id}`);
      const userBookmarks = response.data;
      console.log(response.data);
      setBookmarks(userBookmarks);
    } catch (err) {
      console.error('Error fetching folders:', err);
    }
  };

  useEffect(() => {
    const folder_id = 1;
    handleBookmarkFetch(folder_id);
  }, []);

  const updateSelectedFolderBookmarks = (newBookmarks: Bookmark[]) => {
    if (selectedFolder) {
      const updatedFolder = { ...selectedFolder, bookmarks: newBookmarks };
      setSelectedFolder(updatedFolder);
    }
  };

  const handleFolderCreateClick = () => {
    setIsFormVisible((prevIsFormVisible) => !prevIsFormVisible);
    setFolderName('');
  };

  const handleBookmarkCreateClick = () => {
    setIsBookmarkFormVisible((prevIsBookmarkFormVisible) => !prevIsBookmarkFormVisible);
    setFolderName('');
  };

  const handleFolderEditClick = (folderId: number) => {
    setEditingFolderId(folderId);
    setFolderName(bookmarkFolders.find((folder) => folder.id === folderId)?.name || '');
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
          폴더 생성
        </button>
        <button
          onClick={handleBookmarkCreateClick}
          className="bg-blue-600 text-white rounded px-2 py-0 hover:bg-blue-800 ml-2 text-sm"
        >
          북마크 생성
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
              placeholder="폴더 이름을 입력하세요"
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

      {isBookmarkFormVisible && (
        <form
          onSubmit={handleBookmarkCreateSubmit}
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
                  <a href="#" onClick={() => handleFolderClick(folder)}>
                    {folder.name}
                  </a>

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
            </li>
          ))}
        </ul>
        {selectedFolder && (
          <div className=" w-[90%] h-[17rem] bg-[#DFEBFF] rounded-[20px] shadow-xl mb-4 mx-auto mt-[-1rem] py-4">
            <DndContainer post={bookmarks} setPost={setBookmarks}>
              <div>삭제</div>
              {bookmarks.map((bookmark) => (
                <li key={bookmark.id} className="flex items-center">
                  <img className="w-4 h-4 mr-2" src="https://i.ibb.co/d6KTNk1/Bookmark.png" alt="Bookmark Icon" />
                  <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                    {bookmark.name}
                  </a>
                </li>
              ))}
            </DndContainer>
          </div>
        )}
      </div>
    </div>
  );
};
export default BookmarkPage;
