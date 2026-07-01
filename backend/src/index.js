import express from 'express';
import dotenv from 'dotenv';

// Importaciones adaptadas a tu barra lateral izquierda
import clientesRoutes from './routes/clientes.routes.js';
import productoRoutes from './routes/producto.routes.js';
import proveedoresRoutes from './routes/proveedores.routes.js';
import categoriasRoutes from './routes/categorias.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import rolesRoutes from './routes/roles.routes.js';
import ventaRoutes from './routes/venta.routes.js';
import detalleVentaRoutes from './routes/detalle_venta.routes.js';
import medioPagoRoutes from './routes/medio_pago.routes.js';
import transportadoraRoutes from './routes/transportadora.routes.js';
import registroEnvioRoutes from './routes/registro_envio.routes.js';
// 🆕 Las dos nuevas incorporaciones:
import detalleEnvioRoutes from './routes/detalle_envio.routes.js';
import productoProveedorRoutes from './routes/producto_proveedor.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Enlaces de la API
app.use('/api', clientesRoutes);
app.use('/api', productoRoutes);
app.use('/api', proveedoresRoutes);
app.use('/api', categoriasRoutes);
app.use('/api', usuariosRoutes);
app.use('/api', rolesRoutes);
app.use('/api', ventaRoutes);
app.use('/api', detalleVentaRoutes);
app.use('/api', medioPagoRoutes);
app.use('/api', transportadoraRoutes);
app.use('/api', registroEnvioRoutes);
// 🆕 Activamos los nuevos módulos en el servidor:
app.use('/api', detalleEnvioRoutes);
app.use('/api', productoProveedorRoutes);

// Mensaje en consola para verificar que todo corra melo
app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`✅ Servidor encendido en: http://localhost:${PORT}`);
    console.log(`🔒 Sistema de Seguridad JWT Activo en todas las rutas`);
    console.log(`==================================================`);
});
