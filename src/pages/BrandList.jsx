import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { brandsData } from '../data/brands';
import Modal from '../components/Modal';

const BrandList = () => {
  const [brands, setBrands] = useState(brandsData);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentBrand, setCurrentBrand] = useState(null);

  const handleEditClick = (brand) => {
    setCurrentBrand(brand);
    setEditModalOpen(true);
  };
  
  const handleDeleteClick = (brandId) => {
    if (window.confirm("Tem certeza que deseja excluir esta marca?")) {
      setBrands(brands.filter(brand => brand.id !== brandId));
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <div className="page-header-left">
          <Link to="/" className="btn btn-secondary btn-back">&larr; Voltar</Link>
          <h1>Cadastro de Marcas</h1>
        </div>
        <button className="btn btn-primary" onClick={() => setAddModalOpen(true)}>+ Adicionar Marca</button>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Nome da Marca</th>
              <th>Especificações</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand) => (
              <tr key={brand.id}>
                <td>{brand.name}</td>
                <td>{brand.specifications}</td>
                <td>
                  <button className="btn btn-secondary" onClick={() => handleEditClick(brand)}>Editar</button>
                  <button className="btn btn-danger" style={{marginLeft: '0.5rem'}} onClick={() => handleDeleteClick(brand.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <Modal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} title="Adicionar Marca">
         <div className="form-group">
            <label htmlFor="name">Nome da Marca</label>
            <input type="text" id="name" placeholder="Ex.: HydroMAX"/>
         </div>
         <div className="form-group">
            <label htmlFor="spec">Especificações</label>
            <input type="text" id="spec" placeholder="Ex.: Equipamentos hidráulicos de alta pressão"/>
         </div>
         <div className="modal-actions">
           <button className="btn btn-secondary" onClick={() => setAddModalOpen(false)}>Cancelar</button>
           <button className="btn btn-primary">Adicionar</button>
         </div>
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)} title="Editar Marca">
         <div className="form-group">
            <label htmlFor="edit-name">Nome da Marca</label>
            <input type="text" id="edit-name" defaultValue={currentBrand?.name} />
         </div>
         <div className="form-group">
            <label htmlFor="edit-spec">Especificações</label>
            <input type="text" id="edit-spec" defaultValue={currentBrand?.specifications} />
         </div>
         <div className="modal-actions">
           <button className="btn btn-secondary" onClick={() => setEditModalOpen(false)}>Cancelar</button>
           <button className="btn btn-primary">Salvar Alterações</button>
         </div>
      </Modal>
    </div>
  );
};

export default BrandList;
