// ListarCitasMedicas.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Importar Ionicons para iconos

export default function ListarCitasMedicas() {
    const navigation = useNavigation();

    // Datos de ejemplo para las citas médicas
    const [citasMedicas, setCitasMedicas] = useState([
        { id: 'CM001', paciente: 'Carlos García', medico: 'Dr. Juan Pérez', especialidad: 'Cardiología', fecha: '2025-07-01', hora: '10:00 AM', consultorio: 'C101', estado: 'Confirmada', motivo: 'Chequeo general', fechaCreacion: '2025-06-20', ultimaModificacion: '2025-06-25' },
        { id: 'CM002', paciente: 'María López', medico: 'Dra. Ana Gómez', especialidad: 'Dermatología', fecha: '2025-07-01', hora: '11:30 AM', consultorio: 'C102', estado: 'Pendiente', motivo: 'Consulta de rutina', fechaCreacion: '2025-06-21', ultimaModificacion: '2025-06-21' },
        { id: 'CM003', paciente: 'Pedro Ramírez', medico: 'Dr. Luis Torres', especialidad: 'Pediatría', fecha: '2025-07-02', hora: '09:00 AM', consultorio: 'C103', estado: 'Completada', motivo: 'Vacunación', fechaCreacion: '2025-06-15', ultimaModificacion: '2025-06-15' },
        { id: 'CM004', paciente: 'Laura Martínez', medico: 'Dra. Clara Soto', especialidad: 'Neurología', fecha: '2025-07-03', hora: '02:00 PM', consultorio: 'C104', estado: 'Cancelada', motivo: 'Cambio de planes', fechaCreacion: '2025-06-22', ultimaModificacion: '2025-06-23' },
    ]);

    // Función para renderizar cada ítem de la lista de citas médicas
    const renderCitaMedicaItem = ({ item }) => (
        <TouchableOpacity
            style={styles.citaMedicaItem}
            onPress={() => navigation.navigate('DetalleCitaMedica', { citaMedica: item })}
        >
            <View style={styles.itemContent}>
                <Ionicons name="calendar-outline" size={24} color="#2196F3" style={styles.itemIcon} />
                <View style={styles.itemTextContainer}>
                    <Text style={styles.itemTitle}>{item.paciente} con {item.medico}</Text>
                    <Text style={styles.itemDescription}>{item.especialidad} - {item.fecha} {item.hora}</Text>
                    <Text style={[styles.itemStatus, { color: item.estado === 'Confirmada' ? '#28A745' : item.estado === 'Pendiente' ? '#FFC107' : item.estado === 'Cancelada' ? '#DC3545' : '#6c757d' }]}>
                        Estado: {item.estado}
                    </Text>
                </View>
                <Ionicons name="chevron-forward-outline" size={20} color="#666" />
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Listado de Citas Médicas</Text>
            <Text style={styles.subtitle}>Aquí aparecerá el listado de citas médicas registradas</Text>

            <FlatList
                data={citasMedicas}
                renderItem={renderCitaMedicaItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={<Text style={styles.emptyListText}>No hay citas médicas registradas.</Text>}
            />
            
            {/* Botones de acción */}

            <TouchableOpacity
                style={[styles.button, styles.addButton]}
                onPress={() => navigation.navigate("EditarCitaMedica")} // Navega a la pantalla de edición sin pasar datos para "agregar"
            >
                <Ionicons name="add-circle-outline" size={20} color="#fff" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Agregar Cita Médica</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
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
        paddingBottom: 20, // Espacio al final de la lista antes de los botones
    },
    citaMedicaItem: { // Estilo para cada tarjeta de cita médica
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemIcon: {
        marginRight: 10,
    },
    itemTextContainer: {
        flex: 1, // Para que el texto ocupe el espacio restante
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    itemDescription: {
        fontSize: 14,
        color: '#777',
        marginTop: 2,
    },
    itemStatus: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 4,
    },
    emptyListText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#999',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 8,
        marginVertical: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    detailButton: {
        backgroundColor: '#007BFF', // Azul
    },
    editButton: {
        backgroundColor: '#FFC107', // Amarillo
    },
    addButton: {
        backgroundColor: '#28A745', // Verde
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonIcon: {
        marginRight: 8,
    },
});