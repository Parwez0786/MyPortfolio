import React from "react";
import { Container } from "react-bootstrap";
import Particle from "../Particle";
import ScrollReveal from "../ScrollReveal";

const experiences = [
  {
    role: "Software Engineer",
    company: "Paytm Money",
    location: "Noida (Onsite)",
    period: "June 2025 – Present",
    points: [
      "Built an Asynchronous Kafka-based notification pipeline for SIP PDN/DN, reducing latency from 300ms to 200ms while processing 100k+ events/day.",
      "Developed a Kafka-driven asynchronous system for bulk mandate failures via CSV-based APIs, resolving incorrect SIP linkage for 100k+ dormant mandates and ensuring data consistency across PG and internal databases.",
      "Developed a scalable RESTful API using Java and Spring Boot to fetch and categorize mandates across up to 4 linked bank accounts, moving parsing logic to the backend and improving page load performance by 30%.",
      "Leveraged Redis for low-latency analytics and event tracking, and automated scheduled workflows using Rundeck cron jobs to support PDN/DN processing and monitoring.",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "Paytm Money",
    location: "Noida (Onsite)",
    period: "Jan 2025 – June 2025",
    points: [
      "Developed search feature using ReactJS, JavaScript, and SCSS with debounced search, autocomplete, real-time filtering, and category navigation backed by RESTful APIs.",
      "Built Discover module leveraging React Hooks, Context API, and custom hooks with reusable components, dynamic data visualization, and responsive CSS/SCSS.",
      "Optimized frontend performance using React.memo, lazy loading, code splitting with Webpack, and Context API state management to improve page load times.",
    ],
  },
];

function Experience() {
  return (
    <Container fluid className="experience-section">
      <Particle />
      <Container>
        <ScrollReveal animation="fade-up">
          <h1 className="project-heading">
            Professional <strong className="purple">Experience</strong>
          </h1>
          <p style={{ color: "white" }}>
            Roles and impact from my industry work.
          </p>
        </ScrollReveal>

        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <ScrollReveal
              key={`${exp.role}-${exp.period}`}
              animation="fade-up"
              delay={index * 120}
            >
              <article className="experience-card">
                <div className="experience-card-header">
                  <div>
                    <h3 className="experience-role">{exp.role}</h3>
                    <p className="experience-company">
                      {exp.company}
                      <span className="experience-dot">·</span>
                      {exp.location}
                    </p>
                  </div>
                  <span className="experience-period">{exp.period}</span>
                </div>
                <ul className="experience-points">
                  {exp.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </Container>
  );
}

export default Experience;
