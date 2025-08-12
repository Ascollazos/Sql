import fs from 'fs';
import path, { resolve } from 'path';
import csv from 'csv-parser';
import { pool } from '../conexion_db.js';


export async function cargarUsuariosALaBaseDeDatos() {
    
    const rutaArchivo = path.resolve('sever/data/01_usuarios.csv')
    const usuarios = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(rutaArchivo)
            .pipe(csv())
            .on("data", (fila) => {
                usuarios.push([
                    fila.id_user,
                    fila.Nombre_del_Cliente.trim(),
                    fila.Número_de_Identificación,
                    fila.Dirección,
                    fila.Teléfono,
                    fila.Correo_Electrónico,
                    fila.Plataforma_Utilizada
                ])
            })
            .on('end', async ()=> {
                try {
                    const sql = 'INSERT INTO customers (Número_de_Identificación,Dirección,Teléfono,Correo_Electrónico,Plataforma_Utilizada) VALUES ?';
                    const [result] = await pool.query(sql, [usuarios]);

                    console.log(`Se insertaron usuarios ${result.affectedRows}`);
                    resolve();
                } catch (error) {
                    console.error("Error al insertar los usuarios", error.message);
                    reject(error)
                }
            })
            .on('error', (err) => {
                console.error('Error al leer el archivo CSV de usuarios:', error.message);
                reject(error);

            })
    })
}