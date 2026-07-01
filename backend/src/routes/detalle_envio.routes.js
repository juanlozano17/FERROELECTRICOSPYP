import { Router } from 'express';
import { 
    getDetallesEnvio, 
    getDetalleEnvioById, 
    createDetalleEnvio, 
    updateDetalleEnvio 
} from '../controllers/detalle_envio.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js'; // El escudo 🔒

const router = Router();

router.get('/detalle-envio', verificarToken, getDetallesEnvio);
router.get('/detalle-envio/:id', verificarToken, getDetalleEnvioById);
router.post('/detalle-envio', verificarToken, createDetalleEnvio);
router.put('/detalle-envio/:id', verificarToken, updateDetalleEnvio);

export default router;
