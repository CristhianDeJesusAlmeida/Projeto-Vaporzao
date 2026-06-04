import "./login.css"
import React, { useState } from "react";
import { useForm } from "../hooks/useForm";
import { loginToken } from "../components/LoginToken";
import { useNavigate } from "react-router";

export const LoginPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [form, onChange] = useForm({ matricula: "", password: "" });

    const handleClick = (event) => {
        event.preventDefault();
        setError("");
        
        loginToken(form.matricula, form.password)
            .then(() => {
                navigate("/perfil");
            })
            .catch((err) => {
                setError(err.response?.data?.message || "Matrícula ou senha incorretos");
            });
    };

    return (
        <form className="login-form" onSubmit={handleClick}>
            <input
                name="matricula"
                value={form?.matricula || ""}
                pattern="\d{2}-\d{5}"
                onChange={onChange}
                placeholder="matricula" 
                required
            />

            <input 
                type="password"
                name="password"
                onChange={onChange}
                value={form?.password || ""}
                placeholder="senha"
                autoComplete="off"
                required
            />
            
            {error && <p style={{ color: "red", textAlign: "center" }}>Erro: {error}</p>}
            
            <button type="submit">Fazer Login</button>
        </form>
    );
};
