import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; 

const ClientCatalog = () => {
  // Array con los datos de las categorías
  const categorias = [
    { nombre: 'Cintas LED', cant: '19', img: '/cintasled.png' },
    { nombre: 'Lámparas colgantes', cant: '30', img: '/colgante.png' },
    { nombre: 'Lámparas de techo', cant: '29', img: '/lamparastecho.png' },
    { nombre: 'Lámparas T5', cant: '17', img: '/t5.png' },
    { nombre: 'Paneles LED', cant: '33', img: '/paneles.png' }
  ];

  return (
    <div className="container-fluid p-0">
      {/* 2. Banner Principal con navegación corregida */}
      <section className="container-fluid px-5 my-5">   
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="display-4 fw-bold">Lámparas colgantes</h1>
            <p className="lead">Descubre las elegantes Lámparas colgantes perfectas para tu hogar, estas lámparas colgantes decorativas de metal negro añade un toque de sofisticación.</p>
            
            {/* Aquí está el botón convertido en Link */}
            <Link 
              to="/producto/68" 
              className="btn btn-dark btn-lg mt-3"
            >
              Detalles de este producto
            </Link>

            <div className="mt-4"><span className="border p-2 rounded">30 productos disponibles</span></div>
          </div>
          <div className="col-md-6 text-center">
            <img src="/lamparas.jpg" className="img-fluid rounded" style={{ maxWidth: '400px' }} alt="Lámpara" />
          </div>
        </div>
      </section>

      {/* 3. Categorías generadas dinámicamente */}
      <section className="bg-light p-5 text-center">
        <h3 className="mb-5">Categorías importantes</h3>
        <div className="container">
          <div className="row justify-content-center g-4">
            {categorias.map((cat, index) => (
              <div key={index} className="col-lg-2 col-md-4 col-sm-6">
                <div className="card p-3 border-0 shadow-sm h-100 align-items-center">
                  <img src={cat.img} alt={cat.nombre} className="img-fluid mb-2" style={{ height: '80px', objectFit: 'contain' }} />
                  <p className="fw-bold mb-0">{cat.nombre}</p>
                  <small className="text-muted">{cat.cant} productos</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Sección de servicios */}
      <section className="container my-5 py-4 border-top">
        <div className="row text-center">
          <div className="col-md-3 mb-3"><i className="bi bi-truck fs-2"></i><p className="fw-bold mb-0">Envíos a toda Colombia</p></div>
          <div className="col-md-3 mb-3"><i className="bi bi-shield-check fs-2"></i><p className="fw-bold mb-0">Garantía de fábrica</p></div>
          <div className="col-md-3 mb-3"><i className="bi bi-credit-card fs-2"></i><p className="fw-bold mb-0">Pagos 100% seguros</p></div>
          <div className="col-md-3 mb-3"><i className="bi bi-headset fs-2"></i><p className="fw-bold mb-0">Asesoría virtual gratuita</p></div>
        </div>
      </section>      
      
      {/* 5. Sección Productos Destacados */}
      <section className="container my-5">
        <h2 className="text-center mb-4 fw-bold">Productos destacados</h2>
        <div className="row g-4">
          {[
            { id: '23', nombre: 'Cinta Led 12V 48W 120 Leds/m de 5 Metros x 5mm', precio: '$ 33.500', img: '/cintaled5m.png' },
            { id: '69', nombre: 'Spot Led PAR38 Negro para Riel (Sin Bombillo)', precio: '$ 55.300', img: '/spotled.png' },
            { id: 'lampara-lineal-17w', nombre: 'Lámpara Lineal LED 17W de Sobreponer Blanca', precio: '$ 255.400', img: '/ledlienal.png' },
            { id: '70', nombre: 'Toma Corriente Doble de Incrustar', precio: '$ 7.500', img: '/tomacorriente.png' }
          ].map((prod, index) => (
            <div key={index} className="col-md-3">
              <div className="card h-100 border-0 shadow-sm p-3 text-center">
                <img src={prod.img} className="card-img-top img-fluid mb-3" style={{ height: '150px', objectFit: 'contain' }} alt={prod.nombre} />
                <div className="card-body p-0">
                  <p className="fw-bold mb-1" style={{ fontSize: '0.9rem' }}>{prod.nombre}</p>
                  <p className="text-muted fw-bold mb-3">{prod.precio}</p>
                  <Link to={`/producto/${prod.id}`} className="btn btn-info btn-sm text-white w-100">
                    <i className="bi bi-cart-fill me-2"></i>Ver detalles
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* 6. Sectores */}
      <section className="container my-5">
        <h2 className="text-center mb-5 fw-bold">Sectores que atendemos</h2>
        <div className="row g-4">
          {['bodega1.png', 'oficinailuminada.png', 'tiendailuminada.png', 'hogariluminado.png'].map((img, index) => (
            <div key={index} className="col-md-3">
              <div className="position-relative overflow-hidden rounded" style={{ height: '350px' }}>
                <img src={img} className="w-100 h-100" style={{ objectFit: 'cover' }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ClientCatalog;