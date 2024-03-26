import React, { useState } from "react";
import { Col, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiPostman,
  SiSlack,
  SiVercel,
  SiMacos,
} from "react-icons/si";

function Toolstack() {
  const [techName, setTechName] = useState("");

  const handleMouseEnter = (name) => {
    setTechName(name);
  };

  const handleMouseLeave = () => {
    setTechName("");
  };
  const renderTooltip = (name) => <Tooltip id="tooltip">{name}</Tooltip>;
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger placement="bottom" overlay={renderTooltip("MacOs")}>
          <div
            onMouseEnter={() => handleMouseEnter("MacOs")}
            onMouseLeave={handleMouseLeave}
          >
            <SiMacos />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger
          placement="bottom"
          overlay={renderTooltip("Visual Studio Code")}
        >
          <div
            onMouseEnter={() => handleMouseEnter("Visual Studio Code")}
            onMouseLeave={handleMouseLeave}
          >
            <SiVisualstudiocode />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger
          placement="bottom"
          overlay={renderTooltip("PostMan")}
        >
          <div
            onMouseEnter={() => handleMouseEnter("PostMan")}
            onMouseLeave={handleMouseLeave}
          >
            <SiPostman />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger
          placement="bottom"
          overlay={renderTooltip("Vercel")}
        >
          <div
            onMouseEnter={() => handleMouseEnter("Vercel")}
            onMouseLeave={handleMouseLeave}
          >
            <SiVercel />
          </div>
        </OverlayTrigger>
      </Col>
    </Row>
  );
}

export default Toolstack;
