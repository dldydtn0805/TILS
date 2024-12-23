import {
  stackType,
  stackSetType,
  mainType,
  detailType,
  myWorkType,
} from './Projects';

const zigeumStackSet: stackSetType[] = [
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
        name: 'Web RTC',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/webrtc.png`,
        description: '웹 브라우저 간 플러그인의 도움 없이 서로 통신 가능한 API',
        application: ['a', 'b', 'c'],
      },
      {
        name: 'Web Socket',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/websocket.png`,
        description:
          '클라이언트 - 서버 사이의 지속적인 양방향 연결 스트림 생성 기술',
        application: [
          '멀티 게임 실시간 통신 채팅 기능',
          '친구의 온라인/오프라인 체크를 위한 Redis와의 연동',
          '실시간 알림 기능(친구 추가, 게임 초대, 공지사항 등)',
        ],
      },
    ],
  },
  {
    name: 'FrontEnd',
    stacks: [
      {
        name: 'Next.js',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/nextjs.png`,
        description: 'React 기반의 SSR 지원 프레임워크',
        application: ['프로젝트 프론트엔드 개발'],
      },
      {
        name: 'React Query',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/reactquery.png`,
        description:
          '서버에서 데이터를 가져오고 캐싱하며 업데이트하기 위한 데이터 관리 라이브러리',
        application: [
          '서버 데이터 캐싱',
          '게임, 펀드목록 등의 상태 자동 업데이트',
        ],
      },
      {
        name: 'Zustand',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/zustand.png`,
        description: 'React 애플리케이션에서 전역 상태 관리를 위한 라이브러리',
        application: ['전역변수 관리'],
      },
      {
        name: 'React Hook Form',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/reacthookform.png`,
        description: 'form 태그를 관리하기 위한 라이브러리',
        application: ['사용자 입력 기본값 설정', '입력값 유효성 감시'],
      },
      {
        name: 'Anychart.js',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/anychart.png`,
        description: '데이터 시각화를 위한 차트 라이브러리',
        application: [
          '인게임 데이터를 candlestick, MACD, RSI 그래프로 표현',
          '날짜 변화(턴 증가)에 따른 데이터 갱신에 의한 그래프 변화(실시간 차트 구현)',
        ],
      },
    ],
  },
  {
    name: 'Data',
    stacks: [
      {
        name: 'Hadoop',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/hadoop.png`,
        description: '대용량 데이터 분산 처리를 위한 오픈소스 프레임워크',
        application: ['주식 데이터 분석', '주식 데이터 저장', '매매 기록 저장'],
      },
      {
        name: 'Apache Spark',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/apachespark.png`,
        description:
          '빅데이터 처리를 위한 오픈소스 클러스터(Cluster) 컴퓨팅 프레임워크',
        application: ['주식 데이터 분석', '주식 데이터 저장', '매매 기록 저장'],
      },
      {
        name: 'Redis',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/redis.png`,
        description:
          '애플리케이션 캐시 또는 빠른 응답속도를 가진 DB로 사용되는 Inmemory NoSQL 저장소',
        application: [
          'JWT Token을 사용한 로그인(Refresh Token Rotation)',
          '게임 방 관련 로직 구현',
          '사용자의 온라인/오프라인 상태 관리',
        ],
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
        name: 'Amazon S3',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/amazon.png`,
        description:
          '웹 서비스를 위한 온라인 파일 저장소로 사용되는 Cloud Storage 서비스',
        application: ['커뮤니티 파일 업로드'],
      },
    ],
  },
  {
    name: 'Deployment',
    stacks: [
      {
        name: 'Docker',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/docker.png`,
        description:
          '컨테이너 기반의 애플리케이션 빌드 및 배포를 위한 오픈소스 가상 플랫폼',
        application: ['개발 환경 구축', '배포 환경 구축'],
      },
      {
        name: 'Jenkins',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/jenkins.png`,
        description: '빌드, 테스트 및 배포 자동화 서버',
        application: ['배포 환경 구축'],
      },
    ],
  },
  {
    name: 'DevOps',
    stacks: [
      {
        name: 'Nginx',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/nginx.png`,
        description:
          '리버스 프록시, 로드 밸런싱, 캐싱 등이 가능한 웹 서버 소프트웨어',
        application: ['CI/CD 파이프라인 구축'],
      },
      {
        name: 'Grafana',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/grafana.png`,
        description: '데이터 시각화를 위한 오픈소스 플랫폼',
        application: ['모니터링 시스템 구축'],
      },
      {
        name: 'Prometheus',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/prometheus.png`,
        description: '시스템 모니터링 및 경고 도구로 사용되는 오픈소스 시스템',
        application: ['모니터링 시스템 구축'],
      },
    ],
  },
];

