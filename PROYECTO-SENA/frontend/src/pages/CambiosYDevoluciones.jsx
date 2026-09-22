import React from 'react';

const CambiosYDevoluciones = () => {
  const pasosProceso = [
    {
      id: 1,
      titulo: '1. Radica tu solicitud',
      descripcion: 'Comunícate con nuestras líneas de atención o escríbenos a nuestro correo de soporte indicando tu número de factura, el motivo del cambio o devolución y fotografías del producto si presenta algún defecto.',
      icono: 'bi bi-file-earmark-text-fill',
      badge: 'Paso 1'
    },
    {
      id: 2,
      titulo: '2. Validación y Aprobación',
      descripcion: 'Nuestro equipo de calidad revisará la solicitud y los requisitos legales (Ley 1480 de 2011) en un plazo máximo de 48 horas hábiles para darte una respuesta y coordinar la recogida.',
      icono: 'bi bi-check2-circle',
      badge: 'Paso 2'
    },
    {
      id: 3,
      titulo: '3. Envío o Entrega en Tienda',
      descripcion: 'Puedes acercarte directamente a nuestro punto físico principal o programaremos la recogida del artículo en la dirección acordada, asegurándote de entregarlo con empaques y accesorios.',
      icono: 'bi bi-box-seam-fill',
      badge: 'Paso 3'
    },
    {
      id: 4,
      titulo: '4. Solución o Reembolso',
      descripcion: 'Una vez recibido e inspeccionado el producto en nuestras bodegas, procederemos a realizar el cambio por una nueva referencia, la aplicación de garantía o el reembolso de dinero según corresponda.',
      icono: 'bi bi-cash-stack',
      badge: 'Paso 4'
    }
  ];

  return (
    <div className="container-fluid p-0">
      
      {/* Encabezado Principal */}
      <div className="bg-light py-5 border-bottom mb-5">
        <div className="container text-center">
          <h1 className="fw-bold mb-3">Cambios y Devoluciones</h1>
          <p className="text-secondary lead mx-auto" style={{ maxWidth: '700px' }}>
            En <span className="fw-semibold text-dark">Ferroeléctricos PYP</span> queremos que estés totalmente satisfecho con tu compra. Conoce el proceso paso a paso para realizar cambios o devoluciones con total garantía.
          </p>
        </div>
      </div>

      {/* Contenedor Principal */}
      <div className="container mb-5">
        
        {/* Alerta Destacada */}
        <div className="alert alert-warning d-flex align-items-center mb-5 shadow-sm border-0" role="alert">
          <i className="bi bi-info-circle-fill fs-3 me-3"></i>
          <div>
            <h5 className="alert-heading fw-bold mb-1">¡Plazo de retracto y solicitudes!</h5>
            <p className="mb-0 small text-muted">
              Tienes hasta 5 días hábiles después de haber recibido tu pedido para ejercer tu derecho de retracto en compras virtuales, siempre y cuando el producto se encuentre en perfectas condiciones y sin usar.
            </p>
          </div>
        </div>

        {/* Tarjetas de Pasos del Proceso */}
        <div className="row g-4 mb-5">
          {pasosProceso.map((paso) => (
            <div key={paso.id} className="col-12 col-md-6">
              <div className="card h-100 shadow-sm border-0 rounded p-3 bg-white position-relative">
                <div className="card-body d-flex flex-column">
                  
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="bg-dark text-white rounded p-2 d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                      <i className={`${paso.icono} fs-5`}></i>
                    </div>
                    <span className="badge bg-light text-dark border fw-semibold px-2 py-1">
                      {paso.badge}
                    </span>
                  </div>

                  <h4 className="fw-bold text-dark mb-2 fs-5">{paso.titulo}</h4>
                  <p className="text-secondary small mb-4" style={{ textAlign: 'justify' }}>
                    {paso.descripcion}
                  </p>

                  <div className="mt-auto pt-2 border-top text-muted small d-flex align-items-center gap-1">
                    <i className="bi bi-shield-check text-success"></i>
                    <span>Amparado bajo la normatividad colombiana</span>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sección de Condiciones en Rectángulos Organizados */}
        <div className="p-4 bg-white rounded shadow-sm border">
          <h4 className="fw-bold mb-4 text-center">Condiciones esenciales para cambios</h4>
          <div className="row g-3">
            
            <div className="col-md-4">
              <div className="p-3 bg-light border rounded h-100 shadow-sm">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <i className="bi bi-box2 text-primary fs-5"></i>
                  <h6 className="fw-bold mb-0 text-dark">Empaque Original</h6>
                </div>
                <p className="text-muted small mb-0">El producto debe devolverse en su caja o empaque original, incluyendo manuales, etiquetas y accesorios completos.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-3 bg-light border rounded h-100 shadow-sm">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <i className="bi bi-receipt-cutoff text-success fs-5"></i>
                  <h6 className="fw-bold mb-0 text-dark">Factura de Compra</h6>
                </div>
                <p className="text-muted small mb-0">Es indispensable adjuntar la factura física o el comprobante digital de la transacción emitida por la tienda.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-3 bg-light border rounded h-100 shadow-sm">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <i className="bi bi-tools text-warning fs-5"></i>
                  <h6 className="fw-bold mb-0 text-dark">Sin Alteraciones</h6>
                </div>
                <p className="text-muted small mb-0">No se aceptarán cambios de artículos que muestren daños por mala instalación, golpes o alteraciones eléctricas.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default CambiosYDevoluciones;