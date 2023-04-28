import React, { useRef } from "react";
import "./FileInput.css"; // Importez le fichier CSS
import "./Button.scss";
interface ImageUploadProps {
  onUpload: (files: FileList) => void;
  setDroppedImages: Function;
}

const ImageUpload: React.FC<ImageUploadProps> = (Props) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let NewArray: any[] = [];
      if (e.target.files.length > 0) {
        Array.from(e.target.files).map((file: any) => NewArray.push(file));

        Props.setDroppedImages((test: any[]) => test.concat(NewArray));
        Props.onUpload(e.target.files);
      }
    }
  };
  const fileInputRef = useRef<HTMLInputElement>(null);

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
