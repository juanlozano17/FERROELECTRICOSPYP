import React from 'react';
import { useNavigate } from 'react-router-dom';
import CorazonFavorito from '../components/CorazonFavorito';

const CategoryView = ({ categoria, productos }) => {
  const navigate = useNavigate();

  return (
    <div className="container my-5">
      <h1 className="fw-bold mb-4">{categoria}</h1>
      
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {productos.map((prod) => (
          <div key={prod.id} className="col">
            <div className="card h-100 border-0 shadow-sm position-relative">
              
              {/* Aquí usamos nuestro componente CorazonFavorito */}
              <CorazonFavorito 
                idProducto={prod.id} 
                onLoginRequerido={() => {
                  alert("Por favor, inicia sesión para guardar tus deseos.");
                  // Si tienes un modal, aquí pondrías: setMostrarModalLogin(true);
                }} 
              />

              <div className="p-3 d-flex align-items-center justify-content-center" style={{ height: '220px' }}>
                <img src={prod.image_url} className="img-fluid" style={{ maxHeight: '100%', objectFit: 'contain' }} alt={prod.name} />
              </div>
              
              <div className="card-body d-flex flex-column text-center">
                <h6 className="fw-bold mb-2">{prod.name}</h6>
                <p className="text-primary fw-bold">$ {new Intl.NumberFormat('es-CO').format(prod.price)}</p>
                <button className="btn btn-outline-dark w-100" onClick={() => navigate(`/producto/${prod.id}`)}>
                  Ver Detalles
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryView;