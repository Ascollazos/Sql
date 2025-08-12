DROP DATABASE IF EXISTS sistema_transaccional ;
CREATE DATABASE sistema_transaccional;
USE sistema_transaccional;

-- Tabla de Clientes con validación de email
DROP TABLE IF EXISTS customers ;
CREATE TABLE customers (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    indentification_number VARCHAR(20) NOT NULL UNIQUE,
    User_name VARCHAR(100) NOT NULL,
    direction TEXT NOT NULL,
    phone_number VARCHAR(30) NOT NULL,
    email VARCHAR(100) NOT NULL,
	plataforma ENUM('Nequi','Daviplata') NOT NULL,
    CONSTRAINT chk_email_format CHECK (email LIKE '%_@__%.__%' AND email NOT LIKE '% %')
);


-- Tabla de Facturas
DROP TABLE IF EXISTS facturas ;
CREATE TABLE facturas (
    id_factura INT AUTO_INCREMENT PRIMARY KEY,
    numero_factura VARCHAR(20) NOT NULL UNIQUE,
    periodo_facturacion VARCHAR(10) NOT NULL,
    monto_de_facturado DECIMAL(12, 2) NOT NULL,
    monto_pagado DECIMAL(12, 2) NOT NULL,
    FOREIGN KEY (id_de_la_transacción) REFERENCES transacciones(id_de_la_transacción)
);

-- Tabla de Transacción
DROP TABLE IF EXISTS transacciones ;
CREATE TABLE transacciones (
	id_transacción INT AUTO_INCREMENT PRIMARY KEY,
    id_de_la_transacción VARCHAR(50) NOT NULL,
    fecha_y_hora DATETIME NOT NULL,
    monto_de_la_transaccion DECIMAL(12, 2) NOT NULL,
    estado ENUM('Pendiente', 'Completada', 'Fallida') NOT NULL,
    tipo_de_transaccion VARCHAR(20) NOT NULL,
    FOREIGN KEY (id_factura) REFERENCES facturas(id_factura),
    FOREIGN KEY (id_user) REFERENCES customers(id_user)
);
