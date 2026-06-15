import "./sobre.css"

import {Calendar,Gem,ShieldCheck,Mail,Phone,MapPin,} from "lucide-react";

const equipe = [
  { nome: "Flavio", cargo: "CEO & Fundador", local: "Minas Gerais, BR", iniciais: "F", cor: "purple" },
  { nome: "Cristhian de Jesus", cargo: "Programmer", local: "Minas Gerais, BR", iniciais: "CJ", cor: "blue" },
  { nome: "Pedro Augusto", cargo: "Head de Design", local: "Minas Gerai, BR", iniciais: "PA", cor: "green" },
  { nome: "Carlos Eduardo", cargo: "Head de Marketing", local: "Minas Gerais, BR", iniciais: "CA", cor: "pink" },
  { nome: "Mateus", cargo: "Head de Suporte", local: "Minas Gerais, BR", iniciais: "M", cor: "yellow" },
];

export const SobrePage = () =>{
    return(
         <div className="sobre-page">
      <section className="sobre-hero">
        <div className="sobre-icon">
          <Calendar size={42} />
        </div>

        <div>
          <h1>Vaporzão Store !!</h1>
          <h3>O melhor lugar para os gamers</h3>

          <p>
            Fundada em 2026, a Vaporzão Store nasceu da paixão de um professor gamer para seus gamers alunos.
            Somos a maior plataforma de jogos dentro da Faminas ! Nossa loja esta em todos os PCs da Faminas.
            Quem comprar na nossa loja recebera 10% do valor do jogo como horas complementares !
          </p>

          
        </div>
      </section>

      <section className="sobre-stats">
        <div>
          <strong>3k+</strong>
          <span>Clientes ativos</span>
        </div>

        <div>
          <strong>1k+</strong>
          <span>Títulos disponíveis</span>
        </div>

        <div>
          <strong>98%</strong>
          <span>Satisfação dos Alunos,digo clientes !</span>
        </div>

        <div>
          <strong className="purple">1 dia</strong>
          <span>No mercado</span>
        </div>
      </section>

      <section className="sobre-cards">
        <div className="sobre-card">
          <div className="card-title">
            <div className="card-icon purple-bg">
              <Gem />
            </div>

            <div>
              <h2>Nossa Missão</h2>
              <p>O que nos move</p>
            </div>
          </div>

          <p>
            Democratizar o acesso aos melhores jogos digitais do mundo, oferecendo
            preços justos, segurança nas transações e uma experiência de compra
            que respeita o gamer.
          </p>

          <p>
            Acreditamos que jogos são arte, cultura e entretenimento para todos.
          </p>
        </div>

        <div className="sobre-card">
          <div className="card-title">
            <div className="card-icon green-bg">
              <ShieldCheck />
            </div>

            <div>
              <h2>Nossos Valores</h2>
              <p>O que acreditamos</p>
            </div>
          </div>

          <ul>
            <li>Transparência em preços e políticas</li>
            <li>Segurança total nas transações</li>
            <li>Suporte humanizado 24 horas</li>
            <li>Curadoria de qualidade nos títulos</li>
            <li>Comunidade gamer em primeiro lugar</li>
          </ul>
        </div>
      </section>

      <section className="team">
        <h2>Nossa Equipe</h2>

        <div className="team-grid">
          {equipe.map((pessoa) => (
            <div className="team-card" key={pessoa.nome}>
              <div className={`avatar ${pessoa.cor}`}>
                {pessoa.iniciais}
              </div>

              <div>
                <h3>{pessoa.nome}</h3>
                <p className={pessoa.cor}>{pessoa.cargo}</p>
                <span>{pessoa.local}</span>
                <small>in</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="contact-bar">
        <div>
          <Mail size={15} />
          contato@Vaporzaoestore.com.br
        </div>

        <div>
          <Phone size={15} />
          (32) 3729-7500
        </div>

        <div>
          <MapPin size={15} />
          Av. Cristiano Ferreira Varella, 655,Muriae,Minas Gerais
        </div>

        <div className="socials">
          Redes sociais:
            <button onClick={() => alert("Abrindo Instagram...")}>
              Instagram
            </button>

            <button onClick={() => alert("Abrindo Discord...")}>
              Discord
            </button>

            <button onClick={() => alert("Abrindo TikTok...")}>
              TikTok
            </button>
        </div>
      </section>

      <footer>
        © 2026 VaporzãoStore. Todos os direitos reservados. • Termos de Uso • Política de Privacidade
      </footer>
    </div>
    )
}