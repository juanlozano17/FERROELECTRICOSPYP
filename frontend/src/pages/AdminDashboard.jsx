import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const AdminDashboard = () => {
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const [esAgregando, setEsAgregando] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({ 
    nombre_producto: '', precio: '', stock: '', descripcion: '', imagenes: '', idcategoria: '' 
  });
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => { fetchProductos(); }, []);

  const fetchProductos = async () => {
    const { data } = await supabase.from('producto').select('*');
    if (data) setProductos(data);
  };

  const agregarProducto = async (e) => {
    e.preventDefault();
    
    // CREACIÓN DEL OBJETO LIMPIO:
    // Creamos una copia y eliminamos el idproducto para forzar a IDENTITY a autoincrementar
    const datosParaEnviar = { ...nuevoProducto };
    delete datosParaEnviar.idproducto; 

    // Convertimos a tipos correctos y filtramos vacíos
    const payload = {
      nombre_producto: datosParaEnviar.nombre_producto,
      precio: parseFloat(datosParaEnviar.precio) || 0,
      stock: parseInt(datosParaEnviar.stock) || 0,
      descripcion: datosParaEnviar.descripcion,
      imagenes: datosParaEnviar.imagenes,
      idcategoria: datosParaEnviar.idcategoria ? parseInt(datosParaEnviar.idcategoria) : null
    };

    console.log("Enviando a Supabase (sin ID):", payload);

    const { error } = await supabase.from('producto').insert([payload]);
    
    if (error) {
      console.error("Error detallado:", error);
      alert("Error al agregar: " + error.message);
    } else {
      alert("¡Producto creado con éxito!");
      setNuevoProducto({ nombre_producto: '', precio: '', stock: '', descripcion: '', imagenes: '', idcategoria: '' });
      setEsAgregando(false);
      fetchProductos();
    }
  };

  const eliminarProducto = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
      await supabase.from('producto').delete().eq('idproducto', id);
      fetchProductos();
    }
  };

  const guardarEdicion = async (e) => {
    e.preventDefault();
    const { idproducto, ...datosActualizar } = productoEditando;
    
    const { error } = await supabase
      .from('producto')
      .update(datosActualizar)
      .eq('idproducto', idproducto);

    if (error) alert("Error al actualizar: " + error.message);
    else {
      alert("¡Producto actualizado!");
      setProductoEditando(null);
      fetchProductos();
    }
  };

  const productosFiltrados = productos.filter(p => 
    p.nombre_producto?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Panel de Administración</h2>
        <button className="btn btn-success rounded-pill px-4" onClick={() => setEsAgregando(true)}>+ Agregar Producto</button>
      </div>

      <input className="form-control mb-4 shadow-sm" placeholder="🔍 Buscar producto por nombre..." onChange={(e) => setBusqueda(e.target.value)} />
      
      <div className="card border-0 shadow-sm rounded-4 p-3">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            {productosFiltrados.map(p => (
              <tr key={p.idproducto}>
                <td>{p.idproducto}</td>
                <td className="fw-medium">{p.nombre_producto}</td>
                <td>${parseFloat(p.precio || 0).toLocaleString()}</td>
                <td><span className="badge bg-warning text-dark">{p.stock}</span></td>
                <td>
                  <button className="btn btn-outline-primary btn-sm rounded-pill me-2" onClick={() => setProductoEditando(p)}>✏️ Editar</button>
                  <button className="btn btn-outline-danger btn-sm rounded-pill" onClick={() => eliminarProducto(p.idproducto)}>🗑️ Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL AGREGAR */}
      {esAgregando && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4 p-4">
              <h4 className="fw-bold mb-3">Nuevo Producto</h4>
              <form onSubmit={agregarProducto}>
                <label className="small text-muted fw-bold">Nombre</label>
                <input className="form-control mb-2" required onChange={(e) => setNuevoProducto({...nuevoProducto, nombre_producto: e.target.value})} value={nuevoProducto.nombre_producto} />
                <div className="row">
                  <div className="col-6"><label className="small text-muted fw-bold">Precio</label><input className="form-control mb-2" type="number" required onChange={(e) => setNuevoProducto({...nuevoProducto, precio: e.target.value})} value={nuevoProducto.precio} /></div>
                  <div className="col-6"><label className="small text-muted fw-bold">Stock</label><input className="form-control mb-2" type="number" required onChange={(e) => setNuevoProducto({...nuevoProducto, stock: e.target.value})} value={nuevoProducto.stock} /></div>
                </div>
                <label className="small text-muted fw-bold">ID Categoría</label>
                <input className="form-control mb-2" type="number" onChange={(e) => setNuevoProducto({...nuevoProducto, idcategoria: e.target.value})} value={nuevoProducto.idcategoria} />
                <label className="small text-muted fw-bold">URL Imagen</label>
                <input className="form-control mb-4" onChange={(e) => setNuevoProducto({...nuevoProducto, imagenes: e.target.value})} value={nuevoProducto.imagenes} />
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary rounded-pill">Guardar Nuevo Producto</button>
                  <button type="button" className="btn btn-light rounded-pill" onClick={() => setEsAgregando(false)}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDITAR */}
      {productoEditando && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4 p-4">
              <h4 className="fw-bold mb-3">Editar Producto</h4>
              <form onSubmit={guardarEdicion}>
                <label className="small text-muted fw-bold">Nombre</label>
                <input className="form-control mb-2" value={productoEditando.nombre_producto || ''} onChange={(e) => setProductoEditando({...productoEditando, nombre_producto: e.target.value})} />
                <div className="row">
                  <div className="col-6"><label className="small text-muted fw-bold">Precio</label><input className="form-control mb-2" value={productoEditando.precio || ''} onChange={(e) => setProductoEditando({...productoEditando, precio: e.target.value})} /></div>
                  <div className="col-6"><label className="small text-muted fw-bold">Stock</label><input className="form-control mb-2" value={productoEditando.stock || ''} onChange={(e) => setProductoEditando({...productoEditando, stock: e.target.value})} /></div>
                </div>
                <label className="small text-muted fw-bold">ID Categoría</label>
                <input className="form-control mb-2" type="number" value={productoEditando.idcategoria || ''} onChange={(e) => setProductoEditando({...productoEditando, idcategoria: e.target.value})} />
                <label className="small text-muted fw-bold">Descripción</label>
                <textarea className="form-control mb-2" value={productoEditando.descripcion || ''} onChange={(e) => setProductoEditando({...productoEditando, descripcion: e.target.value})} />
                <label className="small text-muted fw-bold">URL Imagen</label>
                <input className="form-control mb-4" value={productoEditando.imagenes || ''} onChange={(e) => setProductoEditando({...productoEditando, imagenes: e.target.value})} />
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary rounded-pill">Guardar Cambios</button>
                  <button type="button" className="btn btn-light rounded-pill" onClick={() => setProductoEditando(null)}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;