import { useState, useEffect } from "react";

export const GaleriaImagens = ({ capaUrl, imagensAdicionais, titulo }) => {
  const [imagemAtiva, setImagemAtiva] = useState("");

  useEffect(() => {
    capaUrl && setImagemAtiva(capaUrl);
  }, [capaUrl]);

  const todasImagens = [
    ...(capaUrl ? [capaUrl] : []),
    ...(imagensAdicionais?.map((img) => img.url) || [])
  ];

  return (
    <div className="detalhe-left">
      <div className="detalhe-capa">
        {imagemAtiva ? (
          <img src={imagemAtiva} alt={titulo} />
        ) : (
          <div className="sem-capa">🎮</div>
        )}
      </div>

      <div className="detalhe-miniaturas">
        {todasImagens.map((url, index) => (
          <div
            key={index}
            className={`miniatura ${imagemAtiva === url ? "active" : ""}`}
            onClick={() => setImagemAtiva(url)}
            style={{ cursor: "pointer", overflow: "hidden" }}
          >
            <img 
              src={url} 
              alt={`Miniatura ${index + 1}`} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};
