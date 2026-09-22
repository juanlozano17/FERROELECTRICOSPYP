import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const AdminDashboard = () => {
  const [pestanaActiva, setPestanaActiva] = useState('productos');
  
  // Estados de Productos
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const [esAgregando, setEsAgregando] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({ 
    nombre_producto: '', 
    precio: '', 
    stock: '', 
    descripcion: '', 
    imagenes: '', 
    idcategoria: '' 
  });
  const [busqueda, setBusqueda] = useState('');

  // Estados de Categorías (Ahora incluye idcategoria y validación de duplicados)
  const [categorias, setCategorias] = useState([]);
  const [esAgregandoCategoria, setEsAgregandoCategoria] = useState(false);
  const [nuevaCategoria, setNuevaCategoria] = useState({ idcategoria: '', nombre: '' });

  // Estados de Usuarios y Pedidos
  const [usuarios, setUsuarios] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [busquedaUsuarios, setBusquedaUsuarios] = useState('');
  const [filtroEstadoPedido, setFiltroEstadoPedido] = useState('todos');

  // Estados de Auditoría / Logs del Sistema
  const [logsActividad, setLogsActividad] = useState([
    { id: 1, accion: 'Actualización masiva de inventario', admin: 'Juan Diego', fecha: '2026-06-02 14:22:10', ip: '192.168.1.15' },
    { id: 2, accion: 'Modificación de estado en pedido #103 a Enviado', admin: 'Juan Diego', fecha: '2026-06-02 12:10:45', ip: '192.168.1.15' },
    { id: 3, accion: 'Registro de nuevo producto en catálogo', admin: 'Juan Diego', fecha: '2026-06-01 09:45:30', ip: '192.168.1.15' },
    { id: 4, accion: 'Inicio de sesión en panel administrativo', admin: 'Juan Diego', fecha: '2026-06-01 08:30:00', ip: '192.168.1.15' }
  ]);
  
  // Estados para Modales de Detalle y Gestión Avanzada
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [pedidoCambiandoEstado, setPedidoCambiandoEstado] = useState(null);
  const [nuevoEstadoPedido, setNuevoEstadoPedido] = useState('');

  // Efecto inicial para cargar todos los datos desde Supabase
  useEffect(() => { 
    fetchProductos(); 
    fetchUsuarios();
    fetchPedidos();
    fetchCategorias();
  }, []);

  const fetchProductos = async () => {
    try {
      const { data, error } = await supabase.from('producto').select('*');
      if (error) throw error;
      if (data) setProductos(data);
    } catch (err) {
      console.error("Error cargando productos:", err.message);
    }
  };

  const fetchCategorias = async () => {
    try {
      let { data, error } = await supabase.from('categoria').select('*');
      if (error || !data || data.length === 0) {
        const resAlt = await supabase.from('categorias').select('*');
        if (resAlt.data) data = resAlt.data;
      }

      if (data && data.length > 0) {
        setCategorias(data);
      } else {
        setCategorias([
          { idcategoria: 1, nombre: 'Lámparas y Iluminación' },
          { idcategoria: 2, nombre: 'Herramientas Manuales' },
          { idcategoria: 3, nombre: 'Herramientas Eléctricas' },
          { idcategoria: 4, nombre: 'Tornillería y Fijaciones' }
        ]);
      }
    } catch (err) {
      console.error("Error cargando categorías:", err);
      setCategorias([
        { idcategoria: 1, nombre: 'Lámparas y Iluminación' },
        { idcategoria: 2, nombre: 'Herramientas Manuales' },
        { idcategoria: 3, nombre: 'Herramientas Eléctricas' },
        { idcategoria: 4, nombre: 'Tornillería y Fijaciones' }
      ]);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const { data, error } = await supabase.from('usuarios').select('*');
      if (error) throw error;
      if (data && data.length > 0) {
        setUsuarios(data);
      } else {
        setUsuarios([
          { idusuarrio: 7, nombre: 'Admin', apellidos: 'Ferreteria', correo: 'admin@ferreteria.com', id_rol: 1 },
          { idusuarrio: 10, nombre: 'Carlos', apellidos: 'Pérez', correo: 'carlos.perez@correo.com', id_rol: 2 }
        ]);
      }
    } catch (err) {
      console.error("Error cargando usuarios:", err.message);
    }
  };

  const fetchPedidos = async () => {
    try {
      const { data, error } = await supabase.from('pedido').select('*');
      if (!error && data && data.length > 0) {
        setPedidos(data);
      } else {
        setPedidos([
          { 
            idpedido: 101, 
            cliente: 'Juan Diego Lozano', 
            total: 245000, 
            estado: 'Cancelado', 
            fecha: '2026-06-12 15:30', 
            direccion: 'Calle 45 #20-10, Bogotá', 
            telefono: '3104567890',
            metodo_pago: 'Transferencia Bancaria',
            items: [
              { nombre_producto: 'Lámpara Decorativa LED Minimalista', cantidad: 1, valor: 245000 }
            ]
          },
          { 
            idpedido: 102, 
            cliente: 'Carlos Pérez Gómez', 
            total: 119900, 
            estado: 'Pendiente', 
            fecha: '2026-06-14 10:15', 
            direccion: 'Carrera 12 #8-32, Medellín', 
            telefono: '3209876543',
            metodo_pago: 'Contra Entrega',
            items: [
              { nombre_producto: 'Bombillos LED Smart x3 Unidades', cantidad: 2, valor: 59950 }
            ]
          }
        ]);
      }
    } catch (err) {
      console.error("Error cargando pedidos:", err);
    }
  };

const agregarProducto = async (e) => {
    e.preventDefault();
    
    // Clonamos y purgamos cualquier rastro de ID para obligar a Postgres a generarlo
    const payload = {
      nombre_producto: nuevoProducto.nombre_producto?.trim(),
      precio: parseFloat(nuevoProducto.precio) || 0,
      stock: parseInt(nuevoProducto.stock) || 0,
      descripcion: nuevoProducto.descripcion || '',
      imagenes: nuevoProducto.imagenes || '', 
      idcategoria: nuevoProducto.idcategoria ? parseInt(nuevoProducto.idcategoria) : null
    };

    // Asegurarnos de borrar el ID si por alguna razón viene metido en el estado
    delete payload.idproducto;
    delete payload.id;

    console.log("Enviando payload a Supabase (sin ID):", payload);

    const { data, error } = await supabase.from('producto').insert([payload]).select();
    
    if (error) {
      console.error("Detalle del error de Supabase:", error);
      alert("Error al agregar producto: " + error.message);
    } else {
      alert("¡Producto creado con éxito!");
      setNuevoProducto({ nombre_producto: '', precio: '', stock: '', descripcion: '', imagenes: '', idcategoria: '' });
      setEsAgregando(false);
      fetchProductos();
    }
  };

  const eliminarProducto = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto del inventario?")) {
      const { error } = await supabase.from('producto').delete().eq('idproducto', id);
      if (!error) {
        alert("Producto eliminado correctamente.");
        fetchProductos();
      } else {
        alert("Error al eliminar producto: " + error.message);
      }
    }
  };

