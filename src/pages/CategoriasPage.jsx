import { useNavigate } from "react-router-dom";
import { useRequestData } from "../hooks/useRequestData";

import {
  Gamepad2,Backpack,Swords,Car,Users,Trophy,Ghost,Star,Rocket,Cpu,Dices,Layers,Dumbbell,Brain,MoreHorizontal,} from "lucide-react";

import "./categoria.css";

const iconesCategorias = {
  Ação: <Gamepad2 size={32} />,
  Aventura: <Backpack size={32} />,
  RPG: <Swords size={32} />,
  Corrida: <Car size={32} />,
  Multijogador: <Users size={32} />,
  Esportes: <Trophy size={32} />,
  Terror: <Ghost size={32} />,
  Horror: <Ghost size={32} />,
  Indie: <Star size={32} />,
  "Sci-Fi": <Rocket size={32} />,
  Simulação: <Cpu size={32} />,
  Puzzle: <Dices size={32} />,
  Plataforma: <Layers size={32} />,
  Luta: <Dumbbell size={32} />,
  Estratégia: <Brain size={32} />,
};

export const CategoriaPage = () => {
  const navigate = useNavigate();

  const [dadosGeneros, isLoading, error] = useRequestData("/generos");

  const irParaLojaPorGenero = (nomeGenero) => {
    navigate(`/loja?genero=${encodeURIComponent(nomeGenero)}`);
  };

  return (
    <div className="categorias-container">
      <header className="categorias-header">
        <h1>Categorias</h1>
        <p className="breadcrumb">
          Início / <span>Categorias</span>
        </p>
        <h2 className="subtitulo">Todas as categorias</h2>
      </header>

      {isLoading && (
        <h2 className="status-msg">Carregando categorias...</h2>
      )}

      {error && (
        <h2 className="status-msg erro">
          Erro ao carregar: {error}
        </h2>
      )}

      <div className="categorias-grid">
        {!isLoading &&
          !error &&
          dadosGeneros &&
          Array.isArray(dadosGeneros) &&
          dadosGeneros.map((genero) => (
            <div className="categoria-card" key={genero.id}>
              <div className="categoria-icon-wrapper">
                {iconesCategorias[genero.nome] || (
                  <MoreHorizontal size={32} />
                )}
              </div>

              <div className="categoria-info">
                <h3>{genero.nome}</h3>

                <span className="jogos-disponiveis">
                  Ver títulos disponíveis
                </span>

                <p className="categoria-desc">
                  Explore os melhores jogos de{" "}
                  {genero.nome.toLowerCase()}.
                </p>

                <button
                  className="btn-ver-jogos"
                  onClick={() => irParaLojaPorGenero(genero.nome)}
                >
                  Ver jogos &rarr;
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};