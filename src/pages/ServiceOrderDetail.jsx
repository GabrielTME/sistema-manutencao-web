import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { serviceOrderDetailsData } from '../data/serviceOrderDetails';
import './ServiceOrderDetail/ServiceOrderDetail.css';
import TabPrincipal from './ServiceOrderDetail/TabPrincipal';
import TabHistorico from './ServiceOrderDetail/TabHistorico';
import TabInformacoesAdicionais from './ServiceOrderDetail/TabInformacoesAdicionais';

const ServiceOrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [activeTab, setActiveTab] = useState('principal');

    useEffect(() => {
        const orderData = serviceOrderDetailsData[id];
        if (orderData) {
            setOrder(orderData);
        }
    }, [id]);

    const handleStatusChange = (newStatus) => {
        setOrder(prevOrder => ({...prevOrder, status: newStatus}));
    };

    const handleInfoChange = (e) => {
        const { name, value } = e.target;
        setOrder(prevOrder => ({...prevOrder, [name]: value}));
    };

    const handleDeletePart = (partId) => {
        if (window.confirm("Tem certeza que deseja excluir este item?")) {
            setOrder(prevOrder => ({
                ...prevOrder,
                parts: prevOrder.parts.filter(part => part.id !== partId)
            }));
        }
    };

    const handleUpdatePart = (updatedPart) => {
        setOrder(prevOrder => ({
            ...prevOrder,
            parts: prevOrder.parts.map(part => part.id === updatedPart.id ? updatedPart : part)
        }));
    };
    
    const handleAddNewPart = (newPart) => {
        const finalNewPart = {
            ...newPart,
            quantity: Number(newPart.quantity),
            unitValue: Number(newPart.unitValue)
        };
        setOrder(prevOrder => ({
            ...prevOrder,
            parts: [...prevOrder.parts, finalNewPart]
        }));
    };

    if (!order) {
        return <div className="container">Carregando... ou Ordem de Serviço não encontrada.</div>;
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case 'principal':
                return <TabPrincipal 
                    order={order} 
                    onStatusChange={handleStatusChange} 
                    onAddNewPart={handleAddNewPart}
                    onDeletePart={handleDeletePart}
                    onUpdatePart={handleUpdatePart}
                />;
            case 'historico':
                return <TabHistorico history={order.statusHistory} />;
            case 'informacoes':
                 return <TabInformacoesAdicionais order={order} onInfoChange={handleInfoChange} />;
            case 'observacoes':
                 return <div className="tab-pane"><p>Observações em desenvolvimento...</p></div>;
            case 'imagem':
                return <div className="tab-pane"><p>Imagens em desenvolvimento...</p></div>;
            default:
                return null;
        }
    };

    return (
        <div className="container">
            <div className="page-header">
                <div className="page-header-left">
                    <Link to="/ordens-de-servico" className="btn btn-secondary btn-back">&larr; Voltar</Link>
                    <h1>Ordem de Serviço - Orçamento</h1>
                </div>
                <div className="page-header-right">
                    <button className="btn btn-secondary">+ Novo</button>
                    <button className="btn btn-secondary">Editar</button>
                    <button className="btn btn-primary">Salvar</button>
                    <button className="btn btn-danger">Excluir</button>
                </div>
            </div>

            <div className="tabs">
                <button onClick={() => setActiveTab('principal')} className={activeTab === 'principal' ? 'active' : ''}>Principal</button>
                <button onClick={() => setActiveTab('informacoes')} className={activeTab === 'informacoes' ? 'active' : ''}>Informações Adicionais</button>
                <button onClick={() => setActiveTab('observacoes')} className={activeTab === 'observacoes' ? 'active' : ''}>Observações</button>
                <button onClick={() => setActiveTab('historico')} className={activeTab === 'historico' ? 'active' : ''}>Histórico de Status</button>
                <button onClick={() => setActiveTab('imagem')} className={activeTab === 'imagem' ? 'active' : ''}>Imagem</button>
            </div>

            <div className="tab-content">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default ServiceOrderDetail;
