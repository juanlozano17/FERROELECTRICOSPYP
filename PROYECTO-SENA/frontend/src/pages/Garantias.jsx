import React from 'react';

const Garantias = ({ cambiarVista }) => {
  return (
    <div className="container-fluid p-0">
      
      <div className="container my-5">
        <h1 className="text-center fw-bold mb-5">Cambios y garantías</h1>
        
        <div className="row align-items-center g-5 mb-5">
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
            <img 
            src="/garantia.jpg" 
            className="img-fluid" 
            alt="Garantías" 
            style={{ maxWidth: '350px' }} 
            />
          </div>
        </div>

        {/* Sección de Preguntas Frecuentes para dar contenido y relleno */}
        <div className="row mt-5 pt-4 border-top">
          <div className="col-12">
            <h3 className="fw-bold mb-4 text-center">Preguntas Frecuentes</h3>
            
            <div className="accordion" id="accordionGarantias">
              
              <div className="accordion-item mb-3 border rounded shadow-sm">
                <h2 className="accordion-header" id="headingOne">
                  <button className="accordion-button fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    ¿Cuál es el plazo para solicitar una garantía o cambio de producto?
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionGarantias">
                  <div className="accordion-body text-secondary">
                    El plazo establecido para reportar fallas de fábrica o solicitar una garantía depende de cada producto, amparado por los términos legales vigentes. Te sugerimos revisar el documento PDF descargable para conocer los tiempos específicos por categoría en Ferroeléctricos PYP.
                  </div>
                </div>
              </div>

              <div className="accordion-item mb-3 border rounded shadow-sm">
                <h2 className="accordion-header" id="headingTwo">
                  <button className="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    ¿Qué requisitos debo cumplir para hacer efectiva una devolución?
                  </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionGarantias">
                  <div className="accordion-body text-secondary">
                    Debes presentar tu factura de compra o comprobante, conservar el empaque original en buen estado, manuales y accesorios completos. El producto no debe presentar alteraciones por mal uso, instalación incorrecta o daños ocasionados por terceros.
                  </div>
                </div>
              </div>

              <div className="accordion-item mb-3 border rounded shadow-sm">
                <h2 className="accordion-header" id="headingThree">
                  <button className="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    ¿Quién asume los costos de envío en caso de un cambio por garantía?
                  </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionGarantias">
                  <div className="accordion-body text-secondary">
                    Si el producto presenta un defecto de fábrica comprobado bajo los parámetros de la Ley 1480 de 2011, los costos de transporte y logísticos asociados a la recogida y reenvío del artículo corren por cuenta de Ferroeléctricos PYP.
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Garantias;