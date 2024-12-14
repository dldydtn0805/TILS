import '../../css/Project.css';
import { makjaStackSet } from '../../datas/Makja';
import StacksAccordion from './StacksAccordion';
const Makja = () => {
  return (
    <div className="project-container">
      <div className="project-title">
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/project/makja/logo.png`}
          alt="막자 Logo"
        />
        <div className="project-info">
          <h2>막자(Makja)</h2>
          <div>
            <p>기존의 단순한 디펜스 게임에서 벗어나고 싶은 사람</p>
            <p>다양한 옵션을 통해 디펜스 게임을 즐기고 싶은 사람</p>
            <p>3D로 구현된 게임을 즐기고 싶은 사람</p>
            <p>
              다양한 유저들과의 기록 경쟁을 통해 순위권을 차지하고 싶은 사람
            </p>
            <p>디펜스 게임 속에 직접 참여하여 플레이 하고 싶은 사람</p>
            <p>
              다양한 디펜스 게임이 출시되는 가운데, 직접 포탑을 설치하거나
              본인의 레벨, 무기를 업그레이드하며 1인칭 3D로 즐길 수 있는 새로운
              디펜스 게임, 막자(Makja)를 소개합니다!
            </p>
          </div>
        </div>
      </div>
      <div className="project-tech-stack">
        <h4>사용한 기술 스택</h4>
        <StacksAccordion stackSet={makjaStackSet}></StacksAccordion>
      </div>
      <div className="project-main-content">
        <h4>주요 기능</h4>
      </div>
      <div className="project-my-work">
        <h4>내가 구현한 기능</h4>
      </div>
      <div className="project-challenges">
        <h4>도전과제 및 배운 점</h4>
      </div>
    </div>
  );
};

export default Makja;
