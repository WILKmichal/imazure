import React, { useCallback } from "react";
import "./DragAndDrop.scss";

interface ImageUploadProps {
  setDroppedImages: Function;
}

const DragAndDrop: React.FC<ImageUploadProps> = (Props) => {
  // const [droppedImages, setDroppedImages] = useState<File[]>([]);
  const [filesSelected, setFilesSelected] = React.useState(false);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setFilesSelected(true);
  }, []);

  console.log(filesSelected);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setFilesSelected(false);
  }, []);
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );

    console.log(files);

    Props.setDroppedImages((test: any[]) => test.concat(files));
    setFilesSelected(false);
  }, []);

  return (
    <div className="upload-wrapper">
      <div
        className={`DragUploadImage${filesSelected ? " files-hovered" : ""}`}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{ minHeight: "20vh", backgroundColor: "#f5f5f5" }}
      >
        <h1>Glissez-déposez vos images ici</h1>
      </div>
    </div>
  );
};

export default DragAndDrop;
