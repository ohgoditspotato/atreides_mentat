import React from "react";
import { ReactComponent as PlusSVG } from "@fortawesome/fontawesome-free/svgs/solid/plus-circle.svg";

const AddCardButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div
      className="card add-card-button"
      onClick={onClick}
      style={{ cursor: "pointer", height: "30vh", maxHeight: "230px" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <figure className="image is-64x64">
          <PlusSVG />
        </figure>
      </div>
    </div>
  );
};

export default AddCardButton;
