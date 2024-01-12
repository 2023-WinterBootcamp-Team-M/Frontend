import axios from "axios";
import { saveAs } from "file-saver";
  
//클립보드 생성
export async function CreateClipboard(event,userId:number,clipboardId:number,link:string) {
    event.preventDefault();
    const clipform = {"user_id":userId, "clipboard_id":clipboardId, "link": link};
    const response = await axios.post(`http://localhost:8000/api/v1/clipboard`,clipform,{
        headers: {
            'Content-Type' : 'application/json'
        }
    });
    console.log(response.data);
}
//클립보드 리스트 조회
export async function GetClipboardList(event,clipboardId:number) {
    event.preventDefault();
    const response = await axios.get(`http://localhost:8000/api/v1/clipboard/${clipboardId}`);
    console.log(response.data);
}
//클립보드 이미지 개별삭제
export async function DeleteImage(event,clipboardId:number, pictureId:number){
    event.preventDefault();
    const response = await axios.delete(`http://localhost:8000/api/v1/clipboard/${clipboardId}/${pictureId}`);
    console.log(response.data);
}
//클립보드 이미지 전체 삭제
export async function DeleteAllImages(event,clipboardId:number){
    event.preventDefault();
    const response = await axios.delete(`http://localhost:8000/api/v1/clipboard/${clipboardId}/images`);
    console.log(response.data);
}
//클립보드 이미지 다운로드
export async function DownloadImage(event,imgUrl:string){
  event.preventDefault();
    // 서버에서 이미지 URL을 받아오는 요청을 보냅니다.
    // const response = await fetch('/api/getImageURL');

    console.log(imgUrl);
    // 받아온 이미지 URL을 사용하여 이미지를 Blob으로 다운로드합니다.
    if (imgUrl) {
      const fileName = `${imgUrl}.jpg`;

      fetch(imgUrl)
        .then(response => response.blob())
        .then(blob => {
          // FileSaver.js를 사용하여 Blob을 파일로 다운로드합니다.
          saveAs(blob, fileName);
        });
    } else {
      console.error('Failed to fetch image URL from the server.');
    }
}