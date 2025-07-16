// Screens/Consultorios/DetalleConsultorio.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import BotonComponent from '../../Components/BotonComponent';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getConsultorioById } from '../../Src/Services/ConsultoriosService';
import { getUser } from '../../Src/Services/AuthService'; // 1. IMPORTAR

export default function DetalleConsultorio() {
    const navigation = useNavigation();
    const route = useRoute();
    const consultorioId = route.params?.consultorio.id;

    const [consultorio, setConsultorio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState(null); // 2. ESTADO PARA EL ROL

    const cargarDatos = async () => {
        if (!consultorioId) return;
        setLoading(true);
        try {
            const [consultorioResult, userResult] = await Promise.all([
                getConsultorioById(consultorioId),
                getUser()
            ]);
            if (consultorioResult.success) setConsultorio(consultorioResult.data);
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
    }, [navigation, consultorioId]);

    if (loading) {
        return <View style={styles.centered}><ActivityIndicator size="large" color="#FFD700" /></View>;
    }

    if (!consultorio) {
        return <View style={styles.centered}><Text>No se encontraron datos.</Text></View>;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Detalle de Consultorio</Text>
            <Text style={styles.subtitle}>Información detallada del consultorio:</Text>
            <View style={styles.detailCard}>
                <Text style={styles.detailLabel}>Nombre:</Text>
                <Text style={styles.detailText}>{consultorio.nombre}</Text>
                <Text style={styles.detailLabel}>Ubicación:</Text>
                <Text style={styles.detailText}>{consultorio.ubicacion}</Text>
            </View>

            {/* ✅ LÓGICA CONDICIONAL PARA EL BOTÓN DE EDITAR */}
            {userRole === 'administrador' && (
                <BotonComponent
                    title="Editar Consultorio"
                    onPress={() => navigation.navigate('EditarConsultorio', { consultorio: consultorio })}
                />
            )}
        </ScrollView>
    );
}

// Tus estilos se mantienen iguales
const styles = StyleSheet.create({
    container: { flexGrow: 1, padding: 20, backgroundColor: "#f0f4f8" },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 26, fontWeight: "bold", marginBottom: 10, color: "#333", textAlign: 'center' },
    subtitle: { fontSize: 16, color: "#666", marginBottom: 25, textAlign: 'center' },
    detailCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, marginBottom: 30, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 5, width: '100%' },
    detailLabel: { fontSize: 15, fontWeight: 'bold', color: '#555', marginTop: 10, marginBottom: 4 },
    detailText: { fontSize: 16, color: '#333', marginBottom: 8, lineHeight: 22 },
});