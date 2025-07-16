// Screen/Perfil/Perfil.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import BotonComponent from '../../Components/BotonComponent';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { logoutUser, deleteAccount, getUser } from '../../Src/Services/AuthService';

export default function PerfilScreen() {
    const navigation = useNavigation();

    // Estados para manejar los datos dinámicos y la carga
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // Función para cargar los datos del usuario desde la API
    const fetchUserData = async () => {
        setLoading(true);
        const result = await getUser();
        if (result.success) {
            // Guardamos el objeto de usuario completo que viene de la API
            setUserProfile(result.user);
        } else {
            Alert.alert("Error", "No se pudieron cargar los datos del perfil.");
        }
        setLoading(false);
    };

    // Cargar los datos cada vez que la pantalla se enfoca
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', fetchUserData);
        return unsubscribe;
    }, [navigation]);

    const handleLogout = () => {
        Alert.alert("Cerrar Sesión", "¿Estás seguro?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Sí",
                onPress: async () => {
                    await logoutUser();
                    // La redirección al login es automática
                }
            }
        ]);
    };

    const handleDeleteAccount = () => {
        Alert.alert("¿Estás absolutamente seguro?", "Esta acción es irreversible y eliminará tu cuenta.", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Sí, eliminar mi cuenta",
                style: "destructive",
                onPress: async () => {
                    const result = await deleteAccount();
                    if (result.success) {
                        Alert.alert("Cuenta Eliminada", result.message);
                    } else {
                        Alert.alert("Error", result.message);
                    }
                },
            },
        ]);
    };

    // Pantalla de carga mientras se obtienen los datos
    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
        );
    }
    
    // Pantalla de error si el perfil no se pudo cargar
    if (!userProfile) {
        return (
            <View style={styles.container}>
                <Text>No se pudo cargar el perfil.</Text>
                <BotonComponent title="Reintentar" onPress={fetchUserData} style={{marginTop: 20}} />
            </View>
        );
    }

    // Renderizado del perfil con los datos cargados
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mi Perfil</Text>
            <Text style={styles.subtitle}>Información y Configuración de la Cuenta</Text>

            <View style={styles.profileCard}>
                <View style={styles.avatarContainer}>
                    <Ionicons name="person-circle-outline" size={80} color="#007BFF" />
                </View>
                <Text style={styles.profileName}>{userProfile.name}</Text>

                <View style={styles.detailRow}>
                    <Ionicons name="mail-outline" size={20} color="#666" style={styles.detailIcon} />
                    <Text style={styles.detailLabel}>Email:</Text>
                    <Text style={styles.detailText}>{userProfile.email}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Ionicons name="shield-checkmark-outline" size={20} color="#666" style={styles.detailIcon} />
                    <Text style={styles.detailLabel}>Rol:</Text>
                    <Text style={styles.detailText}>{userProfile.role.charAt(0).toUpperCase() + userProfile.role.slice(1)}</Text>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                {/* ✅ BOTÓN DE EDITAR PERFIL RESTAURADO */}
                <BotonComponent
                    title="Editar Perfil"
                    onPress={() => navigation.navigate('EditarPerfil', { userProfile: userProfile })}
                    style={styles.editProfileButton}
                />
                <BotonComponent
                    title="Cerrar Sesión"
                    onPress={handleLogout}
                    style={styles.logoutButton}
                />

                {/* ✅ BOTÓN DE ELIMINAR CONDICIONAL */}
                {userProfile.role === 'user' && (
                    <BotonComponent
                        title="Eliminar Mi Cuenta"
                        onPress={handleDeleteAccount}
                        style={styles.deleteButton}
                        textStyle={styles.deleteButtonText}
                    />
                )}
            </View>
        </View>
    );
}

// Estilos originales con las nuevas adiciones
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f4f8',
        alignItems: 'center',
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
        maxWidth: 400,
        alignItems: 'center',
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
        width: 90,
    },
    detailText: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    buttonContainer: {
        width: '100%',
        maxWidth: 400,
        marginTop: 10,
    },
    editProfileButton: {
        backgroundColor: '#007BFF',
        marginBottom: 10,
    },
    logoutButton: {
        backgroundColor: '#6c757d',
        marginBottom: 10,
    },
    deleteButton: {
        backgroundColor: '#DC3545', // Color de fondo rojo para la acción destructiva
    },
    deleteButtonText: {
        color: '#FFFFFF', // Texto en color blanco para que sea legible
        fontWeight: 'bold'
    },
});