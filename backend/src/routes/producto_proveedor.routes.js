import { Router } from 'express';
import { 
    getProductosProveedores, 
    createProductoProveedor,
    deleteProductoProveedor
} from '../controllers/producto_proveedor.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js'; // Tu escudo 🔒

const router = Router();

router.get('/producto-proveedor', verificarToken, getProductosProveedores);
router.post('/producto-proveedor', verificarToken, createProductoProveedor);
router.delete('/producto-proveedor/:idproducto/:idproveedor', verificarToken, deleteProductoProveedor);

export default router;
