import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { LojaPage } from "../pages/LojaPage";
import { PromocoesPage } from "../pages/PromocoesPage";
import { SobrePage } from "../pages/SobrePage";
import { NotFoundPage } from "../pages/NotFoundPage";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loja" element={<LojaPage />} />
        <Route path="/promocoes" element={<PromocoesPage />} />
        <Route path="/sobre" element={<SobrePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}