import "./detalheJogo.css";

import { useParams, useNavigate } from "react-router-dom";
import { useRequestData } from "../hooks/useRequestData";
import { Heart, Share2, Star, ArrowLeft } from "lucide-react";

export const DetalheJogoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [jogo, isLoading, error] = useRequestData(`/jogos/${id}`);

  const formatarData = (data) => {
    if (!data) return "Não informado";
    return new Date(data).toLocaleDateString("pt-BR");
  };

  const calcularMediaReviews = () => {
    if (!jogo?.reviews || jogo.reviews.length === 0) return "Sem avaliações";

    const soma = jogo.reviews.reduce((acc, review) => acc + review.nota, 0);
    const media = soma / jogo.reviews.length;

    return media.toFixed(1);
  };

  if (isLoading) {
    return <h2 className="detalhe-status">Carregando jogo...</h2>;
  }

  if (error) {
    return <h2 className="detalhe-status erro">Erro: {error}</h2>;
  }

  if (!jogo) {
    return <h2 className="detalhe-status">Jogo não encontrado.</h2>;
  }

  return (
    <main className="detalhe-page">
      <button className="btn-voltar" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} />
        Voltar
      </button>

      <p className="detalhe-breadcrumb">
        Início / Loja /{" "}
        {jogo.generos?.[0]?.nome && `${jogo.generos[0].nome} / `}
        <span>{jogo.titulo}</span>
      </p>

      <section className="detalhe-container">
        <div className="detalhe-left">
          <div className="detalhe-capa">
            {jogo.capaUrl ? (
              <img src={jogo.capaUrl} alt={jogo.titulo} />
            ) : (
              <div className="sem-capa">🎮</div>
            )}
          </div>

          <div className="detalhe-miniaturas">
            <div className="miniatura active"></div>
            <div className="miniatura"></div>
            <div className="miniatura"></div>
            <div className="miniatura"></div>
          </div>
        </div>

        <div className="detalhe-right">
          <div className="detalhe-tags">
            {jogo.generos?.map((genero) => (
              <span key={genero.id}>{genero.nome}</span>
            ))}
          </div>

          <h1>{jogo.titulo}</h1>

          <p className="detalhe-dev">
            {jogo.desenvolvedora} • {formatarData(jogo.lancamento)}
          </p>

          <div className="detalhe-rating">
            <div>
              <Star size={17} fill="#facc15" />
              <Star size={17} fill="#facc15" />
              <Star size={17} fill="#facc15" />
              <Star size={17} fill="#facc15" />
              <Star size={17} fill="#facc15" />
            </div>

            <strong>{calcularMediaReviews()}</strong>

            <span>
              ({jogo._count?.reviews || 0} avaliações)
            </span>
          </div>

          <hr />

          <h2>
            R$ {Number(jogo.preco).toFixed(2).replace(".", ",")}
          </h2>

          <p className="detalhe-parcela">
            ou 12x de R$ {(Number(jogo.preco) / 12)
              .toFixed(2)
              .replace(".", ",")} sem juros
          </p>

          <div className="detalhe-actions">
            <button className="btn-carrinho">
              Adicionar ao Carrinho
            </button>

            <button className="btn-comprar">
              Comprar agora
            </button>
          </div>

          <div className="detalhe-small-actions">
            <button>
              <Heart size={20} />
            </button>

            <button>
              <Share2 size={20} />
            </button>
          </div>

          <div className="detalhe-info">
            <div>
              <span>Desenvolvedora</span>
              <strong>{jogo.desenvolvedora}</strong>
            </div>

            <div>
              <span>Data de lançamento</span>
              <strong>{formatarData(jogo.lancamento)}</strong>
            </div>

            <div>
              <span>Autor</span>
              <strong>{jogo.autor?.nome || "Não informado"}</strong>
            </div>

            <div>
              <span>Gêneros</span>
              <strong>
                {jogo.generos?.map((genero) => genero.nome).join(", ")}
              </strong>
            </div>

            <div>
              <span>Reviews</span>
              <strong>{jogo._count?.reviews || 0}</strong>
            </div>

            <div>
              <span>Wishlists</span>
              <strong>{jogo._count?.wishlists || 0}</strong>
            </div>
          </div>

          <div className="detalhe-sobre">
            <h3>Sobre o jogo</h3>
            <p>{jogo.descricao}</p>
          </div>
        </div>
      </section>

      {jogo.reviews && jogo.reviews.length > 0 && (
        <section className="detalhe-reviews">
          <h2>Reviews dos jogadores</h2>

          <div className="reviews-grid">
            {jogo.reviews.map((review) => (
              <div className="review-card" key={review.id}>
                <div className="review-top">
                  <strong>{review.autor?.nome}</strong>
                  <span>Nota {review.nota}/10</span>
                </div>

                <p>{review.texto}</p>

                <small>
                  {review.recomenda ? "Recomenda" : "Não recomenda"}
                </small>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};