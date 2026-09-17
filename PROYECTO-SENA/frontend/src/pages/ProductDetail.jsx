import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const ProductDetail = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [cantidad, setCantidad] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducto = async () => {
      setCargando(true);
      const { data, error } = await supabase
        .from('producto')
        .select('*')
        .eq('idproducto', id)
        .single();

      if (error) {
        console.error("Error al cargar:", error);
      } else {
        setProducto(data);
      }
      setCargando(false);
    };

    fetchProducto();
  }, [id]);

  const agregarAlCarrito = () => {
    if (!producto) return;

    const itemAComprar = {
      id: producto.idproducto,
      nombre: producto.nombre_producto,
      precio: producto.precio,
      imagen: producto.imagenes
    };

    let carritoActual = JSON.parse(localStorage.getItem('carrito_pyp')) || [];
    const index = carritoActual.findIndex(item => item.id === itemAComprar.id);

    if (index >= 0) {
      carritoActual[index].cantidad += cantidad;
    } else {
      carritoActual.push({ ...itemAComprar, cantidad: cantidad });
    }

    localStorage.setItem('carrito_pyp', JSON.stringify(carritoActual));
    navigate('/carrito');
  };

  // Función inteligente para limpiar y formatear las características de Supabase
  const parsearCaracteristicas = (texto) => {
    if (!texto) return [];
    
    // Si viene en un solo bloque con varias propiedades separadas por dos puntos
    let limpio = texto.replace('Detalles del producto:', '').trim();
    
    // Palabras clave comunes en las especificaciones para separarlas visualmente
    const keys = [
      'Material de la carcasa', 'Color de la carcasa', 'Material del vidrio / pantalla',
      'Color del vidrio / pantalla', 'Tipo de protección', 'Bombillas incl.', 
      'Montura', 'Garantía', 'Número de material'
    ];

    // Intentamos extraer pares clave-valor dinámicamente o por división
    let specs = [];
    keys.forEach(key => {
      const regex = new RegExp(`${key}:\\s*([^]+?)(?=(?:${keys.join('|')}):|$)`, 'i');
      const match = limpio.match(regex);
      if (match && match[1]) {
        specs.push({ titulo: key, valor: match[1].trim() });
      }
    });

    // Si la regex no atrapó nada (formato diferente), devolvemos el texto partido por puntos o viñetas
    if (specs.length === 0) {
      return texto.split(/•|--/).map(item => item.trim()).filter(Boolean).map(item => {
        const parts = item.split(':');
        return {
          titulo: parts.length > 1 ? parts[0].trim() : 'Característica',
          valor: parts.length > 1 ? parts.slice(1).join(':').trim() : item
        };
      });
    }

    return specs;
  };

  if (cargando) {
    return (
      <div className="container text-center py-5 my-5">
        <div className="spinner-border text-dark mb-3" role="status" style={{ width: '3rem', height: '3rem' }}></div>
        <h4 className="text-muted fw-light">Cargando producto...</h4>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="container text-center py-5 my-5">
        <h3 className="fw-bold text-dark">Producto no encontrado</h3>
        <button className="btn btn-dark rounded-pill px-4 py-2 mt-3" onClick={() => navigate(-1)}>
          Volver atrás
        </button>
      </div>
    );
  }

  const listaEspecificaciones = parsearCaracteristicas(producto.caracteristicas);

  return (
    <div className="container my-5">
      {/* Botón de retorno minimalista */}
      <button 
        className="btn btn-outline-dark rounded-pill px-3 py-1 mb-4 small fw-semibold" 
        onClick={() => navigate(-1)}
      >
        <i className="bi bi-arrow-left me-2"></i> Volver
      </button>

      <div className="row g-5 align-items-start">
        {/* Imagen del producto */}
        <div className="col-lg-7">
          <div className="p-5 bg-white border rounded-4 text-center position-relative shadow-sm">
            <span className="position-absolute top-0 start-0 m-4 badge bg-dark text-white px-3 py-2 rounded-pill">
              Stock Disponible
            </span>
            <img 
              src={producto.imagenes} 
              className="img-fluid" 
              alt={producto.nombre_producto} 
              style={{ maxHeight: '480px', objectFit: 'contain' }} 
            />
          </div>
        </div>

        {/* Panel de Compra */}
        <div className="col-lg-5">
          <div className="ps-lg-3">
            <span className="text-muted small text-uppercase tracking-wider fw-bold">Referencia: #{producto.idproducto}</span>
            <h1 className="fw-bold text-dark display-6 mt-1 mb-3">{producto.nombre_producto}</h1>
            
            <div className="fs-3 fw-bold text-dark mb-4 p-3 bg-light rounded-3 border-start border-dark border-4">
              $ {new Intl.NumberFormat('es-CO').format(producto.precio)}
            </div>

            <p className="text-muted mb-4" style={{ lineHeight: '1.7' }}>
              {producto.descripcion || 'Sin descripción disponible.'}
            </p>

            {/* Controles de Cantidad y Añadir */}
            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="input-group" style={{ width: '130px' }}>
                <button 
                  className="btn btn-outline-dark" 
                  type="button"
                  onClick={() => setCantidad(prev => Math.max(1, prev - 1))}
                >
                  -
                </button>
                <input 
                  type="text" 
                  className="form-control text-center fw-bold bg-white" 
                  value={cantidad} 
                  readOnly 
                />
                <button 
                  className="btn btn-outline-dark" 
                  type="button"
                  onClick={() => setCantidad(prev => prev + 1)}
                >
                  +
                </button>
              </div>

              <button 
                className="btn btn-dark flex-grow-1 py-3 fw-bold rounded-pill shadow-sm"
                onClick={agregarAlCarrito}
              >
                <i className="bi bi-cart-fill me-2"></i> Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sección Inferior: Especificaciones Clave Modernas en Grid */}
      <div className="row mt-5 pt-4 border-top">
        <div className="col-12">
          <h4 className="fw-bold text-dark mb-4">Especificaciones Clave</h4>
          {listaEspecificaciones.length > 0 ? (
            <div className="row g-3">
              {listaEspecificaciones.map((spec, index) => (
                <div key={index} className="col-md-4 col-sm-6">
                  <div className="p-3 border rounded-4 bg-white shadow-sm h-100 d-flex flex-column justify-content-center">
                    <span className="text-muted text-uppercase fw-bold" style={{ fontSize: '0.75rem' }}>
                      {spec.titulo}
                    </span>
                    <span className="text-dark fw-semibold mt-1" style={{ fontSize: '0.95rem' }}>
                      {spec.valor}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted small">Sin especificaciones registradas.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;