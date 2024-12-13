type projectType = {
  id: number;
  name: string;
  image: string;
};

const projects: projectType[] = [
  {
    id: 0,
    name: "헬스케쥴(Health's Schedule)",
    image: `${process.env.PUBLIC_URL}/assets/images/project/healthscedule/logo.png`, // 프로젝트 로고 이미지 경로
  },
  {
    id: 1,
    name: '지금이니?!(Zigeum)',
    image: `${process.env.PUBLIC_URL}/assets/images/project/zigeum/logo.png`, // 프로젝트 로고 이미지 경로
  },
  {
    id: 2,
    name: '막자(Makja)',
    image: `${process.env.PUBLIC_URL}/assets/images/project/makja/logo.png`, // 프로젝트 로고 이미지 경로
  },
];
type stackType = {
  name: string;
  image: string;
  description: string;
  application: string[];
};
type stackSetType = {
  name: string;
  stacks: stackType[];
};

export type { projectType, stackType, stackSetType };
export { projects };