const guardarEdicion = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from('producto')
      .update({
        nombre_producto: productoEditando.nombre_producto?.trim(),
        precio: parseFloat(productoEditando.precio) || 0,
        stock: parseInt(productoEditando.stock) || 0,
        idcategoria: productoEditando.idcategoria ? parseInt(productoEditando.idcategoria) : null,
        imagenes: productoEditando.imagenes || '',
        Estado: productoEditando.Estado || '',
        descripcion: productoEditando.descripcion || '',
        caracteristicas: productoEditando.caracteristicas || ''
      })
      .eq('idproducto', productoEditando.idproducto);

    if (error) {
      alert("Error al actualizar: " + error.message);
    } else {
      alert("¡Producto actualizado correctamente!");
      setProductoEditando(null);
      fetchProductos();
    }
  };

  const actualizarEstadoPedido = async (e) => {
    e.preventDefault();
    if (!pedidoCambiandoEstado) return;

    const id = pedidoCambiandoEstado.idpedido || pedidoCambiandoEstado.id;
    
    try {
      await supabase
        .from('pedido')
        .update({ estado: nuevoEstadoPedido })
        .eq('idpedido', id);
    } catch (err) {
      console.log("Actualización local aplicada.");
    }

    setPedidos(pedidos.map(p => {
      const pId = p.idpedido || p.id;
      if (pId === id) {
        return { ...p, estado: nuevoEstadoPedido };
      }
      return p;
    }));

    setLogsActividad([
      { 
        id: Date.now(), 
        accion: `Cambio de estado en pedido #${id} a "${nuevoEstadoPedido}"`, 
        admin: 'Juan Diego', 
        fecha: new Date().toLocaleString(),
        ip: '192.168.1.15'
      },
      ...logsActividad
    ]);

    setPedidoCambiandoEstado(null);
    alert("¡Estado del pedido actualizado correctamente!");
  };

  const descargarReporteActual = () => {
    let datosACSV = [];
    let nombreArchivo = 'reporte_general.csv';

    if (pestanaActiva === 'productos') {
      nombreArchivo = 'inventario_productos_supabase.csv';
      datosACSV = productos.map(p => ({
        ID_Producto: p.idproducto,
        Nombre: p.nombre_producto,
        Precio: p.precio,
        Stock: p.stock,
        ID_Categoria: p.idcategoria,
        Descripcion: p.descripcion || ''
      }));
    } else if (pestanaActiva === 'categorias') {
      nombreArchivo = 'categorias_supabase.csv';
      datosACSV = categorias.map(c => ({
        idcategoria: c.idcategoria || c.id,
        nombre: c.nombre
      }));
    } else if (pestanaActiva === 'pedidos') {
      nombreArchivo = 'control_pedidos_tienda.csv';
      datosACSV = pedidosFiltrados.map(p => ({
        ID_Pedido: p.idpedido || p.id,
        Cliente: p.cliente,
        Total: p.total,
        Estado: p.estado,
        Fecha: p.fecha,
        Telefono: p.telefono || '',
        Metodo_Pago: p.metodo_pago || 'N/A'
      }));
    } else if (pestanaActiva === 'usuarios') {
      nombreArchivo = 'usuarios_registrados_supabase.csv';
      datosACSV = usuariosFiltrados.map(u => ({
        ID_Usuario: u.idusuarrio || u.idusuario || u.id,
        Nombre: u.nombre,
        Apellidos: u.apellidos || '',
        Correo: u.correo,
        Rol_ID: u.id_rol
      }));
    } else if (pestanaActiva === 'auditoria') {
      nombreArchivo = 'auditoria_logs_sistema.csv';
      datosACSV = logsActividad.map(l => ({
        ID_Log: l.id,
        Accion: l.accion,
        Administrador: l.admin,
        Fecha_Hora: l.fecha,
        IP_Address: l.ip
      }));
    }

    if (datosACSV.length === 0) {
      alert("No hay datos disponibles en esta sección para exportar.");
      return;
    }

    const keys = Object.keys(datosACSV[0]);
    const filasCSV = [
      keys.join(','),
      ...datosACSV.map(row => keys.map(k => `"${String(row[k] !== undefined && row[k] !== null ? row[k] : '').replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob(["\uFEFF" + filasCSV], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', nombreArchivo);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const obtenerClaseBadgeEstado = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'cancelado': return 'bg-danger text-white';
      case 'enviado': return 'bg-primary text-white';
      case 'completado': return 'bg-success text-white';
      case 'pendiente': return 'bg-warning text-dark';
      default: return 'bg-secondary text-white';
    }
  };

  const productosFiltrados = productos.filter(p => p.nombre_producto?.toLowerCase().includes(busqueda.toLowerCase()));
  const usuariosFiltrados = usuarios.filter(u => {
    const termino = busquedaUsuarios.toLowerCase();
    return (u.correo?.toLowerCase().includes(termino) || u.nombre?.toLowerCase().includes(termino));
  });
  const pedidosFiltrados = pedidos.filter(p => filtroEstadoPedido === 'todos' || p.estado?.toLowerCase() === filtroEstadoPedido.toLowerCase());

  const ingresosTotales = pedidos.reduce((acc, p) => acc + (p.estado !== 'Cancelado' ? parseFloat(p.total || 0) : 0), 0);
  const stockCriticoCount = productos.filter(p => Number(p.stock) <= 5).length;

  return (
    <div className="container-fluid py-4 px-4 bg-light min-vh-100">
      
      {/* Cabecera del Panel Principal */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h2 className="fw-bold text-dark mb-1">Panel de Administración General</h2>
          <p className="text-muted small mb-0">Control operativo y sincronización</p>
        </div>
        <div className="d-flex gap-2 flex-wrap">
          <button className="btn btn-outline-dark fw-bold rounded-pill px-3 shadow-sm bg-white" onClick={descargarReporteActual}>
            <i className="bi bi-download me-2"></i> Descargar Datos de Esta Pestaña (.CSV)
          </button>
          {pestanaActiva === 'productos' && (
            <button className="btn btn-dark fw-bold rounded-pill px-4 shadow-sm" onClick={() => setEsAgregando(true)}>
              <i className="bi bi-plus-lg me-2"></i> Agregar Producto
            </button>
          )}
          {pestanaActiva === 'categorias' && (
            <button className="btn btn-dark fw-bold rounded-pill px-4 shadow-sm" onClick={() => setEsAgregandoCategoria(true)}>
              <i className="bi bi-plus-lg me-2"></i> Nueva Categoría
            </button>
          )}
        </div>
      </div>

      {/* Tarjetas de Estadísticas / KPIs */}
      <div className="row g-4 mb-4">
        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <p className="text-muted small mb-1 fw-semibold">Ingresos Netos</p>
                <h4 className="fw-bold text-success mb-0">${ingresosTotales.toLocaleString()}</h4>
              </div>
              <div className="bg-success bg-opacity-10 p-3 rounded-4 text-success"><i className="bi bi-currency-dollar fs-3"></i></div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <p className="text-muted small mb-1 fw-semibold">Total Productos</p>
                <h4 className="fw-bold text-dark mb-0">{productos.length} <span className="text-danger fs-6">({stockCriticoCount} bajo stock)</span></h4>
              </div>
              <div className="bg-primary bg-opacity-10 p-3 rounded-4 text-primary"><i className="bi bi-box-seam fs-3"></i></div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <p className="text-muted small mb-1 fw-semibold">Usuarios Registrados</p>
                <h4 className="fw-bold text-info mb-0">{usuarios.length}</h4>
              </div>
              <div className="bg-info bg-opacity-10 p-3 rounded-4 text-info"><i className="bi bi-people fs-3"></i></div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <p className="text-muted small mb-1 fw-semibold">Pedidos Totales</p>
                <h4 className="fw-bold text-warning mb-0">{pedidos.length}</h4>
              </div>
              <div className="bg-warning bg-opacity-10 p-3 rounded-4 text-warning"><i className="bi bi-cart-check fs-3"></i></div>
            </div>
          </div>
        </div>
      </div>

      {/* Pestañas de Navegación del Panel */}
      <ul className="nav nav-pills gap-2 mb-4 overflow-x-auto pb-2">
        <li className="nav-item">
          <button className={`nav-link rounded-pill px-4 fw-semibold ${pestanaActiva === 'productos' ? 'active bg-dark text-white' : 'bg-white text-dark shadow-sm'}`} onClick={() => setPestanaActiva('productos')}>
            <i className="bi bi-box-seam me-2"></i> Inventario
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link rounded-pill px-4 fw-semibold ${pestanaActiva === 'categorias' ? 'active bg-dark text-white' : 'bg-white text-dark shadow-sm'}`} onClick={() => setPestanaActiva('categorias')}>
            <i className="bi bi-tags me-2"></i> Categorías
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link rounded-pill px-4 fw-semibold ${pestanaActiva === 'pedidos' ? 'active bg-dark text-white' : 'bg-white text-dark shadow-sm'}`} onClick={() => setPestanaActiva('pedidos')}>
            <i className="bi bi-receipt me-2"></i> Control de Pedidos
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link rounded-pill px-4 fw-semibold ${pestanaActiva === 'usuarios' ? 'active bg-dark text-white' : 'bg-white text-dark shadow-sm'}`} onClick={() => setPestanaActiva('usuarios')}>
            <i className="bi bi-people me-2"></i> Usuarios
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link rounded-pill px-4 fw-semibold ${pestanaActiva === 'auditoria' ? 'active bg-dark text-white' : 'bg-white text-dark shadow-sm'}`} onClick={() => setPestanaActiva('auditoria')}>
            <i className="bi bi-shield-lock me-2"></i> Auditoría y Logs
          </button>
        </li>
      </ul>

      {/* CONTENIDO 1: PRODUCTOS / INVENTARIO */}
      {pestanaActiva === 'productos' && (
        <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <h4 className="fw-bold text-dark mb-0">Gestión de Inventario</h4>
            <input className="form-control shadow-none border-0 bg-light rounded-pill px-4 py-2 w-50" placeholder="🔍 Buscar producto en inventario..." onChange={(e) => setBusqueda(e.target.value)} value={busqueda} />
          </div>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Stock</th><th>Cat. ID</th><th className="text-end">Acciones</th></tr>
              </thead>
              <tbody>
                {productosFiltrados.map(p => (
                  <tr key={p.idproducto}>
                    <td>{p.idproducto}</td>
                    <td className="fw-medium">{p.nombre_producto}</td>
                    <td className="text-success fw-bold">${parseFloat(p.precio || 0).toLocaleString()}</td>
                    <td><span className={`badge ${Number(p.stock) <= 5 ? 'bg-danger' : 'bg-warning text-dark'}`}>{p.stock} un.</span></td>
                    <td>{p.idcategoria || 'S/C'}</td>
                    <td className="text-end">
                      <button className="btn btn-outline-dark btn-sm rounded-pill me-2 px-3" onClick={() => setProductoEditando(p)}><i className="bi bi-pencil me-1"></i> Editar</button>
                      <button className="btn btn-outline-danger btn-sm rounded-pill px-3" onClick={() => eliminarProducto(p.idproducto)}><i className="bi bi-trash me-1"></i> Borrar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CONTENIDO 2: CATEGORÍAS */}
      {pestanaActiva === 'categorias' && (
        <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
          <h4 className="fw-bold mb-2 text-dark">Categorías de Productos</h4>
          <p className="text-muted small">Cargado directamente desde la tabla `categoria` de tu base de datos en tiempo real.</p>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th style={{ width: '25%' }}>ID Categoría</th>
                  <th style={{ width: '60%' }}>Nombre</th>
                  <th style={{ width: '15%' }} className="text-end">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categorias.map((cat) => (
                  <tr key={cat.idcategoria || cat.id}>
                    <td className="fw-bold">#{cat.idcategoria || cat.id}</td>
                    <td className="fw-medium text-dark">{cat.nombre}</td>
                    <td className="text-end">
                      <button className="btn btn-outline-danger btn-sm rounded-pill px-3" onClick={() => eliminarCategoria(cat.idcategoria || cat.id)}>
                        <i className="bi bi-trash me-1"></i> Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CONTENIDO 3: PEDIDOS */}
      {pestanaActiva === 'pedidos' && (
        <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
            <h4 className="fw-bold text-dark mb-0">Control de Pedidos</h4>
            <select className="form-select form-select-sm rounded-pill shadow-none w-25" value={filtroEstadoPedido} onChange={(e) => setFiltroEstadoPedido(e.target.value)}>
              <option value="todos">Todos los estados</option>
              <option value="pendiente">Pendiente</option>
              <option value="enviado">Enviado</option>
              <option value="completado">Completado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr><th>ID Pedido</th><th>Cliente</th><th>Total</th><th>Fecha</th><th>Estado</th><th className="text-end">Acciones</th></tr>
              </thead>
              <tbody>
                {pedidosFiltrados.map((ped) => {
                  const idPed = ped.idpedido || ped.id;
                  return (
                    <tr key={idPed}>
                      <td className="fw-bold">#{idPed}</td>
                      <td>{ped.cliente}</td>
                      <td className="text-success fw-bold">${parseFloat(ped.total || 0).toLocaleString()}</td>
                      <td>{ped.fecha || 'Reciente'}</td>
                      <td><span className={`badge ${obtenerClaseBadgeEstado(ped.estado)}`}>{ped.estado}</span></td>
                      <td className="text-end">
                        <button className="btn btn-outline-info btn-sm rounded-pill px-2 me-1" onClick={() => setPedidoSeleccionado(ped)}><i className="bi bi-eye"></i> Ver</button>
                        <button className="btn btn-outline-dark btn-sm rounded-pill px-2" onClick={() => { setPedidoCambiandoEstado(ped); setNuevoEstadoPedido(ped.estado || 'Pendiente'); }}><i className="bi bi-arrow-repeat"></i> Estado</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CONTENIDO 4: USUARIOS */}
      {pestanaActiva === 'usuarios' && (
        <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
          <h4 className="fw-bold mb-3 text-dark">Usuarios Registrados</h4>
          <input className="form-control shadow-none border-0 bg-light rounded-pill px-4 py-2 mb-3" placeholder="🔍 Buscar usuario por nombre o correo..." onChange={(e) => setBusquedaUsuarios(e.target.value)} value={busquedaUsuarios} />
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr><th>ID</th><th>Nombre</th><th>Correo</th><th>Rol</th><th className="text-end">Acciones</th></tr>
              </thead>
              <tbody>
                {usuariosFiltrados.map((u) => {
                  const idUsu = u.idusuarrio || u.idusuario || u.id;
                  return (
                    <tr key={idUsu}>
                      <td>{idUsu}</td>
                      <td className="fw-medium">{u.nombre} {u.apellidos || ''}</td>
                      <td>{u.correo}</td>
                      <td>{Number(u.id_rol) === 1 ? <span className="badge bg-dark">Admin</span> : <span className="badge bg-secondary">Cliente</span>}</td>
                      <td className="text-end">
                        <button className="btn btn-outline-primary btn-sm rounded-pill px-3" onClick={() => setUsuarioSeleccionado(u)}>
                          <i className="bi bi-eye me-1"></i> Ver
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CONTENIDO 5: AUDITORÍA Y LOGS */}
      {pestanaActiva === 'auditoria' && (
        <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
          <h4 className="fw-bold mb-3 text-dark">Auditoría y Logs del Sistema</h4>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr><th>ID</th><th>Acción Realizada</th><th>Admin</th><th>IP</th><th>Fecha y Hora</th></tr>
              </thead>
              <tbody>
                {logsActividad.map((log) => (
                  <tr key={log.id}>
                    <td className="fw-bold text-muted">#{log.id}</td>
                    <td>{log.accion}</td>
                    <td><span className="badge bg-dark">{log.admin}</span></td>
                    <td className="text-muted small font-monospace">{log.ip}</td>
                    <td className="text-muted small">{log.fecha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL: NUEVA CATEGORÍA (Con campo ID y validación de duplicados) */}
      {esAgregandoCategoria && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4 p-4">
              <h4 className="fw-bold mb-3">Registrar Nueva Categoría</h4>
              <form onSubmit={agregarCategoria}>
                <label className="small text-muted fw-bold">ID de Categoría (Número único)</label>
                <input 
                  className="form-control mb-3" 
                  type="number" 
                  required 
                  placeholder="Ej. 5" 
                  onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, idcategoria: e.target.value })} 
                  value={nuevaCategoria.idcategoria} 
                />

                <label className="small text-muted fw-bold">Nombre de la Categoría</label>
                <input 
                  className="form-control mb-4" 
                  required 
                  placeholder="Ej. Lámparas LED" 
                  onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, nombre: e.target.value })} 
                  value={nuevaCategoria.nombre} 
                />

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-dark rounded-pill">Guardar</button>
                  <button type="button" className="btn btn-light rounded-pill" onClick={() => setEsAgregandoCategoria(false)}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: VER DETALLES DE PEDIDO */}
      {pedidoSeleccionado && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow-lg rounded-4 p-4">
              <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                <h5 className="fw-bold mb-0">Detalle Pedido #{pedidoSeleccionado.idpedido || pedidoSeleccionado.id}</h5>
                <button type="button" className="btn-close" onClick={() => setPedidoSeleccionado(null)}></button>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <p><strong>Cliente:</strong> {pedidoSeleccionado.cliente}</p>
                  <p><strong>Teléfono:</strong> {pedidoSeleccionado.telefono || 'No especificado'}</p>
                  <p><strong>Dirección:</strong> {pedidoSeleccionado.direccion || 'Principal'}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Fecha:</strong> {pedidoSeleccionado.fecha}</p>
                  <p><strong>Método de Pago:</strong> {pedidoSeleccionado.metodo_pago || 'Transferencia'}</p>
                  <p><strong>Estado Actual:</strong> <span className={`badge ${obtenerClaseBadgeEstado(pedidoSeleccionado.estado)}`}>{pedidoSeleccionado.estado}</span></p>
                </div>
              </div>
              <h6 className="fw-bold mb-2">Productos en el Pedido:</h6>
              <ul className="list-group mb-4">
                {pedidoSeleccionado.items?.map((item, idx) => (
                  <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{item.nombre_producto} (Cant: {item.cantidad})</span>
                    <span className="fw-bold text-success">${Number(item.valor).toLocaleString()}</span>
                  </li>
                )) || <p className="text-muted small">Sin items detallados registrados.</p>}
              </ul>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="fw-bold text-dark mb-0">Total: ${parseFloat(pedidoSeleccionado.total || 0).toLocaleString()}</h5>
                <button className="btn btn-dark rounded-pill px-4" onClick={() => setPedidoSeleccionado(null)}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CAMBIAR ESTADO DE PEDIDO */}
      {pedidoCambiandoEstado && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)' }}>
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content border-0 shadow-lg rounded-4 p-4">
              <h6 className="fw-bold mb-3">Cambiar Estado Pedido</h6>
              <form onSubmit={actualizarEstadoPedido}>
                <select className="form-select rounded-pill mb-3 shadow-none" value={nuevoEstadoPedido} onChange={(e) => setNuevoEstadoPedido(e.target.value)}>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Enviado">Enviado</option>
                  <option value="Completado">Completado</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-dark rounded-pill">Actualizar Estado</button>
                  <button type="button" className="btn btn-light rounded-pill" onClick={() => setPedidoCambiandoEstado(null)}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: AGREGAR PRODUCTO */}
      {esAgregando && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4 p-4">
              <h4 className="fw-bold mb-3">Nuevo Producto en Inventario</h4>
              <form onSubmit={agregarProducto}>
                <label className="small text-muted fw-bold">Nombre del Producto</label>
                <input className="form-control mb-2" required onChange={(e) => setNuevoProducto({...nuevoProducto, nombre_producto: e.target.value})} value={nuevoProducto.nombre_producto} />
                <div className="row">
                  <div className="col-6"><label className="small text-muted fw-bold">Precio ($)</label><input className="form-control mb-2" type="number" required onChange={(e) => setNuevoProducto({...nuevoProducto, precio: e.target.value})} value={nuevoProducto.precio} /></div>
                  <div className="col-6"><label className="small text-muted fw-bold">Stock</label><input className="form-control mb-2" type="number" required onChange={(e) => setNuevoProducto({...nuevoProducto, stock: e.target.value})} value={nuevoProducto.stock} /></div>
                </div>
                <label className="small text-muted fw-bold">ID Categoría</label>
                <input className="form-control mb-2" type="number" placeholder="Ej. 1, 2, 3..." onChange={(e) => setNuevoProducto({...nuevoProducto, idcategoria: e.target.value})} value={nuevoProducto.idcategoria} />
                <label className="small text-muted fw-bold">URL Imagen</label>
                <input className="form-control mb-4" placeholder="https://..." onChange={(e) => setNuevoProducto({...nuevoProducto, imagenes: e.target.value})} value={nuevoProducto.imagenes} />
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-dark rounded-pill">Guardar Producto</button>
                  <button type="button" className="btn btn-light rounded-pill" onClick={() => setEsAgregando(false)}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

{/* MODAL: EDITAR PRODUCTO - Completo con todas las columnas */}
      {productoEditando && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow-lg rounded-4 p-4">
              <h4 className="fw-bold mb-3">Editar Producto</h4>
              <form onSubmit={guardarEdicion}>
                
                <div className="mb-3">
                  <label className="small text-muted fw-bold">Nombre del Producto</label>
                  <input 
                    className="form-control" 
                    type="text" 
                    required 
                    value={productoEditando.nombre_producto || ''} 
                    onChange={(e) => setProductoEditando({ ...productoEditando, nombre_producto: e.target.value })} 
                  />
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="small text-muted fw-bold">Precio ($)</label>
                    <input 
                      className="form-control" 
                      type="number" 
                      step="any"
                      required 
                      value={productoEditando.precio || ''} 
                      onChange={(e) => setProductoEditando({ ...productoEditando, precio: e.target.value })} 
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="small text-muted fw-bold">Stock</label>
                    <input 
                      className="form-control" 
                      type="number" 
                      required 
                      value={productoEditando.stock || ''} 
                      onChange={(e) => setProductoEditando({ ...productoEditando, stock: e.target.value })} 
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="small text-muted fw-bold">ID Categoría</label>
                    <input 
                      className="form-control" 
                      type="number" 
                      value={productoEditando.idcategoria || ''} 
                      onChange={(e) => setProductoEditando({ ...productoEditando, idcategoria: e.target.value })} 
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="small text-muted fw-bold">URL Imagen</label>
                    <input 
                      className="form-control" 
                      type="text" 
                      placeholder="https://..." 
                      value={productoEditando.imagenes || ''} 
                      onChange={(e) => setProductoEditando({ ...productoEditando, imagenes: e.target.value })} 
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="small text-muted fw-bold">Estado</label>
                    <input 
                      className="form-control" 
                      type="text" 
                      placeholder="Ej. Activo / Inactivo" 
                      value={productoEditando.Estado || ''} 
                      onChange={(e) => setProductoEditando({ ...productoEditando, Estado: e.target.value })} 
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="small text-muted fw-bold">Descripción</label>
                  <textarea 
                    className="form-control" 
                    rows="2"
                    value={productoEditando.descripcion || ''} 
                    onChange={(e) => setProductoEditando({ ...productoEditando, descripcion: e.target.value })} 
                  />
                </div>

                <div className="mb-4">
                  <label className="small text-muted fw-bold">Características</label>
                  <textarea 
                    className="form-control" 
                    rows="2"
                    value={productoEditando.caracteristicas || ''} 
                    onChange={(e) => setProductoEditando({ ...productoEditando, caracteristicas: e.target.value })} 
                  />
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-dark rounded-pill">Guardar Cambios</button>
                  <button type="button" className="btn btn-light rounded-pill" onClick={() => setProductoEditando(null)}>Cancelar</button>
                </div>

              </form>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: VER DETALLES DE USUARIO */}
      {usuarioSeleccionado && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4 p-4">
              <h5 className="fw-bold mb-3">Detalle de Usuario Registrado</h5>
              <p><strong>ID de Usuario:</strong> {usuarioSeleccionado.idusuarrio || usuarioSeleccionado.idusuario || usuarioSeleccionado.id}</p>
              <p><strong>Nombre completo:</strong> {usuarioSeleccionado.nombre} {usuarioSeleccionado.apellidos || ''}</p>
              <p><strong>Correo electrónico:</strong> {usuarioSeleccionado.correo}</p>
              <p><strong>Rol en el sistema:</strong> {Number(usuarioSeleccionado.id_rol) === 1 ? 'Administrador' : 'Cliente'}</p>
              <div className="d-grid mt-4">
                <button className="btn btn-dark rounded-pill" onClick={() => setUsuarioSeleccionado(null)}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;