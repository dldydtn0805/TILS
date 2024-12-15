import { stackType, stackSetType } from './Projects';

const healthScheduleStackSet: stackSetType[] = [
  {
    name: 'BackEnd',
    stacks: [
      {
        name: 'Node.js',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/nodejs.png`,
        description: '',
        application: ['a', 'b', 'c'],
      },
      {
        name: 'Express',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/express.png`,
        description: '',
        application: ['a', 'b', 'c'],
      },
    ],
  },
  {
    name: 'FrontEnd',
    stacks: [
      {
        name: 'React',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/react.png`,
        description: '',
        application: ['', '', ''],
      },
      {
        name: 'Zustand',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/zustand.png`,
        description: '',
        application: ['', '', ''],
      },
    ],
  },
  {
    name: 'Embedded',
    stacks: [
      {
        name: 'RFID',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/rfid.png`,
        description: '',
        application: ['', '', ''],
      },
      {
        name: 'Raspberry Pi',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/rasbperrypi.png`,
        description: '',
        application: ['', '', ''],
      },
    ],
  },
  {
    name: 'Data',
    stacks: [
      {
        name: 'MySQL',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/mysql.png`,
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
        name: 'Amazon EC2',
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
    ],
  },
];

export { healthScheduleStackSet };
