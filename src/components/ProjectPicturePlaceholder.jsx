import React from "react";

export default function ProjectPicturePlaceholder() {
  return (
    <>
      <div className="profile-pic-wrapper"></div>
      <style jsx>{`
        .profile-pic-wrapper {
          width: 100%;
          max-height: 250px;
          background-color: red;
          animation: placeholder linear 2s infinite;
          animation-direction: alternate;
        }
        @keyframes placeholder {
          0% {
            background-color: black;
            opacity: 100%;
          }

          100% {
            background-color: #6c757d;
            opacity: 50%;
          }
        }
      `}</style>
    </>
  );
}
