import '../../css/Project.css';

import { zigeumStackSet, zigeumMain, zigeumDetail } from '../../datas/Zegium';
import StacksAccordion from './StacksAccordion';
import Main from './Main';
import Detail from './Detail';
const Zigeum = () => {
  return (
    <div className="project-container">
      <h2>지금이니?!(Zigeum)</h2>
      <div className="project-title">
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/project/zigeum/logo.png`}
          alt="지금이니 Logo"
        />
        <div className="project-info">
          <p>주식 투자를 해 보고 싶지만 경험이 없는 사람</p>
          <p>시드머니가 부족하여 주식 투자가 두려운 사람</p>
          <p>주식 투자에 앞서 주식 관련 공부를 해보고 싶은 사람</p>
          <p>
            다시 말해, 주린이들을 위한 모의 주식 투자 게임 서비스 웹
            애플리케이션 "지금이니?!"를 소개합니다!
          </p>
        </div>
      </div>
      <div className="project project-stack">
        <h4>사용한 기술 스택</h4>
        <StacksAccordion stackSet={zigeumStackSet}></StacksAccordion>
      </div>
      <div className="project project-main">
        <h4>메인 화면</h4>
        <Main main={zigeumMain}></Main>
      </div>
      <div className="project project-detail">
        <h4>프로젝트 세부 사항</h4>
        <Detail detail={zigeumDetail}></Detail>
      </div>
      <div className="project project-my-work">
        <h4>내가 구현한 기능</h4>
      </div>
      <div className="project project-challenges">
        <h4>도전과제 및 배운 점</h4>
      </div>
    </div>
  );
};

export default Zigeum;
