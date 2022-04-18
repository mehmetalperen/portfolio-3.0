import React from "react";

export default function TagWrapper(props) {
  return (
    <div className="">
      <div className="tag-container">
        <p className="tag">{props.techName}</p>
      </div>

      <style jsx>{`
        .tag-container {
          display: flex;
          justify-content: center;
          text-align: center;

          min-width: 60px;
          height: 16px;
          margin: 2px 5px;
          padding: 1px;
          font-weight: 500;
          font-size: 8px;
          background: #6c757d;
          border-radius: 25px;
          color: #ffffff;
        }
        .tag {
          margin: 0 2px;
          padding: 0 auto;
        }
      `}</style>
    </div>
  );
}
