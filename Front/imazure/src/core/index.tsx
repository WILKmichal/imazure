const SERVER_URL = "http://127.0.0.1:5000";

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

    return data_JSON;
  } catch (error) {
    console.log(error);
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
      console.log("Images uploaded successfully", await response.text());
    } else {
      console.error(
        "Error uploading images",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Error uploading images", error);
  }
};

export { getAllImage, handleUploadImage };
