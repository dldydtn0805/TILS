// LandingPage.tsx
import React from 'react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// libraries
import axios from 'axios';

function ArticleWritePage() {
  const { boardId } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const onTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };
  const onContentHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.currentTarget.value);
  };

  const onSubmitHandler = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (!title || !content) {
      alert('제목 또는 내용을 입력해 주세요.');
    } else {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('로그인 후 이용해 주세요.');
        navigate('/login');
      } else {
        try {
          const response = await axios.post(
            'http://localhost:5000/api/articles',
            { title: title, content: content, board_id: boardId },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          alert('게시글 등록에 성공했습니다!');
          console.log(response.data);
          navigate(`/board/${boardId}`);
        } catch (error) {
          console.error(error);
          alert(error.message);
        }
      }
    }
  };

  return (
    <div>
      <form className="form" action="">
        <label htmlFor="">제목</label>
        <div>
          <input type="title" value={title} onChange={onTitleHandler} />
        </div>

        <label htmlFor="">내용</label>
        <div>
          <input type="content" value={content} onChange={onContentHandler} />
        </div>
        <br />
        <button onClick={onSubmitHandler}>게시글 등록!</button>
      </form>
    </div>
  );
}

export default ArticleWritePage;
