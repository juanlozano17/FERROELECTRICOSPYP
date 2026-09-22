import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api/v1',
    withCredentials: true // ¡Vital para que el navegador envíe y reciba la cookie de sesión automáticamente!
});

// Nota: Ya no se requiere el interceptor para leer el token del localStorage, 
// ya que las cookies viajan de forma segura y automática en cada petición.

export default api;