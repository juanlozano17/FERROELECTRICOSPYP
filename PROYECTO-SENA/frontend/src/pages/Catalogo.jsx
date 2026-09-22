import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import api from '../api/axios'; // 👈 Importamos Axios para usar la API con cookies

const Catalogo = () => {
  const { categoria } = useParams();
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [tituloSeccion, setTituloSeccion] = useState('Productos');

  useEffect(() => {
    const fetchProductos = async () => {
      setCargando(true);
      
      let query = supabase.from('producto').select('*');

      if (categoria) {
        if (!isNaN(categoria)) {
          query = query.eq('idcategoria', categoria);
          setTituloSeccion(`Productos de la categoría`);
        } else {
          const textoDecodificado = decodeURIComponent(categoria);
          query = query.ilike('nombre_producto', `%${textoDecodificado}%`);
          setTituloSeccion(`Resultados para: "${textoDecodificado}"`);
        }
      } else {
        query = query.limit(8);
        setTituloSeccion('Productos destacados');
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error al traer productos:", error);
      } else {
        const adaptados = (data || []).map(p => ({
          id: p.idproducto,
          name: p.nombre_producto,
          price: p.precio,
          image_url: p.imagenes || ''
        }));
        setProductos(adaptados);
      }
      setCargando(false);
    };

    fetchProductos();
  }, [categoria]);

  // 🔴 FUNCIÓN AGREGADA PARA MANEJAR LA LISTA DE DESEOS
  const handleAgregarDeseo = async (e, idProducto) => {
    e.stopPropagation(); // Evita que abra el detalle del producto al hacer clic en el corazón

    // 1. Verificamos si existe el usuario guardado en sesión
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');

    if (!usuarioLogueado) {
      alert("Por favor, inicia sesión para guardar tus deseos.");
      return;
    }

    try {
      // 2. Enviamos la petición a la API de Node.js
      const response = await api.post('/deseos', { id_producto: idProducto });

      if (response.status === 201 || response.status === 200) {
        alert("❤️ ¡Producto guardado en tus favoritos!");
      }
    } catch (error) {
      console.error("Error al guardar en favoritos:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
      } else {
        alert("El producto ya está en tus favoritos o hubo un problema al guardarlo.");
      }
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold">{tituloSeccion}</h2>
      
      {cargando ? (
        <div className="text-center py-5">
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : productos.length === 0 ? (
        <div className="text-center py-5">
          <h4 className="text-muted">No hay productos disponibles</h4>
          <button className="btn btn-dark mt-3" onClick={() => navigate('/')}>Volver al inicio</button>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-4 g-4 mb-5">
          {productos.map((prod) => (
            <div key={prod.id} className="col">
              <div 
                className="card h-100 shadow-sm border-0 position-relative" 
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/producto/${prod.id}`)}
              >
                {/* 🔴 BOTÓN DEL CORAZÓN (FAVORITOS) */}
                <button
                  type="button"
                  className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle shadow-sm p-2 d-flex align-items-center justify-content-center"
                  style={{ width: '38px', height: '38px', zIndex: 10 }}
                  onClick={(e) => handleAgregarDeseo(e, prod.id)}
                  title="Guardar en favoritos"
                >
                  <i className="bi bi-heart-fill text-danger fs-5"></i>
                </button>

                <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa' }}>
                  <img src={prod.image_url && prod.image_url.trim() !== '' ? prod.image_url : 'https://placehold.co/150'} className="img-fluid p-2" alt={prod.name} style={{ maxHeight: '100%', objectFit: 'contain' }} />
                </div>
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h6 className="card-title fw-bold text-truncate">{prod.name}</h6>
                    <p className="card-text text-danger fw-bold fs-5">
                      $ {new Intl.NumberFormat('es-CO').format(prod.price)}
                    </p>
                  </div>
                  <button className="btn btn-dark w-100 mt-2" onClick={(e) => { e.stopPropagation(); navigate(`/producto/${prod.id}`); }}>
                    Ver detalle
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SECCIÓN CATEGORÍAS IMPORTANTES */}
      <section className="bg-light py-5 mt-5 rounded">
        <h2 className="text-center mb-5 fw-bold">Categorías importantes</h2>
        <div className="row row-cols-2 row-cols-md-4 g-4 text-center">
            {[
              { nombre: 'Lámparas decorativas', id: 1 },
              { nombre: 'Lámparas para interior', id: 2 },
              { nombre: 'Lámparas para exterior', id: 3 },
              { nombre: 'Ferretería', id: 8 }
            ].map((cat, i) => (
                <div key={i} className="col">
                    <div 
                      className="card border-0 bg-transparent" 
                      style={{ cursor: 'pointer' }}
                      onClick={() => navigate(`/catalogo/${cat.id}`)}
                    >
                        <div className="mx-auto mb-3 shadow-sm d-flex align-items-center justify-content-center bg-white text-dark" style={{ width: '80px', height: '80px', borderRadius: '50%' }}>
                          <i className="bi bi-grid fs-4"></i>
                        </div>
                        <h6 className="fw-bold text-dark">{cat.nombre}</h6>
                    </div>
                </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Catalogo;