import React from "react";

export default function EquipamentoList({ data, onRemove }) {
  return (
    <table border="1" cellPadding="5" style={{ width: "100%", marginTop: "10px" }}>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Modelo</th>
          <th>Fabricante</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.map((e) => (
          <tr key={e.id}>
            <td>{e.nome}</td>
            <td>{e.modelo}</td>
            <td>{e.fabricante}</td>
            <td><button onClick={() => onRemove(e.id)}>Excluir</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
