import { api } from "../services/api";

export const loginToken = (matricula,password) => {

        const body = {
            matricula: matricula,
            senha: password
        }

        api.post("/auth/login", body).then(response => {
            window.localStorage.setItem("token", response.data.token);
        }).catch(err =>{"Você errou o seu Login tente novamente", err})
};