import Axios from "axios";

const api = Axios.create({
    baseURL: "https://call-manager-api.herokuapp.com/",
    timeout: 3000,
});

export default api;
