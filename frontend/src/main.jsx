import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// ESTA ES LA LÍNEA CLAVE PARA QUE FUNCIONE LA "X" Y EL BOTÓN DE CERRAR
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)