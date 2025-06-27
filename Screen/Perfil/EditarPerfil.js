// EditarPerfil.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import BotonComponent from '../../Components/BotonComponent';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditarPerfil() {
    const navigation = useNavigation();
    const route = useRoute();

    // Obtener los datos del perfil del usuario de los parámetros (si existen)
    const userProfileToEdit = route.params?.userProfile;

    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [rol, setRol] = useState(''); // El rol quizás no sea editable, pero lo incluimos para mostrar
    const [ultimaSesion, setUltimaSesion] = useState(''); // No editable

    useEffect(() => {
        if (userProfileToEdit) {
            setId(userProfileToEdit.id);
            setNombre(userProfileToEdit.nombre);
            setEmail(userProfileToEdit.email);
            setTelefono(userProfileToEdit.telefono);
            setRol(userProfileToEdit.rol);
            setUltimaSesion(userProfileToEdit.ultimaSesion);
        } else {
            // Valores por defecto si no se pasa un perfil (ej. para un nuevo registro si esta pantalla se reutilizara)
            setId('');
            setNombre('');
            setEmail('');
            setTelefono('');
            setRol('Usuario');
            setUltimaSesion('');
        }
    }, [userProfileToEdit]);

    const handleSave = () => {
        if (!nombre || !email || !telefono) {
            Alert.alert('Campos incompletos', 'Por favor, rellena al menos Nombre, Email y Teléfono.');
            return;
        }

        const updatedProfile = {
            id: id || String(Date.now()), // Mantiene ID o genera uno nuevo si fuera un nuevo registro
            nombre,
            email,
            telefono,
            rol, // Mantiene el rol actual
            ultimaSesion: new Date().toLocaleString(), // Actualiza la última modificación
        };

        Alert.alert(
            'Perfil Actualizado',
            `Los datos de ${updatedProfile.nombre} han sido guardados.`
        );
        // Aquí iría la lógica para enviar los datos actualizados a tu API (ej. PUT/PATCH /users/{id})

        navigation.goBack(); // Volver a la pantalla anterior después de guardar
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Editar Perfil</Text>

                <View style={styles.formCard}>
                    <Text style={styles.label}>Nombre Completo:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="E.g., Juan Pérez"
                        value={nombre}
                        onChangeText={setNombre}
                    />

                    <Text style={styles.label}>Email:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="E.g., tu.email@example.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <Text style={styles.label}>Teléfono:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="E.g., 555-1234"
                        value={telefono}
                        onChangeText={setTelefono}
                        keyboardType="phone-pad"
                    />

                    <Text style={styles.label}>Rol:</Text>
                    <TextInput
                        style={styles.input}
                        value={rol}
                        editable={false} // El rol no suele ser editable por el usuario
                        placeholder="E.g., Administrador"
                    />

                    <Text style={styles.label}>Última Sesión:</Text>
                    <TextInput
                        style={styles.input}
                        value={ultimaSesion}
                        editable={false} // La última sesión no es editable
                    />
                </View>
            </ScrollView>

            <View style={styles.fixedButtonsContainer}>
                <BotonComponent
                    title="Guardar Cambios"
                    onPress={handleSave}
                    style={styles.saveButton}
                />
                <BotonComponent
                    title="Cancelar"
                    onPress={() => navigation.goBack()}
                    style={styles.cancelButton}
                    textStyle={styles.cancelButtonText}
                />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f4f8",
    },
    scrollContent: {
        flexGrow: 1,
        padding: 20,
        paddingBottom: 20, // Espacio antes del contenedor fijo de botones
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
        textAlign: 'center',
    },
    formCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
        marginTop: 10,
        marginBottom: 5,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
        fontSize: 16,
        color: '#333',
    },
    fixedButtonsContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: Platform.OS === 'ios' ? 30 : 20,
        backgroundColor: '#f0f4f8',
        borderTopWidth: 1,
        borderColor: '#eee',
    },
    saveButton: {
        backgroundColor: '#28A745', // Verde para guardar
        marginBottom: 10,
    },
    cancelButton: {
        backgroundColor: '#6c757d', // Gris para cancelar
    },
    cancelButtonText: {
        color: '#fff',
    },
});