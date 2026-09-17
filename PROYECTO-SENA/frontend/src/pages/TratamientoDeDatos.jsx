import React from 'react';

const TratamientoDeDatos = () => {
  return (
    <div className="container-fluid p-0">
      
      {/* Encabezado Principal */}
      <div className="bg-light py-5 border-bottom mb-5">
        <div className="container text-center">
          <h1 className="fw-bold mb-3">Tratamiento de Datos Personales</h1>
          <p className="text-secondary lead mx-auto" style={{ maxWidth: '700px' }}>
            Conoce los lineamientos, autorizaciones y finalidades bajo las cuales <span className="fw-semibold text-dark">Ferroeléctricos PYP</span> recolecta, almacena y administra la información de nuestros usuarios y clientes.
          </p>
        </div>
      </div>

      {/* Contenedor Principal */}
      <div className="container mb-5">
        
        {/* Alerta Informativa */}
        <div className="alert alert-dark d-flex align-items-center mb-5 shadow-sm border-0" role="alert">
          <i className="bi bi-shield-lock-fill fs-3 me-3"></i>
          <div>
            <h5 className="alert-heading fw-bold mb-1">Política de Habeas Data</h5>
            <p className="mb-0 small text-muted">
              En cumplimiento de la Constitución Política de Colombia y la Ley Estatutaria 1581 de 2012, garantizamos a todos los titulares de datos el derecho constitucional a conocer, actualizar y rectificar su información.
            </p>
          </div>
        </div>

        {/* Secciones de Tratamiento de Datos */}
        <div className="row g-4 mb-5">
          
          <div className="col-12 col-md-6">
            <div className="p-4 bg-white rounded shadow-sm border h-100">
              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-file-earmark-check-fill text-primary fs-4"></i>
                <h4 className="fw-bold mb-0 text-dark fs-5">1. Autorización del Titular</h4>
              </div>
              <p className="text-secondary small mb-0" style={{ textAlign: 'justify' }}>
                La recolección, almacenamiento y uso de datos personales por parte de Ferroeléctricos PYP requiere del consentimiento libre, previo, expreso e informado del titular, el cual se otorga al registrarse, aceptar nuestros términos o realizar una compra en la plataforma.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="p-4 bg-white rounded shadow-sm border h-100">
              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-bullseye text-primary fs-4"></i>
                <h4 className="fw-bold mb-0 text-dark fs-5">2. Finalidad del Tratamiento</h4>
              </div>
              <p className="text-secondary small mb-0" style={{ textAlign: 'justify' }}>
                Los datos recolectados son tratados para fines comerciales, de despacho de pedidos, soporte técnico, emisión de facturación electrónica, validación de transacciones de pago y atención de solicitudes de cambios o garantías.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="p-4 bg-white rounded shadow-sm border h-100">
              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-person-fill-gear text-primary fs-4"></i>
                <h4 className="fw-bold mb-0 text-dark fs-5">3. Derechos de los Ciudadanos</h4>
              </div>
              <p className="text-secondary small mb-0" style={{ textAlign: 'justify' }}>
                Como titular de la información tienes derecho a acceder de forma gratuita a tus datos proporcionados, solicitar la rectificación en caso de datos inexactos, revocar la autorización de uso o solicitar la supresión de la base de datos bajo los parámetros legales.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="p-4 bg-white rounded shadow-sm border h-100">
              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-building-lock text-primary fs-4"></i>
                <h4 className="fw-bold mb-0 text-dark fs-5">4. Deberes del Responsable</h4>
              </div>
              <p className="text-secondary small mb-0" style={{ textAlign: 'justify' }}>
                Ferroeléctricos PYP asume el compromiso de conservar los registros bajo condiciones de seguridad idóneas para impedir su adulteración, pérdida, consulta, uso o acceso no autorizado, velando por el uso correcto de la información personal.
              </p>
            </div>
          </div>

        </div>

        {/* Sección de Procedimiento en Rectángulo Bonito */}
        <div className="p-4 bg-white rounded shadow-sm border">
          <div className="d-flex align-items-center gap-2 mb-2">
            <i className="bi bi-chat-left-text-fill text-dark fs-5"></i>
            <h5 className="fw-bold mb-0 text-dark">5. Procedimiento para Consultas y Reclamos</h5>
          </div>
          <p className="text-secondary small mb-0" style={{ textAlign: 'justify' }}>
            Para realizar consultas, reclamos o peticiones relacionadas con el tratamiento de tus datos personales, puedes radicar tu solicitud a través de nuestros canales de atención al cliente y líneas de soporte oficiales de la tienda.
          </p>
        </div>

      </div>
    </div>
  );
};

export default TratamientoDeDatos;