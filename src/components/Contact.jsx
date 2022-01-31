import React from "react";

export default function Contact() {
  return (
    <div className="contact">
      <div className="section-divider" />
      <div className="section-title-wrapper">
        <h3 className="section-title">Contact</h3>
      </div>

      <div className="contact-wrapper">
        <a href="" className="contact-href">
          <img src="email 1.svg" alt="" className="contact-icon" />
        </a>
        <a href="" className="contact-href">
          <img src="linkedin 1.svg" alt="" className="contact-icon" />
        </a>
        <a href="" className="contact-href">
          <img src="github.svg" alt="" className="contact-icon" />
        </a>
      </div>
      <style jsx>{`
        .contact-wrapper {
          height: 200px;
          display: flex;
          justify-content: space-around;
          padding: 50px auto;
          margin: 30px auto;
          flex-wrap: wrap;
        }
        .contact-href {
          margin: 0 auto;
        }
        .contact-icon {
          margin: 30px;
        }
        .contact-href:hover {
          opacity: 0.6;
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}
