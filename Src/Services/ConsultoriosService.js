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

export const listarConsultorios = async () => {
  try {
    const response = await api.get("/consultorios");
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al obtener consultorios:", error.response ? error.response.data : error.message);
    return { success: false, message: getErrorMessage(error) };
  }
};

export const getConsultorioById = async (id) => {
  try {
    const response = await api.get(`/consultorios/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al obtener el consultorio:", error.response ? error.response.data : error.message);
    return { success: false, message: getErrorMessage(error) };
  }
};

export const crearConsultorio = async (data) => {
  try {
    const response = await api.post("/consultorios", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al crear consultorio:", error.response ? error.response.data : error.message);
    return { success: false, message: getErrorMessage(error) };
  }
};

export const editarConsultorio = async (id, data) => {
  try {
    const response = await api.put(`/consultorios/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al editar consultorio:", error.response ? error.response.data : error.message);
    return { success: false, message: getErrorMessage(error) };
  }
};

export const eliminarConsultorio = async (id) => {
  try {
    await api.delete(`/consultorios/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar consultorio:", error.response ? error.response.data : error.message);
    return { success: false, message: getErrorMessage(error) };
  }
};