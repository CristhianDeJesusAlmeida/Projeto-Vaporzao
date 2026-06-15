import { useNavigate } from "react-router";
import { useRequestData } from "../hooks/useRequestData";
import "./Home.css";
import { Gamepad2, Swords, Backpack, Car, Users, Trophy, MoreHorizontal, Shield, Tag, Zap, Headphones } from "lucide-react";

const iconesPorCategoria = {
  "Ação": <Gamepad2 size={28} />,
  "Aventura": <Backpack size={28} />,
  "RPG": <Swords size={28} />,
  "Corrida": <Car size={28} />,
  "Multijogador": <Users size={28} />,
  "Esportes": <Trophy size={28} />,
};

export const HomePage = () => {
    const navigate = useNavigate();
    
    const [dadosGeneros, isLoading, error] = useRequestData("/generos");
    
    const goToLoja = () => {
        navigate("/loja");
    };

    return (
        <div className="home">
            <section className="hero">
                <div className="hero-text">
                    <h1>
                        Os melhores jogos
                        <br />
                        em um só lugar
                    </h1>
                    <p>
                        Compre seus jogos favoritos com os melhores preços
                        <br />
                        e ofertas exclusivas.
                    </p>
                    <button onClick={goToLoja}>Explorar loja</button>
                </div>

                <div className="hero-image">
                    <div className="circle">
                        <Gamepad2 size={180} />
                    </div>
                </div>
            </section>

            <section className="categories">
                <div className="categories-top">
                    <h2>Categorias</h2>
                </div>

                {isLoading && <p style={{ color: "white", textAlign: "center" }}>Carregando categorias...</p>}
                {error && <p style={{ color: "red", textAlign: "center" }}>Erro: {error}</p>}

                <div className="categories-grid">

                  {!isLoading && !error && dadosGeneros && Array.isArray(dadosGeneros) && dadosGeneros.slice(0, 16).map((genero) => (
                    <div className="category-card" key={genero.id}>
                      <div className="category-icon">
                      {iconesPorCategoria[genero.nome] || <MoreHorizontal size={28} />}
                      </div>
                      <h3>{genero.nome}</h3>
                      
                    </div>))
                  }
                </div>

            </section>

            <section className="benefits">
                <div className="benefit-item">
                    <Shield />
                    <div>
                        <h4>Compra segura</h4>
                        <p>Seus dados sempre protegidos</p>
                    </div>
                </div>

                <div className="benefit-item">
                    <Tag />
                    <div>
                        <h4>Melhores preços</h4>
                        <p>Ofertas e promoções exclusivas</p>
                    </div>
                </div>

                <div className="benefit-item">
                    <Zap />
                    <div>
                        <h4>Entrega rápida</h4>
                        <p>Receba seu jogo na hora</p>
                    </div>
                </div>

                <div className="benefit-item">
                    <Headphones />
                    <div>
                        <h4>Suporte 24/7</h4>
                        <p>Estamos sempre aqui para ajudar</p>
                    </div>
                </div>
            </section>
        </div>
    );
};
