import axios from "axios";

export default function axiosWithAuth() {
  return axios.create({
    baseURL: "http://localhost:8000/api",
  });
}
