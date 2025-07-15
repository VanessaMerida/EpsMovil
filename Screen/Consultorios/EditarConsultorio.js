// Screens/Consultorios/EditarConsultorio.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import BotonComponent from '../../Components/BotonComponent';
import { useNavigation, useRoute } from '@react-navigation/native';
import { crearConsultorio, editarConsultorio } from '../../Src/Services/ConsultoriosService'; // 1. IMPORTAR

export default function EditarConsultorio() {
    const navigation = useNavigation();
    const route = useRoute();
    const consultorioToEdit = route.params?.consultorio;

    // 2. ESTADOS DEL FORMULARIO
    const [nombre, setNombre] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    // Mantenemos estos campos para el formulario, aunque no estén en la migración
    const [capacidad, setCapacidad] = useState('');
    const [disponibilidad, setDisponibilidad] = useState('');

    const [loading, setLoading] = useState(false);
    const isEditing = !!consultorioToEdit;

    // 3. LLENAR FORMULARIO AL EDITAR
    useEffect(() => {
        if (consultorioToEdit) {
            setNombre(consultorioToEdit.nombre || '');
            setUbicacion(consultorioToEdit.ubicacion || '');
        
        }
    }, [consultorioToEdit]);

    // 4. LÓGICA PARA GUARDAR
    const handleSave = async () => {
        if (!nombre || !ubicacion) {
            Alert.alert('Campos incompletos', 'Por favor, rellena Nombre y Ubicación.');
            return;
        }

        setLoading(true);

        // Solo enviamos los datos que la API espera (según tu migración)
        const consultorioData = { nombre, ubicacion };

        try {
            const result = isEditing
                ? await editarConsultorio(consultorioToEdit.id, consultorioData)
                : await crearConsultorio(consultorioData);

            if (result.success) {
                Alert.alert('Éxito', isEditing ? 'Consultorio actualizado' : 'Consultorio creado');
                navigation.goBack();
            } else {
                Alert.alert('Error', result.message || 'Ocurrió un error al guardar.');
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error inesperado.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>
                    {isEditing ? 'Editar Consultorio' : 'Agregar Nuevo Consultorio'}
                </Text>

                <View style={styles.formCard}>
                    <Text style={styles.label}>Nombre del Consultorio:</Text>
                    <TextInput style={styles.input} placeholder="E.g., Consultorio Central 1" value={nombre} onChangeText={setNombre} />

                    <Text style={styles.label}>Ubicación:</Text>
                    <TextInput style={styles.input} placeholder="E.g., Calle Falsa 123" value={ubicacion} onChangeText={setUbicacion} />
                </View>
            </ScrollView>

            <View style={styles.fixedButtonsContainer}>
                <BotonComponent
                    title={isEditing ? "Guardar Cambios" : "Agregar Consultorio"}
                    onPress={handleSave}
                    isLoading={loading}
                    disabled={loading}
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
        paddingBottom: 20,
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
    textArea: {
        minHeight: 80,
        textAlignVertical: 'top',
        paddingVertical: 10,
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
        marginBottom: 10,
        backgroundColor: '#007BFF'
    },
    cancelButton: {
        backgroundColor: '#6c757d',
    },
    cancelButtonText: {
        color: '#fff',
    },
});