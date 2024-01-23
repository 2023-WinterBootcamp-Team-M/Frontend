import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import ToolTip from './ToolTip';
import axios from 'axios';
import { favoriteStore, optStore } from '../store/store';

const DndContainer = ({ post, setPost, fetch }: any) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const { opt_sum } = optStore();
  const [bookmarkName, setBookmarkName] = useState('');
  const [bookmarkUrl, setBookmarkUrl] = useState('');
  const [isEditBookmark, setIsEditBookmak] = useState(false);

  //드래그가 끝났을 때 호출되어 드래그가 끝났을때의 결과 저장
  const handleChange = (result: any) => {
    if (!result.destination) return;
    const items = [...post];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPost(items);
  };

  // 북마크 삭제
  const handleBookmarkDelete = async (bookmark_id: number, folder_id: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/bookmarks/${folder_id}/${bookmark_id}`);
      // 성공적으로 삭제된 북마크를 UI에서 즉시 제거합니다.
      setPost((prevPost: any) => prevPost.filter((bookmark: any) => bookmark.id !== bookmark_id));
      fetch();

      // 삭제 요청을 보냅니다.
    } catch (error) {
      console.error('북마크 삭제 중 오류 발생:', error);
    }
  };

  // 북마크 수정 모드 활성화

  // 북마크 수정
  const handleBookmarkEdit = async (bookmarkName, bookmarkUrl, folder_id: number, bookmark_Id: number) => {
    const jsonData = {
      name: bookmarkName,
      url: bookmarkUrl,
    };
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/bookmarks/${folder_id}/${bookmark_Id}`,
        jsonData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setPost((prevPost: any) =>
        prevPost.map((bookmark: any) =>
          bookmark.id === bookmark_Id ? { ...bookmark, name: response.data.name, url: response.data.url } : bookmark
        )
      );
      setIsEditBookmak(false);
    } catch (error) {
      console.error('북마크 수정 중 오류 발생:', error);
    }
  };

  //북마크 즐겨찾기 추가
  const patchFavorite = async (bookmark_Id: number) => {
    try {
      const response = await axios.patch(`http://localhost:8000/api/v1/favorite/${bookmark_Id}`);
      console.log('북마크 즐겨찾기 성공 :', response.data);
    } catch (err) {
      console.error('북마크 즐겨찾기 실패 :', err);
    }
  };
  useEffect(() => {}, [isEditBookmark]);

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
                      <div
                        ref={popoverRef}
                        className="mx-auto w-[90%] h-fit bg-cliptab-blue rounded-md shadow-xl mb-2 px-2 py-1"
                        role="tooltip"
                      >
                        {isEditBookmark ? (
                          <div>
                            <input
                              type="text"
                              value={bookmarkName}
                              onChange={(e) => setBookmarkName(e.target.value)}
                              placeholder={e.name}
                            />
                            <input
                              type="text"
                              value={bookmarkUrl}
                              onChange={(e) => setBookmarkUrl(e.target.value)}
                              placeholder={e.url}
                            />
                            <button onClick={() => handleBookmarkEdit(bookmarkName, bookmarkUrl, e.folder_id, e.id)}>
                              수정
                            </button>
                            <button onClick={() => setIsEditBookmak(false)}>취소</button>
                          </div>
                        ) : (
                          <li key={e.id} className="flex items-center">
                            <img className="w-4 h-4 mr-2" src={e.icon} alt="Bookmark Icon" />
                            <div>
                              <ToolTip title={opt_sum ? e.short_summary : e.long_summary}>
                                <div>
                                  <a href={e.url}>{e.name}</a>
                                  <a href={e.url} className="underline">
                                    {e.url.length > 30 ? `${e.url.slice(0, 30)}...` : e.url}
                                  </a>
                                </div>
                              </ToolTip>
                            </div>

                            <button
                              onClick={async () => {
                                await patchFavorite(e.id);
                                fetch();
                              }}
                            >
                              즐겨찾기
                            </button>
                            <button
                              onClick={() => {
                                setBookmarkName(e.name);
                                setBookmarkUrl(e.url);
                                setIsEditBookmak(true);
                              }}
                              className="ml-auto text-blue-700 hover:text-red-700 focus:outline-none"
                            >
                              수정
                            </button>
                            <button
                              onClick={() => handleBookmarkDelete(e.id, e.folder_id)}
                              className="ml-auto text-red-700 hover:text-red-700 focus:outline-none"
                            >
                              삭제
                            </button>
                          </li>
                        )}
                      </div>
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
