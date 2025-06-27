// ListarPacientes.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Importar Ionicons para iconos

export default function ListarPacientes() {
  const navigation = useNavigation();

  // Datos de ejemplo para los pacientes
  const [pacientes, setPacientes] = useState([
    { id: 'P001', nombre: 'Carlos', apellido: 'García', fechaNacimiento: '1990-01-15', genero: 'Masculino', telefono: '555-1111', email: 'carlos.g@example.com', direccion: 'Calle 1 # 2-34', fechaRegistro: '2023-01-01', ultimaActualizacion: '2024-06-20' },
    { id: 'P002', nombre: 'María', apellido: 'López', fechaNacimiento: '1985-07-22', genero: 'Femenino', telefono: '555-2222', email: 'maria.l@example.com', direccion: 'Carrera 5 # 6-78', fechaRegistro: '2023-02-10', ultimaActualizacion: '2024-06-18' },
    { id: 'P003', nombre: 'Pedro', apellido: 'Ramírez', fechaNacimiento: '2000-03-01', genero: 'Masculino', telefono: '555-3333', email: 'pedro.r@example.com', direccion: 'Avenida 10 # 11-12', fechaRegistro: '2023-03-05', ultimaActualizacion: '2024-06-15' },
    { id: 'P004', nombre: 'Laura', apellido: 'Martínez', fechaNacimiento: '1992-11-05', genero: 'Femenino', telefono: '555-4444', email: 'laura.m@example.com', direccion: 'Diagonal 15 # 16-17', fechaRegistro: '2023-04-20', ultimaActualizacion: '2024-06-10' },
  ]);

  // Función para renderizar cada ítem de la lista de pacientes
  const renderPacienteItem = ({ item }) => (
    <TouchableOpacity
      style={styles.pacienteItem}
      onPress={() => navigation.navigate('DetallePaciente', { paciente: item })}
    >
      <View style={styles.itemContent}>
        <Ionicons name="body-outline" size={24} color="#007BFF" style={styles.itemIcon} />
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemTitle}>{item.nombre} {item.apellido}</Text>
          <Text style={styles.itemDescription}>Teléfono: {item.telefono}</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={20} color="#666" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado de Pacientes</Text>
      <Text style={styles.subtitle}>Aquí aparecerán todos los pacientes registrados</Text>

      <FlatList
        data={pacientes}
        renderItem={renderPacienteItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyListText}>No hay pacientes registrados.</Text>}
      />

      {/* Botones de acción */}
  
      <TouchableOpacity
        style={[styles.button, styles.addButton]}
        onPress={() => navigation.navigate("EditarPaciente")} // Navega a la pantalla de edición sin pasar datos para "agregar"
      >
        <Ionicons name="add-circle-outline" size={20} color="#fff" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Agregar Paciente</Text>
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
  pacienteItem: { // Estilo para cada tarjeta de paciente
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  detailButton: {
    backgroundColor: '#007BFF', // Azul
  },
  editButton: {
    backgroundColor: '#FFC107', // Amarillo
  },
  addButton: {
    backgroundColor: '#28A745', // Verde
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonIcon: {
    marginRight: 8,
  },
});