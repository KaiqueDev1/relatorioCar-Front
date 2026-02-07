'use client';
import React, { useEffect, useState } from 'react';
import CarForm from '../components/CarForm';
import CarTable from '../components/CarTable';

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

export default function Page() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);

  const handleDelete = async (carId: number) => {
    if (!confirm('Tem certeza que deseja deletar este carro?')) return;
    try {
      const API = process.env.NEXT_PUBLIC_API_URL ?? '';
      const res = await fetch(`${API}/car/${carId}`, { method: 'DELETE' });
      if (!res.ok) {
        throw new Error(`Erro ao deletar: ${res.status}`);
      }
      load();
      alert('Carro deletado com sucesso!');
    } catch (err) {
      console.error(err);
      alert('Erro ao deletar o carro');
    }
  };

  const handleEdit = (car: Car) => {
    setEditingCar(car);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearEdit = () => {
    setEditingCar(null);
  };

  const load = async () => {
    setLoading(true);
    try {
      const API = process.env.NEXT_PUBLIC_API_URL ?? '';
      const res = await fetch(`${API}/car`);
      if (res.ok) {
        const ct = res.headers.get('content-type') || '';
        if (ct.includes('application/json')) {
          const data = await res.json();
          setCars(data || []);
        } else {
          const text = await res.text();
          console.error('Resposta inesperada (não-JSON):', text);
          alert('Resposta inesperada do servidor. Verifique NEXT_PUBLIC_API_URL.');
        }
      } else {
        const text = await res.text();
        console.error('Falha ao buscar:', res.status, text);
        alert('Falha ao buscar carros. Verifique o servidor.');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDownload = async () => {
    try {
      const API = process.env.NEXT_PUBLIC_API_URL ?? '';
      const res = await fetch(`${API}/relatorio/carros/txt`);
      if (!res.ok) {
        const text = await res.text();
        console.error('Falha ao baixar relatório:', res.status, text);
        alert('Erro ao baixar relatório. Verifique o servidor.');
        return;
      }
      const ct = res.headers.get('content-type') || '';
      let blob: Blob;
      let filename = 'relatorio';

      if (ct.includes('text') || ct.includes('application/json')) {
        const text = await res.text();
        const mime = ct || 'text/plain';
        blob = new Blob([text], { type: mime });
        filename += '.txt';
      } else {
        // assume binary (pdf or octet-stream)
        blob = await res.blob();
        // prefer .pdf for PDFs, otherwise keep .bin
        if (ct.includes('application/pdf')) filename += '.pdf';
        else filename += '.bin';
      }

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert('Erro ao baixar relatório');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 18 }}>
        <h1 style={{ margin: 0 }}>Gerenciador de Carros</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className='btn btn-ghost' onClick={load}>
            {loading ? 'Carregando...' : 'Atualizar'}
          </button>
          <button className='btn btn-accent' onClick={handleDownload}>
            Baixar relatório
          </button>
        </div>
      </div>

      <div className='two-col'>
        <div>
          <CarForm onSuccess={() => { load(); clearEdit(); }} editingCar={editingCar} onCancelEdit={clearEdit} />
        </div>
        <div>
          <h2 style={{ margin: '0 0 12px 0' }}>Carros Cadastrados</h2>
          <CarTable cars={cars} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}
