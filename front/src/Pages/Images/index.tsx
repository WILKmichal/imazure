import * as React from "react";
import { useEffect, useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { FaCheck, FaThList } from "react-icons/fa";
import { MdAutoAwesomeMosaic } from "react-icons/md";
import { TfiLayoutGrid3Alt } from "react-icons/tfi";
import ImagesLoading from "../../assets/img/LoadImages.gif";
import AdvancedSearch from "../../components/AdvancedSearch";
import Gallery from "../../components/Gallery/gallery";
import List from "../../components/List";
import Grid from "../../components/grids";
import { getImagesByTag } from "../../core";
import { GetCategorys } from "../../helper";
import "./styles.scss";

export interface IImage {
  images: [
    {
      name: string;
      url: string;
    }
  ];
  API: boolean;
}

const Images: React.FC = () => {

  const [Search, setSearch] = useState("");
  const [LoadImages, setLoadImages] = useState(true);
  const [imageSizes, setImageSizes] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewType, setviewType] = useState("list");
  const [Icon, setIcon] = useState(<TfiLayoutGrid3Alt />);
  const [images, setImages] = useState<IImage>({
    images: [{ name: "", url: "" }],
    API: true,
  });

  const { categorie, toggleCategoryChoice } = GetCategorys();

  useEffect(() => {
    ImagesWithTags(); // Call ImagesWithTags when category changes
  }, [categorie]);

  const ImageTaille = (image?: string) => {
    return new Promise<any>((resolve) => {
      if (!image) {
        resolve("Pas de taille");
      } else {
        let imageTailles = new Image();
        imageTailles.src = image;
        imageTailles.onload = () => {
          const { width, height } = imageTailles;
          resolve({ width, height });
        };
        imageTailles.onerror = () => {
          resolve("Erreur lors du chargement de l'image");
        };
      }
    });
  };

  const ViewTypeViewImages = () => {
    setIsModalOpen(true);
  };

  const ChoiceView = (choice: string, icon: any) => {
    setviewType(choice);
    setIcon(icon);
    setIsModalOpen(false);
  };

  const ImagesWithTags = async () => {
    // Filter the categories whose 'choix' is true, then map to get only the tags
    const selectedTags = categorie
      .filter((categorie) => categorie.choix)
      .map((categorie) => categorie.tag.id);

    setLoadImages(true);

    const images = await getImagesByTag(selectedTags);
    setImages({ images: images.images, API: images.API });

    const sizes = await Promise.all(
      images.images.map((image: { url: string | undefined }) =>
        ImageTaille(image.url)
      )
    );
    setImageSizes(sizes);
    setLoadImages(false);
  };

  return (
    <div
      style={{
        backgroundColor: "#f3f4f7",
        minHeight: "100vh",
      }}
    >
      <div className="Search_container">
        <AdvancedSearch
          categorie={categorie}
          Search={Search}
          setSearch={setSearch}
          toggleCategoryChoice={toggleCategoryChoice}
        />
        <div className="view_choic_gallery_container">
          <div className="reload_choic_gallery" onClick={ImagesWithTags}>
            <AiOutlineReload />
          </div>
          <div onClick={ViewTypeViewImages} className="view_choic_gallery">
            <p>view</p>
            {Icon}
          </div>
          {isModalOpen && (
            <div className="modal">
              <div className="modalContainer">
                <div className="choice">
                  <span
                    onClick={() =>
                      ChoiceView("mosaic", <MdAutoAwesomeMosaic />)
                    }
                  >
                    <div>
                      <MdAutoAwesomeMosaic /> Mosaic
                    </div>
                    <div>{viewType === "mosaic" && <FaCheck />}</div>
                  </span>
                </div>
                <div className="choice">
                  <span
                    onClick={() => ChoiceView("cards", <TfiLayoutGrid3Alt />)}
                  >
                    <div>
                      <TfiLayoutGrid3Alt /> Card
                    </div>
                    <div>{viewType === "cards" && <FaCheck />}</div>
                  </span>
                </div>
                <div className="choice">
                  <span onClick={() => ChoiceView("list", <FaThList />)}>
                    <div>
                      <FaThList /> List
                    </div>
                    <div>{viewType === "list" && <FaCheck />}</div>
                  </span>
                </div>
              </div>
              {/* Your modal content here */}
            </div>
          )}
        </div>

        {!LoadImages ? (
          <div className="gallary_container">
            {viewType === "mosaic" && (
              <Gallery imageSizes={imageSizes} images={images} />
            )}
            {viewType === "cards" && (
              <Grid imageSizes={imageSizes} images={images} />
            )}
            {viewType === "list" && (
              <List imageSizes={imageSizes} images={images} />
            )}
          </div>
        ) : (
          <div className="LoadImages">
            <img src={ImagesLoading} alt="" />
            <p className="LoadingImages">
              Loading <span></span>
              <span></span>
              <span></span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Images;
