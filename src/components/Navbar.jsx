import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Search, ShoppingCart, User } from "lucide-react";
import "./Navbar.css";

export const Menu = () => {
    const [pesquisa, setPesquisa] = useState("");
    const navigate = useNavigate();

    const lidarComPesquisa = (event) => {
        if (event.key === "Enter") {
            if (pesquisa.trim() !== "") {
                navigate(`/loja?busca=${pesquisa.trim()}`);
            } else {
                navigate("/loja");
            }
        }
    };

    return (
        <header className="navbar-header">
            <div className="navbar-brand">
                <Link to="/" className="logo-text">🎮 Vaporzão Store</Link>
            </div>

            <nav className="navbar-links">
                <Link to = "/">Início</Link>
                <Link to = "/loja">Loja</Link>
                <Link to = "/categorias">Categorias</Link>
                <Link to = "/sobre">Sobre</Link>
            </nav>

            <div className="navbar-search">
                <Search size={18} className="search-icon" />
                <input 
                    type="text" 
                    placeholder="Buscar jogos, categorias ou promoções..." 
                    value={pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}
                    onKeyDown={lidarComPesquisa}
                />
            </div>

            <div className="navbar-actions">
                <button className="icon-btn"><User size={22} /></button>
                <button className="icon-btn cart-btn">
                    <ShoppingCart size={22} />
                    <span className="cart-badge">0</span>
                </button>
            </div>
        </header>
    );
};
