import api from "./Conexion";

// Función reutilizable para obtener un mensaje de error legible
const getErrorMessage = (error) => {
    if (error.response && error.response.data && error.response.data.message) {
        return error.response.data.message;
    }
    if (error.response && typeof error.response.data === 'string') {
        return error.response.data;
    }
    return "Error de conexión o respuesta inesperada del servidor.";
};

export const listarCitasMedicas = async () => {
  try {
    const response = await api.get("/citas-medicas");
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al obtener citas médicas:", error.response ? error.response.data : error.message);
    return { success: false, message: getErrorMessage(error) };
  }
};

export const getCitaMedicaById = async (id) => {
  try {
    const response = await api.get(`/citas-medicas/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al obtener la cita médica:", error.response ? error.response.data : error.message);
    return { success: false, message: getErrorMessage(error) };
  }
};

export const crearCitaMedica = async (data) => {
  try {
    const response = await api.post("/citas-medicas", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al crear cita médica:", error.response ? error.response.data : error.message);
    return { success: false, message: getErrorMessage(error) };
  }
};

export const editarCitaMedica = async (id, data) => {
  try {
    const response = await api.put(`/citas-medicas/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al editar cita médica:", error.response ? error.response.data : error.message);
    return { success: false, message: getErrorMessage(error) };
  }
};

export const eliminarCitaMedica = async (id) => {
  try {
    await api.delete(`/citas-medicas/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar cita médica:", error.response ? error.response.data : error.message);
    return { success: false, message: getErrorMessage(error) };
  }
};

export const actualizarEstadoCita = async (id, nuevoEstado) => {
  try {
    const response = await api.patch(`/citas-medicas/${id}/actualizar-estado`, { estado: nuevoEstado });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};