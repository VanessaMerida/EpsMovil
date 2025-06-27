import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import BotonComponent from '../../Components/BotonComponent';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditarEspecialidad() {
    const navigation = useNavigation();
    const route = useRoute();

    const especialidadToEdit = route.params?.especialidad;

    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [jefedearea, setJefeDeArea] = useState('');
    const [fechacreacion, setFechaCreacion] = useState('');
    const [ultimamodificacion, setUltimaModificacion] = useState('');

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (especialidadToEdit) {
            setId(especialidadToEdit.id);
            setNombre(especialidadToEdit.nombre);
            setDescripcion(especialidadToEdit.descripcion);
            setJefeDeArea(especialidadToEdit.jefedearea);
            setFechaCreacion(especialidadToEdit.fechacreacion);
            setUltimaModificacion(especialidadToEdit.ultimamodificacion);
            setIsEditing(true);
        } else {
            setId('');
            setNombre('');
            setDescripcion('');
            setJefeDeArea('');
            setFechaCreacion('');
            setUltimaModificacion('');
            setIsEditing(false);
        }
    }, [especialidadToEdit]);

    const handleSave = () => {
        if (!nombre || !descripcion || !jefedearea) {
            Alert.alert('Campos incompletos', 'Por favor, rellena todos los campos obligatorios (Nombre, Descripción, Jefe de Área).');
            return;
        }

        const especialidadGuardada = {
            id: id || String(Date.now()),
            nombre,
            descripcion,
            jefedearea,
            fechacreacion: isEditing ? fechacreacion : new Date().toISOString().split('T')[0],
            ultimamodificacion: new Date().toISOString().split('T')[0],
        };

        if (isEditing) {
            Alert.alert(
                'Especialidad Editada',
                `\nNombre: ${especialidadGuardada.nombre}\nDescripción: ${especialidadGuardada.descripcion}\nJefe de Área: ${especialidadGuardada.jefedearea}`
            );
        } else {
            Alert.alert(
                'Especialidad Agregada',
                `\nNombre: ${especialidadGuardada.nombre}\nDescripción: ${especialidadGuardada.descripcion}\nJefe de Área: ${especialidadGuardada.jefedearea}`
            );
        }

        navigation.goBack();
    };

    return (
        <KeyboardAvoidingView
            style={styles.keyboardAvoidingContainer}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>
                    {isEditing ? 'Editar Especialidad' : 'Agregar Nueva Especialidad'}
                </Text>

                <View style={styles.formContainer}>
                    <Text style={styles.label}>Nombre de la Especialidad:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="E.g., Cardiología"
                        value={nombre}
                        onChangeText={setNombre}
                    />

                    <Text style={styles.label}>Descripción:</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="E.g., Especialidad en el corazón y sistema circulatorio."
                        value={descripcion}
                        onChangeText={setDescripcion}
                        multiline={true}
                        numberOfLines={4}
                    />

                    <Text style={styles.label}>Jefe de Área:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="E.g., Dr. Juan Pérez"
                        value={jefedearea}
                        onChangeText={setJefeDeArea}
                    />

                    {isEditing && (
                        <>
                            <Text style={styles.label}>Fecha de Creación:</Text>
                            <TextInput
                                style={styles.input}
                                value={fechacreacion}
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

                <BotonComponent
                    title={isEditing ? "Guardar Cambios" : "Agregar Especialidad"}
                    onPress={handleSave}
                />

                <BotonComponent
                    title="Cancelar"
                    onPress={() => navigation.goBack()}
                    style={styles.cancelButton}
                    textStyle={styles.cancelButtonText}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    keyboardAvoidingContainer: {
        flex: 1, // Asegura que KeyboardAvoidingView ocupe todo el espacio
    },
    scrollContent: {
        flexGrow: 1, // Permite que el contenido crezca para llenar el espacio disponible
        padding: 20, // Padding en el contentContainerStyle para el contenido desplazable
        backgroundColor: "#f0f4f8",
        paddingBottom: 40, // Aumenta este valor si los botones aún se cortan o no hay suficiente espacio
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
        textAlign: 'center',
    },
    formContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
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
        minHeight: 60,
        textAlignVertical: 'top',
        paddingVertical: 10,
    },
    cancelButton: {
        backgroundColor: '#6c757d',
        marginTop: 10,
        marginBottom: 20, // Añadir un margen inferior al botón "Cancelar"
    },
    cancelButtonText: {
        color: '#fff',
    },
});