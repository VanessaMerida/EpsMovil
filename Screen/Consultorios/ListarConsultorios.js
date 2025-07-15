// Src/Screens/Consultorios/ListarConsultorios.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ListItemCard from '../../Components/ListItemCard';
import BotonComponent from '../../Components/BotonComponent';
import { listarConsultorios, eliminarConsultorio } from '../../Src/Services/ConsultoriosService'; // 1. IMPORTAR

export default function ListarConsultorios() {
    const navigation = useNavigation();

    // 2. ESTADOS PARA MANEJAR DATOS
    const [consultorios, setConsultorios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 3. FUNCIÓN PARA CARGAR DATOS
    const handleCargarConsultorios = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await listarConsultorios();
            if (result.success) {
                setConsultorios(result.data);
            } else {
                Alert.alert('Error', result.message || 'No se pudieron cargar los consultorios.');
            }
        } catch (err) {
            Alert.alert('Error', 'Error de conexión.');
        } finally {
            setLoading(false);
        }
    };
    
    // 4. USEEFFECT PARA CARGA INICIAL Y AL ENFOCAR
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleCargarConsultorios);
        return unsubscribe;
    }, [navigation]);

    // 5. LÓGICA PARA ELIMINAR
    const handleEliminar = (id) => {
        Alert.alert(
            'Confirmar Eliminación',
            '¿Estás seguro de que deseas eliminar este consultorio?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        const result = await eliminarConsultorio(id);
                        if (result.success) {
                            Alert.alert('Éxito', 'Consultorio eliminado correctamente.');
                            handleCargarConsultorios();
                        } else {
                            Alert.alert('Error', result.message || 'No se pudo eliminar el consultorio.');
                        }
                    },
                },
            ]
        );
    };

    const renderConsultorioItem = ({ item }) => (
        <ListItemCard
            title={item.nombre}
            description={`Ubicación: ${item.ubicacion}`}
            iconName="location-outline"
            iconColor="#FFD700"
            onPress={() => navigation.navigate('DetalleConsultorio', { consultorio: item })}
            onEdit={() => navigation.navigate('EditarConsultorio', { consultorio: item })}
            onDelete={() => handleEliminar(item.id)}
        />
    );

    if (loading && consultorios.length === 0) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#FFD700" />
                <Text>Cargando consultorios...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Listado de Consultorios</Text>
            <Text style={styles.subtitle}>Aquí aparecerán todos los consultorios registrados</Text>

            {error && <Text style={styles.errorMessage}>{error}</Text>}

            <FlatList
                data={consultorios}
                renderItem={renderConsultorioItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={<Text style={styles.emptyListText}>No hay consultorios registrados.</Text>}
                onRefresh={handleCargarConsultorios}
                refreshing={loading}
            />

            <BotonComponent
                title="Agregar Consultorio"
                onPress={() => navigation.navigate("EditarConsultorio")}
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
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#28A745',
    },
});