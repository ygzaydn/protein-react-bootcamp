import axios from "axios";

const instance = axios.create({
    baseURL: "https://gateway.marvel.com/v1/public",
});

export default instance;
