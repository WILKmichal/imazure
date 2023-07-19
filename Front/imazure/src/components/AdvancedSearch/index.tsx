import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "./styles.scss";
import { GetCategorys } from "../../helper";
import Checkbox from "../CheckBox";
import SpeackInput from "./SpeackInput";
import ButtonBox from "./ButtonBox";

interface Props {
  categoriesChoice: string[];
  setSearch: Function;
  Search: string;
}

const AdvancedSearch: React.FC<Props> = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [numToShow, setNumToShow] = useState(4); // Nouvel état pour suivre le nombre d'éléments à afficher
  const categories = GetCategorys();
  const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;

  const handleChangeSearch = (event: any) => {
    props.setSearch(event.target.value);
  };

  const handleCheckedChange = (categories: string) => {
    if (props.categoriesChoice.includes(categories)) {
      for (let i = props.categoriesChoice.length - 1; i >= 0; i--) {
        if (props.categoriesChoice[i] === categories) {
          props.categoriesChoice.splice(i, 1);
        }
      }
    } else {
      props.categoriesChoice.push(categories);
    }
  };

  return (
    <div className="AdvancedSearch_container">
      <div className="AdvancedSearch">Advanced Search</div>
      <div className={`Search_container`}>
        <div
          className={`AdvancedSearch_input_container ${
            isFocused ? "focused" : ""
          }`}
        >
          <div className="icon_AdvancedSearch_input_container">
            <AiOutlineSearch />
          </div>
          <div>
            <input
              type="text"
              className="AdvancedSearch_input"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={handleChangeSearch}
              value={props.Search}
            />
          </div>
          <div className="SpeackInput_Container">
            {!isFirefox && (
              <SpeackInput
                setSearch={props.setSearch}
                setIsFocused={setIsFocused}
              />
            )}
          </div>
        </div>
        {categories.slice(0, numToShow).map((category: any, index: number) => (
          <div key={index}>
            <ButtonBox
              labelColor={"#000000"}
              label={category.tag.name}
              isChecked={category.choix}
              onCheckedChange={handleCheckedChange}
            />
          </div>
        ))}
        {numToShow < categories.length ? ( // Si il y a plus d'éléments à afficher, montrer le bouton "Show More"
          <div
            className="tag"
            onClick={() => setNumToShow(categories.length)}
            style={{
              color: "rgb(52, 72, 197)",
            }}
          >
            + Show More
          </div>
        ) : (
          <div
            className="tag"
            style={{
              color: "rgb(52, 72, 197)",
            }}
            onClick={() => setNumToShow(4)}
          >
            - show less{" "}
          </div>
        )}
        {/* <div className="AdvancedSearch_Tag">
          <span className="AdvancedSearch_Tag_Title">test</span>
        </div> */}
      </div>
    </div>
  );
};

export default AdvancedSearch;
