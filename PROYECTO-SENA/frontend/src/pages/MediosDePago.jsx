import React from 'react';

const MediosDePago = () => {
  const metodos = [
    {
      id: 1,
      titulo: 'PSE (Pagos Seguros en Línea)',
      descripcion: 'Paga de forma directa y segura desde tu cuenta de ahorros o corriente de cualquier banco en Colombia (Bancolombia, Davivienda, Banco de Bogotá, BBVA, etc.).',
      logo: 'https://www.cootransmede.com/wp-content/uploads/2022/02/logo-pse-300x300-1.png',
      badge: 'Más popular'
    },
    {
      id: 2,
      titulo: 'Nequi',
      descripcion: 'Realiza tu pago de forma rápida y sin complicaciones transfiriendo directamente desde la aplicación de Nequi escaneando nuestro código QR o al número autorizado.',
      logo: 'https://www.dadetalles.com/wp-content/uploads/2022/12/Icono_Nequi_300x300.png',
      badge: 'Instantáneo'
    },
    {
      id: 3,
      titulo: 'DaviPlata',
      descripcion: 'Usa tu celular para pagar de manera ágil y segura con DaviPlata. Transfiere sin costo adicional desde tu billetera digital hacia nuestra cuenta comercial.',
      logo: 'https://conectesunegocio.daviplata.com/sites/default/files/styles/original/public/2025-10/Logo_Api_Market-2025.png?itok=cIsEUb2z',
      badge: 'Sin costo extra'
    },
    {
      id: 4,
      titulo: 'Tarjetas de Crédito y Débito',
      descripcion: 'Aceptamos todas las tarjetas nacionales e internacionales: Visa, MasterCard, American Express y Diners Club. Puedes diferir tus compras según aplique.',
      logo: 'https://cdn-icons-png.flaticon.com/512/5163/5163845.png',
      badge: 'Cuotas disponibles'
    },
    {
      id: 5,
      titulo: 'Transferencias Bancarias',
      descripcion: 'Puedes realizar una transferencia electrónica directa a nuestras cuentas corrientes o de ahorros habilitadas de Bancolombia y Davivienda.',
      logo: 'https://cdn-icons-png.flaticon.com/512/5950/5950200.png',
      badge: 'Directo'
    },
    {
      id: 6,
      titulo: 'Pago Contra Entrega / Puntos Físicos',
      descripcion: 'Acércate a cualquiera de nuestras sedes físicas a realizar tu pago o valida si aplique la modalidad de pago contra entrega en tu zona de cobertura.',
      logo: 'https://cdn-icons-png.flaticon.com/512/1554/1554401.png',
      badge: 'Presencial'
    }
  ];

  return (
    <div className="container-fluid p-0">
      
      {/* Encabezado Principal */}
      <div className="bg-light py-5 border-bottom mb-5">
        <div className="container text-center">
          <h1 className="fw-bold mb-3">Medios de Pago</h1>
          <p className="text-secondary lead mx-auto" style={{ maxWidth: '700px' }}>
            En <span className="fw-semibold text-dark">Ferroeléctricos PYP</span> te ofrecemos pasarelas y métodos de pago 100% seguros y adaptados a Colombia para que realices tus compras con total tranquilidad.
          </p>
        </div>
      </div>

      {/* Contenedor Principal */}
      <div className="container mb-5">
        
        {/* Alerta de Seguridad */}
        <div className="alert alert-success d-flex align-items-center mb-5 shadow-sm border-0" role="alert">
          <i className="bi bi-shield-check fs-3 me-3"></i>
          <div>
            <h5 className="alert-heading fw-bold mb-1">¡Transacciones 100% Seguras!</h5>
            <p className="mb-0 small text-muted">
              Todas nuestras plataformas de pago cuentan con encriptación de alta seguridad para proteger tus datos financieros y personales en todo momento.
            </p>
          </div>
        </div>

        {/* Tarjetas de Métodos de Pago con Logos al lado del Título */}
        <div className="row g-4 mb-5">
          {metodos.map((metodo) => (
            <div key={metodo.id} className="col-12 col-md-4">
              <div className="card h-100 shadow-sm border-0 rounded p-3 bg-white position-relative">
                <div className="card-body d-flex flex-column">
                  
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <div className="bg-light border rounded p-1 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '35px' }}>
                        <img src={metodo.logo} alt={metodo.titulo} className="w-100 h-100 object-fit-contain" />
                      </div>
                      <span className="badge bg-light text-dark border fw-semibold px-2 py-1">
                        {metodo.badge}
                      </span>
                    </div>
                  </div>

                  <h4 className="fw-bold text-dark mb-2 fs-5">{metodo.titulo}</h4>
                  <p className="text-secondary small mb-4" style={{ textAlign: 'justify' }}>
                    {metodo.descripcion}
                  </p>

                  <div className="mt-auto pt-2 border-top text-muted small d-flex align-items-center gap-1">
                    <i className="bi bi-check-circle-fill text-success"></i>
                    <span>Disponible en tienda virtual y física</span>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sección de Recomendaciones dentro de Rectángulos Organizados y Bonitos */}
        <div className="p-4 bg-white rounded shadow-sm border">
          <h4 className="fw-bold mb-4 text-center">Recomendaciones importantes al pagar</h4>
          <div className="row g-3">
            
            <div className="col-md-4">
              <div className="p-3 bg-light border rounded h-100 shadow-sm">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <i className="bi bi-exclamation-triangle-fill text-warning fs-5"></i>
                  <h6 className="fw-bold mb-0 text-dark">1. Verificación</h6>
                </div>
                <p className="text-muted small mb-0">Nunca compartas tus claves dinámicas ni códigos OTP con terceros. Nosotros nunca los solicitaremos.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-3 bg-light border rounded h-100 shadow-sm">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <i className="bi bi-receipt text-primary fs-5"></i>
                  <h6 className="fw-bold mb-0 text-dark">2. Comprobantes</h6>
                </div>
                <p className="text-muted small mb-0">Si realizas transferencia por Nequi, DaviPlata o banco, guarda tu comprobante para agilizar el despacho.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-3 bg-light border rounded h-100 shadow-sm">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <i className="bi bi-headset text-success fs-5"></i>
                  <h6 className="fw-bold mb-0 text-dark">3. Soporte</h6>
                </div>
                <p className="text-muted small mb-0">Si tienes dudas con una pasarela de pago, contáctanos inmediatamente a través de nuestras líneas de atención.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default MediosDePago;