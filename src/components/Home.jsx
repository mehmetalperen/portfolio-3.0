import React from "react";

export default function Home() {
  return (
    <div className="home">
      <div className="img-wrapper">
        <img src="my-pic.jpg" alt="" className="pic" />
      </div>
      <div className="greeding-wrapper">
        <h3 className="greeting-title">Hi, I'm Mehmet</h3>
        <p className="brief-intro">
          Software Developer, second-year Computer Science majorg
        </p>
        <p className="into-paragraph">
          I love creating UI designs and bringing them to life with the magic of
          React, JS, CSS, HTML, Material-UI, Boostrap, Redux, and Python.g
        </p>
        <div className="button-wrapper">
          <button type="button" class="btn btn-dark home-btns">
            Contect Me
          </button>
          <button type="button" class="btn btn-outline-dark home-btns">
            My Work
          </button>
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
          border-radius: 10px;
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
          font-size: 20px;
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
          width: 60%;
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
            width: 100%;
            margin: 0;
          }
          .button-wrapper {
            flex-wrap: wrap;
            justify-content: space-evenly;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
