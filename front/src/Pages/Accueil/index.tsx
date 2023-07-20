import * as React from "react";
import "./styles.scss";
import { getAllImage } from "../../core";

const Accueil = () => {
  React.useEffect(() => {
    try {
      recupImage();
    } catch (e) {
      // We might want to provide this error information to an error reporting service
      console.warn(e);
    }
  }, []);

  const recupImage = async () => {
    const image = await getAllImage();

    console.log(image);
  };

  return (
    <div className="grid-container-accueil">
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
          <button
            onClick={() => (window.location.href = "/images")}
            className="start"
          >
            Commencer
          </button>
        </div>
      </div>
      <div className="grid-item-right">
        <div className="container">
          <svg height="200" width="600px">
            {/* // La cible */}
            <circle
              cx="500"
              cy="80"
              r="40"
              stroke="black"
              strokeWidth="1"
              fill="white"
            />
            <circle
              cx="500"
              cy="80"
              r="30"
              stroke="black"
              strokeWidth="1"
              fill="red"
            />
            <circle
              cx="500"
              cy="80"
              r="20"
              stroke="black"
              strokeWidth="1"
              fill="blue"
            />
            <circle
              cx="500"
              cy="80"
              r="10"
              stroke="black"
              strokeWidth="1"
              fill="yellow"
            />
            {/* // Le corps */}
            <line
              x1="100"
              y1="50"
              x2="100"
              y2="150"
              style={{ stroke: "rgb(0,0,0)", strokeWidth: 2 }}
            />
            {/* // Les jambes */}
            <line
              x1="100"
              y1="150"
              x2="70"
              y2="200"
              style={{ stroke: "rgb(0,0,0)", strokeWidth: 2 }}
            />
            <line
              x1="100"
              y1="150"
              x2="130"
              y2="200"
              style={{ stroke: "rgb(0,0,0)", strokeWidth: 2 }}
            />
            {/* // Les bras */}
            <line
              x1="100"
              y1="75"
              x2="190"
              y2="75"
              style={{ stroke: "rgb(0,0,0)", strokeWidth: 2 }}
            />
            <line
              x1="100"
              y1="75"
              x2="125"
              y2="80"
              style={{ stroke: "rgb(0,0,0)", strokeWidth: 2 }}
            >
              <animate
                attributeName="x2"
                dur="1s"
                begin="0s;12s"
                values="125; 90"
                fill="freeze"
              />
              <animate
                attributeName="x2"
                dur="0.5s"
                begin="1s;13s"
                values="90; 125"
                fill="freeze"
              />
            </line>
            {/* // L'arc */}
            <path
              transform="translate(100, 100) rotate(90) translate(-100, -100)"
              d="M 10 80 A 10 10 0 0 1 150 80"
              stroke="black"
              fill="transparent"
              style={{ stroke: "rgb(128,0,0)", strokeWidth: 2 }}
            />
            {/* // la corde */}
            <path
              transform="translate(100, 100) rotate(90) translate(-100, -100)"
              d="M 10 75
              L 80 75 
               L 150 75"
              style={{ stroke: "rgb(0,0,0)", strokeWidth: 1 }}
              fill="transparent"
            >
              <animate
                attributeName="d"
                attributeType="XML"
                from="M 10 75
                L 80 75 
                 L 150 75"
                to="M 10 75
                L 80 110 
                L 150 75"
                begin="0s;12s"
                dur="1s"
                fill="freeze"
              />
              <animate
                attributeName="d"
                attributeType="XML"
                from="M 10 75
                L 80 110 
                L 150 75"
                to="M 10 75
                L 80 75 
                 L 150 75"
                begin="1s;13s"
                dur="0.1s"
                fill="freeze"
              />
            </path>
            {/* // La flèche */}
            <line
              x1="195"
              y1="80"
              x2="260"
              y2="80"
              stroke="rgb(255,0,0)"
              strokeWidth="1"
            >
              <animate
                attributeName="x1"
                dur="1s"
                begin="0s;12s"
                values="260; 190"
                fill="freeze"
              />
              <animate
                attributeName="x2"
                dur="1s"
                begin="0s;12s"
                values="195; 90"
                fill="freeze"
              />
              {/* //fleche part */}
              <animate
                attributeName="x2"
                dur="1s"
                begin="1s;13s"
                values="90; 425"
                fill="freeze"
              />
              <animate
                attributeName="x1"
                dur="1s"
                begin="1s;13s"
                values="190; 495"
                fill="freeze"
              />
            </line>
            <polygon
              points="260,80 250,75 250,85"
              style={{ fill: "rgb(0,0,0)" }}
            >
              <animate
                attributeName="points"
                dur="1s"
                begin="0s;12s"
                values="260,80 250,75 250,85; 200,80 190,75 190,85"
                fill="freeze"
              />
              {/* la fleche part */}
              <animate
                attributeName="points"
                dur="1s"
                begin="1s;13s"
                values="200,80 190,75 190,85; 500,80 490,75 490,85"
                fill="freeze"
              />
            </polygon>
            {/* //la tete */}
            <circle
              cx="100"
              cy="30"
              r="20"
              stroke="black"
              strokeWidth="3"
              fill="transparent"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Accueil;
