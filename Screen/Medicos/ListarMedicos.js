// Src/Screens/Medicos/ListarMedicos.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ListItemCard from '../../Components/ListItemCard';
import BotonComponent from '../../Components/BotonComponent'; // Reutilizando BotonComponent

export default function ListarMedicos() {
    const navigation = useNavigation();

    const [medicos, setMedicos] = useState([
        { id: 'M001', nombre: 'Dr. Juan Pérez', especialidad: 'Cardiología', telefono: '555-1234', email: 'juan.perez@example.com', consultorio: 'C101', fechacontratacion: '2020-05-10', ultimamodificacion: '2024-06-20' },
        { id: 'M002', nombre: 'Dra. Ana Gómez', especialidad: 'Dermatología', telefono: '555-5678', email: 'ana.gomez@example.com', consultorio: 'C102', fechacontratacion: '2019-11-22', ultimamodificacion: '2024-06-15' },
        { id: 'M003', nombre: 'Dr. Luis Torres', especialidad: 'Pediatría', telefono: '555-8765', email: 'luis.torres@example.com', consultorio: 'C103', fechacontratacion: '2021-03-01', ultimamodificacion: '2024-06-01' },
        { id: 'M004', nombre: 'Dra. Clara Soto', especialidad: 'Neurología', telefono: '555-4321', email: 'clara.soto@example.com', consultorio: 'C104', fechacontratacion: '2018-09-15', ultimamodificacion: '2024-05-28' },
        { id: 'M005', nombre: 'Dr. Ricardo Paz', especialidad: 'Ortopedia', telefono: '555-9876', email: 'ricardo.paz@example.com', consultorio: 'C105', fechacontratacion: '2022-01-20', ultimamodificacion: '2024-06-10' },
    ]);

    const renderMedicoItem = ({ item }) => (
        <ListItemCard
            title={item.nombre}
            description={`Especialidad: ${item.especialidad}`}
            iconName="person-outline"
            iconColor="#4CAF50"
            onPress={() => navigation.navigate('DetalleMedico', { medico: item })}
        />
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

            <BotonComponent
                title="Agregar Médico"
                onPress={() => navigation.navigate("EditarMedico")}
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
        paddingBottom: 20,
    },
    emptyListText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#999',
    },
    addButton: {
        backgroundColor: '#28A745',
    },
});