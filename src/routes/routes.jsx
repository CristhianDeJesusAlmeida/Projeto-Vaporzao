import { BrowserRouter, Routes, Route } from "react-router";
import { Menu } from "../components/Navbar";
import { HomePage } from "../pages/HomePage";
import { LojaPage } from "../pages/LojaPage";
import { SobrePage } from "../pages/SobrePage";
import { CategoriaPage } from "../pages/CategoriasPage";
import { NotFoundPage } from "../pages/NotFoundPage";

export function AppRoutes() {
  return (
    <BrowserRouter>
    <Menu />
      <Routes>
        <Route path="/" element= {<HomePage />} />
        <Route path="/loja" element= {<LojaPage />} />
        <Route path="/sobre" element= {<SobrePage />} />
        <Route path="/categorias" element ={<CategoriaPage />} />
        <Route path="*" element= {<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}