import React from 'react';

interface BookmarFolder {
  id: number;
  title: string;
  url: string;
}

interface Bookmark {
  id: number;
  title: string;
  url: string;
}

interface BookmarkPageProps {
  title: string;
}

const BookmarFolder: BookmarFolder[] = [
  { id: 1, title: 'Bookmark_folder_1', url: '' },
  { id: 2, title: 'Bookmark_folder_2', url: '' },
  { id: 3, title: 'Bookmark_folder_3', url: '' },
];

const bookmarks: Bookmark[] = [
  { id: 1, title: 'Bookmark_1', url: '' },
  { id: 2, title: 'Bookmark_2', url: '' },
  { id: 3, title: 'Bookmark_3', url: '' },
];

const BookmarkPage: React.FC<BookmarkPageProps> = ({ title }) => {
  return (
    <div className="flex flex-col items-center">
      <img className="mt-10 mb-10 w-28 h-auto" src="https://i.ibb.co/kGjjkfk/Frame-427318914.png" alt={title} />
      <div>
        <h2 className="text-gray-500 self-start">북마크</h2>
      </div>
      <div className="mx-auto mt-4 w-full h-[30rem] bg-white rounded-[20px] shadow-xl border-2 border-blue-600 mb-4">
        <ul className="text-sm font-normal not-italic p-3">
          {BookmarFolder.map((BookmarFolder) => (
            <li key={BookmarFolder.id}>
              <a href={BookmarFolder.url}>{BookmarFolder.title}</a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-gray-500 py-2">
          북마크 편집 <button>+</button>
        </h2>
      </div>
      <div className="mx-auto mt-4 w-full h-[9rem] bg-white rounded-[20px] shadow-xl border-2 border-blue-600 mb-4">
        <ul className="text-sm font-normal not-italic p-3">
          {bookmarks.map((bookmark) => (
            <li key={bookmark.id}>{<a href={bookmark.url}>{bookmark.title}</a>}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookmarkPage;
