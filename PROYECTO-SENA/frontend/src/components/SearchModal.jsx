import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const SearchModal = ({ isOpen, onClose }) => {
  const [busqueda, setBusqueda] = useState('');
  const [recomendados, setRecomendados] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);
      cargarRecomendados();
    } else {
      setBusqueda('');
    }
  }, [isOpen]);

  const cargarRecomendados = async () => {
    const { data } = await supabase
      .from('producto')
      .select('*')
      .limit(4);
    setRecomendados(data || []);
  };

  if (!isOpen) return null;

  // Mapa de categorías para redireccionar por ID numérico exacto al escribir o seleccionar
  const categoriasMap = {
    'lámparas decorativas': 1,
    'lamparas decorativas': 1,
    'lámparas para interior': 2,
    'lamparas para interior': 2,
    'lámparas para exterior': 3,
    'lamparas para exterior': 3,
    'bombillos led': 4,
    'iluminación inteligente': 5,
    'iluminacion inteligente': 5,
    'control de iluminación': 6,
    'control de iluminacion': 6,
    'cintas led': 7,
    'ferretería': 8,
    'ferreteria': 8
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const textoLimpio = busqueda.trim().toLowerCase();
    if (textoLimpio !== '') {
      onClose();
      // Si coincide con alguna categoría, redirige por ID; de lo contrario, hace búsqueda normal por texto
      if (categoriasMap[textoLimpio]) {
        navigate(`/catalogo/${categoriasMap[textoLimpio]}`);
      } else {
        navigate(`/catalogo/${encodeURIComponent(busqueda.trim())}`);
      }
    }
  };

  const seleccionarSugerencia = (termino) => {
    setBusqueda(termino);
    onClose();
    const terminoLimpio = termino.toLowerCase().trim();
    if (categoriasMap[terminoLimpio]) {
      navigate(`/catalogo/${categoriasMap[terminoLimpio]}`);
    } else {
      navigate(`/catalogo/${encodeURIComponent(termino)}`);
    }
  };

  const sugerenciasBase = [
    'lamparas colgantes',
    'bombillos led',
    'iluminacion inteligente',
    'lampara de mesa',
    'cinta led',
    'ferreteria'
  ];

  const sugerenciasFiltradas = busqueda.trim() === '' 
    ? sugerenciasBase 
    : sugerenciasBase.filter(s => s.toLowerCase().includes(busqueda.toLowerCase()));

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-white" style={{ zIndex: 2000, overflowY: 'auto' }}>
      {/* Franja superior cambiada a negro con bg-dark */}
      <div className="container-fluid bg-dark py-3 shadow-sm">
        <div className="container">
          <form onSubmit={handleSearchSubmit} className="d-flex align-items-center gap-3">
            <div className="input-group bg-white rounded-pill px-3 py-1 shadow-sm">
              <input 
                ref={inputRef}
                type="text" 
                className="form-control border-0 shadow-none bg-transparent" 
                placeholder="Buscar productos, marcas y más..." 
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              {busqueda && (
                <button type="button" className="btn border-0 text-muted" onClick={() => setBusqueda('')}>
                  <i className="bi bi-x-lg"></i>
                </button>
              )}
              <button type="submit" className="btn border-0 text-dark">
                <i className="bi bi-search fs-5"></i>
              </button>
            </div>
            <button type="button" className="btn text-white fw-semibold text-decoration-none" onClick={onClose}>
              Cerrar
            </button>
          </form>
        </div>
      </div>

      <div className="container py-4">
        <div className="row">
          <div className="col-md-5 border-end">
            <h6 className="text-muted mb-4 fw-bold">Algunas sugerencias</h6>
            <ul className="list-unstyled">
              {sugerenciasFiltradas.map((sug, index) => (
                <li key={index} className="mb-3">
                  <button 
                    className="btn text-start p-0 border-0 bg-transparent text-dark d-flex align-items-center gap-3 w-100"
                    onClick={() => seleccionarSugerencia(sug)}
                  >
                    <i className="bi bi-search text-dark"></i>
                    <span className="text-capitalize">{sug}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-7 ps-md-5 mt-4 mt-md-0">
            <h6 className="text-muted mb-4 fw-bold">Productos recomendados</h6>
            <div className="d-flex flex-column gap-3">
              {recomendados.map((prod) => (
                <div 
                  key={prod.idproducto} 
                  className="d-flex align-items-center gap-3 p-2 rounded border-0 shadow-sm bg-light"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    onClose();
                    navigate(`/producto/${prod.idproducto}`);
                  }}
                >
                  <img 
                    src={prod.imagenes && prod.imagenes.trim() !== '' ? prod.imagenes : 'https://placehold.co/60'} 
                    alt={prod.nombre_producto} 
                    style={{ width: '60px', height: '60px', objectFit: 'cover' }} 
                    className="rounded"
                  />
                  <div className="flex-grow-1">
                    <h6 className="mb-1 text-dark fw-semibold text-truncate" style={{ maxWidth: '350px' }}>{prod.nombre_producto}</h6>
                    <span className="text-danger fw-bold fs-5">${prod.precio}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;