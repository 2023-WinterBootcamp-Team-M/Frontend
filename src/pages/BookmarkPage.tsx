import React from 'react';

interface BookmarkPageProps {
  title: string;
}

const BookmarkPage: React.FC<BookmarkPageProps> = ({ title }) => {
  return (
    <div className="text-center:center">
      <img src="https://i.ibb.co/dg5sTq5/clip-tab-2.png" />
    </div>
  );
};

export default BookmarkPage;
