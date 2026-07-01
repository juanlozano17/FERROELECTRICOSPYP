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
        // 1. Usamos la tabla 'producto' tal como aparece en tu editor
        let query = supabase.from('producto').select('*');

        // 2. Filtramos usando 'idcategoria' (el nombre real de tu columna)
        if (idCategoria) {
          query = query.eq('idcategoria', idCategoria);
        }

        const { data, error } = await query;

        if (error) throw error;

        // 3. Adaptamos los datos a los nombres que espera tu componente CategoryView
        const datosAdaptados = data.map(p => ({
          id: p.idproducto,          // Mapeamos idproducto a id
          name: p.nombre_producto,   // Mapeamos nombre_producto a name
          price: p.precio,           // Mapeamos precio a price
          image_url: p.imagenes || '', // Mapeamos imagenes a image_url
          nombreCategoria: 'Productos disponibles'
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

  const titulo = productos.length > 0 ? "Productos disponibles" : "No hay productos disponibles";

  return (
    <CategoryView 
      categoria={titulo} 
      productos={productos} 
      verDetalles={(id) => console.log("Detalle de:", id)} 
    />
  );
};

export default CatalogoContainer;