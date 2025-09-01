import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Sistema ERP Manutenção</h1>
      <ul>
        <li><Link to="/">Equipamentos</Link></li>
        <li><Link to="/manutencoes">Manutenções</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
