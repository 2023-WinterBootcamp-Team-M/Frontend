import React, { useState, useEffect, useRef } from 'react';

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
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  const [buttonImage, setButtonImage] = useState('https://i.ibb.co/3mJ0h0Q/Group-1000002294.png');

  const loadMoreData = () => {
    // 임시 데이터 생성
    const newData = Array.from({ length: 10 }, (_, index) => ({
      id: page + index,
      image: 'https://i.ibb.co/Jp8Xkwr/5.jpg',
      name: `알림 ${page + index}`,
      url: 'https://github.com/2023-WinterBootcamp-Team-M',
      savedDate: '2023-01-01',
      daysSinceLastVisit: 51,
    }));

    setNotificationData((prev) => [...prev, ...newData]);
  };

  const truncateUrl = (url) => {
    return url.length > 30 ? `${url.slice(0, 30)}...` : url;
  };

  // IntersectionObserver 콜백
  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  };

  // Observer 설정
  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);

    // Cleanup 함수
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, []);

  // 페이지 번호가 변경될 때마다 데이터 로딩
  useEffect(() => {
    loadMoreData();
  }, [page]);

  return (
    <div className="flex flex-col items-center h-screen">
      <img src="https://i.ibb.co/kGjjkfk/Frame-427318914.png" alt="logo_icon" className="mt-10 mb-10 w-28 h-auto" />
      {notificationData.map((notification) => (
        <div
          key={notification.id}
          className="relative w-[90%] h-44 mb-4 p-4 rounded-[20px] shadow-xl border-2 border-cliptab-blue flex flex-col justify-between"
        >
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
              <a
                href={notification.url}
                target="_blank"
                rel="noreferrer"
                className="text-gray-700 text-sm leading-none"
              >
                {truncateUrl(notification.url)}
              </a>
              <div className="text-xs mt-1">
                <div>미접속 {notification.daysSinceLastVisit}일이 경과했습니다.</div>
                <div>북마크를 삭제하시겠습니까?</div>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-3">
            <button className="ml-9 w-24 h-7 bg-gray-300 rounded-md">접속</button>
            <button className="mr-7 w-24 h-7 bg-red-600 text-white rounded-md">삭제</button>
          </div>
        </div>
      ))}

      <div ref={loader} className="w-full h-20" />
    </div>
  );
}
