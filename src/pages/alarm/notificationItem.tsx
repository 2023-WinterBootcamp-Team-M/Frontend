import React, { useState } from 'react';

type Notification = {
  id: number;
  image: string;
  name: string;
  url: string;
  savedDate: string;
  daysSinceLastVisit: number;
};

const NotificationItem = ({ notification }) => {
  const [buttonImage, setButtonImage] = useState('https://i.ibb.co/3mJ0h0Q/Group-1000002294.png');

  return (
    <div className="relative w-[90%] h-44 mb-4 p-4 rounded-[20px] shadow-xl border-2 border-cliptab-blue flex flex-col justify-between">
      <button
        className="absolute -top-2 -right-2"
        onMouseEnter={() => setButtonImage('https://i.ibb.co/VTtVL17/Group-1000002293.png')}
        onMouseLeave={() => setButtonImage('https://i.ibb.co/3mJ0h0Q/Group-1000002294.png')}
      >
        <img src={buttonImage} alt="close_btn" className="w-7 h-7" />
      </button>

      <div className="flex items-center">
        <img src={notification.image} alt={notification.name} className="w-10 h-10 rounded-xl ml-4 mr-4" />
        <div>
          <a href={notification.url} target="_blank" rel="noreferrer" className="text-gray-700 text-sm leading-none">
            {notification.url.length > 30 ? `${notification.url.slice(0, 30)}...` : notification.url}
          </a>
          <div className="text-xs mt-1">
            <div>미접속 {notification.daysSinceLastVisit}일이 경과했습니다.</div>
            <div>북마크를 삭제하시겠습니까?</div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-3">
        <button className="ml-8 w-24 h-7 bg-gray-300 rounded-md">접속</button>
        <button className="mr-8 w-24 h-7 bg-red-600 text-white rounded-md">삭제</button>
      </div>
    </div>
  );
};
export default NotificationItem;