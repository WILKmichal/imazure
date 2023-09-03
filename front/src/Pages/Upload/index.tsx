import * as React from "react";
import ImageUpload from "../../components/ImageUpload";
import DragAndDrop from "../../components/DragAndDrop";
import { RiUploadCloud2Line } from "react-icons/ri";
import { MdKeyboardBackspace } from "react-icons/md";

import "./Upload.scss";
import { handleUploadImage, handleUpdateImages } from "../../core";
import ImageComponent from "./component/ImageComponent";
import UploadedImage from "./component/UploadedImage";

const Upload: React.FC = () => {
  const [droppedImages, setDroppedImages] = React.useState<any>([]);
  const [isOpenModalError, setIsOpenModalError] = React.useState(false);
  const [uploadStep, setUploadStep] = React.useState("upload");

  const elementRef = React.useRef<HTMLDivElement>(null);
  const [numColumns, setNumColumns] = React.useState<number>(5);
  const [newTag, setNewTag] = React.useState<any>({name: ""});

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

  const [filesSelected, setFilesSelected] = React.useState<boolean>(false);

  const handleDragOver = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setFilesSelected(true);
    },
    []
  );

  const handleDragLeave = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setFilesSelected(false);
    },
    []
  );
  const handleDrop = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );
    setDroppedImages((prevImages: any[]) =>
      prevImages.concat(files)
    );

    setFilesSelected(false);
  }, []);

  const handleUpload = (files: FileList) => {
    console.log("Fichiers à uploader:", files);
  };

  const removeImage = (indexToRemove: number) => {
    setDroppedImages((prevImages: any[]) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  const update = async () => {
    const uploadI = await handleUpdateImages(droppedImages);
    window.location.href = "/images";
  };

  const upload = async () => {
    const uploadI = await handleUploadImage(droppedImages);

    if (uploadI.API === false) {
      setIsOpenModalError(true);
      return;
    }
    setUploadStep("update");
    setDroppedImages(uploadI.response)
  };

  const handleChangeDescription = (index: number) => (event: any) => {
    setDroppedImages((prevImages: any[]) =>
      prevImages.map((image, i) =>
        i === index ? { ...image, description: event.target.value } : image
      )
    );
  };

  const handleChangeTitle = (index: number) => (event: any) => {
    setDroppedImages((prevImages: any[]) =>
      prevImages.map((image, i) =>
        i === index ? { ...image, title: event.target.value } : image
      )
    );
  };

  const addTag = (index: number) => {
    setDroppedImages((prevImages: any[]) =>
      prevImages.map((image, i) =>
        i === index ? { ...image, tags: [...image.tags, newTag] } : image
      )
    );
    setNewTag({name: ""});
  };

  const deleteTag = (imageIndex: number, tagIndex: number) => {
    setDroppedImages((prevImages: any[]) =>
      prevImages.map((image, i) =>
        i === imageIndex
          ? {
              ...image,
              tags: image.tags.filter((_: any, j: number) => j !== tagIndex),
            }
          : image
      )
    );
  };

  return (
    <>
    <div className="back-arrow" style={{ cursor: "pointer" }} onClick={() => (window.location.href = "/images")}>
    <span className="icon">
    <MdKeyboardBackspace/>
    </span>
    Back to images
    </div>
      {isOpenModalError && (
        <div
          style={{
            position: "absolute",
            height: "100vh",
            width: "100vw",
            zIndex: 100,
            background: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="APIError">
            <div className="card APIErrorContent">
              <button
                onClick={() => setIsOpenModalError(false)}
                style={{
                  position: "absolute",
                  right: 10,
                  top: 10,
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  backgroundColor: "black",
                  color: "white",
                  fontSize: 20,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                &times;
              </button>
              <div className="Oops">Ooops !</div>
              <span className="ErreurType">
                Erreur 503 : Service non disponible
              </span>
              <span className="ErreurMessage">
                Une erreur s'est produite lors de la communication avec l'API.
              </span>
            </div>
          </div>
        </div>
      )}

      <div
        className="containerPageUpload"
      >
        {uploadStep === "upload" && (<div
          className="containerUpload"
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div>
            <h1>Upload Image</h1>
            <div className="card_upload">
              <RiUploadCloud2Line size={40} color="#3448c5" />
              <p>Select files or drag and drop</p>
              <ImageUpload
                setDroppedImages={setDroppedImages}
                onUpload={handleUpload}
              />
            </div>
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
        </div>)}

        {uploadStep === "update" && (
          <div>
            <h1>Preview</h1>
          <button className="buttonUploadImage" onClick={update}>
            Save changes
          </button>
          </div>
        )}

        <div className="container_edit_image">
          {/* {droppedImages.map((image: any, index: number) => (
            <div key={index} className="image_container_upload">
              <div
                style={{
                  position: "relative",
                  height: "310px",
                  width: "260px",
                }}
              >
                <img
                  className="image_uploads"
                  src={URL.createObjectURL(image.file)}
                  alt={image.name}
                  loading="lazy"
                />
                <button
                  onClick={() => removeImage(index)}
                  style={{
                    position: "absolute",
                    top: 5,
                    right: 5,
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

              <div className="Info_Images">
                <div>
                  <h6>Name : </h6>
                  <textarea
                    onChange={handleChangeName(index)}
                    className="Images_Name"
                    defaultValue={image.name}
                  />
                </div>
                <div>
                  <h6>Description : </h6>
                  <textarea
                    defaultValue={image.description}
                    onChange={handleChangeDescription(index)}
                    className="Images_Description"
                  />
                </div>
                <div>
                  {image.tag.map((tag: any, tagIndex: number) => (
                    <div className="tag" key={tagIndex}>
                      {tag}
                      <button onClick={() => deleteTag(index, tagIndex)}>
                        &times;
                      </button>
                    </div>
                  ))}
                  <div className="input_add_tags_container">
                    <input
                      type="text"
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="ajouter un tag"
                    />
                    <button onClick={() => addTag(index)}>+</button>
                  </div>
                </div>
              </div>
            </div>
          ))} */}

          {uploadStep === "update" && droppedImages.map((image: any, index: number) => (
            <ImageComponent
              key={index}
              image={image}
              index={index}
              deleteTag={deleteTag}
              handleChangeTitle={handleChangeTitle}
              handleChangeDescription={handleChangeDescription}
              addTag={addTag}
              setNewTag={setNewTag}
            />
          ))}
          {uploadStep === "upload" && droppedImages.map((image: any, index: number) => (
            <UploadedImage
              key={index}
              image={image}
              index={index}
              removeImage={removeImage}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Upload;
