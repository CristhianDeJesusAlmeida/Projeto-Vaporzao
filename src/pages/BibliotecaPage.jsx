import "./biblioteca.css"
import { useRequestData } from "../hooks/useRequestData"
import { JogoCard } from "../components/JogoCard"
import { api } from "../services/api"
import { useNavigate } from "react-router"

export const BibliotecaPage = () => {
    const [usuario] = useRequestData('/auth/me')
    
    const navigate = useNavigate()

    const [bibliotecaData, isLoading, error] = useRequestData(
        usuario?.matricula ? `/usuarios/${usuario.matricula}/jogos` : null
    )

    const formatReleaseDate = (isoDate) => {
        return isoDate && new Date(isoDate).toLocaleDateString("pt-BR") || "N/A"
    }

    const handleDelete = async (id) => {
        const confirmar = window.confirm("Deseja mesmo excluir este jogo?")
        if (confirmar) {
            try {
                const token = window.localStorage.getItem("token")
                await api.delete(`/jogos/${id}`, { headers: { token } })
                alert("Jogo removido")
                window.location.reload()
            } catch (err) {
                alert("Erro ao deletar: " + err.message)
            }
        }
    }

    const goToCriarJogo = () => {
        navigate("/perfil/biblioteca/criar-jogos")
    }

    {isLoading && <p className="biblioteca-loading">Carregando Biblioteca....</p>}
    {error && <p className="biblioteca-error">Error: {error}</p>}

    return(
        <>
            <h2>Sua Biblioteca</h2>
            <button onClick={goToCriarJogo}>Criar um jogo</button>
            <p>Seus jogos Criados</p>

            {bibliotecaData && bibliotecaData.length > 0 ?  (
                <div className="biblioteca-grid">
                    {bibliotecaData.map((jogo) => {
                        return (
                            <JogoCard 
                                key={jogo.id} 
                                jogo={jogo} 
                                formatReleaseDate={formatReleaseDate}
                                onDelete={handleDelete}
                            />
                        )
                    })}
                </div>
            ) : (<p className="biblioteca-empty">Nenhum jogo criado encontrado.</p>)}
        </>
    )
}
