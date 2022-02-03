import React from "react";
import TagWrapper from "./TagWrapper";

export default function ProjectCard(props) {
  return (
    <div className="project-card m-3 mt-5">
      <div className="pj-img-wrapper">
        <div className="pj-img-container">
          <div className="img-filter"></div>
          <img src="counselHero-pic.png" alt="" className="pj-img" />
        </div>
      </div>

      <div className="pj-name-wrapper">
        <h6 className="pj-name">pj name</h6>
      </div>
      <TagWrapper />

      <div className="pj-description">
        <p className="discription">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt,
          illo! Beatae, eum, distinctio alias quae numquam a incidunt{" "}
          {props.description}
        </p>
      </div>
      <div className="pj-action-btn-container">
        <a
          href="https://flamboyant-dubinsky-730d49.netlify.app/"
          className="btn btn-dark pj-action-btns"
        >
          <img src="eye 1.svg" alt="" className="btn-icon" />
        </a>
        <a
          href="https://flamboyant-dubinsky-730d49.netlify.app/"
          className="btn btn-outline-dark pj-action-btns"
        >
          <img src="github 1.svg" alt="" className="btn-icon" />
        </a>
      </div>
      <style jsx>{`
        .project-card {
          flex-wrap: nowrap;
          justify-content: center;
          margin: 20px auto;
          min-width: 300px;
          width: 20%;
          height: fit-content;
        }

        .pj-img-wrapper {
          width: 100%;
          z-index: 10;
          background: #6c757d;
        }
        .pj-img-container {
          position: relative;
        }
        .pj-img {
          max-width: 100%;
        }
        .img-filter {
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          background: rgba(173, 181, 189, 0.65);
          -webkit-transition: background-color 1s ease-out;
          -moz-transition: background-color 1s ease-out;
          -o-transition: background-color 1s ease-out;
          transition: background-color 1s ease-out;
        }

        .project-card:hover .img-filter {
          background: rgba(173, 181, 189, 0);
        }

        .pj-name {
          margin: 6px 0;
          font-style: normal;
          font-weight: bold;
          font-size: 20px;
          line-height: 29px;

          color: #000000;
        }
        .discription {
          font-weight: 400;
          font-size: 16px;
          line-height: 20px;

          color: rgba(0, 0, 0, 0.4);
          margin: 6px 0;
        }

        .pj-action-btn-container {
          display: flex;
          padding: 0;
          justify-content: space-between;
          margin: 6px 0;
        }
        .pj-action-btns {
          width: 45%;
        }
      `}</style>
    </div>
  );
}