const zigeumMain: mainType[] = [
  {
    name: '로그인',
    image: `${process.env.PUBLIC_URL}/assets/images/project/zigeum/main/01.gif`,
    description: '설명1',
  },
  {
    name: '멀티 게임 플레이',
    image: `${process.env.PUBLIC_URL}/assets/images/project/zigeum/main/02.gif`,
    description: '설명1',
  },

  {
    name: '멀티 게임 세부내용',
    image: `${process.env.PUBLIC_URL}/assets/images/project/zigeum/main/03.gif`,
    description: '설명1',
  },

  {
    name: '싱글 게임 플레이',
    image: `${process.env.PUBLIC_URL}/assets/images/project/zigeum/main/04.gif`,
    description: '설명1',
  },

  {
    name: '싱글 게임 세부내용',
    image: `${process.env.PUBLIC_URL}/assets/images/project/zigeum/main/05.gif`,
    description: '설명1',
  },
  {
    name: '싱글 게임 복기',
    image: `${process.env.PUBLIC_URL}/assets/images/project/zigeum/main/06.gif`,
    description: '설명1',
  },
  {
    name: '알림 및 친구 추가',
    image: `${process.env.PUBLIC_URL}/assets/images/project/zigeum/main/07.gif`,
    description: '설명1',
  },
  {
    name: '커뮤니티 활용',
    image: `${process.env.PUBLIC_URL}/assets/images/project/zigeum/main/08.gif`,
    description: '설명1',
  },
  {
    name: '퀴즈 게임',
    image: `${process.env.PUBLIC_URL}/assets/images/project/zigeum/main/09.gif`,
    description: '설명1',
  },
  {
    name: '펀드 개설 및 가입',
    image: `${process.env.PUBLIC_URL}/assets/images/project/zigeum/main/10.gif`,
    description: '설명1',
  },
];

const zigeumDetail: detailType[] = [
  {
    name: 'ERD',
    image: `${process.env.PUBLIC_URL}/assets/images/project/zigeum/detail/erd.png`,
  },
  {
    name: '웹 화면(피그마)',
    image: `${process.env.PUBLIC_URL}/assets/images/project/zigeum/detail/figma.png`,
  },
  {
    name: '아키텍처',
    image: `${process.env.PUBLIC_URL}/assets/images/project/zigeum/detail/architecture.png`,
  },
  {
    name: 'API',
    image: `${process.env.PUBLIC_URL}/assets/images/project/zigeum/detail/api.gif`,
  },
];

const zigeumMyWork: myWorkType[] = [
  {
    // 가장 큰 작업 단위
    epic: 'FrontEnd',
    issues: [
      {
        // 작업한 이슈 단위
        issue: '싱글 게임 화면 구현',
        tasks: [
          {
            // 1. 화면 분할
            task: '주어진 화면을 필요한 컴포넌트들로 분할',
            detail: [
              '주어진 화면에 필요한 내용들을 선정하여 적절한 크기로 나누어 분할하였다.',
              '화면 가운데 주어진 종목 별 그래프를 배치하였다.',
              '좌측에는 총평가자산 정보, 보유자산 정보, 매매내역 정보를 배치하였다.',
              '우측에는 턴 정보 및 매도/매수/건너뛰기 버튼, 종목 별 증감 정보, 해당 날짜의 시장정보 및 트렌드를 배치하였다.',
            ],
          },
          {
            // 2. 그래프 세분화
            task: '매매 결정에 필요한 차트 그래프를 세분화하여 구현',
            detail: [
              '현재 주어진 기간에 대한 정보를 통해 매매를 결정할 수 있도록 필요한 그래프들을 구현했다.',
              '기본적으로 캔들스틱(OHLC) 그래프를 상단에 배치했다.',
              '하단에는 거래량, RSI, MACD 그래프 중 한 가지 그래프를 보거나 전체를 한 번에 볼 수 있게 구현했다.',
              '최하단에 위치한 progress bar를 통해 차트 그래프의 크기를 사용자에 맞게 조절 할 수 있게끔 했다.',
            ],
          },
          {
            // 3. 단축기 설정
            task: '사용자 편의를 위한 단축키 구현',
            detail: [
              '빠르게 매매 결정을 해야 하는 주식 특성에 알맞게 단축키를 구현했다.',
              '매수, 매도, 건너뛰기를 각 단축키에 대응시켰다.',
              '매수 또는 매도 시, 매매하고자 하는 주를 직접 입력하거나 퍼센트(%)를 단축키로 선택하여 간편하게 매매 결정이 가능하다.',
              '각 종목 별 그래프를 1 ~ 10번까지의 단축키를 통해 볼 수 있다.',
            ],
          },
        ],
      },
      {
        // 작업한 이슈 단위
        issue: '멀티 게임 화면 구현',
        tasks: [
          {
            // 1.
            task: '',
            detail: [''],
          },
        ],
      },
      {
        // 작업한 이슈 단위
        issue: '싱글 게임 복기 화면 구현',
        tasks: [
          {
            // 1.
            task: '',
            detail: [''],
          },
        ],
      },

      {
        // 작업한 이슈 단위
        issue: '게시판 화면 구현',
        tasks: [
          {
            // 1.
            task: '',
            detail: [''],
          },
        ],
      },
    ],
  },
];

export { zigeumStackSet, zigeumMain, zigeumDetail };
