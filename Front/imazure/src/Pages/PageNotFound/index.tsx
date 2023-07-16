import * as React from "react";
import "./NotFound.scss";
import { useLocation, useNavigate } from "react-router-dom";

const PageNotFound: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const GoPageDefaukt = () => {
    navigate("/images");
  };

  return (
    <div className="not-found-container">
      <div className="card not-found-card">
        <div className="error mx-auto" data-text="404">
          404
        </div>
        <span className="empty-details">
          La Page <span className="error-path">{pathname}</span> est introuvable
        </span>
        <button onClick={GoPageDefaukt} className="animated-button">
          Retour sur les images
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
