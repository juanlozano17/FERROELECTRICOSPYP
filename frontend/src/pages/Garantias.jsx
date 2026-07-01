import React from 'react';

const Garantias = ({ cambiarVista }) => {
  return (
    <div className="container-fluid p-0">
      
      <div className="container my-5">
        <h1 className="text-center fw-bold mb-5">Cambios y garantías</h1>
        
        <div className="row align-items-center g-5">
          {/* Columna Izquierda: Texto y Botón */}
          <div className="col-md-7">
            <h5 className="fw-bold mb-3">Estimado Cliente,</h5>
            <p className="text-secondary" style={{ textAlign: 'justify' }}>
              Al ingresar al portal web de la tienda virtual Ferroeléctricos PYP y comprar productos 
              del catálogo ofrecido, usted acepta la presente política para la gestión de garantías. 
              Esto garantiza que su proceso de compra se encuentra amparado bajo los preceptos 
              legales que protegen sus derechos como consumidor, especialmente en el 
              Título III de la Ley 1480 de 2011.
            </p>
            <p className="fw-bold mt-4">Ver condiciones de cambios y garantías</p>

            <a 
             href="/CondicionesGarantia.pdf" 
              download="CondicionesGarantia.pdf"
             className="btn btn-primary"
            >
              Descargar archivo
            </a>
          </div>

          {/* Columna Derecha: Imagen ilustrativa */}
          <div className="col-md-5 text-center">
            <div className="col-md-5 text-center">

         <img 
          src="/garantia.jpg" 
         className="img-fluid" 
         alt="Garantías" 
           style={{ maxWidth: '350px' }} 
            />
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Garantias;