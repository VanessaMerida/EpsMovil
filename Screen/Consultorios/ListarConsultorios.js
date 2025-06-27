// ListarConsultorios.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Importar Ionicons para iconos

export default function ListarConsultorios() {
  const navigation = useNavigation();

  // Datos de ejemplo para los consultorios
  const [consultorios, setConsultorios] = useState([
    { id: 'C101', nombre: 'Consultorio Central 1', ubicacion: 'Calle Falsa 123, Piso 1', capacidad: '2 médicos, 10 pacientes', disponibilidad: 'L-V 8AM-6PM' },
    { id: 'C102', nombre: 'Consultorio Norte 2', ubicacion: 'Av. Siempre Viva 456, Local 5', capacidad: '1 médico, 5 pacientes', disponibilidad: 'L-S 9AM-5PM' },
    { id: 'C103', nombre: 'Consultorio Sur 3', ubicacion: 'Carrera 7 # 8-90, Of. 301', capacidad: '3 médicos, 15 pacientes', disponibilidad: 'L-V 7AM-7PM' },
    { id: 'C104', nombre: 'Consultorio Anexo 4', ubicacion: 'Diagonal 25 # 30-10, Apto 2', capacidad: '1 médico, 8 pacientes', disponibilidad: 'M-J 10AM-4PM' },
  ]);

  // Función para renderizar cada ítem de la lista de consultorios
  const renderConsultorioItem = ({ item }) => (
    <TouchableOpacity
      style={styles.consultorioItem}
      onPress={() => navigation.navigate('DetalleConsultorio', { consultorio: item })}
    >
      <View style={styles.itemContent}>
        <Ionicons name="location-outline" size={24} color="#FFD700" style={styles.itemIcon} />
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemTitle}>{item.nombre}</Text>
          <Text style={styles.itemDescription}>{item.ubicacion}</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={20} color="#666" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
       <Text style={styles.title}>Listado de Consultorios</Text>
       <Text style={styles.subtitle}>Aquí aparecerán todos los consultorios registrados</Text>

       <FlatList
        data={consultorios}
        renderItem={renderConsultorioItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyListText}>No hay consultorios registrados.</Text>}
      />

       {/* Botones de acción */}
       
      <TouchableOpacity
        style={[styles.button, styles.addButton]}
        onPress={() => navigation.navigate("EditarConsultorio")} // Navega a la pantalla de edición sin pasar datos para "agregar"
      >
        <Ionicons name="add-circle-outline" size={20} color="#fff" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Agregar Consultorio</Text>
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
  consultorioItem: { // Estilo para cada tarjeta de consultorio
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