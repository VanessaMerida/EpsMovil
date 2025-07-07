import api from "./Conexion";

export const listarEspecialidades = async () => {
  try {
    const response = await api.get("/especialidades");
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al obtener especialidades:", error);
    return {
      success: false,
      message: error.response
        ? error.response.data.message
        : "Error de conexion",
    };
  }
};

export const eliminarEspecialidad = async (id) => {
  try {
    await api.delete(`/especialidades/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar especialidad:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexion",
    };
  }
};

export const crearEspecialidad = async (data) => {
  try {
    const response = await api.post("/especialidades", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al crear especialidad:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response ? error.response.data.message : "Error de conexion",
    };
  }
};

export const editarEspecialidad= async (id, data) => {
  try {
    const response = await api.put(`/especialidades/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al editar especialidad:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response ? error.response.data.message : "Error de conexion",
    };
  }
};