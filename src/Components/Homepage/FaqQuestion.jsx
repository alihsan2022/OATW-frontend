import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import { AiOutlineMinus } from "react-icons/ai";

const FaqQuestion = ({ title, content }) => {
  const [modal, setModal] = useState(false);
  const [rotateIcon, setRotateIcon] = useState(false);

  const handleRotate = () => {
    setRotateIcon(!rotate);
    setModal(!modal);
  };

  const rotate = rotateIcon ? "rotate(180deg)" : "rotate(0)";

  return (
    <div
      className="faq-box"
      style={{
        backgroundColor: "#F4F7FA",
        padding: "15px 20px ",
        marginBottom: "10px",
        display: "flex",

        flexDirection: "column",
        textAlign: "center",
        cursor: "pointer",
      }}
      onClick={handleRotate}
    >
      <div className="question-title">
        <span
          style={{
            fontWeight: "bold",
            margin: "10px",
            color: "#6D758C",
          }}
        >
          {title}
        </span>
        {modal ? <AiOutlineMinus size={20} /> : <AiOutlinePlus size={20} />}
      </div>
      <div
        style={{
          display: modal ? "block" : "none",
        }}
        className="question-content"
      >
        <span
          style={{
            display: modal ? "block" : "none",

            color: "#B3B6BA",
            textAlign: "left",
            margin: "10px",
            color: "#9FA0A4",
            marginBottom: "20px",
          }}
        >
          {content}
        </span>
      </div>
    </div>
  );
};

export default FaqQuestion;
