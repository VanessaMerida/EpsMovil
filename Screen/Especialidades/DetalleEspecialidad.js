import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BotonComponent from '../../Components/BotonComponent';
import { useNavigation, useRoute } from '@react-navigation/native'; // Importar useRoute

export default function DetalleEspecialidad() {
    const navigation = useNavigation();
    const route = useRoute(); // Hook para acceder a los parámetros de la ruta

    // Simulamos la información de la especialidad.
    // En una aplicación real, 'especialidad' vendría de route.params?.especialidad
    // o de una llamada a la API usando un ID recibido por params.
    const especialidad = route.params?.especialidad || {
        id: '1',
        nombre: 'Cardiología',
        descripcion: 'Especialidad médica que se ocupa del estudio, diagnóstico y tratamiento de las enfermedades del corazón y del sistema circulatorio.',
        jefedearea: 'Dr. Marco Polo',
        fechacreacion: '2023-01-15',
        ultimamodificacion: '2024-06-20',
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle de Especialidad</Text>
      <Text style={styles.subtitle}>Información detallada de la especialidad seleccionada:</Text>

      <View style={styles.detailCard}>
        <Text style={styles.detailLabel}>Nombre:</Text>
        <Text style={styles.detailText}>{especialidad.nombre}</Text>

        <Text style={styles.detailLabel}>Descripción:</Text>
        <Text style={styles.detailText}>{especialidad.descripcion}</Text>

        <Text style={styles.detailLabel}>Jefe de Área:</Text>
        <Text style={styles.detailText}>{especialidad.jefedearea}</Text>

        <Text style={styles.detailLabel}>Fecha de Creación:</Text>
        <Text style={styles.detailText}>{especialidad.fechacreacion}</Text>

        <Text style={styles.detailLabel}>Última Modificación:</Text>
        <Text style={styles.detailText}>{especialidad.ultimamodificacion}</Text>
      </View>

      <BotonComponent
        title="Editar Especialidad"
        onPress={() => navigation.navigate('EditarEspecialidad', { especialidad: especialidad })} // Pasa la especialidad a la pantalla de edición
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f8", // Un color de fondo más suave
  },
  title: {
    fontSize: 26, // Un poco más grande para el título principal
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: 'center', // Centrar el título
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 25, // Más espacio debajo del subtítulo
    textAlign: 'center', // Centrar el subtítulo
  },
  detailCard: {
    backgroundColor: '#FFFFFF', // Fondo blanco para la tarjeta de detalles
    borderRadius: 12, // Bordes redondeados
    padding: 20,
    marginBottom: 30, // Espacio antes del botón
    shadowColor: '#000', // Sombra sutil para un efecto de elevación
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // Elevación para Android
    width: '100%',
  },
  detailLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 10, // Espacio entre etiquetas
    marginBottom: 4, // Espacio entre etiqueta y valor
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8, // Espacio entre valores
    lineHeight: 22, // Altura de línea para descripciones largas
  },
});