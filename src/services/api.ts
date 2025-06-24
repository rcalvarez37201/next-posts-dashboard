import axios from "axios";

/**
 * A pre-configured instance of Axios for making API requests.
 * It's set up with the base URL for the JSONPlaceholder API.
 */
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export default api;
