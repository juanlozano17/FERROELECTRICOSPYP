import React from 'react';

const RegistroForm = ({ nuevoUsuario, setNuevoUsuario, handleRegistro }) => {
  const handleChange = (e) => {
    setNuevoUsuario({
      ...nuevoUsuario,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="card border-0 shadow-lg rounded-4 overflow-hidden bg-white">
      <div className="row g-0">
        
        {/* Columna Lateral Decorativa */}
        <div className="col-lg-5 d-none d-lg-flex flex-column justify-content-between p-4 text-white position-relative" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
          <div>
            <span className="badge bg-warning text-dark fw-bold px-3 py-1 rounded-pill mb-3">Nuevo Registro</span>
            <h3 className="fw-bold mb-2">Únete a Ferroeléctricos PYP</h3>
            <p className="text-light opacity-75 small">Accede a cotizaciones rápidas, historial de compras y precios especiales para proyectos.</p>
          </div>
          <div className="text-start opacity-50 small">
            <i className="bi bi-shield-lock-fill me-1"></i> Tus datos están seguros con nosotros.
          </div>
        </div>

        {/* Columna Principal del Formulario */}
        <div className="col-lg-7 p-4 p-md-5">
          <div className="text-center text-lg-start mb-4">
            <h3 className="fw-bold text-dark m-0">Crear Nueva Cuenta</h3>
            <p className="text-muted small">Completa tus datos para comenzar tu experiencia.</p>
          </div>

          <form onSubmit={handleRegistro}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label text-muted small fw-bold">Nombres</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 text-muted"><i className="bi bi-person"></i></span>
                  <input 
                    type="text" 
                    name="nombre" 
                    className="form-control bg-light border-start-0 py-2 fs-6" 
                    placeholder="Ej. Juan" 
                    value={nuevoUsuario.nombre} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label text-muted small fw-bold">Apellidos</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 text-muted"><i className="bi bi-person-badge"></i></span>
                  <input 
                    type="text" 
                    name="apellidos" 
                    className="form-control bg-light border-start-0 py-2 fs-6" 
                    placeholder="Ej. Pérez" 
                    value={nuevoUsuario.apellidos} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label text-muted small fw-bold">Correo Electrónico</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 text-muted"><i className="bi bi-envelope"></i></span>
                <input 
                  type="email" 
                  name="correo" 
                  className="form-control bg-light border-start-0 py-2 fs-6" 
                  placeholder="correo@ejemplo.com" 
                  value={nuevoUsuario.correo} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label text-muted small fw-bold">Teléfono / Celular</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 text-muted"><i className="bi bi-phone"></i></span>
                <input 
                  type="tel" 
                  name="telefono" 
                  className="form-control bg-light border-start-0 py-2 fs-6" 
                  placeholder="3001234567" 
                  value={nuevoUsuario.telefono} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label text-muted small fw-bold">Contraseña</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 text-muted"><i className="bi bi-lock"></i></span>
                <input 
                  type="password" 
                  name="contrasena" 
                  className="form-control bg-light border-start-0 py-2 fs-6" 
                  placeholder="Mínimo 6 caracteres" 
                  value={nuevoUsuario.contrasena} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>

            <button type="submit" className="btn btn-dark w-100 py-3 fw-bold rounded-pill shadow-sm">
              <i className="bi bi-person-plus-fill me-2"></i> Registrarme Ahora
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default RegistroForm;