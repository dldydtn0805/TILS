import '../../css/Project.css';
import { healthScheduleStackSet } from '../../datas/HealthSchedule';
import StacksAccordion from './StacksAccordion';

function HealthSchedule() {
  return (
    <div className="project-container">
      <div className="project-title">
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/project/healthscedule/logo.png`}
          alt="헬스케줄 Logo"
        />
        <div className="project-info">
          <h2>헬스케줄(Health's Schedule)</h2>
          <div>
            <p>헬스장을 가고 싶지만, 고인물들의 관심이 무서운 사람</p>
            <p>사용하고 싶은 기구를 독점하고 있는 사람들이 싫은 사람</p>
            <p>헬스장에 가기 전, 미리 헬스장 이용 현황을 확인하고 싶은 사람</p>
            <p>본인이 한 운동 기록을 저장하고 싶은 사람</p>
            <p>헬스장 경험이 없어 운동 루틴을 추천받고 싶은 사람</p>
            <p>
              헬스장 이용이 늘어나고 있는 요즘, 많은 "헬린이"들을 위한 운동 기구
              예약 및 운동 기록 측정 서비스, 헬스케줄(Health's Schedule)에 대한
              소개입니다!
            </p>
          </div>
        </div>
      </div>
      <div className="project-tech-stack">
        <h4>사용한 기술 스택</h4>
        <StacksAccordion stackSet={healthScheduleStackSet}></StacksAccordion>
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
}

export default HealthSchedule;