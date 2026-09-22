import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; 
import SearchModal from './SearchModal';

const Navbar = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const userName = localStorage.getItem('userName');
  const userRole = localStorage.getItem('userRole');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    window.location.reload();
  };

  useEffect(() => {
    const buscarProductos = async () => {
      if (busqueda.trim() === '') {
        setResultados([]);
        return;
      }

      setCargando(true);
      // Aumentamos el límite a 8 para que salgan más productos en la lista desplegable
      const { data, error } = await supabase
        .from('producto')
        .select('idproducto, nombre_producto, precio, imagenes')
        .ilike('nombre_producto', `%${busqueda}%`)
        .limit(8);

      if (error) {
        console.error('Error buscando productos:', error);
      } else {
        setResultados(data || []);
      }
      setCargando(false);
    };

    const delayDebounce = setTimeout(() => {
      buscarProductos();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [busqueda]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setResultados([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (busqueda.trim() !== '') {
        setResultados([]);
        navigate(`/catalogo/${encodeURIComponent(busqueda)}`);
      }
    }
  };

  const irAlDetalle = (id) => {
    setResultados([]);
    setBusqueda('');
    navigate(`/producto/${id}`);
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
      <header className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom shadow-sm bg-white" style={{ position: 'sticky', top: 0, zIndex: 1040 }}>
        
        {/* Bloque Izquierda: Menú hamburguesa y Barra de búsqueda */}
        <div className="d-flex align-items-center gap-3">
          <button className="btn" onClick={() => setMenuAbierto(!menuAbierto)}>
            <i className="bi bi-list fs-3"></i>
          </button>

          <div className="position-relative" ref={searchRef} onClick={() => setIsSearchOpen(true)} style={{ width: '220px', cursor: 'pointer' }}>
            <div className="input-group">
              <input 
                type="text" 
                className="form-control rounded-pill px-3 shadow-none bg-light" 
                placeholder="Buscar productos..." 
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                onKeyDown={handleKeyDown}
                readOnly
                style={{ cursor: 'pointer', fontSize: '0.9rem' }}
              />
              <span className="position-absolute end-0 top-50 translate-middle-y pe-3 text-muted" style={{ zIndex: 5 }}>
                <i className="bi bi-search"></i>
              </span>
            </div>

            {resultados.length > 0 && (
              <ul className="dropdown-menu show w-100 shadow mt-2 border-0 rounded-3 overflow-hidden" style={{ maxHeight: '350px', overflowY: 'auto' }}>
                {resultados.map((prod) => (
                  <li key={prod.idproducto}>
                    <div 
                      className="dropdown-item d-flex align-items-center gap-3 py-2"
                      onClick={() => irAlDetalle(prod.idproducto)}
                      style={{ cursor: 'pointer' }}
                    >
                      <img 
                        src={prod.imagenes && prod.imagenes.trim() !== '' ? prod.imagenes : 'https://placehold.co/40'} 
                        alt={prod.nombre_producto} 
                        style={{ width: '40px', height: '40px', objectFit: 'cover' }} 
                        className="rounded"
                      />
                      <div className="d-flex flex-column">
                        <span className="fw-semibold text-dark text-truncate" style={{ maxWidth: '180px' }}>{prod.nombre_producto}</span>
                        <small className="text-muted">${prod.precio}</small>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Bloque Centro: Logo exactamente a la mitad */}
        <div className="position-absolute start-50 translate-middle-x">
          <Link to="/">
            <img src="/logo-pyp.png" style={{ width: '80px' }} alt="Logo" />
          </Link>
        </div>

        {/* Bloque Derecha: Icono de Carrito y Usuario */}
        <div className="d-flex gap-3 align-items-center">
          <Link className="text-decoration-none text-dark fs-5" to="/carrito"><i className="bi bi-cart3"></i></Link>

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

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;