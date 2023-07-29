import React from "react";

interface ImageProps {
    image: any;
    index: number;
    deleteTag: (imageIndex: number, tagIndex: number) => void;
    handleChangeName: (index: number) => (event: any) => void;
    handleChangeDescription: (index: number) => (event: any) => void;
    addTag: (index: number) => void;
    setNewTag : Function;
    removeImage :(index: number) => void;
  }
  
  const ImageComponent: React.FC<ImageProps> = React.memo(
    ({ image, index, deleteTag, handleChangeName, handleChangeDescription, addTag, setNewTag, removeImage }) => {
      return (
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
              <h6>Descrition : </h6>
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
                  <button onClick={() => deleteTag(index, tagIndex)}>&times;</button>
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
      );
    }
  );
export default ImageComponent;
  