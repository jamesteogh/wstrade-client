import axios from "axios";

export default axios.create({
    baseURL: "https://yh-finance.p.rapidapi.com//stock/v2"
});