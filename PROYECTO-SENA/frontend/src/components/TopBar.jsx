import React from 'react';

const TopBar = () => {
  return (
    <div className="py-2 px-3 text-white shadow-sm" style={{ background: 'linear-gradient(90deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center text-center gap-2" style={{ fontSize: '0.85rem' }}>
        
        {/* Mensaje de Urgencia con Estilo */}
        <div className="d-flex align-items-center justify-content-center gap-2">
          <span className="badge bg-gradient text-dark px-2 py-1 shadow-sm fw-bold rounded-pill" style={{ background: '#f59e0b', fontSize: '0.7rem', letterSpacing: '0.5px' }}>
            <i className="bi bi-lightning-charge-fill me-1"></i> EXCLUSIVO
          </span>
          <span className="text-light fw-normal">
            Precios especiales al por mayor para constructoras y proyectos en <strong className="text-white fw-semibold">Bogotá</strong>.
          </span>
        </div>

        {/* Beneficios clave con iconos estilizados */}
        <div className="d-none d-lg-flex align-items-center gap-4 text-light opacity-85">
          <div className="d-flex align-items-center gap-1 hover-text-warning transition-all">
            <span className="p-1 rounded bg-white bg-opacity-10 text-warning"><i className="bi bi-truck"></i></span>
            <span>Envíos seguros</span>
          </div>
          <div className="d-flex align-items-center gap-1">
            <span className="p-1 rounded bg-white bg-opacity-10 text-success"><i className="bi bi-shield-check"></i></span>
            <span>Garantía de fábrica</span>
          </div>
          <div className="d-flex align-items-center gap-1">
            <span className="p-1 rounded bg-white bg-opacity-10 text-info"><i className="bi bi-headset"></i></span>
            <span className="fw-semibold">(601) 407 3033</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TopBar;  