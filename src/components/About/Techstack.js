import React, { useState } from "react";
import { Col, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import { CgCPlusPlus } from "react-icons/cg";
import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiMongodb,
  DiPython,
  DiGit,
  DiJava,
} from "react-icons/di";
import {
  SiRedis,
  SiFirebase,
  SiNextdotjs,
  SiSolidity,
  SiPostgresql,
  SiTailwindcss,
} from "react-icons/si";
import { GrMysql } from "react-icons/gr";
import { IoLogoCss3 } from "react-icons/io5";
import { TbBrandGolang } from "react-icons/tb";

function Techstack() {
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
        <OverlayTrigger placement="bottom" overlay={renderTooltip("C++")}>
          <div
            onMouseEnter={() => handleMouseEnter("C++")}
            onMouseLeave={handleMouseLeave}
          >
            <CgCPlusPlus />
          </div>
        </OverlayTrigger>
      </Col>
      <Col
        xs={4}
        md={2}
        className="tech-icons"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <OverlayTrigger placement="bottom" overlay={renderTooltip("C++")}>
          <div
            onMouseEnter={() => handleMouseEnter("C++")}
            onMouseLeave={handleMouseLeave}
          >
            <h1
              style={{
                fontSize: "65px",
                textAlign: "center",
                fontWeight: "bold",
                marginTop: "25px",
              }}
            >
              C
            </h1>
          </div>
        </OverlayTrigger>
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger
          placement="bottom"
          overlay={renderTooltip("JavaScript")}
        >
          <div
            onMouseEnter={() => handleMouseEnter("JavaScript")}
            onMouseLeave={handleMouseLeave}
          >
            <DiJavascript1 />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger placement="bottom" overlay={renderTooltip("Python")}>
          <div
            onMouseEnter={() => handleMouseEnter("Python")}
            onMouseLeave={handleMouseLeave}
          >
            <DiPython />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger placement="bottom" overlay={renderTooltip("Java")}>
          <div
            onMouseEnter={() => handleMouseEnter("Java")}
            onMouseLeave={handleMouseLeave}
          >
            <DiJava />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger placement="bottom" overlay={renderTooltip("Tailwind")}>
          <div
            onMouseEnter={() => handleMouseEnter("Tailwind")}
            onMouseLeave={handleMouseLeave}
          >
            <SiTailwindcss />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger placement="bottom" overlay={renderTooltip("CSS")}>
          <div
            onMouseEnter={() => handleMouseEnter("CSS")}
            onMouseLeave={handleMouseLeave}
          >
            <IoLogoCss3 />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger placement="bottom" overlay={renderTooltip("Node.js")}>
          <div
            onMouseEnter={() => handleMouseEnter("Node.js")}
            onMouseLeave={handleMouseLeave}
          >
            <DiNodejs />
          </div>
        </OverlayTrigger>
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger placement="bottom" overlay={renderTooltip("React")}>
          <div
            onMouseEnter={() => handleMouseEnter("React")}
            onMouseLeave={handleMouseLeave}
          >
            <DiReact />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger placement="bottom" overlay={renderTooltip("MongoDB")}>
          <div
            onMouseEnter={() => handleMouseEnter("MongoDB")}
            onMouseLeave={handleMouseLeave}
          >
            <DiMongodb />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger placement="bottom" overlay={renderTooltip("MySql")}>
          <div
            onMouseEnter={() => handleMouseEnter("MySql")}
            onMouseLeave={handleMouseLeave}
          >
            <GrMysql />
          </div>
        </OverlayTrigger>
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger placement="bottom" overlay={renderTooltip("Next.js")}>
          <div
            onMouseEnter={() => handleMouseEnter("Next.js")}
            onMouseLeave={handleMouseLeave}
          >
            <SiNextdotjs />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger placement="bottom" overlay={renderTooltip("Git")}>
          <div
            onMouseEnter={() => handleMouseEnter("Git")}
            onMouseLeave={handleMouseLeave}
          >
            <DiGit />
          </div>
        </OverlayTrigger>
      </Col>

      {/* Include other tech icons here */}
    </Row>
  );
}

export default Techstack;
