import React from "react";
import { Link } from "react-scroll";

export default function Home() {
  return (
    <div id="home-id" className="home">
      <div className="img-wrapper">
        <img src="my-pic.jpg" alt="" className="pic" />
      </div>
      <div className="greeding-wrapper">
        <h3 className="greeting-title">Hi, I'm Mehmet</h3>
        <p className="brief-intro">
          Software Developer, second-year Computer Science major.
        </p>
        <p className="into-paragraph">
          I love creating UI designs and bringing them to life with the magic of
          React, JS, CSS, HTML, Material-UI, Boostrap, Redux, and Python.
        </p>
        <div className="button-wrapper">
          <Link
            to="contact-section-id"
            duration={500}
            data-splitbee-event="Navigate to contect me. Intro section btn"
          >
            <a className="btn btn-dark home-btns">Contact Me</a>
          </Link>
          <Link
            to="my-work-section-id"
            duration={500}
            data-splitbee-event="Navigate to my work section. Intro section btn"
          >
            <a className="btn btn-outline-dark home-btns">My Work</a>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .home {
          display: flex;
          align-items: flex-end;
          min-width: fit-content;
          margin: 5% 0;
        }

        .img-wrapper {
          margin: 0 5% 0 0;
          min-width: 250px;
        }

        .greeding-wrapper {
          max-width: 680px;
        }
        .pic {
          max-width: 250px;
        }

        .greeting-title {
          font-style: normal;
          font-weight: bold;
          font-size: 40px;
          line-height: 47px;
          display: flex;
        }

        .brief-intro {
          font-style: normal;
          font-weight: 500;
          font-size: 17px;
          display: flex;
          flex-wrap: wrap;
          word-wrap: break-word;
          color: #6c757d;
          max-width: 680px;
        }

        .into-paragraph {
          font-weight: 500;
          font-size: 22px;
          line-height: 37px;
          color: #000000;
        }
        .button-wrapper {
          width: 65%;
          min-width: fit-content;
          display: flex;
          justify-content: space-between;
        }
        .home-btns {
          margin: 5px 10px 5px 0;
        }

        @media only screen and (max-width: 870px) {
          .home {
            flex-wrap: wrap;
            justify-content: center;
          }
          .img-wrapper {
            width: 100%;
            margin: 0 0 50px 0;
            display: flex;
            justify-content: center;
          }
          .greeding-wrapper {
            min-width: 100%;
            margin: 0;
            padding: 0;
          }
          .button-wrapper {
            flex-wrap: wrap;
            width: 100%;
          }
          .home-btns {
            margin-left: 0;
            margin-right: 0;
          }
        }
        @media only screen and (max-width: 500px) {
          .home-btns {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
