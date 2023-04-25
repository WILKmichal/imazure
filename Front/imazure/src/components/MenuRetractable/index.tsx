import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Icon from "../../assets/img/wave-haikei.svg";

const MenuRetractable: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      style={{
        // minHeight: "100vh",
        borderRadius: "15px",
        position: "fixed",
        left: 10,
        top: 10,
        bottom: 10,
        width: isOpen ? "200px" : "50px",
        backgroundColor: isOpen ? "#333" : "transparent",
        transition: "width 0.3s ease, background-color 0.3s ease",
        zIndex: 1,
      }}
    >
      <div
        onClick={toggleSidebar}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50px",
          color: "#fff",
          cursor: "pointer",
          zIndex: 1,
        }}
      >
        {isOpen ? (
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
              width: "90%",
              height: "35px",
              background: "#333",
              borderRadius: isOpen ? "0%" : "50%",
              zIndex: 1,
              transition: "border-radius 0.3s ease",
            }}
          >
            <FiX size={24} />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "35px",
              height: "35px",
              background: "#333",
              borderRadius: isOpen ? "0%" : "50%",
              zIndex: 1,
              transition: "border-radius 0.3s ease",
            }}
          >
            <FiMenu size={24} />
          </div>
        )}
      </div>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          marginTop: isOpen ? "20px" : "0",
          transition: "margin-top 0.3s ease",
        }}
      >
        <li
          style={{
            textAlign: "center",
            padding: "15px 20px",
            color: "#fff",
            fontSize: isOpen ? "16px" : "0",
            transition: "font-size 0.3s ease",
          }}
        >
          recherche filter
        </li>

        <li>
          {isOpen && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: "104px",
                background: "transaprent",
                zIndex: 1,
                transition: "display 1s ease ",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "104px",
                  background: "#fff",
                  borderRadius: "25px",
                  width: "80%",
                  zIndex: 1,
                  transition: "display 1s ease ",
                  alignItems: "center", // Ajout de l'alignement vertical
                }}
              >
                <textarea
                  style={{
                    border: "none",
                    background: "transparent",
                    fontSize: "12px",
                    height: "100px",
                    display: "flex", // Ajout du conteneur flexible
                    alignItems: "center", // Ajout de l'alignement vertical
                    justifyContent: "center", // Ajout de l'alignement horizontal
                    outline: "none",
                  }}
                />
              </div>
            </div>
          )}
        </li>
        {/* Ajoutez d'autres éléments de navigation ici */}
      </ul>
    </div>
  );
};

export default MenuRetractable;
