import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import { getProjects } from "../../api";
import ScrollReveal from "../ScrollReveal";
import SectionLoader from "../SectionLoader";

const formatProjectMonth = (value) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
};

const formatProjectRange = (startedAt, endedAt) => {
  const start = formatProjectMonth(startedAt);
  const end = formatProjectMonth(endedAt);
  if (start && end) return `${start} – ${end}`;
  if (start) return `${start} – Present`;
  if (end) return end;
  return "";
};

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchProjects = async () => {
      try {
        const { data } = await getProjects();
        if (!cancelled) {
          setProjects(data);
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError("Unable to load projects. Please try again later.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProjects();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        {loading ? (
          <SectionLoader label="Loading projects" />
        ) : (
          <>
            <ScrollReveal animation="fade-up">
              <h1 className="project-heading">
                My Recent <strong className="purple">Works </strong>
              </h1>
              <p style={{ color: "white" }}>
                Here are a few projects I've worked on recently.
              </p>
            </ScrollReveal>
            {error && <p style={{ color: "#ff6b6b" }}>{error}</p>}
            {!error && projects.length === 0 && (
              <p
                style={{
                  color: "white",
                  textAlign: "center",
                  marginTop: "40px",
                }}
              >
                No Projects
              </p>
            )}
            <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
              {projects.map((project, i) => (
                <Col md={4} className="project-card" key={project._id}>
                  <ScrollReveal animation="fade-up" delay={i * 100}>
                    <ProjectCard
                      imgPath={project.imgUrl}
                      imgPaths={(project.images || []).map((img) => img.url)}
                      isBlog={project.isBlog}
                      title={project.title}
                      description={project.description}
                      ghLink={project.ghLink}
                      demoLink={project.demoLink}
                      timeline={formatProjectRange(
                        project.startedAt,
                        project.endedAt
                      )}
                    />
                  </ScrollReveal>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
    </Container>
  );
}

export default Projects;
