'use client';
import React, { useEffect, useState } from 'react';

type Car = {
  id?: number;
  modelo?: string;
  marca?: string;
  ano?: string;
  preco?: string | number;
  quilometragem?: string;
  cor?: string;
  disponibilidade?: boolean;
};

export default function DashboardPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
            console.error('Resposta não-JSON em /car:', text);
          }
        } else {
          const text = await res.text();
          console.error('Falha ao buscar carros:', res.status, text);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const parsePrice = (p?: string | number | null): number => {
    if (p == null || p === '') return 0;
    if (typeof p === 'number') return p;
    const str = String(p);
    const cleaned = str.replace(/[^0-9,.,-]/g, '').replace(',', '.');
    if (!cleaned) return 0;
    const v = parseFloat(cleaned);
    return isNaN(v) ? 0 : v;
  };

  const totalCars = cars.length;
  const totalValue = cars.reduce((s, c) => s + parsePrice(c.preco), 0);
  const available = cars.filter((c) => c.disponibilidade).length;
  const avgValue = totalCars ? totalValue / totalCars : 0;

  const suggestions = [
    'Distribuição de quilometragem (faixas)',
    'Top 5 modelos por quantidade',
    'Valor por marca (soma/ média)',
    'Veículos por ano (faixa etária)',
    'Percentual de disponibilidade vs vendidos',
    'Estimativa de depreciação por ano (se dados disponíveis)',
    'Relatório de estoque por faixa de preço',
    'Gráficos (histograma de preços, pizza por marca) para visualização',
  ];

  // small helper to build sparkline points from prices
  const sparkData = cars.map((c) => parsePrice(c.preco)).slice(-12);

  const formatCurrency = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const cardStyle: React.CSSProperties = {
    padding: 16,
    borderRadius: 12,
    background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
    boxShadow: '0 6px 18px rgba(0,0,0,0.4)',
  };

  const smallCardStyle: React.CSSProperties = {
    padding: 12,
    borderRadius: 10,
    background: 'rgba(255,255,255,0.02)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  return (
    <div>
      <h1 style={{ margin: 0 }}>Dashboard</h1>
      <p style={{ color: 'var(--muted)', marginTop: 6 }}>Visão geral rápida e visual do estoque</p>

      <div style={{ marginTop: 18, display: 'grid', gap: 16 }}>
        <div className='dashboard-top'>
          <div>
            <div style={{ color: 'var(--muted)', fontSize: 13 }}>Valor total do estoque</div>
            <div style={{ fontSize: 28, fontWeight: 800, marginTop: 6 }}>{formatCurrency(totalValue)}</div>
            <div style={{ color: 'var(--muted)', marginTop: 8 }}>
              {totalCars} veículos • Média: {formatCurrency(avgValue)} • Disponíveis: {available}
            </div>
          </div>

          <div className='dashboard-spark'>
            <svg width='100%' height='100%' viewBox='0 0 220 80' preserveAspectRatio='none'>
              <polyline
                fill='none'
                stroke='#7C5CFF'
                strokeWidth={2}
                points={
                  sparkData.length
                    ? sparkData
                        .map((v, i) => {
                          const x = (i / Math.max(1, sparkData.length - 1)) * 220;
                          const max = Math.max(...sparkData, 1);
                          const min = Math.min(...sparkData, 0);
                          const y = 80 - ((v - min) / Math.max(1, max - min)) * 70 - 5;
                          return `${x},${y}`;
                        })
                        .join(' ')
                    : '0,40 220,40'
                }
              />
            </svg>
          </div>
        </div>

        <div className='dashboard-cards'>
          <div className='dashboard-small-card'>
            <div>
              <div style={{ color: 'var(--muted)', fontSize: 12 }}>Total de carros</div>
              <div style={{ fontSize: 22, fontWeight: 700 }}>{totalCars}</div>
            </div>
            <div style={{ fontSize: 20 }}>🚗</div>
          </div>

          <div className='dashboard-small-card'>
            <div>
              <div style={{ color: 'var(--muted)', fontSize: 12 }}>Disponíveis</div>
              <div style={{ fontSize: 22, fontWeight: 700 }}>{available}</div>
              <div className='progress-bar' style={{ marginTop: 6 }}>
                <div className='progress-fill' style={{ width: `${totalCars ? (available / totalCars) * 100 : 0}%` }} />
              </div>
            </div>
            <div style={{ fontSize: 20 }}>✅</div>
          </div>

          <div className='dashboard-small-card'>
            <div>
              <div style={{ color: 'var(--muted)', fontSize: 12 }}>Valor médio</div>
              <div style={{ fontSize: 22, fontWeight: 700 }}>{formatCurrency(avgValue)}</div>
            </div>
            <div style={{ fontSize: 20 }}>💰</div>
          </div>

          <div className='dashboard-small-card'>
            <div>
              <div style={{ color: 'var(--muted)', fontSize: 12 }}>Marcas distintas</div>
              <div style={{ fontSize: 22, fontWeight: 700 }}>
                {
                  Object.keys(
                    cars.reduce((acc: Record<string, number>, c) => {
                      const m = (c.marca || 'Desconhecida').trim();
                      acc[m] = (acc[m] || 0) + 1;
                      return acc;
                    }, {}),
                  ).length
                }
              </div>
            </div>
            <div style={{ fontSize: 20 }}>🏷️</div>
          </div>
        </div>

        <div className='card'>
          <strong>Sugestões rápidas para relatórios visuais</strong>
          <div className='suggestions-chips'>
            {suggestions.map((s) => (
              <div key={s} className='suggestion-chip'>
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
