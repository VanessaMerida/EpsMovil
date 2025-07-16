// Screen/Especialidades/ListarEspecialidades.js

import { View, Text, FlatList, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import ListItemCard from '../../Components/ListItemCard';
import BotonComponent from '../../Components/BotonComponent';
import { useNavigation } from '@react-navigation/native';
import { listarEspecialidades, eliminarEspecialidad } from '../../Src/Services/EspecialidadesService';
import { getUser } from '../../Src/Services/AuthService'; // 1. Importar servicio de usuario

export default function ListarEspecialidades() {
    const [especialidades, setEspecialidades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userRole, setUserRole] = useState(null); // 2. Estado para el rol
    const navigation = useNavigation();

    const handleCargarDatos = async () => {
        setLoading(true);
        setError(null);
        try {
            const [especialidadesResult, userResult] = await Promise.all([
                listarEspecialidades(),
                getUser()
            ]);

            if (especialidadesResult.success) {
                setEspecialidades(especialidadesResult.data);
            } else {
                Alert.alert('Error', especialidadesResult.message || 'Error al obtener especialidades');
                setError(especialidadesResult.message);
            }

            if (userResult.success) {
                setUserRole(userResult.user.role);
            }

        } catch (err) {
            Alert.alert('Error', 'Error de conexión.');
            setError('Error de conexión.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleCargarDatos);
        return unsubscribe;
    }, [navigation]);

    const handleEliminar = (id) => {
        Alert.alert('Confirmar Eliminación', '¿Estás seguro de que deseas eliminar esta especialidad?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Eliminar',
                style: 'destructive',
                onPress: async () => {
                    setLoading(true);
                    const result = await eliminarEspecialidad(id);
                    if (result.success) {
                        Alert.alert('Éxito', 'Especialidad eliminada correctamente');
                        handleCargarDatos();
                    } else {
                        Alert.alert('Error', result.message);
                    }
                    setLoading(false);
                }
            },
        ]);
    };

    const handleEditar = (especialidad) => {
        navigation.navigate('EditarEspecialidad', { especialidad });
    };

    const handleCrear = () => {
        navigation.navigate('EditarEspecialidad');
    };

    if (loading) {
        return <View style={styles.centered}><ActivityIndicator size="large" color="#1e3799" /></View>;
    }

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
                        // 3. Pasar props condicionalmente
                        onEdit={userRole === 'administrador' ? () => handleEditar(item) : null}
                        onDelete={userRole === 'administrador' ? () => handleEliminar(item.id) : null}
                    />
                )}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={<Text style={styles.emptyListText}>No hay especialidades registradas.</Text>}
            />

            {/* 4. Renderizar botón condicionalmente */}
            {userRole === 'administrador' && (
                <BotonComponent
                    title="Agregar Especialidad"
                    onPress={handleCrear}
                    style={styles.addButton}
                    iconName="add-circle-outline"
                    iconColor="#fff"
                />
            )}
        </View>
    );
}

// Tus estilos se mantienen iguales
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#333' },
    subtitle: { fontSize: 16, color: '#666', marginBottom: 20 },
    errorMessage: { color: 'red', textAlign: 'center', marginBottom: 10 },
    listContent: { paddingBottom: 80 },
    emptyListText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#999' },
    addButton: { backgroundColor: '#28A745', position: 'absolute', bottom: 20, right: 20, borderRadius: 50, paddingVertical: 10, paddingHorizontal: 20, elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84 },
});