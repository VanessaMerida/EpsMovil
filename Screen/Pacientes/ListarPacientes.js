// Src/Screens/Pacientes/ListarPacientes.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ListItemCard from '../../Components/ListItemCard';
import BotonComponent from '../../Components/BotonComponent';
import { listarPacientes, eliminarPaciente } from '../../Src/Services/PacientesService'; // 1. IMPORTAR

export default function ListarPacientes() {
    const navigation = useNavigation();
    
    // 2. ESTADOS
    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 3. FUNCIÓN DE CARGA
    const handleCargarPacientes = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await listarPacientes();
            if (result.success) {
                setPacientes(result.data);
            } else {
                Alert.alert('Error', result.message || 'No se pudieron cargar los pacientes.');
            }
        } catch (err) {
            Alert.alert('Error', 'Error de conexión.');
        } finally {
            setLoading(false);
        }
    };

    // 4. USEEFFECT PARA CARGAR AL ENFOCAR
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleCargarPacientes);
        return unsubscribe;
    }, [navigation]);

    // 5. LÓGICA DE ELIMINACIÓN
    const handleEliminar = (id) => {
        Alert.alert('Confirmar Eliminación', '¿Estás seguro de que deseas eliminar este paciente?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Eliminar',
                style: 'destructive',
                onPress: async () => {
                    const result = await eliminarPaciente(id);
                    if (result.success) {
                        Alert.alert('Éxito', 'Paciente eliminado correctamente.');
                        handleCargarPacientes();
                    } else {
                        Alert.alert('Error', result.message || 'No se pudo eliminar al paciente.');
                    }
                },
            },
        ]);
    };

    const renderPacienteItem = ({ item }) => (
        <ListItemCard
            title={`${item.nombres} ${item.apellidos}`}
            description={`Documento: ${item.documento}`}
            iconName="body-outline"
            iconColor="#FF6347"
            onPress={() => navigation.navigate('DetallePaciente', { paciente: item })}
            onEdit={() => navigation.navigate('EditarPaciente', { paciente: item })}
            onDelete={() => handleEliminar(item.id)}
        />
    );
    
    if (loading && pacientes.length === 0) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#FF6347" />
                <Text>Cargando pacientes...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Listado de Pacientes</Text>
            <Text style={styles.subtitle}>Aquí aparecerán todos los pacientes registrados</Text>
            {error && <Text style={styles.errorMessage}>{error}</Text>}
            <FlatList
                data={pacientes}
                renderItem={renderPacienteItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={<Text style={styles.emptyListText}>No hay pacientes registrados.</Text>}
                onRefresh={handleCargarPacientes}
                refreshing={loading}
            />
            <BotonComponent
                title="Agregar Paciente"
                onPress={() => navigation.navigate("EditarPaciente")}
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
    listContent: {
        paddingBottom: 80,
    },
    emptyListText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#999',
    },
    errorMessage: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
    addButton: {
        backgroundColor: '#28A745',
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
});