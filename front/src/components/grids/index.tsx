import React, { useEffect, useRef, useState } from "react";
import "./grids.scss";

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
}

const Grid: React.FC<Props> = (props: Props) => {
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

  return (
    <div>
      {/* <MenuRetractable numColumns={numColumns} setNumColumns={setNumColumns} /> */}

        <div className="cards_container">
          {props.images.map((image: any, index: number) => (
            <div key={image.url} className="cards">
              <div className="card_imge_container">
                <img src={image.url} alt={image.name} loading="lazy" />
                <div
                  onClick={() => {
                    window.location.href = `/images/details/${image.id}`;
                  }}
                  className="viewButton"
                >
                  Voir plus
                </div>
              </div>
              <div className="card_label">{image.name}</div>
              <div className="card_info">
                <div className="resolution_info">
                  {props.imageSizes[index].width +
                    "x" +
                    props.imageSizes[index].height}
                </div>
                <div className="ratio_info">
                  {calculateAspectRatio(
                    props.imageSizes[index].width,
                    props.imageSizes[index].height
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default Grid;
