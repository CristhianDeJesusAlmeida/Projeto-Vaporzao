import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRequestData } from "../hooks/useRequestData";
import "./loja.css";

export const LojaPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const termoBusca = searchParams.get("busca") || "";
  const generoSelecionado = searchParams.get("genero") || "";
  const paginaAtual = Number(searchParams.get("pagina")) || 1;

  let endpoint = `/jogos?pagina=${paginaAtual}`;

  if (termoBusca) {
    endpoint += `&busca=${encodeURIComponent(termoBusca)}`;
  }

  if (generoSelecionado) {
    endpoint += `&genero=${encodeURIComponent(generoSelecionado)}`;
  }

  const [jogos, isLoading, error] = useRequestData(endpoint);

  const listaJogos = jogos?.itens || [];

  const jogoAleatorio = useMemo(() => {
    if (listaJogos.length === 0) return null;

    const indiceAleatorio = Math.floor(Math.random() * listaJogos.length);
    return listaJogos[indiceAleatorio];
  }, [listaJogos]);

  const nenhumJogoEncontrado =
    !isLoading && !error && listaJogos.length === 0;

  const tituloPagina = generoSelecionado
    ? `Jogos de ${generoSelecionado}`
    : termoBusca
    ? `Resultados para "${termoBusca}"`
    : "Todos os Jogos";

  const mudarPagina = (novaPagina) => {
    const params = new URLSearchParams();

    if (termoBusca) params.set("busca", termoBusca);
    if (generoSelecionado) params.set("genero", generoSelecionado);

    params.set("pagina", novaPagina);

    navigate(`/loja?${params.toString()}`);
  };

  return (
    <div className="loja-container">
      {isLoading && (
        <h2 className="loja-status">Carregando Jogos...</h2>
      )}

      {error && (
        <h2 className="loja-status erro">Erro: {error}</h2>
      )}

      {!isLoading && !error && jogoAleatorio && (
        <section className="loja-hero-random">
          <div className="hero-random-info">
            <span>Jogo em destaque</span>

            <h1>{jogoAleatorio.titulo}</h1>

            {jogoAleatorio.generos && jogoAleatorio.generos.length > 0 && (
              <p className="hero-genero">
                {jogoAleatorio.generos[0].nome}
              </p>
            )}

            <p className="hero-desc">
              Descubra esse jogo disponível na Vaporzão Store.
            </p>

            <strong>R$ {jogoAleatorio.preco}</strong>

            <button>Comprar agora</button>
            <button className="btn-detalhes"onClick={() => navigate(`/jogo/${jogo.id}`)}>
              Ver detalhes
            </button>
          </div>

          <div className="hero-random-image">
            {jogoAleatorio.capaUrl ? (
              <img
                src={jogoAleatorio.capaUrl}
                alt={jogoAleatorio.titulo}
              />
            ) : (
              <div className="hero-placeholder">🎮</div>
            )}
          </div>
        </section>
      )}

      {nenhumJogoEncontrado && (
        <div className="loja-empty">
          <h2>Nenhum jogo encontrado</h2>

          <p>
            Não encontramos resultados para{" "}
            <strong>{generoSelecionado || termoBusca}</strong>.
          </p>

          <p>
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
                  <button className="btn-detalhes"onClick={() => navigate(`/jogo/${jogo.id}`)}>
                    Ver detalhes
                  </button>

                </div>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button
              disabled={paginaAtual === 1}
              onClick={() => mudarPagina(paginaAtual - 1)}
            >
              Anterior
            </button>

            <span>Página {paginaAtual}</span>

            <button onClick={() => mudarPagina(paginaAtual + 1)}>
              Próxima
            </button>
          </div>
        </>
      )}
    </div>
  );
};