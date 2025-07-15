// Screens/Pacientes/DetallePaciente.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, ActivityIndicator, Alert } from 'react-native';
import BotonComponent from '../../Components/BotonComponent';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getPacienteById } from '../../Src/Services/PacientesService';

export default function DetallePaciente() {
    const navigation = useNavigation();
    const route = useRoute();
    const pacienteId = route.params?.paciente.id;

    const [paciente, setPaciente] = useState(null);
    const [loading, setLoading] = useState(true);

    const cargarDetallesPaciente = async () => {
        if (!pacienteId) return;
        setLoading(true);
        try {
            const result = await getPacienteById(pacienteId);
            if (result.success) {
                setPaciente(result.data);
            } else {
                Alert.alert("Error", "No se pudieron cargar los detalles del paciente.");
            }
        } catch (error) {
            Alert.alert("Error", "Error de conexión.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', cargarDetallesPaciente);
        return unsubscribe;
    }, [navigation, pacienteId]);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#FF6347" />
            </View>
        );
    }
    
    if (!paciente) {
        return (
            <View style={styles.centered}>
                <Text>No se encontraron datos para este paciente.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Detalle de Paciente</Text>
                <Text style={styles.subtitle}>Información detallada del paciente seleccionado:</Text>

                <View style={styles.detailCard}>
                    <Text style={styles.detailLabel}>Nombre Completo:</Text>
                    <Text style={styles.detailText}>{paciente.nombres} {paciente.apellidos}</Text>

                    <Text style={styles.detailLabel}>Documento:</Text>
                    <Text style={styles.detailText}>{paciente.documento}</Text>
                    
                    <Text style={styles.detailLabel}>Teléfono:</Text>
                    <Text style={styles.detailText}>{paciente.telefono}</Text>

                    <Text style={styles.detailLabel}>Email:</Text>
                    <Text style={styles.detailText}>{paciente.email}</Text>
                </View>
            </ScrollView>

            <View style={styles.fixedButtonsContainer}>
                <BotonComponent
                    title="Editar Paciente"
                    onPress={() => navigation.navigate('EditarPaciente', { paciente: paciente })}
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
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        backgroundColor: '#FF6347',
    },
});