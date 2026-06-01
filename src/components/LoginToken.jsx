import { api } from "../services/api";
import { useState } from "react";
export const LoginToken = () => {
    
    const [matricula, setMatricula] = useState("");
    const [password, setPassword] = useState("");

    const login = () =>{
        const body = {
            matricula: matricula,
            password: password
        }

        api.post("/login", body).then(response => {
            window.localStorage.setItem("token", response.data.token);
        }).catch(err =>{"Você errou o seu Login tente novamente", err})
    }
};