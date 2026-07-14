import React from "react";
import { Col, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import { CgCPlusPlus } from "react-icons/cg";
import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiPython,
  DiGit,
  DiJava,
  DiMongodb,
} from "react-icons/di";
import {
  SiExpress,
  SiSpringboot,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiApachekafka,
  SiDocker,
  SiAmazonaws,
} from "react-icons/si";

function Techstack() {
  const renderTooltip = (name) => <Tooltip id={`tooltip-${name}`}>{name}</Tooltip>;

  const items = [
    { name: "Java", icon: <DiJava /> },
    { name: "Spring Boot", icon: <SiSpringboot /> },
    { name: "C++", icon: <CgCPlusPlus /> },
    { name: "JavaScript", icon: <DiJavascript1 /> },
    { name: "Python", icon: <DiPython /> },
    { name: "React", icon: <DiReact /> },
    { name: "Node.js", icon: <DiNodejs /> },
    { name: "Express.js", icon: <SiExpress /> },
    { name: "PostgreSQL", icon: <SiPostgresql /> },
    { name: "MySQL", icon: <SiMysql /> },
    { name: "MongoDB", icon: <DiMongodb /> },
    { name: "Redis", icon: <SiRedis /> },
    { name: "Kafka", icon: <SiApachekafka /> },
    { name: "Docker", icon: <SiDocker /> },
    { name: "AWS", icon: <SiAmazonaws /> },
    { name: "Git", icon: <DiGit /> },
  ];

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {items.map((item, i) => (
        <Col
          xs={4}
          md={2}
          className="tech-icons tech-icons-animated"
          key={item.name}
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <OverlayTrigger placement="bottom" overlay={renderTooltip(item.name)}>
            <div>{item.icon}</div>
          </OverlayTrigger>
        </Col>
      ))}
    </Row>
  );
}

export default Techstack;
