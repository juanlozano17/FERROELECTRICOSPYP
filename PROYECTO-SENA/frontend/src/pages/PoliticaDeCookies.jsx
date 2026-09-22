import React from 'react';

const PoliticaDeCookies = () => {
  return (
    <div className="container-fluid p-0">
      
      {/* Encabezado Principal */}
      <div className="bg-light py-5 border-bottom mb-5">
        <div className="container text-center">
          <h1 className="fw-bold mb-3">Política de Cookies</h1>
          <p className="text-secondary lead mx-auto" style={{ maxWidth: '700px' }}>
            En <span className="fw-semibold text-dark">Ferroeléctricos PYP</span> utilizamos cookies y tecnologías similares para mejorar tu experiencia de navegación, optimizar el rendimiento de la tienda y recordar tus preferencias.
          </p>
        </div>
      </div>

      {/* Contenedor Principal */}
      <div className="container mb-5">
        
        {/* Alerta Informativa */}
        <div className="alert alert-primary d-flex align-items-center mb-5 shadow-sm border-0" role="alert">
          <i className="bi bi-cookie fs-3 me-3"></i>
          <div>
            <h5 className="alert-heading fw-bold mb-1">¿Qué son las Cookies?</h5>
            <p className="mb-0 small text-muted">
              Son pequeños archivos de texto que los sitios web descargan y almacenan en tu dispositivo (computador, tablet o celular) al momento de navegar, permitiendo reconocer tu navegador en visitas posteriores.
            </p>
          </div>
        </div>

        {/* Secciones de Cookies */}
        <div className="row g-4 mb-5">
          
          <div className="col-12 col-md-6">
            <div className="p-4 bg-white rounded shadow-sm border h-100">
              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-check2-circle text-primary fs-4"></i>
                <h4 className="fw-bold mb-0 text-dark fs-5">1. Cookies Esenciales o Técnicas</h4>
              </div>
              <p className="text-secondary small mb-0" style={{ textAlign: 'justify' }}>
                Son estrictamente necesarias para el funcionamiento del sitio web. Permiten navegar entre páginas, gestionar tu sesión de usuario, mantener el carrito de compras activo y acceder a áreas seguras de la plataforma.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="p-4 bg-white rounded shadow-sm border h-100">
              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-graph-up-arrow text-primary fs-4"></i>
                <h4 className="fw-bold mb-0 text-dark fs-5">2. Cookies de Rendimiento y Análisis</h4>
              </div>
              <p className="text-secondary small mb-0" style={{ textAlign: 'justify' }}>
                Nos ayudan a comprender cómo interactúan los usuarios con nuestra tienda virtual (qué secciones visitan con más frecuencia o si experimentan errores), recopilando información estadística anónima para optimizar el servicio.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="p-4 bg-white rounded shadow-sm border h-100">
              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-sliders text-primary fs-4"></i>
                <h4 className="fw-bold mb-0 text-dark fs-5">3. Cookies de Funcionalidad</h4>
              </div>
              <p className="text-secondary small mb-0" style={{ textAlign: 'justify' }}>
                Permiten que el sitio web recuerde tus elecciones (como el usuario guardado o preferencias de visualización) para ofrecerte una experiencia de navegación más personalizada, fluida y adaptada a tus gustos.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="p-4 bg-white rounded shadow-sm border h-100">
              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-shield-slash-fill text-primary fs-4"></i>
                <h4 className="fw-bold mb-0 text-dark fs-5">4. Control y Desactivación de Cookies</h4>
              </div>
              <p className="text-secondary small mb-0" style={{ textAlign: 'justify' }}>
                Puedes permitir, bloquear o eliminar las cookies instaladas en tu equipo configurando las opciones del navegador web que utilices (Google Chrome, Mozilla Firefox, Safari, Edge, etc.). Ten en cuenta que bloquear cookies esenciales puede afectar el funcionamiento de la tienda.
              </p>
            </div>
          </div>

        </div>

        {/* Sección de Actualizaciones en Rectángulo Bonito */}
        <div className="p-4 bg-white rounded shadow-sm border">
          <div className="d-flex align-items-center gap-2 mb-2">
            <i className="bi bi-arrow-repeat text-dark fs-5"></i>
            <h5 className="fw-bold mb-0 text-dark">5. Actualización de la Política</h5>
          </div>
          <p className="text-secondary small mb-0" style={{ textAlign: 'justify' }}>
            Ferroeléctricos PYP se reserva el derecho de actualizar esta política de cookies en función de nuevos requerimientos legales, técnicos o cambios en la plataforma. Te invitamos a revisarla periódicamente para estar informado sobre su uso.
          </p>
        </div>

      </div>
    </div>
  );
};

export default PoliticaDeCookies;