import axios from "axios";

export async function GetSetting(user_id:number|null){
    try {
    const response = await axios.get(`http://localhost:8000/api/v1/setting/${user_id}`);
    console.log(response.data);
    } catch(error) {
        console.error('설정 조회 실패:',error.message);
    }
}

export async function PutSetting (user_id:number|null,opt_sum?:number|null,opt_start?:number|null,opt_theme?:number|null,opt_alarm?:number|null){
    try {
        const jsonFrom = {
            "accountid": user_id,
            "summarizeoption": opt_sum,
            "startupoption": opt_start,
            "themeoption": opt_theme,            
            "bookmarkalertoption": opt_alarm
            }
    const response = await axios.put(`http://localhost:8000/api/v1/setting/edit`,jsonFrom,{
        headers: {
            'Content-Type' : 'application/json'
        }
    });
    console.log(response.data);
    } catch(error) {
        console.error('설정 조회 실패:',error.message);
    }
}