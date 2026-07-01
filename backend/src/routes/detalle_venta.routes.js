import { Router } from 'express';
import {
    getDetallesVenta,
    getDetalleVentaById,
    createDetalleVenta,
    updateDetalleVenta,
    deleteDetalleVenta
} from '../controllers/detalle_venta.controller.js';

const router = Router();

// Endpoints para Detalles de Venta
router.get('/detalles-venta', getDetallesVenta);
router.get('/detalles-venta/:id', getDetalleVentaById);
router.post('/detalles-venta', createDetalleVenta);
router.put('/detalles-venta/:id', updateDetalleVenta);
router.delete('/detalles-venta/:id', deleteDetalleVenta);

export default router;