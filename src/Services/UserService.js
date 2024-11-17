import axios from "axios";
import { API_PATH } from "../AppConst";

const url = API_PATH + "/User";

export const UserRegister = (data) => {
    return axios.post(url + '/register', data);
};

export const UserLogin = (data) => {
    return axios.post(url + '/login', data);
};

export const GetProfileData = (userName) => {
    return axios.get(url + `/profile/by-username/${userName}`);
};

export const GetProfilePosts = (userName, PageNumber) => {
    return axios.get(url + `/profile/by-username/${userName}/posts?PageNumber=${PageNumber}`);
};
