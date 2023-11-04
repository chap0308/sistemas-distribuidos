export const fechaActualFormateada = (sumardia = 0) => {
    // Crear una nueva instancia de Date y configurar la zona horaria en UTC-5 (Perú)
    const fechaActualPeru = new Date();
    fechaActualPeru.setTime(fechaActualPeru.getTime() - (5 * 60 * 60));

    // Obtener el año, mes y día
    const anio = fechaActualPeru.getFullYear();
    const mes = (fechaActualPeru.getMonth() + 1).toString().padStart(2, '0');
    const dia = (fechaActualPeru.getDate()).toString().padStart(2, '0');

    // Formatear la fecha en el formato "AAAA-MM-DD"
    const fechaEnFormato = `${anio}-${mes}-${dia}`;
    return fechaEnFormato;
}
