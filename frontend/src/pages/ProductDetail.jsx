import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const ProductDetail = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducto = async () => {
      setCargando(true);
      // Consultamos a la tabla 'producto' filtrando por 'idproducto'
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

  if (cargando) return <div className="text-center mt-5 p-5"><h4>Cargando producto...</h4></div>;
  if (!producto) return <div className="text-center mt-5 p-5"><h4>Producto no encontrado</h4></div>;

  return (
    <div className="container my-5">
      <button className="btn btn-link text-decoration-none mb-4" onClick={() => navigate(-1)}>
        <i className="bi bi-arrow-left"></i> Volver al catálogo
      </button>
      
      <div className="row g-5">
        <div className="col-md-6 text-center">
          <div className="p-4 bg-light rounded shadow-sm">
            <img src={producto.imagenes} className="img-fluid" alt={producto.nombre_producto} style={{ maxHeight: '400px' }} />
          </div>
        </div>

        <div className="col-md-6">
          <h1 className="fw-bold display-5 mb-3">{producto.nombre_producto}</h1>
          <h2 className="text-primary mb-4 fw-bold">
            $ {new Intl.NumberFormat('es-CO').format(producto.precio)}
          </h2>
          
          <div className="d-grid gap-2 mb-4">
            <button className="btn btn-dark btn-lg">Añadir al carrito</button>
            <button className="btn btn-outline-primary">
              <i className="bi bi-heart me-2"></i> Lista de deseos
            </button>
          </div>

          <hr />
          <h5 className="fw-bold">Descripción</h5>
          <p className="text-muted mb-4">{producto.descripcion || 'Sin descripción disponible.'}</p>

          {/* Aquí insertamos la tabla de especificaciones dinámica */}
<h5 className="fw-bold mt-4">Especificaciones</h5>
<table className="table table-striped mt-2">
  <tbody>
    <tr>
      <td className="fw-bold">Detalles técnicos:</td>
      <td>
        {producto.caracteristicas ? (
          // Usamos split('•') para separar el texto por el punto y mostrarlo en lista
          <ul className="list-unstyled">
            {producto.caracteristicas.split('•').filter(item => item.trim() !== '').map((item, index) => (
              <li key={index}>• {item.trim()}</li>
            ))}
          </ul>
        ) : (
          'No hay especificaciones disponibles'
        )}
      </td>
    </tr>
  </tbody>
</table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;