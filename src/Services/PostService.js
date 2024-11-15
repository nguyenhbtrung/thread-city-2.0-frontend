import axios from "axios";
import { API_PATH } from "../AppConst";

const url = API_PATH + '/Post';

export const CreatePost = (data, config) => {
    return axios.post(url, data, config);
};