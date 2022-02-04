import React from "react";
import ProjectCard from "./ProjectCard";
import projects from "../JS/projects";
export default function MyWorkSection() {
  return (
    <div className="my-work-section">
      <div className="section-divider" />
      <div className="section-title-wrapper">
        <h3 className="section-title">My Work</h3>
      </div>

      <div className="my-work-wrapper">
        {projects.map((project, index) => {
          return <ProjectCard key={index} projectObj={project} />;
        })}
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
          align-items: stretch;
          flex-wrap: wrap;
          justify-content: space-evenly;
        }
      `}</style>
    </div>
  );
}
