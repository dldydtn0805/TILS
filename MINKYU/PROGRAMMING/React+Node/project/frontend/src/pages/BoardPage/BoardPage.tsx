// BoardPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// stores
import articleStore from '../../stores/articleStore.ts';
// libraries
import axios from 'axios';
// css
import './css/BoardPage.css'; // CSS 파일 import

function BoardPage() {
  const { articles, setArticles } = articleStore();
  const [board, setBoard] = useState({});
  const [isDescriptionVisible, setDescriptionVisible] = useState(false); // 설명 가시성 상태
  const { boardId } = useParams();
  const navigate = useNavigate();

  const fetchBoard = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/boards/${boardId}`
      );
      setBoard(response.data.board);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/articles/filter?boardId=${boardId}`
      );
      const articlesData = response.data.articles.map((article) => ({
        _id: article._id,
        board_id: article.board_id,
        user_id: article.user_id,
        title: article.title,
        content: article.content,
        createdAt: new Date(article.createdAt),
        updatedAt: new Date(article.updatedAt),
      }));
      setArticles(articlesData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBoard();
    fetchArticles();
  }, []);

  const handleArticleClick = (article) => {
    navigate(`/board/${boardId}/article/${article._id}`, { state: article });
  };

  const handleArticleWrite = () => {
    navigate(`/board/${boardId}/write`);
  };

  const toggleDescription = () => {
    setDescriptionVisible(!isDescriptionVisible); // 설명 가시성 토글
  };

  return (
    <div className="board-container">
      <div className="board-header">
        <h2 className="board-title">{board.title}</h2>
        <div>
          <button className="write-button" onClick={handleArticleWrite}>
            글 작성
          </button>
          <button className="toggle-button" onClick={toggleDescription}>
            {isDescriptionVisible ? '-' : '+'}
          </button>
        </div>
      </div>
      {isDescriptionVisible && (
        <div className="board-description">{board.description}</div>
      )}
      <div>
        {articles.length > 0 ? (
          articles.map((article) => (
            <div
              key={article._id}
              className="article-item"
              onClick={() => handleArticleClick(article)}
            >
              {article.title}
            </div>
          ))
        ) : (
          <div>없음</div>
        )}
      </div>
    </div>
  );
}

export default BoardPage;
