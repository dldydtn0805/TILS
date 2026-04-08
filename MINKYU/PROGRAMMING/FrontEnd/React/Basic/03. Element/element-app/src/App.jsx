import './App.css';
import React, { Component } from 'react';

class App extends Component {
  render() {
    // react 엘리먼트 생성
    // react js로
    const link = React.createElement(
      'a',
      {
        href: 'http://www.google.com',
        target: '_blank',
        style: {
          color: 'blue',
        },
      },
      '구글 사이트 바로 가기',
    );

    const box = React.createElement(
      'div',
      {
        className: 'box',
      },
      'Box',
    );

    const element1 = React.createElement(
      'div',
      null,
      React.createElement('h1', null, 'Hello Element'),
      React.createElement('p', null, 'This is an Element'),
      link,
      box,
    );

    // js로 엘리먼트 생성
    const element2 = (
      <div>
        <h1>Hello Element</h1>
        <p>This is an Element</p>
        <a
          href="http://www.google.com"
          target="_blank"
          style={{ color: 'red' }}
        >
          구글 사이트 바로 가기
        </a>
        <div className="box">Box</div>
      </div>
    );
    return element2;
  }
}

export default App;
