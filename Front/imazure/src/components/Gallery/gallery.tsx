import React, { useEffect, useRef, useState } from "react";
import "./gallery.scss";

import { getAllImage } from "../../core";
import MenuRetractable from "../MenuRetractable";

export interface IImage {
  images: [
    {
      name: string;
      url: string;
    }
  ];
  API: boolean;
}

const Gallery: React.FC = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [imageSizes, setImageSizes] = useState<any[]>([]);
  const [images, setImages] = useState<IImage>({
    images: [{ name: "", url: "" }],
    API: true,
  });
  const [numColumns, setNumColumns] = useState<number>(5);

  useEffect(() => {
    recupImage();
  }, []);

  useEffect(() => {
    function handleResize() {
      if (elementRef.current) {
        // setTaille(elementRef.current.offsetWidth);
      }

      if (window.innerWidth <= 450) {
        setNumColumns(1);
      } else if (window.innerWidth > 450 && window.innerWidth <= 690) {
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

  const recupImage = async () => {
    const images = await getAllImage();
    setImages({ images: images.images, API: images.API });

    const sizes = await Promise.all(
      images.images.map((image: { url: string | undefined }) =>
        ImageTaille(image.url)
      )
    );
    setImageSizes(sizes);
  };

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
  function calculateAspectRatio(width: number, height: number): string {
    // Calculate the aspect ratio
    const aspectRatio = width / height;

    // Check if the aspect ratio is a standard one
    const standardRatios = [
      { name: "1:1", ratio: 1 },
      { name: "4:3", ratio: 4 / 3 },
      { name: "3:2", ratio: 3 / 2 },
      { name: "5:3", ratio: 5 / 3 },
      { name: "16:10", ratio: 16 / 10 },
      { name: "16:9", ratio: 16 / 9 },
      { name: "2.39:1", ratio: 2.39 },
      { name: "2.35:1", ratio: 2.35 },
      { name: "2.20:1", ratio: 2.2 },
    ];

    const standardRatio = standardRatios.find(
      (r) => Math.abs(r.ratio - aspectRatio) < 0.05
    );

    if (standardRatio) {
      // Return the name of the standard ratio if the aspect ratio is close enough
      return standardRatio.name;
    } else {
      // Otherwise, return the closest standard ratio with a tilde (~) prefix
      const closestRatio = standardRatios.reduce((a, b) => {
        const aDiff = Math.abs(a.ratio - aspectRatio);
        const bDiff = Math.abs(b.ratio - aspectRatio);
        return aDiff < bDiff ? a : b;
      });
      return `~${closestRatio.name}`;
    }
  }

  console.log(images);

  return (
    <div
      className="gallery"
      style={{ columnCount: images.API === true ? numColumns : 1 }}
    >
      <MenuRetractable numColumns={numColumns} setNumColumns={setNumColumns} />

      {images.API === false ? (
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
      ) : (
        // <div className="APIError">
        //   <div className="APIErrorContent">
        //     <div>
        //       <span>Ooops, une erreur est survenue.</span>
        //     </div>
        //     <div>
        //     <span>Erreur 503 : Service non disponible.</span>
        //     </div>

        //     <span>
        //       Une erreur s'est produite lors de la communication avec l'API.
        //     </span>
        //   </div>
        // </div>
        <div>
          {images.images.map((image, index) => (
            <div key={image.url} className="image_container"
            onClick={()=>{
              window.location.href = '/images/details/gg'
            }}>
              <img src={image.url} alt={image.name} loading="lazy" />
              {imageSizes[index] && (
                <div className="image_taille">
                  {imageSizes[index].width + "x" + imageSizes[index].height}{" "}
                  {calculateAspectRatio(
                    imageSizes[index].width,
                    imageSizes[index].height
                  )}
                </div>
              )}
              <div className="image_name">{image.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
