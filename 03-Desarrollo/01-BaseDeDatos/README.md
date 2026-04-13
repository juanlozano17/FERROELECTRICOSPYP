Base de Datos
---

-- ============================================================
===

# \--  FERRETERÍA \& ILUMINACIÓN  |  Script único completo

# \--  Correr TODO de una sola vez, en este orden

# \-- ============================================================

# 

# \-- ------------------------------------------------------------

# \-- TABLAS

# \-- ------------------------------------------------------------

# 

# CREATE TABLE public.roles (

# &#x20;   id\_rol   SERIAL PRIMARY KEY,

# &#x20;   nombre   VARCHAR(45) 

# );

# 

# CREATE TABLE public.medio\_de\_pago (

# &#x20;   idmedio\_pago SERIAL PRIMARY KEY,

# &#x20;   nombre       VARCHAR(100) ,

# &#x20;   tipo\_med     VARCHAR(30)

# );

# 

# CREATE TABLE public.transportadora (

# &#x20;   idtransportadora      SERIAL PRIMARY KEY,

# &#x20;   telefono              VARCHAR(15),

# &#x20;   nombre\_transportadora VARCHAR(50) ,

# &#x20;   pagina\_web            VARCHAR(30)

# );

# 

# CREATE TABLE public.categorias (

# &#x20;   idcategoria SERIAL PRIMARY KEY,

# &#x20;   nombre      VARCHAR(45) 

# );

# 

# CREATE TABLE public.proveedores (

# &#x20;   idproveedor      SERIAL PRIMARY KEY,

# &#x20;   nombre\_proveedor VARCHAR(45) ,

# &#x20;   contacto         VARCHAR(45),

# &#x20;   correo           VARCHAR(100) UNIQUE,

# &#x20;   telefono         VARCHAR(15)

# );

# 

# CREATE TABLE public.usuarios (

# &#x20;   idusuario          SERIAL PRIMARY KEY,

# &#x20;   id\_rol             INT ,

# &#x20;   nombre             VARCHAR(100) NO,

# &#x20;   correo             VARCHAR(100) UNIQUE NOT NULL,

# &#x20;   contrasena         VARCHAR(255) NOT NULL,

# &#x20;   fecha\_creacion     TIMESTAMP DEFAULT CURRENT\_TIMESTAMP,

# &#x20;   fecha\_modificacion TIMESTAMP,

# &#x20;   CONSTRAINT fk\_rol FOREIGN KEY (id\_rol) REFERENCES public.roles(id\_rol)

# );

# 

# CREATE TABLE public.cliente (

# &#x20;   idcliente          SERIAL PRIMARY KEY,

# &#x20;   idusuario          INT,

# &#x20;   direccion          VARCHAR(225),

# &#x20;   nombre             VARCHAR(45) NOT NULL,

# &#x20;   apellido           VARCHAR(45) NOT NULL,

# &#x20;   telefono           VARCHAR(15),

# &#x20;   fecha\_creacion     TIMESTAMP DEFAULT CURRENT\_TIMESTAMP,

# &#x20;   fecha\_modificacion TIMESTAMP,

# &#x20;   CONSTRAINT fk\_usuario\_cliente FOREIGN KEY (idusuario) REFERENCES public.usuarios(idusuario)

# );

# 

# CREATE TABLE public.producto (

# &#x20;   idproducto         SERIAL PRIMARY KEY,

# &#x20;   idcategoria        INT,

# &#x20;   nombre\_producto    VARCHAR(100) NOT NULL,

# &#x20;   precio             NUMERIC(10,2) NOT NULL,

# &#x20;   descripcion        TEXT,

# &#x20;   caracteristicas    TEXT,

# &#x20;   imagenes           VARCHAR(225),

# &#x20;   estado             VARCHAR(20) DEFAULT 'activo',

# &#x20;   fecha\_creacion     TIMESTAMP DEFAULT CURRENT\_TIMESTAMP,

