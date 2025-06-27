// DetalleConsultorio.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BotonComponent from '../../Components/BotonComponent';
import { useNavigation, useRoute } from '@react-navigation/native'; // Importar useRoute

export default function DetalleConsultorio() {
  const navigation = useNavigation();
  const route = useRoute();

  // Obtener el consultorio de los parámetros. Si no hay, usar datos por defecto.
  const consultorio = route.params?.consultorio || {
    id: 'C000',
    nombre: 'Consultorio No Seleccionado',
    ubicacion: 'N/A',
    capacidad: 'N/A',
    disponibilidad: 'N/A',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle de Consultorio</Text>
      <Text style={styles.subtitle}>Información detallada del consultorio seleccionado:</Text>

      <View style={styles.detailCard}>
        <Text style={styles.detailLabel}>Nombre:</Text>
        <Text style={styles.detailText}>{consultorio.nombre}</Text>

        <Text style={styles.detailLabel}>Ubicación:</Text>
        <Text style={styles.detailText}>{consultorio.ubicacion}</Text>

        <Text style={styles.detailLabel}>Capacidad:</Text>
        <Text style={styles.detailText}>{consultorio.capacidad}</Text>

        <Text style={styles.detailLabel}>Disponibilidad:</Text>
        <Text style={styles.detailText}>{consultorio.disponibilidad}</Text>
      </View>

      <BotonComponent
        title="Editar Consultorio"
        onPress={() => navigation.navigate('EditarConsultorio', { consultorio: consultorio })} // Pasa el consultorio a la pantalla de edición
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f8",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 25,
    textAlign: 'center',
  },
  detailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },
  detailLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 10,
    marginBottom: 4,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    lineHeight: 22,
  },
});