import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      setCargando(true);
      // Traemos productos de Supabase
      const { data, error } = await supabase
        .from('producto')
        .select('*')
        .limit(4); // Ajustado a 4 para que se vean alineados como en tu imagen

      if (error) {
        console.error("Error al traer productos:", error);
      } else {
        const adaptados = data.map(p => ({
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
  }, []);

  return (
    <div className="container py-5">
      {/* SECCIÓN PRODUCTOS DESTACADOS */}
      <h2 className="text-center mb-5 fw-bold">Productos destacados</h2>
      
      {cargando ? (
        <div className="text-center">Cargando...</div>
      ) : (
        <div className="row row-cols-1 row-cols-md-4 g-4 mb-5">
          {productos.map((prod) => (
            <div key={prod.id} className="col">
              <div className="card h-100 shadow-sm border-0">
                <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa' }}>
                  <img src={prod.image_url} className="img-fluid p-2" alt={prod.name} style={{ maxHeight: '100%' }} />
                </div>
                <div className="card-body">
                  <h6 className="card-title fw-bold text-truncate">{prod.name}</h6>
                  <p className="card-text text-primary fw-bold">
                    $ {new Intl.NumberFormat('es-CO').format(prod.price)}
                  </p>
                  <button className="btn btn-dark w-100">Añadir al carrito</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SECCIÓN CATEGORÍAS (Para que se vea como el diseño PRO) */}
      <section className="bg-light py-5 mt-5">
        <h2 className="text-center mb-5 fw-bold">Categorías importantes</h2>
        <div className="row row-cols-1 row-cols-md-5 g-4 text-center">
            {['Cintas LED', 'Lámparas colgantes', 'Lámparas de techo', 'Lámparas T5', 'Paneles LED'].map((cat, i) => (
                <div key={i} className="col">
                    <div className="card border-0 bg-transparent">
                        <div className="mx-auto mb-3" style={{ width: '80px', height: '80px', background: '#ddd', borderRadius: '50%' }}></div>
                        <h6 className="fw-bold">{cat}</h6>
                        <small className="text-muted border-bottom">15 productos</small>
                    </div>
                </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Catalogo;