# &#x20;   fecha\_modificacion TIMESTAMP,

# &#x20;   CONSTRAINT fk\_categoria\_producto FOREIGN KEY (idcategoria) REFERENCES public.categorias(idcategoria)

# );

# 

# CREATE TABLE public.producto\_proveedor (

# &#x20;   idproducto           INT,

# &#x20;   idproveedor          INT,

# &#x20;   precio\_compra\_actual NUMERIC(10,2),

# &#x20;   PRIMARY KEY (idproducto, idproveedor),

# &#x20;   CONSTRAINT fk\_producto\_proveedor FOREIGN KEY (idproducto)  REFERENCES public.producto(idproducto),

# &#x20;   CONSTRAINT fk\_proveedor\_producto FOREIGN KEY (idproveedor) REFERENCES public.proveedores(idproveedor)

# );

# 

# CREATE TABLE public.venta (

# &#x20;   idventa            SERIAL PRIMARY KEY,

# &#x20;   idmedio\_pago       INT,

# &#x20;   idcliente          INT,

# &#x20;   fecha\_pedido       DATE DEFAULT CURRENT\_DATE,

# &#x20;   total              NUMERIC(14,2) NOT NULL,

# &#x20;   estado             VARCHAR(20) DEFAULT 'pendiente',

# &#x20;   fecha\_creacion     TIMESTAMP DEFAULT CURRENT\_TIMESTAMP,

# &#x20;   fecha\_modificacion TIMESTAMP,

# &#x20;   CONSTRAINT fk\_mediopago\_venta FOREIGN KEY (idmedio\_pago) REFERENCES public.medio\_de\_pago(idmedio\_pago),

# &#x20;   CONSTRAINT fk\_cliente\_venta   FOREIGN KEY (idcliente)    REFERENCES public.cliente(idcliente)

# );

# 

# CREATE TABLE public.detalle\_venta (

# &#x20;   idventa         INT,

# &#x20;   idproducto      INT,

# &#x20;   cantidad        INT NOT NULL,

# &#x20;   precio\_unitario NUMERIC(12,2) NOT NULL,

# &#x20;   PRIMARY KEY (idventa, idproducto),

# &#x20;   CONSTRAINT fk\_venta\_detalle    FOREIGN KEY (idventa)    REFERENCES public.venta(idventa),

# &#x20;   CONSTRAINT fk\_producto\_detalle FOREIGN KEY (idproducto) REFERENCES public.producto(idproducto)

# );

# 

# CREATE TABLE public.registro\_envio (

# &#x20;   idenvio          SERIAL PRIMARY KEY,

# &#x20;   idtransportadora INT,

# &#x20;   numero\_guia      VARCHAR(50),

# &#x20;   fecha\_envio      DATE,

# &#x20;   estado           VARCHAR(20) DEFAULT 'en\_camino',

# &#x20;   idventa          INT,

# &#x20;   CONSTRAINT fk\_transportadora\_envio FOREIGN KEY (idtransportadora) REFERENCES public.transportadora(idtransportadora),

# &#x20;   CONSTRAINT fk\_venta\_envio          FOREIGN KEY (idventa)          REFERENCES public.venta(idventa)

# );

# 

# CREATE TABLE public.detalle\_envio (

# &#x20;   iddetalleenvio     SERIAL PRIMARY KEY,

# &#x20;   idenvio            INT,

# &#x20;   calle              VARCHAR(100),

# &#x20;   ciudad             VARCHAR(100),

# &#x20;   codigo\_postal      VARCHAR(10),

# &#x20;   estado             VARCHAR(20),

# &#x20;   fecha\_creacion     TIMESTAMP DEFAULT CURRENT\_TIMESTAMP,

# &#x20;   fecha\_modificacion TIMESTAMP,

# &#x20;   CONSTRAINT fk\_envio\_detalle FOREIGN KEY (idenvio) REFERENCES public.registro\_envio(idenvio)

