import React, { useState, useEffect, useRef } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";

const AUTO_SCROLL_MS = 3500;

function ProjectCards(props) {
  const images =
    props.imgPaths && props.imgPaths.length
      ? props.imgPaths
      : props.imgPath
      ? [props.imgPath]
      : [];
  const [index, setIndex] = useState(0);
  const pausedRef = useRef(false);
  const current = images[index] || images[0];
  const multi = images.length > 1;

  useEffect(() => {
    if (!multi) return undefined;

    const id = setInterval(() => {
      if (pausedRef.current || document.hidden) return;
      setIndex((i) => (i + 1) % images.length);
    }, AUTO_SCROLL_MS);

    return () => clearInterval(id);
  }, [multi, images.length]);

  const showPrev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i - 1 + images.length) % images.length);
  };

  const showNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i + 1) % images.length);
  };

  return (
    <Card className="project-card-view">
      <div
        className="project-card-media"
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          pausedRef.current = false;
        }}
        onFocus={() => {
          pausedRef.current = true;
        }}
        onBlur={() => {
          pausedRef.current = false;
        }}
      >
        {current && (
          <Card.Img
            variant="top"
            src={current}
            alt="card-img"
            className="project-card-img"
          />
        )}
        {multi && (
          <>
            <button
              type="button"
              onClick={showPrev}
              aria-label="Previous image"
              style={{
                position: "absolute",
                left: 8,
                top: "50%",
                transform: "translateY(-50%)",
                border: "none",
                background: "rgba(0,0,0,0.45)",
                color: "#fff",
                borderRadius: "50%",
                width: 28,
                height: 28,
                cursor: "pointer",
              }}
            >
              ‹
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Next image"
              style={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                border: "none",
                background: "rgba(0,0,0,0.45)",
                color: "#fff",
                borderRadius: "50%",
                width: 28,
                height: 28,
                cursor: "pointer",
              }}
            >
              ›
            </button>
            <div
              style={{
                position: "absolute",
                bottom: 8,
                left: 0,
                right: 0,
                textAlign: "center",
                color: "#fff",
                fontSize: "0.75rem",
                textShadow: "0 1px 2px rgba(0,0,0,0.8)",
              }}
            >
              {index + 1} / {images.length}
            </div>
          </>
        )}
      </div>
      <Card.Body className="project-card-body">
        <div className="project-card-header">
          <Card.Title className="mb-0">{props.title}</Card.Title>
          {props.timeline && (
            <span className="project-timeline">{props.timeline}</span>
          )}
        </div>
        <Card.Text className="project-card-desc">
          {props.description}
        </Card.Text>
        <div className="project-card-actions">
          <Button variant="primary" href={props.ghLink} target="_blank">
            <BsGithub /> &nbsp;
            {props.isBlog ? "Blog" : "GitHub"}
          </Button>
          {!props.isBlog && props.demoLink && (
            <Button variant="primary" href={props.demoLink} target="_blank">
              <CgWebsite /> &nbsp;
              Demo
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
export default ProjectCards;
