// Screen/Especialidades/DetalleEspecialidad.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import BotonComponent from '../../Components/BotonComponent';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getEspecialidadById } from '../../Src/Services/EspecialidadesService'; // Asegúrate de tener esta función
import { getUser } from '../../Src/Services/AuthService';

export default function DetalleEspecialidad() {
    const navigation = useNavigation();
    const route = useRoute();
    const especialidadId = route.params?.especialidad.id;

    const [especialidad, setEspecialidad] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);

    const cargarDatos = async () => {
        if (!especialidadId) return;
        setLoading(true);
        try {
            const [especialidadResult, userResult] = await Promise.all([
                getEspecialidadById(especialidadId),
                getUser()
            ]);

            if (especialidadResult.success) setEspecialidad(especialidadResult.data);
            if (userResult.success) setUserRole(userResult.user.role);

        } catch (error) {
            Alert.alert("Error", "Error de conexión.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', cargarDatos);
        return unsubscribe;
    }, [navigation, especialidadId]);

    if (loading) {
        return <View style={styles.centered}><ActivityIndicator size="large" color="#1e3799" /></View>;
    }

    if (!especialidad) {
        return <View style={styles.centered}><Text>No se encontraron datos.</Text></View>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalle de Especialidad</Text>
            <Text style={styles.subtitle}>Información detallada de la especialidad:</Text>

            <View style={styles.detailCard}>
                <Text style={styles.detailLabel}>Nombre:</Text>
                <Text style={styles.detailText}>{especialidad.nombre}</Text>

                <Text style={styles.detailLabel}>Descripción:</Text>
                <Text style={styles.detailText}>{especialidad.descripcion}</Text>
            </View>

            {/* Renderizado condicional del botón de edición */}
            {userRole === 'administrador' && (
                <BotonComponent
                    title="Editar Especialidad"
                    onPress={() => navigation.navigate('EditarEspecialidad', { especialidad: especialidad })}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#f0f4f8" },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 26, fontWeight: "bold", marginBottom: 10, color: "#333", textAlign: 'center' },
    subtitle: { fontSize: 16, color: "#666", marginBottom: 25, textAlign: 'center' },
    detailCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, marginBottom: 30, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 5, width: '100%' },
    detailLabel: { fontSize: 15, fontWeight: 'bold', color: '#555', marginTop: 10, marginBottom: 4 },
    detailText: { fontSize: 16, color: '#333', marginBottom: 8, lineHeight: 22 },
});