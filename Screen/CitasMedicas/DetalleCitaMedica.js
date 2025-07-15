// Screen/CitasMedicas/DetalleCitaMedica.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, ActivityIndicator, Alert } from 'react-native';
import BotonComponent from '../../Components/BotonComponent';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getCitaMedicaById } from '../../Src/Services/CitasMedicasService'; // Importar el servicio

export default function DetalleCitaMedica() {
    const navigation = useNavigation();
    const route = useRoute();
    const citaId = route.params?.citaMedica.id;

    const [citaMedica, setCitaMedica] = useState(null);
    const [loading, setLoading] = useState(true);

    const cargarDetalles = async () => {
        if (!citaId) return;
        setLoading(true);
        try {
            const result = await getCitaMedicaById(citaId);
            if (result.success) {
                setCitaMedica(result.data);
            } else {
                Alert.alert("Error", "No se pudieron cargar los detalles de la cita.");
            }
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

    if (loading) {
        return <View style={styles.centered}><ActivityIndicator size="large" color="#6A5ACD" /></View>;
    }

    if (!citaMedica) {
        return <View style={styles.centered}><Text>No se encontraron datos para esta cita.</Text></View>;
    }

    const estadoCapitalizado = typeof citaMedica.estado === 'string'
        ? citaMedica.estado.charAt(0).toUpperCase() + citaMedica.estado.slice(1)
        : 'Sin estado';
        
    const statusColor = citaMedica.estado === 'programada' ? '#007BFF' : citaMedica.estado === 'confirmada' ? '#28A745' : citaMedica.estado === 'cancelada' ? '#DC3545' : '#6c757d';

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Detalle de Cita Médica</Text>
                <Text style={styles.subtitle}>Información detallada de la cita seleccionada:</Text>

                <View style={styles.detailCard}>
                    <Text style={styles.detailLabel}>Paciente:</Text>
                    <Text style={styles.detailText}>{`${citaMedica.paciente?.nombres || ''} ${citaMedica.paciente?.apellidos || ''}`}</Text>

                    <Text style={styles.detailLabel}>Médico:</Text>
                    <Text style={styles.detailText}>{`${citaMedica.medico?.nombres || ''} ${citaMedica.medico?.apellidos || ''}`}</Text>

                    <Text style={styles.detailLabel}>Especialidad:</Text>
                    <Text style={styles.detailText}>{citaMedica.especialidad?.nombre || 'N/A'}</Text>
                    
                    <Text style={styles.detailLabel}>Fecha y Hora:</Text>
                    <Text style={styles.detailText}>{new Date(citaMedica.fecha_hora).toLocaleString()}</Text>

                    <Text style={styles.detailLabel}>Consultorio:</Text>
                    <Text style={styles.detailText}>{citaMedica.consultorio?.nombre || 'N/A'}</Text>

                    <Text style={styles.detailLabel}>Estado:</Text>
                    <Text style={[styles.detailText, { color: statusColor, fontWeight: 'bold' }]}>
                        {estadoCapitalizado}
                    </Text>

                    <Text style={styles.detailLabel}>Notas:</Text>
                    <Text style={styles.detailText}>{citaMedica.notas || 'Sin notas'}</Text>
                </View>
            </ScrollView>

            <View style={styles.fixedButtonsContainer}>
                <BotonComponent
                    title="Editar Cita Médica"
                    onPress={() => navigation.navigate('EditarCitaMedica', { citaMedica: citaMedica })}
                    style={styles.editButton}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f0f4f8" },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    scrollContent: { flexGrow: 1, padding: 20, paddingBottom: 20 },
    title: { fontSize: 26, fontWeight: "bold", marginBottom: 10, color: "#333", textAlign: 'center' },
    subtitle: { fontSize: 16, color: "#666", marginBottom: 25, textAlign: 'center' },
    detailCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, marginBottom: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 5, width: '100%' },
    detailLabel: { fontSize: 15, fontWeight: 'bold', color: '#555', marginTop: 10, marginBottom: 4 },
    detailText: { fontSize: 16, color: '#333', marginBottom: 8, lineHeight: 22 },
    fixedButtonsContainer: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: Platform.OS === 'ios' ? 30 : 20, backgroundColor: '#f0f4f8', borderTopWidth: 1, borderColor: '#eee' },
    editButton: { backgroundColor: '#FF9800' },
});