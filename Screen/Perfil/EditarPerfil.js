// Screen/Perfil/EditarPerfil.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import BotonComponent from '../../Components/BotonComponent';
import { useNavigation, useRoute } from '@react-navigation/native';
import { updateUserProfile } from '../../Src/Services/AuthService'; // 1. IMPORTAR SERVICIO

export default function EditarPerfil() {
    const navigation = useNavigation();
    const route = useRoute();
    const userProfileToEdit = route.params?.userProfile;

    // 2. ESTADOS DEL FORMULARIO
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); // Para la nueva contraseña
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userProfileToEdit) {
            setName(userProfileToEdit.name || '');
            setEmail(userProfileToEdit.email || '');
        }
    }, [userProfileToEdit]);

    // 3. LÓGICA DE GUARDADO
    const handleSave = async () => {
        if (!name || !email) {
            Alert.alert('Campos incompletos', 'Nombre y Email son obligatorios.');
            return;
        }

        setLoading(true);

        const userData = { name, email };
        // Solo añadimos la contraseña al payload si el usuario escribió algo
        if (password) {
            if (password.length < 6) {
                Alert.alert('Contraseña Débil', 'La nueva contraseña debe tener al menos 6 caracteres.');
                setLoading(false);
                return;
            }
            userData.password = password;
        }

        const result = await updateUserProfile(userData);

        if (result.success) {
            Alert.alert('Éxito', 'Perfil actualizado correctamente.');
            navigation.goBack();
        } else {
            Alert.alert('Error', result.message || 'No se pudo actualizar el perfil.');
        }

        setLoading(false);
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Editar Perfil</Text>

                <View style={styles.formCard}>
                    <Text style={styles.label}>Nombre Completo:</Text>
                    <TextInput style={styles.input} placeholder="Tu nombre" value={name} onChangeText={setName} />

                    <Text style={styles.label}>Email:</Text>
                    <TextInput style={styles.input} placeholder="tu.email@example.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
                    
                    {/* Campo opcional para cambiar contraseña */}
                    <Text style={styles.label}>Nueva Contraseña (opcional):</Text>
                    <TextInput style={styles.input} placeholder="Deja en blanco para no cambiar" value={password} onChangeText={setPassword} secureTextEntry />
                    
                    <Text style={styles.label}>Rol:</Text>
                    <TextInput style={styles.input} value={userProfileToEdit?.role || 'N/A'} editable={false} />
                </View>
            </ScrollView>

            <View style={styles.fixedButtonsContainer}>
                <BotonComponent title="Guardar Cambios" onPress={handleSave} isLoading={loading} disabled={loading} style={styles.saveButton} />
                <BotonComponent title="Cancelar" onPress={() => navigation.goBack()} style={styles.cancelButton} textStyle={styles.cancelButtonText} />
            </View>
        </KeyboardAvoidingView>
    );
}

// Estilos existentes, no necesitan grandes cambios
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f0f4f8", },
    scrollContent: { flexGrow: 1, padding: 20, paddingBottom: 20 },
    title: { fontSize: 26, fontWeight: "bold", marginBottom: 20, color: "#333", textAlign: 'center' },
    formCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, marginBottom: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 5, },
    label: { fontSize: 16, fontWeight: 'bold', color: '#555', marginTop: 10, marginBottom: 5, },
    input: { width: '100%', height: 50, borderColor: '#ddd', borderWidth: 1, borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, backgroundColor: '#f9f9f9', fontSize: 16, color: '#333', },
    fixedButtonsContainer: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: Platform.OS === 'ios' ? 30 : 20, backgroundColor: '#f0f4f8', borderTopWidth: 1, borderColor: '#eee', },
    saveButton: { backgroundColor: '#28A745', marginBottom: 10, },
    cancelButton: { backgroundColor: '#6c757d', },
    cancelButtonText: { color: '#fff', },
});