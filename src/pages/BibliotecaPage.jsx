import "./biblioteca.css"
import React, { useState } from "react"
import { useRequestData } from "../hooks/useRequestData"
import { JogoCard } from "../components/JogoCard"
import { api } from "../services/api"
import { useNavigate } from "react-router"

export const BibliotecaPage = () => {
    const [usuario] = useRequestData('/auth/me')
    const [exclusaoErro, setExclusaoErro] = useState("")
    const navigate = useNavigate()
    
    const [bibliotecaData, isLoading, error] = useRequestData(
        usuario?.matricula ? `/usuarios/${usuario.matricula}/jogos` : null
    )

    const formatReleaseDate = (isoDate) => {
        return isoDate && new Date(isoDate).toLocaleDateString("pt-BR") || "N/A"
    }

    const handleDelete = async (id) => {
        setExclusaoErro("")
        const confirmar = window.confirm("Deseja mesmo excluir este jogo?")
        if (confirmar) {
            try {
                const token = window.localStorage.getItem("token")
                await api.delete(`/jogos/${id}`, { headers: { token } })
                window.location.reload()
            } catch (err) {
                setExclusaoErro(err.response?.data?.message || err.message)
            }
        }
    }

    const goToCriarJogo = () => {
        navigate("/perfil/biblioteca/criar-jogos")
    }

    const exibirConteudo = !isLoading && !error && bibliotecaData && bibliotecaData.length > 0
    const nenhumJogoCriado = !isLoading && !error && (!bibliotecaData || bibliotecaData.length === 0)

    return(
        <>
            {isLoading && <p className="biblioteca-loading">Carregando Biblioteca....</p>}
            
            {error && <p className="biblioteca-error">Error: {error}</p>}

            {exclusaoErro && <p className="biblioteca-exclusao-error">Erro ao excluir: {exclusaoErro}</p>}

            {exibirConteudo && (
                <>
                    <h2>Sua Biblioteca</h2>
                    <button onClick={goToCriarJogo}>Criar um jogo</button>
                    <p>Seus jogos Criados</p>
                    
                    <div className="biblioteca-grid">
                        {bibliotecaData.map((jogo) => (
                            <JogoCard 
                                key={jogo.id} 
                                jogo={jogo} 
                                formatReleaseDate={formatReleaseDate}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                </>
            )}

            {nenhumJogoCriado && (
                <>
                    <h2>Sua Biblioteca</h2>
                    <button onClick={goToCriarJogo}>Criar um jogo</button>
                    <p className="biblioteca-empty">Nenhum jogo criado encontrado.</p>
                </>
            )}
        </>
    )
}
