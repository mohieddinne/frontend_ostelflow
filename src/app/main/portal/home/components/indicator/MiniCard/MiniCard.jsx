import React from "react";
import "./MiniCard.css";
// import Background from "./svgs/sunnyweather.svg";
function MiniCard(props) {
  const { color, title, number } = props;
  return (
    <div className="CardWrapper" style={{ borderColor: color }}>
      <div className="CardTop" style={{ color: color }}>
        {number}
      </div>
      <div className="CardBottom" style={{ backgroundColor: color }}>
        {title}
      </div>
    </div>
  );
}

export default MiniCard;
