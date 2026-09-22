import React from 'react';

const Contact = ({ cambiarVista }) => {
  return (
    <div className="container-fluid p-0">
      
      <div className="container my-5">
        <h1 className="text-center fw-bold mb-5">Contáctenos</h1>
        
        <div className="row g-5">
          {/* Columna Izquierda: Formulario */}
          <div className="col-md-6">
            <h4 className="fw-bold mb-4">Con gusto atenderemos tu solicitud</h4>
            <form>
              <div className="mb-3">
                <label className="form-label">Nombres:</label>
                <input type="text" className="form-control bg-light" />
              </div>
              <div className="mb-3">
                <label className="form-label">Correo electrónico:</label>
                <input type="email" className="form-control bg-light" />
              </div>
              <div className="mb-3">
                <label className="form-label">Teléfono de contacto:</label>
                <input type="tel" className="form-control bg-light" />
              </div>
              <div className="mb-4">
                <label className="form-label">Asunto:</label>
                <textarea className="form-control bg-light" rows="3"></textarea>
              </div>
              <button type="submit" className="btn btn-dark px-4 py-2 fw-bold">Enviar mensaje</button>
            </form>
          </div>

          {/* Columna Derecha: Mapa e Información */}
          <div className="col-md-6">
            {/* Mapa corregido para React */}
            <div className="rounded mb-4" style={{ height: '250px', overflow: 'hidden' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!4v1788214033024!6m8!1m7!1sumNbayzWJWOqKvyOHaWpyA!2m2!1d4.593603034903758!2d-74.19143919708016!3f116.65961736633227!4f1.7400361654661793!5f1.5362075765591219" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="strict-origin-when-cross-origin"
                title="Mapa de ubicación"
              ></iframe>
            </div>

            <div className="d-flex flex-column gap-3">
              <p><i className="bi bi-shop me-2"></i> Carrera 1 #42 Sur 65 - San Cristobal</p>
              <p><i className="bi bi-whatsapp me-2"></i> 3136658988</p>
              <p><i className="bi bi-envelope-fill me-2"></i> contacto@ferroelectricospyp.com</p>
              <hr />
              <div className="mt-2">
                <p className="fw-bold mb-1">Horario de atención</p>
                <p className="text-muted"><i className="bi bi-clock me-2"></i> Lunes a Sabado de 8:30 a.m. a 7:00 p.m.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;