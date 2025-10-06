import React from 'react';

const TabInformacoesAdicionais = ({ order, onInfoChange }) => {
  return (
    <div className="tab-pane">
      <div className="form-group">
        <label htmlFor="defectFound">Defeito Constatado</label>
        <textarea
          id="defectFound"
          name="defectFound"
          className="form-control"
          value={order.defectFound}
          onChange={onInfoChange}
          rows="5"
        ></textarea>
      </div>
      <div className="form-group" style={{ marginTop: '2rem' }}>
        <label htmlFor="actionsToTake">Ações a Realizar</label>
        <textarea
          id="actionsToTake"
          name="actionsToTake"
          className="form-control"
          value={order.actionsToTake}
          onChange={onInfoChange}
          rows="5"
        ></textarea>
      </div>
    </div>
  );
};

export default TabInformacoesAdicionais;
