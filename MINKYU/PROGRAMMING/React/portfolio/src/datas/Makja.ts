import { stackType, stackSetType, mainType, detailType } from './Projects';

const makjaStackSet: stackSetType[] = [
  {
    name: 'BackEnd',
    stacks: [
      {
        name: 'Spring',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/spring.png`,
        description:
          '오픈소스 기반의 Java 웹 애플리케이션 개발을 위한 프레임워크',
        application: ['게임 백엔드 개발 환경 구축'],
      },
    ],
  },
  {
    name: 'Client',
    stacks: [
      {
        name: 'Unreal Engine',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/unreal.png`,
        description:
          'C++와 블루프린트를 활용한 엄격한 구조의 리얼타임 게임 엔진',
        application: ['게임 클라이언트 개발 환경 구축'],
      },
      {
        name: 'C++',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/c++.png`,
        description:
          '언리얼 엔진을 활용한 게임 개발에서 성능, 유연성, 확장성 등을 높여주는 프로그래밍 언어',
        application: [
          '게임 환경 구축',
          '캐릭터 관련(캐릭터, 캐릭터 스탯, 캐릭터 모션) 코드 생성',
          '타워 관련(타워, 타워 스탯, 타워 공격) 코드 생성',
          '적 관련(적, 적 스탯, 적 모션) 생성',
          'broadcasting 코드 작성',
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
        application: ['사용자 정보 데이터 저장', '랭킹 데이터 저장'],
      },
      {
        name: 'Redis',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/redis.png`,
        description:
          '메모리 기반의 빠른 데이터 접근을 위한 key - value 데이터 저장소',
        application: ['게임 결과 저장'],
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
      {
        name: 'Perforce',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/perforce.png`,
        description:
          '대규모 협업 프로젝트에서 활용되는 클라이언트-서버 모델의 소스 코드 관리 시스템',
        application: [
          'Pv4를 활용한 협업',
          'branch를 통한 개인 파트 개발',
          '버전 관리',
          '잠금 기능을 활용한 안전한 분업 환경 구축',
        ],
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
        application: ['기획 단계 게임 UI 디자인'],
      },
    ],
  },
];

const makjaMain: mainType[] = [
  {
    name: '로그인',
    image: `${process.env.PUBLIC_URL}/assets/images/project/makja/main/01.gif`,
    description: '설명1',
  },
  {
    name: '로그아웃',
    image: `${process.env.PUBLIC_URL}/assets/images/project/makja/main/02.gif`,
    description: '설명2',
  },
  {
    name: '회원가입',
    image: `${process.env.PUBLIC_URL}/assets/images/project/makja/main/03.gif`,
    description: '설명3',
  },
  {
    name: '플레이어 기본 이동',
    image: `${process.env.PUBLIC_URL}/assets/images/project/makja/main/04.gif`,
    description: '설명4',
  },
  {
    name: '플레이어 텔레포트 이동',
    image: `${process.env.PUBLIC_URL}/assets/images/project/makja/main/05.gif`,
    description: '설명5',
  },
  {
    name: '플레이어 근거리 공격',
    image: `${process.env.PUBLIC_URL}/assets/images/project/makja/main/06.gif`,
    description: '설명6',
  },
  {
    name: '플레이어 원거리 공격',
    image: `${process.env.PUBLIC_URL}/assets/images/project/makja/main/07.gif`,
    description: '설명7',
  },
  {
    name: '플레이어 Q 스킬 공격',
    image: `${process.env.PUBLIC_URL}/assets/images/project/makja/main/08.gif`,
    description: '설명8',
  },
  {
    name: '플레이어 E 스킬 공격',
    image: `${process.env.PUBLIC_URL}/assets/images/project/makja/main/09.gif`,
    description: '설명9',
  },
  {
    name: '플레이어 R 스킬 공격',
    image: `${process.env.PUBLIC_URL}/assets/images/project/makja/main/10.gif`,
    description: '설명10',
  },
  {
    name: '플레이어 레벨업',
    image: `${process.env.PUBLIC_URL}/assets/images/project/makja/main/11.gif`,
    description: '설명11',
  },
  {
    name: '플레이어 강화 성공',
    image: `${process.env.PUBLIC_URL}/assets/images/project/makja/main/12.gif`,
    description: '설명12',
  },
  {
    name: '플레이어 강화 실패',
    image: `${process.env.PUBLIC_URL}/assets/images/project/makja/main/13.gif`,
    description: '설명13',
  },
  {
    name: '타워 뷰 전환',
    image: `${process.env.PUBLIC_URL}/assets/images/project/makja/main/14.gif`,
    description: '설명14',
  },
  {
    name: '타워 선택',
    image: `${process.env.PUBLIC_URL}/assets/images/project/makja/main/15.gif`,
    description: '설명15',
  },
  {
    name: '타워 설치',
    image: `${process.env.PUBLIC_URL}/assets/images/project/makja/main/16.gif`,
    description: '설명16',
  },
  {
    name: '타워 설치 취소',
    image: `${process.env.PUBLIC_URL}/assets/images/project/makja/main/17.gif`,
    description: '설명17',
  },
  {
    name: '적 공격',
    image: `${process.env.PUBLIC_URL}/assets/images/project/makja/main/18.gif`,
    description: '설명18',
  },
  {
    name: '적 피격',
    image: `${process.env.PUBLIC_URL}/assets/images/project/makja/main/19.gif`,
    description: '설명19',
  },
  {
    name: '게임 종료 및 랭킹 확인',
    image: `${process.env.PUBLIC_URL}/assets/images/project/makja/main/20.gif`,
    description: '설명20',
  },
];
const makjaDetail: detailType[] = [
  {
    name: 'ERD',
    image: `${process.env.PUBLIC_URL}/assets/images/project/makja/detail/erd.png`,
  },

  {
    name: '아키텍처',
    image: `${process.env.PUBLIC_URL}/assets/images/project/makja/detail/architecture.png`,
  },
  {
    name: 'API',
    image: `${process.env.PUBLIC_URL}/assets/images/project/makja/detail/api.png`,
  },
  {
    name: '클래스 관계도',
    image: `${process.env.PUBLIC_URL}/assets/images/project/makja/detail/classrelationship.png`,
  },
];

export { makjaStackSet, makjaMain, makjaDetail };
