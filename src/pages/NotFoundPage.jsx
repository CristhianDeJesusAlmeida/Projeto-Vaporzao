import { Link } from "react-router"; // Importamos o Link do seu pacote

export const NotFoundPage = () => {
  return (
    <>
      <div style={{
         display: "flex",
         flexDirection: "column",
         alignItems: "center",
         justifyContent: "center",
         height: "80vh",
         color: "white",
         textAlign: "center",
         padding: "20px"
      }}>

         <h1 style={{ fontSize: "72px", color: "#8b5cf6", marginBottom: "10px" }}>404</h1>
         <h2 style={{ marginBottom: "20px" }}>Ops! Página não encontrada.</h2>
         <p style={{ color: "#9ca3af", marginBottom: "30px", maxWidth: "400px" }}>
         O caminho que você tentou acessar não existe ou foi movido. Use o botão abaixo para voltar à loja.
         </p>
         
         <Link to="/" style={{
         backgroundColor: "#6d28d9",
         color: "white",
         padding: "12px 24px",
         borderRadius: "8px",
         textDecoration: "none",
         fontWeight: "bold",
         transition: "background 0.2s"
         }}>
         Voltar para o Início
         </Link>
      </div>
   </>
  );
};
