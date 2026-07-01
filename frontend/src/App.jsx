import { supabase } from './supabaseClient';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import bcrypt from 'bcryptjs'; 
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/AdminDashboard';
import ClientCatalog from './pages/ClientCatalog';
import ProductDetail from './pages/ProductDetail'; 
import CatalogoContainer from './pages/CatalogoContainer';
import ListaDeseos from './pages/ListaDeseos';
import EditProfile from './pages/EditProfile';
import Contact from './pages/Contact';
import Garantias from './pages/Garantias';

function App() {
  const [nuevoUsuario, setNuevoUsuario] = useState({ 
    nombre: '', apellidos: '', correo: '', telefono: '', contrasena: '' 
  });
  const [userLogin, setUserLogin] = useState({ email: '', password: '' });

  const handleRegistro = async (e) => {
    e.preventDefault();
    try {
      // 1. Encriptación manual (ya no usamos supabase.auth.signUp)
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(nuevoUsuario.contrasena, salt);

      // 2. Guardar en tabla 'usuarios' con la contraseña encriptada
      const { error: dbError } = await supabase
        .from('usuarios')
        .insert([{ 
            nombre: nuevoUsuario.nombre,
            apellidos: nuevoUsuario.apellidos,
            correo: nuevoUsuario.correo,
            telefono: nuevoUsuario.telefono,
            contrasena: hash, 
            id_rol: 2 
        }]);

      if (dbError) throw dbError;

      alert("¡Registro exitoso! Ya puedes iniciar sesión.");
      window.location.reload();
      
    } catch (err) {
      console.error("Error al registrar:", err);
      alert("Error: " + err.message);
    }
  };

  return (
    <BrowserRouter>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<ClientCatalog />} />
        <Route path="/catalogo/:idCategoria" element={<CatalogoContainer />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/perfil" element={<EditProfile />} />
        <Route path="/deseos" element={<ListaDeseos />} />
        <Route path="/login" element={
          <Login 
            handleRegistro={handleRegistro} 
            setNuevoUsuario={setNuevoUsuario} 
            nuevoUsuario={nuevoUsuario}
            userLogin={userLogin}
            setUserLogin={setUserLogin}
          />
        } />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/garantias" element={<Garantias />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;