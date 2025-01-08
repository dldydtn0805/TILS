// LandingPage.tsx
import React from 'react';
import { useEffect, useRouter } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
// stores
import boardStore from '../../stores/boardStore.ts';
import articleStore from '../../stores/articleStore.ts';
// libraries
import axios from 'axios';

function BoardPage() {
  const { articles, setArticles } = articleStore();
  const { boardId } = useParams();
  const location = useLocation();
  const board = location.state;
  const navigate = useNavigate();
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
      console.log(articlesData);
      setArticles(articlesData);
      // console.log(response.data.articles);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    console.log(boardId);
    console.log(board);
    fetchArticles();
  }, [board, boardId]);

  const handleArticleClick = (article: any) => {
    navigate(`/board/${boardId}/article/${article._id}`, { state: article });
  };

  return (
    <div>
      <div>
        <p>{board.title}</p>
        <p>{board.description}</p>
      </div>
      <div>
        {articles.length > 0 ? (
          articles.map((article) => (
            <div key={article._id} onClick={() => handleArticleClick(article)}>
              {article.title}
            </div> // 괄호를 사용하여 JSX 반환
          ))
        ) : (
          <div>없음</div>
        )}
      </div>
    </div>
  );
}

export default BoardPage;
