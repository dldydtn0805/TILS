import React from 'react';
// React Hooks
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
// Components
import TodoItem from '../components/TodoItem';
// labraries
import { v4 as uuidv4 } from 'uuid';
import { nanoid } from 'nanoid';
const Home = () => {
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

  const inputRef = useRef(null);

  // 새로운 todo 추가
  const handleAdd = useCallback(() => {
    if (!text.trim()) {
      alert('텍스트를 입력 후 추가해 주세요.');
      return;
    }
    setTodos((prev) => [
      ...prev,
      // uuid 또는 nanoid를 활용하여 각 todo에 id값 부여
      { id: uuidv4(), text: text, completed: false },
      // { id: nanoid(), text: text, completed: false },
    ]);
    setText('');
    alert('새로운 Todo가 추가되었습니다.');
    inputRef.current.focus();
  }, [text]);

  // todo의 완료 여부 변경
  // useCallback을 활용하여 각 todo 별 완료 여부 변경
  const handleToggle = useCallback((id) => {
    // 이전 상태를 확인하여 완료 여부 체크하기
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }, []);

  // todo 제거
  const handleDelete = useCallback((id) => {
    // 이전 상태를 확인하여 완료 여부 체크
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  // useMemo를 활용한 total, completed 변수 사용
  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((todo) => todo.completed).length;

    return { total, completed };
  }, [todos]);

  return (
    <div>
      <h1>Todo List 앱</h1>
      <input
        ref={inputRef}
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
        전체 : {stats.total} / 완료 : {stats.completed}
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
