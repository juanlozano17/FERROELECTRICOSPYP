import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const CorazonFavorito = ({ idProducto, onLoginRequerido }) => {
  const [esFavorito, setEsFavorito] = useState(false);

  useEffect(() => {
    const verificar = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data } = await supabase
        .from('deseos')
        .select('*')
        .eq('id_usuario', session.user.id)
        .eq('id_product', idProducto)
        .maybeSingle();

      if (data) setEsFavorito(true);
    };
    verificar();
  }, [idProducto]);

  const manejarClick = async (e) => {
    e.preventDefault();
    
    // Obtener sesión de forma directa
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      onLoginRequerido();
      return;
    }

    // Inserción directa
    const { error } = await supabase
      .from('deseos')
      .insert([{ id_usuario: session.user.id, id_product: idProducto }]);

    if (!error) {
      setEsFavorito(true);
    } else {
      console.error("Error al guardar:", error);
    }
  };

  return (
    <button 
      onClick={manejarClick} 
      className="btn position-absolute top-0 end-0 m-2 border-0"
      style={{ zIndex: 1, fontSize: '1.5rem', color: esFavorito ? 'red' : 'gray', backgroundColor: 'transparent' }}
    >
      <i className={`bi bi-heart${esFavorito ? '-fill' : ''}`}></i>
    </button>
  );
};

export default CorazonFavorito;