import React, { useState, useEffect } from 'react';
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
  icon: string;
  long_summary: string;
  short_summary: string;
}

const ClipBookmarkDropdown = ({ userId, onSelectBookmark }) => {
  const [bookmarkFolders, setBookmarkFolders] = useState<BookmarkFolder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<BookmarkFolder | null>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    handleFolderFetch(userId);
  }, [userId]);

  // 유저의 폴더 조회
  const handleFolderFetch = async (user_id) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/folders/list/${user_id}`);
      setBookmarkFolders(response.data);
    } catch (err) {
      console.error('Error fetching folders:', err);
    }
  };

  // 폴더 내부의 북마크 조회
  const handleBookmarkFetch = async (folder_id) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/bookmarks/${folder_id}`);
      console.log(`${folder_id} 폴더의 북마크 조회 성공:`, response.data);
      setBookmarks(response.data);
    } catch (err) {
      console.error(`${folder_id} 북마크 조회 실패:`, err);
    }
  };

  // 선택된 폴더의 북마크 표시
  const handleFolderSelect = (folder) => {
    setSelectedFolder(folder);
    handleBookmarkFetch(folder.id);
  };

  const handleBookmarkClick = (bookmark) => {
    onSelectBookmark(bookmark.url); // 북마크 URL을 상위 컴포넌트로 전달
  };

  return (
    <div 
    className={`border p-2 rounded shadow-md bg-[#f1f1f1] text-sm`}>
      <div>내 북마크</div>
      <ul>
        {bookmarkFolders.map((folder) => (
          <li key={folder.id} onClick={() => handleFolderSelect(folder)}>
            {folder.name}
          </li>
        ))}
      </ul>
      {selectedFolder && (
        <div>
          <ul>
            {bookmarks.map((bookmark) => (
              <li key={bookmark.id} onClick={() => handleBookmarkClick(bookmark)}>
                {bookmark.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ClipBookmarkDropdown;
