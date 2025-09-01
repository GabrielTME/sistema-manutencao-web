import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import EquipamentoPage from "./pages/EquipamentoPage";
import ManutencaoPage from "./pages/ManutencaoPage";

export default function App() {
  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h1>Sistema de Manutenção</h1>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/equipamentos" style={{ marginRight: "15px" }}>Equipamentos</Link>
        <Link to="/manutencoes">Manutenções</Link>
      </nav>
      <Routes>
        <Route path="/equipamentos" element={<EquipamentoPage />} />
        <Route path="/manutencoes" element={<ManutencaoPage />} />
      </Routes>
    </div>
  );
}
