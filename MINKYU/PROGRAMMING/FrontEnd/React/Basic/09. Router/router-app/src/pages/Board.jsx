import React from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
const Board = () => {
  const { id } = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const category = query.get('category');
  const option = query.get('option');

  return (
    <>
      <h1>게시판</h1>
      <h3>게시글 id : {id}</h3>
      <h3>파라미터 category : {category}</h3>
      <h3>파라미터 option : {option}</h3>
      <Link to="/">Home</Link>
    </>
  );
};

export default Board;
