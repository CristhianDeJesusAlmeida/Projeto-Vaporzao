import { useSearchParams } from "react-router";
import { useRequestData } from "../hooks/useRequestData";
import "./loja.css";

export const LojaPage = () => {
    
    const [searchParams] = useSearchParams();
    
    const termoBusca = searchParams.get("busca") || "";

    const endpoint = termoBusca ? `/jogos?busca=${termoBusca}` : "/jogos";

    const [jogos, isLoading, error] = useRequestData(endpoint);

    const nenhumJogoEncontrado = !isLoading && !error && jogos && jogos.itens && jogos.itens.length === 0;

    return (
        <div className="loja-container">

            {isLoading && <h2 style={{ color: 'white', textAlign: 'center', marginTop: '40px' }}>Carregando Jogos...</h2>}

            {error && <h2 style={{ color: 'red', textAlign: 'center', marginTop: '40px' }}>Erro: {error}</h2>}

            {nenhumJogoEncontrado && (
                <div style={{ color: "white", textAlign: "center", padding: "80px 20px" }}>
                    <h2 style={{ fontSize: "28px", color: "#8b5cf6", marginBottom: "15px" }}>Nenhum jogo encontrado</h2>
                    <p style={{ color: "#9ca3af", fontSize: "16px" }}>
                        Não encontramos resultados correspondentes para a pesquisa <strong>"{termoBusca}"</strong>.
                    </p>
                    <p style={{ color: "#6b7280", fontSize: "14px", marginTop: "10px" }}>
                        Verifique se digitou o nome correto ou tente buscar por termos mais genéricos.
                    </p>
                </div>
            )}

            {!isLoading && !error && jogos && jogos.itens && jogos.itens.length > 0 && (
                <>
                    <h1 className="loja-title">
                        {termoBusca ? `Resultados para "${termoBusca}"` : "Todos os Jogos"}
                    </h1>
                    
                    <div className="jogos-grid">
                        {jogos.itens.map((jogo) => (
                            <div className="jogo-card" key={jogo.id}>
                                {jogo.capaUrl && <img src={jogo.capaUrl} alt={jogo.titulo} />}
                                <div className="jogo-info">
                                    <h3>{jogo.titulo}</h3>

                                    {jogo.generos && jogo.generos.length > 0 && (
                                        <span className="jogo-categoria">{jogo.generos[0].nome}</span>
                                    )}
                                    
                                    <p className="jogo-preco">R$ {jogo.preco}</p>
                                    <button className="btn-comprar">Comprar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
