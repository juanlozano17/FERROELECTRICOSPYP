import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient'; 
import CategoryView from './CategoryView';

const CatalogoContainer = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { idCategoria } = useParams();

  useEffect(() => {
    const fetchProductos = async () => {
      setCargando(true);
      
      try {
        let query = supabase.from('producto').select('*');

        if (idCategoria) {
          const esNumero = !isNaN(idCategoria);

          if (esNumero) {
            query = query.eq('idcategoria', idCategoria);
          } else {
            // Decodificamos y separamos la búsqueda en palabras individuales
            const textoBusqueda = decodeURIComponent(idCategoria).trim();
            const palabras = textoBusqueda.split(/\s+/).filter(p => p.length > 0);

            if (palabras.length > 0) {
              // Construimos una consulta flexible con OR para que busque cada palabra en el nombre del producto
              const condiciones = palabras.map(palabra => `nombre_producto.ilike.%${palabra}%`).join(',');
              query = query.or(condiciones);
            }
          }
        }

        const { data, error } = await query;

        if (error) throw error;

        const datosAdaptados = (data || []).map(p => ({
          id: p.idproducto,          
          name: p.nombre_producto,   
          price: p.precio,           
          image_url: p.imagenes && p.imagenes.trim() !== '' ? p.imagenes : 'https://placehold.co/200', 
          nombreCategoria: 'Resultados de búsqueda'
        }));

        setProductos(datosAdaptados);
      } catch (err) {
        console.error("Error cargando productos desde Supabase:", err);
      } finally {
        setCargando(false);
      }
    };

    fetchProductos();
  }, [idCategoria]);

  if (cargando) return <div className="text-center mt-5">Cargando productos...</div>;

  const titulo = productos.length > 0 ? "Resultados de búsqueda" : "No hay productos disponibles";

  return (
    <CategoryView 
      categoria={titulo} 
      productos={productos} 
      verDetalles={(id) => console.log("Detalle de:", id)} 
    />
  );
};

export default CatalogoContainer;