// Src/Navegation/Stacks/Inicio.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import CardOpcion from '../../../Components/CardOpcion';
import { getUser } from "../../Services/AuthService";

export default function InicioScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
        setLoading(true);
        const result = await getUser();
        if (result.success) {
            setUserRole(result.user.role);
        } else {
            console.error("No se pudo obtener el rol del usuario.");
        }
        setLoading(false);
    };

    if (isFocused) {
        fetchUserRole();
    }
  }, [isFocused]);

  const handlePress = (stackName, initialScreenInStack) => {
    navigation.navigate(stackName, { screen: initialScreenInStack });
  };

  if (loading) {
      return (
          <View style={[styles.container, styles.centered]}>
              <ActivityIndicator size="large" color="#007BFF" />
          </View>
      );
  }

  // --- FUNCIÓN PARA RENDERIZAR EL MENÚ SEGÚN EL ROL ---
  const renderMenu = () => {
    // Menú para Administradores (ven todo)
    if (userRole === 'administrador') {
      return (
        <>
          <CardOpcion
            icon={<Ionicons name="bookmark-outline" size={35} color="#1E90FF" />}
            title="Especialidades"
            description="Gestiona las especialidades médicas."
            onPress={() => handlePress('Especialidades', 'ListarEspecialidades')}
            iconBgColor="#E3F2FD"
          />
          <CardOpcion
            icon={<Ionicons name="medical-outline" size={35} color="#4CAF50" />}
            title="Médicos"
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
            description="Administra el calendario de citas."
            onPress={() => handlePress('CitasMedicas', 'ListarCitasMedicas')}
            iconBgColor="#E6E6FA"
          />
        </>
      );
    }

    // ✅ MENÚ PARA MÉDICOS
    if (userRole === 'medico') {
      return (
        <>
          <CardOpcion
            icon={<Ionicons name="body-outline" size={35} color="#FF6347" />}
            title="Pacientes"
            description="Consulta el historial de tus pacientes."
            onPress={() => handlePress('Pacientes', 'ListarPacientes')}
            iconBgColor="#FFEBEE"
          />
          <CardOpcion
            icon={<Ionicons name="time-outline" size={35} color="#6A5ACD" />}
            title="Mis Citas Asignadas"
            description="Visualiza y gestiona tu agenda de citas."
            onPress={() => handlePress('CitasMedicas', 'ListarCitasMedicas')}
            iconBgColor="#E6E6FA"
          />
        </>
      );
    }
    
    // Menú para Usuarios / Pacientes
    if (userRole === 'user') {
      return (
        <>
          <CardOpcion
            icon={<Ionicons name="bookmark-outline" size={35} color="#1E90FF" />}
            title="Especialidades"
            description="Consulta las especialidades que ofrecemos."
            onPress={() => handlePress('Especialidades', 'ListarEspecialidades')}
            iconBgColor="#E3F2FD"
          />
          <CardOpcion
            icon={<Ionicons name="medical-outline" size={35} color="#4CAF50" />}
            title="Médicos"
            description="Conoce a nuestros profesionales."
            onPress={() => handlePress('Medicos', 'ListarMedicos')}
            iconBgColor="#E8F5E9"
          />
          <CardOpcion
            icon={<Ionicons name="location-outline" size={35} color="#FFD700" />}
            title="Consultorios"
            description="Consulta la ubicación de los consultorios."
            onPress={() => handlePress('Consultorios', 'ListarConsultorios')}
            iconBgColor="#FFF9C4"
          />
          <CardOpcion
            icon={<Ionicons name="time-outline" size={35} color="#6A5ACD" />}
            title="Citas Médicas"
            description="Agenda y gestiona tus citas médicas."
            onPress={() => handlePress('CitasMedicas', 'ListarCitasMedicas')}
            iconBgColor="#E6E6FA"
          />
        </>
      );
    }
    
    // Si el rol no es ninguno de los anteriores, no muestra nada.
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Menú Principal</Text>
      <Text style={styles.headerSubtitle}>Selecciona una opción para empezar</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.gridContainer}>
          {renderMenu()}
        </View>
      </ScrollView>
    </View>
  );
}

// Tus estilos se mantienen iguales
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F0F4F8', alignItems: 'center' },
  centered: { justifyContent: 'center' },
  headerTitle: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', color: '#333', marginTop: 20, marginBottom: 8 },
  headerSubtitle: { fontSize: 16, textAlign: 'center', marginBottom: 30, color: '#666' },
  scrollContent: { alignItems: 'center', width: '100%' },
  gridContainer: { flexDirection: 'column', justifyContent: 'flex-start', width: '100%', maxWidth: 600 },
});