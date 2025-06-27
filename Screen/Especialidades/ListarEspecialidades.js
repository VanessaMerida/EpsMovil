import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Importar Ionicons para iconos

export default function ListarEspecialidades() {
  const navigation = useNavigation();

 // Datos de ejemplo para las especialidades
  const [especialidades, setEspecialidades] = useState([
    { id: '1', nombre: 'Cardiología', descripcion: 'Especialidad en el corazón y sistema circulatorio.', jefedearea: 'Dr. Juan Pérez', fechacreacion: '2023-01-15', ultimamodificacion: '2024-06-20' },
    { id: '2', nombre: 'Dermatología', descripcion: 'Especialidad en la piel, cabello y uñas.', jefedearea: 'Dra. Ana Gómez', fechacreacion: '2023-02-01', ultimamodificacion: '2024-05-10' },
    { id: '3', nombre: 'Pediatría', descripcion: 'Especialidad en la salud y enfermedades de los niños.', jefedearea: 'Dr. Luis Torres', fechacreacion: '2023-03-10', ultimamodificacion: '2024-04-25' },
    { id: '4', nombre: 'Neurología', descripcion: 'Especialidad en el sistema nervioso y sus trastornos.', jefedearea: 'Dra. Clara Soto', fechacreacion: '2023-04-20', ultimamodificacion: '2024-03-18' },
    { id: '5', nombre: 'Ortopedia', descripcion: 'Especialidad en el sistema musculoesquelético.', jefedearea: 'Dr. Ricardo Paz', fechacreacion: '2023-05-05', ultimamodificacion: '2024-02-01' },
  ]);

  // Función para renderizar cada ítem de la lista
  const renderEspecialidadItem = ({ item }) => (
    <TouchableOpacity
      style={styles.especialidadItem}
      onPress={() => navigation.navigate('DetalleEspecialidad', { especialidad: item })}
    >
      <View style={styles.itemContent}>
        <Ionicons name="medical-outline" size={24} color="#007BFF" style={styles.itemIcon} />
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemTitle}>{item.nombre}</Text>
          <Text style={styles.itemDescription}>{item.descripcion}</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={20} color="#666" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado de Especialidades</Text>
      <Text style={styles.subtitle}>Aquí aparecerán todas las especialidades registradas</Text>

      {/* FlatList para mostrar las especialidades */}
      <FlatList
        data={especialidades}
        renderItem={renderEspecialidadItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyListText}>No hay especialidades registradas.</Text>}
      />

      {/* Botones de acción */}
      {/*
      // Si estos botones aplican a un elemento seleccionado de la lista,
      // entonces deberías ponerlos en el `renderEspecialidadItem` o condicionar su visibilidad
      // Por ahora, los mantengo globales como en tu código original.
      */}

      <TouchableOpacity
        style={[styles.button, styles.addButton]}
        onPress={() => navigation.navigate("EditarEspecialidad")} // Suponiendo una pantalla para agregar
      >
        <Ionicons name="add-circle-outline" size={20} color="#fff" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Agregar Especialidad</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20, // Espacio al final de la lista antes de los botones
  },
  especialidadItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemIcon: {
    marginRight: 10,
  },
  itemTextContainer: {
    flex: 1, // Para que el texto ocupe el espacio restante
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  itemDescription: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#999',
  },
  button: {
    flexDirection: 'row', // Para alinear icono y texto
    alignItems: 'center',
    justifyContent: 'center', // Centra el contenido del botón
    padding: 15,
    borderRadius: 8, // Bordes un poco más redondeados
    marginVertical: 8, // Espacio entre botones
    elevation: 3, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  detailButton: {
    backgroundColor: '#007BFF', // Azul
  },
  editButton: {
    backgroundColor: '#FFC107', // Amarillo (antes verde, lo cambié a amarillo como en la imagen de InicioScreen para Editar)
  },
  addButton: {
    backgroundColor: '#28A745', // Verde (para el botón de agregar)
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold', // Texto del botón en negrita
  },
  buttonIcon: {
    marginRight: 8, // Espacio entre el icono y el texto
  },
});