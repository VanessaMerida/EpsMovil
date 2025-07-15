// Screen/CitasMedicas/ListarCitasMedicas.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ListItemCard from '../../Components/ListItemCard';
import BotonComponent from '../../Components/BotonComponent';
import { listarCitasMedicas, eliminarCitaMedica } from '../../Src/Services/CitasMedicasService'; // Asegúrate de que este servicio exista

export default function ListarCitasMedicas() {
    const navigation = useNavigation();

    const [citasMedicas, setCitasMedicas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleCargarCitas = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await listarCitasMedicas();
            if (result.success) {
                setCitasMedicas(result.data);
            } else {
                Alert.alert('Error', result.message || 'No se pudieron cargar las citas.');
            }
        } catch (err) {
            Alert.alert('Error', 'Error de conexión.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleCargarCitas);
        return unsubscribe;
    }, [navigation]);

    const handleEliminar = (id) => {
        Alert.alert('Confirmar Eliminación', '¿Seguro que deseas eliminar esta cita médica?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Eliminar',
                style: 'destructive',
                onPress: async () => {
                    const result = await eliminarCitaMedica(id);
                    if (result.success) {
                        Alert.alert('Éxito', 'Cita eliminada correctamente.');
                        handleCargarCitas();
                    } else {
                        Alert.alert('Error', result.message || 'No se pudo eliminar la cita.');
                    }
                },
            },
        ]);
    };

    const renderCitaMedicaItem = ({ item }) => {
        const estadoCapitalizado = typeof item.estado === 'string'
            ? item.estado.charAt(0).toUpperCase() + item.estado.slice(1)
            : 'Sin estado';
            
        const statusColor = item.estado === 'programada' ? '#007BFF' : item.estado === 'confirmada' ? '#28A745' : item.estado === 'cancelada' ? '#DC3545' : '#6c757d';

        const extraContent = (
            <Text style={[styles.itemStatus, { color: statusColor }]}>
                Estado: {estadoCapitalizado}
            </Text>
        );

        return (
            <ListItemCard
                title={`Paciente: ${item.paciente?.nombres || 'N/A'}`}
                description={`Dr(a): ${item.medico?.nombres || 'N/A'} - ${new Date(item.fecha_hora).toLocaleDateString()}`}
                iconName="calendar-outline"
                iconColor="#6A5ACD"
                onPress={() => navigation.navigate('DetalleCitaMedica', { citaMedica: item })}
                onEdit={() => navigation.navigate('EditarCitaMedica', { citaMedica: item })}
                onDelete={() => handleEliminar(item.id)}
                extraContent={extraContent}
            />
        );
    };

    if (loading && citasMedicas.length === 0) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#6A5ACD" />
                <Text>Cargando citas...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Listado de Citas Médicas</Text>
            <Text style={styles.subtitle}>Aquí aparecerá el listado de citas médicas registradas</Text>

            <FlatList
                data={citasMedicas}
                renderItem={renderCitaMedicaItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={<Text style={styles.emptyListText}>No hay citas médicas registradas.</Text>}
                onRefresh={handleCargarCitas}
                refreshing={loading}
            />

            <BotonComponent
                title="Agregar Cita Médica"
                onPress={() => navigation.navigate("AgregarCitaMedica")} // Navega a la ruta de agregar
                style={styles.addButton}
                iconName="add-circle-outline"
                iconColor="#fff"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#333' },
    subtitle: { fontSize: 16, color: '#666', marginBottom: 20 },
    listContent: { paddingBottom: 80 },
    emptyListText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#999' },
    itemStatus: { fontSize: 14, fontWeight: 'bold', marginTop: 4 },
    addButton: { backgroundColor: '#28A745', position: 'absolute', bottom: 20, right: 20 },
});