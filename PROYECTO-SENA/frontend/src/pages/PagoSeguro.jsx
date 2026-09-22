import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const PagoSeguro = () => {
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState([]);
  
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
    ciudad: 'Bogotá D.C.',
    metodoPago: 'contraentrega'
  });

  useEffect(() => {
    const productosGuardados = JSON.parse(localStorage.getItem('carrito_pyp')) || [];
    setCarrito(productosGuardados);
  }, []);

  const totalPagar = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  const manejarCambio = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const finalizarCompra = (e) => {
    e.preventDefault();
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    if (!formData.nombre || !formData.telefono || !formData.direccion) {
      alert("Por favor completa todos los datos de envío.");
      return;
    }

    alert(`¡Pedido confirmado con éxito, ${formData.nombre}! Gracias por confiar en Ferroeléctricos PYP.`);
    localStorage.removeItem('carrito_pyp');
    navigate('/');
  };

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container" style={{ maxWidth: '1100px' }}>
        
        {/* Barra de Progreso / Header Minimalista */}
        <div className="d-flex justify-content-between align-items-center mb-5 pb-3 border-bottom">
          <div>
            <span className="text-muted small text-uppercase tracking-wider fw-bold">Ferroeléctricos PYP</span>
            <h2 className="fw-bold text-dark m-0">Finalizar Compra</h2>
          </div>
          <Link to="/carrito" className="btn btn-sm btn-outline-dark rounded-pill px-3 py-2 fw-semibold">
            <i className="bi bi-arrow-left me-1"></i> Volver al Carrito
          </Link>
        </div>

        <form onSubmit={finalizarCompra}>
          <div className="row g-5">
            
            {/* Columna Izquierda: Datos y Pago */}
            <div className="col-lg-7">
              
              {/* Tarjeta de Envío */}
              <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="bg-dark text-white rounded-3 p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                    <i className="bi bi-truck fs-5"></i>
                  <div></div>
                  </div>
                  <h5 className="fw-bold text-dark m-0">1. Dirección de Destino</h5>
                </div>

                <div className="mb-3">
                  <label className="form-label text-muted small fw-bold">Nombre Completo</label>
                  <input 
                    type="text" 
                    name="nombre" 
                    className="form-control form-control-lg bg-light border-0 fs-6" 
                    placeholder="Ej. Carlos Pérez" 
                    value={formData.nombre} 
                    onChange={manejarCambio} 
                    required 
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-muted small fw-bold">Teléfono de Contacto</label>
                    <input 
                      type="tel" 
                      name="telefono" 
                      className="form-control form-control-lg bg-light border-0 fs-6" 
                      placeholder="Ej. 3001234567" 
                      value={formData.telefono} 
                      onChange={manejarCambio} 
                      required 
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-muted small fw-bold">Ciudad</label>
                    <input 
                      type="text" 
                      name="ciudad" 
                      className="form-control form-control-lg bg-light border-0 fs-6" 
                      value={formData.ciudad} 
                      onChange={manejarCambio} 
                      required 
                    />
                  </div>
                </div>

                <div className="mb-2">
                  <label className="form-label text-muted small fw-bold">Dirección de Residencia</label>
                  <input 
                    type="text" 
                    name="direccion" 
                    className="form-control form-control-lg bg-light border-0 fs-6" 
                    placeholder="Ej. Calle 50 # 15-20, Apto 302" 
                    value={formData.direccion} 
                    onChange={manejarCambio} 
                    required 
                  />
                </div>
              </div>

              {/* Tarjeta de Método de Pago */}
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="bg-dark text-white rounded-3 p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                    <i className="bi bi-credit-card-2-front fs-5"></i>
                  </div>
                  <h5 className="fw-bold text-dark m-0">2. Método de Pago</h5>
                </div>

                <div className="row g-3">
                  <div className="col-12">
                    <div 
                      onClick={() => setFormData({...formData, metodoPago: 'contraentrega'})}
                      className={`p-3 rounded-4 border cursor-pointer transition-all d-flex align-items-center justify-content-between ${formData.metodoPago === 'contraentrega' ? 'border-dark bg-white shadow-sm' : 'border-light bg-light opacity-75'}`}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <input 
                          type="radio" 
                          name="metodoPago" 
                          checked={formData.metodoPago === 'contraentrega'} 
                          onChange={() => {}} 
                          className="form-check-input fs-5 m-0"
                        />
                        <div>
                          <span className="fw-bold text-dark d-block">Pago Contra Entrega</span>
                          <small className="text-muted">Efectivo o datáfono al recibir en la puerta.</small>
                        </div>
                      </div>
                      <i className="bi bi-cash-stack fs-4 text-secondary"></i>
                    </div>
                  </div>

                  <div className="col-12">
                    <div 
                      onClick={() => setFormData({...formData, metodoPago: 'tarjeta'})}
                      className={`p-3 rounded-4 border cursor-pointer transition-all d-flex align-items-center justify-content-between ${formData.metodoPago === 'tarjeta' ? 'border-dark bg-white shadow-sm' : 'border-light bg-light opacity-75'}`}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <input 
                          type="radio" 
                          name="metodoPago" 
                          checked={formData.metodoPago === 'tarjeta'} 
                          onChange={() => {}} 
                          className="form-check-input fs-5 m-0"
                        />
                        <div>
                          <span className="fw-bold text-dark d-block">Tarjeta / PSE / Pasarela Segura</span>
                          <small className="text-muted">Pago en línea cifrado y protegido.</small>
                        </div>
                      </div>
                      <i className="bi bi-shield-check fs-4 text-secondary"></i>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Columna Derecha: Resumen Flotante Moderno */}
            <div className="col-lg-5">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white sticky-top" style={{ top: '30px' }}>
                <h5 className="fw-bold text-dark mb-4">Resumen del Pedido</h5>

                {/* Lista de productos compacta */}
                <div className="d-flex flex-column gap-3 mb-4 pb-3 border-bottom" style={{ maxHeight: '280px', overflowY: 'auto' }}>
                  {carrito.map((item) => (
                    <div key={item.id} className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-3">
                        <img src={item.imagen} alt={item.nombre} className="rounded-3 object-fit-cover" style={{ width: '45px', height: '45px' }} />
                        <div>
                          <h6 className="mb-0 fw-semibold text-dark fs-7" style={{ maxWidth: '160px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.nombre}</h6>
                          <small className="text-muted">Cant: {item.cantidad}</small>
                        </div>
                      </div>
                      <span className="fw-bold text-dark fs-7">${(item.precio * item.cantidad).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="d-flex justify-content-between mb-2 text-muted">
                  <span>Subtotal</span>
                  <span className="fw-semibold text-dark">${totalPagar.toLocaleString()}</span>
                </div>
                <div className="d-flex justify-content-between mb-3 text-muted border-bottom pb-3">
                  <span>Envío</span>
                  <span className="text-success fw-bold">Gratis</span>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <span className="fw-bold text-dark fs-5">Total a Pagar</span>
                  <span className="fw-bold text-primary fs-4">${totalPagar.toLocaleString()}</span>
                </div>

                <button type="submit" className="btn btn-dark w-100 py-3 rounded-pill fw-bold shadow-sm">
                  <i className="bi bi-lock-fill me-2"></i> Confirmar Pedido Ahora
                </button>

                <div className="text-center mt-3">
                  <small className="text-muted fs-8"><i className="bi bi-shield-lock me-1"></i> Transacción 100% segura y cifrada</small>
                </div>
              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
};

export default PagoSeguro;