# );

# 

# \-- ------------------------------------------------------------

# \-- ÍNDICES

# \-- ------------------------------------------------------------

# 

# CREATE INDEX idx\_usuarios\_rol       ON public.usuarios(id\_rol);

# CREATE INDEX idx\_cliente\_usuario    ON public.cliente(idusuario);

# CREATE INDEX idx\_producto\_categoria ON public.producto(idcategoria);

# CREATE INDEX idx\_venta\_cliente      ON public.venta(idcliente);

# CREATE INDEX idx\_venta\_mediopago    ON public.venta(idmedio\_pago);

# CREATE INDEX idx\_detalle\_venta      ON public.detalle\_venta(idventa);

# CREATE INDEX idx\_detalle\_producto   ON public.detalle\_venta(idproducto);

# CREATE INDEX idx\_envio\_venta        ON public.registro\_envio(idventa);

# 

# 

# \-- ============================================================

# \--  DATOS  (respetar este orden por las FK)

# \-- ============================================================

# 

# \-- 1. Roles

# INSERT INTO public.roles (nombre) VALUES

# &#x20;   ('Administrador'),  -- id 1

# &#x20;   ('Cliente');        -- id 2

# 

# \-- 2. Medios de pago

# INSERT INTO public.medio\_de\_pago (nombre, tipo\_med) VALUES

# &#x20;   ('Tarjeta',  'Electronico'),  -- id 1

# &#x20;   ('Efectivo', 'Fisico'),       -- id 2

# &#x20;   ('Pagos QR', 'Electronico');  -- id 3

# 

# \-- 3. Categorías  (UNA SOLA VEZ, todas juntas)

# INSERT INTO public.categorias (nombre) VALUES

# &#x20;   ('Ferreteria'),           -- id 1

# &#x20;   ('Iluminaria'),           -- id 2

# &#x20;   ('Herramientas Manuales'),-- id 3

# &#x20;   ('Electricidad'),         -- id 4

# &#x20;   ('Iluminacion LED');      -- id 5

# 

# \-- 4. Proveedores

# INSERT INTO public.proveedores (nombre\_proveedor, contacto, correo, telefono) VALUES

# &#x20;   ('Distribuidora Ferrelectricos Ltda', 'Pedro Suarez',  'pedros@ferrelectricos.com', '3101234567'),

# &#x20;   ('Ilumina Colombia SAS',              'Laura Herrera', 'lherrera@iluminacol.com',   '3209876543'),

# &#x20;   ('Herramientas Pro Andina',           'Diego Mora',    'dmora@hpandina.com',        '3155556677');

# 

# \-- 5. Transportadoras

# INSERT INTO public.transportadora (telefono, nombre\_transportadora, pagina\_web) VALUES

# &#x20;   ('6017000000', 'Servientrega',     'servientrega.com.co'),

# &#x20;   ('6014440000', 'Coordinadora',     'coordinadora.com.co'),

# &#x20;   ('3107000001', 'Interrapidisimo',  'interrapidisimo.com');

# 

# \-- 6. Usuarios

# INSERT INTO public.usuarios (id\_rol, nombre, correo, contrasena, fecha\_creacion) VALUES

# &#x20;   (2, 'Carlos Lopez',      'carlos@mail.com',    '$2b$12$placeholder\_hash\_1', NOW()),  -- id 1

# &#x20;   (2, 'Santiago Cardenas', 'santiago@mail.com',  '$2b$12$placeholder\_hash\_2', NOW()),  -- id 2

# &#x20;   (2, 'Juan Lozano',       'juan@mail.com',       '$2b$12$placeholder\_hash\_3', NOW()),  -- id 3

# &#x20;   (2, 'Mariana Gonzalez',  'mariana@mail.com',   '$2b$12$placeholder\_hash\_4', NOW()),  -- id 4

