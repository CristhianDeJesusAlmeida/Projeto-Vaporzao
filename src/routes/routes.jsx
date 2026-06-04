import { BrowserRouter, Routes, Route } from "react-router";
import { Menu } from "../components/Navbar";
import { HomePage } from "../pages/HomePage";
import { LojaPage } from "../pages/LojaPage";
import { SobrePage } from "../pages/SobrePage";
import { CategoriaPage } from "../pages/CategoriasPage";
import { LoginPage } from "../pages/LoginPage";
import { PerfilPage } from "../pages/PerfilPage";
import { BibliotecaPage } from "../pages/BibliotecaPage";
import { CriarJogoPage } from "../pages/CriarJogoPage";
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
        <Route path="/login" element = {<LoginPage />} />
        <Route path="/perfil" element = {<PerfilPage />} />
        <Route path="/perfil/biblioteca" element = {<BibliotecaPage />} />
        <Route path="/perfil/biblioteca/criar-jogos" element = {<CriarJogoPage />} />
        <Route path="*" element= {<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}