import React from 'react';
import { Link } from 'react-router-dom';
import { serviceOrdersData } from '../data/serviceOrders';

const ServiceOrderList = () => {
  return (
    <div className="container">
      <Link to="/">&larr; Voltar</Link>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1.5rem 0' }}>
        <h1>Consulta de Ordens de Serviço</h1>
        <div>
          <Link to="/ordens-de-servico/nova" className="btn btn-primary">+ Nova O.S.</Link>
          <button className="btn btn-secondary" style={{ marginLeft: '0.5rem' }}>Imprimir</button>
        </div>
      </div>
      
      <div className="table-wrapper" style={{marginBottom: '2rem'}}>
        <p>Filtros de Pesquisa...</p>
        <button className="btn btn-primary">Pesquisar</button>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Data Emissão</th>
              <th>Situação</th>
              <th>Nº O.S.</th>
              <th>Modelo</th>
              <th>Localização Física da Máquina</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {serviceOrdersData.map((os) => (
              <tr key={os.id}>
                <td>{os.emissionDate}</td>
                <td>{os.status}</td>
                <td>{os.id}</td>
                <td>{os.model}</td>
                <td>{os.location}</td>
                <td>
                  {}
                  <Link to={`/ordens-de-servico/${os.id}`}>Ver Detalhes</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceOrderList;
