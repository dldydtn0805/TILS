import React from 'react';
// stack 데이터 import
import { stackType, stacks } from '../datas/Stacks';
import { certificateType, certificates } from '../datas/Certificates';
import '../App.css';
import '../css/About.css'; // CSS 파일 import
import { Table } from 'react-bootstrap';

function AboutPage() {
  return (
    <div className="about-container basic-bg">
      {/* <h1>어바웃 페이지입니다.</h1> */}

      <div className="profile-section">
        <h2 className="section-title profile-title">About Me</h2>
        <div className="section-content profile-content">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/about/profile/profileimg.png`} // 본인의 사진 경로
            alt="Profile"
            className="profile-image"
          />
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
        <div className="section-content skills">
          {stacks.map((stack) => (
            <div className="skill-item">
              <img src={stack.image} alt={stack.name} className="skill-icon" />
              <div className="skill-rating">
                <span>{stack.name}</span>
                <span className="start">
                  {'★'.repeat(stack.rating)}
                  {'☆'.repeat(5 - stack.rating)}
                </span>
              </div>
            </div>
          ))}
          {/* 추가 기술 스택 */}
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
