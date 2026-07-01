import { Router } from 'express';
import {
    getRegistrosEnvio,
    getRegistroEnvioById,
    createRegistroEnvio,
    updateRegistroEnvio,
    deleteRegistroEnvio
} from '../controllers/registro_envio.controller.js';

const router = Router();

// Endpoints para Registro de Envío
router.get('/registro-envio', getRegistrosEnvio);
router.get('/registro-envio/:id', getRegistroEnvioById);
router.post('/registro-envio', createRegistroEnvio);
router.put('/registro-envio/:id', updateRegistroEnvio);
router.delete('/registro-envio/:id', deleteRegistroEnvio);

export default router;