const SERVER_URL = "http://127.0.0.1:5000/images";

const getData = async (url: any, method?: any) => {
  const rep = await fetch(url, {
    method: method,
  });
  const json = await rep.json();

  return json;
};

const getAllImage = async () => {
  try {
    const SIGNUP_ENDPOINT = `${SERVER_URL}/all`;

    const data_JSON = await getData(SIGNUP_ENDPOINT, "GET");

    return { images: data_JSON, API: true };
  } catch (error) {
    console.log(error);
    return { images: [], API: false };
  }
};

const handleUploadImage = async (selectedImages: any) => {
  const SIGNUP_ENDPOINT = `${SERVER_URL}/upload`;

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
      // console.log("Images uploaded successfully", await response.text());
    } else {
      console.error(
        "Error uploading images",
        response.status,
        response.statusText
      );
      return { message: "Une erreur est survenue", API: false };
    }
  } catch (error) {
    // console.error("Error uploading images API", error);
    return { message: "impossible de joindre l'api", API: false };
  }
};

export { getAllImage, handleUploadImage };
