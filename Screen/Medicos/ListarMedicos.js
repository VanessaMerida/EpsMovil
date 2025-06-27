// ListarMedicos.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Importar Ionicons para iconos

export default function ListarMedicos() {
    const navigation = useNavigation();

    // Datos de ejemplo para los médicos
    const [medicos, setMedicos] = useState([
        { id: 'M001', nombre: 'Dr. Juan Pérez', especialidad: 'Cardiología', telefono: '555-1234', email: 'juan.perez@example.com', consultorio: 'C101', fechacontratacion: '2020-05-10', ultimamodificacion: '2024-06-20' },
        { id: 'M002', nombre: 'Dra. Ana Gómez', especialidad: 'Dermatología', telefono: '555-5678', email: 'ana.gomez@example.com', consultorio: 'C102', fechacontratacion: '2019-11-22', ultimamodificacion: '2024-06-15' },
        { id: 'M003', nombre: 'Dr. Luis Torres', especialidad: 'Pediatría', telefono: '555-8765', email: 'luis.torres@example.com', consultorio: 'C103', fechacontratacion: '2021-03-01', ultimamodificacion: '2024-06-01' },
        { id: 'M004', nombre: 'Dra. Clara Soto', especialidad: 'Neurología', telefono: '555-4321', email: 'clara.soto@example.com', consultorio: 'C104', fechacontratacion: '2018-09-15', ultimamodificacion: '2024-05-28' },
        { id: 'M005', nombre: 'Dr. Ricardo Paz', especialidad: 'Ortopedia', telefono: '555-9876', email: 'ricardo.paz@example.com', consultorio: 'C105', fechacontratacion: '2022-01-20', ultimamodificacion: '2024-06-10' },
    ]);

    // Función para renderizar cada ítem de la lista de médicos
    const renderMedicoItem = ({ item }) => (
        <TouchableOpacity
            style={styles.medicoItem}
            onPress={() => navigation.navigate('DetalleMedico', { medico: item })}
        >
            <View style={styles.itemContent}>
                <Ionicons name="person-outline" size={24} color="#4CAF50" style={styles.itemIcon} />
                <View style={styles.itemTextContainer}>
                    <Text style={styles.itemTitle}>{item.nombre}</Text>
                    <Text style={styles.itemDescription}>{item.especialidad}</Text>
                </View>
                <Ionicons name="chevron-forward-outline" size={20} color="#666" />
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Listado de Médicos</Text>
            <Text style={styles.subtitle}>Aquí aparecerá el listado de médicos registrados</Text>

            <FlatList
                data={medicos}
                renderItem={renderMedicoItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={<Text style={styles.emptyListText}>No hay médicos registrados.</Text>}
            />

            {/* Botones de acción */}

            <TouchableOpacity
                style={[styles.button, styles.addButton]}
                onPress={() => navigation.navigate("EditarMedico")} // Navega a la pantalla de edición sin pasar datos para "agregar"
            >
                <Ionicons name="add-circle-outline" size={20} color="#fff" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Agregar Médico</Text>
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
    medicoItem: { // Estilo para cada tarjeta de médico
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