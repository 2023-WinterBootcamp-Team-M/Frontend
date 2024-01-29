import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import ToolTip from './ToolTip';
import axios from 'axios';
import { favoriteStore, optStore } from '../store/store';
import { domain } from '../domain/domain';

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
      await axios.delete(`${domain}/api/v1/bookmarks/${folder_id}/${bookmark_id}`);
      // 성공적으로 삭제된 북마크를 UI에서 즉시 제거합니다.
      setPost((prevPost: any) => prevPost.filter((bookmark: any) => bookmark.id !== bookmark_id));
      fetch();

      console.log('북마크 삭제 성공:', bookmark_id);

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
      const response = await axios.patch(`${domain}/api/v1/bookmarks/${folder_id}/${bookmark_Id}`, jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
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
      const response = await axios.patch(`${domain}/api/v1/favorite/${bookmark_Id}`);
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
                        className="mx-auto w-[90%] h-fit bg-cliptab-blue rounded-xl shadow-xl mb-2 px-2 py-1"
                        role="tooltip"
                      >
                        {isEditBookmark ? (
                          <div className='flex flex-col justify-center py-2'>
                            <div className='flex flex-row items-center w-full'>
                            <p className='text-cliptab-text text-xs mr-2'>이름</p>
                            <input
                              type="text"
                              value={bookmarkName}
                              onChange={(e) => setBookmarkName(e.target.value)}
                              placeholder={e.name}
                              className='bg-[#dfebff] border-2 border-blue-400 rounded-md px-2 py-1 text-xs w-[85%] focus:outline-[#3e95ff] text-gray-700'
                            />
                            </div>
                            <div className='flex flex-row items-center w-full'>
                            <p className='text-cliptab-text text-xs mr-2'>URL</p>             
                            <input
                              type="text"
                              value={bookmarkUrl}
                              onChange={(e) => setBookmarkUrl(e.target.value)}
                              placeholder={e.url}
                              className='bg-[#dfebff] border-2 border-blue-400 rounded-md px-2 py-1 text-xs w-[85%] focus:outline-[#3e95ff] text-gray-700'
                            />
                            </div>
                            <div className="flex w-full items-center justify-evenly mt-2">
                            <button 
                            onClick={() => handleBookmarkEdit(bookmarkName, bookmarkUrl, e.folder_id, e.id)}
                            className='bg-white text-cliptab-blue border border-cliptab-blue rounded-lg py-1 hover:opacity-90 text-sm w-[45%]'
                            >
                              수정
                            </button>
                            <button 
                            onClick={() => setIsEditBookmak(false)}
                            className='bg-white text-cliptab-blue border border-cliptab-blue rounded-lg py-1 hover:opacity-90 text-sm w-[45%]'>취소</button>
                          </div>
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
                                          ? 'https://i.ibb.co/L0nwsr3/Group-1000002328.png'
                                          : 'https://i.ibb.co/5LQSpts/star.png'
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
