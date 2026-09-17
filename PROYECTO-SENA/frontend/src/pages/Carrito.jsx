import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Carrito = () => {
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const productosGuardados = JSON.parse(localStorage.getItem('carrito_pyp')) || [];
    setCarrito(productosGuardados);
  }, []);

  const actualizarCarritoNuevo = (nuevoCarrito) => {
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito_pyp', JSON.stringify(nuevoCarrito));
  };

  const incrementarCantidad = (id) => {
    const nuevoCarrito = carrito.map(item => 
      item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
    );
    actualizarCarritoNuevo(nuevoCarrito);
  };

  const decrementarCantidad = (id) => {
    const nuevoCarrito = carrito.map(item => 
      item.id === id && item.cantidad > 1 ? { ...item, cantidad: item.cantidad - 1 } : item
    );
    actualizarCarritoNuevo(nuevoCarrito);
  };

  const eliminarProducto = (id) => {
    const nuevoCarrito = carrito.filter(item => item.id !== id);
    actualizarCarritoNuevo(nuevoCarrito);
  };

  const manejarProcederAlPago = (e) => {
    e.preventDefault();
    const usuarioLogeado = localStorage.getItem('usuario') || localStorage.getItem('user') || localStorage.getItem('nombre');
    const tokenSupabase = Object.keys(localStorage).find(key => key.includes('auth-token'));

    if (usuarioLogeado || tokenSupabase || localStorage.length > 0) {
      navigate('/pago-seguro');
    } else {
      alert("Por favor inicia sesión para continuar.");
      navigate('/login');
    }
  };

  const totalPagar = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        
        {/* Cabecera limpia y moderna */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 pb-3 border-bottom">
          <div>
            <h1 className="fw-extrabold text-dark display-6 mb-1">Carrito de Compras</h1>
            <p className="text-muted mb-0">Revisa tus artículos seleccionados antes de proceder al pago seguro.</p>
          </div>
          <div className="mt-3 mt-md-0">
            <Link to="/catalogo/8" className="btn btn-outline-dark rounded-pill px-4 fw-semibold shadow-sm bg-white">
              <i className="bi bi-arrow-left me-2"></i> Seguir comprando
            </Link>
          </div>
        </div>

        {carrito.length === 0 ? (
          <div className="text-center py-5 px-4 bg-white rounded-4 shadow-sm my-4 border">
            <div className="avatar-lg bg-light text-dark rounded-circle mx-auto p-4 mb-3 d-inline-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
              <i className="bi bi-cart-x fs-1"></i>
            </div>
            <h3 className="fw-bold text-dark mb-2">Tu carrito está vacío</h3>
            <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '400px' }}>Parece que aún no has añadido ninguna lámpara o accesorio de iluminación a tu carrito.</p>
            <Link to="/catalogo/8" className="btn btn-dark px-5 py-3 rounded-pill fw-bold shadow-sm">
              Explorar Catálogo
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            
            {/* Lista moderna de productos en Tarjetas Verticales / Filas separadas */}
            <div className="col-12 col-lg-8">
              <div className="d-flex flex-column gap-3">
                {carrito.map((item) => (
                  <div key={item.id} className="card border-0 shadow-sm rounded-4 p-4 bg-white transition-all">
                    <div className="row align-items-center g-3">
                      
                      {/* Imagen */}
                      <div className="col-4 col-md-3 text-center">
                        <div className="bg-light rounded-3 p-2 d-inline-flex align-items-center justify-content-center w-100" style={{ height: '110px' }}>
                          <img 
                            src={item.imagen} 
                            alt={item.nombre} 
                            className="img-fluid rounded-2" 
                            style={{ maxHeight: '90px', objectFit: 'contain' }} 
                          />
                        </div>
                      </div>

                      {/* Información y Precio Unitario */}
                      <div className="col-8 col-md-5">
                        <span className="badge bg-light text-muted fw-semibold mb-1" style={{ fontSize: '0.7rem' }}>REF: {item.id}</span>
                        <h5 className="fw-bold text-dark mb-1" style={{ fontSize: '1.05rem', lineHeight: '1.4' }}>{item.nombre}</h5>
                        <div className="text-muted small">
                          Precio unitario: <span className="fw-semibold text-dark">${item.precio.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Selector de Cantidad */}
                      <div className="col-6 col-md-2 text-md-center">
                        <label className="d-block text-muted small mb-1 d-md-none">Cantidad</label>
                        <div className="input-group input-group-sm rounded-pill border overflow-hidden" style={{ width: '110px' }}>
                          <button className="btn btn-light border-0 px-2 fw-bold" onClick={() => decrementarCantidad(item.id)}>-</button>
                          <input type="text" className="form-control text-center fw-bold bg-white border-0 shadow-none px-0" value={item.cantidad} readOnly />
                          <button className="btn btn-light border-0 px-2 fw-bold" onClick={() => incrementarCantidad(item.id)}>+</button>
                        </div>
                      </div>

                      {/* Subtotal y Eliminar */}
                      <div className="col-6 col-md-2 text-end">
                        <div className="fw-extrabold text-dark fs-6 mb-2">
                          ${(item.precio * item.cantidad).toLocaleString()}
                        </div>
                        <button 
                          className="btn btn-link text-danger p-0 text-decoration-none small d-inline-flex align-items-center gap-1" 
                          onClick={() => eliminarProducto(item.id)}
                          title="Eliminar producto"
                        >
                          <i className="bi bi-trash"></i> <span className="d-none d-md-inline">Quitar</span>
                        </button>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resumen de Orden Lateral Moderno y Fijo */}
            <div className="col-12 col-lg-4">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white sticky-top" style={{ top: '20px' }}>
                <h4 className="fw-bold text-dark mb-4 pb-2 border-bottom">Resumen de Compra</h4>
                
                <div className="d-flex justify-content-between mb-3 text-muted">
                  <span>Productos ({totalItems})</span>
                  <span className="fw-semibold text-dark">${totalPagar.toLocaleString()}</span>
                </div>
                
                <div className="d-flex justify-content-between mb-3 text-muted">
                  <span>Envío estimado</span>
                  <span className="badge bg-success bg-opacity-15 text-success fw-bold px-2 py-1 rounded-pill">Gratis</span>
                </div>
                
                <hr className="text-muted opacity-25 my-3" />

                <div className="d-flex justify-content-between mb-4 align-items-center">
                  <span className="fw-bold text-dark fs-5">Total a Pagar</span>
                  <span className="fw-extrabold text-primary fs-4">${totalPagar.toLocaleString()}</span>
                </div>

                <button 
                  onClick={manejarProcederAlPago} 
                  className="btn btn-dark w-100 py-3 fw-bold rounded-pill shadow-sm d-flex align-items-center justify-content-center gap-2 mb-3"
                >
                  <span>Proceder al Pago</span>
                  <i className="bi bi-arrow-right"></i>
                </button>

                {/* Sellos de confianza */}
                <div className="text-center pt-3 border-top text-muted small d-flex justify-content-around">
                  <span><i className="bi bi-shield-check text-success me-1"></i> Compra Segura</span>
                  <span><i className="bi bi-headset text-dark me-1"></i> Soporte 24/7</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Carrito;