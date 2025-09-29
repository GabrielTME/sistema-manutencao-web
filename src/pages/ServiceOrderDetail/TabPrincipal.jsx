import React from 'react';

const TabPrincipal = ({ order }) => {
    const totalGeral = order.parts.reduce((acc, part) => acc + (part.quantity * part.unitValue), 0);

    return (
        <div className="tab-pane-grid">
            <div className="main-content">
                {}
                <div className="form-group-row">
                    <div className="form-group">
                        <label>Técnicos</label>
                        <div className="tag-container">
                            {order.technicians.map(tech => <span key={tech} className="tag">{tech} &times;</span>)}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Status</label>
                        <p>{order.status}</p>
                    </div>
                </div>
                {}
                <div className="form-group"><label>Equipamento</label><p>{order.equipment}</p></div>
                <div className="form-group"><label>Ocorrência</label><p>{order.occurrence}</p></div>
                <div className="form-group"><label>Problema</label><p>{order.problem}</p></div>

                {}
                <div className="table-wrapper" style={{marginTop: '2rem'}}>
                     <table>
                        <thead>
                            <tr>
                                <th>Código Produto</th>
                                <th>Descrição</th>
                                <th>Quantidade</th>
                                <th>Valor Unitário</th>
                                <th>Valor Total</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.parts.map(part => (
                                <tr key={part.id}>
                                    <td>{part.id}</td>
                                    <td>{part.description}</td>
                                    <td>{part.quantity}</td>
                                    <td>R$ {part.unitValue.toFixed(2)}</td>
                                    <td>R$ {(part.quantity * part.unitValue).toFixed(2)}</td>
                                    <td>...</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p style={{textAlign: 'right', fontWeight: 'bold', marginTop: '1rem'}}>Total Geral: R$ {totalGeral.toFixed(2)}</p>
                </div>
            </div>
            <aside className="sidebar">
                <div className="info-card">
                    <h4>Informações de Controle</h4>
                    <div className="form-group"><label>Nº O.S.</label><p>{order.id}</p></div>
                    <div className="form-group"><label>Data Emissão</label><p>{order.emissionDate}</p></div>
                    <div className="form-group"><label>Data O.S. (Início)</label><p>{order.startDate}</p></div>
                    <div className="form-group"><label>Setor / Localização da máquina</label><p>{order.location}</p></div>
                </div>
            </aside>
        </div>
    );
};

export default TabPrincipal;
