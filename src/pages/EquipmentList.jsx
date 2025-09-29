import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { equipmentsData } from '../data/equipments';
import { brandsData } from '../data/brands';
import Modal from '../components/Modal';

const EquipmentList = () => {
  const [equipments, setEquipments] = useState(equipmentsData);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentEquipment, setCurrentEquipment] = useState(null);
  const [isPhotoModalOpen, setPhotoModalOpen] = useState(false);
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState('');

  const initialNewEquipmentState = { name: '', brand: '', photoUrl: '' };
  const [newEquipment, setNewEquipment] = useState(initialNewEquipmentState);
  const [editFormData, setEditFormData] = useState(initialNewEquipmentState);

  useEffect(() => {
    if (currentEquipment) {
      setEditFormData(currentEquipment);
    }
  }, [currentEquipment]);

  const handleEditClick = (equipment) => {
    setCurrentEquipment(equipment);
    setEditModalOpen(true);
  };
  
  const handleDeleteClick = (equipmentId) => {
    if (window.confirm("Tem certeza que deseja excluir este equipamento?")) {
      setEquipments(equipments.filter(eq => eq.id !== equipmentId));
    }
  };

  const handlePhotoClick = (photoUrl) => {
    if (photoUrl) {
      setSelectedPhotoUrl(photoUrl);
      setPhotoModalOpen(true);
    }
  };

  const handleNewEquipmentChange = (e) => {
    const { name, value } = e.target;
    setNewEquipment(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddEquipment = () => {
    if (!newEquipment.name || !newEquipment.brand) {
      alert('Por favor, preencha o nome e a marca do equipamento.');
      return;
    }
    const newId = `EQ${String(equipments.length + 1).padStart(3, '0')}`;
    setEquipments([...equipments, { ...newEquipment, id: newId }]);
    setNewEquipment(initialNewEquipmentState);
    setAddModalOpen(false);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleUpdateEquipment = () => {
    setEquipments(equipments.map(eq => eq.id === editFormData.id ? editFormData : eq));
    setEditModalOpen(false);
    setCurrentEquipment(null);
  };

  return (
    <div className="container">
      <div className="page-header">
        <div className="page-header-left">
          <Link to="/" className="btn btn-secondary btn-back">
            &larr; Voltar
          </Link>
          <h1>Cadastro de Equipamentos</h1>
        </div>
        <button className="btn btn-primary" onClick={() => setAddModalOpen(true)}>+ Adicionar Equipamento</button>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nome do Equipamento</th>
              <th>Marca</th>
              <th>ID do Equipamento</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {equipments.map((eq) => (
              <tr key={eq.id}>
                <td>
                  <img 
                    src={eq.photoUrl || 'https://via.placeholder.com/40x40.png?text=Sem+Foto'} 
                    alt={eq.name} 
                    className="table-photo-thumb"
                    onClick={() => handlePhotoClick(eq.photoUrl)}
                  />
                </td>
                <td>{eq.name}</td>
                <td>{eq.brand}</td>
                <td>
                  <span className="id-tag">{eq.id}</span>
                </td>
                <td>
                  <button className="btn btn-secondary" onClick={() => handleEditClick(eq)}>Editar</button>
                  <button className="btn btn-danger" style={{marginLeft: '0.5rem'}} onClick={() => handleDeleteClick(eq.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <Modal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} title="Adicionar Equipamento">
         <p className="modal-subtitle">Preencha as informações do novo equipamento.</p>
         <div className="form-group">
            <label htmlFor="name">Nome do Equipamento</label>
            <input type="text" id="name" name="name" value={newEquipment.name} onChange={handleNewEquipmentChange} placeholder="Ex.: Prensa Hidráulica PH-1000"/>
         </div>
         <div className="form-group">
            <label htmlFor="brand">Marca</label>
            <select id="brand" name="brand" value={newEquipment.brand} onChange={handleNewEquipmentChange} className="form-select">
              <option value="" disabled>Selecione uma marca</option>
              {brandsData.map(brand => (
                <option key={brand.id} value={brand.name}>{brand.name}</option>
              ))}
            </select>
         </div>
         <div className="form-group">
            <label htmlFor="photoUrl">Foto (URL)</label>
            <input type="text" id="photoUrl" name="photoUrl" value={newEquipment.photoUrl} onChange={handleNewEquipmentChange} placeholder="https://exemplo.com/foto.jpg"/>
         </div>
         <div className="modal-actions">
           <button className="btn btn-secondary" onClick={() => setAddModalOpen(false)}>Cancelar</button>
           <button className="btn btn-primary" onClick={handleAddEquipment}>Adicionar</button>
         </div>
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)} title="Editar Equipamento">
         <p className="modal-subtitle">Modifique as informações do equipamento.</p>
         <div className="form-group">
            <label htmlFor="edit-name">Nome do Equipamento</label>
            <input type="text" id="edit-name" name="name" value={editFormData.name} onChange={handleEditFormChange} />
         </div>
         <div className="form-group">
            <label htmlFor="edit-brand">Marca</label>
            <select id="edit-brand" name="brand" value={editFormData.brand} onChange={handleEditFormChange} className="form-select">
              {brandsData.map(brand => (
                <option key={brand.id} value={brand.name}>{brand.name}</option>
              ))}
            </select>
         </div>
         <div className="form-group">
            <label htmlFor="edit-photoUrl">Foto (URL)</label>
            <input type="text" id="edit-photoUrl" name="photoUrl" value={editFormData.photoUrl} onChange={handleEditFormChange} placeholder="https://exemplo.com/foto.jpg"/>
         </div>
         <div className="modal-actions">
           <button className="btn btn-secondary" onClick={() => setEditModalOpen(false)}>Cancelar</button>
           <button className="btn btn-primary" onClick={handleUpdateEquipment}>Salvar Alterações</button>
         </div>
      </Modal>

      <Modal isOpen={isPhotoModalOpen} onClose={() => setPhotoModalOpen(false)} title="Foto do Equipamento">
        <img src={selectedPhotoUrl} alt="Equipamento" className="photo-modal-img"/>
      </Modal>

    </div>
  );
};

export default EquipmentList;
