import React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios'; // 🆕 Importamos tu instancia de Axios configurada
import RegistroForm from './Register';

const Login = ({ setUserLogin, userLogin, handleRegistro, setNuevoUsuario, nuevoUsuario }) => {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // 👈 Esto frena la recarga por defecto del formulario
    console.log("Intentando iniciar sesión..."); // Añade este console.log para probar en F12 -> Console
    
    try {
     const response = await api.post('/usuarios/login', {
     correo: userLogin.email,
      contrasena: userLogin.password
    });

      if (response.data.status === 'success') {
        const usuario = response.data.usuario;
        
        // 2. Guardamos datos visuales en el localStorage para la interfaz
        localStorage.setItem('userRole', usuario.id_rol);
        localStorage.setItem('userName', usuario.nombre);
        localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));

        // 3. Redireccionamos según el rol
        if (usuario.id_rol === 1) {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
        window.location.reload();
      }
      
    } catch (err) {
      console.error("Error al loguear:", err);
      alert(err.response?.data?.mensaje || "Credenciales incorrectas o error al intentar iniciar sesión");
    }
  };

  return (
    <div className="auth-wrapper d-flex align-items-center justify-content-center bg-light" style={{ minHeight: '100vh' }}>
      <div className="d-flex flex-row overflow-hidden shadow-lg" style={{ maxWidth: '1000px', width: '95%', borderRadius: '40px', backgroundColor: '#fff' }}>
        
        <div className="form-section p-5 d-flex flex-column justify-content-center" style={{ flex: '1' }}>
          <div className="text-center mb-4">
            <img src="/logo-pyp.png" alt="Logo" className="logo-img" />
            <h2 className="login-title mt-3">Ferroeléctricos P&P</h2>
          </div>
          
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="auth-label ms-3 small fw-bold text-muted">CORREO ELECTRÓNICO</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 text-muted"><i className="bi bi-envelope"></i></span>
                <input 
                  type="email" 
                  className="auth-input form-control bg-light border-start-0 py-2 fs-6" 
                  required 
                  placeholder="correo@ejemplo.com"
                  value={userLogin.email || ''} 
                  onChange={(e) => setUserLogin({...userLogin, email: e.target.value})} 
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="auth-label ms-3 small fw-bold text-muted">CONTRASEÑA</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 text-muted"><i className="bi bi-lock"></i></span>
                <input 
                  type="password" 
                  className="auth-input form-control bg-light border-start-0 py-2 fs-6" 
                  required 
                  placeholder="••••••••"
                  value={userLogin.password || ''} 
                  onChange={(e) => setUserLogin({...userLogin, password: e.target.value})} 
                />
              </div>
            </div>
            <button type="submit" className="btn btn-dark w-100 py-3 fw-bold rounded-pill shadow-sm">Ingresar</button>
          </form>

          <div className="auth-footer text-center mt-4">
            <button type="button" className="btn btn-link register-link text-decoration-none fw-semibold text-muted" data-bs-toggle="modal" data-bs-target="#modalRegistro">
              ¿No tienes cuenta? <span className="text-primary">Regístrate</span>
            </button>
          </div>
        </div>

        <div className="store-image-section d-none d-md-block" style={{ flex: '1', backgroundImage: 'url("/tienda-pyp.png")', backgroundSize: 'cover' }} />
      </div>

      {/* Modal de Registro con el componente robusto importado */}
      <div className="modal fade" id="modalRegistro" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content p-0 rounded-4 border-0 shadow-lg overflow-hidden bg-transparent">
            <RegistroForm 
              nuevoUsuario={nuevoUsuario} 
              setNuevoUsuario={setNuevoUsuario} 
              handleRegistro={handleRegistro} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;