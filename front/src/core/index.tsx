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

const deleteImageMultiple = async (id: any) => {
  let images: any | null | undefined = undefined;
  try {
    const SIGNUP_ENDPOINT = `${SERVER_URL}/images/multiple`;

    const response = await fetch(SIGNUP_ENDPOINT, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },    
      body: JSON.stringify(id),
    });
    if (response.ok && response.headers.get('content-type')?.includes('application/json')) {
      images = await response.json();
      return true
   } else {
      // console.error('Error or not a JSON response:', await response.text());
      return true
   }
  } catch (error) {
    console.error(ErrorType.fetchingImageError, error);
    images = null;
  }
  // console.log(images);
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
    description: string;
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
      // window.location.href = "/images";

      return { message: response.ok, API: true, response: await response.json() };
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

const handleUpdateImages = async (selectedImages: any) => {
  selectedImages.forEach((image: any)=> {
    const img = {
      title: image.title,
      description: image.description,
      tags: image.tags.map((t: any) => t.name)
    }
    EditImages(img, image.id);
  });
};

const handleSearchImage = async (search: string) => {
  let images: image[] | null | undefined = undefined;
  try {
    const SIGNUP_ENDPOINT: string = `${SERVER_URL}/images/search?q=${search}`;

    images = await getData(SIGNUP_ENDPOINT, "GET");
  } catch (error) {
    console.error(ErrorType.fetchingImageError, error);
    images = null;
  }
  return images;
};

export {
  getImageInfoById,
  getImagesByTag,
  getTags,
  handleUploadImage,
  handleUpdateImages,
  deleteImageWithId,
  EditImages,
  handleSearchImage,
  deleteImageMultiple,
};
