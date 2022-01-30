import React from "react";

export default function MyWorkSection() {
  return (
    <div className="my-work-section">
      <div className="section-divider" />
      <div className="section-title-wrapper">
        <h3 className="section-title">My Work</h3>
      </div>

      <div className="my-work-wrapper">
        <h3 className="section-title">My Work</h3>
        <h3 className="section-title">My Work</h3>
        <h3 className="section-title">My Work</h3>
        <h3 className="section-title">My Work</h3>
        <h3 className="section-title">My Work</h3>
        <h3 className="section-title">My Work</h3>
        <h3 className="section-title">My Work</h3>
        <h3 className="section-title">My Work</h3>
        <h3 className="section-title">My Work</h3>
      </div>
      <style jsx>{`
        .my-work-section {
          border-style: dashed;
          border-width: 1px;
          border-color: red;
          min-height: 100vh;
        }
        .section-divider {
          border: 0.25px solid #000000;
          margin: 30px 0 10px 0;
        }
        .section-title-wrapper {
          border-style: dashed;
          border-width: 1px;
          border-color: blue;
        }
        .section-title {
          font-style: normal;
          font-weight: bold;
          font-size: 30px;
          line-height: 47px;
        }

        .my-work-wrapper {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
}
