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
import {
  deleteImageMultiple,
  getImagesByTag,
  handleSearchImage,
} from "../../core";
import { GetCategorys } from "../../helper";
import "./styles.scss";
import { image } from "../../core/model.db";
import ButtonBox from "../../components/AdvancedSearch/ButtonBox";
import { ImBin } from "react-icons/im";

const Images: React.FC = () => {
  const [Search, setSearch] = useState("");
  const [imageSizes, setImageSizes] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewType, setviewType] = useState("mosaic");
  const [Icon, setIcon] = useState(<MdAutoAwesomeMosaic />);
  const [images, setImages] = useState<image[] | null | undefined>(undefined);
  const [imagesSelected, setImagesSelected] = useState<number[]>([]);
  const [ModalOpen, setModalOpen] = useState(false);

  const { categorie, toggleCategoryChoice } = GetCategorys();
  const advancedSearchRef = React.useRef<HTMLDivElement>(null); // Create a reference to AdvancedSearch

  useEffect(() => {
    ImagesWithTags(); // Call ImagesWithTags when category changes
  }, [categorie]);

  useEffect(() => {
    const checkScroll = () => {
      let gallery: any = document.querySelector(".gallary_container");
      let header: any = document.querySelector(".view_choic_gallery_container");
      let scroll_category: any = document.querySelector(
        ".reload_choic_category"
      );
      if (gallery) {
        let rect = gallery.getBoundingClientRect();
        header.classList.toggle("sticky", rect.top <= 0);
        scroll_category.classList.toggle("scrollOk", rect.top <= 0);
      }
    };

    window.addEventListener("scroll", checkScroll);

    // Clean up on unmount
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

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

  const deleteImageMultiples = async () => {
    const imagesSuppr = await deleteImageMultiple(imagesSelected);

    if (imagesSuppr === true) {
      setModalOpen(false)
      setImagesSelected([]);
      ImagesWithTags();
    }
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
    setImages(undefined);

    const selectedTags = categorie
      .filter((categorie) => categorie.choix)
      .map((categorie) => categorie.tag.id);

    //setLoadImages(true);

    const images = await getImagesByTag(selectedTags);
    setImages(images);

    if (images !== null && images !== undefined) {
      const sizes = await Promise.all(
        images.map((image: { url: string | undefined }) =>
          ImageTaille(image.url)
        )
      );
      setImageSizes(sizes);
    }
    //setLoadImages(false);
  };

  const ImagesWithSearch = async (Searchs: string) => {
    // Si Search contient moins de 5 caractères, arrête la fonction

    setImages(undefined);

    //setLoadImages(true);

    console.log(Searchs);

    const images = await handleSearchImage(Searchs);
    setImages(images);

    if (images !== null && images !== undefined) {
      const sizes = await Promise.all(
        images.map((image: { url: string | undefined }) =>
          ImageTaille(image.url)
        )
      );
      setImageSizes(sizes);
    }
    //setLoadImages(false);
  };

  const handleCheckboxClick = (imageId: number) => {
    // Vérifiez si l'ID de l'image est déjà dans imagesSelected
    const isSelected = imagesSelected.includes(imageId);

    if (isSelected) {
      // Si l'ID de l'image est déjà sélectionné, supprimez-le de imagesSelected
      setImagesSelected((prevImages: any[]) =>
        prevImages.filter((id) => id !== imageId)
      );
    } else {
      // Sinon, ajoutez l'ID de l'image à imagesSelected
      setImagesSelected((prevImages: any) => [...prevImages, imageId]);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f3f4f7",
        minHeight: "100vh",
      }}
    >
      <div className="Search_container">
        <div>
          <AdvancedSearch
            categorie={categorie}
            Search={Search}
            setSearch={setSearch}
            toggleCategoryChoice={toggleCategoryChoice}
            ImagesWithSearch={ImagesWithSearch}
            ImagesWithTags={ImagesWithTags}
          />
        </div>
        <div className="view_choic_gallery_container">
          <div className="flex_reload_clear">
            <div onClick={ImagesWithTags} className="reload_choic_gallery">
              <AiOutlineReload className="icon-thicker" />
            </div>
            <div
              className="reload_clear"
              onClick={() => {
                setImagesSelected([]);
              }}
            >
              clear
            </div>
          </div>

          {ModalOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2>Confirmation</h2>
                <p>Êtes-vous sûr de vouloir supprimer cette image ?</p>
                <div className="modal-actions">
                  <button className="confirm" onClick={deleteImageMultiples}>
                    Confirmer
                  </button>
                  <button
                    className="cancel"
                    onClick={() => setModalOpen(false)}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="reload_choic_category" onClick={ImagesWithTags}>
            {categorie.map(
              (category: any, index: number) =>
                category.choix && (
                  <div key={index}>
                    <ButtonBox
                      labelColor={"#000000"}
                      category={category}
                      toggleCategoryChoice={toggleCategoryChoice}
                    />
                  </div>
                )
            )}
          </div>
          <div className="flex_view_choic_gallery">
            {imagesSelected.length !== 0 && (
              <div className="bin">
                <ImBin onClick={() => setModalOpen(true)} />
              </div>
            )}
            <div onClick={ViewTypeViewImages} className="view_choic_gallery">
              <p>view</p>
              {Icon}
            </div>
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

        {images && (
          <div className="gallary_container">
            {viewType === "mosaic" && (
              <Gallery
                handleCheckboxClick={handleCheckboxClick}
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected}
                imageSizes={imageSizes}
                images={images}
              />
            )}
            {viewType === "cards" && (
              <Grid
                handleCheckboxClick={handleCheckboxClick}
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected}
                imageSizes={imageSizes}
                images={images}
              />
            )}
            {viewType === "list" && (
              <List
                handleCheckboxClick={handleCheckboxClick}
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected}
                imageSizes={imageSizes}
                images={images}
              />
            )}
          </div>
        )}

        {images === undefined && (
          <div className="LoadImages">
            <img src={ImagesLoading} alt="" />
            <p className="LoadingImages">
              Loading <span></span>
              <span></span>
              <span></span>
            </p>
          </div>
        )}

        {images === null && (
          <div className="APIError">
            <div className="card APIErrorContent">
              <div className="Oops">Ooops !</div>
              <span className="ErreurType">
                Erreur 503 : Service non disponible
              </span>
              <span className="ErreurMessage">
                Une erreur s'est produite lors de la communication avec l'API.
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="ButtonUploadMobile">
        <button onClick={() => (window.location.href = "/upload")}>+</button>
      </div>
    </div>
  );
};

export default Images;
