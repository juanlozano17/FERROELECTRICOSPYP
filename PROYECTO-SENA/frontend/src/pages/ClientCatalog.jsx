import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; 

const ClientCatalog = () => {
  // Añadimos una propiedad 'path' o 'slug' a cada categoría para la ruta
  const categorias = [
    { nombre: 'Cintas LED', slug: '7', cant: '10', img: '/cintasled.png' },
    { nombre: 'Bombillos', slug: '4', cant: '9', img: '/bombillo.png' },
    { nombre: 'Ferreteria', slug: '8', cant: '11', img: '/taladro.png' },
    { nombre: 'Lámparas', slug: '1', cant: '12', img: '/lamparacategoria.png' },
    { nombre: 'Paneles LED', slug: '5', cant: '7', img: '/paneles.png' }
  ];

  return (
    <div className="container-fluid p-0">
      
      {/* 1. Banner de Ferretería Local / Tradición de Barrio */}
      <div className="bg-dark text-white py-2 px-4 text-center small fw-semibold">
        <i className="bi bi-geo-alt-fill text-warning me-2"></i> Tu ferretería y tienda de iluminación de confianza en el barrio • <i className="bi bi-whatsapp text-success mx-2"></i> Pedidos rápidos al WhatsApp
      </div>

      {/* 2. Banner Principal Centrado y Moderno */}
      <section className="container-fluid px-4 px-lg-5 py-5 bg-white">   
        <div className="row align-items-center justify-content-center g-5">
          <div className="col-lg-6 text-lg-start text-center">
            <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold mb-3 shadow-sm">
              <i className="bi bi-shop me-1"></i> Tradición y Calidad Local
            </span>
            <h1 className="display-4 fw-bold text-dark mb-3">Todo en iluminación y ferretería para tu hogar</h1>
            <p className="lead text-muted mb-4" style={{ lineHeight: '1.6' }}>
              Encuentra desde elegantes lámparas colgantes decorativas hasta tomacorrientes, cintas LED y los materiales que necesitas para tus arreglos del día a día con la mejor atención cercana.
            </p>
            
            <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center justify-content-lg-start gap-3">
              <Link 
                to="/producto/68" 
                className="btn btn-dark btn-lg px-4 py-3 rounded-pill fw-bold shadow-sm"
              >
                Ver Lámpara Destacada
              </Link>
              <a 
                href="https://wa.me/" 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-outline-success btn-lg px-4 py-3 rounded-pill fw-bold d-inline-flex align-items-center gap-2"
              >
                <i className="bi bi-whatsapp fs-5"></i> Preguntar por WhatsApp
              </a>
            </div>
          </div>

          <div className="col-lg-5 text-center pt-3">
            <div className="position-relative">
              <div className="position-absolute start-50 translate-middle-x" style={{ top: '-25px', zIndex: 20 }}>
                <span className="badge rounded-pill bg-danger px-4 py-2 shadow-lg fw-bold text-uppercase" style={{ fontSize: '0.9rem' }}>
                  ¡Más Vendido del Mes!
                </span>
              </div>
              
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                <img 
                  src="/albarracin.png" 
                  className="img-fluid rounded-3 mt-2" 
                  style={{ maxHeight: '350px', objectFit: 'contain' }} 
                  alt="Albarracín" 
                />
              </div>
            </div>
          </div>  
        </div>
      </section>

      {/* 3. Categorías interactivas que llevan a su vista respectiva */}
      <section className="bg-light py-5 px-3 text-center">
        <div className="container">
          <span className="text-muted text-uppercase small fw-bold tracking-wider">Explora por departamento</span>
          <h2 className="mb-5 fw-bold text-dark">Categorías importantes</h2>
          <div className="row justify-content-center g-4">
            {categorias.map((cat, index) => (
              <div key={index} className="col-lg-2 col-md-4 col-sm-6">
                {/* Convertimos la tarjeta en un Link funcional */}
                <Link 
                  to={`/catalogo/${cat.slug}`} 
                  className="text-decoration-none h-100 d-block"
                >
                  <div className="card p-3 border-0 shadow-sm h-100 align-items-center rounded-4 bg-white transition-transform hover-card">
                    <img src={cat.img} alt={cat.nombre} className="img-fluid mb-2" style={{ height: '80px', objectFit: 'contain' }} />
                    <p className="fw-bold mb-0 text-dark" style={{ fontSize: '0.9rem' }}>{cat.nombre}</p>
                    <small className="text-muted">{cat.cant} productos</small>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SECCIÓN: Servicios de la Ferretería de Barrio con Botón de Contacto */}
      <section className="container my-5 py-4">
        <div className="p-5 bg-white border rounded-4 shadow-sm">
          <div className="row align-items-center g-4">
            <div className="col-lg-5">
              <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-pill fw-bold mb-2">Servicios al Paso</span>
              <h3 className="fw-bold text-dark mb-3">¿Necesitas ayuda con tus instalaciones o reparaciones?</h3>
              <p className="text-muted mb-4">
                No solo vendemos los materiales. En nuestra ferretería te asesoramos con la medida exacta de cable, tipo de bombillo que requiere tu espacio y recomendaciones de electricistas de confianza del sector.
              </p>
              <ul className="list-unstyled text-muted small mb-4 d-flex flex-column gap-2">
                <li><i className="bi bi-check-circle-fill text-success me-2"></i> Asesoría técnica personalizada en mostrador</li>
                <li><i className="bi bi-check-circle-fill text-success me-2"></i> Descuentos especiales para maestros de obra y contratistas</li>
                <li><i className="bi bi-check-circle-fill text-success me-2"></i> Servicio express de entrega a domicilio en la zona</li>
              </ul>
              
              <Link 
                to="/contacto" 
                className="btn btn-dark px-4 py-3 rounded-pill fw-bold shadow-sm d-inline-flex align-items-center gap-2"
              >
                <i className="bi bi-envelope-fill"></i> Contáctanos ahora
              </Link>
            </div>

            <div className="col-lg-7">
              <div className="row g-3">
                <div className="col-6">
                  <div className="p-4 bg-light rounded-4 text-center h-100 border">
                    <i className="bi bi-tools fs-1 text-dark mb-2 d-block"></i>
                    <h5 className="fw-bold text-dark fs-6">Ferretería General</h5>
                    <p className="text-muted small mb-0">Tornillería, soportes, cables y herramientas manuales.</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-4 bg-light rounded-4 text-center h-100 border">
                    <i className="bi bi-lightbulb fs-1 text-warning mb-2 d-block"></i>
                    <h5 className="fw-bold text-dark fs-6">Iluminación Pro</h5>
                    <p className="text-muted small mb-0">Diseño arquitectónico y soluciones LED comerciales.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Sección de Beneficios / Servicios Generales */}
      <section className="container my-5 py-4 border-top border-bottom">
        <div className="row text-center g-4">
          <div className="col-md-3"><i className="bi bi-truck fs-2 text-dark"></i><p className="fw-bold mb-0 mt-2">Envíos locales y nacionales</p></div>
          <div className="col-md-3"><i className="bi bi-shield-check fs-2 text-dark"></i><p className="fw-bold mb-0 mt-2">Garantía directa de tienda</p></div>
          <div className="col-md-3"><i className="bi bi-credit-card fs-2 text-dark"></i><p className="fw-bold mb-0 mt-2">Efectivo, Nequi y Tarjetas</p></div>
          <div className="col-md-3"><i className="bi bi-headset fs-2 text-dark"></i><p className="fw-bold mb-0 mt-2">Atención inmediata</p></div>
        </div>
      </section>      
      
      {/* 6. Sección Productos Destacados */}
      <section className="container my-5">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <span className="text-muted small fw-bold text-uppercase">Lo más pedido por los vecinos</span>
            <h2 className="fw-bold text-dark mb-0">Productos destacados</h2>
          </div>
        </div>

        <div className="row g-4">
          {[
            { id: '23', nombre: 'Cinta Led 12V 48W 120 Leds/m de 5 Metros x 5mm', precio: '$ 33.500', img: '/cintaled5m.png' },
            { id: '69', nombre: 'Spot Led PAR38 Negro para Riel (Sin Bombillo)', precio: '$ 55.300', img: '/spotled.png' },
            { id: 'lampara-lineal-17w', nombre: 'Lámpara Lineal LED 17W de Sobreponer Blanca', precio: '$ 255.400', img: '/ledlienal.png' },
            { id: '70', nombre: 'Toma Corriente Doble de Incrustar', precio: '$ 7.500', img: '/tomacorriente.png' }
          ].map((prod, index) => (
            <div key={index} className="col-md-3">
              <div className="card h-100 border-0 shadow-sm p-3 text-center rounded-4 bg-white">
                <img src={prod.img} className="card-img-top img-fluid mb-3" style={{ height: '160px', objectFit: 'contain' }} alt={prod.nombre} />
                <div className="card-body p-0 d-flex flex-column justify-content-between">
                  <div>
                    <p className="fw-bold mb-1 text-dark" style={{ fontSize: '0.9rem' }}>{prod.nombre}</p>
                    <p className="text-primary fw-bold mb-3 fs-5">{prod.precio}</p>
                  </div>
                  <Link to={`/producto/${prod.id}`} className="btn btn-dark btn-sm text-white w-100 py-2 rounded-pill fw-semibold">
                    <i className="bi bi-cart-fill me-2"></i>Ver detalles
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* 7. Sectores que Atendemos con estilo galería moderna */}
      <section className="container my-5 py-4">
        <h2 className="text-center mb-2 fw-bold text-dark">Sectores que atendemos</h2>
        <p className="text-center text-muted mb-5">Soluciones diseñadas tanto para el hogar como para negocios locales y bodegas.</p>
        <div className="row g-4">
          {[
            { title: 'Bodegas y Galpones', img: 'bodega1.png' },
            { title: 'Oficinas Comerciales', img: 'oficinailuminada.png' },
            { title: 'Locales de Barrio y Tiendas', img: 'tiendailuminada.png' },
            { title: 'Hogares y Habitaciones', img: 'hogariluminado.png' }
          ].map((sector, index) => (
            <div key={index} className="col-md-3">
              <div className="position-relative overflow-hidden rounded-4 shadow-sm text-white" style={{ height: '300px' }}>
                <img src={sector.img} className="w-100 h-100" style={{ objectFit: 'cover', filter: 'brightness(0.7)' }} alt={sector.title} />
                <div className="position-absolute bottom-0 start-0 p-4 w-100 bg-gradient-dark">
                  <h5 className="fw-bold mb-0">{sector.title}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default ClientCatalog;