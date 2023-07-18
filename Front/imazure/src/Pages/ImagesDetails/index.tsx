import './styles.scss';
import { useParams } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { getImageInfoById } from '../../core';
import { IImage } from '../../components/Gallery/gallery';

interface tag {
  name:string;
  id:number;
}

//TODO mettre en commun avec Gallery
export interface singleInfo{
  imageInfo:{
    id:number;
    name:string;
    tags:tag[];
    title:string;
    url:string;
  }
  API:boolean;
}

const ImagesDetails: React.FC = () => {

  const [imageInfo, setImageInfo] = useState<singleInfo>(
    {
      imageInfo:{
        id:0,
        name:"",
        tags:[],
        title:"",
        url:""
      },
      API:false
    }
  );


  const { imageId } = useParams();
  //const [imageInfo, setImageInfo] = useState<IImage>({id:0, tags:[], name:""});
  //TODO transformer en objet
  //let tags:string[] = [];
  //const description:string = "Fugiat proident id culpa consequat irure eu laboris magna eiusmod labore. Laborum do laborum magna pariatur quis deserunt. Est minim nostrud ut cillum. Veniam Lorem sint excepteur anim adipisicing duis amet aliquip anim consequat. Aute incididunt enim mollit pariatur reprehenderit. Cupidatat sint ad enim nulla. Ea adipisicing aliqua in voluptate occaecat laboris ex."
  //const imageUrl:string = "https://imazurestorage.blob.core.windows.net/images/8a220fb4-c129-4ae7-8436-e83b8a5827e3"

  const recupImageInfo = async () => {
    const imageInfo:singleInfo = await getImageInfoById(imageId) as singleInfo;
    setImageInfo(imageInfo);
  };

  useEffect(() => {
    recupImageInfo();
  }, []);



  const [xRotation, setXRotation] = useState(0);
  const [yRotation, setYRotation] = useState(0);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [mouseMooved,setMouseMooved] = useState(0);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageInfo.imageInfo.url;
    link.download = 'image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  function handleMouseMove(event: any) {

    if (cardRef.current !== null) {
    const card = cardRef.current;
    const { offsetWidth: width, offsetHeight: height } = card;
    const { clientX, clientY } = event;
    const x = clientX - card.offsetLeft - width / 2;
    const y = clientY - card.offsetTop - height / 2;
    var mult = 40;
    setXRotation((y / height) * mult);
    setYRotation((x / width) * mult);
    }
  }

  function handleMouseLeave() {
    let currentTime:number = new Date().getTime();
    if(currentTime - mouseMooved > 300){
    setMouseMooved(new Date().getTime());
    setXRotation(0);
    setYRotation(0);
    }

    //const img = imgRef.current;
    //const title = titleRef.current;
    //const sizesBox = sizesboxRef.current;
    //const purchase = purchaseRef.current;
  }
  

  
    return (
    <div className="main">
      <div className="background">
        <div className="grid-container">
          <div className='image image-section'
                 /*className = "card"*/
                  ref={cardRef}
                  style={{
                    transform: `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`,
                  }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}>
          <img src={imageInfo.imageInfo.url} className="inner-image" ></img>
          </div>

        <div className="information">
          <h1 className="title">{imageInfo.imageInfo.name}</h1>
          {/*<p className="description">{imageInfo.imageInfo.}</p>*/}
          <div className="tags">
            {imageInfo.imageInfo.tags.map((tag, index) => (<p className="tag" key={index}>{tag.name}</p>))}
          </div>
          <div onClick={handleDownload} className="download">
          <button>Télecharger l'image</button>
          </div>
        </div>
      </div>
      </div>
    </div>
      );
  };
  
  export default ImagesDetails;