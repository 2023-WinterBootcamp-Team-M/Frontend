import React, { useState, useEffect, useRef } from 'react';

// 알림 데이터 타입 정의
type Notification = {
  id: number;
  image: string;
  name: string;
  url: string;
  savedDate: string;
  daysSinceLastVisit: number;
};

function alarmpage() {
  const [notificationData, setNotificationData] = useState<Notification[]>([]);
  const [page, setPage] = useState(1);
  const loader = useRef(null);

  // 데이터를 불러오는 함수 (예시)
  const loadMoreData = () => {
    // 여기서는 임시 데이터를 생성합니다. 실제 애플리케이션에서는 API 호출 등을 사용합니다.
    const newData = Array.from({ length: 10 }, (_, index) => ({
      id: page + index,
      image: 'https://i.ibb.co/Jp8Xkwr/5.jpg',
      name: `알림 ${page + index}`,
      url: 'https://naver.com',
      savedDate: '2023-01-01',
      daysSinceLastVisit: 51,
    }));

    setNotificationData((prev) => [...prev, ...newData]);
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
        <div key={notification.id} className="w-[90%] h-32 mb-4 p-4 rounded-[20px] shadow-xl border-2 border-blue-600">
          <div className="grid grid-cols-4">
            <img src={notification.image} alt={notification.name} className="w-15 h-15 rounded-xl col-span-1 mr-4" />
            <div className="col-span-3 ml-4">
              <div>{notification.name}</div>
              <div>
                <a href={notification.url} target="_blank" rel="noreferrer">
                  {notification.url}
                </a>
              </div>
              <div>{notification.savedDate}</div>
              <div>{notification.daysSinceLastVisit}일 전</div>
            </div>
          </div>
        </div>
      ))}
      <div ref={loader} className="w-full h-20" />
    </div>
  );
}

export default alarmpage;
