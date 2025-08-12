import mysql from "mysql2/promise"

export const pool = mysql.createPool({
    host:"localhost",
    database:"sistema_transaccional",
    port: "3306",
    user: "root",
    password: "TuNuevaContraseña",
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
})

async function probarConectionConLaBasesDeDatos()
{
    try {
        const connection = await pool.getConnection();
        console.log("Conecion a la base de datos es exitosa");
        connection.release
        } catch (error) {
        console.error("Error al conectarse conla base de datos", error.message);
        }
}

