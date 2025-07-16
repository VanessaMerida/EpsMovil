// Screens/Medicos/DetalleMedico.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import BotonComponent from '../../Components/BotonComponent';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getMedicoById } from '../../Src/Services/MedicosService';
import { getUser } from '../../Src/Services/AuthService'; // 1. Importar el servicio de usuario

export default function DetalleMedico() {
    const navigation = useNavigation();
    const route = useRoute();
    const medicoId = route.params?.medico.id;

    // 2. ESTADOS PARA MANEJAR DATOS, CARGA Y ROL
    const [medico, setMedico] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);

    // 3. FUNCIÓN PARA CARGAR DATOS
    const cargarDetallesMedico = async () => {
        if (!medicoId) return;
        setLoading(true);
        try {
            // Cargar datos en paralelo para eficiencia
            const [medicoResult, userResult] = await Promise.all([
                getMedicoById(medicoId),
                getUser()
            ]);

            if (medicoResult.success) {
                setMedico(medicoResult.data);
            } else {
                Alert.alert("Error", "No se pudieron cargar los detalles del médico.");
            }

            if (userResult.success) {
                setUserRole(userResult.user.role);
            }
        } catch (error) {
            Alert.alert("Error", "Error de conexión.");
        } finally {
            setLoading(false);
        }
    };

    // 4. USEEFFECT PARA CARGAR DATOS AL ENFOCAR
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', cargarDetallesMedico);
        return unsubscribe;
    }, [navigation, medicoId]);

    // Muestra un indicador de carga
    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#4CAF50" />
            </View>
        );
    }
    
    // Muestra si no hay datos
    if (!medico) {
        return (
            <View style={styles.centered}>
                <Text>No se encontraron datos para este médico.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Detalle de Médico</Text>
            <Text style={styles.subtitle}>Información detallada del médico seleccionado:</Text>

            <View style={styles.detailCard}>
                <Text style={styles.detailLabel}>Nombre Completo:</Text>
                <Text style={styles.detailText}>{medico.nombres} {medico.apellidos}</Text>

                <Text style={styles.detailLabel}>Documento:</Text>
                <Text style={styles.detailText}>{medico.documento}</Text>
                
                <Text style={styles.detailLabel}>Tarjeta Profesional:</Text>
                <Text style={styles.detailText}>{medico.tarjeta_profesional}</Text>

                <Text style={styles.detailLabel}>Teléfono:</Text>
                <Text style={styles.detailText}>{medico.telefono}</Text>

                <Text style={styles.detailLabel}>Email:</Text>
                <Text style={styles.detailText}>{medico.email}</Text>
            </View>

            {/* 5. ✅ RENDERIZADO CONDICIONAL DEL BOTÓN */}
            {/* El botón solo se muestra si el rol es 'administrador' */}
            {userRole === 'administrador' && (
                <BotonComponent
                    title="Editar Médico"
                    onPress={() => navigation.navigate('EditarMedico', { medico: medico })}
                />
            )}
        </ScrollView>
    );
}

// Tus estilos se mantienen iguales
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