import "./styles.scss";
import { useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { getImageInfoById, deleteImageWithId, EditImages } from "../../core";
import { IImage } from "../../components/Gallery/gallery";
import { FaPen, FaRegWindowClose } from "react-icons/fa";

interface tag {
  name: string;
  id: number;
}

//TODO mettre en commun avec Gallery
export interface singleInfo {
  imageInfo: {
    id: number;
    name: string;
    tags: tag[];
    title: string;
    url: string;
  };
  API: boolean;
}

const ImagesDetails: React.FC = () => {
  const [imageInfo, setImageInfo] = useState<singleInfo>({
    imageInfo: {
      id: 0,
      name: "",
      tags: [],
      title: "",
      url: "",
    },
    API: false,
  });

  const { imageId } = useParams();
  //const [imageInfo, setImageInfo] = useState<IImage>({id:0, tags:[], name:""});
  //TODO transformer en objet
  //let tags:string[] = [];
  //const description:string = "Fugiat proident id culpa consequat irure eu laboris magna eiusmod labore. Laborum do laborum magna pariatur quis deserunt. Est minim nostrud ut cillum. Veniam Lorem sint excepteur anim adipisicing duis amet aliquip anim consequat. Aute incididunt enim mollit pariatur reprehenderit. Cupidatat sint ad enim nulla. Ea adipisicing aliqua in voluptate occaecat laboris ex."
  //const imageUrl:string = "https://imazurestorage.blob.core.windows.net/images/8a220fb4-c129-4ae7-8436-e83b8a5827e3"

  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [newTag, setNewTag] = useState<string>("");
  const [editImageInfo, setEditImageInfo] = useState<singleInfo>({
    imageInfo: {
      id: 0,
      name: "",
      tags: [],
      title: "",
      url: "",
    },
    API: false,
  });
  const [NewTile, setNewTile] = useState("");
  const recupImageInfo = async () => {
    const imageInfo: singleInfo = (await getImageInfoById(
      imageId
    )) as singleInfo;
    setImageInfo(imageInfo);
    setEditImageInfo(imageInfo);
    setNewTile(imageInfo.imageInfo.title);
  };
  useEffect(() => {
    recupImageInfo();
  }, []);

  const [xRotation, setXRotation] = useState(0);
  const [yRotation, setYRotation] = useState(0);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [mouseMooved, setMouseMooved] = useState(0);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageInfo.imageInfo.url;
    link.download = "image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async () => {
    await deleteImageWithId(imageId);
    window.location.href = "/images";
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
    let currentTime: number = new Date().getTime();
    if (currentTime - mouseMooved > 300) {
      setMouseMooved(new Date().getTime());
      setXRotation(0);
      setYRotation(0);
    }

    //const img = imgRef.current;
    //const title = titleRef.current;
    //const sizesBox = sizesboxRef.current;
    //const purchase = purchaseRef.current;
  }

  const handleChangeSearch = (event: any) => {
    setNewTile(event.target.value);
  };

  const openEditor = () => {
    setOpenEdit(!openEdit);
    setEditImageInfo(imageInfo);
    setNewTile(imageInfo.imageInfo.title);
  };

  const addTag = () => {
    setEditImageInfo((prevState) => ({
      ...prevState,
      imageInfo: {
        ...prevState.imageInfo,
        tags: [
          ...prevState.imageInfo.tags,
          { name: newTag, id: Math.random() },
        ],
      },
    }));
    setNewTag("");
  };

  const deleteTag = (id: number) => {
    setEditImageInfo((prevState) => ({
      ...prevState,
      imageInfo: {
        ...prevState.imageInfo,
        tags: prevState.imageInfo.tags.filter((tag) => tag.id !== id),
      },
    }));
  };

  // imageInfo
  const saveChanges = async () => {
    const edit = {
      title: NewTile,
      tags: editImageInfo.imageInfo.tags.map((categorie) => categorie.name),
    };

    const imagesEdit: any = await EditImages(edit, imageInfo.imageInfo.id);

    setImageInfo({ imageInfo: imagesEdit, API: false });
    setEditImageInfo({ imageInfo: imagesEdit, API: false });
    setOpenEdit(false);
  };

  // const ImagesWithTags = async () => {

  //   setImages(undefined);

  //   const selectedTags = categorie
  //     .filter((categorie) => categorie.choix)
  //     .map((categorie) => categorie.tag.id);

  //   //setLoadImages(true);

  //   const images = await getImagesByTag(selectedTags);
  //   setImages(images);

  //   if(images !== null && images !== undefined){
  //   const sizes = await Promise.all(
  //     images.map((image: { url: string | undefined}) =>
  //       ImageTaille(image.url)
  //     )
  //   );
  //   setImageSizes(sizes);
  //   }
  //   //setLoadImages(false);
  // };

  return (
    <div className="main">
      <div className="background">
        <div className="grid-container">
          <div
            className="image image-section"
            /*className = "card"*/
            ref={cardRef}
            style={{
              transform: `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img src={imageInfo.imageInfo.url} className="inner-image"></img>
          </div>

          <div className="information">
            <div className="title_container">
              {openEdit ? (
                <textarea
                  onChange={handleChangeSearch}
                  className="input_title titles"
                  value={NewTile}
                />
              ) : (
                <h1 className="title">{imageInfo.imageInfo.title}</h1>
              )}

              <div
                onClick={openEditor}
                className={`icon ${openEdit ? "iconClose" : "iconEdit"}`}
              >
                {openEdit ? <FaRegWindowClose /> : <FaPen />}
              </div>
            </div>
            {/*<p className="description">{imageInfo.imageInfo.}</p>*/}
            <div className="tags">
              {openEdit ? (
                <div>
                  {editImageInfo.imageInfo.tags.map((tag, index) => (
                    <div className="tag" key={index}>
                      {tag.name}
                      <button onClick={() => deleteTag(tag.id)}>&times;</button>
                    </div>
                  ))}
                  <div className="input_add_tags_container">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Nouveau tag"
                    />
                    <button onClick={addTag}>+</button>
                  </div>
                </div>
              ) : (
                imageInfo.imageInfo.tags.map((tag, index) => (
                  <p className="tag" key={index}>
                    {tag.name}
                  </p>
                ))
              )}
            </div>
            <div className="download">
              {openEdit ? (
                <button className="big-button edit" onClick={saveChanges}>
                  Sauvegarder les modifications
                </button>
              ) : (
                <>
                  <button className="big-button" onClick={handleDownload}>
                    Télecharger l'image
                  </button>
                  <button className="big-button delete" onClick={handleDelete}>
                    Supprimer l'image
                  </button>
                </>
              )}
            </div>
            <div className="download"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagesDetails;
