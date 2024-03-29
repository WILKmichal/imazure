import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import ButtonBox from "./ButtonBox";
import SpeackInput from "./SpeackInput";
import "./styles.scss";

interface Props {
  setSearch: Function;
  Search: string;
  toggleCategoryChoice: Function;
  categorie: any;
  ImagesWithSearch: Function;
  ImagesWithTags: Function;
}

const AdvancedSearch: React.FC<Props> = (props: Props) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [numToShow, setNumToShow] = useState<number>(4); // Nouvel état pour suivre le nombre d'éléments à afficher
  const isFirefox: boolean =
    navigator.userAgent.toLowerCase().indexOf("firefox") > -1;

  const handleChangeSearch = async (event: any) => {
    const tester = event.target.value.toString();
    props.setSearch(tester);
    if (tester.length === 0) {
      props.ImagesWithTags();
      return;
    }
    if (tester.length < 4) {
      return;
    }
    console.log(tester);

    props.ImagesWithSearch(tester);
  };

  return (
    <div className="AdvancedSearch_container">
      <div className="AdvancedSearch">
        <div>Advanced Search</div>
        <div className="buttonUpload_container">
          <div
            onClick={() => (window.location.href = "/upload")}
            className="buttonUpload"
          >
            <div className="word">Add Images</div>
          </div>
        </div>
      </div>
      <div className={`Search_container`}>
        <div
          className={`AdvancedSearch_input_container ${
            isFocused ? "focused" : ""
          }`}
        >
          <div className="icon_AdvancedSearch_input_container">
            <AiOutlineSearch />
          </div>
          <div className="AdvancedSearch_input_container_input">
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
                ImagesWithSearch={props.ImagesWithSearch}
              />
            )}
          </div>
        </div>
        {props.categorie.slice(0, numToShow).map(
          (category: any, index: number) =>
            category.tag.image_count !== 0 && (
              <div key={index}>
                <ButtonBox
                  labelColor={"#000000"}
                  category={category}
                  toggleCategoryChoice={props.toggleCategoryChoice}
                />
              </div>
            )
        )}
        {numToShow < props.categorie.length ? ( // Si il y a plus d'éléments à afficher, montrer le bouton "Show More"
          <div
            className="tag"
            onClick={() => setNumToShow(props.categorie.length)}
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
