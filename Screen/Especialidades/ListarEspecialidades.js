import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import ListItemCard from '../../Components/ListItemCard'; // Asume que este componente puede recibir onEdit y onDelete
import BotonComponent from '../../Components/BotonComponent';
import { useNavigation } from '@react-navigation/native';
import { listarEspecialidades, eliminarEspecialidad } from '../../Src/Services/EspecialidadesService'; // Asegúrate de que estas funciones existan

// --- Componente Principal ListarEspecialidades ---
export default function ListarEspecialidades() {
    const [especialidades, setEspecialidades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Para manejar errores generales
    const navigation = useNavigation();

    // Función para cargar las especialidades desde el servicio
    const handleEspecialidades = async () => {
        setLoading(true);
        setError(null); // Limpiar errores previos
        try {
            const result = await listarEspecialidades();
            if (result.success) {
                setEspecialidades(result.data);
            } else {
                // Usar Alert.alert para errores
                Alert.alert('Error', result.message || 'Error al obtener especialidades');
                setError(result.message || 'Error al obtener especialidades');
            }
        } catch (err) {
            // Usar Alert.alert para errores de red/catch
            Alert.alert('Error', 'Error de conexión al obtener especialidades');
            setError('Error de conexión al obtener especialidades');
        } finally {
            setLoading(false);
        }
    };

    // Efecto para cargar las especialidades cuando la pantalla está en foco
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleEspecialidades);
        return unsubscribe;
    }, [navigation]);

    // Función para manejar la eliminación de una especialidad
    const handleEliminar = (id) => {
        Alert.alert(
            'Confirmar Eliminación',
            '¿Estás seguro de que deseas eliminar esta especialidad?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        setLoading(true); // Mostrar indicador de carga durante la eliminación
                        try {
                            const result = await eliminarEspecialidad(id);
                            if (result.success) {
                                Alert.alert('Éxito', 'Especialidad eliminada correctamente');
                                handleEspecialidades(); // Refrescar la lista
                            } else {
                                Alert.alert('Error', result.message || 'No se pudo eliminar la especialidad');
                            }
                        } catch (err) {
                            Alert.alert('Error', 'Error de conexión al eliminar la especialidad');
                        } finally {
                            setLoading(false);
                        }
                    }
                },
            ],
            { cancelable: false }
        );
    };

    // Función para navegar a la pantalla de edición de especialidad
    const handleEditar = (especialidad) => {
        navigation.navigate('EditarEspecialidad', { especialidad });
    };

    // Función para navegar a la pantalla de creación de especialidad
    const handleCrear = () => {
        navigation.navigate('EditarEspecialidad');
    };

    // Muestra un indicador de carga si los datos están cargando
    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#1e3799" />
            </View>
        );
    }

    // Renderiza el componente principal
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Listado de Especialidades</Text>
            <Text style={styles.subtitle}>Aquí aparecerán todas las especialidades registradas</Text>

            {error && <Text style={styles.errorMessage}>Error: {error}</Text>}

            <FlatList
                data={especialidades}
                renderItem={({ item }) => (
                    <ListItemCard
                        title={item.nombre}
                        description={item.descripcion}
                        iconName="medical-outline"
                        iconColor="#1E90FF"
                        onPress={() => navigation.navigate('DetalleEspecialidad', { especialidad: item })}
                        onEdit={() => handleEditar(item)} // Pasa la función de editar
                        onDelete={() => handleEliminar(item.id)} // Pasa la función de eliminar
                    />
                )}
                keyExtractor={item => item.id.toString()} // Asegura que sea string
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyListText}>No hay especialidades registradas.</Text>
                )}
            />

            <BotonComponent
                title="Agregar Especialidad"
                onPress={handleCrear}
                style={styles.addButton}
                iconName="add-circle-outline"
                iconColor="#fff"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    errorMessage: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
    listContent: {
        paddingBottom: 20,
    },
    emptyListText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#999',
    },
    addButton: {
        backgroundColor: '#28A745', // Verde para agregar
        position: 'absolute', // Para que flote
        bottom: 20,
        right: 20,
        borderRadius: 50, // Para hacerlo redondo si el BotonComponent lo permite o ajusta su estilo
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 5, // Sombra para Android
        shadowColor: '#000', // Sombra para iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});
