import api from "./Conexion";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/login", { email, password });
    const { token } = response.data;
    await AsyncStorage.setItem("userToken", token);
    return { success: true, token };
  } catch (error) {
    console.error(
      "Error de login:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response
        ? error.response.data.message
        : "Error al conectar con el servidor. Por favor, inténtalo de nuevo más tarde.",
    };
  }
};

export const logoutUser = async () => {
  try {
    // Si tu API tiene un endpoint de logout que invalida el token en el servidor, úsalo.
    // await api.post("/logout");
    await AsyncStorage.removeItem("userToken");
    return { success: true };
  } catch (error) {
    console.error("Error al cerrar sesión:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response
        ? error.response.data.message
        : "Error al cerrar sesión. Por favor, inténtalo de nuevo.",
    };
  }
};

/**
 * Registra un nuevo usuario en la API.
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @param {string} role - 'user' o 'administrador'
 * @param {string|null} admin_code - El código secreto si el rol es 'administrador'
 */
export const registerUser = async (userData) => {
    try {
        // Ahora pasamos un solo objeto con todos los datos
        const response = await api.post("/registrar", userData);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error de registro:", error.response ? error.response.data : error.message);
        
        let errorMessage = "Ocurrió un error al registrar.";
        if (error.response?.data?.errors) {
            const validationErrors = Object.values(error.response.data.errors).flat().join('\n');
            errorMessage = `Por favor, corrige los siguientes errores:\n${validationErrors}`;
        } else if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
        }

        return {
            success: false,
            message: errorMessage,
        };
    }
};

/**
 * Llama a la API para eliminar la cuenta del usuario autenticado.
 */
export const deleteAccount = async () => {
  try {
    // La API usa el token que ya está en la cabecera (configurado en Conexion.js)
    const response = await api.delete("/user/delete");
    return { success: true, message: response.data.message };
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'No se pudo procesar la solicitud.' 
    };
  }
};

/**
 * Obtiene los datos del usuario autenticado desde la API.
 */
export const getUser = async () => {
  try {
    // Llama al endpoint 'me' que definimos en api.php para obtener el usuario
    const response = await api.get('/me'); 
    return { success: true, user: response.data.user };
  } catch (error) {
    console.error("Error al obtener datos del usuario:", error.response?.data || error.message);
    return { 
      success: false, 
      message: error.response?.data?.message || 'No se pudo obtener la información del usuario.' 
    };
  }
};

/**
 * Actualiza los datos del perfil del usuario autenticado.
 * @param {object} userData - Datos del usuario a actualizar (name, email, password opcional).
 */
export const updateUserProfile = async (userData) => {
  try {
    const response = await api.put('/user/update', userData);
    return { success: true, data: response.data };
  } catch (error) {
    let errorMessage = "Ocurrió un error al actualizar el perfil.";
    if (error.response?.data?.errors) {
        errorMessage = Object.values(error.response.data.errors).flat().join('\n');
    } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
    }
    return { success: false, message: errorMessage };
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/user/${userId}`);
    return { success: true, message: response.data.message };
  } catch (error) {
    console.error("Error al eliminar usuario:", error.response ? error.response.data : error.message);
    return { 
      success: false, 
      message: error.response?.data?.message || 'No se pudo eliminar el usuario.' 
    };
  }
}

