import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
    // Buscamos el token en las cabeceras de la petición (Headers)
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Acceso denegado. No se proporcionó un token de seguridad.' });
    }

    try {
        // Quitamos la palabra 'Bearer ' si viene en el token de Postman
        const tokenLimpio = token.startsWith('Bearer ') ? token.slice(7) : token;
        
        // Verificamos el token con la palabra clave secreta de tu archivo .env
        const verificado = jwt.verify(tokenLimpio, process.env.JWT_SECRET || 'FirmaSecretaSena2026');
        
        req.usuario = verificado; // Guardamos los datos del usuario en la petición
        next(); // ¡Todo bien! Le damos permiso de pasar al controlador
    } catch (error) {
        res.status(401).json({ message: 'Token inválido o expirado.' });
    }
};