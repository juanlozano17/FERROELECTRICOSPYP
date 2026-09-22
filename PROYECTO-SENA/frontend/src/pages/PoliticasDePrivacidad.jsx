import React from 'react';

const PoliticasDePrivacidad = () => {
  return (
    <div className="container-fluid p-0">
      
      {/* Encabezado Principal */}
      <div className="bg-light py-5 border-bottom mb-5">
        <div className="container text-center">
          <h1 className="fw-bold mb-3">Política de Privacidad</h1>
          <p className="text-secondary lead mx-auto" style={{ maxWidth: '700px' }}>
            En <span className="fw-semibold text-dark">Ferroeléctricos PYP</span> valoramos y protegemos tu privacidad. Conoce cómo recopilamos, usamos y resguardamos tus datos personales bajo la ley colombiana.
          </p>
        </div>
      </div>

      {/* Contenedor Principal */}
      <div className="container mb-5">
        
        {/* Alerta Informativa */}
        <div className="alert alert-success d-flex align-items-center mb-5 shadow-sm border-0" role="alert">
          <i className="bi bi-shield-check-fill fs-3 me-3"></i>
          <div>
            <h5 className="alert-heading fw-bold mb-1">Compromiso con la Ley 1581 de 2012</h5>
            <p className="mb-0 small text-muted">
              Damos estricto cumplimiento al régimen general de protección de datos personales en Colombia, garantizando que tu información cuenta con los más altos estándares de confidencialidad.
            </p>
          </div>
        </div>

        {/* Secciones de Privacidad */}
        <div className="row g-4 mb-5">
          
          <div className="col-12 col-md-6">
            <div className="p-4 bg-white rounded shadow-sm border h-100">
              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-journal-text text-primary fs-4"></i>
                <h4 className="fw-bold mb-0 text-dark fs-5">1. Información que Recopilamos</h4>
              </div>
              <p className="text-secondary small mb-0" style={{ textAlign: 'justify' }}>
                Recopilamos datos básicos suministrados voluntariamente al registrarte o comprar: nombres, apellidos, número de cédula, correo electrónico, teléfonos de contacto y direcciones de envío en nuestras zonas de cobertura.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="p-4 bg-white rounded shadow-sm border h-100">
              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-gear-fill text-primary fs-4"></i>
                <h4 className="fw-bold mb-0 text-dark fs-5">2. Finalidad del Tratamiento de Datos</h4>
              </div>
              <p className="text-secondary small mb-0" style={{ textAlign: 'justify' }}>
                Tus datos son utilizados exclusivamente para procesar y despachar pedidos, gestionar solicitudes de garantía, emitir facturación legal, y enviarte notificaciones importantes sobre el estado de tus compras o novedades de la tienda.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="p-4 bg-white rounded shadow-sm border h-100">
              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-lock-fill text-primary fs-4"></i>
                <h4 className="fw-bold mb-0 text-dark fs-5">3. Seguridad y Confidencialidad</h4>
              </div>
              <p className="text-secondary small mb-0" style={{ textAlign: 'justify' }}>
                Implementamos medidas de seguridad técnicas, humanas y administrativas necesarias para evitar la adulteración, pérdida, consulta, uso o acceso no autorizado de tu información personal almacenada en nuestras bases de datos.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="p-4 bg-white rounded shadow-sm border h-100">
              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-person-badge-fill text-primary fs-4"></i>
                <h4 className="fw-bold mb-0 text-dark fs-5">4. Derechos de los Titulares</h4>
              </div>
              <p className="text-secondary small mb-0" style={{ textAlign: 'justify' }}>
                Como usuario tienes derecho a conocer, actualizar, rectificar tus datos personales o solicitar la supresión de los mismos de nuestros registros en cualquier momento a través de nuestras líneas de atención y canales de soporte oficial.
              </p>
            </div>
          </div>

        </div>

        {/* Sección de Contacto de Privacidad en Rectángulo Bonito */}
        <div className="p-4 bg-white rounded shadow-sm border">
          <div className="d-flex align-items-center gap-2 mb-2">
            <i className="bi bi-envelope-at-fill text-dark fs-5"></i>
            <h5 className="fw-bold mb-0 text-dark">5. Atención de Peticiones y Consultas</h5>
          </div>
          <p className="text-secondary small mb-0" style={{ textAlign: 'justify' }}>
            Para ejercer tus derechos de hábeas data o realizar cualquier consulta relacionada con el manejo de tu información personal, puedes comunicarte con nuestro área encargada escribiendo al correo electrónico de soporte de Ferroeléctricos PYP.
          </p>
        </div>

      </div>
    </div>
  );
};

export default PoliticasDePrivacidad;