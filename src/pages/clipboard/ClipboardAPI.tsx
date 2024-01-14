import axios from "axios";
import { saveAs } from "file-saver";
  
//클립보드 생성
export async function CreateClipboard(event,userId:number,setClipboardId,setClipImages,link:string) {
    event.preventDefault();
    const clipform = {"user_id":userId, "url": link};
    const response = await axios.post(`http://localhost:8000/api/v1/clipboard`,clipform,{
        headers: {
            'Content-Type' : 'application/json'
        }
    });
    console.log(response.data);
    setClipboardId(response.data.id);
    setClipImages(response.data.images_list);
}
//클립보드 리스트 조회
export async function GetClipboardList(event,clipboardId:number) {
    event.preventDefault();
    const response = await axios.get(`http://localhost:8000/api/v1/clipboard/${clipboardId}`);
    console.log(response.data);
}
//클립보드 이미지 개별삭제
export async function DeleteImage(event,clipboardId, pictureId,setClipImages){
    event.preventDefault();
    const response = await axios.delete(`http://localhost:8000/api/v1/clipboard/${clipboardId}/${pictureId}`);
    console.log(response.data);
    setClipImages((prevImages) => prevImages.filter((image) => image.id !== pictureId));
}
//클립보드 이미지 전체 삭제
export async function DeleteAllImages(event,clipboardId,setClipImages){
    event.preventDefault();
    const response = await axios.delete(`http://localhost:8000/api/v1/clipboard/${clipboardId}/images`);
    setClipImages(response.data.images_list);
    console.log(response.data);
}
//클립보드 이미지 다운로드
export async function DownloadImage(event,imgUrl:string){
    event.preventDefault();
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
