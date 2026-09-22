import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white text-dark pt-5 pb-4 border-top mt-auto">
      <div className="container">
        <div className="row g-4 align-items-start">
          
          {/* Columna 1: Contacto */}
          <div className="col-12 col-md-3 d-flex flex-column">
            <h5 className="fw-bold mb-3 fs-6">Contacto</h5>
            
            <p className="mb-1 fw-semibold small">Servicio al cliente</p>
            <p className="text-muted small mb-3">(601) 407 3033</p>

            <p className="mb-1 fw-semibold small">Ventas</p>
            <p className="text-muted small mb-1">(601) 364 9734</p>
            <p className="text-muted small mb-3">018000 180222</p>

            <p className="mb-1 fw-semibold small">Consultas y solicitudes</p>
            <p className="text-muted small mb-1">soporte@ferroelectricospyp.com</p>
            <ul className="list-unstyled small mb-3 ps-0">
              <li><Link to="/contacto" className="text-decoration-none text-muted">Formulario de contacto</Link></li>
              <li><Link to="/garantias" className="text-decoration-none text-muted">Preguntas frecuentes y garantías</Link></li>
            </ul>

            {/* Bloque de Redes Sociales Centrado */}
            <div className="d-flex flex-column align-items-center mt-2 p-2 bg-light rounded shadow-sm">
              <p className="mb-2 fw-semibold small text-center">Síguenos en</p>
              <div className="d-flex gap-2 justify-content-center">
                <a href="#facebook" className="btn btn-dark btn-sm rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}><i className="bi bi-facebook"></i></a>
                <a href="#twitter" className="btn btn-dark btn-sm rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}><i className="bi bi-twitter-x"></i></a>
                
                {/* Enlace de Instagram Actualizado */}
                <a 
                  href="https://www.instagram.com/ing_sumiled.sas?igsi=NHI1dmU5bDI4ejY1" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-dark btn-sm rounded-circle d-flex align-items-center justify-content-center" 
                  style={{ width: '32px', height: '32px' }}
                  title="Síguenos en Instagram"
                >
                  <i className="bi bi-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Columna 2: Nosotros */}
          <div className="col-12 col-md-3 d-flex flex-column">
            <h5 className="fw-bold mb-3 fs-6">Nosotros</h5>
            <ul className="list-unstyled small d-flex flex-column gap-2 ps-0">
              <li><Link to="/quienes-somos" className="text-decoration-none text-muted">Quiénes somos</Link></li>
              <li><Link to="/tiendas" className="text-decoration-none text-muted">Tiendas físicas</Link></li>
            </ul>
          </div>

          {/* Columna 3: Compras y servicios */}
          <div className="col-12 col-md-3 d-flex flex-column">
            <h5 className="fw-bold mb-3 fs-6">Compras y servicios</h5>
            <ul className="list-unstyled small d-flex flex-column gap-2 ps-0">
              <li><Link to="/medios-de-pago" className="text-decoration-none text-muted">Medios de pago</Link></li>
              <li><Link to="/cambios-y-devoluciones" className="text-decoration-none text-muted">Cambios y devoluciones</Link></li>
              <li><Link to="/factura" className="text-decoration-none text-muted">Consulta tu factura</Link></li>
              <li><Link to="/envios" className="text-decoration-none text-muted">Envíos y cobertura</Link></li>
            </ul>
          </div>

          {/* Columna 4: Legal */}
          <div className="col-12 col-md-3 d-flex flex-column">
            <h5 className="fw-bold mb-3 fs-6">Legal</h5>
            <ul className="list-unstyled small d-flex flex-column gap-2 mb-4 ps-0">
              <li><Link to="/terminos" className="text-decoration-none text-muted">Políticas y términos</Link></li>
              <li><Link to="/politica-privacidad" className="text-decoration-none text-muted">Política de privacidad</Link></li>
              <li><Link to="/cookies" className="text-decoration-none text-muted">Política de cookies</Link></li>
              <li><Link to="/datos" className="text-decoration-none text-muted">Tratamiento de datos personales</Link></li>
            </ul>
          </div>

        </div>

        {/* Franja de derechos de autor final */}
        <hr className="my-4 text-muted" />
        <div className="row">
          <div className="col text-center">
            <p className="text-muted small mb-0">
              &copy; 2026 Ferroelectricos PYP - Todos los derechos reservados - NIT: 890.900.943-1
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;