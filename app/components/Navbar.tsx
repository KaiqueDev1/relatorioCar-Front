'use client';
import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  return (
    <header style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
      <div className='container row' style={{ justifyContent: 'space-between', padding: '14px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              background: 'linear-gradient(90deg,var(--accent-start),var(--accent-end))',
              boxShadow: '0 6px 18px rgba(91,107,255,0.12)',
            }}>
            🚗
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 20 }}>Gerenciador de Carros</div>
            <div style={{ color: 'var(--muted)', fontSize: 12 }}>Sistema de gestão para concessionária</div>
          </div>
        </div>
        <nav className='nav' style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link href='/' className='btn btn-ghost'>
            Início
          </Link>
          <Link href='/car' className='btn btn-ghost'>
            Carros
          </Link>
          <Link href='/dashboard' className='btn btn-ghost'>
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
