import "./Home.css";
import {Search,ShoppingCart,User,Gamepad2,Swords,Backpack,Car,Users,Trophy,MoreHorizontal,Shield,Tag,Zap,Headphones,} from "lucide-react";

  const categorias = [
    {nome: "Ação",icon: <Gamepad2 size={28} />,}, 
    {nome: "Aventura",icon: <Backpack size={28} />,},
    {nome: "RPG",icon: <Swords size={28} />, },
    {nome: "Corrida",icon: <Car size={28} />, },
    {nome: "Multijogador",icon: <Users size={28} />,},
    {nome: "Esportes",icon: <Trophy size={28} />,},
    {nome: "Mais",icon: <MoreHorizontal size={28} />,},
  ];



export const HomePage = () => {
    return( 
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

          <button>Explorar loja</button>
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

          <a href="">Ver todas →</a>
        </div>

        <div className="categories-grid">
          {categorias.map((categoria) => (
            <div className="category-card" key={categoria.nome}>
              <div className="category-icon">{categoria.icon}</div>

              <h3>{categoria.nome}</h3>

              <p>Ver jogos</p>
            </div>
          ))}
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
}