# &#x20;   (2, 'Andres Ramirez',    'andres@mail.com',    '$2b$12$placeholder\_hash\_5', NOW()),  -- id 5

# &#x20;   (2, 'Lucia Pedraza',     'lucia@mail.com',     '$2b$12$placeholder\_hash\_6', NOW()),  -- id 6

# &#x20;   (1, 'Admin Ferreteria',  'admin@ferreria.com', '$2b$12$placeholder\_hash\_7', NOW());  -- id 7

# 

# \-- 7. Clientes

# INSERT INTO public.cliente (idusuario, nombre, apellido, direccion, telefono) VALUES

# &#x20;   (1, 'Carlos',   'Lopez',    'Cra 15 # 90-20 Bogotá',  '3101112233'),  -- id 1

# &#x20;   (2, 'Santiago', 'Cardenas', 'Cll 80 # 22-05 Bogotá',  '3102223344'),  -- id 2

# &#x20;   (3, 'Juan',     'Lozano',   'Av El Dorado 68C Bogotá', '3103334455'),  -- id 3

# &#x20;   (4, 'Mariana',  'Gonzalez', 'Cra 7 # 45-12 Bogotá',   '3104445566'),  -- id 4

# &#x20;   (5, 'Andres',   'Ramirez',  'Cra 7 # 45-12 Bogotá',   '3112223344'),  -- id 5

# &#x20;   (6, 'Lucia',    'Pedraza',  'Cll 80 # 22-05 Bogotá',  '3123334455');  -- id 6

# 

# \-- 8. Productos  (todos con idcategoria que YA existe arriba)

# INSERT INTO public.producto (idcategoria, nombre\_producto, precio, estado) VALUES

# &#x20;   (3, 'Martillo Carpintero 16oz Stanley',         32900,  'activo'),   -- id 1

# &#x20;   (3, 'Destornillador Pala 6" Tramontina',          8900,  'activo'),  -- id 2

# &#x20;   (3, 'Alicate Universal 8" Bahco',                45900,  'activo'),  -- id 3

# &#x20;   (3, 'Llave Inglesa 10" Black+Decker',            38500,  'activo'),  -- id 4

# &#x20;   (4, 'Cinta LED RGB 5m 12V impermeable',          67900,  'activo'),  -- id 5

# &#x20;   (4, 'Bombillo LED 9W E27 luz fria Philips',       6900,  'activo'),  -- id 6

# &#x20;   (4, 'Bombillo LED 9W E27 luz calida Philips',     6900,  'activo'),  -- id 7

# &#x20;   (4, 'Panel LED Empotrable 18W 6500K',            52000,  'activo'),  -- id 8

# &#x20;   (5, 'Lampara Colgante Industrial Ada Grey',     342000,  'activo'),  -- id 9

# &#x20;   (5, 'Tira LED Neon Flex 5m Rosa',                89000,  'activo');  -- id 10

# 

# \-- 9. Relación producto-proveedor

# INSERT INTO public.producto\_proveedor (idproducto, idproveedor, precio\_compra\_actual) VALUES

# &#x20;   (1,  3, 21000),

# &#x20;   (2,  3,  4500),

# &#x20;   (3,  3,  6200),

# &#x20;   (4,  3, 29000),

# &#x20;   (5,  2, 34000),

# &#x20;   (6,  2,  3200),

# &#x20;   (7,  2,  3200),

# &#x20;   (8,  2, 28000),

# &#x20;   (9,  2,190000),

# &#x20;   (10, 2, 48000);

# 

# \-- 10. Ventas

# INSERT INTO public.venta (idmedio\_pago, idcliente, fecha\_pedido, total, estado) VALUES

# &#x20;   (1, 1, '2024-11-05',  32900, 'entregado'),   -- id 1

# &#x20;   (1, 2, '2024-11-10',  67900, 'entregado'),   -- id 2

# &#x20;   (2, 3, '2024-11-15',  45900, 'entregado'),   -- id 3

