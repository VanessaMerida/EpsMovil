// EditarMedico.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import BotonComponent from '../../Components/BotonComponent';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditarMedico() {
    const navigation = useNavigation();
    const route = useRoute();

    const medicoToEdit = route.params?.medico;

    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [consultorio, setConsultorio] = useState('');
    const [fechacontratacion, setFechaContratacion] = useState('');
    const [ultimamodificacion, setUltimaModificacion] = useState('');

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (medicoToEdit) {
            setId(medicoToEdit.id);
            setNombre(medicoToEdit.nombre);
            setEspecialidad(medicoToEdit.especialidad);
            setTelefono(medicoToEdit.telefono);
            setEmail(medicoToEdit.email);
            setConsultorio(medicoToEdit.consultorio);
            setFechaContratacion(medicoToEdit.fechacontratacion);
            setUltimaModificacion(medicoToEdit.ultimamodificacion);
            setIsEditing(true);
        } else {
            // Reiniciar campos para "Agregar Médico"
            setId('');
            setNombre('');
            setEspecialidad('');
            setTelefono('');
            setEmail('');
            setConsultorio('');
            setFechaContratacion('');
            setUltimaModificacion('');
            setIsEditing(false);
        }
    }, [medicoToEdit]);

    const handleSave = () => {
        if (!nombre || !especialidad || !telefono || !email || !consultorio) {
            Alert.alert('Campos incompletos', 'Por favor, rellena todos los campos obligatorios (Nombre, Especialidad, Teléfono, Email, Consultorio).');
            return;
        }

        const medicoGuardado = {
            id: id || String(Date.now()), // Generar ID para nuevo, o usar el existente
            nombre,
            especialidad,
            telefono,
            email,
            consultorio,
            fechacontratacion: isEditing ? fechacontratacion : new Date().toISOString().split('T')[0],
            ultimamodificacion: new Date().toISOString().split('T')[0],
        };

        if (isEditing) {
            Alert.alert(
                'Médico Editado',
                `Se ha guardado el médico:\nNombre: ${medicoGuardado.nombre}\nEspecialidad: ${medicoGuardado.especialidad}`
            );
            // Lógica para enviar datos actualizados a tu API (PUT/PATCH)
        } else {
            Alert.alert(
                'Médico Agregado',
                `Se ha agregado el nuevo médico:\nNombre: ${medicoGuardado.nombre}\nEspecialidad: ${medicoGuardado.especialidad}`
            );
            // Lógica para enviar nuevos datos a tu API (POST)
        }

        navigation.goBack(); // Volver a la lista después de guardar
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
                    <Text style={styles.label}>Nombre del Médico:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="E.g., Dr. Juan Pérez"
                        value={nombre}
                        onChangeText={setNombre}
                    />

                    <Text style={styles.label}>Especialidad:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="E.g., Cardiología"
                        value={especialidad}
                        onChangeText={setEspecialidad}
                    />

                    <Text style={styles.label}>Teléfono:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="E.g., 555-1234"
                        value={telefono}
                        onChangeText={setTelefono}
                        keyboardType="phone-pad"
                    />

                    <Text style={styles.label}>Email:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="E.g., juan.perez@example.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <Text style={styles.label}>Consultorio:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="E.g., C101"
                        value={consultorio}
                        onChangeText={setConsultorio}
                    />

                    {isEditing && (
                        <>
                            <Text style={styles.label}>Fecha de Contratación:</Text>
                            <TextInput
                                style={styles.input}
                                value={fechacontratacion}
                                editable={false}
                            />

                            <Text style={styles.label}>Última Modificación:</Text>
                            <TextInput
                                style={styles.input}
                                value={ultimamodificacion}
                                editable={false}
                            />
                        </>
                    )}
                </View>
            </ScrollView>

            <View style={styles.fixedButtonsContainer}>
                <BotonComponent
                    title={isEditing ? "Guardar Cambios" : "Agregar Médico"}
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
    textArea: {
        minHeight: 100,
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
    },
    cancelButton: {
        backgroundColor: '#6c757d',
    },
    cancelButtonText: {
        color: '#fff',
    },
});