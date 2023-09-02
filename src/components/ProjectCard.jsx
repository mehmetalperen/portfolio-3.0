import React, { useEffect, useState } from "react";
import TagWrapper from "./TagWrapper";
import { Collapse } from "react-bootstrap";
import ProjectPicturePlaceholder from "./ProjectPicturePlaceholder";

export default function ProjectCard(props) {
  const [isShowMoreTags, setIsShowMoreTags] = useState(false);
  const [isProjectImgLoaded, setIsProjectImgLoaded] = useState(false);
  useEffect(() => {
    if (props.projectObj.techUsed.length > 5) {
      setIsShowMoreTags(false);
    }
  }, []);

  const handleShowMoreTags = () => {
    setIsShowMoreTags(!isShowMoreTags);
  };
  return (
    <div className="project-card card border-0 m-3 mt-3 flex-fill">
      {isProjectImgLoaded ? null : <ProjectPicturePlaceholder />}
      <div className="pj-img-wrapper">
        <div className="pj-img-container">
          <div className="img-filter"></div>
          <img
            src={props.projectObj.imgURL}
            alt={props.projectObj.imgAlt}
            className="pj-img"
            style={isProjectImgLoaded ? {} : { display: "none" }}
            onLoad={() => setIsProjectImgLoaded(true)}
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
                    >{`+${props.projectObj.techUsed.length - 5}`}</a>
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
      <div className="pj-action-btn-container">
        <a
          data-splitbee-event="Button Click"
          data-splitbee-event-planType={`${props.projectObj.pjName} see preview`}
          target="_blank"
          href={props.projectObj.pjPreviewURL}
          className={`btn btn-dark pj-action-btns ${
            props.projectObj.pjPreviewURL === null ? "disabledBtn" : ""
          }`}
        >

          <svg className="visit-site-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="24 / basic / external-link">
              <path id="icon" fill-rule="evenodd" clip-rule="evenodd" d="M11.7042 13.7071L18.9971 6.41421V11H20.9971V3H12.9971V5H17.5829L10.29 12.2929L11.7042 13.7071ZM19 19V14H17V19H5V7H10V5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21H17C18.1046 21 19 20.1046 19 19Z" fill="white"/>
              </g>
          </svg>
          {` Visit Site`}
        </a>
        <a
          data-splitbee-event="Button Click"
          data-splitbee-event-planType={`${props.projectObj.pjName} see github`}
          href={props.projectObj.pjGitHubURL}
          target="_blank"
          className={`btn btn-outline-dark pj-action-btns ${
            props.projectObj.pjGitHubURL === null ? "disabledBtn" : ""
          }`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_24_69)">
                <path d="M16 22V18.13C16.0375 17.6532 15.9731 17.1738 15.811 16.7238C15.6489 16.2738 15.3929 15.8634 15.06 15.52C18.2 15.17 21.5 13.98 21.5 8.52C21.4997 7.12383 20.9627 5.7812 20 4.77C20.4559 3.54851 20.4236 2.19835 19.91 0.999999C19.91 0.999999 18.73 0.649999 16 2.48C13.708 1.85882 11.292 1.85882 9 2.48C6.27 0.649999 5.09 0.999999 5.09 0.999999C4.57638 2.19835 4.54414 3.54851 5 4.77C4.03013 5.7887 3.49252 7.14346 3.5 8.55C3.5 13.97 6.8 15.16 9.94 15.55C9.611 15.89 9.35726 16.2954 9.19531 16.7399C9.03335 17.1844 8.96681 17.6581 9 18.13V22M9 19C4 20.5 4 16.5 2 16L9 19Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                <clipPath id="clip0_24_69">
                <rect width="24" height="24" fill="white"/>
                </clipPath>
                </defs>
          </svg>
          {props.projectObj.pjGitHubURL === null ? " Private" : " Code" }
        </a>
      </div>
      <style jsx>{`
        .project-card {
          flex-wrap: nowrap;
          margin: 20px auto;
          min-width: 300px;
          max-width: 450px;
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
          -webkit-transition: background-color 600ms ease-out;
          -moz-transition: background-color 600ms ease-out;
          -o-transition: background-color 600ms ease-out;
          transition: background-color 600ms ease-out;
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

        .project-card .pj-action-btn-container {
          display: flex;
          padding: 0;
          justify-content: space-between;
          overflow: hidden;
          margin: 6px 0;
          align-items: end;
          max-height: 0;
          transition: max-height 0.15s ease-out;
        }

        .project-card:hover .pj-action-btn-container {
          visibility: visible;
          max-height: 500px;
          transition: max-height 0.25s ease-in;
        }
        .pj-action-btns {
          width: 45%;
          max-height: 60px;
        }
        .pj-action-btns:focus {
          box-shadow: none;
        }
        .disabledBtn {
          border: 1px solid #E9E9E9;
          background: #E9E9E9;
          color: black;
          pointer-events: none;
          cursor: not-allowed;

        }
        .disabledBtn:hover{
          border: 1px solid #E9E9E9;
          background: #414548;
          color:black;
          pointer-events: none;
          cursor: not-allowed;

        }
        @media only screen and (max-width: 1245px) {
          .project-card .pj-action-btn-container,
          .project-card:hover .pj-action-btn-container {
            visibility: visible;
            max-height: 500px;
            transition: none;
          }
        }
        @media only screen and (max-width: 870px) {
          .pj-action-btn-container {
            display: flex;
            padding: 0;
            justify-content: space-between;
            overflow: hidden;
            margin: 6px 0;
            align-items: end;
            opacity: 1;
            height: 100%;
            visibility: visible;
            max-height: 500px;
          }
        }
      `}</style>
    </div>
  );
}
