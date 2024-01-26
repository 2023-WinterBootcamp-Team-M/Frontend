import React, { useState, useEffect } from 'react';
import NotificationItem from './notificationItem';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { alarmStoare, isAlarmStoare, userIdStore } from '../../store/store';



//알림 조회
export async function getAlarm(user_id, alarmList, setAlarmList){
  try{
    const response = await axios.get(`http://localhost:8000/api/v1/reminders/list/${user_id}`);
    console.log('알림 조회 성공 :',response.data);
    setAlarmList(response.data);
    console.log('알람 리스트:',alarmList);
  }
  catch(err){
    console.error('알림 조회 실패 :',err);
  }
}
//알림 유무 조회
export async function isAlarm(user_id,setIsAlarm){
  try{
    const response = await axios.get(`http://localhost:8000/api/v1/reminders/status/${user_id}`);
    setIsAlarm(response.data);
    console.log('알람 유무 조회 성공 :',response.data);
  }
  catch(err){
    console.error('알림 조회 실패 :',err);
  }
}

//해당 알림 삭제
export async function deleteAlarm(user_id,reminder_id,setAlarmList){
  try{
    //알람 삭제 요청
    await axios.delete(`http://localhost:8000/api/v1/reminders/${reminder_id}`);
    const response = await axios.get(`http://localhost:8000/api/v1/reminders/list/${user_id}`);
    setAlarmList(response.data);

    console.log('알림개별삭제 성공 :',response.data);
  }
  catch(err){
    console.error('알림개별삭제 실패 :',err);
  }
}

//알림 확인
export async function checkAlarm(user_id,setIsAlarm){
  try{

    //알림확인 요청
    await axios.delete(`http://localhost:8000/api/v1/reminders/status/${user_id}`);
    const response = await axios.get(`http://localhost:8000/api/v1/reminders/status/${user_id}`);
    setIsAlarm(response.data);

    console.log('알림확인 성공', response.data);
  } catch (err) {
    console.error('알림확인실패 :', err);
  }
}

export default function alarmpage() {
  const { alarmList, setAlarmList } = alarmStoare();
  const { setIsAlarm } = isAlarmStoare();
  const [page, setPage] = useState(1); // 페이지 번호 초기값
  const [ref, inView] = useInView();
  const { userId } = userIdStore();

  const loadMoreData = () => {
    //setNotificationData((prev) => [...prev, ...newData]);
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {

    checkAlarm(userId,setIsAlarm);

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
        {alarmList.map((alarm) => (
          <NotificationItem key={alarm.id} notification={alarm} />
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
