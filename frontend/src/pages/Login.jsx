import React from 'react';
import '../App.css';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

const Login = ({ setUserLogin, userLogin, handleRegistro, setNuevoUsuario, nuevoUsuario }) => {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // 1. Buscamos el usuario manualmente en la tabla 'usuarios'
      const { data: usuario, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('correo', userLogin.email)
        .single();

      if (error || !usuario) {
        alert("Credenciales incorrectas o usuario no existe.");
        return;
      }

      // 2. Comparamos la contraseña ingresada con el hash en la base de datos
      const coinciden = await bcrypt.compare(userLogin.password, usuario.contrasena);

      if (!coinciden) {
        alert("Contraseña incorrecta.");
        return;
      }

      // 3. Login exitoso manual
      localStorage.setItem('userRole', usuario.id_rol);
      localStorage.setItem('userName', usuario.nombre);
      localStorage.setItem('usuarioLogueado', JSON.stringify(usuario)); // Sesión manual

      if (usuario.id_rol === 1) {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
      window.location.reload();
      
    } catch (err) {
      console.error("Error al loguear:", err);
      alert("Error al intentar iniciar sesión");
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
              <label className="auth-label ms-3">CORREO ELECTRÓNICO</label>
              <input 
                type="email" 
                className="auth-input form-control" 
                required 
                value={userLogin.email || ''} 
                onChange={(e) => setUserLogin({...userLogin, email: e.target.value})} 
              />
            </div>
            <div className="mb-4">
              <label className="auth-label ms-3">CONTRASEÑA</label>
              <input 
                type="password" 
                className="auth-input form-control" 
                required 
                value={userLogin.password || ''} 
                onChange={(e) => setUserLogin({...userLogin, password: e.target.value})} 
              />
            </div>
            <button type="submit" className="btn btn-iniciar w-100 py-3">Ingresar</button>
          </form>

          <div className="auth-footer text-center mt-4">
            <button type="button" className="btn btn-link register-link" data-bs-toggle="modal" data-bs-target="#modalRegistro">
              ¿No tienes cuenta? Regístrate
            </button>
          </div>
        </div>

        <div className="store-image-section d-none d-md-block" style={{ flex: '1', backgroundImage: 'url("/tienda-pyp.png")', backgroundSize: 'cover' }} />
      </div>

      {/* Modal de Registro */}
      <div className="modal fade" id="modalRegistro" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content p-4 rounded-5 border-0 shadow">
            <h4 className="fw-bold text-center mb-4">Crear Nueva Cuenta</h4>
            {/* handleRegistro debe contener la lógica de bcrypt.hash explicada antes */}
            <form onSubmit={handleRegistro}>
              <div className="row g-3">
                <div className="col-md-6">
                  <input type="text" placeholder="Nombres" className="form-control" required onChange={(e) => setNuevoUsuario({...nuevoUsuario, nombre: e.target.value})} />
                </div>
                <div className="col-md-6">
                  <input type="text" placeholder="Apellidos" className="form-control" required onChange={(e) => setNuevoUsuario({...nuevoUsuario, apellidos: e.target.value})} />
                </div>
                <div className="col-md-6">
                  <input type="email" placeholder="Correo electrónico" className="form-control" required onChange={(e) => setNuevoUsuario({...nuevoUsuario, correo: e.target.value})} />
                </div>
                <div className="col-md-6">
                  <input type="tel" placeholder="Teléfono" className="form-control" required onChange={(e) => setNuevoUsuario({...nuevoUsuario, telefono: e.target.value})} />
                </div>
                <div className="col-12">
                  <input type="password" placeholder="Contraseña" className="form-control" required onChange={(e) => setNuevoUsuario({...nuevoUsuario, contrasena: e.target.value})} />
                </div>
              </div>
              <button type="submit" className="btn btn-dark w-100 mt-4 py-2 rounded-pill fw-bold">Crear cuenta</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;