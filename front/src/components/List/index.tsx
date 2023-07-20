import React, { useEffect, useRef, useState } from "react";
import "./list.scss";
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
}

const List: React.FC<Props> = (props: Props) => {
  const elementRef: React.RefObject<HTMLDivElement> =
    useRef<HTMLDivElement>(null);
  const [numColumns, setNumColumns] = useState<number>(5);
  useEffect(() => {
    function handleResize(): void {
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

    const standardRatio: StandardRatios | undefined = standardRatios.find(
      (r) => Math.abs(r.ratio - aspectRatio) < 0.05
    );

    if (standardRatio) {
      // Return the name of the standard ratio if the aspect ratio is close enough
      return standardRatio.name;
    } else {
      // Otherwise, return the closest standard ratio with a tilde (~) prefix
      const closestRatio: StandardRatios = standardRatios.reduce((a, b) => {
        const aDiff = Math.abs(a.ratio - aspectRatio);
        const bDiff = Math.abs(b.ratio - aspectRatio);
        return aDiff < bDiff ? a : b;
      });
      return `~${closestRatio.name}`;
    }
  }
  const getExtension = (filename: string) => {
    const split = filename.split(".");
    return split.length > 1 ? split.pop() : "";
  };

  return (
    <div>
      {/* <MenuRetractable numColumns={numColumns} setNumColumns={setNumColumns} /> */}

      <div className="list_container">
        <div className="ColumnFixe">
          <div className="list_row_top_name">Display name</div>
          {props.images.map((image: any, index: number) => (
            <div key={image.name} className="list_row_name">
              <div>
                <Checkbox isChecked={false} />
              </div>
              <div className="list_row_name_container_img">
                <img src={image.url} alt="" />
              </div>
              <div
                onClick={() => {
                  window.location.href = `/images/details/${image.id}`;
                }}
                className="list_row_name_title"
              >
                {image.title}
              </div>
            </div>
          ))}
        </div>
        <div className="ColumnNoFixe">
          <div className="list_row_top_name">
            <div className="test">name</div>
            <div className="test">url</div>
            <div className="test">tag</div>
            <div className="test">exetention</div>
          </div>
          {props.images.map((image: any, index: number) => (
            <div key={index} className="list_row_name">
              {/* {image.name}test */}
              <div className="test">{image.name}</div>
              <div className="test">
                <a target="blank" href={image.url}>
                  Image de l'url
                </a>
              </div>
              {/* <div className="test">{image.url}</div> */}
              <div className="cellulesTags test">
                {image.tags.slice(0, 5).map((tag: any, index: number) => (
                  <div>{tag.name}</div>
                ))}
              </div>
              <div className="test">{getExtension(image.name)}</div>
            </div>
          ))}
        </div>

        {/* <div className="list_row_top">
            <div className="list_row_top_name">image/name</div>
            <div className="list_row_top_info">
              <div>test 1</div>
              <div>test 1</div>
              <div>test 1</div>
              <div>test 1</div>
            </div>
          </div>
          {props.images.images.map((image: any, index: number) => (
            <div key={image.url} className="list_row">
              <div className="list_row_name">image/name</div>
              <div>
                <div className="list_row_info">
                  <div>test 1</div>
                  <div>test 1</div>
                  <div>test 1</div>
                  <div>test 1</div>
                </div>
              </div>
            </div>
          ))} */}
      </div>
    </div>
  );
};

export default List;
