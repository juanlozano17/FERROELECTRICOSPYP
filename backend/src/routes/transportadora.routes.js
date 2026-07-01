import { Router } from 'express';
import {
    getTransportadoras,
    getTransportadoraById,
    createTransportadora,
    updateTransportadora,
    deleteTransportadora
} from '../controllers/transportadora.controller.js';

const router = Router();

// Endpoints para Transportadoras
router.get('/transportadoras', getTransportadoras);
router.get('/transportadoras/:id', getTransportadoraById);
router.post('/transportadoras', createTransportadora);
router.put('/transportadoras/:id', updateTransportadora);
router.delete('/transportadoras/:id', deleteTransportadora);

export default router;