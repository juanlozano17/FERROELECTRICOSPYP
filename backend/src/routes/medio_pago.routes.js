import { Router } from 'express';
import {
    getMediosPago,
    getMedioPagoById,
    createMedioPago,
    updateMedioPago,
    deleteMedioPago
} from '../controllers/medio_pago.controller.js';

const router = Router();

// Endpoints para Medio de Pago
router.get('/medios-pago', getMediosPago);
router.get('/medios-pago/:id', getMedioPagoById);
router.post('/medios-pago', createMedioPago);
router.put('/medios-pago/:id', updateMedioPago);
router.delete('/medios-pago/:id', deleteMedioPago);

export default router;