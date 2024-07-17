import axios from "axios";
import { baseURL } from "../../Constants/Constants";
const instance=axios.get({
    baseUrl:baseURL
})

export default instance;