import React from "react";
import ProjectCard from "./ProjectCard";

export default function MyWorkSection() {
  return (
    <div className="my-work-section">
      <div className="section-divider" />
      <div className="section-title-wrapper">
        <h3 className="section-title">My Work</h3>
      </div>

      <div className="my-work-wrapper">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
      <style jsx>{`
        .my-work-section {
          margin: 50px auto;
        }
        .section-divider {
          border: 0.25px solid #000000;
          margin: 30px 0 10px 0;
        }
        .section-title-wrapper {
        }
        .section-title {
          font-style: normal;
          font-weight: bold;
          font-size: 30px;
          line-height: 47px;
          text-decoration: underline;
        }

        .my-work-wrapper {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: space-evenly;
        }
      `}</style>
    </div>
  );
}
