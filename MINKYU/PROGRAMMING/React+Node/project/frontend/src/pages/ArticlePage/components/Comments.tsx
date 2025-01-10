import React from 'react';
import { useEffect, useState } from 'react';
// css
import '../css/Comments.css';

// libraries
import axios from 'axios';
function Comments({ articleId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const token = localStorage.getItem('token');
  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/comments/${articleId}`
      );
      // console.log(response.data.comments);
      setComments(response.data.comments);
    } catch (error) {
      console.error(error);
    }
  };
  // 댓글 핸들러
  const onContentHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.currentTarget.value);
  };
  // 댓글 작성 핸들러
  const onSubmitHandler = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (content) {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/comments/${articleId}`,
          {
            content: content,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        alert('댓글 등록 성공!');
        fetchComments();
        setContent('');
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    } else {
      alert('댓글 내용을 입력해 주세요.');
    }
  };
  useEffect(() => {
    fetchComments();
  }, [articleId]);
  return (
    <div className="comments-container">
      <h2>댓글</h2>
      <div>
        <form className="comment-form" action="">
          <label htmlFor=""></label>
          <input
            className="comment-input"
            type="content"
            value={content}
            onChange={onContentHandler}
            placeholder="댓글을 입력하세요."
          />
          <button className="comment-button" onClick={onSubmitHandler}>
            댓글 등록
          </button>
        </form>
      </div>
      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map((comment: any) => (
            <div className="comment-item" key={comment._id}>
              {comment.content}
            </div>
          ))
        ) : (
          <div className="no-comments">댓글이 없습니다.</div>
        )}
      </div>
    </div>
  );
}
export default Comments;
