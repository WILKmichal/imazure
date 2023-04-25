import * as React from "react";
// import Archer from '../../images/accueil/archer.svg'
import Archer from "../../images/accueil/archer.svg";
import "./styles.scss";

const Accueil = () => {
  return (
    <div className="grid-container">
      <div className="grid-item-left">
        <div className="center-verticaly">
          <div className="application-name">Imazure</div>
          <div className="catch-phrase">
            rechercher des photos grace à l'<div className="imphasis">IA</div>
          </div>
          <div className="by">
            une application crée par michal
            <div className="last-name"> WILK </div>
            raphael <div className="last-name"> COMANDON </div>
            ronan <div className="last-name"> ROYET </div>
          </div>
          <button className="start">Commencer</button>
        </div>
      </div>
      <div className="grid-item-right">
        {/* <div className="svg-animation"> */}
        <div className="container">
          <div className="svg-animation">
            <img src={Archer} />
          </div>
        </div>
        {/* </div> */}
        {/* <Archer /> */}
        {/* <div className="parent">
          <div className="moving-div">test right side div</div>
        </div> */}
      </div>
    </div>
  );
};

export default Accueil;
