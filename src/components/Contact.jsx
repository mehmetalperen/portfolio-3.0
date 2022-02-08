import React from "react";

export default function Contact() {
  return (
    <div id="contact-section-id" className="contact">
      <div className="section-divider" />
      <div className="section-title-wrapper">
        <h3 className="section-title">Contact</h3>
      </div>

      <div className="contact-wrapper">
        <a
          href="mailto:mhmtalperennadi@gmail.com"
          className="contact-href"
          data-splitbee-event="contatct mail"
        >
          <img src="email 1.svg" alt="" className="contact-icon" />
        </a>
        <a
          href="https://www.linkedin.com/in/mehmet-nadi-03372a1b1/"
          target="_blank"
          data-splitbee-event="contatct linkedin"
          className="contact-href"
        >
          <img src="linkedin 1.svg" alt="" className="contact-icon" />
        </a>
        <a
          href="https://github.com/mehmetalperen"
          target="_blank"
          className="contact-href"
          data-splitbee-event="contatct github"
        >
          <img src="github.svg" alt="" className="contact-icon" />
        </a>
      </div>
      <style jsx>{`
        .contact-wrapper {
          min-height: 200px;
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
