//BookmarkPage.tsx
import React, { useState, useRef, useEffect } from 'react';
import DndContainer from '../../components/DragNDrop';
import axios from 'axios';
import { favoriteStore, optStore, userIdStore } from '../../store/store';
import ToolTip from '../../components/ToolTip';
import NewFolderModal from '../../components/bookmark/NewFolderModal';
import NewBookmarkModal from '../../components/bookmark/NewBookmarkModal';

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
  icon: string;
  long_summary: string;
  shrot_summary: string;
}

interface BookmarkPageProps {
  name: string;
}

const BookmarkPage: React.FC<BookmarkPageProps> = ({ name }) => {
  const [selectedFolder, setSelectedFolder] = useState<BookmarkFolder | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [bookmarkName, setBookmarkName] = useState('');
  const [bookmarkUrl, setBookmarkUrl] = useState('');
  const [bookmarkFolders, setBookmarkFolders] = useState<BookmarkFolder[]>([]);
  const [folderName, setFolderName] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isBookmarkFormVisible, setIsBookmarkFormVisible] = useState(false);
  const [isBookmarkAuto,setIsBookmarkAuto] = useState(false);
  const [editingFolderId, setEditingFolderId] = useState<number | null>(null);
  const { userId } = userIdStore();
  const { favoriteBookmarks, setFavoriteBookmarks } = favoriteStore();
  const { opt_sum } = optStore();

  // 선택한 폴더 업데이트
  const handleFolderClick = (folder: BookmarkFolder) => {
    if (selectedFolder && selectedFolder.id === folder.id) {
      setSelectedFolder(null);
    } else {
      setSelectedFolder(folder);
    }
    console.log('선택된 폴더:', selectedFolder);
  };

  const handlePopoverClick = (event: MouseEvent) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
      setSelectedFolder(null);
    }
  };

  // 유저의 폴더 조회
  const handleFolderFetch = async (user_id: number | null) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/folders/list/${user_id}`);
      setBookmarkFolders(response.data);
      console.log('폴더조회 성공:',response.data);
    } catch (err) {
      console.error('Error fetching folders:', err);
    }
  };

  // 폴더 내부의 북마크 조회
  const bookmarkFetch = async (folder_id: number) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/bookmarks/${folder_id}`);
      console.log(`${folder_id} 폴더의 북마크 조회 성공:`, response.data);
      setBookmarks(response.data);
    } catch (err) {
      console.error(`${folder_id}북마크 조회 실패 :`, err);
    }
  };

  // 폴더 생성
  const handleFolderCreateSubmit = async (event: React.FormEvent, user_id: number | null) => {
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

  // 폴더 이름 수정
  const handleFolderEditSubmit = async (event: React.FormEvent, folder_id: number) => {
    event.preventDefault();
    try {
      const jsonData = {
        name: folderName,
      };
      const response = await axios.patch(`http://localhost:8000/api/v1/folders/${folder_id}`, jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      setBookmarkFolders((prevFolders) =>
        prevFolders.map((folder) => (folder.id === folder_id ? { ...folder, name: response.data.name } : folder))
      );

      setEditingFolderId(null);
    } catch (error) {
      console.error('폴더 편집 오류:', error);
    }
  };

  //북마크 생성
  const createBookmark = async (event, folderId, bookmarkName, url) => {
    event.preventDefault();

    try {
      const jsonData = {
        folder_id: folderId,
        name: bookmarkName,
        url: url,
      };
      const response = await axios.post(`http://localhost:8000/api/v1/bookmarks`, jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setBookmarks((prevBookmarks) => [...prevBookmarks, response.data]);
      console.log(bookmarkFolders,bookmarks);
      console.log("북마크 생성 성공 :",response.data);
      // 폼 입력을 지우고 폼을 숨김
      setFolderName('');
      setBookmarkName('');
      setBookmarkUrl('');
      setIsBookmarkFormVisible(false);
    } catch (error) {
      console.error('북마크 생성 오류:', error);
    }
  }

  //북마크 자동생성
  const createBookmarkAuto = async (event,bookmarkName,url,bookmarkFolders) => {
    event.preventDefault();

    try {
      const jsonData = { 
        "name": bookmarkName,
        "url": url,
      };
      console.log(jsonData);
      const response = await axios.post(`http://localhost:8000/api/v1/bookmarks/list/${userId}`, jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // 새로 생성된 폴더가 이미 상태에 존재하는지 확인
      const folderExists = bookmarkFolders.some((folder) => folder.id === response.data.folder.id);

      // 폴더가 존재하지 않으면 상태에 추가
      if (!folderExists) {
        setBookmarkFolders((prevFolders) => [...prevFolders, response.data.folder]);
      }
      // 새롭게 생성된 폴더를 bookmarkFolders 상태에 추가
      setBookmarks((prevBookmarks) => [...prevBookmarks, response.data.bookmark]);

      console.log("북마크 생성 성공 :",response.data);
      // 폼 입력을 지우고 폼을 숨김
      setBookmarkName('');
      setBookmarkUrl('');
      setIsBookmarkAuto(false);
    } catch (error) {
      console.error('북마크 생성 오류:', error);
    }
  };

  //북마크 즐겨찾기 조회
  const fetchFavorite = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/favorite/bookmarks/${userId}`);
      setFavoriteBookmarks(response.data);
      console.log('favoritebookmark:', favoriteBookmarks);
      console.log('북마크 즐겨찾기 조회 성공 :', response.data);
    } catch (err) {
      console.error('북마크 즐겨찾기 조회 실패 :', err);

    }
  }

  //폴더생성 클릭시
  const handleFolderCreateClick = () => {
    setIsFormVisible((prevIsFormVisible) => !prevIsFormVisible);
    setFolderName('');
  };
  //북마크생성 클릭시
  const handleBookmarkCreateClick = () => {
    setIsBookmarkFormVisible((prevIsBookmarkFormVisible) => !prevIsBookmarkFormVisible);
    setFolderName('');
  };
  //폴더자동분류 북마크 생성 클릭시
  const handleAutoBookmarkCreateClick = () => {
    setIsBookmarkAuto((prevIsBookmarkFormVisible) => !prevIsBookmarkFormVisible);
    setFolderName('');
  };
  //폴더수정 클릭시
  const handleFolderEditClick = (folderId: number) => {
    setEditingFolderId(folderId);
    setFolderName(bookmarkFolders.find((folder) => folder.id === folderId)?.name || '');
  };

  useEffect(() => {
    handleFolderFetch(userId);
    fetchFavorite();
    document.addEventListener('mousedown', handlePopoverClick);
    return () => {
      document.removeEventListener('mousedown', handlePopoverClick);
    };
  }, []);


  return (
    <div className="flex flex-col h-full">
      <img className="mt-10 w-28 h-auto mb-2 mx-auto" src="https://i.ibb.co/kGjjkfk/Frame-427318914.png" alt={name} />
      <div className="text-gray-500 self-start text-xl flex w-[90%] mx-auto">
        <h2 className="">북마크</h2>
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
        <button
          onClick={handleAutoBookmarkCreateClick}
          className="bg-blue-600 text-white rounded px-2 py-0 hover:bg-blue-800 ml-2 text-sm"
        >
          자동분류 북마크 생성
        </button>
      </div>

      {/* 폴더생성 */}
      <NewFolderModal
        isVisible={isFormVisible}
        folderName={folderName}
        setFolderName={setFolderName}
        handleFolderCreateSubmit={(event) => handleFolderCreateSubmit(event, userId)}
        setIsFormVisible={setIsFormVisible}
      />

      {/* 북마크 생성 */}
      <NewBookmarkModal
        isVisible={isBookmarkFormVisible}
        bookmarkName={bookmarkName}
        bookmarkUrl={bookmarkUrl}
        setBookmarkName={setBookmarkName}
        setBookmarkUrl={setBookmarkUrl}
        createBookmark={(event) => createBookmark(event, selectedFolder?.id, bookmarkName, bookmarkUrl)}
        setIsBookmarkFormVisible={setIsBookmarkFormVisible}
      />


      {isBookmarkAuto && (
        <form
          onSubmit={(event) => createBookmarkAuto(event,bookmarkName,bookmarkUrl,bookmarkFolders)}
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
        className={`mx-auto mt-4 w-[90%] min-h-60 max-h-80 overflow-auto  bg-white rounded-[20px] shadow-xl border-2 border-cliptab-blue mb-4 ${
          selectedFolder ? 'h-max' : 'h-min'
        }`}
      >
        {bookmarkFolders.length === 0 ? (
          <div className="flex flex-col w-full h-60 justify-evenly items-center">
            <img src="https://i.ibb.co/xgbw95k/pngegg.png" alt="empty_img" className=" w-[30%] h-[40%]" />
            <p className="text-center text-cliptab-blue font-bold text-lg">북마크를 추가해보세요!</p>
          </div>
        ) : (
          <ul className="text-sm p-5 leading-10 ">
            {bookmarkFolders.map((folder) => (
              <React.Fragment key={folder.id}>
                <li className="flex items-center mb-2">
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
                        className="cursor-pointer"
                        onClick={() => {
                          handleFolderClick(folder);
                          bookmarkFetch(folder.id);
                        }}
                      >
                        {folder.name}
                      </p>
                      <img
                        src="https://i.ibb.co/4KDg9K1/edit-02.png"
                        onClick={() => handleFolderEditClick(folder.id)}
                        className="ml-5 focus:outline-none w-5 h-5"
                      />
                      <img
                        className="ml-2 focus:outline-none w-5 h-5"
                        src="https://i.ibb.co/sFMqmQf/delete-2.png"
                        onClick={() => handleFolderDelete(folder.id)}
                      />
                    </>
                  )}
                </li>
                {selectedFolder && selectedFolder.id === folder.id && (
                  <div className="w-[100%] h-[16rem] bg-[#DFEBFF] rounded-[20px] overflow-auto shadow-xl mb-4 mx-auto py-4">
                    {/* 선택된 폴더의 북마크 목록 */}
                    <DndContainer post={bookmarks} setPost={setBookmarks} fetch={fetchFavorite}>
                      {bookmarks.map((bookmark) => (
                        <li key={bookmark.id} className="flex items-center">
                          {/* 북마크 항목 */}
                        </li>
                      ))}
                    </DndContainer>
                  </div>
                )}
              </React.Fragment>
            ))}
          </ul>
        )}
      </div>
      <div className="flex flex-col items-start mx-auto w-[90%] h-full">
        <h2 className="text-gray-500 text-xl self-start">즐겨찾기한 북마크</h2>
        <div
        className={`mx-auto mt-4 w-full bg-white rounded-[20px] shadow-xl border-2 border-cliptab-blue mb-4 h-min min-h-60`}
        > 
        {favoriteBookmarks.length === 0 ? (
          <div className='flex flex-col w-full h-60 justify-evenly items-center'>
          <img src='https://i.ibb.co/LNy0Wnj/pngegg-1.png' alt='empty_img' className='w-[50%] h-[60%]'/>
          <p className='text-center text-cliptab-blue font-bold text-lg'>즐겨찾기에 북마크를 추가해보세요!</p>
          </div>
        ):(
          <ul className="text-sm leading-10 p-5">
            {favoriteBookmarks.map((favorite)=>(
              <li key={favorite.name} className="flex items-center">
                <img className="w-4 h-4 mr-2" src={favorite.icon} alt={`${favorite.name}-icon`} />
                <ToolTip title={opt_sum ? favorite.short_summary : favorite.long_summary}>
                  <a href={favorite.url} target="_blank" rel="noopener noreferrer">
                    {favorite.name}
                  </a>
                  </ToolTip>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
export default BookmarkPage;
