// Screen/CitasMedicas/DetalleCitaMedica.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, ActivityIndicator, Alert } from 'react-native';
import BotonComponent from '../../Components/BotonComponent';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getCitaMedicaById, actualizarEstadoCita } from '../../Src/Services/CitasMedicasService';
import { getUser } from '../../Src/Services/AuthService';

export default function DetalleCitaMedica() {
    const navigation = useNavigation();
    const route = useRoute();
    const citaId = route.params?.citaMedicaId;

    const [citaMedica, setCitaMedica] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);

    const cargarDetalles = async () => {
        if (!citaId) return;
        setLoading(true);
        try {
            const [citaResult, userResult] = await Promise.all([getCitaMedicaById(citaId), getUser()]);
            if (citaResult.success) setCitaMedica(citaResult.data);
            if (userResult.success) setUserRole(userResult.user.role);
        } catch (error) {
            Alert.alert("Error", "Error de conexión.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', cargarDetalles);
        return unsubscribe;
    }, [navigation, citaId]);

    const changeStatus = async (nuevoEstado) => {
        const result = await actualizarEstadoCita(citaMedica.id, nuevoEstado);
        if (result.success) {
            Alert.alert('Éxito', 'El estado de la cita ha sido actualizado.');
            cargarDetalles();
        } else {
            Alert.alert('Error', result.message);
        }
    };

    if (loading) {
        return <View style={styles.centered}><ActivityIndicator size="large" color="#6A5ACD" /></View>;
    }
    if (!citaMedica) {
        return <View style={styles.centered}><Text>No se encontraron datos para esta cita.</Text></View>;
    }

    const estadoCapitalizado = typeof citaMedica.estado === 'string' ? citaMedica.estado.charAt(0).toUpperCase() + citaMedica.estado.slice(1) : 'Sin estado';
    const statusColor = citaMedica.estado === 'confirmada' ? '#28A745' : citaMedica.estado === 'programada' ? '#FFC107' : '#DC3545';

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Detalle de Cita Médica</Text>

            {/* Tarjeta con la información de la cita */}
            <View style={styles.detailCard}>
                <Text style={styles.detailLabel}>Paciente:</Text>
                <Text style={styles.detailText}>{`${citaMedica.paciente?.nombres || ''} ${citaMedica.paciente?.apellidos || 'N/A'}`}</Text>
                <Text style={styles.detailLabel}>Médico:</Text>
                <Text style={styles.detailText}>{`${citaMedica.medico?.nombres || ''} ${citaMedica.medico?.apellidos || 'N/A'}`}</Text>
                <Text style={styles.detailLabel}>Especialidad:</Text>
                <Text style={styles.detailText}>{citaMedica.especialidad?.nombre || 'N/A'}</Text>
                <Text style={styles.detailLabel}>Fecha y Hora:</Text>
                <Text style={styles.detailText}>{new Date(citaMedica.fecha_hora).toLocaleString()}</Text>
                <Text style={styles.detailLabel}>Estado:</Text>
                <Text style={[styles.detailText, { color: statusColor, fontWeight: 'bold' }]}>{estadoCapitalizado}</Text>
            </View>

            {/* ✅ SECCIÓN DE BOTONES MOVIDA FUERA Y DEBAJO DE LA TARJETA */}
            <View style={styles.buttonContainer}>
                {/* Botón de editar para Administradores */}
                {userRole === 'administrador' && (
                    <BotonComponent title="Editar Cita (Admin)" onPress={() => navigation.navigate('FormularioCita', { citaMedica: citaMedica })} style={styles.editButton} />
                )}
                
                {/* Botones de acción para el Paciente */}
                {userRole === 'user' && citaMedica.estado === 'programada' && (
                    <>
                        <BotonComponent title="Confirmar Cita" onPress={() => changeStatus('confirmada')} style={styles.confirmButton} />
                        <BotonComponent title="Cancelar Cita" onPress={() => changeStatus('cancelada')} style={styles.cancelButton} />
                    </>
                )}
            </View>
        </ScrollView>
    );
}

// Estilos actualizados
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#f0f4f8",
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 25,
        color: "#333",
        textAlign: 'center',
    },
    detailCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
    },
    detailLabel: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#555',
        marginTop: 10,
        marginBottom: 4,
    },
    detailText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
        lineHeight: 22,
    },
    // ✅ NUEVO ESTILO PARA EL CONTENEDOR DE BOTONES
    buttonContainer: {
        width: '100%',
        marginTop: 20, // Espacio entre la tarjeta y los botones
    },
    editButton: {
        backgroundColor: '#FF9800',
        marginBottom: 10,
    },
    confirmButton: {
        backgroundColor: '#28A745',
        marginBottom: 10,
    },
    cancelButton: {
        backgroundColor: '#DC3545',
    },
});