import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity, // Añadir TouchableOpacity para el texto "Ir a registro"
  KeyboardAvoidingView, // Para manejar el teclado en iOS
  Platform, // Para detectar el sistema operativo
  ActivityIndicator, // Para mostrar un indicador de carga
} from "react-native";
import BotonComponent from "../../Components/BotonComponent";
import { useNavigation } from "@react-navigation/native";
import { loginUser } from "../../Src/Services/AuthService"; // Asegúrate de la ruta correcta
import { Ionicons } from "@expo/vector-icons"; // Para iconos en los campos de texto

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Para alternar visibilidad de contraseña

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Campos Vacíos", "Por favor, ingresa tu correo electrónico y contraseña.");
      return;
    }

    setLoading(true);
    try {
      const result = await loginUser(email, password);
      if (result.success) {
        Alert.alert("Éxito", "¡Bienvenido!", [
          {
            text: "OK",
            onPress: () => {
              console.log("Login exitoso, redirigiendo automaticamente...");
            },
          },
        ]);
        // La redirección a NavegacionPrincipal es manejada por AppNavegacion.js
      } else {
        Alert.alert(
          "Error de login",
          result.message || "Ocurrió un error al iniciar sesión."
        );
      }
    } catch (error) {
      console.error("Error inesperado en login:", error);
      Alert.alert("Error", "Ocurrió un error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.card}>
        <Ionicons name="person-circle-outline" size={100} color="#007BFF" style={styles.avatar} />
        <Text style={styles.title}>Iniciar Sesión</Text>
        <Text style={styles.subtitle}>Bienvenido de nuevo</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            placeholder="Correo Electrónico"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            editable={!loading}
            placeholderTextColor="#888"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            placeholder="Contraseña"
            secureTextEntry={!showPassword} // Usar el estado para alternar visibilidad
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

        <BotonComponent
          title={loading ? <ActivityIndicator color="#fff" /> : "Iniciar Sesión"}
          onPress={handleLogin}
          disabled={loading}
          style={styles.loginButton}
        />

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>¿No tienes cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Registro")}>
            <Text style={styles.registerLink}>Regístrate aquí</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F8FA", // Un fondo más suave
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
    borderColor: "#E0E0E0", // Borde más suave
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "#F8F8F8", // Fondo ligero para los inputs
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
  loginButton: {
    backgroundColor: "#007BFF", // Un azul vibrante para el botón principal
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  registerContainer: {
    flexDirection: "row",
    marginTop: 25,
  },
  registerText: {
    fontSize: 15,
    color: "#555",
  },
  registerLink: {
    fontSize: 15,
    color: "#007BFF",
    fontWeight: "bold",
  },
});