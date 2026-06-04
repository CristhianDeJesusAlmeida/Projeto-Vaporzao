import { api } from "../services/api";

export const loginToken = (matricula, password) => {
    const body = {
        matricula: matricula,
        senha: password
    }

    return api.post("/auth/login", body)
        .then(response => {
            window.localStorage.setItem("token", response.data.token);
            return response;
        })
        .catch(err => {
            return Promise.reject(err);
        });
};
