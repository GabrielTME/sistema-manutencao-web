import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import EquipamentoPage from "./pages/EquipamentoPage";
import ManutencaoPage from "./pages/ManutencaoPage";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<EquipamentoPage />} />
          <Route path="/manutencoes" element={<ManutencaoPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
