import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Md Parwez Ansari</span>.
            <br />
            <br />
            I work as a{" "}
            <span className="purple">Software Engineer at Paytm Money</span>{" "}
            (Noida, Onsite) — previously a Software Engineer Intern there (Jan
            2025 – June 2025), now full-time since June 2025.
            <br />
            <br />I completed{" "}
            <span className="purple">B.Tech in Information Technology</span> from{" "}
            <span className="purple">IIIT Allahabad</span> (2021–2025) with a CGPA
            of <span className="purple">8.04</span>.
            <br />
            <br />
            At work I focus on Kafka pipelines, Spring Boot APIs, Redis analytics,
            and high-throughput financial workflows. Outside work I build
            full-stack systems and practice competitive programming.
            <br />
            <br />
            Achievements:
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Codeforces Specialist — rating 1501
            </li>
            <li className="about-activity">
              <ImPointRight /> LeetCode Knight (Top 3.54%) — rating 1953
            </li>
            <li className="about-activity">
              <ImPointRight /> CodeChef 4★ — top 1000 among 181k+ Indian programmers
            </li>
            <li className="about-activity">
              <ImPointRight /> Global ranks in Codeforces / LeetCode contests
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Build reliable systems. Keep shipping. Keep improving."{" "}
          </p>
          <footer className="blockquote-footer">Parwez</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
