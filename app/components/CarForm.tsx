'use client';
import React, { useState, useEffect } from 'react';

type Car = {
  id?: number;
  modelo?: string;
  marca?: string;
  ano?: string;
  preco?: string;
  quilometragem?: string;
  cor?: string;
  disponibilidade?: boolean;
};

interface CarFormProps {
  onSuccess?: () => void;
  editingCar?: Car | null;
  onCancelEdit?: () => void;
}

export default function CarForm({ onSuccess, editingCar, onCancelEdit }: CarFormProps) {
  const [car, setCar] = useState<Car>({ disponibilidade: true });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editingCar) {
      setCar(editingCar);
    } else {
      setCar({ disponibilidade: true });
    }
  }, [editingCar]);

  const update = (k: string, v: unknown) => setCar((prev) => ({ ...prev, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const API = process.env.NEXT_PUBLIC_API_URL ?? '';
      const method = editingCar?.id ? 'PUT' : 'POST';
      const url = editingCar?.id ? `${API}/car/${editingCar.id}` : `${API}/car`;
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(car) });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`API error: ${res.status} ${text}`);
      }
      setCar({ disponibilidade: true });
      alert(editingCar?.id ? 'Carro atualizado com sucesso!' : 'Carro adicionado com sucesso!');
      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className='card car-form' onSubmit={submit}>
      <h2 style={{ margin: '0 0 16px 0', fontSize: 18 }}>{editingCar?.id ? `Editar: ${editingCar.modelo}` : 'Adicionar Novo Carro'}</h2>
      <div className='row' style={{ marginBottom: 16 }}>
        <div className='col'>
          <label style={{ fontWeight: 600, marginBottom: 6, display: 'block' }}>Modelo:</label>
          <input className='input' placeholder='Ex: Civic' value={car.modelo || ''} onChange={(e) => update('modelo', e.target.value)} />
        </div>
        <div className='col'>
          <label style={{ fontWeight: 600, marginBottom: 6, display: 'block' }}>Marca:</label>
          <input className='input' placeholder='Ex: Honda' value={car.marca || ''} onChange={(e) => update('marca', e.target.value)} />
        </div>
      </div>

      <div className='row' style={{ marginBottom: 16 }}>
        <div className='col'>
          <label style={{ fontWeight: 600, marginBottom: 6, display: 'block' }}>Ano:</label>
          <input className='input' placeholder='Ex: 2023' value={car.ano || ''} onChange={(e) => update('ano', e.target.value)} />
        </div>
        <div className='col'>
          <label style={{ fontWeight: 600, marginBottom: 6, display: 'block' }}>Preço (R$):</label>
          <input className='input' placeholder='Ex: 50000.00' value={car.preco || ''} onChange={(e) => update('preco', e.target.value)} />
        </div>
      </div>

      <div className='row' style={{ marginBottom: 16 }}>
        <div className='col'>
          <label style={{ fontWeight: 600, marginBottom: 6, display: 'block' }}>Quilometragem (km):</label>
          <input className='input' placeholder='Ex: 5000' value={car.quilometragem || ''} onChange={(e) => update('quilometragem', e.target.value)} />
        </div>
        <div className='col'>
          <label style={{ fontWeight: 600, marginBottom: 6, display: 'block' }}>Cor:</label>
          <input className='input' placeholder='Ex: Preto' value={car.cor || ''} onChange={(e) => update('cor', e.target.value)} />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14 }}>
          <input type='checkbox' checked={!!car.disponibilidade} onChange={(e) => update('disponibilidade', e.target.checked)} /> Disponível
        </label>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        {editingCar?.id && (
          <button className='btn btn-ghost' type='button' onClick={onCancelEdit} style={{ padding: '12px 24px', fontSize: 14 }}>
            Cancelar
          </button>
        )}
        <button className='btn btn-accent' type='submit' disabled={saving} style={{ padding: '12px 24px', fontSize: 14 }}>
          {saving ? 'Salvando...' : editingCar?.id ? 'Atualizar Carro' : 'Adicionar Carro'}
        </button>
      </div>
    </form>
  );
}
