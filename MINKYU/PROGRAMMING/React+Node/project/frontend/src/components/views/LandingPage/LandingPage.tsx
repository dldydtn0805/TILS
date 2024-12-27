// LandingPage.tsx
import React, { useEffect } from 'react';
// libraries
import axios from 'axios';

function LandingPage() {
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/hello') // 백엔드 주소로 요청
      .then((response) => console.log(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  return (
    <div>
      <h1>랜딩 페이지 입니다.</h1>
    </div>
  );
}

export default LandingPage;
