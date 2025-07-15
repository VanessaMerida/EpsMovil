// Screens/Consultorios/DetalleConsultorio.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import BotonComponent from '../../Components/BotonComponent';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getConsultorioById } from '../../Src/Services/ConsultoriosService'; // 1. IMPORTAR

export default function DetalleConsultorio() {
    const navigation = useNavigation();
    const route = useRoute();
    const consultorioId = route.params?.consultorio.id; // 2. OBTENER ID

    const [consultorio, setConsultorio] = useState(null);
    const [loading, setLoading] = useState(true);

    const cargarDetallesConsultorio = async () => {
        if (!consultorioId) return;
        setLoading(true);
        try {
            const result = await getConsultorioById(consultorioId);
            if (result.success) {
                setConsultorio(result.data);
            } else {
                Alert.alert("Error", "No se pudieron cargar los detalles.");
            }
        } catch (error) {
            Alert.alert("Error", "Error de conexión.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', cargarDetallesConsultorio);
        return unsubscribe;
    }, [navigation, consultorioId]);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#FFD700" />
            </View>
        );
    }

    if (!consultorio) {
        return (
            <View style={styles.centered}>
                <Text>No se encontraron datos.</Text>
            </View>
        );
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

                {/* Los siguientes campos son del frontend, los mostramos si existen */}
                {consultorio.capacidad && <Text style={styles.detailLabel}>Capacidad:</Text>}
                {consultorio.capacidad && <Text style={styles.detailText}>{consultorio.capacidad}</Text>}
                
                {consultorio.disponibilidad && <Text style={styles.detailLabel}>Disponibilidad:</Text>}
                {consultorio.disponibilidad && <Text style={styles.detailText}>{consultorio.disponibilidad}</Text>}
            </View>

            <BotonComponent
                title="Editar Consultorio"
                onPress={() => navigation.navigate('EditarConsultorio', { consultorio: consultorio })}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#f0f4f8",
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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