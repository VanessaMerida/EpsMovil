// InicioScreen.js
import React from "react"; // Asegúrate de importar React
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CardOpcion from '../../../Components/CardOpcion'; // ¡Importa el nuevo componente!

export default function InicioScreen() {
  const navigation = useNavigation();

  const handlePress = (stackName, initialScreenInStack) => {
    console.log(`Navegando a la pantalla ${initialScreenInStack} en el Stack ${stackName}`);
    navigation.navigate(stackName, { screen: initialScreenInStack });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Menú Principal</Text>
      <Text style={styles.headerSubtitle}>Selecciona una opción para empezar</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.gridContainer}>
          {/* Usando el componente CardOpcion */}
          <CardOpcion
            icon={<Ionicons name="bookmark-outline" size={35} color="#1E90FF" />}
            title="Especialidades"
            description="Explora y gestiona las especialidades médicas."
            onPress={() => handlePress('Especialidades', 'ListarEspecialidades')}
            iconBgColor="#E3F2FD"
          />

          <CardOpcion
            icon={<Ionicons name="medical-outline" size={35} color="#4CAF50" />}
            title="Medicos"
            description="Consulta y registra nuevos médicos."
            onPress={() => handlePress('Medicos', 'ListarMedicos')}
            iconBgColor="#E8F5E9"
          />

          <CardOpcion
            icon={<Ionicons name="location-outline" size={35} color="#FFD700" />}
            title="Consultorios"
            description="Administra los consultorios disponibles."
            onPress={() => handlePress('Consultorios', 'ListarConsultorios')}
            iconBgColor="#FFF9C4"
          />

          <CardOpcion
            icon={<Ionicons name="body-outline" size={35} color="#FF6347" />}
            title="Pacientes"
            description="Lleva un registro de los pacientes."
            onPress={() => handlePress('Pacientes', 'ListarPacientes')}
            iconBgColor="#FFEBEE"
          />

          <CardOpcion
            icon={<Ionicons name="time-outline" size={35} color="#6A5ACD" />}
            title="Citas Médicas"
            description="Gestiona las citas médicas de los pacientes."
            onPress={() => handlePress('CitasMedicas', 'ListarCitasMedicas')}
            iconBgColor="#E6E6FA"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F4F8',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginTop: 20,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  scrollContent: {
    alignItems: 'center',
    width: '100%',
  },
  gridContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    maxWidth: 600,
  },
  // ¡Elimina los estilos de 'card', 'cardIconContainer', etc., de aquí!
  // Esos estilos ahora están en Src/Components/CardOpcion.js
});