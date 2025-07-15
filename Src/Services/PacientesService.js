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

export const listarPacientes = async () => {
  try {
    const response = await api.get("/pacientes");
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al obtener pacientes:", error.response ? error.response.data : error.message);
    return { success: false, message: getErrorMessage(error) };
  }
};

export const getPacienteById = async (id) => {
  try {
    const response = await api.get(`/pacientes/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al obtener el paciente:", error.response ? error.response.data : error.message);
    return { success: false, message: getErrorMessage(error) };
  }
};

export const crearPaciente = async (data) => {
  try {
    const response = await api.post("/pacientes", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al crear paciente:", error.response ? error.response.data : error.message);
    return { success: false, message: getErrorMessage(error) };
  }
};

export const editarPaciente = async (id, data) => {
  try {
    const response = await api.put(`/pacientes/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al editar paciente:", error.response ? error.response.data : error.message);
    return { success: false, message: getErrorMessage(error) };
  }
};

export const eliminarPaciente = async (id) => {
  try {
    await api.delete(`/pacientes/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar paciente:", error.response ? error.response.data : error.message);
    return { success: false, message: getErrorMessage(error) };
  }
};