# &#x20;   (3, 4, '2024-11-20', 342000, 'entregado'),   -- id 4

# &#x20;   (1, 5, '2024-12-01',  52000, 'enviado'),     -- id 5

# &#x20;   (2, 1, '2024-12-05',  89000, 'pendiente'),   -- id 6

# &#x20;   (1, 2, '2024-12-08',  24700, 'entregado'),   -- id 7

# &#x20;   (2, 3, '2024-12-09',  38500, 'enviado'),     -- id 8

# &#x20;   (3, 4, '2024-12-11',  27600, 'pendiente'),   -- id 9

# &#x20;   (1, 5, '2024-12-12',  78800, 'cancelado');   -- id 10

# 

# \-- 11. Detalles de venta

# INSERT INTO public.detalle\_venta (idventa, idproducto, cantidad, precio\_unitario) VALUES

# &#x20;   (1,  1,  1,  32900),

# &#x20;   (2,  5,  1,  67900),

# &#x20;   (3,  3,  1,  45900),

# &#x20;   (4,  9,  1, 342000),

# &#x20;   (5,  8,  1,  52000),

# &#x20;   (6,  10, 1,  89000),

# &#x20;   (7,  6,  3,   6900),

# &#x20;   (7,  2,  1,   8900),

# &#x20;   (8,  4,  1,  38500),

# &#x20;   (9,  7,  4,   6900),

# &#x20;   (10, 1,  1,  32900),

# &#x20;   (10, 3,  1,  45900);

# 

# \-- 12. Envíos

# INSERT INTO public.registro\_envio (idtransportadora, numero\_guia, fecha\_envio, estado, idventa) VALUES

# &#x20;   (1, 'SRV-2024-00123', '2024-11-06', 'entregado', 1),

# &#x20;   (1, 'SRV-2024-00456', '2024-11-11', 'entregado', 2),

# &#x20;   (2, 'COR-2024-00789', '2024-11-16', 'entregado', 3),

# &#x20;   (1, 'SRV-2024-01011', '2024-11-21', 'entregado', 4),

# &#x20;   (3, 'IRP-2024-01213', '2024-12-02', 'en\_camino', 5),

# &#x20;   (2, 'COR-2024-01415', '2024-12-10', 'en\_camino', 8);

# 

# \-- 13. Detalles de envío

# INSERT INTO public.detalle\_envio (idenvio, calle, ciudad, codigo\_postal, estado) VALUES

# &#x20;   (1, 'Cra 15 # 90-20',   'Bogotá', '110221', 'entregado'),

# &#x20;   (2, 'Cll 80 # 22-05',   'Bogotá', '110911', 'entregado'),

# &#x20;   (3, 'Av El Dorado 68C', 'Bogotá', '110931', 'entregado'),

# &#x20;   (4, 'Cra 7 # 45-12',    'Bogotá', '110221', 'entregado'),

# &#x20;   (5, 'Cra 7 # 45-12',    'Bogotá', '110221', 'en\_camino'),

# &#x20;   (6, 'Cll 80 # 22-05',   'Bogotá', '110911', 'en\_camino');

# 

# 

# \-- ============================================================

# \--  5 UPDATES

# \-- ============================================================

# 

# \-- UPDATE 1: Subir 10% el precio de los bombillos LED Philips

# \--           por aumento del proveedor Ilumina Colombia

# UPDATE public.producto

# SET    precio             = ROUND(precio \* 1.10, 2),

# &#x20;      fecha\_modificacion = NOW()

# WHERE  nombre\_producto LIKE '%Philips%';

# 

# \-- UPDATE 2: Marcar como inactivo la Llave Inglesa (agotada en bodega)

# UPDATE public.producto

# SET    estado             = 'inactivo',

# &#x20;      fecha\_modificacion = NOW()

# WHERE  nombre\_producto = 'Llave Inglesa 10" Black+Decker';

# 

