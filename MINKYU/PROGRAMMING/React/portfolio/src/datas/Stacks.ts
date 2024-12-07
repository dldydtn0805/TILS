type stackType = { category: string; skills: skillType[] };
type skillType = {
  name: string;
  rating: number;
  image: string;
};

const stacks: stackType[] = [
  {
    category: 'WEB',
    skills: [
      {
        name: 'Html',
        rating: 5,
        image: `${process.env.PUBLIC_URL}/assets/images/about/stacks/html.png`,
      },
      {
        name: 'CSS',
        rating: 5,
        image: `${process.env.PUBLIC_URL}/assets/images/about/stacks/css.png`,
      },
      {
        name: 'JavaScript',
        rating: 5,
        image: `${process.env.PUBLIC_URL}/assets/images/about/stacks/javascript.png`,
      },
      {
        name: 'TypeScript',
        rating: 5,
        image: `${process.env.PUBLIC_URL}/assets/images/about/stacks/typescript.png`,
      },
    ],
  },
  {
    category: 'FE',
    skills: [
      {
        name: 'Vue',
        rating: 5,
        image: `${process.env.PUBLIC_URL}/assets/images/about/stacks/vue.png`,
      },
      {
        name: 'React',
        rating: 5,
        image: `${process.env.PUBLIC_URL}/assets/images/about/stacks/react.png`,
      },
      {
        name: 'Next.js',
        rating: 5,
        image: `${process.env.PUBLIC_URL}/assets/images/about/stacks/next.png`,
      },
    ],
  },
  {
    category: 'BE',
    skills: [
      {
        name: 'H3ml',
        rating: 5,
        image: `${process.env.PUBLIC_URL}/assets/images/about/stacks/html.png`,
      },
      {
        name: 'CSS',
        rating: 5,
        image: `${process.env.PUBLIC_URL}/assets/images/about/stacks/css.png`,
      },
      {
        name: 'JavaScript',
        rating: 5,
        image: `${process.env.PUBLIC_URL}/assets/images/about/stacks/javascript.png`,
      },
    ],
  },
  {
    category: 'GAME',
    skills: [
      {
        name: 'UnrEal Engine',
        rating: 5,
        image: `${process.env.PUBLIC_URL}/assets/images/about/stacks/unreal.png`,
      },
      {
        name: 'UnreAl Engine',
        rating: 5,
        image: `${process.env.PUBLIC_URL}/assets/images/about/stacks/unreal.png`,
      },
    ],
  },
  {
    category: 'PROG LAN',
    skills: [
      {
        name: 'Python',
        rating: 5,
        image: `${process.env.PUBLIC_URL}/assets/images/about/stacks/python.png`,
      },
      {
        name: 'Java',
        rating: 5,
        image: `${process.env.PUBLIC_URL}/assets/images/about/stacks/java.png`,
      },
      {
        name: 'C++',
        rating: 5,
        image: `${process.env.PUBLIC_URL}/assets/images/about/stacks/c++.png`,
      },
    ],
  },
  {
    category: 'COLLAB TOOL',
    skills: [
      {
        name: 'H5ml',
        rating: 5,
        image: `${process.env.PUBLIC_URL}/assets/images/about/stacks/html.png`,
      },
      {
        name: 'CSS',
        rating: 5,
        image: `${process.env.PUBLIC_URL}/assets/images/about/stacks/css.png`,
      },
      {
        name: 'JavaScript',
        rating: 5,
        image: `${process.env.PUBLIC_URL}/assets/images/about/stacks/javascript.png`,
      },
    ],
  },
];

export type { skillType, stackType };
export { stacks };
