import '../css/Footer.css';
function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2024 Your Company. All rights reserved.</p>
      <div className="footer-contents">
        <div>
          <div className="footer-title">copyright</div>
          <div className="footer-content copyright">
            <a
              href="https://www.flaticon.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Flaticon
            </a>
            <a
              href="https://icons8.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Icons8
            </a>
          </div>
        </div>
        <div>
          <div className="footer-title">contact</div>
          <div className="footer-content contact">
            <div>
              <a href="tel:+821027421655">+82 010-2472-1655</a>
            </div>
            <div>
              <div>
                <a href="mailto:minkyu1655@gmail.com">minkyu1655@gmail.com</a>
              </div>
              <div>
                <a href="mailto:minkyu1180@naver.com">minkyu1180@naver.com</a>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="footer-title">sns</div>
          <div className="footer-content sns">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
