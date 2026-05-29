import { Link } from "react-router";

export const NotFoundPage = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          color: "white",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "92px",
            color: "#8b5cf6",
            marginBottom: "10px",
          }}
        >
          404
        </h1>

        <h2 style={{ marginBottom: "20px" }}>
          🎮 Game Over!
        </h2>

        <p
          style={{
            color: "#9ca3af",
            marginBottom: "30px",
            maxWidth: "500px",
            lineHeight: "1.6",
          }}
        >
          A página que você tentou acessar saiu do lobby ou nunca existiu na
          Vaporzão Store. Parece que você encontrou uma área secreta do mapa,
          mas infelizmente ela ainda não foi desbloqueada.
        </p>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link
            to="/"
            style={{
              backgroundColor: "#6d28d9",
              color: "white",
              padding: "12px 24px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            🏠 Voltar ao Início
          </Link>

          <Link
            to="/loja"
            style={{
              border: "1px solid #6d28d9",
              color: "#c4b5fd",
              padding: "12px 24px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            🛒 Ir para Loja
          </Link>
        </div>

        <div
          style={{
            marginTop: "35px",
            color: "#8b5cf6",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          🎮 Vaporzão Store
        </div>
      </div>
    </>
  );
};