// DetallePaciente.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native'; // Importar ScrollView y Platform
import BotonComponent from '../../Components/BotonComponent';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function DetallePaciente() {
    const navigation = useNavigation();
    const route = useRoute();

    // Obtener el paciente de los parámetros. Si no hay, usar datos por defecto.
    const paciente = route.params?.paciente || {
        id: 'P000',
        nombre: 'Paciente No Seleccionado',
        apellido: 'N/A',
        fechaNacimiento: 'N/A',
        genero: 'N/A',
        telefono: 'N/A',
        email: 'N/A',
        direccion: 'N/A',
        fechaRegistro: 'N/A',
        ultimaActualizacion: 'N/A',
    };

    return (
        <View style={styles.container}> {/* Contenedor principal que ocupa toda la pantalla */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Detalle de Paciente</Text>
                <Text style={styles.subtitle}>Información detallada del paciente seleccionado:</Text>

                <View style={styles.detailCard}>
                    <Text style={styles.detailLabel}>Nombre Completo:</Text>
                    <Text style={styles.detailText}>{paciente.nombre} {paciente.apellido}</Text>

                    <Text style={styles.detailLabel}>Fecha de Nacimiento:</Text>
                    <Text style={styles.detailText}>{paciente.fechaNacimiento}</Text>

                    <Text style={styles.detailLabel}>Género:</Text>
                    <Text style={styles.detailText}>{paciente.genero}</Text>

                    <Text style={styles.detailLabel}>Teléfono:</Text>
                    <Text style={styles.detailText}>{paciente.telefono}</Text>

                    <Text style={styles.detailLabel}>Email:</Text>
                    <Text style={styles.detailText}>{paciente.email}</Text>

                    <Text style={styles.detailLabel}>Dirección:</Text>
                    <Text style={styles.detailText}>{paciente.direccion}</Text>

                    <Text style={styles.detailLabel}>Fecha de Registro:</Text>
                    <Text style={styles.detailText}>{paciente.fechaRegistro}</Text>

                    <Text style={styles.detailLabel}>Última Actualización:</Text>
                    <Text style={styles.detailText}>{paciente.ultimaActualizacion}</Text>
                </View>
                {/* Puedes añadir más campos aquí si es necesario */}
            </ScrollView>

            {/* Contenedor fijo para los botones en la parte inferior */}
            <View style={styles.fixedButtonsContainer}>
                <BotonComponent
                    title="Editar Paciente"
                    onPress={() => navigation.navigate('EditarPaciente', { paciente: paciente })} // Pasa el paciente a la pantalla de edición
                    style={styles.editButton} // Estilo específico para el botón de edición
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Ocupa toda la pantalla
        backgroundColor: "#f0f4f8",
    },
    scrollContent: {
        flexGrow: 1, // Permite que el contenido del ScrollView crezca y sea desplazable
        padding: 20, // Padding en el contenido que se desplaza
        paddingBottom: 20, // Espacio al final del contenido desplazable antes de los botones fijos
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
        marginBottom: 10, // Menos margen inferior para que el scroll termine antes de los botones fijos
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
    fixedButtonsContainer: { // Nuevo estilo para el contenedor de botones fijos
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: Platform.OS === 'ios' ? 30 : 20, // Más padding en iOS por el safe area inferior
        backgroundColor: '#f0f4f8', // Mismo color de fondo para que se integre
        borderTopWidth: 1,
        borderColor: '#eee', // Borde superior sutil
    },
    editButton: {
        backgroundColor: '#4CAF50', // Color verde para el botón de edición
    },
});