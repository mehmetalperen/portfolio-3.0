import React from "react";
import { Link } from "react-scroll";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="logo-wrapper">
        <a className="logo-link">
          <Link to="home-id" duration={500}>
            <h1 className="logo">Mehmet Nadi</h1>
          </Link>
        </a>
      </div>

      <div className="navigation-wrapper">
        <a href="" className="navigation">
          <Link to="my-work-section-id" duration={500}>
            Work
          </Link>
        </a>
        <a href="" className="navigation">
          <Link to="contact-section-id" duration={500}>
            Contact
          </Link>
        </a>
      </div>
      <style jsx>{`
        .navbar {
          overflow: auto;
            display: flex;
            justify-content: space-between;
            padding: 1.2rem 0;
            position: sticky;
            top: 0;
            z-index: 100;
            background-color: white;
            border-radius: 0;
       
        }
       
       
        .logo {
          font-style: normal;
          font-weight: bold;
          font-size: 30px;
          line-height: 35px;
        }
        .navigation {
            font-style: normal;
            font-weight: bold;
            font-size: 20px;
            line-height: 23px;
            margin: 0 10px;
        }


        .navigation-wrapper{

          min-width: 200px;
          width: 22%;
          display: flex;
          flex-wrap: nowrap;
          justify-content: space-between;
        }

    

        @media only screen and (max-width: 500px) {
          .navigation-wrapper {
            display: none;
          }
        }


          }
      `}</style>
    </div>
  );
}
