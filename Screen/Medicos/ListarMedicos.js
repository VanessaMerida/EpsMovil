// Src/Screens/Medicos/ListarMedicos.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ListItemCard from '../../Components/ListItemCard';
import BotonComponent from '../../Components/BotonComponent';
import { listarMedicos, eliminarMedico } from '../../Src/Services/MedicosService'; // 1. IMPORTAR SERVICIOS

export default function ListarMedicos() {
    const navigation = useNavigation();

    // 2. ESTADOS PARA MANEJAR DATOS, CARGA Y ERRORES
    const [medicos, setMedicos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 3. FUNCIÓN PARA CARGAR DATOS DESDE LA API
    const handleCargarMedicos = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await listarMedicos();
            if (result.success) {
                setMedicos(result.data);
            } else {
                Alert.alert('Error', result.message || 'No se pudieron cargar los médicos.');
            }
        } catch (err) {
            Alert.alert('Error', 'Error de conexión al cargar médicos.');
        } finally {
            setLoading(false);
        }
    };

    // 4. USEEFFECT PARA CARGAR DATOS AL ENFOCAR LA PANTALLA
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleCargarMedicos);
        return unsubscribe;
    }, [navigation]);

    // 5. LÓGICA PARA ELIMINAR
    const handleEliminar = (medicoId) => {
        Alert.alert(
            'Confirmar Eliminación',
            '¿Estás seguro de que deseas eliminar este médico?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        const result = await eliminarMedico(medicoId);
                        if (result.success) {
                            Alert.alert('Éxito', 'Médico eliminado correctamente.');
                            handleCargarMedicos(); // Recargar la lista
                        } else {
                            Alert.alert('Error', result.message || 'No se pudo eliminar el médico.');
                        }
                    },
                },
            ]
        );
    };

    const renderMedicoItem = ({ item }) => (
        <ListItemCard
            title={`${item.nombres} ${item.apellidos}`} // Ajustado a los nombres de columna de tu migración
            description={`ID: ${item.documento}`} // Usamos el documento como descripción
            iconName="person-outline"
            iconColor="#4CAF50"
            onPress={() => navigation.navigate('DetalleMedico', { medico: item })}
            // 6. PASAR FUNCIONES DE EDITAR Y ELIMINAR AL COMPONENTE
            onEdit={() => navigation.navigate('EditarMedico', { medico: item })}
            onDelete={() => handleEliminar(item.id)}
        />
    );

    // Indicador de carga mientras se obtienen los datos
    if (loading && medicos.length === 0) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#4CAF50" />
                <Text>Cargando médicos...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Listado de Médicos</Text>
            <Text style={styles.subtitle}>Aquí aparecerá el listado de médicos registrados</Text>
            
            {error && <Text style={styles.errorMessage}>{error}</Text>}

            <FlatList
                data={medicos}
                renderItem={renderMedicoItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={<Text style={styles.emptyListText}>No hay médicos registrados.</Text>}
                onRefresh={handleCargarMedicos}
                refreshing={loading}
            />

            <BotonComponent
                title="Agregar Médico"
                onPress={() => navigation.navigate("EditarMedico")}
                style={styles.addButton} // Estilo para el botón flotante
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
        paddingBottom: 80, // Más espacio para que el botón no tape el último item
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
        position: 'absolute', // Posicionamiento flotante
        bottom: 20,
        right: 20,
        backgroundColor: '#28A745',
    },
});