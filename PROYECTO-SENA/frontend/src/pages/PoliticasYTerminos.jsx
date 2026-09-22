import React from 'react';

const PoliticasYTerminos = () => {
  return (
    <div className="container-fluid p-0">
      
      {/* Encabezado Principal */}
      <div className="bg-light py-5 border-bottom mb-5">
        <div className="container text-center">
          <h1 className="fw-bold mb-3">Políticas y Términos de Uso</h1>
          <p className="text-secondary lead mx-auto" style={{ maxWidth: '700px' }}>
            Bienvenido al portal web de <span className="fw-semibold text-dark">Ferroeléctricos PYP</span>. Al navegar y realizar compras en nuestra tienda virtual, aceptas los siguientes términos, condiciones y normativas legales.
          </p>
        </div>
      </div>

      {/* Contenedor Principal */}
      <div className="container mb-5">
        
        {/* Alerta Informativa */}
        <div className="alert alert-dark d-flex align-items-center mb-5 shadow-sm border-0" role="alert">
          <i className="bi bi-file-earmark-lock-fill fs-3 me-3"></i>
          <div>
            <h5 className="alert-heading fw-bold mb-1">Marco Legal Colombiano</h5>
            <p className="mb-0 small text-muted">
              Nuestras políticas comerciales y de uso se rigen bajo las leyes de la República de Colombia, especialmente la Ley 1480 de 2011 (Estatuto del Consumidor) y la Ley 527 de 1999 sobre comercio electrónico.
            </p>
          </div>
        </div>

        {/* Secciones de Términos */}
        <div className="row g-4 mb-5">
          
          <div className="col-12 col-md-6">
            <div className="p-4 bg-white rounded shadow-sm border h-100">
              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-person-check-fill text-primary fs-4"></i>
                <h4 className="fw-bold mb-0 text-dark fs-5">1. Capacidad de Uso y Registro</h4>
              </div>
              <p className="text-secondary small mb-0" style={{ textAlign: 'justify' }}>
                Para realizar compras en Ferroeléctricos PYP, el usuario debe ser mayor de edad y registrarse proporcionando datos verídicos, exactos y actualizados. El usuario es responsable de la confidencialidad de su cuenta y contraseña, así como de restringir el acceso a su equipo para evitar usos no autorizados.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="p-4 bg-white rounded shadow-sm border h-100">
              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-tags-fill text-primary fs-4"></i>
                <h4 className="fw-bold mb-0 text-dark fs-5">2. Precios, Disponibilidad e Impuestos</h4>
              </div>
              <p className="text-secondary small mb-0" style={{ textAlign: 'justify' }}>
                Todos los precios de los productos publicados en nuestro catálogo incluyen el IVA correspondiente según la legislación colombiana. Nos reservamos el derecho de modificar precios, ofertas y disponibilidad de inventario sin previo aviso, garantizando las condiciones de compra una vez confirmada la orden.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="p-4 bg-white rounded shadow-sm border h-100">
              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-truck text-primary fs-4"></i>
                <h4 className="fw-bold mb-0 text-dark fs-5">3. Envíos y Tiempos de Entrega</h4>
              </div>
              <p className="text-secondary small mb-0" style={{ textAlign: 'justify' }}>
                Los tiempos de entrega varían según la ciudad de destino y la cobertura de nuestros operadores logísticos aliadas. Ferroeléctricos PYP no se hace responsable por retrasos ocasionados por fuerza mayor, eventos climáticos o problemáticas de orden público en las vías nacionales.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="p-4 bg-white rounded shadow-sm border h-100">
              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-shield-exclamation text-primary fs-4"></i>
                <h4 className="fw-bold mb-0 text-dark fs-5">4. Limitación de Responsabilidad</h4>
              </div>
              <p className="text-secondary small mb-0" style={{ textAlign: 'justify' }}>
                La empresa no asume responsabilidad por daños directos o indirectos derivados del uso incorrecto, manipulación indebida o mala instalación de los productos eléctricos y de ferretería adquiridos, los cuales deben ser instalados por personal calificado.
              </p>
            </div>
          </div>

        </div>

        {/* Sección de Propiedad Intelectual en Rectángulo Bonito */}
        <div className="p-4 bg-white rounded shadow-sm border">
          <div className="d-flex align-items-center gap-2 mb-2">
            <i className="bi bi-c-circle-fill text-dark fs-5"></i>
            <h5 className="fw-bold mb-0 text-dark">5. Propiedad Intelectual</h5>
          </div>
          <p className="text-secondary small mb-0" style={{ textAlign: 'justify' }}>
            Todo el contenido visual, textos, logotipos, iconos, nombres comerciales, diseños de interfaz y software integrados en este sitio web son propiedad exclusiva de Ferroeléctricos PYP o cuentan con las respectivas licencias de uso. Queda estrictamente prohibida la reproducción, modificación o distribución total o parcial de los mismos sin una autorización previa y por escrito.
          </p>
        </div>

      </div>
    </div>
  );
};

export default PoliticasYTerminos;