import React from "react";

interface ImageProps {
    image: any;
    index: number;
    deleteTag: (imageIndex: number, tagIndex: number) => void;
    handleChangeTitle: (index: number) => (event: any) => void;
    handleChangeDescription: (index: number) => (event: any) => void;
    addTag: (index: number) => void;
    setNewTag : Function;
  }
  
  const ImageComponent: React.FC<ImageProps> = React.memo(
    ({ image, index, deleteTag, handleChangeTitle, handleChangeDescription, addTag, setNewTag }) => {
      return (
        <div key={index} className="image_container_upload">
          <div>
            <img
              className="image_uploads"
              src={image.url}
              alt={image.title}
              loading="lazy"
              style={{
              minWidth: "240px",
            }}
            />
          </div>
  
          <div className="Info_Images">
            <div>
              <h6>Title : </h6>
              <textarea
                onChange={handleChangeTitle(index)}
                className="Images_Name"
                defaultValue={image.title}
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
              {image.tags.map((tag: any, tagIndex: number) => (
                <div className="tag" key={tagIndex}>
                  {tag.name}
                  <button onClick={() => deleteTag(index, tagIndex)}>&times;</button>
                </div>
              ))}
              <div className="input_add_tags_container">
                <input
                  type="text"
                  onChange={(e) => setNewTag({ name: e.target.value })}
                  placeholder="Add a tag"
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
  