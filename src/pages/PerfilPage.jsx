import React from "react";
import { useProtectedPage } from "../hooks/useProtectedPage";
import { useRequestData } from "../hooks/useRequestData";
import { BibliotecaPage } from "./BibliotecaPage";
import { useNavigate } from "react-router";
import "./perfil.css";

export const PerfilPage = () => {

    useProtectedPage();
    
    const [data, isLoading, error] = useRequestData('/auth/me');

    const handleLogout = () =>{
        window.localStorage.removeItem("token")
        navigate("/login")
    }
    
    const navigate = useNavigate();

    const goToBiblioteca = () =>{
        navigate("/perfil/biblioteca")
    }

    return (

        <>

            { isLoading && <p style={{ color: "white", textAlign: "center" }}> Carregando dados de usuários </p> };
            { error && <p style={{ color: "red", textAlign: "center" }}>Erro: {error}</p> };

            <h3> {data?.nome} </h3>
            <h3> {data?.role} </h3>

            <button onClick={goToBiblioteca}>Biblioteca</button>
            <button onClick={handleLogout}>Deslogar</button>
        </>
    )
}