import React, { useState, useEffect } from 'react';
import NotificationItem from './notificationItem';
import { useInView } from 'react-intersection-observer';

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
  const [page, setPage] = useState(1); // 페이지 번호 초기값
  const [ref, inView] = useInView();

  const loadMoreData = () => {
    // 임시 데이터 생성
    const newData = Array.from({ length: 10 }, (_, index) => ({
      id: notificationData.length + index + (page - 1) * 10,
      image: 'https://i.ibb.co/Jp8Xkwr/5.jpg',
      name: `알림 ${notificationData.length + index + (page - 1) * 10}`,
      url: 'https://github.com/2023-WinterBootcamp-Team-M',
      savedDate: '2023-01-01',
      daysSinceLastVisit: 50,
    }));

    setNotificationData((prev) => [...prev, ...newData]);
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  useEffect(() => {
    if (inView) {
      // ref가 화면에 노출되면 추가 데이터 로드
      console.log(inView, '무한 스크롤 요청!');
      loadMoreData();
    }
  }, [inView]);

  return (
    <div className="flex flex-col items-center h-screen" style={{ overflowY: 'auto' }}>
      <img
        src="https://i.ibb.co/kGjjkfk/Frame-427318914.png"
        alt="logo_icon"
        className=" mt-10 mb-5 w-28 h-auto z-10"
      />
      <div>
        {notificationData.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
        {page > 1 && (
          <div ref={ref} className="flex justify-center">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
}
