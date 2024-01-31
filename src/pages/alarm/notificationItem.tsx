import React, { useState } from 'react';
import { deleteAlarm } from './alarmpage';
import { alarmStoare, optStore, userIdStore } from '../../store/store';

const NotificationItem = ({ notification}) => {
  const [buttonImage, setButtonImage] = useState('https://i.ibb.co/c11TV3y/Group-1000002294.png');
  const { setAlarmList } = alarmStoare();
  const { userId } = userIdStore()
  const { opt_theme } = optStore();

  const handleRedirect = () => {
    window.location.href = notification.bookmark_url;
  };

  return (
    <div className={`relative w-full h-[15%] mb-4 rounded-[20px] shadow-xl  flex flex-col justify-evenly ${opt_theme ? "bg-dark-component" : "border-2 border-cliptab-blue bg-white"}`}>
      <button
        className={`absolute -top-2 -right-2 ${opt_theme ? "desaturate" : ""}`}
        onMouseEnter={() => setButtonImage('https://i.ibb.co/rss1tFV/Group-1000002293.png')}
        onMouseLeave={() => setButtonImage('https://i.ibb.co/c11TV3y/Group-1000002294.png')}
        onClick={()=>deleteAlarm(userId,notification.id,setAlarmList)}
      >
        <img src={buttonImage} alt="close_btn" className="w-7 h-7" />
      </button>

      <div className="flex justi items-center mx-auto w-[90%]">
        <img src='https://i.ibb.co/Jp8Xkwr/5.jpg' alt={notification.name} className="w-12 h-12 rounded-xl mx-auto"/>
        <div className='w-[70%] items-center'>
          <a
            href={notification.bookmark_url}
            target="_blank"
            rel="noreferrer"
            className="text-gray-600 text-sm leading-none underline"
          >
            {notification.bookmark_url.length > 20 ? `${notification.bookmark_url.slice(0, 20)}...` : notification.bookmark_url}
          </a>
          <div className={`text-xs mt-1 ${opt_theme ? "text-dark-text" : "text-gray-950"}`}>
            <div>미접속 {notification.accumulated_days}일이 경과했습니다.</div>
            <div>북마크를 삭제하시겠습니까?</div>
          </div>
        </div>
      </div>

      <div className="flex justify-evenly items-center w-[90%] h-[20%] mx-auto">
        <button onClick={handleRedirect} className={` w-[43%] h-full text-center rounded-md ${opt_theme ? "bg-cliptab-blue desaturate" : "bg-cliptab-blue text-white"}`}>
          접속
        </button>
        <button 
        onClick={()=>deleteAlarm(userId,notification.id,setAlarmList)}
        className={`w-[43%] h-full text-center rounded-md ${opt_theme ? "bg-dark-btn text-dark-text" : " bg-gray-400 text-white"}`}>삭제</button>
      </div>
    </div>
  );
};
export default NotificationItem;
