type stackType = {
  name: string;
  rating: number;
  image: string;
};
const stacks: stackType[] = [
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
  {
    name: 'Unreal',
    rating: 3,
    image: `${process.env.PUBLIC_URL}/assets/images/about/stacks/unreal.png`,
  },
];

export type { stackType };
export { stacks };
