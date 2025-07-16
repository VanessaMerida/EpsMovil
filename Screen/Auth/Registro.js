// Screen/Auth/Registro.js
import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Platform } from 'react-native';
import BotonComponent from '../../Components/BotonComponent';
import { registerUser } from '../../Src/Services/AuthService';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { KeyboardAvoidingView } from 'react-native';

export default function RegistroScreen() {
    const navigation = useNavigation();
    
    // ESTADOS PARA TODOS LOS CAMPOS
    const [name, setName] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [documento, setDocumento] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('user');
    const [adminCode, setAdminCode] = useState('');
    
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async () => {
        // Construir el objeto de datos a enviar
        const userData = {
            name, // Para el backend, 'name' es 'nombres'
            email,
            password,
            role,
        };

        // Añadir campos condicionales
        if (role === 'user') {
            if (!apellidos || !documento) {
                Alert.alert('Campos Requeridos', 'Para registrarte como paciente, debes completar tus apellidos y documento.');
                return;
            }
            userData.apellidos = apellidos;
            userData.documento = documento;
            userData.telefono = telefono;
        }

        if (role === 'administrador') {
            if (!adminCode) {
                Alert.alert('Código Requerido', 'Ingresa el código de administrador.');
                return;
            }
            userData.admin_code = adminCode;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden.');
            return;
        }
        
        setLoading(true);
        try {
            const result = await registerUser(userData);

            if (result.success) {
                Alert.alert('¡Registro Exitoso!', 'Ahora puedes iniciar sesión.', [
                    { text: 'OK', onPress: () => navigation.navigate('Login') },
                ]);
            } else {
                Alert.alert('Error de Registro', result.message || 'Ocurrió un error.');
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error inesperado.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.card}>
                    <Ionicons name="person-add-outline" size={80} color="#28A745" style={styles.avatar} />
                    <Text style={styles.title}>Crear Cuenta</Text>

                    <Text style={styles.label}>Quiero registrarme como:</Text>
                    <View style={styles.pickerContainer}>
                        <Picker selectedValue={role} onValueChange={(itemValue) => setRole(itemValue)} style={styles.picker}>
                            <Picker.Item label="Usuario / Paciente" value="user" />
                            <Picker.Item label="Administrador" value="administrador" />
                        </Picker>
                    </View>

                    {/* Campos condicionales */}
                    {role === 'user' ? (
                        <>
                            <TextInput style={styles.input} placeholder="Nombres" value={name} onChangeText={setName} />
                            <TextInput style={styles.input} placeholder="Apellidos" value={apellidos} onChangeText={setApellidos} />
                            <TextInput style={styles.input} placeholder="Documento de Identidad" value={documento} onChangeText={setDocumento} keyboardType="numeric"/>
                            <TextInput style={styles.input} placeholder="Teléfono (Opcional)" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad"/>
                        </>
                    ) : (
                        <TextInput style={styles.input} placeholder="Nombre Completo del Administrador" value={name} onChangeText={setName} />
                    )}

                    <TextInput style={styles.input} placeholder="Correo Electrónico" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
                    
                    {role === 'administrador' && (
                        <TextInput style={styles.input} placeholder="Código de Administrador" value={adminCode} onChangeText={setAdminCode} secureTextEntry />
                    )}

                    <View style={styles.passwordContainer}>
                        <TextInput style={styles.inputPassword} placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}><Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="gray" /></TouchableOpacity>
                    </View>
                    <TextInput style={styles.input} placeholder="Confirmar Contraseña" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={!showPassword} />

                    <BotonComponent title={loading ? <ActivityIndicator color="#fff" /> : "Registrarse"} onPress={handleRegister} disabled={loading} style={styles.registerButton} />
                    
                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>¿Ya tienes cuenta? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}><Text style={styles.loginLink}>Inicia Sesión</Text></TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

// Estilos
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F5F8FA" },
    scrollContent: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 30 },
    card: { backgroundColor: "#FFFFFF", borderRadius: 15, padding: 30, width: "90%", maxWidth: 400, alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 8 },
    avatar: { marginBottom: 20 },
    title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, color: "#333" },
    input: { width: '100%', height: 50, borderColor: '#E0E0E0', borderWidth: 1, borderRadius: 10, paddingHorizontal: 15, marginBottom: 15, backgroundColor: '#F8F8F8', fontSize: 16 },
    passwordContainer: { flexDirection: 'row', alignItems: 'center', width: '100%', height: 50, borderColor: '#E0E0E0', borderWidth: 1, borderRadius: 10, paddingHorizontal: 15, marginBottom: 15, backgroundColor: '#F8F8F8' },
    inputPassword: { flex: 1, fontSize: 16 },
    label: { fontSize: 16, fontWeight: 'bold', color: '#555', marginBottom: 5, alignSelf: 'flex-start', paddingLeft: 5 },
    pickerContainer: { width: '100%', borderColor: '#E0E0E0', borderWidth: 1, borderRadius: 10, marginBottom: 15, backgroundColor: '#F8F8F8', justifyContent: 'center' },
    picker: { height: 50, width: '100%' },
    registerButton: { backgroundColor: "#28A745", width: "100%", height: 50, justifyContent: "center", alignItems: "center", borderRadius: 10, marginTop: 10 },
    loginContainer: { flexDirection: "row", marginTop: 25 },
    loginText: { fontSize: 15, color: "#555" },
    loginLink: { fontSize: 15, color: "#28A745", fontWeight: "bold" },
});