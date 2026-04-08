import { useState } from 'react';
import React from 'react';

const Home = () => {
  const [view, setView] = useState('detail');
  const productList = [
    { id: 1, name: '20인치 모니터', price: 100000 },
    { id: 2, name: '24인치 모니터', price: 200000 },
    { id: 3, name: '32인치 모니터', price: 300000 },
  ];
  return (
    <div>
      <h1>상품 페이지</h1>
      <div>
        <button onClick={() => setView('detail')}>상품 상세</button>
        <button onClick={() => setView('related')}>관련 상품</button>
      </div>
      {view === 'detail' && (
        <div>
          <h2>세로 모니터</h2>
          <p>가로 세로 토글이 되는 디자인</p>
          <h3>323,000</h3>
        </div>
      )}
      {view === 'related' && (
        <div>
          <h2>관련 상품 목록</h2>
          <ul>
            {productList.map((item) => (
              <li key={item.id}>
                {item.name} - {item.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
