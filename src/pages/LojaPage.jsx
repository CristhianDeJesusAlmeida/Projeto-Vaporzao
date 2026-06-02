import { useSearchParams } from "react-router-dom";
import { useRequestData } from "../hooks/useRequestData";
import "./loja.css";

export const LojaPage = () => {
  const [searchParams] = useSearchParams();

  const termoBusca = searchParams.get("busca") || "";
  const generoSelecionado = searchParams.get("genero") || "";

  let endpoint = "/jogos";

  if (termoBusca && generoSelecionado) {
    endpoint = `/jogos?busca=${encodeURIComponent(
      termoBusca
    )}&genero=${encodeURIComponent(generoSelecionado)}`;
  } else if (termoBusca) {
    endpoint = `/jogos?busca=${encodeURIComponent(termoBusca)}`;
  } else if (generoSelecionado) {
    endpoint = `/jogos?genero=${encodeURIComponent(generoSelecionado)}`;
  }

  const [jogos, isLoading, error] = useRequestData(endpoint);

  const listaJogos = jogos?.itens || [];

  const nenhumJogoEncontrado =
    !isLoading && !error && listaJogos.length === 0;

  const tituloPagina = generoSelecionado
    ? `Jogos de ${generoSelecionado}`
    : termoBusca
    ? `Resultados para "${termoBusca}"`
    : "Todos os Jogos";

  return (
    <div className="loja-container">
      {isLoading && (
        <h2
          style={{
            color: "white",
            textAlign: "center",
            marginTop: "40px",
          }}
        >
          Carregando Jogos...
        </h2>
      )}

      {error && (
        <h2
          style={{
            color: "red",
            textAlign: "center",
            marginTop: "40px",
          }}
        >
          Erro: {error}
        </h2>
      )}

      {nenhumJogoEncontrado && (
        <div
          style={{
            color: "white",
            textAlign: "center",
            padding: "80px 20px",
          }}
        >
          <h2
            style={{
              fontSize: "28px",
              color: "#8b5cf6",
              marginBottom: "15px",
            }}
          >
            Nenhum jogo encontrado
          </h2>

          <p style={{ color: "#9ca3af", fontSize: "16px" }}>
            Não encontramos resultados para{" "}
            <strong>
              {generoSelecionado || termoBusca}
            </strong>
            .
          </p>

          <p
            style={{
              color: "#6b7280",
              fontSize: "14px",
              marginTop: "10px",
            }}
          >
            Tente buscar por outro termo ou categoria.
          </p>
        </div>
      )}

      {!isLoading && !error && listaJogos.length > 0 && (
        <>
          <h1 className="loja-title">{tituloPagina}</h1>

          <div className="jogos-grid">
            {listaJogos.map((jogo) => (
              <div className="jogo-card" key={jogo.id}>
                {jogo.capaUrl && (
                  <img src={jogo.capaUrl} alt={jogo.titulo} />
                )}

                <div className="jogo-info">
                  <h3>{jogo.titulo}</h3>

                  {jogo.generos && jogo.generos.length > 0 && (
                    <span className="jogo-categoria">
                      {jogo.generos[0].nome}
                    </span>
                  )}

                  <p className="jogo-preco">R$ {jogo.preco}</p>

                  <button className="btn-comprar">
                    Comprar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};