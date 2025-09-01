import React, { useState } from "react";

export default function EquipamentoForm({ onAdd }) {
  const [form, setForm] = useState({ nome: "", modelo: "", fabricante: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nome || !form.modelo || !form.fabricante) return;
    onAdd(form);
    setForm({ nome: "", modelo: "", fabricante: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} />
      <input name="modelo" placeholder="Modelo" value={form.modelo} onChange={handleChange} />
      <input name="fabricante" placeholder="Fabricante" value={form.fabricante} onChange={handleChange} />
      <button type="submit">Adicionar</button>
    </form>
  );
}
