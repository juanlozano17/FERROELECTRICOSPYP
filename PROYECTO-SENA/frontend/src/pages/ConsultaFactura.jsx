import React, { useState } from 'react';

const ConsultaFactura = () => {
  const [numeroFactura, setNumeroFactura] = useState('');
  const [resultado, setResultado] = useState(null);
  const [buscando, setBuscando] = useState(false);

  // Simulación de búsqueda de factura (puedes conectarlo a tu backend o Supabase cuando lo requieras)
  const handleBuscar = (e) => {
    e.preventDefault();
    if (!numeroFactura.trim()) return;

    setBuscando(true);
    setResultado(null);

    setTimeout(() => {
      // Simulación de respuesta de factura encontrada o no encontrada
      if (numeroFactura.toUpperCase().includes('PYP') || numeroFactura.length >= 4) {
        setResultado({
          encontrada: true,
          numero: numeroFactura.toUpperCase(),
          fecha: '2026-07-18',
          cliente: 'Cliente Registrado',
          total: '$ 185.000 COP',
          estado: 'Pagada / Electrónica DIAN',
          vendedor: 'Ferroeléctricos PYP S.A.S.'
        });
      } else {
        setResultado({ encontrada: false });
      }
      setBuscando(false);
    }, 800);
  };

  return (
    <div className="container-fluid p-0">
      
      {/* Encabezado Principal */}
      <div className="bg-light py-5 border-bottom mb-5">
        <div className="container text-center">
          <h1 className="fw-bold mb-3">Consulta tu Factura</h1>
          <p className="text-secondary lead mx-auto" style={{ maxWidth: '700px' }}>
            Ingresa el número de tu factura o documento equivalente emitido por <span className="fw-semibold text-dark">Ferroeléctricos PYP</span> para verificar su estado y detalles de forma rápida.
          </p>
        </div>
      </div>

      {/* Contenedor Principal */}
      <div className="container mb-5" style={{ maxWidth: '800px' }}>
        
        {/* Formulario de Consulta */}
        <div className="card shadow-sm border-0 rounded p-4 bg-white mb-5">
          <div className="card-body">
            <h4 className="fw-bold text-dark mb-3 text-center">Buscador de Facturas DIAN</h4>
            <p className="text-muted small text-center mb-4">
              Digita el número de factura electrónico (ej. <strong>FE-1024</strong>) para consultar su validez oficial.
            </p>

            <form onSubmit={handleBuscar} className="row g-3 justify-content-center">
              <div className="col-12 col-md-8">
                <div className="input-group">
                  <span className="input-group-text bg-light text-secondary">
                    <i className="bi bi-receipt"></i>
                  </span>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Ej. FE-00123" 
                    value={numeroFactura}
                    onChange={(e) => setNumeroFactura(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="col-12 col-md-4 d-grid">
                <button type="submit" className="btn btn-dark fw-semibold" disabled={buscando}>
                  {buscando ? (
                    <span><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Consultando...</span>
                  ) : (
                    <span><i className="bi bi-search me-2"></i> Consultar</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Resultados de la Búsqueda */}
        {resultado && (
          <div className="card shadow-sm border-0 rounded p-4 bg-white mb-5 animate__animated animate__fadeIn">
            <div className="card-body">
              {resultado.encontrada ? (
                <div>
                  <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                    <div>
                      <h5 className="fw-bold text-success mb-1">
                        <i className="bi bi-check-circle-fill me-2"></i> Factura Encontrada
                      </h5>
                      <span className="text-muted small">Documento validado con éxito</span>
                    </div>
                    <span className="badge bg-success px-3 py-2 fw-semibold">{resultado.estado}</span>
                  </div>

                  <div className="row g-3 text-secondary small mb-4">
                    <div className="col-md-6">
                      <p className="mb-2"><strong>Número de Factura:</strong> {resultado.numero}</p>
                      <p className="mb-2"><strong>Fecha de Emisión:</strong> {resultado.fecha}</p>
                      <p className="mb-2"><strong>Emisor:</strong> {resultado.vendedor}</p>
                    </div>
                    <div className="col-md-6">
                      <p className="mb-2"><strong>Titular:</strong> {resultado.cliente}</p>
                      <p className="mb-2"><strong>Valor Total:</strong> <span className="text-dark fw-bold">{resultado.total}</span></p>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end gap-2 pt-2 border-top">
                    <button onClick={() => alert('Descargando PDF de la factura...')} className="btn btn-outline-dark btn-sm fw-semibold">
                      <i className="bi bi-file-earmark-pdf-fill me-1"></i> Descargar PDF
                    </button>
                    <button onClick={() => alert('Enviando copia al correo registrado...')} className="btn btn-dark btn-sm fw-semibold">
                      <i className="bi bi-envelope-fill me-1"></i> Enviar por Correo
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <i className="bi bi-exclamation-triangle-fill text-warning fs-1 mb-2"></i>
                  <h5 className="fw-bold text-dark">No se encontró la factura</h5>
                  <p className="text-muted small mb-0">
                    Verifica que el número ingresado sea correcto o comunícate con nuestro equipo de soporte si crees que se trata de un error.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Sección Informativa en Rectángulos Organizados */}
        <div className="p-4 bg-white rounded shadow-sm border">
          <h4 className="fw-bold mb-4 text-center">Información sobre tu Facturación</h4>
          <div className="row g-3">
            
            <div className="col-md-4">
              <div className="p-3 bg-light border rounded h-100 shadow-sm">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <i className="bi bi-shield-shaded text-primary fs-5"></i>
                  <h6 className="fw-bold mb-0 text-dark">1. Facturación DIAN</h6>
                </div>
                <p className="text-muted small mb-0">Cada compra realizada en nuestra tienda genera una factura electrónica con validez fiscal directa ante la DIAN.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-3 bg-light border rounded h-100 shadow-sm">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <i className="bi bi-clock-history text-success fs-5"></i>
                  <h6 className="fw-bold mb-0 text-dark">2. Disponibilidad</h6>
                </div>
                <p className="text-muted small mb-0">Tus facturas quedan disponibles en nuestra base de datos digital para que puedas consultarlas en cualquier momento.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-3 bg-light border rounded h-100 shadow-sm">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <i className="bi bi-headset text-warning fs-5"></i>
                  <h6 className="fw-bold mb-0 text-dark">3. Soporte Fiscal</h6>
                </div>
                <p className="text-muted small mb-0">Si requieres corrección de datos en tu factura (NIT o razón social), solicítalo dentro de las primeras 24 horas.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ConsultaFactura;