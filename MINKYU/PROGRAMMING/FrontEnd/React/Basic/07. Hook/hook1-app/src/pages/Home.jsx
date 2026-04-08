import React from 'react';
import { useState, useEffect } from 'react';
import TodoItem from '../components/TodoItem';
const Home = () => {
  // const [todos, setTodos] = useState([

  //   { id: 1, text: '리액트 복습하기', completed: false },
  //   { id: 2, text: '자바스크립트 복습하기', completed: true },
  //   { id: 3, text: 'AJAX 실습하기', completed: false },
  // ]);
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const searchedTodos = todos.filter((todo) => todo.text.includes(search));

  // todos 변경 시 마다 useEffect를 활용하여 localStorage의 todos 변경
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // 새로운 todo 추가
  const handleAdd = () => {
    if (!text.trim()) {
      alert('텍스트를 입력 후 추가해 주세요.');
      return;
    }
    const newTodos = [
      ...todos,
      { id: Date.now(), text: text, completed: false },
    ];
    setTodos(newTodos);
    setText('');
    alert('새로운 Todo가 추가되었습니다.');
  };

  // todo의 완료 여부 변경
  const handleToggle = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    setTodos(newTodos);
  };

  // todo 제거
  const handleDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;

  return (
    <div>
      <h1>Todo List 앱</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="할 일 입력"
      />
      <button onClick={() => handleAdd()}>추가</button>
      <br />
      <br />
      <input
        type="text"
        value={search}
        placeholder="검색어를 입력해 주세요."
        onChange={(e) => setSearch(e.target.value)}
      />
      <h3>
        전체 : {total} / 완료 : {completed}
      </h3>
      {searchedTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => handleToggle(todo.id)}
          onDelete={() => handleDelete(todo.id)}
        />
      ))}
    </div>
  );
};

export default Home;
