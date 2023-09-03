import React, { useRef } from "react";
import "./FileInput.css"; // Importez le fichier CSS
import "./Button.scss";
interface ImageUploadProps {
  onUpload: (files: FileList) => void;
  setDroppedImages: Function;
}

const ImageUpload: React.FC<ImageUploadProps> = (Props:ImageUploadProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let newArray: File[] = [];
      if (e.target.files.length > 0) {
        const files = Array.from(e.target.files);
  
        Props.setDroppedImages((prevImages: any[]) =>
          prevImages.concat(files)
        );
  
        Props.onUpload(e.target.files);
      }
    }
  };
  
  const fileInputRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        style={{ display: "none" }} // Cacher le champ de type "file"
      />
      <button className="buttonUploadImage" onClick={openFileDialog}>Sélectionner des fichiers</button>
    </div>
  );
};

export default ImageUpload;
