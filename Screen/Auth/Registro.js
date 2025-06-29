import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView, // Añadir ScrollView para permitir el desplazamiento si hay muchos campos
} from 'react-native';
import BotonComponent from '../../Components/BotonComponent'; // Asegúrate de la ruta correcta
import { registerUser } from '../../Src/Services/AuthService'; // Asegúrate de la ruta correcta
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Para iconos

export default function RegistroScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); // Recordatorio: Este campo no se está enviando al backend por defecto
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Para alternar visibilidad de contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Para alternar visibilidad de confirmar contraseña


  const handleRegister = async () => {
    // Validaciones frontend
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Campos Requeridos', 'Por favor, completa todos los campos.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Contraseña Débil', 'La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    setLoading(true);
    try {
      // Nota: 'phone' no se envía porque tu backend no lo espera actualmente en 'AuthController@registrar'
      const result = await registerUser(name, email, password);

      if (result.success) {
        Alert.alert('¡Registro Exitoso!', 'Ahora puedes iniciar sesión con tus nuevas credenciales.', [
          {
            text: 'OK',
            onPress: () => {
              // Limpiar campos después de un registro exitoso
              setName('');
              setEmail('');
              setPhone('');
              setPassword('');
              setConfirmPassword('');
              navigation.navigate('Login'); // Redirige al login después del registro
            },
          },
        ]);
      } else {
        // Mejorar el mensaje de error si Laravel devuelve errores de validación
        let errorMessage = result.message || 'Ocurrió un error al registrar. Por favor, inténtalo de nuevo.';
        if (result.data && result.data.errors) {
          const validationErrors = Object.values(result.data.errors).flat().join('\n');
          errorMessage = `Por favor, corrige los siguientes errores:\n${validationErrors}`;
        }
        Alert.alert('Error de Registro', errorMessage);
      }
    } catch (error) {
      console.error('Error inesperado en registro:', error);
      Alert.alert('Error', 'Ocurrió un error inesperado durante el registro. Por favor, inténtalo de nuevo.');
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
        <View style={styles.card}>
          <Ionicons name="person-add-outline" size={100} color="#28A745" style={styles.avatar} />
          <Text style={styles.title}>Crear Cuenta</Text>
          <Text style={styles.subtitle}>Únete a nuestra comunidad</Text>

          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              placeholder="Nombre Completo"
              style={styles.input}
              value={name}
              onChangeText={setName}
              editable={!loading}
              placeholderTextColor="#888"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              placeholder="Correo Electrónico"
              style={styles.input}
              keyboardType='email-address'
              autoCapitalize='none'
              value={email}
              onChangeText={setEmail}
              editable={!loading}
              placeholderTextColor="#888"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="call-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              placeholder="Teléfono (Opcional)"
              style={styles.input}
              keyboardType='phone-pad'
              value={phone}
              onChangeText={setPhone}
              editable={!loading}
              placeholderTextColor="#888"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              placeholder="Contraseña (mín. 8 caracteres)"
              secureTextEntry={!showPassword}
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              editable={!loading}
              placeholderTextColor="#888"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.passwordToggle}>
              <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              placeholder="Confirmar Contraseña"
              secureTextEntry={!showConfirmPassword}
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              editable={!loading}
              placeholderTextColor="#888"
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.passwordToggle}>
              <Ionicons name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#666" />
            </TouchableOpacity>
          </View>

          <BotonComponent
            title={loading ? <ActivityIndicator color="#fff" /> : "Registrarse"}
            onPress={handleRegister}
            disabled={loading}
            style={styles.registerButton}
          />

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>¿Ya tienes cuenta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Inicia Sesión aquí</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F8FA", // Fondo coherente con Login
  },
  scrollContent: {
    flexGrow: 1, // Permite que el contenido crezca y se centre
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30, // Padding vertical para el ScrollView
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 30,
    width: "90%",
    maxWidth: 400,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  avatar: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "#F8F8F8",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#333",
    fontSize: 16,
  },
  passwordToggle: {
    padding: 5,
  },
  registerButton: {
    backgroundColor: "#28A745", // Un verde vibrante para registrar
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  loginContainer: {
    flexDirection: "row",
    marginTop: 25,
  },
  loginText: {
    fontSize: 15,
    color: "#555",
  },
  loginLink: {
    fontSize: 15,
    color: "#28A745", // Verde coherente con el botón de registro
    fontWeight: "bold",
  },
});