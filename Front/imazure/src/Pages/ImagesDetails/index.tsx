import './styles.scss';
import { useParams } from 'react-router-dom';
import React, { useRef, useState } from 'react';

const ImagesDetails: React.FC = () => {

  const { imageId } = useParams();
  const tags:string[] = ['paysage','test','animal','autre'];
  const description:string = "Fugiat proident id culpa consequat irure eu laboris magna eiusmod labore. Laborum do laborum magna pariatur quis deserunt. Est minim nostrud ut cillum. Veniam Lorem sint excepteur anim adipisicing duis amet aliquip anim consequat. Aute incididunt enim mollit pariatur reprehenderit. Cupidatat sint ad enim nulla. Ea adipisicing aliqua in voluptate occaecat laboris ex."
  const imageUrl:string = "https://imazurestorage.blob.core.windows.net/images/8a220fb4-c129-4ae7-8436-e83b8a5827e3"



  const [xRotation, setXRotation] = useState(0);
  const [yRotation, setYRotation] = useState(0);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [mouseMooved,setMouseMooved] = useState(0);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
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
          <img src={imageUrl} className="inner-image" ></img>
          </div>

        <div className="information">
          <h1 className="title">{imageId}</h1>
          <p className="description">{description}</p>
          <div className="tags">
            {tags.map((tag, index) => (<p className="tag" key={index}>{tag}</p>))}
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