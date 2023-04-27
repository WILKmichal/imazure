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

export { getAllImage };
