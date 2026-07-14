import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import laptopImg from "../../Assets/about.png";
import Toolstack from "./Toolstack";
import CodingProfiles from "./Coding";
import ScrollReveal from "../ScrollReveal";

function About() {
  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <ScrollReveal animation="fade-right">
              <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
                Know Who <strong className="purple">I'M</strong>
              </h1>
              <Aboutcard />
            </ScrollReveal>
          </Col>
          <Col
            md={5}
            style={{ paddingTop: "120px", paddingBottom: "50px" }}
            className="about-img"
          >
            <ScrollReveal animation="fade-left" delay={140}>
              <img
                src={laptopImg}
                alt="about"
                className="img-fluid about-float-img"
              />
            </ScrollReveal>
          </Col>
        </Row>

        <ScrollReveal animation="fade-up">
          <h1 className="project-heading">
            Professional <strong className="purple">Skillset </strong>
          </h1>
        </ScrollReveal>
        <Techstack />

        <ScrollReveal animation="fade-up">
          <h1 className="project-heading">
            <strong className="purple">Coding</strong> Profiles
          </h1>
        </ScrollReveal>
        <CodingProfiles />

        <ScrollReveal animation="fade-up">
          <h1 className="project-heading">
            <strong className="purple">Tools</strong> I use
          </h1>
        </ScrollReveal>
        <Toolstack />

        <ScrollReveal animation="zoom-in" delay={80}>
          <Github />
        </ScrollReveal>
      </Container>
    </Container>
  );
}

export default About;
