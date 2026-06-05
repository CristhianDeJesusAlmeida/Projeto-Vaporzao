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
  <div className="perfil-page">
    {isLoading && <p className="perfil-loading">Carregando dados de usuário...</p>}

    {error && <p className="perfil-error">Erro: {error}</p>}

    {!isLoading && !error && data && (
      <div className="perfil-card">
        <div className="perfil-avatar">
          {data?.nome
            ?.split(" ")
            .map((nome) => nome[0])
            .slice(0, 2)
            .join("")}
        </div>

        <h2 className="perfil-nome">{data?.nome}</h2>

        <p className="perfil-matricula">
          Matrícula: <span>{data?.matricula}</span>
        </p>

        <p className="perfil-role">{data?.role}</p>

        <div className="perfil-divider"></div>

        <button className="btn-biblioteca" onClick={goToBiblioteca}>
          Biblioteca
        </button>

        <button className="btn-logout" onClick={handleLogout}>
          Sair da conta
        </button>
      </div>
    )}
  </div>
);
}