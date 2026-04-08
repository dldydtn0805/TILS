import React from 'react';

// 스타일을 객체로 정의하여 적용하기
const styles = {
  header: {
    padding: '20px',
    backgroundColor: 'cornflowerblue',
  },
  title: {
    color: 'white',
  },
};
const Header = () => {
  return (
    <header style={styles.header}>
      <h2 style={styles.title}>쇼핑몰 사이트</h2>
    </header>
  );
};

export default Header;
