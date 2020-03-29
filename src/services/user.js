import axios from "axios";
const baseUrl = "/api/users";

const getUserByID = async id => {
  const request = await axios.get(`${baseUrl}/${id}`);
  return request.data;
};

const signup = async credentials => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { getUserByID, signup };
