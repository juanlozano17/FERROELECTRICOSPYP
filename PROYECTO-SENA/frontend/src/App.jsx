import { supabase } from './supabaseClient';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import bcrypt from 'bcryptjs'; 
import api from './api/axios';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/AdminDashboard';
import ClientCatalog from './pages/ClientCatalog';
import Carrito from './pages/Carrito';
import ProductDetail from './pages/ProductDetail'; 
import CatalogoContainer from './pages/CatalogoContainer';
import EditProfile from './pages/EditProfile';
import Contact from './pages/Contact';
import Garantias from './pages/Garantias';
import QuienesSomos from './pages/QuienesSomos';
import TiendasFisicas from './pages/TiendasFisicas';
import MediosDePago from './pages/MediosDePago';
import PagoSeguro from './pages/PagoSeguro';
import CambiosYDevoluciones from './pages/CambiosYDevoluciones';
import ConsultaFactura from './pages/ConsultaFactura';
import PoliticasYTerminos from './pages/PoliticasYTerminos';
import PoliticasDePrivacidad from './pages/PoliticasDePrivacidad';
import PoliticaDeCookies from './pages/PoliticaDeCookies';
import TratamientoDeDatos from './pages/TratamientoDeDatos';
import Envios from './pages/Envios';
import Footer from './components/Footer';

function App() {
  const [nuevoUsuario, setNuevoUsuario] = useState({ 
    nombre: '', apellidos: '', correo: '', telefono: '', contrasena: '' 
  });
  const [userLogin, setUserLogin] = useState({ email: '', password: '' });

  const handleRegistro = async (e) => {
    e.preventDefault();
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(nuevoUsuario.contrasena, salt);

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
      {/* Contenedor general que abarca toda la pantalla de forma fluida */}
      <div className="d-flex flex-column min-vh-100 bg-light w-100 m-0 p-0 overflow-x-hidden">
        
        <TopBar />
        <Navbar /> 

        {/* Zona central flexible para que las páginas ocupen el espacio óptimo */}
        <main className="flex-fill w-100">
          <Routes>
            <Route path="/" element={<ClientCatalog />} />
            <Route path="/catalogo/:idCategoria" element={<CatalogoContainer />} />
            <Route path="/producto/:id" element={<ProductDetail />} />
            <Route path="/perfil" element={<EditProfile />} />
            <Route path="/quienes-somos" element={<QuienesSomos />} />
            <Route path="/tiendas" element={<TiendasFisicas />} />
            <Route path="/medios-de-pago" element={<MediosDePago />} />
            <Route path="/pago-seguro" element={<PagoSeguro />} />
            <Route path="/cambios-y-devoluciones" element={<CambiosYDevoluciones />} />
            <Route path="/terminos" element={<PoliticasYTerminos />} />
            <Route path="/politica-privacidad" element={<PoliticasDePrivacidad />} />
            <Route path="/cookies" element={<PoliticaDeCookies />} />
            <Route path="/datos" element={<TratamientoDeDatos />} />
            <Route path="/envios" element={<Envios />} />
            <Route path="/factura" element={<ConsultaFactura />} />
            <Route path="/carrito" element={<Carrito />} />
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
        </main>

        <Footer />
        
      </div>
    </BrowserRouter>
  );
}

export default App;