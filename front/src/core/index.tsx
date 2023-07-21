import { ErrorType } from "./error";
import { image } from "./model.db";

const SERVER_URL = "http://127.0.0.1:5000";

type requestMethode = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";

const getData = async (url: string, method?: requestMethode): Promise<any> => {
  const rep: Response = await fetch(url, {
    method: method,
  });
  return await rep.json();
};

const getTags = async () => {
  try {
    const TAGS_ENDPOINT: string = `${SERVER_URL}/tags/all`;

    const data_JSON: Object = await getData(TAGS_ENDPOINT, "GET");

    return { tags: data_JSON, API: true };
  } catch (error) {
    console.log(error);
    return { tags: [], API: false };
  }
};

const getImageInfoById = async (id: any) => {
  try {
    const DETAILS_ENDPOINT = `${SERVER_URL}/images/details/${id}`;

    const data_JSON = await getData(DETAILS_ENDPOINT, "GET");

    return { imageInfo: data_JSON, API: true };
  } catch (error) {
    console.log(error);
    return { image: {}, API: false };
  }
};

const deleteImageWithId = async (id: any) => {
  try {
    const DETAILS_ENDPOINT = `${SERVER_URL}/images/${id}`;

    const data_JSON = await getData(DETAILS_ENDPOINT, "DELETE");

    return { API: true };
  } catch (error) {
    console.log(error);
    return { API: false };
  }
};

const getImagesByTag = async (
  tagIds: number[]
): Promise<image[] | null | undefined> => {
  let images: image[] | null | undefined = undefined;
  try {
    const params: string = tagIds.map((id) => `tag=${id}`).join("&");
    const SIGNUP_ENDPOINT: string = `${SERVER_URL}/images/by-tags?${params}`;

    images = await getData(SIGNUP_ENDPOINT, "GET");
  } catch (error) {
    console.error(ErrorType.fetchingImageError, error);
    images = null;
  }
  return images;
};

const EditImages = async (
  object: {
    tags: string[];
    title: string;
  },
  id: number
): Promise<image[] | null | undefined> => {
  let images: any | null | undefined = undefined;

  try {
    const SIGNUP_ENDPOINT: string = `${SERVER_URL}/images/${id}`;

    const response = await fetch(SIGNUP_ENDPOINT, {
      method: "PUT",
      body: JSON.stringify(object),
    });
    images = await response.json();
  } catch (error) {
    console.error(ErrorType.fetchingImageError, error);
    images = null;
  }
  return images;
};

const handleUploadImage = async (selectedImages: any) => {
  const SIGNUP_ENDPOINT = `${SERVER_URL}/images/upload`;

  const formData = new FormData();
  selectedImages.forEach((image: any) => {
    formData.append("images", image);
  });

  try {
    const response = await fetch(SIGNUP_ENDPOINT, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      window.location.href = "/images";

      return { message: response.ok, API: true };
    } else {
      console.error(
        "Error uploading images",
        response.status,
        response.statusText
      );
      return { message: "Une erreur est survenue", API: false };
    }
  } catch (error) {
    return { message: "impossible de joindre l'api", API: false };
  }
};

export {
  getImageInfoById,
  getImagesByTag,
  getTags,
  handleUploadImage,
  deleteImageWithId,
  EditImages,
};
