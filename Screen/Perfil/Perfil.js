// PerfilScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import BotonComponent from '../../Components/BotonComponent'; // Asegúrate de que la ruta sea correcta
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Para iconos
import { logoutUser } from '../../Src/Services/AuthService'; // ¡Importar la función de logout!

export default function PerfilScreen() {
    const navigation = useNavigation();

    // Datos de ejemplo del perfil del usuario (estáticos)
    const [userProfile, setUserProfile] = useState({
        nombre: 'Vanessa Mérida',
        email: 'vanessa.merida@example.com',
        telefono: '555-9999',
        rol: 'Administrador',
        ultimaSesion: '2025-06-26 15:30',
        id: 'USER001', // ID para pasar a la pantalla de edición
    });

    const handleLogout = () => {
        Alert.alert(
            "Cerrar Sesión",
            "¿Estás seguro de que quieres cerrar sesión?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Sí",
                    onPress: async () => { // ¡Aquí el cambio principal! Hacerla async
                        console.log("Iniciando proceso de cierre de sesión...");
                        try {
                            // 1. Llamar a la función de logout de AuthService
                            const result = await logoutUser(); // Esto eliminará el token de AsyncStorage y llamará a tu API /logout
                            
                            if (result.success) {
                                console.log("Sesión cerrada exitosamente.");
                                Alert.alert("Sesión Cerrada", "Has cerrado sesión correctamente.");
                                // No necesitas llamar a navigation.navigate('Login') o similar aquí.
                                // AppNavegacion.js detectará que el userToken es null
                                // y automáticamente cambiará el stack de navegación a AuthNavegacion (Login).
                            } else {
                                console.error("Error al cerrar sesión:", result.message);
                                Alert.alert("Error al cerrar sesión", result.message || "Ocurrió un error inesperado al cerrar sesión.");
                            }
                        } catch (error) {
                            console.error("Error inesperado en handleLogout:", error);
                            Alert.alert("Error", "Ocurrió un error al intentar cerrar sesión. Por favor, inténtalo de nuevo.");
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mi Perfil</Text>
            <Text style={styles.subtitle}>Información y Configuración de la Cuenta</Text>

            <View style={styles.profileCard}>
                <View style={styles.avatarContainer}>
                    <Ionicons name="person-circle-outline" size={80} color="#007BFF" />
                </View>
                <Text style={styles.profileName}>{userProfile.nombre}</Text>

                <View style={styles.detailRow}>
                    <Ionicons name="mail-outline" size={20} color="#666" style={styles.detailIcon} />
                    <Text style={styles.detailLabel}>Email:</Text>
                    <Text style={styles.detailText}>{userProfile.email}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Ionicons name="call-outline" size={20} color="#666" style={styles.detailIcon} />
                    <Text style={styles.detailLabel}>Teléfono:</Text>
                    <Text style={styles.detailText}>{userProfile.telefono}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Ionicons name="shield-checkmark-outline" size={20} color="#666" style={styles.detailIcon} />
                    <Text style={styles.detailLabel}>Rol:</Text>
                    <Text style={styles.detailText}>{userProfile.rol}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Ionicons name="time-outline" size={20} color="#666" style={styles.detailIcon} />
                    <Text style={styles.detailLabel}>Última Sesión:</Text>
                    <Text style={styles.detailText}>{userProfile.ultimaSesion}</Text>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <BotonComponent
                    title="Editar Perfil"
                    onPress={() => navigation.navigate('EditarPerfil', { userProfile: userProfile })}
                    style={styles.editProfileButton}
                />
                <BotonComponent
                    title="Cerrar Sesión"
                    onPress={handleLogout}
                    style={styles.logoutButton}
                    textStyle={styles.logoutButtonText}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f4f8', // Fondo suave
        alignItems: 'center', // Centrar horizontalmente
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
        textAlign: 'center',
    },
    profileCard: {
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
        maxWidth: 400, // Limitar ancho para tabletas
        alignItems: 'center', // Centrar contenido de la tarjeta
    },
    avatarContainer: {
        marginBottom: 15,
    },
    profileName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    detailIcon: {
        marginRight: 10,
    },
    detailLabel: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#555',
        width: 90, // Ancho fijo para las etiquetas
    },
    detailText: {
        flex: 1, // Permite que el texto ocupe el resto del espacio
        fontSize: 16,
        color: '#333',
    },
    buttonContainer: {
        width: '100%',
        maxWidth: 400, // Limitar ancho para tabletas
        marginTop: 10, // Espacio entre la tarjeta y los botones
    },
    editProfileButton: {
        backgroundColor: '#007BFF', // Azul
        marginBottom: 10,
    },
    logoutButton: {
        backgroundColor: '#DC3545', // Rojo para cerrar sesión
    },
    logoutButtonText: {
        color: '#fff',
    },
});