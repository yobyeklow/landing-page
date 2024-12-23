import axios from "axios";
import {BASE_URL, MY_KEY} from "../constants";

export const instance = axios.create({
	baseURL: BASE_URL,
	headers: {
		"x-cg-api-key": MY_KEY,
	},
});
