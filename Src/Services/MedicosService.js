import api from "./Conexion";

// Función para extraer el mensaje de error de forma segura
const getErrorMessage = (error) => {
    if (error.response && error.response.data && error.response.data.message) {
        return error.response.data.message;
    }
    if (error.response && typeof error.response.data === 'string') {
        return error.response.data;
    }
    return "Error de conexión o respuesta inesperada del servidor.";
};

export const listarMedicos = async () => {
  try {
    const response = await api.get("/medicos");
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al obtener médicos:", error.response ? error.response.data : error.message);
    return { success: false, message: getErrorMessage(error) };
  }
};

export const getMedicoById = async (id) => {
  try {
    const response = await api.get(`/medicos/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al obtener el médico:", error.response ? error.response.data : error.message);
    return { success: false, message: getErrorMessage(error) };
  }
};

export const crearMedico = async (data) => {
  try {
    const response = await api.post("/medicos", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al crear médico:", error.response ? error.response.data : error.message);
    return { success: false, message: getErrorMessage(error) };
  }
};

export const editarMedico = async (id, data) => {
  try {
    const response = await api.put(`/medicos/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al editar médico:", error.response ? error.response.data : error.message);
    return { success: false, message: getErrorMessage(error) };
  }
};

export const eliminarMedico = async (id) => {
  try {
    await api.delete(`/medicos/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar médico:", error.response ? error.response.data : error.message);
    return { success: false, message: getErrorMessage(error) };
  }
};