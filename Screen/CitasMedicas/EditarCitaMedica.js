// EditarCitaMedica.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import BotonComponent from '../../Components/BotonComponent';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditarCitaMedica() {
    const navigation = useNavigation();
    const route = useRoute();

    const citaMedicaToEdit = route.params?.citaMedica;

    const [id, setId] = useState('');
    const [paciente, setPaciente] = useState('');
    const [medico, setMedico] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [consultorio, setConsultorio] = useState('');
    const [estado, setEstado] = useState('');
    const [motivo, setMotivo] = useState('');
    const [fechaCreacion, setFechaCreacion] = useState('');
    const [ultimaModificacion, setUltimaModificacion] = useState('');

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (citaMedicaToEdit) {
            setId(citaMedicaToEdit.id);
            setPaciente(citaMedicaToEdit.paciente);
            setMedico(citaMedicaToEdit.medico);
            setEspecialidad(citaMedicaToEdit.especialidad);
            setFecha(citaMedicaToEdit.fecha);
            setHora(citaMedicaToEdit.hora);
            setConsultorio(citaMedicaToEdit.consultorio);
            setEstado(citaMedicaToEdit.estado);
            setMotivo(citaMedicaToEdit.motivo);
            setFechaCreacion(citaMedicaToEdit.fechaCreacion);
            setUltimaModificacion(citaMedicaToEdit.ultimaModificacion);
            setIsEditing(true);
        } else {
            // Reiniciar campos para "Agregar Cita Médica"
            setId('');
            setPaciente('');
            setMedico('');
            setEspecialidad('');
            setFecha('');
            setHora('');
            setConsultorio('');
            setEstado('');
            setMotivo('');
            setFechaCreacion('');
            setUltimaModificacion('');
            setIsEditing(false);
        }
    }, [citaMedicaToEdit]);

    const handleSave = () => {
        if (!paciente || !medico || !especialidad || !fecha || !hora || !consultorio || !estado || !motivo) {
            Alert.alert('Campos incompletos', 'Por favor, rellena todos los campos obligatorios (Paciente, Médico, Especialidad, Fecha, Hora, Consultorio, Estado, Motivo).');
            return;
        }

        const citaGuardada = {
            id: id || String(Date.now()), // Generar ID para nuevo, o usar el existente
            paciente,
            medico,
            especialidad,
            fecha,
            hora,
            consultorio,
            estado,
            motivo,
            fechaCreacion: isEditing ? fechaCreacion : new Date().toISOString().split('T')[0],
            ultimaModificacion: new Date().toISOString().split('T')[0],
        };

        if (isEditing) {
            Alert.alert(
                'Cita Médica Editada',
                `Se ha guardado la cita:\nPaciente: ${citaGuardada.paciente}\nFecha: ${citaGuardada.fecha} ${citaGuardada.hora}`
            );
            // Lógica para enviar datos actualizados a tu API (PUT/PATCH)
        } else {
            Alert.alert(
                'Cita Médica Agregada',
                `Se ha agregado la nueva cita:\nPaciente: ${citaGuardada.paciente}\nFecha: ${citaGuardada.fecha} ${citaGuardada.hora}`
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
                    {isEditing ? 'Editar Cita Médica' : 'Agregar Nueva Cita Médica'}
                </Text>

                <View style={styles.formCard}>
                    <Text style={styles.label}>Paciente:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre del Paciente"
                        value={paciente}
                        onChangeText={setPaciente}
                    />

                    <Text style={styles.label}>Médico:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre del Médico"
                        value={medico}
                        onChangeText={setMedico}
                    />

                    <Text style={styles.label}>Especialidad:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="E.g., Cardiología"
                        value={especialidad}
                        onChangeText={setEspecialidad}
                    />

                    <Text style={styles.label}>Fecha (YYYY-MM-DD):</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="E.g., 2025-07-01"
                        value={fecha}
                        onChangeText={setFecha}
                        keyboardType="numbers-and-punctuation"
                    />

                    <Text style={styles.label}>Hora (HH:MM AM/PM):</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="E.g., 10:00 AM"
                        value={hora}
                        onChangeText={setHora}
                    />

                    <Text style={styles.label}>Consultorio:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="E.g., C101"
                        value={consultorio}
                        onChangeText={setConsultorio}
                    />

                    <Text style={styles.label}>Estado:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="E.g., Confirmada, Pendiente, Cancelada"
                        value={estado}
                        onChangeText={setEstado}
                    />

                    <Text style={styles.label}>Motivo de la Cita:</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Breve descripción del motivo"
                        value={motivo}
                        onChangeText={setMotivo}
                        multiline={true}
                        numberOfLines={3}
                    />

                    {isEditing && (
                        <>
                            <Text style={styles.label}>Fecha de Creación:</Text>
                            <TextInput
                                style={styles.input}
                                value={fechaCreacion}
                                editable={false}
                            />

                            <Text style={styles.label}>Última Modificación:</Text>
                            <TextInput
                                style={styles.input}
                                value={ultimaModificacion}
                                editable={false}
                            />
                        </>
                    )}
                </View>
            </ScrollView>

            <View style={styles.fixedButtonsContainer}>
                <BotonComponent
                    title={isEditing ? "Guardar Cambios" : "Agregar Cita Médica"}
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
        backgroundColor: '#4CAF50', // Verde para guardar
        marginBottom: 10,
    },
    cancelButton: {
        backgroundColor: '#6c757d', // Gris para cancelar
    },
    cancelButtonText: {
        color: '#fff',
    },
});