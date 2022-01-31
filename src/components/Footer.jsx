import React from "react";

export default function Footer() {
  return (
    <div className="footer">
      <div className="section-divider" />
      <div className="footer-container">
        <p className="footer-content">Made with 🖤 on Jan 30, 2022</p>
      </div>

      <style jsx>{`
        .footer-container {
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
