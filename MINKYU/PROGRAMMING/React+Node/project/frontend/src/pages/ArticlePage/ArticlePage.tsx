// LandingPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

// stores
import userStore from '../../stores/userStore.ts';
// libraries
import axios from 'axios';
// components
import Comments from './components/Comments.tsx';
// css
import './css/ArticlePage.css';

function ArticlePage() {
  const { user } = userStore();
  const { articleId } = useParams();
  const location = useLocation();
  const article = location.state;

  const [articleUser, setArticleUser] = useState('');
  const [isLike, setIsLike] = useState(false);
  const [likes, setLikes] = useState(0);
  const [able, setAble] = useState(false);

  const findArticleUser = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/${userId}`
      );
      setArticleUser(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchArticleLikes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/articlelikes/${articleId}`
      );
      console.log(response.data.likes);
      setLikes(response.data.likes);
    } catch (error) {
      console.error(error);
    }
  };

  const checkLike = async (user_id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/articlelikes/${articleId}/${user_id}`
      );
      console.log('zzzz', response.data.isLike);
      setIsLike(response.data.isLike);
    } catch (error) {
      console.error(error);
    }
  };

  const onLikeHandler = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        await axios.post(
          `http://localhost:5000/api/articlelikes/`,
          { articleId: articleId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsLike(!isLike);
        fetchArticleLikes(); // 좋아요 개수 업데이트
      } catch (error) {
        console.error(error);
        alert('좋아요 처리 중 오류가 발생했습니다.');
      }
    }
  };
  const fetchPut = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/users/get/myinfo',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAble(response.data._id === article.user_id);
        checkLike(response.data._id);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    findArticleUser(article.user_id);
    fetchArticleLikes();
    fetchPut();
  }, [article]);

  return (
    <div className="article-container">
      <div className="article">
        <div className="article-header">
          <div className="article-title">
            <h1>{article.title}</h1>
            <span onClick={onLikeHandler}>
              {isLike ? <span>❤️</span> : <span>🤍</span>}
            </span>
            <span>{likes} Likes</span> {/* 좋아요 개수 표시 */}
            {able && (
              <span>
                <button>수정</button>
                <button>삭제</button>
              </span>
            )}
          </div>
          <div className="article-meta">
            <p className="article-author">작성자 : {articleUser.name}</p>
            <p className="article-time">
              작성시간 : {new Date(article.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="article-content">{article.content}</div>
      </div>
      <Comments articleId={articleId} />
    </div>
  );
}

export default ArticlePage;
