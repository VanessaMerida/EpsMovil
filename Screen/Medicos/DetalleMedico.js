// DetalleMedico.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BotonComponent from '../../Components/BotonComponent';
import { useNavigation, useRoute } from '@react-navigation/native'; // Importar useRoute

export default function DetalleMedico() {
    const navigation = useNavigation();
    const route = useRoute();

    // Obtener el médico de los parámetros. Si no hay, usar datos por defecto.
    const medico = route.params?.medico || {
        id: 'M000',
        nombre: 'Médico No Seleccionado',
        especialidad: 'N/A',
        telefono: 'N/A',
        email: 'N/A',
        consultorio: 'N/A',
        fechacontratacion: 'N/A',
        ultimamodificacion: 'N/A',
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalle de Médico</Text>
            <Text style={styles.subtitle}>Información detallada del médico seleccionado:</Text>

            <View style={styles.detailCard}>
                <Text style={styles.detailLabel}>Nombre:</Text>
                <Text style={styles.detailText}>{medico.nombre}</Text>

                <Text style={styles.detailLabel}>Especialidad:</Text>
                <Text style={styles.detailText}>{medico.especialidad}</Text>

                <Text style={styles.detailLabel}>Teléfono:</Text>
                <Text style={styles.detailText}>{medico.telefono}</Text>

                <Text style={styles.detailLabel}>Email:</Text>
                <Text style={styles.detailText}>{medico.email}</Text>

                <Text style={styles.detailLabel}>Consultorio:</Text>
                <Text style={styles.detailText}>{medico.consultorio}</Text>

                <Text style={styles.detailLabel}>Fecha de Contratación:</Text>
                <Text style={styles.detailText}>{medico.fechacontratacion}</Text>

                <Text style={styles.detailLabel}>Última Modificación:</Text>
                <Text style={styles.detailText}>{medico.ultimamodificacion}</Text>
            </View>

            <BotonComponent
                title="Editar Médico"
                onPress={() => navigation.navigate('EditarMedico', { medico: medico })} // Pasa el médico a la pantalla de edición
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f0f4f8",
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
        marginBottom: 30,
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
});