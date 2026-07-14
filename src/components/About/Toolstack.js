import React from "react";
import { Col, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiPostman,
  SiDocker,
  SiGithub,
  SiLinux,
  SiGrafana,
  SiOpenai,
} from "react-icons/si";

function CursorIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M4 3l16 8.5-7.2 2.1L10.5 21 4 3zm8.1 9.8l3.7-1.1-8.4-4.5 4.7 5.6z" />
    </svg>
  );
}

function ClaudeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.4 2.2c.4-.2.9-.1 1.2.3l8 11.2c.4.5.1 1.3-.5 1.4l-3.6.7 2.1 3.5c.3.5.1 1.2-.5 1.4-.5.2-1.1 0-1.4-.4l-2.3-3.9-2.7 3.8c-.3.4-.8.5-1.2.3-.5-.2-.7-.7-.6-1.2l1.8-7.1-4.8-.9c-.6-.1-.9-.7-.7-1.2L12.4 2.2zm1.1 3.3L9.9 13l4.1.8-1.3 5 3-4.2 3.2-.6-5.4-7.5z" />
    </svg>
  );
}

function Toolstack() {
  const renderTooltip = (name) => <Tooltip id={`tooltip-${name}`}>{name}</Tooltip>;

  const tools = [
    { name: "VS Code", icon: <SiVisualstudiocode /> },
    { name: "Cursor", icon: <CursorIcon /> },
    { name: "Claude", icon: <ClaudeIcon /> },
    { name: "ChatGPT / OpenAI", icon: <SiOpenai /> },
    { name: "Postman", icon: <SiPostman /> },
    { name: "Docker", icon: <SiDocker /> },
    { name: "GitHub", icon: <SiGithub /> },
    { name: "Linux", icon: <SiLinux /> },
    { name: "Grafana", icon: <SiGrafana /> },
  ];

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {tools.map((tool, i) => (
        <Col
          xs={4}
          md={2}
          className="tech-icons tech-icons-animated"
          key={tool.name}
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <OverlayTrigger placement="bottom" overlay={renderTooltip(tool.name)}>
            <div>{tool.icon}</div>
          </OverlayTrigger>
        </Col>
      ))}
    </Row>
  );
}

export default Toolstack;
