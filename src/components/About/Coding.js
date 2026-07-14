import React from "react";
import { Col, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  SiCodeforces,
  SiCodechef,
  SiLeetcode,
  SiGeeksforgeeks,
} from "react-icons/si";

function CodingProfiles() {
  const renderTooltip = (name) => <Tooltip id={`tooltip-${name}`}>{name}</Tooltip>;

  const profiles = [
    {
      name: "LeetCode Knight (1953)",
      href: "https://leetcode.com/parwez0786/",
      icon: <SiLeetcode />,
    },
    {
      name: "Codeforces Specialist (1501)",
      href: "https://codeforces.com/profile/foolcoder",
      icon: <SiCodeforces />,
    },
    {
      name: "CodeChef 4★",
      href: "https://www.codechef.com/users/codeman86",
      icon: <SiCodechef />,
    },
    {
      name: "GeeksforGeeks",
      href: "https://auth.geeksforgeeks.org/user/iit2021113",
      icon: <SiGeeksforgeeks />,
    },
  ];

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {profiles.map((profile, i) => (
        <Col
          xs={4}
          md={2}
          className="tech-icons tech-icons-animated"
          key={profile.name}
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <a
            href={profile.href}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none", color: "white" }}
          >
            <OverlayTrigger placement="bottom" overlay={renderTooltip(profile.name)}>
              <div>{profile.icon}</div>
            </OverlayTrigger>
          </a>
        </Col>
      ))}
    </Row>
  );
}

export default CodingProfiles;
