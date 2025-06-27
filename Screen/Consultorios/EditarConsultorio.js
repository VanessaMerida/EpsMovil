// EditarConsultorio.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import BotonComponent from '../../Components/BotonComponent';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditarConsultorio() {
    const navigation = useNavigation();
    const route = useRoute();

    const consultorioToEdit = route.params?.consultorio;

    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [capacidad, setCapacidad] = useState('');
    const [disponibilidad, setDisponibilidad] = useState('');

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (consultorioToEdit) {
            setId(consultorioToEdit.id);
            setNombre(consultorioToEdit.nombre);
            setUbicacion(consultorioToEdit.ubicacion);
            setCapacidad(consultorioToEdit.capacidad);
            setDisponibilidad(consultorioToEdit.disponibilidad);
            setIsEditing(true);
        } else {
            // Reiniciar campos para "Agregar Consultorio"
            setId('');
            setNombre('');
            setUbicacion('');
            setCapacidad('');
            setDisponibilidad('');
            setIsEditing(false);
        }
    }, [consultorioToEdit]);

    const handleSave = () => {
        if (!nombre || !ubicacion || !capacidad || !disponibilidad) {
            Alert.alert('Campos incompletos', 'Por favor, rellena todos los campos obligatorios (Nombre, Ubicación, Capacidad, Disponibilidad).');
            return;
        }

        const consultorioGuardado = {
            id: id || String(Date.now()), // Generar ID para nuevo, o usar el existente
            nombre,
            ubicacion,
            capacidad,
            disponibilidad,
        };

        if (isEditing) {
            Alert.alert(
                'Consultorio Editado',
                `Se ha guardado el consultorio:\nNombre: ${consultorioGuardado.nombre}\nUbicación: ${consultorioGuardado.ubicacion}`
            );
            // Lógica para enviar datos actualizados a tu API (PUT/PATCH)
        } else {
            Alert.alert(
                'Consultorio Agregado',
                `Se ha agregado el nuevo consultorio:\nNombre: ${consultorioGuardado.nombre}\nUbicación: ${consultorioGuardado.ubicacion}`
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
                    {isEditing ? 'Editar Consultorio' : 'Agregar Nuevo Consultorio'}
                </Text>

                <View style={styles.formCard}>
                    <Text style={styles.label}>Nombre del Consultorio:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="E.g., Consultorio Central 1"
                        value={nombre}
                        onChangeText={setNombre}
                    />

                    <Text style={styles.label}>Ubicación:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="E.g., Calle Falsa 123"
                        value={ubicacion}
                        onChangeText={setUbicacion}
                    />

                    <Text style={styles.label}>Capacidad:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="E.g., 2 médicos, 10 pacientes"
                        value={capacidad}
                        onChangeText={setCapacidad}
                    />

                    <Text style={styles.label}>Disponibilidad:</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="E.g., Lunes a Viernes 8AM-6PM"
                        value={disponibilidad}
                        onChangeText={setDisponibilidad}
                        multiline={true}
                        numberOfLines={3}
                    />
                </View>
            </ScrollView>

            <View style={styles.fixedButtonsContainer}>
                <BotonComponent
                    title={isEditing ? "Guardar Cambios" : "Agregar Consultorio"}
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
        minHeight: 80, // Ajustado para Consultorios
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