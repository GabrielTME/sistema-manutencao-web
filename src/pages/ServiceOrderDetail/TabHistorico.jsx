import React from 'react';

const TabHistorico = ({ history }) => {
    return (
        <div className="tab-pane">
            <h3>Histórico de Status da Ordem de Serviço</h3>
            <div className="table-wrapper" style={{marginTop: '1rem'}}>
                <table>
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Hora</th>
                            <th>Status</th>
                            <th>Responsável</th>
                            <th>Observação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((entry, index) => (
                            <tr key={index}>
                                <td>{entry.date}</td>
                                <td>{entry.time}</td>
                                <td><span className="status-badge">{entry.status}</span></td>
                                <td>{entry.responsible}</td>
                                <td>{entry.observation}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TabHistorico;
