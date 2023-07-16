import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import "./CustomHR.css";
import { GetCategorys } from "../../helper";
import Checkbox from "../CheckBox";
import SpeackInput from "./SpeackInput";

interface Props {
  setNumColumns: React.Dispatch<React.SetStateAction<number>>;
  numColumns: number;
}

const MenuRetractable: React.FC<Props> = (props) => {
  const categoriesChoice: string[] = [];
  const categories = GetCategorys();
  const [isOpen, setIsOpen] = useState(false);
  const [Search, setSearch] = useState("");

  const handleCheckedChange = (categories: string) => {
    if (categoriesChoice.includes(categories)) {
      for (let i = categoriesChoice.length - 1; i >= 0; i--) {
        if (categoriesChoice[i] === categories) {
          categoriesChoice.splice(i, 1);
        }
      }
    } else {
      categoriesChoice.push(categories);
    }
  };

  const handleChangeSearch = (event: any) => {
    setSearch(event.target.value);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleColumnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.setNumColumns(parseInt(event.target.value));
  };

  const handleSearch = () => {
    console.log(categoriesChoice);
  };
  return (
    <div
      style={{
        // minHeight: "100vh",
        boxShadow: isOpen ? "4px 4px 4px 0px rgba(0, 0, 0, 0.2)" : "none",
        borderRadius: "15px",
        position: "fixed",
        left: 10,
        top: 10,
        bottom: 10,
        width: isOpen ? "200px" : "50px",
        backgroundColor: isOpen ? "#EDEDED" : "transparent",
        border: isOpen ? "1px solid #c4c6c3" : "none",
        transition: "width 0.3s ease, background-color 0.3s ease",
        zIndex: 1,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50px",
          color: "#fff",
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
              background: "#EDEDED",
              borderRadius: isOpen ? "0%" : "50%",
              zIndex: 1,
              transition: "border-radius 0.3s ease",
            }}
          >
            <FiX
              style={{
                cursor: "pointer",
              }}
              onClick={toggleSidebar}
              color="#000000"
              size={24}
            />
          </div>
        ) : (
          <div
            onClick={toggleSidebar}
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
            <FiMenu
              style={{
                cursor: "pointer",
              }}
              size={24}
            />
          </div>
        )}
      </div>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          marginTop: isOpen ? "auto" : "0",
          transition: "margin-top 0.3s ease",
        }}
      >
        <li
          style={{
            textAlign: "center",
            padding: "15px 20px",
            color: "#000000",
            fontSize: isOpen ? "16px" : "0",
            transition: "font-size 0.3s ease",
          }}
        >
          recherche filtrer
        </li>

        <li>
          {isOpen && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                height: "104px",
                background: "transparent",
                zIndex: 1,
                transition: "display 1s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "104px",
                  background: "#fff",
                  borderRadius: "25px",
                  width: "100%",
                  zIndex: 1,
                  transition: "display 1s ease",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <div style={{ width: "90" }}>
                  <SpeackInput setSearch={setSearch} />
                  <textarea
                    style={{
                      border: "none",
                      resize: "none",
                      background: "transparent",
                      fontSize: "12px",
                      height: "100px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      outline: "none",
                    }}
                    placeholder={"tarte a la pomme vu de haut"}
                    value={Search}
                    onChange={handleChangeSearch}
                  />
                </div>
              </div>
            </div>
          )}
        </li>

        {isOpen && (
          <>
            <label htmlFor="column-select">Number of columns:</label>
            <select
              id="column-select"
              value={props.numColumns}
              onChange={handleColumnChange}
            >
              {window.innerWidth <= 450 && (
                <>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </>
              )}
              {window.innerWidth > 450 && window.innerWidth <= 690 && (
                <>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </>
              )}
              {window.innerWidth > 690 && (
                <>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </>
              )}
            </select>
          </>
        )}
        <li>{isOpen && <hr />}</li>

        {isOpen && (
          <li
            style={{
              overflow: "auto",
              maxHeight: "60vh",
            }}
          >
            {categories.map((category: any, index: number) => (
              <div
                style={{
                  paddingLeft: "10px",
                  // textAlign: "center",
                }}
                key={index}
              >
                <Checkbox
                  labelColor={"#000000"}
                  label={category.nom}
                  isChecked={category.choix}
                  onCheckedChange={handleCheckedChange}
                />
              </div>
            ))}
          </li>
        )}
        <li>
          {isOpen && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                background: "transaprent",
                marginTop: "10px",
                zIndex: 1,
                transition: "display 1s ease ",
              }}
            >
              <button
                onClick={handleSearch}
                style={{
                  border: "none",
                  background: "#000000",
                  fontSize: "12px",
                  width: "80%",
                  borderRadius: "15px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  outline: "none",
                  color: "white",
                }}
              >
                Recherche
              </button>
            </div>
          )}
        </li>

        {/* Ajoutez d'autres éléments de navigation ici */}
      </ul>
    </div>
  );
};

export default MenuRetractable;
