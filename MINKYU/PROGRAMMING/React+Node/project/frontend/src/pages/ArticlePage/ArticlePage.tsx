// LandingPage.tsx
import React from 'react';
import { useState, useEffect, useRouter } from 'react';
import { useParams, useLocation } from 'react-router-dom';

// stores
import userStore from '../../stores/userStore.ts';
import boardStore from '../../stores/boardStore.ts';
import articleStore from '../../stores/articleStore.ts';
// libraries
import axios from 'axios';

function ArticlePage() {
  const { user } = userStore();
  const { boardId, articleId } = useParams();
  // console.log()
  const location = useLocation();
  const article = location.state;

  const [articleUser, setArticleUser] = useState('');
  const [isLike, setIsLike] = useState(false);
  // console.log(article);
  // const onLikeHandler =

  const findArticleUser = async (userId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/${userId}`
      );
      console.log('response: ', response.data);
      setArticleUser(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };
  // const checkLike = async () => {
  //   const userId = user._id;
  //   try {
  //     const response = await axios.get(`http://localhost:5000/api/articlelikes/${articleId}/${userId}`)

  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  useEffect(() => {
    findArticleUser(article.user_id);
  }, [articleId]);
  return (
    <div>
      <div>
        <p>
          {article.title} ({articleUser.name})
        </p>
        <p>게시글 작성 시간 : {article.createdAt.toLocaleString()}</p>
        <p>최근 수정 시간 : {article.updatedAt.toLocaleString()}</p>
      </div>
      <div>{article.content}</div>
    </div>
  );
}

export default ArticlePage;
