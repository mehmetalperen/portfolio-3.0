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
          href="mailto:mnadi@uci.edu"
          className="contact-href"
          data-splitbee-event="Button Click"
          data-splitbee-event-planType="email btn"
        >
          <img src="email 1.svg" alt="" className="contact-icon" />
        </a>
        <a
          data-splitbee-event="Button Click"
          data-splitbee-event-planType="linkedin btn"
          href="https://www.linkedin.com/in/mehmet-nadi-03372a1b1/"
          target="_blank"
          className="contact-href"
        >
          <img src="linkedin 1.svg" alt="" className="contact-icon" />
        </a>
        <a
          data-splitbee-event="Button Click"
          data-splitbee-event-planType="github btn"
          href="https://github.com/mehmetalperen"
          target="_blank"
          className="contact-href"
        >
          <img src="github.svg" alt="" className="contact-icon" />
        </a>
        <a
          data-splitbee-event="Button Click"
          data-splitbee-event-planType="blog btn"
          href="https://www.mehmetnadiblog.com/"
          target="_blank"
          className="contact-href"
        >
          <img src="iconbook.svg" alt="" className="contact-icon" />
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
