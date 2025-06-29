import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ListItemCard from '../../Components/ListItemCard';
import BotonComponent from '../../Components/BotonComponent'; 

export default function ListarCitasMedicas() {
    const navigation = useNavigation();

    const [citasMedicas, setCitasMedicas] = useState([
        { id: 'CM001', paciente: 'Carlos García', medico: 'Dr. Juan Pérez', especialidad: 'Cardiología', fecha: '2025-07-01', hora: '10:00 AM', consultorio: 'C101', estado: 'Confirmada', motivo: 'Chequeo general', fechaCreacion: '2025-06-20', ultimaModificacion: '2025-06-25' },
        { id: 'CM002', paciente: 'María López', medico: 'Dra. Ana Gómez', especialidad: 'Dermatología', fecha: '2025-07-01', hora: '11:30 AM', consultorio: 'C102', estado: 'Pendiente', motivo: 'Consulta de rutina', fechaCreacion: '2025-06-21', ultimaModificacion: '2025-06-21' },
        { id: 'CM003', paciente: 'Pedro Ramírez', medico: 'Dr. Luis Torres', especialidad: 'Pediatría', fecha: '2025-07-02', hora: '09:00 AM', consultorio: 'C103', estado: 'Completada', motivo: 'Vacunación', fechaCreacion: '2025-06-15', ultimaModificacion: '2025-06-15' },
        { id: 'CM004', paciente: 'Laura Martínez', medico: 'Dra. Clara Soto', especialidad: 'Neurología', fecha: '2025-07-03', hora: '02:00 PM', consultorio: 'C104', estado: 'Cancelada', motivo: 'Cambio de planes', fechaCreacion: '2025-06-22', ultimaModificacion: '2025-06-23' },
    ]);

    const renderCitaMedicaItem = ({ item }) => {
      
      const statusColor = item.estado === 'Confirmada' ? '#28A745' : item.estado === 'Pendiente' ? '#FFC107' : item.estado === 'Cancelada' ? '#DC3545' : '#6c757d';
      const extraContent = (
        <Text style={[styles.itemStatus, { color: statusColor }]}>
          Estado: {item.estado}
        </Text>
      );

      return (
        <ListItemCard
          title={`${item.paciente} con ${item.medico}`}
          description={`${item.especialidad} - ${item.fecha} ${item.hora}`}
          iconName="calendar-outline"
          iconColor="#6A5ACD"
          onPress={() => navigation.navigate('DetalleCitaMedica', { citaMedica: item })}
          extraContent={extraContent}
        />
      );
    };

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

            <BotonComponent
                title="Agregar Cita Médica"
                onPress={() => navigation.navigate("EditarCitaMedica")}
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
    itemStatus: { // Este estilo es específico de citas médicas
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 4,
    },
    addButton: {
        backgroundColor: '#28A745',
    },
});