import React, { useState, useRef, useEffect } from 'react';

interface BookmarkFolder {
  id: number;
  title: string;
  url: string;
}

interface Bookmark {
  id: number;
  title: string;
  url: string;
  imageUrl: string;
}

interface BookmarkPageProps {
  title: string;
}

const BookmarkPage: React.FC<BookmarkPageProps> = ({ title }) => {
  const [selectedFolder, setSelectedFolder] = useState<BookmarkFolder | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const bookmarkFolders: BookmarkFolder[] = [
    { id: 1, title: 'Bookmark_folder 1', url: '' },
    { id: 2, title: 'Bookmark_folder 2', url: '' },
    { id: 3, title: 'Bookmark_folder 3', url: '' },
  ];

  const bookmarks: Bookmark[] = [
    { id: 1, title: 'Bookmark 1', url: '', imageUrl: 'https://i.ibb.co/X58LMLL/icon1.png' },
    { id: 2, title: 'Bookmark 2', url: '', imageUrl: 'https://i.ibb.co/X58LMLL/icon1.png' },
    { id: 3, title: 'Bookmark 3', url: '', imageUrl: 'https://i.ibb.co/X58LMLL/icon1.png' },
  ];

  const handleFolderClick = (folder: BookmarkFolder) => {
    setSelectedFolder(folder);
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

  const handleBookmarkDeleteClick = (bookmark: Bookmark) => {
    console.log(`Deleting bookmark: ${bookmark.title}`);
  };

  return (
    <div className="flex flex-col items-center">
      <img className="mt-10 mb-10 w-28 h-auto mb-2" src="https://i.ibb.co/kGjjkfk/Frame-427318914.png" alt={title} />
      <div className="text-gray-500 self-start text-xl">
        <h2 className="ml-4">북마크</h2>
      </div>
      <div className="mx-auto mt-4 w-[90%] h-[30rem] bg-white rounded-[20px] shadow-xl border-2 border-blue-600 mb-4">
        <ul className="text-sm p-5 leading-10">
          {bookmarkFolders.map((folder) => (
            <li key={folder.id} className="flex items-center mb-2">
              <img className="w-4 h-4 mr-2" src="https://i.ibb.co/zFxjK9M/icon.png" alt="Folder Icon" />
              <a href="#" onClick={() => handleFolderClick(folder)}>
                {folder.title}
              </a>
            </li>
          ))}
        </ul>
        {selectedFolder && (
          <div
            ref={popoverRef}
            className="mx-auto mt-[-1rem] w-[90%] h-[17rem] bg-[#DFEBFF] rounded-[20px] shadow-xl border-2 mb-4"
            role="tooltip"
          >
            <ul className="text-sm p-5 leading-10">
              {bookmarks.map((bookmark) => (
                <li key={bookmark.id} className="flex items-center">
                  <img className="w-4 h-4 mr-2" src={bookmark.imageUrl} alt="Bookmark Icon" />
                  <a href={bookmark.url}>{bookmark.title}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="text-gray-500 self-start text-xl flex items-center">
        <h2 className="ml-4">북마크 편집</h2>
        <img className="ml-2 w-4 h-4" src="https://i.ibb.co/Bj1DmqY/add-square.png" alt="Add Icon" />
      </div>
      <div className="mx-auto mt-4 w-[90%] h-[9rem] bg-white rounded-[20px] shadow-xl border-2 border-blue-600 mb-4">
        <ul className="text-sm p-5 leading-8 m-0">
          {bookmarks.map((bookmark) => (
            <li key={bookmark.id} className="flex items-center">
              <img className="w-4 h-4 mr-2" src={bookmark.imageUrl} alt="Bookmark Icon" />
              <a href={bookmark.url}>{bookmark.title}</a>
              <button
                onClick={() => handleBookmarkDeleteClick(bookmark)}
                className="ml-auto text-red-500 hover:text-red-700 focus:outline-none"
              >
                Del
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookmarkPage;
