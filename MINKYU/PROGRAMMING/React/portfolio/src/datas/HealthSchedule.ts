import { stackType, stackSetType, mainType, detailType } from './Projects';

// 헬스케줄 사용 기술 스택
const healthScheduleStackSet: stackSetType[] = [
  {
    name: 'BackEnd',
    stacks: [
      {
        name: 'ERD Cloud',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/erdcloud.png`,
        description: 'DB 설계를 위한 클라우드 기반 도구',
        application: ['DB 모델링'],
      },
      {
        name: 'Node.js',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/nodejs.png`,
        description: 'Server Side Application 개발을 위한 JavaScript 런타임',
        application: [
          'RESTful API 개발',
          '실시간 데이터 처리',
          'Serverless 애플리케이션',
        ],
      },
      {
        name: 'Express',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/express.png`,
        description:
          'Node.js를 위한 빠르고 유연한 웹 서버 구축 지원 프레임워크',
        application: ['웹 애플리케이션 개발', 'API 서버 구축'],
      },
    ],
  },
  {
    name: 'FrontEnd',
    stacks: [
      {
        name: 'React',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/react.png`,
        description: 'User Interface 구축을 위한 JavaScript 라이브러리',
        application: [
          'Single Page Application 개발',
          '컴포넌트 기반의 UI 구축',
        ],
      },
      {
        name: 'Zustand',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/zustand.png`,
        description: 'React 프로젝트의 상태 관리를 위한 유연한 라이브러리',
        application: ['전역 상태 관리', '비동기 데이터 처리'],
      },
    ],
  },
  {
    name: 'Embedded',
    stacks: [
      {
        name: 'RFID',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/rfid.png`,
        description: '무선 주파수를 이용한 데이터 전송 기술',
        application: ['예약한 운동 기구 태깅', '운동 기구 사용 후 태깅'],
      },
      {
        name: 'Gyro Sensor',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/gyrosensor.png`,
        description: '물체의 각속도 값을 이용하는 센서',
        application: ['운동 횟수 측정'],
      },
      {
        name: 'E-paper',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/epaper.png`,
        description: '전기 소모 없이 반사광을 활용한 디스플레이 기술',
        application: ['회원이 예약한 기구 정보 확인'],
      },
      {
        name: 'Raspberry Pi',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/rasbperrypi.png`,
        description: '저전력의 소형 컴퓨터',
        application: [
          '예약 정보 E-paper에 전달',
          '자이로 센서에 저장된 운동 기록 저장',
        ],
      },
    ],
  },
  {
    name: 'Data',
    stacks: [
      {
        name: 'MySQL',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/mysql.png`,
        description: '오픈 소스 RDBMS',
        application: ['회원, 기구 등 다양한 데이터 저장'],
      },
      {
        name: 'Redis',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/redis.png`,
        description:
          '메모리 기반의 빠른 데이터 접근을 위한 key - value 데이터 저장소',
        application: ['운동기구별 예약 현황 저장'],
      },
    ],
  },
  {
    name: 'Collaboration',
    stacks: [
      {
        name: 'Git',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/git.png`,
        description: '코드 변경 사항 추적 및 협업을 위한 분산 버전 관리 시스템',
        application: ['담당 개발 branch 별 커밋 현황 확인', '분산 - 병합'],
      },
      {
        name: 'Notion',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/notion.png`,
        description: '프로젝트 전체 관리를 위한 협업 도구',
        application: [
          '전체 일정 관리',
          '팀원 정보, 팀 룰, 각 링크 등 메모장 역할',
          '프로젝트 산출물 관리',
        ],
      },
      {
        name: 'Jira',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/jira.png`,
        description: 'Agile 방법론을 활용하기 위한 SW 개발 프로젝트 관리 도구',
        application: ['주 단위 스프린트 계획', '이슈 관리'],
      },
    ],
  },
  {
    name: 'Design',
    stacks: [
      {
        name: 'Figma',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/figma.png`,
        description: 'UI/UX 디자인 및 프로토타이핑 지원 디자인 도구',
        application: ['기획 단계 웹 애플리케이션 UI 디자인'],
      },
    ],
  },
  {
    name: 'Cloud',
    stacks: [
      {
        name: 'Amazon EC2',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/amazon.png`,
        description: '유연한 컴퓨팅 용량을 제공하는 AWS의 가상 서버 서비스',
        application: ['웹 서버 호스팅', '애플리케이션 배포'],
      },
    ],
  },
  {
    name: 'Deployment',
    stacks: [
      {
        name: 'Docker',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/docker.png`,
        description: '컨테이너 기반의 애플리케이션 배포 및 관리 플랫폼',
        application: ['개발 및 배포 환경 통합'],
      },
      {
        name: 'Jenkins',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/jenkins.png`,
        description: '자동화된 빌드 및 배포 지원을 위한 오픈 소스 CI/CD 도구',
        application: ['테스트 자동화', '지속적인 통합 및 배포'],
      },
    ],
  },
  {
    name: 'DevOps',
    stacks: [
      {
        name: 'Nginx',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/nginx.png`,
        description: '리버스 프록시 서버로 활용하기 위한 오픈 소스 웹 서버',
        application: ['로드 밸런싱', '리버스 프록시 설정'],
      },
    ],
  },
];

// 헬스케줄 주요 기능
const healthScheduleMain: mainType[] = [
  {
    name: '이름1',
    image: '경로1',
    description: '설명1',
  },
  {
    name: '이름2',
    image: '경로2',
    description: '설명1',
  },
  {
    name: '이름3',
    image: '경로3',
    description: '설명1',
  },
  {
    name: '이름4',
    image: '경로4',
    description: '설명1',
  },
];

// 헬스케줄 세부 기획 및 개발
const healthScheduleDetail: detailType[] = [
  {
    name: '기능 명세서',
    video: `${process.env.PUBLIC_URL}/assets/images/project/healthschedule/detail/functionspecification.mp4`,
  },
  {
    name: 'ERD',
    image: `${process.env.PUBLIC_URL}/assets/images/project/healthschedule/detail/erd.png`,
  },
  {
    name: '웹 화면(피그마)',
    image: `${process.env.PUBLIC_URL}/assets/images/project/healthschedule/detail/figma-web.png`,
  },
  {
    name: '키오스크 화면(피그마)',
    image: `${process.env.PUBLIC_URL}/assets/images/project/healthschedule/detail/figma-kiosk.png`,
  },
  {
    name: '아키텍처',
    image: `${process.env.PUBLIC_URL}/assets/images/project/healthschedule/detail/architecture.png`,
  },
  {
    name: 'API',
    image: `${process.env.PUBLIC_URL}/assets/images/project/healthschedule/detail/api.png`,
  },
  {
    name: 'UCC',
    video: `${process.env.PUBLIC_URL}/assets/images/project/healthschedule/detail/ucc.mp4`,
  },
];
export { healthScheduleStackSet, healthScheduleMain, healthScheduleDetail };
