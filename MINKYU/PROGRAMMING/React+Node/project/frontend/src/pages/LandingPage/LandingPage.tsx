// LandingPage.tsx
import React, { useEffect } from 'react';
// stores
import boardStore from '../../stores/boardStore.ts';
// libraries
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// css
import './css/LandingPage.css';
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
        description: board.description,
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
    navigate(`/board/${board._id}`);
  };

  return (
    <div className="landing-container">
      <h2 className="landing-title">게시판 보기</h2>
      {boards.length > 0 ? (
        boards.map((board) => (
          <div
            key={board._id}
            className="board-item"
            onClick={() => handleBoardClick(board)}
          >
            {board.title}
          </div>
        ))
      ) : (
        <p className="no-boards">보드 정보가 없습니다.</p>
      )}
    </div>
  );
}

export default LandingPage;
