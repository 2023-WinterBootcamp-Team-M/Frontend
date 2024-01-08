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
  { id: 1, title: 'Bookmark_folder1', url: '' },
  { id: 2, title: 'Bookmark_folder2', url: '' },
  { id: 3, title: 'Bookmark_folder3', url: '' },
];

const bookmarks: Bookmark[] = [
  { id: 1, title: 'Bookmark_1', url: '' },
  { id: 2, title: 'Bookmark_2', url: '' },
  { id: 3, title: 'Bookmark_3', url: '' },
];

const BookmarkPage: React.FC<BookmarkPageProps> = ({ title }) => {
  return (
    <div>
      <div className="flex items-start justify-center pt-8">
        <img src="https://i.ibb.co/dg5sTq5/clip-tab-2.png" alt={title} />
      </div>

      <div className="mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">북마크</h2>
        <ul className="list-disc pl-6">
          {BookmarFolder.map((BookmarFolder) => (
            <li key={BookmarFolder.id}>
              <a href={BookmarFolder.url}>{BookmarFolder.title}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">북마크 편집</h2>
        <ul className="list-disc pl-6">
          {bookmarks.map((bookmark) => (
            <li key={bookmark.id}>{<a href={bookmark.url}>{bookmark.title}</a>}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookmarkPage;
