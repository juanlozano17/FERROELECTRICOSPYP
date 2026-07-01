import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const navigate = useNavigate();

  const userName = localStorage.getItem('userName');
  const userRole = localStorage.getItem('userRole');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    window.location.reload();
  };

  const menuItems = [
    { nombre: 'Lámparas decorativas', icono: 'bi-lamp', ruta: '/catalogo/1' },
    { nombre: 'Lámparas para interior', icono: 'bi-house-door', ruta: '/catalogo/2' },
    { nombre: 'Lámparas para exterior', icono: 'bi-sun', ruta: '/catalogo/3' },
    { nombre: 'Bombillos LED', icono: 'bi-lightbulb', ruta: '/catalogo/4' },
    { nombre: 'Iluminación Inteligente', icono: 'bi-cpu', ruta: '/catalogo/5' },
    { nombre: 'Control de Iluminación', icono: 'bi-sliders', ruta: '/catalogo/6' },
    { nombre: 'Cintas LED', icono: 'bi-lightning', ruta: '/catalogo/7' },
    { nombre: 'Ferretería', icono: 'bi-tools', ruta: '/catalogo/8' },
  ];

  return (
    <>
      <header className="d-flex align-items-center justify-content-between p-3 border-bottom shadow-sm bg-white" style={{ position: 'sticky', top: 0, zIndex: 1040 }}>
        <button className="btn" onClick={() => setMenuAbierto(!menuAbierto)}><i className="bi bi-list fs-3"></i></button>
        <Link to="/"><img src="/logo-pyp.png" style={{ width: '60px' }} alt="Logo" /></Link>

        <div className="d-flex gap-3 align-items-center">
          <Link className="text-decoration-none text-dark" to="/deseos"><i className="bi bi-heart"></i></Link>
          <Link className="text-decoration-none text-dark" to="/carrito"><i className="bi bi-cart3"></i></Link>

          {/* Menú Desplegable de Usuario (Último a la derecha) */}
          <div className="dropdown">
            <button className="btn p-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="bi bi-person-circle fs-4"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              {userName ? (
                <>
                  <li><h6 className="dropdown-header">Hola, {userName}</h6></li>
                  {userRole == 1 && <li><Link className="dropdown-item" to="/dashboard">Panel Admin</Link></li>}
                  <li><Link className="dropdown-item" to="/perfil">Editar Perfil</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item text-danger" onClick={handleLogout}>Cerrar sesión</button></li>
                </>
              ) : (
                <li><Link className="dropdown-item" to="/login">Iniciar sesión</Link></li>
              )}
            </ul>
          </div>
        </div>
      </header>

      {/* Menú lateral */}
      {menuAbierto && (
        <div className="position-fixed bg-dark text-white p-4" style={{ width: '280px', zIndex: 1050, height: '100vh', top: '0', left: 0 }}>
          <button className="btn text-white fs-4" onClick={() => setMenuAbierto(false)}>✕</button>
          <div className="mt-3">
            {menuItems.map((item, index) => (
              <Link key={index} to={item.ruta} className="btn w-100 text-start text-white" onClick={() => setMenuAbierto(false)}>
                <i className={`bi ${item.icono} me-3`}></i> {item.nombre}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-top">
              <Link to="/contacto" className="btn w-100 text-start text-white" onClick={() => setMenuAbierto(false)}><i className="bi bi-telephone-fill me-3"></i>Contacto</Link>
              <Link to="/garantias" className="btn w-100 text-start text-white" onClick={() => setMenuAbierto(false)}><i className="bi bi-arrow-repeat me-3"></i>Garantías</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;