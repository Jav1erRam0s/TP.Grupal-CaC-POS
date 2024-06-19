-- ----------------------------------------------------------------------------------------------------------
-- INITIALIZATION --
-- ----------------------------------------------------------------------------------------------------------

DROP DATABASE IF EXISTS point_of_sale;
CREATE DATABASE point_of_sale;
USE point_of_sale;

-- ----------------------------------------------------------------------------------------------------------
-- CREATION OF RECORDS --
-- ----------------------------------------------------------------------------------------------------------

CREATE TABLE usuario
(
    id INT NOT NULL AUTO_INCREMENT,
    usuario TEXT NOT NULL,
    contrasenia TEXT NOT NULL,
    avatar TEXT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE producto
(
	id INT NOT NULL AUTO_INCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT NOT NULL,
    imagen TEXT NOT NULL,
    precio DECIMAL (10,2),
    codigo TEXT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE orden
(
	id INT NOT NULL AUTO_INCREMENT,
    numero_ticket TEXT NOT NULL,
    fecha TIMESTAMP NOT NULL,
    id_usuario INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_usuario) REFERENCES usuario (id)
);

CREATE TABLE orden_producto
(
	id INT NOT NULL AUTO_INCREMENT,
    id_orden INT NOT NULL,
    id_producto INT NOT NULL,
    precio DECIMAL (10,2),
    unidades INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_orden) REFERENCES orden (id),
    FOREIGN KEY (id_producto) REFERENCES producto (id)
);

-- ----------------------------------------------------------------------------------------------------------
-- INSERTION OF RECORDS --
-- ----------------------------------------------------------------------------------------------------------

INSERT INTO usuario ( usuario, contrasenia, avatar ) VALUES 
( "Charly", "charly123", "https://p7.hiclipart.com/preview/266/75/757/super-sentai-mask-computer-icons-man-icon.jpg" ),
( "Carolina", "caro123", "https://w7.pngwing.com/pngs/944/587/png-transparent-kimberly-hart-computer-icons-avatar-super-sentai-avatar-purple-heroes-magenta.png" ),
( "Diego", "diego123", "https://w7.pngwing.com/pngs/294/828/png-transparent-mask-computer-icons-avatar-heroes-mask-graphic-designer.png" ),
( "Javier", "javi123", "https://w7.pngwing.com/pngs/83/1009/png-transparent-smiley-computer-icons-super-sentai-adam-park-tommy-oliver-naxin-miscellaneous-smiley-emoticon.png" );

INSERT INTO producto ( nombre, descripcion, imagen, precio, codigo ) VALUES
( "Arroz", "Molinos Ala, 1kg.", "https://gidfood.com.ar/wp-content/uploads/1002001.jpg", 1449.50, "7791120100857" ),
( "Cafe", "Nescafe dolca, 170gr.", "https://granjaus.com/wp-content/uploads/2020/06/cafe-nescafe.jpg", 2400.00, "8445290271051" ),
( "Harina", "Pureza leudante, 1Kg.", "https://pureza.com.ar/wp-content/uploads/2019/06/Harina-Pureza-Leudante-UR-Vit-D-e1700650871724_2.png", 1969.50, "7792180142597" ),
( "Fideo", "La Providencia Spaghetti, 500gr.", "https://statics.dinoonline.com.ar/imagenes/large_460x460/2540830_l.jpg", 1699.77, "7798141970346" ),
( "Caldo de gallina", "Knorr, 2 cubos.", "https://laprovedeampip.com.ar/wp-content/uploads/2024/05/Caldos-de-gallina-knorr-2.png", 650.80, "7794000006669" ),
( "Arvejas", "Inca, 202gr.", "https://static.cotodigital3.com.ar/sitios/fotos/full/00128900/00128955.jpg", 1479.99, "7790079020257" ),
( "Durazno", "San remo, 820gr.", "https://superlago.com.ar/wp-content/uploads/2022/05/505.jpg", 2840.50, "7798022220720" ),
( "Polenta", "Presta pronto, 490gr.", "https://www.almacenfamily.com/productos/7790580660000-26-polenta-instantanea-presto-pronta-arcor-5e9d238b496b1.jpg", 2300.39, "7790580138738" ),
( "Sal gruesa", "Dos estrellas, 1Kg.", "https://alberdisa.vteximg.com.br/arquivos/ids/175467-600-600/41446.jpg", 1489.90, "7798022225237" ),
( "Yerba mate", "Taragui, 1Kg.", "https://ofishop.com/2468-large_default/yerba-mate-taragui-1kg.jpg", 3459.75, "7792736550080" );

INSERT INTO orden ( numero_ticket, fecha, id_usuario ) VALUES
( UUID(), TIMESTAMP('2020-10-08 12:23:32'), 3 ),
( UUID(), TIMESTAMP('2022-06-15 15:30:00'), 4 ),
( UUID(), TIMESTAMP('2024-07-12 20:23:40'), 4 );

INSERT INTO orden_producto ( id_orden, id_producto, precio, unidades ) VALUES
( 1, 1, 1449.50, 4 ),
( 1, 3, 1969.50, 2 ),
( 1, 5, 650.80, 3 ),
( 1, 6, 1479.99, 1 ),
( 1, 7, 2840.50, 1 ),
( 2, 2, 2400.00, 1 ),
( 2, 3, 1969.50, 2 ),
( 2, 9, 1489.90, 2 ),
( 3, 3, 1969.50, 2 ),
( 3, 5, 650.80, 1 ),
( 3, 2, 2400.00, 3 );

-- ----------------------------------------------------------------------------------------------------------
-- QUERYS
-- ----------------------------------------------------------------------------------------------------------
/*
-- TAREAS DEL BACKEND
	-- CR-D in orden
    -- C-UD in orden-producto
    
-- CREATE
INSERT INTO orden ( numero_ticket, fecha, id_usuario ) VALUES
( UUID(), TIMESTAMP('2022-03-15 16:35:17'), 1 );
INSERT INTO orden_producto ( id_orden, id_producto, precio, unidades ) VALUES
( 4, 1, 1449.50, 4 ),
( 4, 3, 1969.50, 2 ),
( 4, 5, 650.80, 3 );

INSERT INTO orden ( numero_ticket, fecha, id_usuario ) VALUES ( UUID(), CURRENT_TIMESTAMP, 4);

-- READ ALL FOR ID_USUARIO
SELECT o.id_usuario, o.id AS id_orden, o.numero_ticket, DATE(o.fecha) AS fecha, TIME(o.fecha) AS hora, SUM(op.precio*op.unidades) AS total
FROM orden o, producto p, orden_producto op 
WHERE o.id_usuario = 4 AND op.id_producto = p.id AND op.id_orden = o.id
GROUP BY o.id;

-- READ FOR ID_ORDEN
SELECT o.id_usuario, o.id AS id_orden, op.id AS id_orden_producto, p.nombre, p.descripcion, p.codigo, op.precio, op.unidades 
FROM orden o, producto p, orden_producto op 
WHERE op.id_producto = p.id AND op.id_orden = o.id AND op.id_orden = 2;

-- ----------------------------------------------------------------------------------------------------------
-- CREATE
INSERT INTO orden_producto ( id_orden, id_producto, precio, unidades ) VALUES ( 1, 1, 2500.50, 10 )
-- UPDATE
UPDATE orden_producto SET unidades = 10 WHERE id = 1;
-- DELETE
-- Para borrar una orden de compra. 1° borramos los registros de la tabla intermedia (producto_orden) y luego el registro de la orden.
DELETE FROM orden_producto WHERE id_orden = 2;
DELETE FROM orden WHERE id = 2;
*/