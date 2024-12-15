import { stackType, stackSetType } from './Projects';

const makjaStackSet: stackSetType[] = [
  {
    name: 'BackEnd',
    stacks: [
      {
        name: 'Spring',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/spring.png`,
        description: '',
        application: ['a', 'b', 'c'],
      },
    ],
  },
  {
    name: 'Client',
    stacks: [
      {
        name: 'Unreal Engine',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/unreal.png`,
        description: '',
        application: ['', '', ''],
      },
      {
        name: 'C++',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/c++.png`,
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
        name: 'Perforce',
        image: `${process.env.PUBLIC_URL}/assets/images/project/stacks/perforce.png`,
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
];

export { makjaStackSet };