# \-- UPDATE 3: Renegociación con Ilumina Colombia — nuevo precio de compra del Panel LED

# UPDATE public.producto\_proveedor

# SET    precio\_compra\_actual = 24500

# WHERE  idproducto = (

# &#x20;          SELECT idproducto FROM public.producto

# &#x20;          WHERE  nombre\_producto = 'Panel LED Empotrable 18W 6500K'

# &#x20;      )

# AND    idproveedor = (

# &#x20;          SELECT idproveedor FROM public.proveedores

# &#x20;          WHERE  nombre\_proveedor = 'Ilumina Colombia SAS'

# &#x20;      );

# 

# \-- UPDATE 4: Cambiar venta cancelada a reembolsado

# UPDATE public.venta

# SET    estado             = 'reembolsado',

# &#x20;      fecha\_modificacion = NOW()

# WHERE  estado = 'cancelado';

# 

# \-- UPDATE 5: Actualizar datos de contacto del cliente Andres Ramirez

# UPDATE public.cliente

# SET    telefono           = '3119998877',

# &#x20;      direccion          = 'Cll 116 # 55-10 Bogotá',

# &#x20;      fecha\_modificacion = NOW()

# WHERE  nombre   = 'Andres'

# AND    apellido = 'Ramirez';

# 

# 

# \-- ============================================================

# \--  5 DELETEs  (orden respeta FK)

# \-- ============================================================

# 

# \-- DELETE 1: Detalle de envío del pedido reembolsado

# DELETE FROM public.detalle\_envio

# WHERE idenvio IN (

# &#x20;   SELECT idenvio FROM public.registro\_envio

# &#x20;   WHERE  idventa IN (

# &#x20;       SELECT idventa FROM public.venta WHERE estado = 'reembolsado'

# &#x20;   )

# );

# 

# \-- DELETE 2: Registro de envío del pedido reembolsado

# DELETE FROM public.registro\_envio

# WHERE idventa IN (

# &#x20;   SELECT idventa FROM public.venta WHERE estado = 'reembolsado'

# );

# 

# \-- DELETE 3: Detalle de venta del pedido reembolsado

# DELETE FROM public.detalle\_venta

# WHERE idventa IN (

# &#x20;   SELECT idventa FROM public.venta WHERE estado = 'reembolsado'

# );

# 

# \-- DELETE 4: Venta reembolsada ya sin dependencias

# DELETE FROM public.venta

# WHERE estado = 'reembolsado';

# 

# \-- DELETE 5: Limpiar productos inactivos sin historial de ventas

# DELETE FROM public.producto\_proveedor

# WHERE idproducto IN (

# &#x20;   SELECT p.idproducto

# &#x20;   FROM   public.producto p

# &#x20;   LEFT JOIN public.detalle\_venta dv ON dv.idproducto = p.idproducto

# &#x20;   WHERE  p.estado   = 'inactivo'

# &#x20;   AND    dv.idventa IS NULL

# );

# 

# DELETE FROM public.producto

# WHERE  estado = 'inactivo'

# AND    idproducto NOT IN (

# &#x20;   SELECT DISTINCT idproducto FROM public.detalle\_venta

# );

# 

# 

# \-- ============================================================

# \--  5 JOINs

# \-- ============================================================

# 

# \-- JOIN 1: Ventas completas con cliente, medio de pago y estado del envío

# SELECT

# &#x20;   v.idventa,

# &#x20;   CONCAT(c.nombre, ' ', c.apellido) AS cliente,

# &#x20;   mp.nombre                          AS medio\_pago,

# &#x20;   v.fecha\_pedido,

# &#x20;   v.total,

# &#x20;   v.estado                           AS estado\_venta,

# &#x20;   re.estado                          AS estado\_envio,

# &#x20;   re.numero\_guia

# FROM       public.venta          v

# INNER JOIN public.cliente        c  ON c.idcliente     = v.idcliente

