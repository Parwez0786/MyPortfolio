import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import ScrollReveal from "../ScrollReveal";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <ScrollReveal animation="fade-up">
              <h1 style={{ fontSize: "2.6em" }}>
                LET ME <span className="purple"> INTRODUCE </span> MYSELF
              </h1>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={120}>
              <p className="home-about-body">
                I am a{" "}
                <i>
                  <b className="purple">Software Engineer at Paytm Money</b>
                </i>
                , working onsite in Noida. I graduated with a B.Tech in Information
                Technology from{" "}
                <i>
                  <b className="purple">IIIT Allahabad</b>
                </i>{" "}
                (CGPA 8.04).
                <br />
                <br />
                At Paytm Money I build scalable backend systems with{" "}
                <b className="purple">Java, Spring Boot, Kafka, and Redis</b> —
                including async notification pipelines and mandate processing that
                handle <b className="purple">100k+ events/day</b>.
                <br />
                <br />I am fluent in
                <i>
                  <b className="purple"> C / C++, Java, JavaScript, Python, and SQL</b>
                </i>
                , and I build products with
                <b className="purple"> Spring Boot</b>,
                <b className="purple"> React</b>,
                <b className="purple"> Node.js</b>, and
                <b className="purple"> Express.js</b>.
                <br />
                <br />
                I also enjoy
                <i>
                  <b className="purple"> system design, distributed systems,</b>
                </i>{" "}
                and competitive programming — Knight on LeetCode and Specialist on
                Codeforces.
              </p>
            </ScrollReveal>
          </Col>
          <Col md={4} className="myAvtar">
            <ScrollReveal animation="zoom-in" delay={160}>
              <Tilt>
                <img src={myImg} className="img-fluid avatar-float" alt="avatar" />
              </Tilt>
            </ScrollReveal>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <ScrollReveal animation="fade-up">
              <h1>FIND ME ON</h1>
              <p>
                Feel free to <span className="purple">connect </span>with me
              </p>
              <ul className="home-about-social-links">
                <li className="social-icons social-pop">
                  <a
                    href="https://github.com/parwez0786"
                    target="_blank"
                    rel="noreferrer"
                    className="icon-colour home-social-icons"
                  >
                    <AiFillGithub />
                  </a>
                </li>
                <li className="social-icons social-pop">
                  <a
                    href="https://www.linkedin.com/in/md-parwez-ansari-79a4151b4"
                    target="_blank"
                    rel="noreferrer"
                    className="icon-colour home-social-icons"
                  >
                    <FaLinkedinIn />
                  </a>
                </li>
              </ul>
            </ScrollReveal>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Home2;
