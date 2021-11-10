import React from "react";
import "./HorizantalCard.css";
function HorizantalCard(props) {
  return (
    <div className="HorizantalCardWrapper">
      <div className="CardLeft">
        <div className="CardLeftTop">Temps moyen par chambre </div>
        <div className="CardLeftBottom">Temps moyen général</div>
      </div>
      <div className="CardRight">
        <div className="CardRightTop">12:05</div>
        <div className="CardRightBottom">AVRG. 14:12</div>
      </div>
    </div>
  );
}

export default HorizantalCard;
