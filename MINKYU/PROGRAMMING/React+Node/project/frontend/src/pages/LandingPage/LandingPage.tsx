// LandingPage.tsx
import React, { useEffect } from 'react';
// stores
import boardStore from '../../stores/boardStore.ts';
// libraries
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const { boards, setBoards } = boardStore();
  const navigate = useNavigate();
  const onBoardsHandler = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/boards');
      console.log(response.data.boards);
      const boardsData = response.data.boards.map((board: any) => ({
        _id: board._id,
        title: board.title,
        description: board.description, // 오타 수정: "descrition" -> "description"
        createdAt: new Date(board.createdAt),
        updatedAt: new Date(board.updatedAt),
      }));
      setBoards(boardsData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    onBoardsHandler();
  }, []);

  const handleBoardClick = (board: any) => {
    navigate(`/board/${board._id}`, { state: board });
  };
  return (
    <div>
      {boards.length > 0 ? ( // boards가 비어있지 않은지 확인
        boards.map((board) => (
          <div key={board._id} onClick={() => handleBoardClick(board)}>
            {board.title}
          </div> // JSX 반환
        ))
      ) : (
        <p>보드 정보가 없습니다.</p> // boards가 비어있을 때 메시지 표시
      )}
    </div>
  );
}

export default LandingPage;
