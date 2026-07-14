import React from "react";
import Particles from "react-tsparticles";

function Particle() {
  return (
    <Particles
      id="tsparticles"
      params={{
        particles: {
          number: {
            value: 90,
            density: {
              enable: true,
              value_area: 1100,
            },
          },
          color: {
            value: ["#c770f0", "#9b4ddb", "#6a3cff", "#ffffff"],
          },
          shape: {
            type: "circle",
          },
          line_linked: {
            enable: true,
            distance: 140,
            color: "#c770f0",
            opacity: 0.12,
            width: 1,
          },
          move: {
            enable: true,
            direction: "none",
            speed: 0.35,
            random: true,
            straight: false,
            out_mode: "out",
          },
          size: {
            value: 2.2,
            random: true,
          },
          opacity: {
            value: 0.45,
            random: true,
            anim: {
              enable: true,
              speed: 0.8,
              opacity_min: 0.1,
              sync: false,
            },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab",
            },
            onclick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 0.28,
              },
            },
            push: {
              particles_nb: 2,
            },
          },
        },
        retina_detect: true,
      }}
    />
  );
}

export default Particle;
