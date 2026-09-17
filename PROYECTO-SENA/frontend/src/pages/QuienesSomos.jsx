import React from 'react';

const QuienesSomos = () => {
  return (
    <div className="container-fluid p-0">
      
      {/* Encabezado Principal */}
      <div className="bg-light py-5 border-bottom mb-5">
        <div className="container text-center">
          <h1 className="fw-bold mb-3">Quiénes Somos</h1>
          <p className="text-secondary lead mx-auto" style={{ maxWidth: '700px' }}>
            En <span className="fw-semibold text-dark">Ferroeléctricos PYP</span> nos especializamos en brindar las mejores soluciones en iluminación, material eléctrico y ferretería para hogares, comercios e industrias.
          </p>
        </div>
      </div>

      <div className="container mb-5">
        
        {/* Sección Historia / Quiénes Somos Principal */}
        <div className="row align-items-center g-5 mb-5">
          <div className="col-md-6">
            <h3 className="fw-bold mb-3">Nuestra Trayectoria</h3>
            <p className="text-secondary" style={{ textAlign: 'justify' }}>
              Fundada con el firme propósito de suplir las necesidades del sector ferretero e iluminación, Ferroeléctricos PYP ha evolucionado para convertirse en un aliado estratégico para nuestros clientes. Combinamos un catálogo diverso de productos de alta calidad con una asesoría técnica cercana y confiable.
            </p>
            <p className="text-secondary" style={{ textAlign: 'justify' }}>
              Creemos firmemente en la innovación y en la mejora continua de nuestros procesos, adaptándonos a las nuevas tecnologías y canales digitales para estar siempre más cerca de ti.
            </p>
          </div>
          <div className="col-md-6 text-center">
            <div className="p-4 bg-light rounded shadow-sm border">
              <h4 className="fw-bold text-primary mb-2">+10 Años</h4>
              <p className="text-muted mb-0">Iluminando y construyendo los proyectos de nuestros clientes con compromiso y excelencia.</p>
            </div>
          </div>
        </div>

        {/* Sección Misión y Visión */}
        <div className="row g-4 mb-5">
          <div className="col-md-6">
            <div className="p-4 border rounded shadow-sm h-100 bg-white">
              <h4 className="fw-bold mb-3 text-dark">
                <i className="bi bi-bullseye text-primary me-2"></i> Misión
              </h4>
              <p className="text-secondary mb-0" style={{ textAlign: 'justify' }}>
                Comercializar y distribuir productos de ferretería e iluminación de óptima calidad, ofreciendo un servicio ágil, seguro y transparente a través de nuestra plataforma virtual y puntos físicos, garantizando siempre la satisfacción total de nuestros consumidores y cumpliendo con la normatividad legal vigente.
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-4 border rounded shadow-sm h-100 bg-white">
              <h4 className="fw-bold mb-3 text-dark">
                <i className="bi bi-eye text-primary me-2"></i> Visión
              </h4>
              <p className="text-secondary mb-0" style={{ textAlign: 'justify' }}>
                Consolidarnos para los próximos años como la empresa líder en comercio electrónico del sector ferroeléctrico e iluminación a nivel nacional, reconocidos por nuestra confiabilidad, variedad de productos, innovación tecnológica y excelente atención al cliente.
              </p>
            </div>
          </div>
        </div>

        {/* Sección Valores Corporativos */}
        <div className="row pt-4 border-top">
          <div className="col-12 text-center mb-4">
            <h3 className="fw-bold">Nuestros Valores</h3>
          </div>
          
          <div className="col-md-4 mb-3">
            <div className="p-4 text-center border rounded shadow-sm h-100 bg-white">
              <div className="fs-1 text-primary mb-3">
                <i className="bi bi-shield-check"></i>
              </div>
              <h5 className="fw-bold mb-2">Confianza y Transparencia</h5>
              <p className="text-muted small mb-0">Actuamos con honestidad y claridad en cada proceso de compra, garantía y servicio ofrecido.</p>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="p-4 text-center border rounded shadow-sm h-100 bg-white">
              <div className="fs-1 text-primary mb-3">
                <i className="bi bi-star"></i>
              </div>
              <h5 className="fw-bold mb-2">Calidad Garantizada</h5>
              <p className="text-muted small mb-0">Seleccionamos rigurosamente cada producto de nuestro catálogo para asegurar su durabilidad y desempeño.</p>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="p-4 text-center border rounded shadow-sm h-100 bg-white">
              <div className="fs-1 text-primary mb-3">
                <i className="bi bi-people"></i>
              </div>
              <h5 className="fw-bold mb-2">Compromiso con el Cliente</h5>
              <p className="text-muted small mb-0">Tu satisfacción y el respaldo técnico que necesitas son la prioridad en cada una de nuestras operaciones.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default QuienesSomos;