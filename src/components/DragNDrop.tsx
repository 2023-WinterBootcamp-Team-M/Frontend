import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import React from 'react';
import { useRef } from 'react';
import ToolTip from './ToolTip';
import axios from 'axios';

const DndContainer = ({ post, setPost }: any) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  //드래그가 끝났을 때 호출되어 드래그가 끝났을때의 결과 저장
  const handleChange = (result: any) => {
    if (!result.destination) return;
    const items = [...post];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPost(items);
  };

  // 북마크 삭제
  const handleBookmarkDelete = async (bookmark_id: number, folder_id:number) => {

    try {
      await axios.delete(`http://localhost:8000/api/v1/bookmarks/${folder_id}/${bookmark_id}`);
      // 성공적으로 삭제된 북마크를 UI에서 즉시 제거합니다.
      setPost((prevPost: any) => prevPost.filter((bookmark: any) => bookmark.id !== bookmark_id));

      // 삭제 요청을 보냅니다.
    } catch (error) {
      console.error('북마크 삭제 중 오류 발생:', error);
    }
  };

  // 북마크 수정
  const handleBookmarkEdit = async (bookmark,folder_id:number ,bookmark_Id: number) => {
    const jsonData = {
      "data" : bookmark,
      "folder_id" : folder_id,
      "bookmark_id" : bookmark_Id
    }
    await axios.patch(`http://localhost:8000/api/v1/bookmarks/${folder_id}/${bookmark_Id}`,jsonData,{
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(`Editing bookmark: ${bookmark_Id}`);
  };

  //북마크 즐겨찾기 추가
  const patchFavorite = async (bookmark_Id:number) => {
    try {
    const response = await axios.patch(`http://localhost:8000/api/v1/favorite/${bookmark_Id}`);
    console.log('북마크 즐겨찾기 성공 :',response.data);
    } catch (err) {
      console.error('북마크 즐겨찾기 실패 :',err);
    }
  }

  return (
    <DragDropContext onDragEnd={handleChange}>
      <Droppable droppableId="cardlists">
        {(provided) => (
          <div className="cardlits" {...provided.droppableProps} ref={provided.innerRef}>
            {post?.map((e: any, i: number) => (
              <Draggable draggableId={`test-${e.id}`} index={i} key={`test-${e.id}`}>
                {(provided, snapshot) => {
                  return (
                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                      {/* 원하는 컴포넌트 */}
                      <div
                        ref={popoverRef}
                        className="mx-auto w-[90%] h-fit bg-cliptab-blue rounded-md shadow-xl mb-2 px-2 py-1"
                        role="tooltip"
                      >
                        {
                          <li key={e.id} className="flex items-center">
                            <img className="w-4 h-4 mr-2" src={e.icon} alt="Bookmark Icon" />
                            <ToolTip title={e.short_summary}>
                              <a href={e.url}>{e.name}</a>
                            </ToolTip>
                            <button onClick={()=>patchFavorite(e.id)}>
                              즐겨찾기
                            </button>
                            <button
                              onClick={() => handleBookmarkEdit(e,e.folder_id,e.id)}
                              className="ml-auto text-blue-700 hover:text-red-700 focus:outline-none"
                            >
                              수정
                            </button>
                            <button
                              onClick={() => handleBookmarkDelete(e.id,e.folder_id)}
                              className="ml-auto text-red-700 hover:text-red-700 focus:outline-none"
                            >
                              삭제
                            </button>
                          </li>
                        }
                      </div>
                      {/* 원하는 컴포넌트 */}
                    </div>
                  );
                }}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DndContainer;
