import axios from "axios";

export const api = axios.create({
    baseURL: "https://alunos-ads-api-production.up.railway.app"
})