import React, { useState, useEffect, useRef } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreData = () => {
    // 임시 데이터 생성
    const newData = Array.from({ length: 30 }, (_, index) => ({
      id: notificationData.length + index, // 고유한 ID를 생성
      image: 'https://i.ibb.co/Jp8Xkwr/5.jpg',
      name: `알림 ${notificationData.length + index}`, // 이름 역시 고유하게 생성
      url: 'https://github.com/2023-WinterBootcamp-Team-M',
      savedDate: '2023-01-01',
      daysSinceLastVisit: 51,
    }));

    setNotificationData((prev) => [...prev, ...newData]);
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading) {
      // 스크롤이 하단에 도달하면 추가 데이터 로드
      setIsLoading(true);
      loadMoreData();
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // 스크롤 이벤트를 추가하여 스크롤을 감지하고 무한 스크롤을 구현
    window.addEventListener('scroll', handleScroll);
    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col items-center h-screen" style={{ overflowY: 'auto' }}>
      <img
        src="https://i.ibb.co/kGjjkfk/Frame-427318914.png"
        alt="logo_icon"
        className="fixed top-0 left-0 mt-10 w-28 h-auto z-10"
      />
      <div>
        {notificationData.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
        {isLoading && <div>Loading...</div>}
      </div>
    </div>
  );
}
