import { stackType, stackSetType, detailType } from './Projects';

const zigeumStackSet: stackSetType[] = [
  {
    name: 'BackEnd',
    stacks: [
      {
        name: 'ERD Cloud',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/erdcloud.png`,
        description: '',
        application: ['a', 'b', 'c'],
      },
      {
        name: 'Web RTC',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/webrtc.png`,
        description: '',
        application: ['a', 'b', 'c'],
      },
      {
        name: 'Web Socket',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/websocket.png`,
        description: '',
        application: ['a', 'b', 'c'],
      },
    ],
  },
  {
    name: 'FrontEnd',
    stacks: [
      {
        name: 'Next.js',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/nextjs.png`,
        description: '',
        application: ['', '', ''],
      },
      {
        name: 'React Query',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/reactquery.png`,
        description: '',
        application: ['', '', ''],
      },
      {
        name: 'Zustand',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/zustand.png`,
        description: '',
        application: ['', '', ''],
      },
      {
        name: 'React Hook Form',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/reacthookform.png`,
        description: '',
        application: ['', '', ''],
      },
      {
        name: 'Anychart.js',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/anychart.png`,
        description: '',
        application: ['', '', ''],
      },
    ],
  },
  {
    name: 'Data',
    stacks: [
      {
        name: 'Hadoop',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/hadoop.png`,
        description: '',
        application: ['', '', ''],
      },
      {
        name: 'Apache Spark',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/apachespark.png`,
        description: '',
        application: ['', '', ''],
      },
      {
        name: 'Redis',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/redis.png`,
        description: '',
        application: ['', '', ''],
      },
    ],
  },
  {
    name: 'Collaboration',
    stacks: [
      {
        name: 'Git',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/git.png`,
        description: '',
        application: ['', '', ''],
      },
      {
        name: 'Notion',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/notion.png`,
        description: '',
        application: ['', '', ''],
      },
      {
        name: 'Jira',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/jira.png`,
        description: '',
        application: ['', '', ''],
      },
    ],
  },
  {
    name: 'Design',
    stacks: [
      {
        name: 'Figma',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/figma.png`,
        description: '',
        application: ['', '', ''],
      },
    ],
  },
  {
    name: 'Cloud',
    stacks: [
      {
        name: 'Amazon S3',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/amazon.png`,
        description: '',
        application: ['', '', ''],
      },
    ],
  },
  {
    name: 'Deployment',
    stacks: [
      {
        name: 'Docker',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/docker.png`,
        description: '',
        application: ['', '', ''],
      },
      {
        name: 'Jenkins',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/jenkins.png`,
        description: '',
        application: ['', '', ''],
      },
    ],
  },
  {
    name: 'DevOps',
    stacks: [
      {
        name: 'Nginx',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/nginx.png`,
        description: '',
        application: ['', '', ''],
      },
      {
        name: 'Grafana',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/grafana.png`,
        description: '',
        application: ['', '', ''],
      },
      {
        name: 'Prometheus',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/prometheus.png`,
        description: '',
        application: ['', '', ''],
      },
    ],
  },
];

const zigeumDetail: detailType[] = [
  {
    name: '기능 명세서',
    image: `${process.env.PUBLIC_URL}/assets/images/project/zigeum/detail/.png`,
    video: `${process.env.PUBLIC_URL}/assets/images/project/zigeum/detail/.mp4`,
  },
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
  {
    name: 'UCC',
    image: `${process.env.PUBLIC_URL}/assets/images/project/zigeum/detail/.png`,
    video: `${process.env.PUBLIC_URL}/assets/images/project/zigeum/detail/.mp4`,
  },
];

export { zigeumStackSet, zigeumDetail };
