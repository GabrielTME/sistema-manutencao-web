import React, { useState } from "react";

export default function ManutencaoForm({ equipamentos, onAdd }) {
  const [form, setForm] = useState({ equipamento_id: "", tipo: "", descricao: "", status: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.equipamento_id || !form.tipo) return;
    onAdd(form);
    setForm({ equipamento_id: "", tipo: "", descricao: "", status: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <select name="equipamento_id" value={form.equipamento_id} onChange={handleChange}>
        <option value="">Selecione o Equipamento</option>
        {equipamentos.map((e) => (
          <option key={e.id} value={e.id}>{e.nome}</option>
        ))}
      </select>
      <select name="tipo" value={form.tipo} onChange={handleChange}>
        <option value="">Tipo</option>
        <option value="Preventiva">Preventiva</option>
        <option value="Corretiva">Corretiva</option>
      </select>
      <input name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="">Status</option>
        <option value="Pendente">Pendente</option>
        <option value="Em andamento">Em andamento</option>
        <option value="Concluída">Concluída</option>
      </select>
      <button type="submit">Adicionar</button>
    </form>
  );
}
