// Screens/Pacientes/EditarPaciente.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import BotonComponent from '../../Components/BotonComponent';
import { useNavigation, useRoute } from '@react-navigation/native';
import { crearPaciente, editarPaciente } from '../../Src/Services/PacientesService'; // 1. IMPORTAR

export default function EditarPaciente() {
    const navigation = useNavigation();
    const route = useRoute();
    const pacienteToEdit = route.params?.paciente;

    // 2. ESTADOS DEL FORMULARIO
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [documento, setDocumento] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');

    const [loading, setLoading] = useState(false);
    const isEditing = !!pacienteToEdit;

    // 3. LLENAR FORMULARIO SI ES EDICIÓN
    useEffect(() => {
        if (pacienteToEdit) {
            setNombres(pacienteToEdit.nombres || '');
            setApellidos(pacienteToEdit.apellidos || '');
            setDocumento(pacienteToEdit.documento || '');
            setTelefono(pacienteToEdit.telefono || '');
            setEmail(pacienteToEdit.email || '');
        }
    }, [pacienteToEdit]);

    // 4. LÓGICA DE GUARDADO
    const handleSave = async () => {
        if (!nombres || !apellidos || !documento) {
            Alert.alert('Campos incompletos', 'Nombre, Apellidos y Documento son obligatorios.');
            return;
        }

        setLoading(true);
        const pacienteData = { nombres, apellidos, documento, telefono, email };

        try {
            const result = isEditing
                ? await editarPaciente(pacienteToEdit.id, pacienteData)
                : await crearPaciente(pacienteData);
            
            if (result.success) {
                Alert.alert('Éxito', isEditing ? 'Paciente actualizado' : 'Paciente creado');
                navigation.goBack();
            } else {
                Alert.alert('Error', result.message || 'No se pudo guardar el paciente.');
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
                    {isEditing ? 'Editar Paciente' : 'Agregar Nuevo Paciente'}
                </Text>

                <View style={styles.formCard}>
                    <Text style={styles.label}>Nombres:</Text>
                    <TextInput style={styles.input} placeholder="Nombres del paciente" value={nombres} onChangeText={setNombres} />
                    
                    <Text style={styles.label}>Apellidos:</Text>
                    <TextInput style={styles.input} placeholder="Apellidos del paciente" value={apellidos} onChangeText={setApellidos} />

                    <Text style={styles.label}>Documento:</Text>
                    <TextInput style={styles.input} placeholder="Número de documento" value={documento} onChangeText={setDocumento} keyboardType="numeric" />

                    <Text style={styles.label}>Teléfono:</Text>
                    <TextInput style={styles.input} placeholder="E.g., 3001234567" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" />

                    <Text style={styles.label}>Email:</Text>
                    <TextInput style={styles.input} placeholder="E.g., paciente@example.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
                </View>
            </ScrollView>

            <View style={styles.fixedButtonsContainer}>
                <BotonComponent
                    title={isEditing ? "Guardar Cambios" : "Agregar Paciente"}
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
        backgroundColor: '#FF6347',
    },
    cancelButton: {
        backgroundColor: '#6c757d',
    },
    cancelButtonText: {
        color: '#fff',
    },
});