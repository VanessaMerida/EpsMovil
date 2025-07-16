// Screen/CitasMedicas/ListarCitasMedicas.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ListItemCard from '../../Components/ListItemCard';
import BotonComponent from '../../Components/BotonComponent';
import { listarCitasMedicas, actualizarEstadoCita } from '../../Src/Services/CitasMedicasService';
import { getUser } from '../../Src/Services/AuthService';

export default function ListarCitasMedicas() {
    const navigation = useNavigation();
    const [citasMedicas, setCitasMedicas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);

    const handleCargarCitas = async () => {
        setLoading(true);
        const [citasResult, userResult] = await Promise.all([listarCitasMedicas(), getUser()]);
        if (citasResult.success) setCitasMedicas(citasResult.data);
        if (userResult.success) setUserRole(userResult.user.role);
        setLoading(false);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleCargarCitas);
        return unsubscribe;
    }, [navigation]);

    const handleUpdateStatus = (cita) => {
        if (userRole !== 'user' || cita.estado !== 'programada') return;

        Alert.alert('Gestionar Cita', '¿Qué deseas hacer con esta cita?', [
            { text: 'Confirmar Cita', onPress: () => changeStatus(cita.id, 'confirmada') },
            { text: 'Cancelar Cita', style: 'destructive', onPress: () => changeStatus(cita.id, 'cancelada') },
            { text: 'Cerrar', style: 'cancel' },
        ]);
    };

    const changeStatus = async (id, estado) => {
        const result = await actualizarEstadoCita(id, estado);
        if (result.success) {
            Alert.alert('Éxito', 'El estado de la cita ha sido actualizado.');
            handleCargarCitas();
        } else {
            Alert.alert('Error', result.message);
        }
    };

    const renderCitaMedicaItem = ({ item }) => {
        const estadoCapitalizado = typeof item.estado === 'string' ? item.estado.charAt(0).toUpperCase() + item.estado.slice(1) : 'Sin estado';
        const statusColor = item.estado === 'confirmada' ? '#28A745' : item.estado === 'programada' ? '#FFC107' : '#DC3545';
        
        return (
            <TouchableOpacity onLongPress={() => handleUpdateStatus(item)}>
                <ListItemCard
                    title={`Dr(a): ${item.medico?.nombres || 'N/A'}`}
                    description={`Especialidad: ${item.especialidad?.nombre || 'N/A'} - ${new Date(item.fecha_hora).toLocaleDateString()}`}
                    iconName="calendar-outline"
                    iconColor="#6A5ACD"
                    onPress={() => navigation.navigate('DetalleCitaMedica', { citaMedicaId: item.id })}
                    onEdit={userRole === 'administrador' ? () => navigation.navigate('FormularioCita', { citaMedica: item }) : null}
                    extraContent={<Text style={[styles.itemStatus, { color: statusColor }]}>Estado: {estadoCapitalizado}</Text>}
                />
            </TouchableOpacity>
        );
    };

    // ✅ COMPONENTE DEL BOTÓN PARA EL FOOTER DE LA LISTA
    const renderListFooter = () => {
        // Solo muestra el botón si el rol es 'user'
        if (userRole === 'user') {
            return (
                <BotonComponent
                    title="Agendar Nueva Cita"
                    onPress={() => navigation.navigate("FormularioCita")}
                    style={styles.addButton} // Usamos un nuevo estilo
                    iconName="add-circle-outline"
                />
            );
        }
        return null; // No muestra nada si no es un 'user'
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mis Citas Médicas</Text>
            <Text style={styles.subtitle}>Selecciona una cita para ver sus detalles</Text>
            <FlatList
                data={citasMedicas}
                renderItem={renderCitaMedicaItem}
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={<Text style={styles.emptyListText}>No tienes citas médicas programadas.</Text>}
                onRefresh={handleCargarCitas}
                refreshing={loading}
                // ✅ SE AÑADE EL BOTÓN COMO FOOTER
                ListFooterComponent={renderListFooter}
                contentContainerStyle={styles.listContent}
            />
            {/* El botón ya no está aquí flotando */}
        </View>
    );
}

// Estilos actualizados
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#333' },
    subtitle: { fontSize: 16, color: '#666', marginBottom: 20 },
    emptyListText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#999' },
    itemStatus: { fontSize: 14, fontWeight: 'bold', marginTop: 4 },
    listContent: { paddingBottom: 20 }, // Reducimos el padding inferior
    // ✅ NUEVO ESTILO PARA EL BOTÓN EN LA LISTA
    addButton: { 
        backgroundColor: '#28A745',
        marginTop: 20, // Espacio entre la lista y el botón
        marginBottom: 10,
    },
});