import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { serviceOrderDetailsData } from '../data/serviceOrderDetails';
import './ServiceOrderDetail/ServiceOrderDetail.css';
import TabPrincipal from './ServiceOrderDetail/TabPrincipal';
import TabHistorico from './ServiceOrderDetail/TabHistorico';

const ServiceOrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [activeTab, setActiveTab] = useState('principal');

    useEffect(() => {
        const orderData = serviceOrderDetailsData[id];
        setOrder(orderData);
    }, [id]);

    if (!order) {
        return <div className="container">Carregando... ou Ordem de Serviço não encontrada.</div>;
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case 'principal':
                return <TabPrincipal order={order} />;
            case 'historico':
                return <TabHistorico history={order.statusHistory} />;
            case 'informacoes':
                 return <div className="tab-pane"><p>Informações Adicionais em desenvolvimento...</p></div>
            case 'observacoes':
                 return <div className="tab-pane"><p>Observações em desenvolvimento...</p></div>
            case 'imagem':
                return <div className="tab-pane"><p>Imagens em desenvolvimento...</p></div>
            default:
                return null;
        }
    };

    return (
        <div className="container">
            <Link to="/ordens-de-servico" className="btn btn-secondary btn-back">&larr; Voltar</Link>
            <div className="detail-header">
                <h1>Ordem de Serviço - Orçamento</h1>
                <div>
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
