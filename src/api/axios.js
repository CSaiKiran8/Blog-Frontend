import axios from "axios";

export default axios.create({
  baseURL: "https://blog-app-users.herokuapp.com/"
});