import React from 'react';

const Envios = () => {
  const caracteristicasEnvio = [
    {
      id: 1,
      titulo: 'Cobertura Nacional',
      descripcion: 'Llegamos a gran parte de los municipios y ciudades principales de Colombia gracias a nuestras alianzas estratégicas con operadores logísticos certificados.',
      icono: 'bi bi-map-fill',
      badge: 'Nivel País'
    },
    {
      id: 2,
      titulo: 'Tiempos de Entrega Ágiles',
      descripcion: 'Para ciudades principales, los tiempos estimados de entrega varían entre 2 a 5 días hábiles. En zonas rurales o de difícil acceso, el plazo puede extenderse según la transportadora.',
      icono: 'bi bi-stopwatch-fill',
      badge: '2 a 5 Días'
    },
    {
      id: 3,
      titulo: 'Rastreo en Tiempo Real',
      descripcion: 'Una vez despachemos tu pedido desde nuestras bodegas, te enviaremos un código de guía para que puedas hacer seguimiento detallado del estado de tu paquete.',
      icono: 'bi bi-geo-alt-fill',
      badge: 'Seguimiento'
    },
    {
      id: 4,
      titulo: 'Empaque Seguro y Especializado',
      descripcion: 'Garantizamos que todos nuestros productos de ferretería e iluminación viajen debidamente protegidos para evitar daños, golpes o averías durante el trayecto.',
      icono: 'bi bi-box-seam',
      badge: 'Protección Total'
    },
    {
      id: 5,
      titulo: 'Tarifas Calculadas al Pagar',
      descripcion: 'El costo del envío se calcula de forma automática al momento de finalizar tu compra, tomando en cuenta el peso, volumen del producto y la dirección de destino.',
      icono: 'bi bi-calculator-fill',
      badge: 'Transparente'
    },
    {
      id: 6,
      titulo: 'Recogida en Tienda Gratis',
      descripcion: 'Si prefieres no pagar costos de transporte, puedes seleccionar la opción de recogida presencial en cualquiera de nuestras sedes físicas habilitadas sin ningún costo adicional.',
      icono: 'bi bi-shop',
      badge: 'Sin costo'
    }
  ];

  return (
    <div className="container-fluid p-0">
      
      {/* Encabezado Principal */}
      <div className="bg-light py-5 border-bottom mb-5">
        <div className="container text-center">
          <h1 className="fw-bold mb-3">Envíos y Cobertura</h1>
          <p className="text-secondary lead mx-auto" style={{ maxWidth: '700px' }}>
            En <span className="fw-semibold text-dark">Ferroeléctricos PYP</span> despachamos tus pedidos de manera segura y eficiente para que tus materiales lleguen a tiempo a la puerta de tu casa o proyecto.
          </p>
        </div>
      </div>

      {/* Contenedor Principal */}
      <div className="container mb-5">
        
        {/* Alerta Destacada */}
        <div className="alert alert-primary d-flex align-items-center mb-5 shadow-sm border-0" role="alert">
          <i className="bi bi-truck fs-3 me-3"></i>
          <div>
            <h5 className="alert-heading fw-bold mb-1">¡Despachos garantizados!</h5>
            <p className="mb-0 small text-muted">
              Procesamos y despachamos todas las órdenes confirmadas de lunes a viernes en horario hábil. Los pedidos realizados en fines de semana o festivos comenzarán su gestión el siguiente día hábil.
            </p>
          </div>
        </div>

        {/* Tarjetas de Envíos y Cobertura */}
        <div className="row g-4 mb-5">
          {caracteristicasEnvio.map((item) => (
            <div key={item.id} className="col-12 col-md-4">
              <div className="card h-100 shadow-sm border-0 rounded p-3 bg-white position-relative">
                <div className="card-body d-flex flex-column">
                  
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="bg-primary bg-opacity-10 text-primary border rounded p-2 d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                      <i className={`${item.icono} fs-5`}></i>
                    </div>
                    <span className="badge bg-light text-dark border fw-semibold px-2 py-1">
                      {item.badge}
                    </span>
                  </div>

                  <h4 className="fw-bold text-dark mb-2 fs-5">{item.titulo}</h4>
                  <p className="text-secondary small mb-4" style={{ textAlign: 'justify' }}>
                    {item.descripcion}
                  </p>

                  <div className="mt-auto pt-2 border-top text-muted small d-flex align-items-center gap-1">
                    <i className="bi bi-check-circle-fill text-success"></i>
                    <span>Logística garantizada a nivel nacional</span>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sección de Recomendaciones de Recepción en Rectángulos Organizados */}
        <div className="p-4 bg-white rounded shadow-sm border">
          <h4 className="fw-bold mb-4 text-center">Recomendaciones al recibir tu pedido</h4>
          <div className="row g-3">
            
            <div className="col-md-4">
              <div className="p-3 bg-light border rounded h-100 shadow-sm">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <i className="bi bi-box-arrow-in-down text-primary fs-5"></i>
                  <h6 className="fw-bold mb-0 text-dark">1. Inspección Física</h6>
                </div>
                <p className="text-muted small mb-0">Revisa que el empaque y los sellos de seguridad se encuentren en perfecto estado al momento de la entrega por parte del transportador.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-3 bg-light border rounded h-100 shadow-sm">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <i className="bi bi-person-check text-success fs-5"></i>
                  <h6 className="fw-bold mb-0 text-dark">2. Documento de Identidad</h6>
                </div>
                <p className="text-muted small mb-0">Ten a la mano tu cédula para firmar el recibido de la guía, ya que la entrega se realiza únicamente al titular o persona autorizada.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-3 bg-light border rounded h-100 shadow-sm">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <i className="bi bi-exclamation-octagon text-warning fs-5"></i>
                  <h6 className="fw-bold mb-0 text-dark">3. Reporte de Anomalías</h6>
                </div>
                <p className="text-muted small mb-0">Si notas algún golpe grave en la caja o faltantes, repórtalo inmediatamente con nosotros en un plazo no mayor a 24 horas.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Envios;