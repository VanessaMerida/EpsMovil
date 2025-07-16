// Screen/CitasMedicas/EditarCitaMedica.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, Platform, Button, ActivityIndicator } from 'react-native';
import BotonComponent from '../../Components/BotonComponent';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { crearCitaMedica } from '../../Src/Services/CitasMedicasService';
import { listarMedicos } from '../../Src/Services/MedicosService';
import { listarEspecialidades } from '../../Src/Services/EspecialidadesService';
import { listarConsultorios } from '../../Src/Services/ConsultoriosService';

export default function EditarCitaMedica() {
    const navigation = useNavigation();

    // Estados del formulario
    const [medicoId, setMedicoId] = useState(null);
    const [especialidadId, setEspecialidadId] = useState(null);
    const [consultorioId, setConsultorioId] = useState(null);
    
    // Estados para el selector de fecha y hora
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showPicker, setShowPicker] = useState(null); // 'date' o 'time'

    // Estados para las listas de los pickers
    const [medicos, setMedicos] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);
    const [consultorios, setConsultorios] = useState([]);
    
    const [loading, setLoading] = useState(false);
    const [loadingPickers, setLoadingPickers] = useState(true);

    useEffect(() => {
        const cargarDatos = async () => {
            setLoadingPickers(true);
            try {
                const [medicosRes, especialidadesRes, consultoriosRes] = await Promise.all([
                    listarMedicos(),
                    listarEspecialidades(),
                    listarConsultorios()
                ]);
                if (medicosRes.success) setMedicos(medicosRes.data);
                if (especialidadesRes.success) setEspecialidades(especialidadesRes.data);
                if (consultoriosRes.success) setConsultorios(consultoriosRes.data);
            } catch (error) {
                Alert.alert("Error", "No se pudieron cargar los datos necesarios.");
            } finally {
                setLoadingPickers(false);
            }
        };
        cargarDatos();
    }, []);

    const onChangeDateTime = (event, selectedValue) => {
        setShowPicker(null); // Ocultar el picker
        if (event.type === 'set') {
            if (showPicker === 'date') {
                setDate(selectedValue || date);
            } else {
                setTime(selectedValue || time);
            }
        }
    };
    
    const formatDateTimeForAPI = (selectedDate, selectedTime) => {
        const year = selectedDate.getFullYear();
        const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
        const day = selectedDate.getDate().toString().padStart(2, '0');
        const hours = selectedTime.getHours().toString().padStart(2, '0');
        const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:00`;
    };

    const handleSave = async () => {
        if (!medicoId || !especialidadId || !consultorioId) {
            Alert.alert('Campos incompletos', 'Por favor, selecciona todos los campos.');
            return;
        }
        setLoading(true);
        const citaData = {
            medico_id: medicoId,
            especialidad_id: especialidadId,
            consultorio_id: consultorioId,
            fecha_hora: formatDateTimeForAPI(date, time),
            estado: 'programada', // Estado por defecto
            // El paciente_id se asignará en el backend
        };
        try {
            const result = await crearCitaMedica(citaData);
            if (result.success) {
                Alert.alert('Éxito', 'Cita creada correctamente');
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

    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.title}>Agendar Nueva Cita</Text>
            {loadingPickers ? <ActivityIndicator size="large" color="#6A5ACD" /> : (
            <View style={styles.formCard}>
                <Text style={styles.label}>Especialidad:</Text>
                <Picker selectedValue={especialidadId} onValueChange={setEspecialidadId} style={styles.picker}><Picker.Item label="Seleccione..." value={null} />{especialidades.map(e => <Picker.Item key={e.id} label={e.nombre} value={e.id} />)}</Picker>
                
                <Text style={styles.label}>Médico:</Text>
                <Picker selectedValue={medicoId} onValueChange={setMedicoId} style={styles.picker}><Picker.Item label="Seleccione..." value={null} />{medicos.map(m => <Picker.Item key={m.id} label={`${m.nombres} ${m.apellidos}`} value={m.id} />)}</Picker>
                
                <Text style={styles.label}>Consultorio:</Text>
                <Picker selectedValue={consultorioId} onValueChange={setConsultorioId} style={styles.picker}><Picker.Item label="Seleccione..." value={null} />{consultorios.map(c => <Picker.Item key={c.id} label={c.nombre} value={c.id} />)}</Picker>

                <Text style={styles.label}>Fecha de la Cita:</Text>
                <BotonComponent title={`📅  ${date.toLocaleDateString()}`} onPress={() => setShowPicker('date')} style={styles.dateButton}/>
                
                <Text style={styles.label}>Hora de la Cita:</Text>
                <BotonComponent title={`🕒  ${time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`} onPress={() => setShowPicker('time')} style={styles.dateButton}/>
                
                {showPicker && (
                    <DateTimePicker
                        value={showPicker === 'date' ? date : time}
                        mode={showPicker}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeDateTime}
                    />
                )}
            </View>
            )}
            <View style={styles.fixedButtonsContainer}>
                <BotonComponent title="Agendar Cita" onPress={handleSave} isLoading={loading} disabled={loading} style={styles.saveButton}/>
                <BotonComponent title="Cancelar" onPress={() => navigation.goBack()} style={styles.cancelButton} textStyle={styles.cancelButtonText}/>
            </View>
        </ScrollView>
    );
}

// Estilos
const styles = StyleSheet.create({
    scrollContent: { padding: 20 },
    title: { fontSize: 26, fontWeight: "bold", marginBottom: 20, color: "#333", textAlign: 'center' },
    formCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, marginBottom: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 5 },
    label: { fontSize: 16, fontWeight: 'bold', color: '#555', marginTop: 10, marginBottom: 5 },
    picker: { backgroundColor: '#f0f0f0', borderRadius: 8, marginBottom: 10 },
    dateButton: { backgroundColor: '#e7e7e7', marginBottom: 10 },
    fixedButtonsContainer: { paddingTop: 20 },
    saveButton: { backgroundColor: '#4CAF50', marginBottom: 10 },
    cancelButton: { backgroundColor: '#6c757d' },
    cancelButtonText: { color: '#fff' },
});