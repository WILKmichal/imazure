import * as React from "react";
import "./styles.scss";
import { getAllImage } from "../../core";
import MenuRetractable from "../../components/MenuRetractable";
import Gallery from "../../components/Layout/Gallery/gallery";

interface Image {
  name: string;
  url: string;
  height: number; // Add the height property to the Image interface
}

const Images: React.FC = () => {
  return (
    <div className="gallary_container">
      <Gallery />
    </div>
  );
};

export default Images;
