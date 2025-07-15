// Screen/CitasMedicas/EditarCitaMedica.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import BotonComponent from '../../Components/BotonComponent';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

// 1. Importar todos los servicios necesarios
import { crearCitaMedica, editarCitaMedica } from '../../Src/Services/CitasMedicasService';
import { listarPacientes } from '../../Src/Services/PacientesService';
import { listarMedicos } from '../../Src/Services/MedicosService';
import { listarEspecialidades } from '../../Src/Services/EspecialidadesService';
import { listarConsultorios } from '../../Src/Services/ConsultoriosService';

export default function EditarCitaMedica() {
    const navigation = useNavigation();
    const route = useRoute();
    const citaToEdit = route.params?.citaMedica;

    // 2. Estados para los datos de la cita y las listas de los pickers
    const [pacienteId, setPacienteId] = useState(null);
    const [medicoId, setMedicoId] = useState(null);
    const [especialidadId, setEspecialidadId] = useState(null);
    const [consultorioId, setConsultorioId] = useState(null);
    const [fechaHora, setFechaHora] = useState('');
    const [estado, setEstado] = useState('programada');
    const [notas, setNotas] = useState('');
    
    // Estados para almacenar las listas que llenan los pickers
    const [pacientes, setPacientes] = useState([]);
    const [medicos, setMedicos] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);
    const [consultorios, setConsultorios] = useState([]);
    
    const [loading, setLoading] = useState(false);
    const [loadingPickers, setLoadingPickers] = useState(true);
    const isEditing = !!citaToEdit;

    // 3. Cargar datos para los pickers cuando el componente se monta
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                // Cargar todas las listas en paralelo para mayor eficiencia
                const [pacientesRes, medicosRes, especialidadesRes, consultoriosRes] = await Promise.all([
                    listarPacientes(),
                    listarMedicos(),
                    listarEspecialidades(),
                    listarConsultorios()
                ]);

                if (pacientesRes.success) setPacientes(pacientesRes.data);
                if (medicosRes.success) setMedicos(medicosRes.data);
                if (especialidadesRes.success) setEspecialidades(especialidadesRes.data);
                if (consultoriosRes.success) setConsultorios(consultoriosRes.data);

                // Si estamos editando, pre-seleccionar los valores
                if (isEditing) {
                    setPacienteId(citaToEdit.paciente_id);
                    setMedicoId(citaToEdit.medico_id);
                    setEspecialidadId(citaToEdit.especialidad_id);
                    setConsultorioId(citaToEdit.consultorio_id);
                    setFechaHora(citaToEdit.fecha_hora.split(' ')[0]); // Solo la fecha para el ejemplo
                    setEstado(citaToEdit.estado);
                    setNotas(citaToEdit.notas || '');
                }

            } catch (error) {
                Alert.alert("Error", "No se pudieron cargar los datos para agendar la cita.");
            } finally {
                setLoadingPickers(false);
            }
        };

        cargarDatos();
    }, [citaToEdit]);
    
    // 4. Lógica para guardar la cita
    const handleSave = async () => {
        if (!pacienteId || !medicoId || !especialidadId || !consultorioId || !fechaHora) {
            Alert.alert('Campos incompletos', 'Por favor, selecciona todos los campos requeridos.');
            return;
        }

        setLoading(true);
        const citaData = {
            paciente_id: pacienteId,
            medico_id: medicoId,
            especialidad_id: especialidadId,
            consultorio_id: consultorioId,
            fecha_hora: `${fechaHora} 00:00:00`, // Añadimos una hora por defecto
            estado: estado,
            notas: notas,
        };

        try {
            const result = isEditing
                ? await editarCitaMedica(citaToEdit.id, citaData)
                : await crearCitaMedica(citaData);
            
            if (result.success) {
                Alert.alert('Éxito', isEditing ? 'Cita actualizada' : 'Cita creada');
                navigation.goBack();
            } else {
                Alert.alert('Error', result.message || 'No se pudo guardar la cita.');
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error inesperado.');
        } finally {
            setLoading(false);
        }
    };
    
    // Estilo para los Pickers
    const pickerStyle = {
        inputIOS: styles.pickerInput,
        inputAndroid: styles.pickerInput,
    };
    
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>{isEditing ? 'Editar Cita Médica' : 'Agregar Nueva Cita'}</Text>

                {loadingPickers ? <ActivityIndicator size="large" color="#6A5ACD" /> : (
                <View style={styles.formCard}>
                    <Text style={styles.label}>Paciente:</Text>
                    <View style={styles.pickerContainer}>
                        <Picker selectedValue={pacienteId} onValueChange={(itemValue) => setPacienteId(itemValue)} style={styles.picker}>
                            <Picker.Item label="-- Seleccione un Paciente --" value={null} />
                            {pacientes.map(p => <Picker.Item key={p.id} label={`${p.nombres} ${p.apellidos}`} value={p.id} />)}
                        </Picker>
                    </View>

                    <Text style={styles.label}>Médico:</Text>
                    <View style={styles.pickerContainer}>
                        <Picker selectedValue={medicoId} onValueChange={(itemValue) => setMedicoId(itemValue)} style={styles.picker}>
                            <Picker.Item label="-- Seleccione un Médico --" value={null} />
                            {medicos.map(m => <Picker.Item key={m.id} label={`${m.nombres} ${m.apellidos}`} value={m.id} />)}
                        </Picker>
                    </View>

                    <Text style={styles.label}>Especialidad:</Text>
                    <View style={styles.pickerContainer}>
                        <Picker selectedValue={especialidadId} onValueChange={(itemValue) => setEspecialidadId(itemValue)} style={styles.picker}>
                            <Picker.Item label="-- Seleccione una Especialidad --" value={null} />
                            {especialidades.map(e => <Picker.Item key={e.id} label={e.nombre} value={e.id} />)}
                        </Picker>
                    </View>
                    
                    <Text style={styles.label}>Consultorio:</Text>
                    <View style={styles.pickerContainer}>
                        <Picker selectedValue={consultorioId} onValueChange={(itemValue) => setConsultorioId(itemValue)} style={styles.picker}>
                            <Picker.Item label="-- Seleccione un Consultorio --" value={null} />
                            {consultorios.map(c => <Picker.Item key={c.id} label={c.nombre} value={c.id} />)}
                        </Picker>
                    </View>
                    
                    <Text style={styles.label}>Fecha (YYYY-MM-DD):</Text>
                    <TextInput style={styles.input} placeholder="Ej: 2025-12-31" value={fechaHora} onChangeText={setFechaHora} />
                    
                    <Text style={styles.label}>Estado:</Text>
                    <View style={styles.pickerContainer}>
                        <Picker selectedValue={estado} onValueChange={(itemValue) => setEstado(itemValue)} style={styles.picker}>
                            <Picker.Item label="Programada" value="programada" />
                            <Picker.Item label="Confirmada" value="confirmada" />
                            <Picker.Item label="Cancelada" value="cancelada" />
                        </Picker>
                    </View>
                    
                    <Text style={styles.label}>Notas Adicionales:</Text>
                    <TextInput style={[styles.input, styles.textArea]} placeholder="Motivo de la consulta, etc." value={notas} onChangeText={setNotas} multiline={true} numberOfLines={3} />
                </View>
                )}
            </ScrollView>

            <View style={styles.fixedButtonsContainer}>
                <BotonComponent title={isEditing ? "Guardar Cambios" : "Agregar Cita"} onPress={handleSave} isLoading={loading} disabled={loading} style={styles.saveButton} />
                <BotonComponent title="Cancelar" onPress={() => navigation.goBack()} style={styles.cancelButton} textStyle={styles.cancelButtonText} />
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
    pickerContainer: {
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
    },
    picker: {
        width: '100%',
        height: 50,
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
        backgroundColor: '#4CAF50',
        marginBottom: 10,
    },
    cancelButton: {
        backgroundColor: '#6c757d',
    },
    cancelButtonText: {
        color: '#fff',
    },
});