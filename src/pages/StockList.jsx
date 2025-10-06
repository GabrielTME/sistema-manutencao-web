import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { stockItemsData } from '../data/stockItems';
import { itemTypesData } from '../data/itemTypes';
import Modal from '../components/Modal';

const StockList = () => {
  const [stockItems, setStockItems] = useState(stockItemsData);
  const [filteredItems, setFilteredItems] = useState(stockItemsData);
  const [filterType, setFilterType] = useState('Todos');

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isPhotoModalOpen, setPhotoModalOpen] = useState(false);
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState('');

  const initialItemState = { name: '', id: '', quantity: '', unitValue: '', photoUrl: '', type: '' };
  const [newItem, setNewItem] = useState(initialItemState);
  const [editFormData, setEditFormData] = useState(initialItemState);

  useEffect(() => {
    if (filterType === 'Todos') {
      setFilteredItems(stockItems);
    } else {
      setFilteredItems(stockItems.filter(item => item.type === filterType));
    }
  }, [filterType, stockItems]);

  useEffect(() => {
    if (currentItem) {
      const formattedItem = {
        ...currentItem,
        unitValue: String(Number(currentItem.unitValue).toFixed(2)).replace('.', '')
      };
      setEditFormData(formattedItem);
    }
  }, [currentItem]);

  const totalValue = filteredItems.reduce((acc, item) => acc + (item.quantity * Number(item.unitValue)), 0);

  const handleEditClick = (item) => {
    setCurrentItem(item);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (itemId) => {
    if (window.confirm("Tem certeza que deseja excluir este item?")) {
      setStockItems(stockItems.filter(item => item.id !== itemId));
    }
  };
  
  const handlePhotoClick = (photoUrl) => {
    if (photoUrl) {
      setSelectedPhotoUrl(photoUrl);
      setPhotoModalOpen(true);
    }
  };

  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddStockItem = () => {
    if (!newItem.name || !newItem.id || !newItem.type) {
      alert('Por favor, preencha o nome, código e tipo do item.');
      return;
    }
    const finalNewItem = {
      ...newItem,
      quantity: Number(newItem.quantity),
      unitValue: Number(newItem.unitValue) / 100
    };
    setStockItems([...stockItems, finalNewItem]);
    setNewItem(initialItemState);
    setAddModalOpen(false);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleUpdateStockItem = () => {
    const finalEditedItem = {
      ...editFormData,
      quantity: Number(editFormData.quantity),
      unitValue: Number(editFormData.unitValue) / 100
    };
    setStockItems(stockItems.map(item => item.id === finalEditedItem.id ? finalEditedItem : item));
    setEditModalOpen(false);
    setCurrentItem(null);
  };

  const handleCurrencyChange = (e, stateSetter) => {
    const { name, value } = e.target;
    const digits = value.replace(/[^\d]/g, '');
    stateSetter(prevState => ({ ...prevState, [name]: digits }));
  };

  const formatCurrencyForInput = (digits) => {
    if (!digits) return '';
    const value = Number(digits) / 100;
    return value.toFixed(2).replace('.', ',');
  };
  
  const formatCurrencyForDisplay = (value) => {
    return Number(value).toFixed(2).replace('.', ',');
  };

  const getStatusTag = (quantity) => {
    const qty = Number(quantity);
    if (qty === 0) return <span className="status-tag out-of-stock">Sem Estoque</span>;
    if (qty <= 5) return <span className="status-tag low-stock">Estoque Baixo</span>;
    return <span className="status-tag in-stock">Em Estoque</span>;
  };

  return (
    <div className="container">
      <div className="page-header">
        <div className="page-header-left">
          <Link to="/" className="btn btn-secondary btn-back">&larr; Voltar</Link>
          <h1>Itens em Estoque</h1>
        </div>
        <button className="btn btn-primary" onClick={() => setAddModalOpen(true)}>+ Adicionar Item</button>
      </div>

      <div className="filter-box">
        <div className="form-group">
          <label htmlFor="filterType">Filtrar por Tipo de Item</label>
          <select 
            id="filterType" 
            className="form-select" 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="Todos">Todos</option>
            {itemTypesData.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nome do Item</th>
              <th>Código do Item</th>
              <th>Tipo do Item</th>
              <th>Quantidade</th>
              <th>Valor Unitário</th>
              <th>Valor Total</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td className="td-photo">
                  <img 
                    src={item.photoUrl || 'https://via.placeholder.com/40x40.png?text=Sem+Foto'} 
                    alt={item.name} 
                    className="table-photo-thumb"
                    onClick={() => handlePhotoClick(item.photoUrl)}
                  />
                </td>
                <td>{item.name}</td>
                <td><span className="id-tag">{item.id}</span></td>
                <td>{item.type}</td>
                <td>
                  <div className="quantity-cell">
                    <span>{item.quantity}</span>
                    {getStatusTag(item.quantity)}
                  </div>
                </td>
                <td>{`R$${formatCurrencyForDisplay(item.unitValue)}`}</td>
                <td>{`R$${formatCurrencyForDisplay(item.quantity * item.unitValue)}`}</td>
                <td>
                  <div className="actions-group">
                    <button className="btn btn-secondary" onClick={() => handleEditClick(item)}>Editar</button>
                    <button className="btn btn-danger" onClick={() => handleDeleteClick(item.id)}>Excluir</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{textAlign: 'right', marginTop: '1rem', fontWeight: 'bold'}}>
            Valor Total do Estoque: R${formatCurrencyForDisplay(totalValue)}
        </p>
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} title="Adicionar Item ao Estoque">
         <p className="modal-subtitle">Preencha as informações do novo item.</p>
         <div className="form-group">
            <label htmlFor="name">Nome do Item</label>
            <input type="text" name="name" value={newItem.name} onChange={handleNewItemChange} placeholder="Ex.: Filtro de óleo"/>
         </div>
         <div className="form-group">
            <label htmlFor="id">Código do Item</label>
            <input type="text" name="id" value={newItem.id} onChange={handleNewItemChange} placeholder="Ex.: FLTRO001"/>
         </div>
         <div className="form-group">
            <label htmlFor="type">Tipo do Item</label>
            <select name="type" className="form-select" value={newItem.type} onChange={handleNewItemChange}>
              <option value="" disabled>Selecione um tipo</option>
              {itemTypesData.map(type => (<option key={type} value={type}>{type}</option>))}
            </select>
         </div>
         <div className="form-group">
            <label htmlFor="quantity">Quantidade</label>
            <input type="number" name="quantity" value={newItem.quantity} onChange={handleNewItemChange} />
         </div>
         <div className="form-group">
            <label htmlFor="unitValue">Valor Unitário</label>
            <input type="text" inputMode="decimal" name="unitValue" value={formatCurrencyForInput(newItem.unitValue)} onChange={(e) => handleCurrencyChange(e, setNewItem)} />
         </div>
         <div className="form-group">
            <label htmlFor="photoUrl">Foto (URL)</label>
            <input type="text" name="photoUrl" value={newItem.photoUrl} onChange={handleNewItemChange} placeholder="https://exemplo.com/foto.jpg"/>
         </div>
         <div className="modal-actions">
           <button className="btn btn-secondary" onClick={() => setAddModalOpen(false)}>Cancelar</button>
           <button className="btn btn-primary" onClick={handleAddStockItem}>Adicionar</button>
         </div>
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)} title="Editar Item">
         <p className="modal-subtitle">Modifique as informações do item em estoque.</p>
         <div className="form-group">
            <label htmlFor="edit-name">Nome do Item</label>
            <input type="text" name="name" value={editFormData.name} onChange={handleEditFormChange} />
         </div>
         <div className="form-group">
            <label htmlFor="edit-id">Código do Item</label>
            <input type="text" name="id" value={editFormData.id} readOnly disabled />
         </div>
         <div className="form-group">
            <label htmlFor="edit-type">Tipo do Item</label>
            <select name="type" className="form-select" value={editFormData.type} onChange={handleEditFormChange}>
              <option value="" disabled>Selecione um tipo</option>
              {itemTypesData.map(type => (<option key={type} value={type}>{type}</option>))}
            </select>
         </div>
         <div className="form-group">
            <label htmlFor="edit-quantity">Quantidade</label>
            <input type="number" name="quantity" value={editFormData.quantity} onChange={handleEditFormChange} />
         </div>
         <div className="form-group">
            <label htmlFor="edit-unitValue">Valor Unitário</label>
            <input type="text" inputMode="decimal" name="unitValue" value={formatCurrencyForInput(editFormData.unitValue)} onChange={(e) => handleCurrencyChange(e, setEditFormData)} placeholder="R$ 0,00" />
         </div>
         <div className="form-group">
            <label htmlFor="edit-photoUrl">Foto (URL)</label>
            <input type="text" name="photoUrl" value={editFormData.photoUrl} onChange={handleEditFormChange} placeholder="https://exemplo.com/foto.jpg"/>
         </div>
         <div className="modal-actions">
           <button className="btn btn-secondary" onClick={() => setEditModalOpen(false)}>Cancelar</button>
           <button className="btn btn-primary" onClick={handleUpdateStockItem}>Salvar Alterações</button>
         </div>
      </Modal>
      
      <Modal isOpen={isPhotoModalOpen} onClose={() => setPhotoModalOpen(false)} title="Foto do Item">
        <img src={selectedPhotoUrl} alt="Item do Estoque" className="photo-modal-img"/>
      </Modal>
    </div>
  );
};

export default StockList;
