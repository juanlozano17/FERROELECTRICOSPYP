import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const ListaDeseos = () => {
  const [deseos, setDeseos] = useState([]);

  useEffect(() => {
    const cargarDeseos = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data } = await supabase
        .from('deseos')
        .select('*, producto(*)') // Trae la info del producto relacionado
        .eq('id_usuario', session.user.id);
      
      if (data) setDeseos(data);
    };
    cargarDeseos();
  }, []);

  return (
    <div className="container my-5">
      <h1>Mis Productos Favoritos</h1>
      <div className="row">
        {deseos.map((d) => (
          <div key={d.id_deseo} className="col-md-3">
            <div className="card">
              <img src={d.producto.imagenes} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5>{d.producto.nombre_producto}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaDeseos;