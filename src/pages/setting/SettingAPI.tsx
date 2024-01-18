import axios from "axios";

export async function GetSetting(user_id:number|null){
    try {
    const response = await axios.get(`http://localhost:8000/api/v1/options/${user_id}`);
    console.log(response.data);
    } catch(error) {
        console.error('설정 조회 실패:',error.message);
    }
}

export async function PutSetting (user_id:number|null,opt_sum:number,opt_start:number,opt_theme:number,opt_alarm:number){
    try {
        const jsonFrom = {
            "accountid": user_id,
            "summarizeoption": opt_sum,
            "startupoption": opt_start,
            "themeoption": opt_theme,            
            "bookmarkalertoption": opt_alarm
            }
        const response = await axios.put(`http://localhost:8000/api/v1/options`,jsonFrom,{
            headers: {
                'Content-Type' : 'application/json'
            }
        });
    console.log(response.data);
    } catch(error) {
        console.error('설정 조회 실패:',error.message);
    }
}

export async function PutProfile(updatedEmail,updatedPassword,updatedName) {
    try {
        const jsonForm = {
            "email": updatedEmail,
            "password": updatedPassword,
            "user_name": updatedName
        };
        const response = await axios.put('http://localhost:8000/api/v1/profile',jsonForm,{
            headers: {
                'Content-Type' : 'application/json'
            }
        });
        console.log('유저 정보 수정:',response.data);
    } catch(error) {
        console.error('유저 정보 수정 실패',error.message);
    }
}