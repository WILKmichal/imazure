import React from "react";

interface ImageProps {
    image: any;
    index: number;
    removeImage :(index: number) => void;
  }
  
  const UploadedImage: React.FC<ImageProps> = React.memo(
    ({ image, index, removeImage }) => {
      return (
        <div key={index} className="image_container_upload">
          <div
            style={{
              position: "relative"
            }}
          >
            <img
              className="image_uploads"
              src={URL.createObjectURL(image)}
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
              &times;
            </button>
          </div>
        </div>
      );
    }
  );
export default UploadedImage;
  