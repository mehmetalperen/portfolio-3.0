import React, { useEffect, useState } from "react";
import TagWrapper from "./TagWrapper";
import { Collapse } from "react-bootstrap";
export default function ProjectCard(props) {
  const [isShowMoreTags, setIsShowMoreTags] = useState(false);

  useEffect(() => {
    if (props.projectObj.techUsed.length > 5) {
      setIsShowMoreTags(false);
    }
  }, []);

  const handleShowMoreTags = () => {
    setIsShowMoreTags(!isShowMoreTags);
  };
  return (
    <div className="project-card card border-0 m-3 mt-5 flex-fill">
      <div className="pj-img-wrapper">
        <div className="pj-img-container">
          <div className="img-filter"></div>
          <img
            src={props.projectObj.imgURL}
            alt={props.projectObj.imgAlt}
            className="pj-img"
          />
        </div>
      </div>

      <div className="pj-name-wrapper">
        <h6 className="pj-name">{props.projectObj.pjName}</h6>
      </div>
      <div className="pj-tags-wrapper">
        {props.projectObj.techUsed.map((tech, index) => {
          if (index === 4 && props.projectObj.techUsed.length > 5) {
            return (
              <div>
                {!isShowMoreTags ? (
                  <div>
                    <a
                      className="tag-show-more-link btn-link"
                      onClick={() => {
                        handleShowMoreTags();
                      }}
                    >{`+ ${props.projectObj.techUsed.length - 5}`}</a>
                  </div>
                ) : null}
              </div>
            );
          } else if (index > 4) {
            return (
              <div>
                <Collapse in={isShowMoreTags}>
                  <div>
                    <TagWrapper techName={tech} />
                  </div>
                </Collapse>
              </div>
            );
          }
          return <TagWrapper techName={tech} />;
        })}
        {props.projectObj.techUsed.length > 4 && isShowMoreTags ? (
          <div>
            <a
              className="tag-show-more-link btn-link"
              onClick={() => {
                handleShowMoreTags();
              }}
            >{`Hide`}</a>
          </div>
        ) : null}
      </div>

      <div className="pj-description">
        <p className="description">{props.projectObj.pjDescription}</p>
      </div>
      <div className="pj-action-btn-container h-100">
        <a
          href={props.projectObj.pjPreviewURL}
          className={`btn btn-dark pj-action-btns ${
            props.projectObj.pjPreviewURL === null ? "disabledBtn" : ""
          }`}
        >
          <img
            src={
              props.projectObj.pjPreviewURL === null
                ? "black-preview-icon.svg"
                : "eye 1.svg"
            }
            alt=""
            className="btn-icon"
          />
        </a>
        <a
          href={props.projectObj.pjGitHubURL}
          className={`btn btn-outline-dark pj-action-btns ${
            props.projectObj.pjGitHubURL === null ? "disabledBtn" : ""
          }`}
        >
          <img src="github 1.svg" alt="" className="btn-icon" />
        </a>
      </div>
      <style jsx>{`
        .project-card {
          flex-wrap: nowrap;
          margin: 20px auto;
          min-width: 300px;
          width: 20%;
          align-items: stretch;
        }
        .pj-tags-wrapper {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          text-align: center;
          margin: 6px 0;
        }
        .tag-show-more-link {
          margin: 2px 5px;
          color: #6c757d;
        }
        .tag-show-more-link:hover {
          cursor: pointer;
          color: black;
        }
        .pj-img-wrapper {
          width: 100%;
          z-index: 10;
          background: #6c757d;
          align-items: stretch;
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
        .description {
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
          align-items: end;
        }
        .pj-action-btns {
          width: 45%;
          max-height: 60px;
        }
        .disabledBtn {
          border: 1px solid #adb5bd;
          background: repeating-linear-gradient(
            45deg,
            #6c757d,
            #6c757d 10px,
            #adb5bd 10px,
            #adb5bd 20px
          );
          cursor: not-allowed;
        }
        .disabledBtn:hover {
          border: 1px solid #adb5bd;
        }
      `}</style>
    </div>
  );
}
