import React, { useState } from "react";
import ManutencaoForm from "../components/ManutencaoForm";
import ManutencaoList from "../components/ManutencaoList";

export default function ManutencaoPage() {
  const [equipamentos] = useState([
    { id: "11111111-1111-1111-1111-111111111111", nome: "Compressor" },
    { id: "11111111-1111-1111-1111-111111111112", nome: "Torno CNC" },
    { id: "11111111-1111-1111-1111-111111111113", nome: "Esteira" }
  ]);

  const [manutencoes, setManutencoes] = useState([
    { id: "33333333-3333-3333-3333-333333333331", equipamento_id: "11111111-1111-1111-1111-111111111111", tipo: "Corretiva", descricao: "Troca de válvula", status: "Concluída" },
    { id: "33333333-3333-3333-3333-333333333332", equipamento_id: "11111111-1111-1111-1111-111111111112", tipo: "Preventiva", descricao: "Lubrificação geral", status: "Em andamento" }
  ]);

  const addManutencao = (nova) => {
    setManutencoes([...manutencoes, { ...nova, id: Date.now().toString() }]);
  };

  const removeManutencao = (id) => {
    setManutencoes(manutencoes.filter((m) => m.id !== id));
  };

  return (
    <div>
      <h2>Registro de Manutenções</h2>
      <ManutencaoForm equipamentos={equipamentos} onAdd={addManutencao} />
      <ManutencaoList data={manutencoes} equipamentos={equipamentos} onRemove={removeManutencao} />
    </div>
  );
}
