// DetalleCitaMedica.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import BotonComponent from '../../Components/BotonComponent';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function DetalleCitaMedica() {
    const navigation = useNavigation();
    const route = useRoute();

    // Obtener la cita médica de los parámetros. Si no hay, usar datos por defecto.
    const citaMedica = route.params?.citaMedica || {
        id: 'CM000',
        paciente: 'N/A',
        medico: 'N/A',
        especialidad: 'N/A',
        fecha: 'N/A',
        hora: 'N/A',
        consultorio: 'N/A',
        estado: 'N/A',
        motivo: 'N/A',
        fechaCreacion: 'N/A',
        ultimaModificacion: 'N/A',
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Detalle de Cita Médica</Text>
                <Text style={styles.subtitle}>Información detallada de la cita seleccionada:</Text>

                <View style={styles.detailCard}>
                    <Text style={styles.detailLabel}>Paciente:</Text>
                    <Text style={styles.detailText}>{citaMedica.paciente}</Text>

                    <Text style={styles.detailLabel}>Médico:</Text>
                    <Text style={styles.detailText}>{citaMedica.medico}</Text>

                    <Text style={styles.detailLabel}>Especialidad:</Text>
                    <Text style={styles.detailText}>{citaMedica.especialidad}</Text>

                    <Text style={styles.detailLabel}>Fecha:</Text>
                    <Text style={styles.detailText}>{citaMedica.fecha}</Text>

                    <Text style={styles.detailLabel}>Hora:</Text>
                    <Text style={styles.detailText}>{citaMedica.hora}</Text>

                    <Text style={styles.detailLabel}>Consultorio:</Text>
                    <Text style={styles.detailText}>{citaMedica.consultorio}</Text>

                    <Text style={styles.detailLabel}>Estado:</Text>
                    <Text style={[styles.detailText, { color: citaMedica.estado === 'Confirmada' ? '#28A745' : citaMedica.estado === 'Pendiente' ? '#FFC107' : citaMedica.estado === 'Cancelada' ? '#DC3545' : '#6c757d', fontWeight: 'bold' }]}>
                        {citaMedica.estado}
                    </Text>

                    <Text style={styles.detailLabel}>Motivo:</Text>
                    <Text style={styles.detailText}>{citaMedica.motivo}</Text>

                    <Text style={styles.detailLabel}>Fecha de Creación:</Text>
                    <Text style={styles.detailText}>{citaMedica.fechaCreacion}</Text>

                    <Text style={styles.detailLabel}>Última Modificación:</Text>
                    <Text style={styles.detailText}>{citaMedica.ultimaModificacion}</Text>
                </View>
            </ScrollView>

            {/* Contenedor fijo para los botones en la parte inferior */}
            <View style={styles.fixedButtonsContainer}>
                <BotonComponent
                    title="Editar Cita Médica"
                    onPress={() => navigation.navigate('EditarCitaMedica', { citaMedica: citaMedica })} // Pasa la cita a la pantalla de edición
                    style={styles.editButton}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f4f8",
    },
    scrollContent: {
        flexGrow: 1,
        padding: 20,
        paddingBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        marginBottom: 25,
        textAlign: 'center',
    },
    detailCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        marginBottom: 10,
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
    fixedButtonsContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: Platform.OS === 'ios' ? 30 : 20,
        backgroundColor: '#f0f4f8',
        borderTopWidth: 1,
        borderColor: '#eee',
    },
    editButton: {
        backgroundColor: '#FF9800', // Color naranja para el botón de edición (coherente con ListarCitasMedicas)
    },
});