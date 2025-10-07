import axios from "axios";
import { API_PATH } from "../AppConst";

const url = API_PATH + "/Post";

export const CreatePost = (data, config) => {
    return axios.post(url, data, config);
};

export const UpdatePostScore = (config) => {
    return axios.put(url + "/update-posts-scores", {}, config);
};

export const GetNewsfeed = (PageNumber, config) => {
    return axios.get(url + `/newsfeed?PageNumber=${PageNumber}`, config);
};

export const DeletePost = (postId, config) => {
    return axios.delete(url + `/${postId}`, config);
}

export const SearchPosts = (searchTerm, PageNumber, config) => {
    return axios.get(url + `/search?SearchTerm=${searchTerm}&PageNumber=${PageNumber}`, config);
};