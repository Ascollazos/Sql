import { cargarLibrosAlaBaseDeDatos } from "./load_libros.js";
import { cargarPrestamosAlaBaseDeDatos } from "./load_prestamos.js";
import { cargarUsuariosAlaBaseDeDatos } from "./load_usuarios.js";

(async () => {
    try {
        console.log(' Iniciando seeders...');

        await cargarUsuariosAlaBaseDeDatos()
        await cargarLibrosAlaBaseDeDatos()
        await cargarPrestamosAlaBaseDeDatos()

        console.log(' Todos los seeders ejecutados correctamente.');
    } catch (error) {
        console.error(' Error ejecutando los seeders:', error.message);
    } finally {
        process.exit();
    }
})()