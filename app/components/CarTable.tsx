'use client';
import React from 'react';

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

interface CarTableProps {
  cars: Car[];
  onEdit?: (car: Car) => void;
  onDelete?: (carId: number) => void;
}

export default function CarTable({ cars, onEdit, onDelete }: CarTableProps) {
  if (!cars || cars.length === 0) return <div style={{ marginTop: 20 }}>Nenhum carro cadastrado.</div>;

  return (
    <div className='car-blocks'>
      {cars.map((c, idx) => (
        <div key={c.id ?? idx} className='car-block'>
          <div className='car-block-header'>
            <div>
              <strong style={{ fontSize: 16 }}>{c.modelo ?? '-'}</strong>
              <div style={{ color: 'var(--muted)', fontSize: 13 }}>Marca: {c.marca ?? '-'}</div>
            </div>
            <div
              style={{ background: c.disponibilidade ? 'rgba(124,92,255,0.2)' : 'rgba(255,100,100,0.2)', padding: '4px 8px', borderRadius: 4, fontSize: 12 }}>
              {c.disponibilidade ? '✓ Disponível' : '✗ Vendido'}
            </div>
          </div>

          <div className='car-block-details'>
            <div>
              <span style={{ color: 'var(--muted)' }}>Ano:</span> {c.ano ?? '-'}
            </div>
            <div>
              <span style={{ color: 'var(--muted)' }}>Cor:</span> {c.cor ?? '-'}
            </div>
            <div>
              <span style={{ color: 'var(--muted)' }}>KM:</span> {c.quilometragem ?? '-'}
            </div>
            <div>
              <span style={{ color: 'var(--muted)' }}>Preço:</span> R$ {c.preco ?? '-'}
            </div>
          </div>

          <div className='car-block-actions'>
            <button className='btn btn-sm btn-ghost' onClick={() => onEdit?.(c)}>
              ✏️ Editar
            </button>
            <button className='btn btn-sm btn-danger' onClick={() => c.id && onDelete?.(c.id)}>
              🗑️ Deletar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
