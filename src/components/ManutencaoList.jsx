import React from "react";

export default function ManutencaoList({ data, equipamentos, onRemove }) {
  const getEquipamentoNome = (id) => {
    const eq = equipamentos.find((e) => e.id === id);
    return eq ? eq.nome : "Desconhecido";
  };

  return (
    <table border="1" cellPadding="5" style={{ width: "100%", marginTop: "10px" }}>
      <thead>
        <tr>
          <th>Equipamento</th>
          <th>Tipo</th>
          <th>Descrição</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.map((m) => (
          <tr key={m.id}>
            <td>{getEquipamentoNome(m.equipamento_id)}</td>
            <td>{m.tipo}</td>
            <td>{m.descricao}</td>
            <td>{m.status}</td>
            <td><button onClick={() => onRemove(m.id)}>Excluir</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
