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

  //북마크 즐겨찾기 추가 및 제거 로직
  const patchFavorite = async (bookmark_Id: number) => {
    try {
      const response = await axios.patch(`http://localhost:8000/api/v1/favorite/${bookmark_Id}`);
      console.log('북마크 즐겨찾기 성공 :', response.data);
      setPost((prevPost) => prevPost.map((b) => (b.id === bookmark_Id ? { ...b, isFavorite: !b.isFavorite } : b)));
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
              <Draggable draggableId={`bookmark-${e.id}`} index={i} key={e.id}>
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
                          <li key={e.id} className="flex items-center ml-2">
                            <div>
                              <ToolTip title={opt_sum ? e.short_summary : e.long_summary}>
                                <div>
                                  <div className="flex items-center -mb-4">
                                    <img className="w-4 h-4 mr-2 ml-1" src={e.icon} alt="Bookmark Icon" />
                                    <a href={e.url} className="mr-1">
                                      {e.name}
                                    </a>
                                    <img
                                      src={
                                        e.isFavorite
                                          ? 'https://i.ibb.co/5LQSpts/star.png'
                                          : 'https://i.ibb.co/L0nwsr3/Group-1000002328.png'
                                      }
                                      className="ml-1 mb-1 focus:outline-none w-4 h-4"
                                      onClick={async () => {
                                        await patchFavorite(e.id);
                                        fetch();
                                      }}
                                    />
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <a href={e.url} className="underline text-gray-700">
                                      {e.url.length > 30 ? `${e.url.slice(0, 30)}...` : e.url}
                                    </a>
                                    <div className="flex items-center ml-4">
                                      <img
                                        src="https://i.ibb.co/4KDg9K1/edit-02.png"
                                        onClick={() => {
                                          setBookmarkName(e.name);
                                          setBookmarkUrl(e.url);
                                          setIsEditBookmak(true);
                                        }}
                                        className="ml-2 focus:outline-none w-5 h-5"
                                      />
                                      <img
                                        className="ml-2 focus:outline-none w-5 h-5"
                                        src="https://i.ibb.co/sFMqmQf/delete-2.png"
                                        onClick={() => handleBookmarkDelete(e.id, e.folder_id)}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </ToolTip>
                            </div>
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
