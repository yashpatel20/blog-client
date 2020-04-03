import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const getBlog = async id => {
  const config = {
    headers: { Authorization: token }
  };
  const request = await axios.get(`${baseUrl}/${id}`, config);
  return request.data;
};

const create = async newObject => {
  const config = {
    headers: { Authorization: token, "Content-type": "application/json" }
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const like = async (id, newObject) => {
  const config = {
    headers: { Authorization: token, "Content-type": "application/json" }
  };
  const response = await axios.put(`${baseUrl}/like/${id}`, newObject, config);
  return response.data;
};

const unlike = async (id, newObject) => {
  const config = {
    headers: { Authorization: token, "Content-type": "application/json" }
  };
  const response = await axios.put(
    `${baseUrl}/unlike/${id}`,
    newObject,
    config
  );
  return response.data;
};

const deleteReq = async id => {
  const config = {
    headers: { Authorization: token, "Content-type": "application/json" }
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response;
};

export default { getAll, getBlog, create, like, unlike, deleteReq, setToken };
