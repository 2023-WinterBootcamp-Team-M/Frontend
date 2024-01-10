import React, { useState, useEffect, useRef } from 'react';
import NotificationItem from './notificationItem';

type Notification = {
  id: number;
  image: string;
  name: string;
  url: string;
  savedDate: string;
  daysSinceLastVisit: number;
};

export default function alarmpage() {
  const [notificationData, setNotificationData] = useState<Notification[]>([]);
  const loader = useRef(null);

  const loadMoreData = () => {
    // 임시 데이터 생성
    const newData = Array.from({ length: 10 }, (_, index) => ({
      id: index,
      image: 'https://i.ibb.co/Jp8Xkwr/5.jpg',
      name: `알림 ${index}`,
      url: 'https://github.com/2023-WinterBootcamp-Team-M',
      savedDate: '2023-01-01',
      daysSinceLastVisit: 51,
    }));

    setNotificationData((prev) => [...prev, ...newData]);
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div className="flex flex-col items-center h-screen">
      <img src="https://i.ibb.co/kGjjkfk/Frame-427318914.png" alt="logo_icon" className="mt-10 mb-10 w-28 h-auto" />
      {notificationData.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
      <div ref={loader} className="w-full h-20" />
    </div>
  );
}
