import { Router } from 'express';
import { 
    getUsuarios, 
    getUsuarioById, 
    createUsuario, 
    updateUsuario, 
    deleteUsuario,
    loginUsuario 
} from '../controllers/usuarios.controller.js';

// ✅ Importamos el nombre REAL de tu función con llaves
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Rutas del CRUD de usuarios protegidas con tu middleware real
router.get('/usuarios', verificarToken, getUsuarios);
router.post('/usuarios', createUsuario);
router.post('/usuarios/login', loginUsuario);

// Ruta para buscar un usuario específico por ID en Postman
router.get('/usuarios/:id', verificarToken, getUsuarioById); 

router.put('/usuarios/:id', verificarToken, updateUsuario);
router.delete('/usuarios/:id', verificarToken, deleteUsuario);

export default router;