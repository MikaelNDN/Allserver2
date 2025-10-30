import { Link, NavLink } from 'react-router-dom';


export default function Header() {
  return (
    <header className="barra-navegacao">
      
      <Link to="/" className="logomarca">
        <i className="fa-solid fa-martini-glass"></i>
        <span>All<span className="destaque">Serve</span></span>
      </Link>

      <nav className="menu-principal">      
        <NavLink to="/">Início</NavLink>
        <NavLink to="/sobre">Sobre</NavLink> 
        <NavLink to="/profissionais">Profissionais</NavLink>
      </nav>

      <div className="icones-acao">
        <Link to="#" aria-label="Buscar"><i className="fa-solid fa-magnifying-glass"></i></Link>
        <Link to="/perfil-usuario" aria-label="Perfil do usuário"><i className="fa-regular fa-user"></i></Link>
        <Link to="/carrinho" aria-label="Carrinho de compras"><i className="fa-solid fa-cart-shopping"></i></Link>
      </div>
    </header>
  );
}