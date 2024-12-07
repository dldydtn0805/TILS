import React from 'react';
import { useState } from 'react';
// stack 데이터 import
import { stackType, stacks } from '../datas/Stacks';
import { certificateType, certificates } from '../datas/Certificates';
import '../App.css';
import '../css/About.css'; // CSS 파일 import
import { Table } from 'react-bootstrap';
// react-slick slick-carousel
import Slider from 'react-slick';
// react-bootstrap
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

interface StackSliderIF {
  index: number;
}
function StackSlider({ index }: StackSliderIF) {
  const settings = {
    className: 'center',
    centerMode: true,
    centerPadding: '60px',
    speed: 500,
    slidesToShow: 1,
    // slidesToScroll: 1,
  };
  return (
    // <div>
    <div className="slider-container">
      <Slider {...settings}>
        {stacks[index].skills.map((skill, idx) => (
          <div key={skill.name} className="skill-item">
            <img src={skill.image} alt={skill.name} className="skill-icon" />
            <div>{skill.name}</div>
            <div>
              {'★'.repeat(skill.rating)}
              {'☆'.repeat(5 - skill.rating)}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

function AboutPage() {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const stackCategory: string[] = [
    'WEB',
    'FE',
    'BE',
    'GAME',
    'PROG LAN',
    'COLLAB TOOL',
  ];

  return (
    <div className="about-container basic-bg">
      <div className="profile-section">
        <h2 className="section-title profile-title">About Me</h2>
        <div className="section-content profile-content">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/about/profile/profileimg.png`} // 본인의 사진 경로
            alt="Profile"
            className="profile-image"
          />
          <div>
            <div>
              <h4>안녕하세요, 프론트엔드 개발자를 희망하는 김민규 입니다.</h4>
              <p>
                대충소개글미ㅏㄴ렁니ㅏㅁ러ㅣ만어리;만ㅇ러;미나러미;ㅇ널;ㅣㅏ넒;ㅣㅓㅇ라ㅣ;ㅁㄹ
              </p>
            </div>
            <div>
              <h5>이력</h5>
              <ul className="education">
                <li>안양 외국어 고등학교 졸업(중국어과, 2014.03 ~ 2017.02)</li>
                <li>한양 대학교 졸업(수학과, 2017.03 ~ 2023.08)</li>
                <li>
                  삼성 청년 소프트웨어 아카데미(SSAFY) 10기 파이썬 비전공
                  수료(2023.07 ~ 2024.06)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="certifications-section">
        <h2 className="section-title certificate-title">Certificates</h2>
        <div className="section-content">
          <Table responsive>
            <thead>
              <tr>
                <th>자격증</th>
                <th>합격 일자</th>
                <th>유효 기간</th>
                <th>발급 기관</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((certificate, index) => (
                <tr key={index}>
                  <td>{certificate.name}</td>
                  <td>{certificate.passingDate}</td>
                  <td>
                    {certificate.expirationStart} ~ {certificate.expirationEnd}
                  </td>
                  <td>{certificate.Issuer}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <div className="skills-section">
        <h2 className="section-title skills-title">Skills</h2>
        <div className="skills-content">
          <div className="button-group">
            <ButtonGroup>
              {stackCategory.map((stack, index) => (
                <ToggleButton
                  className="toggle-button"
                  key={index}
                  id=""
                  type="radio"
                  name="radio"
                  value={stack}
                  checked={index == activeCategory}
                  onClick={() => setActiveCategory(index)}
                >
                  {stack}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </div>
          <StackSlider index={activeCategory}></StackSlider>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
