import { Router } from 'express';
import { getRoles, createRol, updateRol, deleteRol } from '../controllers/roles.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';
const router = Router();
router.get('/roles', verificarToken, getRoles);
router.post('/roles', verificarToken, createRol);
router.put('/roles/:id', verificarToken, updateRol);
router.delete('/roles/:id', verificarToken, deleteRol);
export default router;