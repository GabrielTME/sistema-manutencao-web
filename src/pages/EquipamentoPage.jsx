import React, { useState } from "react";
import EquipamentoForm from "../components/EquipamentoForm";
import EquipamentoList from "../components/EquipamentoList";

export default function EquipamentoPage() {
  const [equipamentos, setEquipamentos] = useState([
    { id: "11111111-1111-1111-1111-111111111111", nome: "Compressor", modelo: "X1000", fabricante: "ABC Ltda" },
    { id: "11111111-1111-1111-1111-111111111112", nome: "Torno CNC", modelo: "TC-500", fabricante: "Máquinas Brasil" },
    { id: "11111111-1111-1111-1111-111111111113", nome: "Esteira", modelo: "E-200", fabricante: "Transportes S.A." }
  ]);

  const addEquipamento = (novo) => {
    setEquipamentos([...equipamentos, { ...novo, id: Date.now().toString() }]);
  };

  const removeEquipamento = (id) => {
    setEquipamentos(equipamentos.filter((e) => e.id !== id));
  };

  return (
    <div>
      <h2>Cadastro de Equipamentos</h2>
      <EquipamentoForm onAdd={addEquipamento} />
      <EquipamentoList data={equipamentos} onRemove={removeEquipamento} />
    </div>
  );
}
