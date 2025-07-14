import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert // Usando Alert para la retroalimentación al usuario
} from 'react-native';


import { crearEspecialidad, editarEspecialidad } from '../../Src/Services/EspecialidadesService'; // Asegúrate de que la ruta sea correcta

export default function EditarEspecialidad() {
    const navigation = useNavigation();
    const route = useRoute();

    // Obtener el objeto de especialidad de los parámetros de navegación, si existe
    const especialidad = route.params?.especialidad;

    // Estado para el nombre de la especialidad, inicializado con datos existentes si se está editando
    const [nombre, setNombre] = useState(especialidad?.nombre || '');
    // Estado para la descripción de la especialidad, inicializado con datos existentes si se está editando
    const [descripcion, setDescripcion] = useState(especialidad?.descripcion || '');
    // Estado para gestionar el indicador de carga durante las llamadas a la API
    const [loading, setLoading] = useState(false);

    // Determinar si el componente está en modo 'edición' o 'creación'
    const esEdicion = !!especialidad;

    /**
     * Maneja el proceso de guardado tanto para crear como para editar especialidades.
     * Realiza validación, llama al servicio API apropiado y proporciona retroalimentación al usuario.
     */
    const handleGuardar = async () => {
        // Validación básica: asegurar que el nombre de la especialidad no esté vacío
        if (!nombre.trim()) {
            Alert.alert('Error', 'Por favor, ingresa el nombre de la especialidad.');
            return;
        }

        setLoading(true); // Mostrar indicador de carga

        try {
            let result;
            // Datos a enviar a la API, incluyendo el nombre y la descripción
            const dataToSave = {
                nombre: nombre,
                descripcion: descripcion // Incluir la descripción
            };

            if (esEdicion) {
                // Si está en modo edición, llamar al servicio editarEspecialidad
                result = await editarEspecialidad(especialidad.id, dataToSave);
            } else {
                // Si está en modo creación, llamar al servicio crearEspecialidad
                result = await crearEspecialidad(dataToSave);
            }

            if (result.success) {
                // Mostrar mensaje de éxito y navegar hacia atrás si la operación fue exitosa
                Alert.alert('Éxito', esEdicion ? 'Especialidad actualizada correctamente' : 'Especialidad creada correctamente');
                navigation.goBack();
            } else {
                // Mostrar mensaje de error si la llamada a la API no fue exitosa
                Alert.alert('Error', result.message || 'Ocurrió un error al guardar la especialidad');
            }
        } catch (error) {
            // Capturar cualquier error inesperado durante la llamada a la API
            console.error('Error al guardar especialidad:', error);
            Alert.alert('Error', 'Ocurrió un error inesperado al guardar la especialidad');
        } finally {
            setLoading(false); // Ocultar indicador de carga independientemente del éxito o fracaso
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {esEdicion ? 'Editar Especialidad' : 'Nueva Especialidad'}
            </Text>

            {/* Campo de entrada para el nombre de la especialidad */}
            <TextInput
                style={styles.input}
                placeholder="Nombre de la Especialidad"
                value={nombre}
                onChangeText={setNombre}
                autoCapitalize="words" // Capitalizar la primera letra de cada palabra
            />

            {/* Campo de entrada para la descripción de la especialidad */}
            <TextInput
                style={[styles.input, styles.textArea]} // Usar estilos adicionales para el área de texto
                placeholder="Descripción de la Especialidad"
                value={descripcion}
                onChangeText={setDescripcion}
                multiline // Permitir múltiples líneas
                numberOfLines={4} // Sugerir 4 líneas visibles
                textAlignVertical="top" // Alinear el texto en la parte superior
            />

            {/* Botón Guardar */}
            <TouchableOpacity
                style={styles.boton}
                onPress={handleGuardar}
                disabled={loading} // Deshabilitar el botón mientras se carga
            >
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.textoBoton}>
                        {esEdicion ? "Guardar Cambios" : "Crear Especialidad"}
                    </Text>
                )}
            </TouchableOpacity>

            {/* Botón Cancelar */}
            <TouchableOpacity
                style={styles.botonCancelar}
                onPress={() => navigation.goBack()} // Navegar hacia atrás sin guardar
            >
                <Text style={styles.textoBotonCancelar}>Cancelar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#f8f9fa', // Fondo claro para la pantalla
        justifyContent: 'center', // Centrar contenido verticalmente
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#343a40', // Texto más oscuro para el título
    },
    input: {
        height: 50, // Altura predeterminada para campos de una línea
        borderColor: '#ced4da',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 20,
        fontSize: 16,
        backgroundColor: '#fff', // Fondo blanco para la entrada
        shadowColor: '#000', // Añadir sombra sutil
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2, // Para sombra en Android
    },
    textArea: {
        height: 120, // Mayor altura para el área de texto de la descripción
        paddingVertical: 15, // Padding vertical para el texto multilínea
    },
    boton: {
        backgroundColor: '#007BFF', // Color azul primario
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#007BFF', // Sombra que coincide con el color del botón
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5, // Para sombra en Android
    },
    textoBoton: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    botonCancelar: {
        backgroundColor: '#6c757d', // Color gris para cancelar
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 15,
        shadowColor: '#6c757d',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    textoBotonCancelar: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
