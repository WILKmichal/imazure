import * as React from "react";
import ImageUpload from "../../components/ImageUpload";
import DragAndDrop from "../../components/DragAndDrop";

import "./Upload.scss";
import { handleUploadImage } from "../../core";

const Upload: React.FC = () => {
  const [droppedImages, setDroppedImages] = React.useState<File[]>([]);

  const elementRef = React.useRef<HTMLDivElement>(null);
  const [numColumns, setNumColumns] = React.useState<number>(5);

  React.useEffect(() => {
    function handleResize() {
      if (elementRef.current) {
        // setTaille(elementRef.current.offsetWidth);
      }

      if (window.innerWidth <= 500) {
        setNumColumns(1);
      } else if (window.innerWidth > 500 && window.innerWidth <= 690) {
        setNumColumns(3);
      } else {
        setNumColumns(5);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [elementRef]);

  const handleUpload = (files: FileList) => {
    console.log("Fichiers à uploader:", files);
  };

  const removeImage = (indexToRemove: number) => {
    setDroppedImages((prevImages: any[]) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  const upload = () => {
    handleUploadImage(droppedImages);
  };
  return (
    <div>
      <div className="containerUpload">
        <div className="card">
          <ImageUpload
            setDroppedImages={setDroppedImages}
            onUpload={handleUpload}
          />
          <hr />
          <DragAndDrop setDroppedImages={setDroppedImages} />
          <hr />

          <button
            disabled={droppedImages.length === 0 ? true : false}
            className={`buttonUploadImage${
              droppedImages.length === 0 ? " no-images" : ""
            }`}
            onClick={upload}
          >
            {droppedImages.length === 0
              ? "Vous n'avez selectionné aucune image"
              : "Upload images"}
          </button>
        </div>
      </div>

      <div className="galleryUpload" style={{ columnCount: numColumns }}>
        {droppedImages.map((image, index) => (
          <div key={index} className="image_container">
            <img
              src={URL.createObjectURL(image)}
              alt={image.name}
              loading="lazy"
            />
            <button
              onClick={() => removeImage(index)}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                backgroundColor: "red",
                color: "white",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                width: "25px",
                height: "25px",
                fontSize: "0.8rem",
                fontWeight: "bold",
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upload;
