// Screens/Medicos/EditarMedico.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import BotonComponent from '../../Components/BotonComponent';
import { useNavigation, useRoute } from '@react-navigation/native';
import { crearMedico, editarMedico } from '../../Src/Services/MedicosService'; // 1. IMPORTAR SERVICIOS

export default function EditarMedico() {
    const navigation = useNavigation();
    const route = useRoute();
    const medicoToEdit = route.params?.medico;

    // 2. ESTADOS PARA LOS CAMPOS DEL FORMULARIO
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [documento, setDocumento] = useState('');
    const [tarjeta_profesional, setTarjetaProfesional] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');

    const [loading, setLoading] = useState(false);
    const isEditing = !!medicoToEdit;

    // 3. USEEFFECT PARA LLENAR EL FORMULARIO SI ESTAMOS EDITANDO
    useEffect(() => {
        if (medicoToEdit) {
            setNombres(medicoToEdit.nombres || '');
            setApellidos(medicoToEdit.apellidos || '');
            setDocumento(medicoToEdit.documento || '');
            setTarjetaProfesional(medicoToEdit.tarjeta_profesional || '');
            setTelefono(medicoToEdit.telefono || '');
            setEmail(medicoToEdit.email || '');
        }
    }, [medicoToEdit]);

    // 4. LÓGICA PARA GUARDAR DATOS
    const handleSave = async () => {
        if (!nombres || !apellidos || !documento || !tarjeta_profesional) {
            Alert.alert('Campos incompletos', 'Por favor, rellena los campos obligatorios.');
            return;
        }

        setLoading(true);

        const medicoData = { nombres, apellidos, documento, tarjeta_profesional, telefono, email };

        try {
            const result = isEditing 
                ? await editarMedico(medicoToEdit.id, medicoData)
                : await crearMedico(medicoData);

            if (result.success) {
                Alert.alert('Éxito', isEditing ? 'Médico actualizado correctamente' : 'Médico creado correctamente');
                navigation.goBack();
            } else {
                Alert.alert('Error', result.message || 'Ocurrió un error al guardar.');
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error inesperado al guardar.');
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
                    {isEditing ? 'Editar Médico' : 'Agregar Nuevo Médico'}
                </Text>

                <View style={styles.formCard}>
                    <Text style={styles.label}>Nombres:</Text>
                    <TextInput style={styles.input} placeholder="Nombres del médico" value={nombres} onChangeText={setNombres} />

                    <Text style={styles.label}>Apellidos:</Text>
                    <TextInput style={styles.input} placeholder="Apellidos del médico" value={apellidos} onChangeText={setApellidos} />

                    <Text style={styles.label}>Documento de Identidad:</Text>
                    <TextInput style={styles.input} placeholder="Número de documento" value={documento} onChangeText={setDocumento} keyboardType="numeric" />

                    <Text style={styles.label}>Tarjeta Profesional:</Text>
                    <TextInput style={styles.input} placeholder="Número de tarjeta profesional" value={tarjeta_profesional} onChangeText={setTarjetaProfesional} />
                    
                    <Text style={styles.label}>Teléfono:</Text>
                    <TextInput style={styles.input} placeholder="E.g., 3001234567" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" />

                    <Text style={styles.label}>Email:</Text>
                    <TextInput style={styles.input} placeholder="E.g., medico@example.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
                </View>
            </ScrollView>

            <View style={styles.fixedButtonsContainer}>
                <BotonComponent
                    title={isEditing ? "Guardar Cambios" : "Agregar Médico"}
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

// ... (tus estilos existentes, no necesitan cambios)
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
        backgroundColor: '#4CAF50',
    },
    cancelButton: {
        backgroundColor: '#6c757d',
    },
    cancelButtonText: {
        color: '#fff',
    },
});