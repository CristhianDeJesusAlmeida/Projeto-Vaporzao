import React from "react";
import { useProtectedPage } from "../hooks/useProtectedPage";
import { useRequestData } from "../hooks/useRequestData";
import { useNavigate } from "react-router";
import "./perfil.css";

export const PerfilPage = () => {
    const navigate = useNavigate();
    const goToBiblioteca = () =>{
        navigate("/perfil/biblioteca")
    }
    useProtectedPage();

    const [data, isLoading, error] = useRequestData('/auth/me');

    return (

        <>

            { isLoading && <p style={{ color: "white", textAlign: "center" }}> Carregando dados de usuários </p> };
            { error && <p style={{ color: "red", textAlign: "center" }}>Erro: {error}</p> };

            <h3> {data?.nome} </h3>
            <h3> {data?.role} </h3>

            <button onClick={goToBiblioteca}>Biblioteca</button>
        </>
    )
}