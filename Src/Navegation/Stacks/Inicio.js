import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

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

// Componente individual para cada Card
function CardOpcion({ icon, title, description, onPress, iconBgColor }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={[styles.cardIconContainer, { backgroundColor: iconBgColor }]}>
        {icon}
      </View>
      <View style={styles.cardTextContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
    </TouchableOpacity>
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
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    marginBottom: 18,
    flexDirection: 'row', // <-- CLAVE: Alinea los elementos (icono y texto) en fila
    alignItems: 'center', // Alinea verticalmente los elementos en el centro de la fila
    minHeight: 90, // <-- Reducido aún más para compactar la altura
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  cardIconContainer: {
    width: 45, // <-- Reducido el tamaño del contenedor del icono
    height: 45, // <-- Reducido el tamaño del contenedor del icono
    borderRadius: 22.5, // <-- Para mantener el círculo perfecto
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15, // <-- Margen a la derecha para separar del texto
    // Eliminado marginBottom ya que no se apilan verticalmente
  },
  cardTextContent: {
    flex: 1, // <-- Permite que el contenido de texto ocupe el espacio restante
    justifyContent: 'center', // Alinea el texto verticalmente en el centro
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
    textAlign: 'left', // <-- Alinea el título a la izquierda
  },
  cardDescription: {
    fontSize: 11,
    color: '#777',
    textAlign: 'left', // <-- Alinea la descripción a la izquierda
  },
});