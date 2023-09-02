import React, { useEffect, useRef, useState } from "react";
import "./gallery.scss";
import { StandardRatios, standardRatios } from "../../helper/staticValues";
import Checkbox from "../CheckBox";

export interface IImage {
  images: [
    {
      id: number;
      name: string;
      url: string;
    }
  ];
  API: boolean;
}

interface Props {
  images: any;
  imageSizes: any;
  imagesSelected: any;
  setImagesSelected: any;
  handleCheckboxClick: any;
}

const Gallery: React.FC<Props> = (props: Props) => {
  const elementRef: React.RefObject<HTMLDivElement> =
    useRef<HTMLDivElement>(null);
  const [numColumns, setNumColumns] = useState<number>(5);
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

  function calculateAspectRatio(width: number, height: number): string {
    // Calculate the aspect ratio
    const aspectRatio: number = width / height;

    // Check if the aspect ratio is a standard one

    const standardRatio: StandardRatios | undefined = standardRatios.find(
      (r) => Math.abs(r.ratio - aspectRatio) < 0.05
    );

    if (standardRatio) {
      // Return the name of the standard ratio if the aspect ratio is close enough
      return standardRatio.name;
    } else {
      // Otherwise, return the closest standard ratio with a tilde (~) prefix
      const closestRatio: StandardRatios = standardRatios.reduce((a, b) => {
        const aDiff: number = Math.abs(a.ratio - aspectRatio);
        const bDiff: number = Math.abs(b.ratio - aspectRatio);
        return aDiff < bDiff ? a : b;
      });
      return `~${closestRatio.name}`;
    }
  }

  return (
    <div className="gallery">
      {/* <MenuRetractable numColumns={numColumns} setNumColumns={setNumColumns} /> */}

      <div>
        {props.images.map((image: any, index: number) => (
          <div key={image.url} className="image_container">
            <div className="Checkbox">
              <Checkbox
                isChecked={props.imagesSelected.includes(image.id)}
                onCheckedChange={() => props.handleCheckboxClick(image.id)}
              />
            </div>
            <img
              onClick={() => {
                window.location.href = `/images/details/${image.id}`;
              }}
              src={image.url}
              alt={image.name}
              loading="lazy"
            />
            {props.imageSizes[index] && (
              <div className="image_taille">
                {props.imageSizes[index].width +
                  "x" +
                  props.imageSizes[index].height}{" "}
                {calculateAspectRatio(
                  props.imageSizes[index].width,
                  props.imageSizes[index].height
                )}
              </div>
            )}
            <div className="image_name">{image.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
