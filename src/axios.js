import axios from "axios";
//localhost
// const instance = axios.create({
//   baseURL: "http://localhost:9000",
// });

//Web
const instance = axios.create({
  baseURL: "https://messaging-app-backend.azurewebsites.net",
});
export default instance;
