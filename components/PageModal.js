import React from "react";
import useStackInfo from "../useStackInfo";

function goBack() {
  // Ideally this should actually go "up", not back. We'd need to keep track of
  // which navigations replaced the content of the modal and which pushed a new
  // modal onto the stack in order to know how many entries back to go.
  window.history.back();
}

export default function PageModal({ children }) {
  const { thisLevel, topLevel } = useStackInfo();
  return (
    <div aria-hidden={topLevel > thisLevel} className="Modal">
      <div className="Overlay" onClick={goBack} />
      <div className="Body">{children}</div>
      <style jsx>{`
        .Modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .Overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.2);
        }

        .Body {
          position: relative;
          margin: ${thisLevel * 60}px;
          padding: 20px;
          background: white;
        }
      `}</style>
    </div>
  );
}