# INNER JOIN public.medio\_de\_pago  mp ON mp.idmedio\_pago = v.idmedio\_pago

# LEFT  JOIN public.registro\_envio re ON re.idventa      = v.idventa

# ORDER BY v.fecha\_pedido DESC;

# 

# \-- JOIN 2: Detalle línea por línea con producto, categoría y subtotal 

# SELECT

# &#x20;   dv.idventa,

# &#x20;   CONCAT(c.nombre, ' ', c.apellido) AS cliente,

# &#x20;   p.nombre\_producto,

# &#x20;   cat.nombre                         AS categoria,

# &#x20;   dv.cantidad,

# &#x20;   dv.precio\_unitario,

# &#x20;   (dv.cantidad \* dv.precio\_unitario) AS subtotal

# FROM       public.detalle\_venta dv

# INNER JOIN public.producto       p   ON p.idproducto    = dv.idproducto

# INNER JOIN public.categorias     cat ON cat.idcategoria = p.idcategoria

# INNER JOIN public.venta          v   ON v.idventa       = dv.idventa

# INNER JOIN public.cliente        c   ON c.idcliente     = v.idcliente

# ORDER BY dv.idventa, p.nombre\_producto;

# 

# \-- JOIN 3: Productos con proveedor y margen de ganancia

# SELECT

# &#x20;   p.nombre\_producto,

# &#x20;   cat.nombre                                        AS categoria,

# &#x20;   pr.nombre\_proveedor,

# &#x20;   pp.precio\_compra\_actual                           AS precio\_compra,

# &#x20;   p.precio                                          AS precio\_venta,

# &#x20;   (p.precio - pp.precio\_compra\_actual)              AS ganancia\_unidad,

# &#x20;   ROUND(

# &#x20;       (p.precio - pp.precio\_compra\_actual)

# &#x20;       / pp.precio\_compra\_actual \* 100

# &#x20;   , 1)                                              AS margen\_pct

# FROM       public.producto           p

# INNER JOIN public.categorias         cat ON cat.idcategoria = p.idcategoria

# INNER JOIN public.producto\_proveedor pp  ON pp.idproducto  = p.idproducto

# INNER JOIN public.proveedores        pr  ON pr.idproveedor = pp.idproveedor

# ORDER BY margen\_pct DESC;

# 

# \-- JOIN 4: Envíos activos con transportadora, destino y cliente

# SELECT

# &#x20;   re.numero\_guia,

# &#x20;   t.nombre\_transportadora,

# &#x20;   CONCAT(c.nombre, ' ', c.apellido) AS cliente,

# &#x20;   c.telefono,

# &#x20;   de.calle,

# &#x20;   de.ciudad,

# &#x20;   de.codigo\_postal,

# &#x20;   re.fecha\_envio,

# &#x20;   re.estado

# FROM       public.registro\_envio re

# INNER JOIN public.transportadora t  ON t.idtransportadora = re.idtransportadora

# INNER JOIN public.venta          v  ON v.idventa          = re.idventa

# INNER JOIN public.cliente        c  ON c.idcliente        = v.idcliente

# INNER JOIN public.detalle\_envio  de ON de.idenvio         = re.idenvio

# WHERE re.estado != 'entregado'

# ORDER BY re.fecha\_envio;

# 

# \-- JOIN 5: Ranking de clientes por total comprado

# SELECT

# &#x20;   CONCAT(c.nombre, ' ', c.apellido) AS cliente,

# &#x20;   c.telefono,

# &#x20;   COUNT(v.idventa)                   AS total\_pedidos,

# &#x20;   SUM(v.total)                       AS total\_comprado

# FROM       public.cliente c

# INNER JOIN public.venta   v ON v.idcliente = c.idcliente

# WHERE v.estado NOT IN ('cancelado', 'reembolsado')

# GROUP BY c.idcliente, c.nombre, c.apellido, c.telefono

# ORDER BY total\_comprado DESC;

