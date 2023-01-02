import React from "react";

export default function PlaceholderProfilePic() {
  return (
    <>
      <div className="profile-pic-wrapper"></div>
      <style jsx>{`
        .profile-pic-wrapper {
          width: 250px;
          height: 333px;
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
