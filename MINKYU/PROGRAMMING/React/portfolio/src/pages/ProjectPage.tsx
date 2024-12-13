// ProjectPage
import { useState, useRef } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';
import { projectType, projects } from '../datas/Projects';
import '../css/Project.css';

import HealthSchedule from '../components/project/HealthSchedule';
import Zigeum from '../components/project/Zigeum';
import Makja from '../components/project/Makja';

// 각 프로젝트 ID에 대한 컴포넌트를 매핑하는 타입 정의
type ProjectComponent = React.FC;

const projectComponents: { [key: number]: ProjectComponent } = {
  0: HealthSchedule,
  1: Zigeum,
  2: Makja,
};

function ProjectPage() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navHeight: number = 100; // navigation 높이 고려

  const handleScrollToProject = (index: number) => {
    const currentRef = projectRefs.current[index];

    if (currentRef) {
      const top: number =
        currentRef.getBoundingClientRect().top + window.scrollY - navHeight;
      // projectRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({ top, behavior: 'smooth' });
      setActiveProject(index);
    }
  };

  return (
    <div className="project-page">
      <div className="project-nav">
        <p>Show My Project!</p>
        <div className="project-toggle-list">
          {projects.map((project) => (
            <button
              key={project.id}
              className={`project-toggle ${
                activeProject === project.id ? 'active' : ''
              }`}
              onClick={() => handleScrollToProject(project.id)}
              style={{ background: 'none', border: 'none', padding: 0 }} // 기본 버튼 스타일 제거
            >
              <img
                src={project.image}
                alt={project.name}
                className="project-toggle-image"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="project-description">
        {projects.map((project, index) => {
          const ProjectComponent = projectComponents[project.id];
          return (
            <div
              key={project.id}
              ref={(el) => (projectRefs.current[index] = el)} // 각 프로젝트에 대한 ref 설정
              className="description-container"
            >
              {ProjectComponent && <ProjectComponent />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProjectPage;
