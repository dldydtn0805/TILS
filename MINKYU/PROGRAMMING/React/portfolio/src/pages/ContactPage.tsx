// ContactPage
import '../App.css';
import '../css/Contact.css';
function ContactPage() {
  return (
    <div className="contact-container basic-bg">
      <h1>콘택트페이지 입니다.</h1>
      <div className="contact-items">
        <div className="contact-item instagram">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/contact/instagram.png`} // 경로 수정
            alt="instagram"
            className="contact-img"
          />
          <span className="contact-text">
            <a href="https://instagram.com" target="_black">
              instagram
            </a>
          </span>
        </div>
        <div className="contact-item github">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/contact/github.png`} // 경로 수정
            alt="github"
            className="contact-img"
          />
          <span className="contact-text">
            <a href="https://github.com/minkyu-1180" target="_black">
              https://github.com/minkyu-1180
            </a>
          </span>
        </div>
        <div className="contact-item velog">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/contact/velog.png`} // 경로 수정
            alt="velog"
            className="contact-img"
          />
          <span className="contact-text">
            <a href="https://velog.io/@minkyu1180/posts" target="_black">
              https://velog.io/@minkyu1180/posts
            </a>
          </span>
        </div>
        <div className="contact-item google">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/contact/google.png`} // 경로 수정
            alt="google"
            className="contact-img"
          />
          <span className="contact-text">
            <button className="email-btn">이메일 보내기</button>
          </span>
        </div>
        <div className="contact-item naver">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/contact/naver.png`} // 경로 수정
            alt="naver"
            className="contact-img"
          />
          <button className="email-btn">이메일 보내기</button>
          <span className="contact-text"></span>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
