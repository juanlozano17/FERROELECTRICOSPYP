import { Router } from 'express';
import { 
    getProductos, 
    getProductoById, 
    createProducto, 
    updateProducto, 
    deleteProducto 
} from '../controllers/producto.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js'; // 1. Importamos el guardián

const router = Router();

// Endpoints del CRUD para Productos
router.get('/productos', verificarToken, getProductos);       // 2. Protegido 🔒
router.get('/productos/:id', verificarToken, getProductoById); // 2. Protegido 🔒
router.post('/productos', verificarToken, createProducto);     // 2. Protegido 🔒
router.put('/productos/:id', verificarToken, updateProducto);   // 2. Protegido 🔒
router.delete('/productos/:id', verificarToken, deleteProducto); // 2. Protegido 🔒

export default router;