// EditarPaciente.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import BotonComponent from '../../Components/BotonComponent';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditarPaciente() {
    const navigation = useNavigation();
    const route = useRoute();

    const pacienteToEdit = route.params?.paciente;

    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [genero, setGenero] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [direccion, setDireccion] = useState('');
    const [fechaRegistro, setFechaRegistro] = useState('');
    const [ultimaActualizacion, setUltimaActualizacion] = useState('');

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (pacienteToEdit) {
            setId(pacienteToEdit.id);
            setNombre(pacienteToEdit.nombre);
            setApellido(pacienteToEdit.apellido);
            setFechaNacimiento(pacienteToEdit.fechaNacimiento);
            setGenero(pacienteToEdit.genero);
            setTelefono(pacienteToEdit.telefono);
            setEmail(pacienteToEdit.email);
            setDireccion(pacienteToEdit.direccion);
            setFechaRegistro(pacienteToEdit.fechaRegistro);
            setUltimaActualizacion(pacienteToEdit.ultimaActualizacion);
            setIsEditing(true);
        } else {
            // Reiniciar campos para "Agregar Paciente"
            setId('');
            setNombre('');
            setApellido('');
            setFechaNacimiento('');
            setGenero('');
            setTelefono('');
            setEmail('');
            setDireccion('');
            setFechaRegistro('');
            setUltimaActualizacion('');
            setIsEditing(false);
        }
    }, [pacienteToEdit]);

    const handleSave = () => {
        if (!nombre || !apellido || !fechaNacimiento || !genero || !telefono || !email || !direccion) {
            Alert.alert('Campos incompletos', 'Por favor, rellena todos los campos obligatorios (Nombre, Apellido, Fecha de Nacimiento, Género, Teléfono, Email, Dirección).');
            return;
        }

        const pacienteGuardado = {
            id: id || String(Date.now()), // Generar ID para nuevo, o usar el existente
            nombre,
            apellido,
            fechaNacimiento,
            genero,
            telefono,
            email,
            direccion,
            fechaRegistro: isEditing ? fechaRegistro : new Date().toISOString().split('T')[0],
            ultimaActualizacion: new Date().toISOString().split('T')[0],
        };

        if (isEditing) {
            Alert.alert(
                'Paciente Editado',
                `Se ha guardado el paciente:\nNombre: ${pacienteGuardado.nombre} ${pacienteGuardado.apellido}\nTeléfono: ${pacienteGuardado.telefono}`
            );
            // Lógica para enviar datos actualizados a tu API (PUT/PATCH)
        } else {
            Alert.alert(
                'Paciente Agregado',
                `Se ha agregado el nuevo paciente:\nNombre: ${pacienteGuardado.nombre} ${pacienteGuardado.apellido}\nTeléfono: ${pacienteGuardado.telefono}`
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
                    {isEditing ? 'Editar Paciente' : 'Agregar Nuevo Paciente'}
                </Text>

                <View style={styles.formCard}>
                    <Text style={styles.label}>Nombre:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="E.g., Carlos"
                        value={nombre}
                        onChangeText={setNombre}
                    />

                    <Text style={styles.label}>Apellido:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="E.g., García"
                        value={apellido}
                        onChangeText={setApellido}
                    />

                    <Text style={styles.label}>Fecha de Nacimiento (YYYY-MM-DD):</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="E.g., 1990-01-15"
                        value={fechaNacimiento}
                        onChangeText={setFechaNacimiento}
                        keyboardType="numbers-and-punctuation"
                    />

                    <Text style={styles.label}>Género:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="E.g., Masculino / Femenino"
                        value={genero}
                        onChangeText={setGenero}
                    />

                    <Text style={styles.label}>Teléfono:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="E.g., 555-1111"
                        value={telefono}
                        onChangeText={setTelefono}
                        keyboardType="phone-pad"
                    />

                    <Text style={styles.label}>Email:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="E.g., paciente@example.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <Text style={styles.label}>Dirección:</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="E.g., Calle 1 # 2-34"
                        value={direccion}
                        onChangeText={setDireccion}
                        multiline={true}
                        numberOfLines={3}
                    />

                    {isEditing && (
                        <>
                            <Text style={styles.label}>Fecha de Registro:</Text>
                            <TextInput
                                style={styles.input}
                                value={fechaRegistro}
                                editable={false}
                            />

                            <Text style={styles.label}>Última Actualización:</Text>
                            <TextInput
                                style={styles.input}
                                value={ultimaActualizacion}
                                editable={false}
                            />
                        </>
                    )}
                </View>
            </ScrollView>

            <View style={styles.fixedButtonsContainer}>
                <BotonComponent
                    title={isEditing ? "Guardar Cambios" : "Agregar Paciente"}
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
        minHeight: 50,
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