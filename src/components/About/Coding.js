
import React, { useState } from "react";
import { Col, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiPostman,
  SiSlack,
  SiVercel,
  SiMacos,
} from "react-icons/si";
import {
  SiCodeforces,
  SiCodechef,
  SiLeetcode,
  SiGeeksforgeeks,
} from "react-icons/si";
function CodingProfiles() {
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
        <a
          href="https://leetcode.com/parwez0786/"
          target="_blank"
          style={{ textDecoration: "none", color: "white" }}
        >
          <OverlayTrigger
            placement="bottom"
            overlay={renderTooltip("Leetcode")}
          >
            <div
              onMouseEnter={() => handleMouseEnter("Leetcode")}
              onMouseLeave={handleMouseLeave}
            >
              <SiLeetcode />
            </div>
          </OverlayTrigger>
        </a>
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <a
          href="https://codeforces.com/profile/iit2021113"
          target="_blank"
          style={{ textDecoration: "none", color: "white" }}
        >
          <OverlayTrigger
            placement="bottom"
            overlay={renderTooltip("Codeforces")}
          >
            <div
              onMouseEnter={() => handleMouseEnter("Codeforces")}
              onMouseLeave={handleMouseLeave}
            >
              <SiCodeforces />
            </div>
          </OverlayTrigger>
        </a>
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <a
          href="https://www.codechef.com/users/parwezzzzz0786"
          target="_blank"
          style={{ textDecoration: "none", color: "white" }}
        >
          <OverlayTrigger
            placement="bottom"
            overlay={renderTooltip("Codechef")}
          >
            <div
              onMouseEnter={() => handleMouseEnter("Codechef")}
              onMouseLeave={handleMouseLeave}
            >
              <SiCodechef />
            </div>
          </OverlayTrigger>
        </a>
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <a
          href="https://auth.geeksforgeeks.org/user/iit2021113"
          target="_blank"
          style={{ textDecoration: "none", color: "white" }}
        >
          <OverlayTrigger placement="bottom" overlay={renderTooltip("GFG")}>
            <div
              onMouseEnter={() => handleMouseEnter("GFG")}
              onMouseLeave={handleMouseLeave}
            >
              <SiGeeksforgeeks />
            </div>
          </OverlayTrigger>
        </a>
      </Col>
    </Row>
  );
}

export default CodingProfiles;
