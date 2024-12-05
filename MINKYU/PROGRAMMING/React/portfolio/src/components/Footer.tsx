import { Container, Row, Col } from 'react-bootstrap';
import '../css/Footer.css';
function Footer() {
  return (
    <footer className="footer">
      <p>© 2024 Your Name. All rights reserved.</p>
      <Container className="p-4">
        <Row>
          <Col>
            <p>TEL</p>
            <span>010-2742-1655</span>
          </Col>
          <Col>
            <p>EMAIL</p>
            <div>
              <a href="mailto:minkyu1180@naver.com">minkyu1180@naver.com</a>
            </div>
            <div>
              <a href="mailto:minkyu1655@gmail.com">minkyu1655@gmail.com</a>
            </div>
          </Col>
          <Col>
            <p>SNS</p>
            <a
              href="https://github.com/minkyu-1180"
              target="_blank"
              rel="noopener noreferrer"
            >
              minkyu-1180
            </a>
            <br />
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* <FaLinkedin /> LinkedIn */}
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
