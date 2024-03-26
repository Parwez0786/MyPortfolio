import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";

import virtual from "../../Assets/Projects/Virtual.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={virtual}
              isBlog={false}
              title="Virtual Trading Platform"
              description="Virtual Trading Platform is a stock learning Platform using Virtual Coins. Built using basic Html, Css, Javascript, Node.js, mySql and Express.js"
              ghLink="https://github.com/Parwez0786/virtual-trading--platform"
              demoLink="https://virtual-trading-platform-three.vercel.app/api/loginauth/login"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
