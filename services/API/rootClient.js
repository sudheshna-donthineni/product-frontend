import axios from "axios";

const client = axios.create({
  baseURL: "https://product-backend01.herokuapp.com/",
});

export default client;
