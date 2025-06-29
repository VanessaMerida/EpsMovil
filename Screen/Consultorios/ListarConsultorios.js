// Src/Screens/Consultorios/ListarConsultorios.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ListItemCard from '../../Components/ListItemCard';
import BotonComponent from '../../Components/BotonComponent'; // Reutilizando BotonComponent

export default function ListarConsultorios() {
  const navigation = useNavigation();

  const [consultorios, setConsultorios] = useState([
    { id: 'C101', nombre: 'Consultorio Central 1', ubicacion: 'Calle Falsa 123, Piso 1', capacidad: '2 médicos, 10 pacientes', disponibilidad: 'L-V 8AM-6PM' },
    { id: 'C102', nombre: 'Consultorio Norte 2', ubicacion: 'Av. Siempre Viva 456, Local 5', capacidad: '1 médico, 5 pacientes', disponibilidad: 'L-S 9AM-5PM' },
    { id: 'C103', nombre: 'Consultorio Sur 3', ubicacion: 'Carrera 7 # 8-90, Of. 301', capacidad: '3 médicos, 15 pacientes', disponibilidad: 'L-V 7AM-7PM' },
    { id: 'C104', nombre: 'Consultorio Anexo 4', ubicacion: 'Diagonal 25 # 30-10, Apto 2', capacidad: '1 médico, 8 pacientes', disponibilidad: 'M-J 10AM-4PM' },
  ]);

  const renderConsultorioItem = ({ item }) => (
    <ListItemCard
      title={item.nombre}
      description={`Ubicación: ${item.ubicacion}`}
      iconName="location-outline"
      iconColor="#FFD700"
      onPress={() => navigation.navigate('DetalleConsultorio', { consultorio: item })}
    />
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

      <BotonComponent
        title="Agregar Consultorio"
        onPress={() => navigation.navigate("EditarConsultorio")}
        style={styles.addButton}
        iconName="add-circle-outline"
        iconColor="#fff"
      />
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
    paddingBottom: 20,
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#999',
  },
  addButton: {
    backgroundColor: '#28A745',
  },
});