# 

# 

# \-- ============================================================

# \--  5 SUBCONSULTAS

# \-- ============================================================

# 

# \-- SUBCONSULTA 1: Productos con precio sobre el promedio del catálogo

# SELECT

# &#x20;   nombre\_producto,

# &#x20;   precio,

# &#x20;   estado

# FROM  public.producto

# WHERE precio > (

# &#x20;   SELECT AVG(precio) FROM public.producto WHERE estado = 'activo'

# )

# ORDER BY precio DESC;

# 

# \-- SUBCONSULTA 2: Clientes que nunca han comprado

# SELECT

# &#x20;   CONCAT(c.nombre, ' ', c.apellido) AS cliente,

# &#x20;   u.correo

# FROM       public.cliente  c

# INNER JOIN public.usuarios u ON u.idusuario = c.idusuario

# WHERE c.idcliente NOT IN (

# &#x20;   SELECT DISTINCT idcliente FROM public.venta

# );

# 

# \-- SUBCONSULTA 3: Producto más vendido por unidades

# SELECT

# &#x20;   p.nombre\_producto,

# &#x20;   cat.nombre AS categoria,

# &#x20;   p.precio,

# &#x20;   totales.unidades

# FROM public.producto p

# INNER JOIN public.categorias cat ON cat.idcategoria = p.idcategoria

# INNER JOIN (

# &#x20;   SELECT idproducto, SUM(cantidad) AS unidades

# &#x20;   FROM   public.detalle\_venta

# &#x20;   GROUP  BY idproducto

# ) AS totales ON totales.idproducto = p.idproducto

# WHERE totales.unidades = (

# &#x20;   SELECT MAX(suma) FROM (

# &#x20;       SELECT SUM(cantidad) AS suma

# &#x20;       FROM   public.detalle\_venta

# &#x20;       GROUP  BY idproducto

# &#x20;   ) AS sub

# );

# 

# \-- SUBCONSULTA 4: Ventas que superan el promedio del mes

# SELECT

# &#x20;   v.idventa,

# &#x20;   CONCAT(c.nombre, ' ', c.apellido) AS cliente,

# &#x20;   v.fecha\_pedido,

# &#x20;   v.total,

# &#x20;   mes\_prom.promedio\_mes

# FROM       public.venta   v

# INNER JOIN public.cliente c ON c.idcliente = v.idcliente

# INNER JOIN (

# &#x20;   SELECT

# &#x20;       DATE\_TRUNC('month', fecha\_pedido) AS mes,

# &#x20;       ROUND(AVG(total), 2)              AS promedio\_mes

# &#x20;   FROM  public.venta

# &#x20;   WHERE estado NOT IN ('cancelado', 'reembolsado')

# &#x20;   GROUP BY mes

# ) AS mes\_prom ON DATE\_TRUNC('month', v.fecha\_pedido) = mes\_prom.mes

# WHERE v.total > mes\_prom.promedio\_mes

# ORDER BY v.fecha\_pedido;

# 

# \-- SUBCONSULTA 5: Proveedor con mayor variedad de productos

# SELECT

# &#x20;   pr.nombre\_proveedor,

# &#x20;   pr.correo,

# &#x20;   pr.telefono,

# &#x20;   conteo.total\_productos

# FROM public.proveedores pr

# INNER JOIN (

# &#x20;   SELECT idproveedor, COUNT(idproducto) AS total\_productos

# &#x20;   FROM   public.producto\_proveedor

# &#x20;   GROUP  BY idproveedor

# ) AS conteo ON conteo.idproveedor = pr.idproveedor

# WHERE conteo.total\_productos = (

# &#x20;   SELECT MAX(cnt) FROM (

# &#x20;       SELECT COUNT(idproducto) AS cnt

# &#x20;       FROM   public.producto\_proveedor

# &#x20;       GROUP  BY idproveedor

# &#x20;   ) AS sub

# );

