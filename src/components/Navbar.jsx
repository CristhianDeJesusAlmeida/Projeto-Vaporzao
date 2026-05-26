import { Link } from "react-router";

export const Menu = () => {
    return (
        <nav>
            <Link to = "/">Home</Link>
            <Link to = "/loja">Loja</Link>
            <Link to = "/promocoes">Promoções</Link>
            <Link to = "/sobre">Sobre</Link>
            </nav>
    )
}