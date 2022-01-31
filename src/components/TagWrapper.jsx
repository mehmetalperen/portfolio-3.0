import React from "react";

export default function TagWrapper() {
  return (
    <div className="pj-tags-wrapper">
      <div className="tag-container">
        <p className="tag">React</p>
      </div>

      <div className="tag-container">
        <p className="tag">TypeScript</p>
      </div>
      <div className="tag-container">
        <p className="tag">React</p>
      </div>
      <div className="tag-container">
        <p className="tag">React</p>
      </div>

      <style jsx>{`
        .pj-tags-wrapper {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          margin: 6px 0;
        }
        .tag-container {
          display: flex;
          justify-content: center;
          text-align: center;

          width: 60px;
          height: 16px;
          margin: 1px auto 0 0;
          padding: 1px 0 0 0;
          font-weight: 500;
          font-size: 8px;
          background: #6c757d;
          border-radius: 25px;
          color: #ffffff;
        }
      `}</style>
    </div>
  );
}
