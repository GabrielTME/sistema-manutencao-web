import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import EquipmentList from './pages/EquipmentList';
import StockList from './pages/StockList';
import ServiceOrderList from './pages/ServiceOrderList';
import NewServiceOrder from './pages/NewServiceOrder';
import ServiceOrderDetail from './pages/ServiceOrderDetail.jsx';
import BrandList from './pages/BrandList';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/equipamentos" element={<EquipmentList />} />
          <Route path="/estoque" element={<StockList />} />
          <Route path="/ordens-de-servico" element={<ServiceOrderList />} />
          <Route path="/ordens-de-servico/nova" element={<NewServiceOrder />} />
          <Route path="/ordens-de-servico/:id" element={<ServiceOrderDetail />} />
          <Route path="/marcas" element={<BrandList />} /> {}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
