import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/home-main.svg";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import ScrollReveal from "../ScrollReveal";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <ScrollReveal animation="fade-right" delay={80}>
                <h1 style={{ paddingBottom: 15 }} className="heading">
                  Hi There!{" "}
                  <span className="wave" role="img" aria-labelledby="wave">
                    👋🏻
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal animation="fade-right" delay={180}>
                <h1 className="heading-name">
                  I'M
                  <strong className="main-name"> Md Parwez Ansari</strong>
                </h1>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={280}>
                <div style={{ padding: 50, textAlign: "left" }}>
                  <Type />
                </div>
              </ScrollReveal>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <ScrollReveal animation="fade-left" delay={220}>
                <img
                  src={homeLogo}
                  alt="home pic"
                  className="img-fluid home-main-img"
                  style={{ maxHeight: "450px" }}
                />
              </ScrollReveal>
            </Col>
          </Row>
        </Container>
      </Container>
      <Home2 />
    </section>
  );
}

export default Home;
