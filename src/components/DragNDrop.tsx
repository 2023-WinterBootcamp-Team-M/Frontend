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

  const handleBookmarkDelete = async (bookmarkId: number) => {
    await axios.delete(`http://localhost:8000/api/v1/bookmarks/{folder_id}/{bookmark_id}`);
    console.log(`Deleting bookmark: ${bookmarkId}`);
  };

  const handleBookmarkEdit = (bookmarkId: number) => {
    // 북마크 수정 로직
    console.log(`Editing bookmark: ${bookmarkId}`);
  };

  return (
    <DragDropContext onDragEnd={handleChange}>
      <Droppable droppableId="cardlists">
        {(provided) => (
          <div className="cardlits" {...provided.droppableProps} ref={provided.innerRef}>
            {post.map((e: any, i: number) => (
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
                            <img className="w-4 h-4 mr-2" src={e.imageUrl} alt="Bookmark Icon" />
                            <ToolTip title={e.summary}>
                              <a href={e.url}>{e.title}</a>
                            </ToolTip>
                            <button
                              onClick={() => handleBookmarkEdit(e.id)}
                              className="ml-auto text-blue-700 hover:text-red-700 focus:outline-none"
                            >
                              수정
                            </button>
                            <button
                              onClick={() => handleBookmarkDelete(e.id)}
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
