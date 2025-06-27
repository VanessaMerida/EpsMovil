import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import BotonComponent from '../../Components/BotonComponent';
import { registerUser } from '../../Src/Services/AuthService';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

export default function RegistroScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword || !name) {
      Alert.alert('Campos requeridos', 'Por favor completa todos los campos obligatorios.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }
    setLoading(true);
    try {
      const result = await registerUser(name, email, password);
      if (result.success) {
        Alert.alert('¡Te has registrado con éxito!', 'Bienvenid@', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]);
      } else {
        Alert.alert('Error de registro', result.message || 'Error al registrar');
      }
    } catch (error) {
      console.error('Error de registro:', error);
      Alert.alert('Error', 'Error al registrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        placeholder="Nombre"
        style={styles.input}
        value={name}
        onChangeText={setName}
        editable={!loading}
      />
      <TextInput
        placeholder="Correo Electronico"
        style={styles.input}
        keyboardType='email-address'
        autoCapitalize='none'
        value={email}
        onChangeText={setEmail}
        editable={!loading}
      />
      <TextInput
        placeholder="Telefono"
        style={styles.input}
        keyboardType='phone-pad'
        value={phone}
        onChangeText={setPhone}
        editable={!loading}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry={true}
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        editable={!loading}
      />
      <TextInput
        placeholder="Confirmar Contraseña"
        secureTextEntry={true}
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        editable={!loading}
      />
      <BotonComponent
        title="Registrarse"
        onPress={handleRegister}
        disabled={loading}
      />
      <Text style={styles.textAccount}>¿Ya tienes cuenta?</Text>
      <BotonComponent
        title="Iniciar Sesion"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, // Agregado para un mejor espaciado general
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24, // Aumentado el tamaño de la fuente para el título
    marginBottom: 30, // Aumentado el margen inferior
    color: '#333', // Color de texto más oscuro
  },
  input: {
    width: '100%', // Usar 100% para mejor adaptabilidad
    height: 50, // Aumentada la altura para mejor interacción táctil
    borderColor: '#ccc', // Color de borde más suave
    borderRadius: 8, // Borde ligeramente más redondeado
    borderWidth: 1,
    marginBottom: 15, // Aumentado el margen inferior
    paddingHorizontal: 15, // Aumentado el padding horizontal
    backgroundColor: '#f9f9f9', // Fondo ligero para los inputs
  },
  textAccount: {
    marginVertical: 20, // Aumentado el margen vertical
    fontSize: 16, // Tamaño de fuente para el texto
    color: '#666', // Color de texto
  },
});