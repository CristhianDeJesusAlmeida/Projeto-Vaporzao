import React from "react"

export const JogoCard = ({ jogo, formatReleaseDate, onDelete, onEdit }) => {
    return (
        <div key={jogo.id} className="jogo-card">
            <img 
                src={jogo.capaUrl || "https://placeholder.com"} 
                alt={jogo.titulo}
            />

            <div className="jogo-info-container">
                <h4>{jogo.titulo}</h4>
                <p>{jogo.desenvolvedora}</p>
                
                <div className="jogo-genres">
                    {jogo.generos?.map((g) => (
                        <span key={g.id} className="jogo-badge">{g.nome}</span>
                    ))}
                </div>
                
                <p>Lançamento: {formatReleaseDate(jogo.lancamento)}</p>
                <p>Criador: {jogo.autor?.nome} ({jogo.autor?.matricula})</p>
                
                <div className="jogo-stats">
                    <span>Reviews: {jogo._count?.reviews || 0}</span>
                    <span>Imagens: {jogo._count?.imagens || 0}</span>
                    <span>Videos: {jogo._count?.videos || 0}</span>
                </div>
                
                <span className="jogo-price">
                    {jogo.preco === 0 ? "Grátis" : `R$ ${jogo.preco.toFixed(2)}`}
                </span>

                <button onClick={() => onEdit(jogo)} className="jogo-btn-edit">
                    Alterar
                </button>

                <button onClick={() => onDelete(jogo.id)} className="jogo-btn-delete">
                    Excluir
                </button>
            </div>
        </div>
    )
}
