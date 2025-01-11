import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/SearchBar.css'; // CSS 파일을 추가할 수 있음

function SearchBar() {
  const [boards, setBoards] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredBoards, setFilteredBoards] = useState([]);
  const [showFiltered, setShowFiltered] = useState(false);
  const navigate = useNavigate();

  // 존재하는 모든 게시판 데이터 불러오기
  const onBoardsHandler = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/boards/');
      setBoards(response.data.boards);
    } catch (error) {
      console.error(error);
      alert('게시판 정보를 불러오는 데 실패했습니다.');
    }
  };

  const onFilterHandler = (query: string) => {
    const normalizedQuery = query.replace(/\s+/g, ''); // 입력값에서 모든 공백 제거
    if (normalizedQuery.length > 0) {
      const filtered = boards.filter(
        (board: any) =>
          board.title
            .replace(/\s+/g, '')
            .toLowerCase()
            .includes(normalizedQuery.toLowerCase()) // 게시판 제목에서 모든 공백 제거
      );
      setFilteredBoards(filtered);
    } else {
      setFilteredBoards([]); // 입력값이 없을 경우 필터링된 결과 초기화
    }
  };
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    onFilterHandler(value);
    setShowFiltered(true);
  };
  const onToggleHandler = () => {
    setShowFiltered(!showFiltered);
  };

  // 클릭 시 navigate
  const handleBoardClick = (boardId: string) => {
    navigate(`/board/${boardId}`);
  };

  useEffect(() => {
    onBoardsHandler();
  }, []);

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={onChangeHandler}
        placeholder="게시판 이름을 검색하세요."
      />
      <button onClick={onToggleHandler}>토클</button>
      {showFiltered && (
        <div className="search-results">
          {filteredBoards.length > 0 ? (
            filteredBoards.map((board: any) => (
              <div
                key={board._id}
                className="search-result-item"
                onClick={() => handleBoardClick(board._id)}
              >
                {board.title}
              </div>
            ))
          ) : (
            <div className="no-search-result-item">
              검색어와 일치하는 게시판이 없습니다.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
