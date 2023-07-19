import { useEffect, useState } from "react";
import { GetCategorys } from "../../../helper";

type ButtonBoxProps = {
  category: any;
  labelColor: string;
  index?: number;
  toggleCategoryChoice: Function;
};

const ButtonBox = ({
  category,
  toggleCategoryChoice,
  index = 0,
  labelColor,
}: ButtonBoxProps) => {
  return (
    <div
      // onClick={handleCheckedChange}
      onClick={() => toggleCategoryChoice(category.tag.id)} // Pass toggleCategoryChoice method
      className="tag tag-hover"
      key={index}
      style={{
        backgroundColor: category.choix ? "#94ffa3" : "#e2e2e2",
      }}
    >
      <span style={{ color: category.choix ? "rgb(52, 72, 197)" : labelColor }}>
        {category.tag.name}
      </span>
    </div>
  );
};

export default ButtonBox;
