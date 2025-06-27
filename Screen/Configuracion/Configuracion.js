// ConfiguracionScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener instalado @expo/vector-icons

export default function ConfiguracionScreen() {
    const navigation = useNavigation();

    // Estados para las configuraciones
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = useState(false); // Simulación de modo oscuro
    const [dataSavingEnabled, setDataSavingEnabled] = useState(false); // Ejemplo de otra opción

    // Funciones para manejar cambios en los switches
    const toggleNotifications = () => {
        setNotificationsEnabled(previousState => !previousState);
        Alert.alert("Notificaciones", `Las notificaciones están ${!notificationsEnabled ? 'activadas' : 'desactivadas'}.`);
        // Aquí iría la lógica para guardar la preferencia del usuario de forma persistente (ej. en AsyncStorage)
    };

    const toggleDarkMode = () => {
        setDarkModeEnabled(previousState => !previousState);
        Alert.alert("Modo Oscuro", `El modo oscuro está ${!darkModeEnabled ? 'activado' : 'desactivado'}.`);
        // Aquí iría la lógica para cambiar el tema de la aplicación globalmente
    };

    const toggleDataSaving = () => {
        setDataSavingEnabled(previousState => !previousState);
        Alert.alert("Ahorro de Datos", `El ahorro de datos está ${!dataSavingEnabled ? 'activado' : 'desactivado'}.`);
        // Lógica para el ahorro de datos
    };

    // Funciones para navegar o mostrar información para las opciones de enlace
    const navigateToAbout = () => {
        Alert.alert("Acerca de la Aplicación", "Versión: 1.0.0\nDesarrollado por [Tu Nombre/Empresa]\n© 2025 Todos los derechos reservados.");
        // Si tuvieras una pantalla 'AboutScreen', la llamarías así:
        // navigation.navigate('AboutScreen');
    };

    const navigateToPrivacyPolicy = () => {
        Alert.alert("Política de Privacidad", "Aquí iría el texto completo de tu política de privacidad o un enlace a una vista web.");
        // Si tuvieras una pantalla 'PrivacyPolicyScreen', la llamarías así:
        // navigation.navigate('PrivacyPolicyScreen');
    };

    const navigateToHelp = () => {
        Alert.alert("Ayuda y Soporte", "Para soporte técnico, por favor visita nuestro sitio web o contáctanos en soporte@tuapp.com.");
        // Si tuvieras una pantalla 'HelpScreen', la llamarías así:
        // navigation.navigate('HelpScreen');
    };

    const navigateToChangePassword = () => {
        Alert.alert("Cambiar Contraseña", "Esta opción te llevaría a una pantalla para cambiar tu contraseña.");
        // Si tuvieras una pantalla 'ChangePasswordScreen', la llamarías así:
        // navigation.navigate('ChangePasswordScreen');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Configuración</Text>
            <Text style={styles.subtitle}>Aquí puedes ajustar las preferencias de la aplicación y la cuenta.</Text>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Sección de Preferencias Generales */}
                <View style={styles.settingsSection}>
                    <Text style={styles.sectionTitle}>Preferencias Generales</Text>

                    <View style={styles.settingItem}>
                        <View style={styles.settingTextContainer}>
                            <Ionicons name="notifications-outline" size={24} color="#555" style={styles.settingIcon} />
                            <Text style={styles.settingLabel}>Notificaciones Push</Text>
                        </View>
                        <Switch
                            onValueChange={toggleNotifications}
                            value={notificationsEnabled}
                            trackColor={{ false: "#ccc", true: "#007BFF" }} // Colores más modernos
                            thumbColor={notificationsEnabled ? "#fff" : "#f4f3f4"}
                            ios_backgroundColor="#ccc"
                        />
                    </View>

                    <View style={styles.settingItem}>
                        <View style={styles.settingTextContainer}>
                            <Ionicons name="moon-outline" size={24} color="#555" style={styles.settingIcon} />
                            <Text style={styles.settingLabel}>Modo Oscuro</Text>
                        </View>
                        <Switch
                            onValueChange={toggleDarkMode}
                            value={darkModeEnabled}
                            trackColor={{ false: "#ccc", true: "#007BFF" }}
                            thumbColor={darkModeEnabled ? "#fff" : "#f4f3f4"}
                            ios_backgroundColor="#ccc"
                        />
                    </View>

                    <View style={styles.settingItem}>
                        <View style={styles.settingTextContainer}>
                            <Ionicons name="cellular-outline" size={24} color="#555" style={styles.settingIcon} />
                            <Text style={styles.settingLabel}>Ahorro de Datos</Text>
                        </View>
                        <Switch
                            onValueChange={toggleDataSaving}
                            value={dataSavingEnabled}
                            trackColor={{ false: "#ccc", true: "#007BFF" }}
                            thumbColor={dataSavingEnabled ? "#fff" : "#f4f3f4"}
                            ios_backgroundColor="#ccc"
                        />
                    </View>

                    {/* Puedes añadir más opciones generales aquí, por ejemplo, idioma */}
                    {/* <TouchableOpacity style={styles.settingLinkItem} onPress={() => Alert.alert("Idioma", "Selector de idioma")}>
                        <View style={styles.settingTextContainer}>
                            <Ionicons name="language-outline" size={24} color="#555" style={styles.settingIcon} />
                            <Text style={styles.settingLabel}>Idioma de la Aplicación</Text>
                        </View>
                        <Ionicons name="chevron-forward-outline" size={20} color="#999" />
                    </TouchableOpacity> */}
                </View>

                {/* Sección de Cuenta (Opcional, si no está cubierta por PerfilScreen) */}
                <View style={styles.settingsSection}>
                    <Text style={styles.sectionTitle}>Cuenta</Text>
                    <TouchableOpacity style={styles.settingLinkItem} onPress={navigateToChangePassword}>
                        <View style={styles.settingTextContainer}>
                            <Ionicons name="key-outline" size={24} color="#555" style={styles.settingIcon} />
                            <Text style={styles.settingLabel}>Cambiar Contraseña</Text>
                        </View>
                        <Ionicons name="chevron-forward-outline" size={20} color="#999" />
                    </TouchableOpacity>
                    {/* Puedes añadir más opciones de cuenta como privacidad, borrar cuenta, etc. */}
                </View>

                {/* Sección de Información y Ayuda */}
                <View style={styles.settingsSection}>
                    <Text style={styles.sectionTitle}>Información y Ayuda</Text>

                    <TouchableOpacity style={styles.settingLinkItem} onPress={navigateToAbout}>
                        <View style={styles.settingTextContainer}>
                            <Ionicons name="information-circle-outline" size={24} color="#555" style={styles.settingIcon} />
                            <Text style={styles.settingLabel}>Acerca de la Aplicación</Text>
                        </View>
                        <Ionicons name="chevron-forward-outline" size={20} color="#999" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingLinkItem} onPress={navigateToPrivacyPolicy}>
                        <View style={styles.settingTextContainer}>
                            <Ionicons name="document-text-outline" size={24} color="#555" style={styles.settingIcon} />
                            <Text style={styles.settingLabel}>Política de Privacidad</Text>
                        </View>
                        <Ionicons name="chevron-forward-outline" size={20} color="#999" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingLinkItem} onPress={navigateToHelp}>
                        <View style={styles.settingTextContainer}>
                            <Ionicons name="help-circle-outline" size={24} color="#555" style={styles.settingIcon} />
                            <Text style={styles.settingLabel}>Ayuda y Soporte</Text>
                        </View>
                        <Ionicons name="chevron-forward-outline" size={20} color="#999" />
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8', // Color de fondo consistente
        paddingHorizontal: 20, // Padding lateral para el contenido
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
        textAlign: 'center',
        marginTop: 20, // Espacio superior
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
        textAlign: 'center',
    },
    scrollContent: {
        paddingBottom: 30, // Espacio al final del contenido desplazable
    },
    settingsSection: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        paddingHorizontal: 10, // Para alinear con los ítems
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    settingLinkItem: { // Para elementos que navegan o abren algo
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    settingTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1, // Para que el texto y el icono ocupen espacio
    },
    settingIcon: {
        marginRight: 15,
        width: 24, // Ancho fijo para el icono
        textAlign: 'center',
    },
    settingLabel: {
        fontSize: 16,
        color: '#333',
        flex: 1, // Permite que el texto ocupe el espacio restante
    },
});